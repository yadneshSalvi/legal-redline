import type Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

import { elementCoverageGate } from "@/src/agent/element-gates";
import { activeElements, ruleWithElements } from "@/src/agent/element-format";
import { createElementDrafterTools, type ElementDrafterToolState } from "@/src/agent/element-tools";
import { stableFindingId } from "@/src/agent/id";
import type { LlmClient, RunnableTool } from "@/src/agent/llm";
import type { PrecedentMemory } from "@/src/agent/memory";
import type { Parties, RulePlan } from "@/src/agent/planner";
import { deterministicPreciseChecks } from "@/src/agent/precise-element-gates";
import { cachedSystem } from "@/src/agent/prompts/common";
import {
  PRECISE_ELEMENT_DRAFTER_SYSTEM,
  PRECISE_ELEMENT_STRUCTURED_DRAFTER_SYSTEM,
} from "@/src/agent/prompts/precise-element-drafter";
import { validateProposal, type DrafterToolState, type WorkerSubmission } from "@/src/agent/tools";
import type { ElementCoverage, Finding, FindingStatus, PipelineConfig } from "@/src/agent/types";
import type { DocumentModel, RedlineOp } from "@/src/engine/types";
import type { Playbook, Rule } from "@/src/playbook/schema";

const PreciseRepairOpSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("replace"), paragraphId: z.string(), oldText: z.string(), newText: z.string() }),
  z.object({
    kind: z.literal("insert_after"),
    paragraphId: z.string(),
    text: z.string(),
    numbering: z.string().optional(),
    asHeading: z.boolean().optional(),
  }),
  z.object({ kind: z.literal("delete_paragraph"), paragraphId: z.string() }),
]);

const PreciseRepairMappingSchema = z.discriminatedUnion("status", [
  z.object({ element: z.string(), status: z.literal("already_met"), quote: z.string() }),
  z.object({
    element: z.string(),
    status: z.literal("addressed_by_operation"),
    operationIndexes: z.array(z.number().int().positive()).min(1),
  }),
]);

const PreciseRepairOutputSchema = z.object({
  supportingParagraphIds: z.array(z.string()),
  proposal: z.object({
    ops: z.array(PreciseRepairOpSchema).min(1),
    comment: z.string().min(1),
    level: z.enum(["preferred", "fallback"]),
    summary: z.string().min(1),
    precedentId: z.string().optional(),
  }),
  elementCoverage: z.object({
    level: z.enum(["preferred", "fallback"]),
    mappings: z.array(PreciseRepairMappingSchema).min(1),
  }),
});

export interface PreciseElementDrafterSession {
  messages: Anthropic.Beta.BetaMessageParam[];
  tools: RunnableTool[];
  state: ElementDrafterToolState;
}

export interface PreciseElementDrafterResult {
  finding: Finding;
  session?: PreciseElementDrafterSession;
}

function actionableStatus(status: FindingStatus): status is "deviation" | "missing" {
  return status === "deviation" || status === "missing";
}

function establishedSummary(finding: Finding): unknown {
  return {
    status: finding.status,
    paragraphIds: finding.paragraphIds,
    quote: finding.quote,
    rationale: finding.rationale,
    proposal: finding.proposal,
  };
}

function contextualParagraphs(input: {
  document: DocumentModel;
  plan: RulePlan;
  established: Finding;
  current: Finding;
}): Array<{ id: string; text: string }> {
  const ids = new Set(input.established.paragraphIds);
  for (const paragraphId of input.plan.candidateParagraphIds) ids.add(paragraphId);
  for (const op of input.current.proposal?.ops ?? []) ids.add(op.paragraphId);

  // A locked finding and its current operations normally provide the exact anchors. Only
  // fall back to a bounded slice of candidate sections when the detector supplied none.
  if (ids.size === 0) {
    for (const sectionId of input.plan.candidateSectionIds) {
      const section = input.document.sections.find((candidate) => candidate.id === sectionId);
      for (const paragraphId of section?.paragraphIds.slice(0, 6) ?? []) ids.add(paragraphId);
    }
  }

  // Neighbours are useful for insertion placement and split clauses, but whole candidate
  // sections made structured repairs hit output limits before producing any operations.
  const indexes = new Map(input.document.paragraphs.map((paragraph, index) => [paragraph.id, index]));
  for (const paragraphId of [...ids]) {
    const index = indexes.get(paragraphId);
    if (index === undefined) continue;
    for (let offset = -2; offset <= 2; offset += 1) {
      const neighbour = input.document.paragraphs[index + offset];
      if (neighbour) ids.add(neighbour.id);
    }
  }
  return input.document.paragraphs
    .filter((paragraph) => ids.has(paragraph.id))
    .map((paragraph) => ({ id: paragraph.id, text: paragraph.text }));
}

function contextualDefinitions(
  document: DocumentModel,
  context: ReadonlyArray<{ id: string; text: string }>,
  rule: Rule,
  current: Finding,
): Array<{ term: string; paragraphId: string; text: string }> {
  const haystack = [
    ...context.map((paragraph) => paragraph.text),
    rule.position.preferred,
    rule.position.fallback,
    JSON.stringify(current.proposal ?? null),
  ].join("\n").toLocaleLowerCase("en-US");
  return document.definitions
    .filter((definition) => haystack.includes(definition.term.toLocaleLowerCase("en-US")))
    .map((definition) => ({
      term: definition.term,
      paragraphId: definition.paragraphId,
      text: definition.text,
    }));
}

function candidateParagraphIds(
  established: Finding,
  ops: readonly RedlineOp[],
  supportingParagraphIds: readonly string[],
): string[] {
  const operationIds = ops.map((op) => op.paragraphId);
  if (established.status === "missing") return [...new Set([...operationIds, ...supportingParagraphIds])];
  return [...new Set([...established.paragraphIds, ...operationIds, ...supportingParagraphIds])];
}

async function repairFindingStructured(input: {
  document: DocumentModel;
  playbook: Playbook;
  rule: Rule;
  plan: RulePlan;
  parties: Parties;
  config: PipelineConfig;
  llm: LlmClient;
  established: Finding;
  current: Finding;
  verifierFeedback: string;
}): Promise<PreciseElementDrafterResult> {
  const context = contextualParagraphs(input);
  const definitions = contextualDefinitions(input.document, context, input.rule, input.current);
  const messages: Anthropic.MessageParam[] = [{
    role: "user",
    content: [
      `Parties: we represent ${input.parties.ourParty}; counterparty is ${input.parties.counterparty}.`,
      `Locked detection result (repair proposal only):\n${JSON.stringify(establishedSummary(input.established))}`,
      `Rule prose and exact atomic checklist:\n${ruleWithElements(input.rule, activeElements(input.rule, input.config))}`,
      `Source paragraphs (the only valid anchors and oldText source):\n${JSON.stringify(context)}`,
      `Definitions:\n${JSON.stringify(definitions)}`,
      `Current proposal:\n${JSON.stringify(input.current.proposal ?? null)}`,
      `Independent verifier and deterministic feedback:\n${input.verifierFeedback}`,
      "Return one complete selected level with the smallest valid operations and exact one-to-one coverage. " +
        "List every untouched paragraph relied on in supportingParagraphIds. Every selected element must be either " +
        "already_met with a verbatim quote from those paragraphs or addressed_by_operation; unaddressed is not an output option.",
    ].join("\n\n"),
  }];
  let errors: string[] = [];
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    if (errors.length > 0) {
      messages.push({
        role: "user",
        content: `The candidate failed pre-submit validation. Repair exactly these errors and return a complete replacement candidate:\n${errors.join("\n")}`,
      });
    }
    const response = await input.llm.complete({
      agent: "drafter",
      ruleId: input.rule.id,
      findingId: input.established.id,
      model: input.config.model,
      effort: input.config.effort,
      maxTokens: 16_000,
      system: cachedSystem(PRECISE_ELEMENT_STRUCTURED_DRAFTER_SYSTEM, input.playbook),
      messages,
      schema: PreciseRepairOutputSchema,
    });
    const proposal: NonNullable<WorkerSubmission["proposal"]> = {
      ...response.data.proposal,
      ops: response.data.proposal.ops as RedlineOp[],
    };
    const elementCoverage = response.data.elementCoverage as ElementCoverage;
    const contextIds = new Set(context.map((paragraph) => paragraph.id));
    const unknownSupportingIds = response.data.supportingParagraphIds
      .filter((paragraphId) => !contextIds.has(paragraphId));
    const paragraphIds = candidateParagraphIds(
      input.established,
      proposal.ops,
      response.data.supportingParagraphIds,
    );
    const proposalState: DrafterToolState = {};
    const base = validateProposal(input.document, input.config, proposalState, proposal);
    const deterministic = deterministicPreciseChecks({
      document: input.document,
      rule: input.rule,
      status: input.established.status,
      target: proposal.level,
      paragraphIds,
      ops: proposal.ops,
    });
    const coverage = elementCoverageGate({
      elements: activeElements(input.rule, input.config),
      document: input.document,
      rule: input.rule,
      status: input.established.status,
      paragraphIds,
      proposalLevel: proposal.level,
      operationCount: proposal.ops.length,
      coverage: elementCoverage,
    });
    errors = [
      ...unknownSupportingIds.map((paragraphId) => `Unknown supporting paragraph outside supplied context: ${paragraphId}`),
      ...base.errors,
      ...deterministic.checks.filter((check) => !check.ok).map((check) => `${check.name}: ${check.detail ?? "failed"}`),
      ...coverage.errors,
    ];
    if (errors.length === 0) {
      return {
        finding: {
          ...input.current,
          id: input.established.id,
          status: input.established.status,
          paragraphIds,
          rationale: input.established.rationale,
          proposal,
          elementCoverage,
          verification: undefined,
        },
      };
    }
    messages.push({ role: "assistant", content: response.text });
  }
  throw new Error(`Structured precision repair failed validation: ${errors.join("; ")}`);
}

function initialMessage(input: {
  rule: Rule;
  plan: RulePlan;
  parties: Parties;
  config: PipelineConfig;
  established: Finding;
}): string {
  return [
    `Parties: we represent ${input.parties.ourParty}; counterparty is ${input.parties.counterparty}.`,
    `Locked detection result (repair proposal quality only):\n${JSON.stringify(establishedSummary(input.established))}`,
    `Rule prose and mirrored atomic drafting checklist:\n${ruleWithElements(input.rule, activeElements(input.rule, input.config))}`,
    `Original planner evidence:\n${JSON.stringify(input.plan)}`,
    ...(input.config.elementMarkedMemory
      ? ["Call lookup_precedent at most once before the first proposal. Use only language needed for the chosen level; approved extras remain extras."]
      : []),
    "Read the cited source, choose one complete level, repair only the proposal, validate it, map every selected element, and submit with the locked status.",
  ].join("\n\n");
}

function toFinding(
  document: DocumentModel,
  rule: Rule,
  status: "deviation" | "missing",
  state: ElementDrafterToolState,
): Finding {
  const submission = state.submission;
  if (!submission) throw new Error(`Precise drafter ${rule.id} stopped without a successful submission`);
  if (submission.status !== status) throw new Error(`Precise drafter changed locked ${rule.id} status`);
  const first = document.paragraphs.find((paragraph) => paragraph.id === submission.paragraphIds[0]);
  const section = document.sections.find((candidate) => candidate.id === first?.sectionId);
  return {
    id: stableFindingId(rule.id, submission.paragraphIds, submission.status, submission.quote),
    ruleId: rule.id,
    ruleTitle: rule.title,
    severity: rule.severity,
    status: submission.status,
    paragraphIds: submission.paragraphIds,
    sectionId: first?.sectionId,
    sectionRef: section ? `${section.number ? `§ ${section.number} ` : ""}${section.heading}` : undefined,
    quote: submission.quote,
    rationale: submission.rationale,
    proposal: submission.proposal,
    elementCoverage: submission.elementCoverage,
    confidence: submission.confidence,
    producedBy: "drafter",
  };
}

export async function repairFindingPrecisely(input: {
  document: DocumentModel;
  playbook: Playbook;
  rule: Rule;
  plan: RulePlan;
  parties: Parties;
  config: PipelineConfig;
  llm: LlmClient;
  established: Finding;
  current: Finding;
  memory?: PrecedentMemory;
  session?: PreciseElementDrafterSession;
  verifierFeedback: string;
}): Promise<PreciseElementDrafterResult> {
  const { document, playbook, rule, plan, parties, config, llm, memory, established } = input;
  const lockedStatus = established.status;
  if (!actionableStatus(lockedStatus)) throw new Error(`Cannot precision-repair ${lockedStatus}`);
  if (!config.longDocumentPlanning || document.stats.words < config.longDocumentThresholdWords) {
    return repairFindingStructured(input);
  }
  const setup = input.session ?? (() => {
    const created = createElementDrafterTools({
      document,
      config,
      rule,
      memory,
      expectedStatus: lockedStatus,
      requiredParagraphIds: established.paragraphIds,
    });
    return {
      tools: created.tools,
      state: created.state,
      messages: [{
        role: "user",
        content: initialMessage({ rule, plan, parties, config, established }),
      }] as Anthropic.Beta.BetaMessageParam[],
    };
  })();
  setup.state.submission = undefined;
  setup.state.validatedProposal = undefined;
  setup.messages.push({
    role: "user",
    content: [
      "Independent prose-derived verifier feedback (repair every exact item):",
      input.verifierFeedback,
      `Current proposal:\n${JSON.stringify(input.current.proposal ?? null)}`,
      "Re-read only the source needed, submit the same locked status, and stop after submit_finding returns ok:true.",
    ].join("\n\n"),
  });
  const result = await llm.runTools({
    agent: "drafter",
    ruleId: rule.id,
    effort: config.effort,
    model: config.model,
    system: cachedSystem(PRECISE_ELEMENT_DRAFTER_SYSTEM, playbook),
    messages: setup.messages,
    tools: setup.tools,
    maxIterations: config.workerMaxIterations,
  });
  setup.messages = result.messages;
  return { finding: toFinding(document, rule, lockedStatus, setup.state), session: setup };
}
