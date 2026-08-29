import type Anthropic from "@anthropic-ai/sdk";

import type { LlmClient, RunnableTool } from "@/src/agent/llm";
import type { PrecedentMemory } from "@/src/agent/memory";
import type { Parties, RulePlan } from "@/src/agent/planner";
import { cachedSystem } from "@/src/agent/prompts/common";
import { DRAFTER_SYSTEM } from "@/src/agent/prompts/drafter";
import { createDrafterTools } from "@/src/agent/tools";
import type { DrafterToolState } from "@/src/agent/tools";
import type { Finding, PipelineConfig } from "@/src/agent/types";
import type { DocumentModel } from "@/src/engine/types";
import { stableFindingId } from "@/src/agent/id";
import { ruleFull } from "@/src/playbook/loader";
import type { Playbook, Rule } from "@/src/playbook/schema";

export interface DrafterSession {
  messages: Anthropic.Beta.BetaMessageParam[];
  tools: RunnableTool[];
  state: DrafterToolState;
}

export interface DrafterRoundResult {
  finding: Finding;
  session: DrafterSession;
}

function initialMessage(rule: Rule, plan: RulePlan, parties: Parties): string {
  return [
    `Parties: we represent ${parties.ourParty}; counterparty is ${parties.counterparty}.`,
    `Rule:\n${ruleFull(rule)}`,
    `Planner hints:\n${JSON.stringify(plan)}`,
    "Investigate this rule, validate any proposal, and submit one finding.",
  ].join("\n\n");
}

function toFinding(document: DocumentModel, rule: Rule, state: DrafterToolState): Finding {
  const submission = state.submission;
  if (!submission) throw new Error(`Drafter ${rule.id} stopped without a successful submit_finding call`);
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
    confidence: submission.confidence,
    producedBy: "drafter",
  };
}

export async function draftRule(input: {
  document: DocumentModel;
  playbook: Playbook;
  rule: Rule;
  plan: RulePlan;
  parties: Parties;
  config: PipelineConfig;
  llm: LlmClient;
  memory?: PrecedentMemory;
  session?: DrafterSession;
  verifierFeedback?: string;
}): Promise<DrafterRoundResult> {
  const { document, playbook, rule, plan, parties, config, llm, memory } = input;
  const setup = input.session ?? (() => {
    const { tools, state } = createDrafterTools({ document, config, ruleId: rule.id, memory });
    return {
      tools,
      state,
      messages: [{ role: "user", content: initialMessage(rule, plan, parties) }] as Anthropic.Beta.BetaMessageParam[],
    };
  })();
  if (input.verifierFeedback) {
    setup.state.submission = undefined;
    setup.state.validatedProposal = undefined;
    setup.messages.push({ role: "user", content: `Verifier feedback: ${input.verifierFeedback}\nRepair the finding, validate it again, and submit it.` });
  }
  const result = await llm.runTools({
    agent: "drafter",
    ruleId: rule.id,
    effort: config.effort,
    model: config.model,
    system: cachedSystem(DRAFTER_SYSTEM, playbook),
    messages: setup.messages,
    tools: setup.tools,
    maxIterations: 12,
  });
  setup.messages = result.messages;
  return { finding: toFinding(document, rule, setup.state), session: setup };
}
