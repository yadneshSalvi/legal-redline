import type Anthropic from "@anthropic-ai/sdk";

import { ruleWithElements } from "@/src/agent/element-format";
import { createElementDrafterTools, type ElementDrafterToolState } from "@/src/agent/element-tools";
import { stableFindingId } from "@/src/agent/id";
import type { LlmClient, RunnableTool } from "@/src/agent/llm";
import type { PrecedentMemory } from "@/src/agent/memory";
import type { Parties, RulePlan } from "@/src/agent/planner";
import { cachedSystem } from "@/src/agent/prompts/common";
import { ELEMENT_DRAFTER_SYSTEM } from "@/src/agent/prompts/element-drafter";
import type { Finding, PipelineConfig } from "@/src/agent/types";
import type { DocumentModel } from "@/src/engine/types";
import type { Playbook, Rule } from "@/src/playbook/schema";

export interface ElementDrafterSession {
  messages: Anthropic.Beta.BetaMessageParam[];
  tools: RunnableTool[];
  state: ElementDrafterToolState;
}

export interface ElementDrafterRoundResult {
  finding: Finding;
  session: ElementDrafterSession;
}

function initialMessage(rule: Rule, plan: RulePlan, parties: Parties, config: PipelineConfig): string {
  return [
    `Parties: we represent ${parties.ourParty}; counterparty is ${parties.counterparty}.`,
    `Rule and atomic checklists:\n${ruleWithElements(rule)}`,
    `Planner evidence and hints:\n${JSON.stringify(plan)}`,
    ...(config.elementMarkedMemory
      ? ["Before drafting an actionable proposal, call lookup_precedent. Treat returned approved language as an element-marked template, adapt it to this contract, and verify every marker; do not copy non-element extras."]
      : []),
    "Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.",
  ].join("\n\n");
}

function toFinding(document: DocumentModel, rule: Rule, state: ElementDrafterToolState): Finding {
  const submission = state.submission;
  if (!submission) throw new Error(`Element drafter ${rule.id} stopped without a successful submit_finding call`);
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

export async function draftRuleWithElements(input: {
  document: DocumentModel;
  playbook: Playbook;
  rule: Rule;
  plan: RulePlan;
  parties: Parties;
  config: PipelineConfig;
  llm: LlmClient;
  memory?: PrecedentMemory;
  session?: ElementDrafterSession;
  verifierFeedback?: string;
}): Promise<ElementDrafterRoundResult> {
  const { document, playbook, rule, plan, parties, config, llm, memory } = input;
  const setup = input.session ?? (() => {
    const { tools, state } = createElementDrafterTools({ document, config, rule, memory });
    return {
      tools,
      state,
      messages: [{ role: "user", content: initialMessage(rule, plan, parties, config) }] as Anthropic.Beta.BetaMessageParam[],
    };
  })();
  if (input.verifierFeedback) {
    setup.state.submission = undefined;
    setup.state.validatedProposal = undefined;
    setup.messages.push({
      role: "user",
      content: `Independent verifier feedback follows. Exact unmet checklist text must be repaired in operative language:\n${input.verifierFeedback}\n\nRe-read any needed source text, validate the revised proposal, rebuild elementCoverage, and submit again.`,
    });
  }
  const result = await llm.runTools({
    agent: "drafter",
    ruleId: rule.id,
    effort: config.effort,
    model: config.model,
    system: cachedSystem(ELEMENT_DRAFTER_SYSTEM, playbook),
    messages: setup.messages,
    tools: setup.tools,
    maxIterations: config.workerMaxIterations,
  });
  setup.messages = result.messages;
  return { finding: toFinding(document, rule, setup.state), session: setup };
}
