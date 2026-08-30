import { z } from "zod";

import { renderElementProposal } from "@/src/agent/element-gates";
import type { LlmClient } from "@/src/agent/llm";
import { deterministicPreciseChecks } from "@/src/agent/precise-element-gates";
import { cachedSystem } from "@/src/agent/prompts/common";
import { PRECISE_ELEMENT_VERIFIER_SYSTEM } from "@/src/agent/prompts/precise-element-verifier";
import type {
  Finding,
  PipelineConfig,
  PositionLevel,
  Severity,
  VerificationCheck,
  VerificationElement,
} from "@/src/agent/types";
import type { DocumentModel } from "@/src/engine/types";
import type { Playbook, Rule } from "@/src/playbook/schema";

const ProseElementSchema = z.object({
  element: z.string().min(1),
  level: z.enum(["preferred", "fallback"]),
  status: z.enum(["met", "not_met", "cannot_tell"]),
  evidence: z.string().min(1),
});

const PreciseVerifierOutputSchema = z.object({
  elements: z.array(ProseElementSchema).min(2),
  satisfies_preferred: z.boolean(),
  satisfies_fallback: z.boolean(),
  minimal: z.boolean(),
  preserves_intent: z.boolean(),
  offending_extra_words: z.array(z.string()),
  reasons: z.array(z.string()),
  severityAdjustment: z.enum(["critical", "high", "medium", "low"]).optional(),
});

export type PreciseVerifierOutput = z.infer<typeof PreciseVerifierOutputSchema>;

export interface PreciseVerifierResult {
  finding: Finding;
  feedback: string;
}

function complete(elements: readonly VerificationElement[], level: PositionLevel): boolean {
  const selected = elements.filter((element) => element.level === level);
  return selected.length > 0 && selected.every((element) => element.status === "met");
}

function referencedDefinitions(document: DocumentModel, text: string): string {
  const normalized = text.toLocaleLowerCase("en-US");
  return document.definitions
    .filter((definition) => normalized.includes(definition.term.toLocaleLowerCase("en-US")))
    .map((definition) => `${definition.term}: ${definition.text}`)
    .join("\n");
}

export function preciseVerifierFeedback(input: {
  target: PositionLevel;
  elements: readonly VerificationElement[];
  checks: readonly VerificationCheck[];
  minimal: boolean;
  preservesIntent: boolean;
  offendingExtraWords: readonly string[];
  reasons: readonly string[];
}): string {
  const sections: string[] = [
    `Current target level: ${input.target}. Keep one complete level with no hybrid. ` +
    "Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.",
  ];
  const misses = input.elements.filter((element) =>
    element.level === input.target && element.status !== "met");
  if (misses.length > 0) {
    sections.push(
      `Unmet prose-derived ${input.target} elements (repair these exact requirements):\n` +
      misses.map((element) =>
        `- ${element.element}\n  Verdict: ${element.status}. Evidence: ${element.evidence}`).join("\n"),
    );
  }
  const failedChecks = input.checks.filter((check) => !check.ok);
  if (failedChecks.length > 0) {
    sections.push(
      `Deterministic official failures:\n${failedChecks.map((check) =>
        `- ${check.name}: ${check.detail ?? "failed"}`).join("\n")}`,
    );
  }
  if (input.offendingExtraWords.length > 0) {
    sections.push(
      `Offending extra words to remove verbatim:\n${input.offendingExtraWords.map((words) => `- ${words}`).join("\n")}`,
    );
  }
  if (!input.minimal) {
    sections.push("Minimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.");
  }
  if (!input.preservesIntent) {
    sections.push("Intent failed: restore the exact unrelated language and eliminate the named contradiction or dangling mechanic.");
  }
  if (input.reasons.length > 0) {
    sections.push(`Verifier reasons:\n${input.reasons.map((reason) => `- ${reason}`).join("\n")}`);
  }
  return sections.join("\n\n");
}

export async function verifyFindingPrecisely(input: {
  document: DocumentModel;
  playbook: Playbook;
  rule: Rule;
  finding: Finding;
  config: PipelineConfig;
  llm: LlmClient;
  attempt: number;
}): Promise<PreciseVerifierResult> {
  const { document, playbook, rule, config, llm, attempt } = input;
  const proposal = input.finding.proposal;
  const target = proposal?.level ?? "fallback";
  const ops = proposal?.ops ?? [];
  const original = renderElementProposal(document, input.finding.paragraphIds, []);
  const deterministic = deterministicPreciseChecks({
    document,
    rule,
    status: input.finding.status,
    target,
    paragraphIds: input.finding.paragraphIds,
    ops,
  });
  const response = await llm.complete({
    agent: "verifier",
    ruleId: rule.id,
    findingId: input.finding.id,
    model: config.verifierModel,
    effort: config.verifierEffort,
    maxTokens: 5_000,
    system: cachedSystem(PRECISE_ELEMENT_VERIFIER_SYSTEM, playbook),
    messages: [{
      role: "user",
      content: [
        `Rule: ${rule.id} — ${rule.title}`,
        `Preferred position:\n${rule.position.preferred}`,
        `Fallback position:\n${rule.position.fallback}`,
        `Drafter's locked target level: ${target}`,
        `Original clause:\n${original || "No responsive clause; the proposal is an insertion."}`,
        `Rendered redlined clause:\n${deterministic.rendered}`,
        `Resolved definitions:\n${referencedDefinitions(document, `${original}\n${deterministic.rendered}`) || "none"}`,
        `Operations:\n${JSON.stringify(ops)}`,
        `Margin comment (non-operative):\n${proposal?.comment ?? "none"}`,
        `Deterministic official evidence:\n${JSON.stringify(deterministic.checks)}`,
      ].join("\n\n"),
    }],
    schema: PreciseVerifierOutputSchema,
  });
  const elements: VerificationElement[] = response.data.elements;
  const satisfiesPreferred = complete(elements, "preferred");
  const satisfiesFallback = complete(elements, "fallback");
  const targetComplete = target === "preferred" ? satisfiesPreferred : satisfiesFallback;
  const failedChecks = deterministic.checks.filter((check) => !check.ok);
  const pass = targetComplete && response.data.minimal && response.data.preserves_intent && failedChecks.length === 0;
  const feedback = preciseVerifierFeedback({
    target,
    elements,
    checks: deterministic.checks,
    minimal: response.data.minimal,
    preservesIntent: response.data.preserves_intent,
    offendingExtraWords: response.data.offending_extra_words,
    reasons: response.data.reasons,
  });
  const severity = (response.data.severityAdjustment ?? input.finding.severity) as Severity;
  const notes = [
    ...failedChecks.map((check) => `${check.name}: ${check.detail ?? "failed"}`),
    ...response.data.reasons,
  ].join(" ");
  return {
    feedback,
    finding: {
      ...input.finding,
      severity,
      verification: {
        verdict: pass ? (attempt > 1 ? "repaired" : "pass") : "fail",
        attempts: attempt,
        notes,
        checks: deterministic.checks,
        elements,
        satisfiesPreferred,
        satisfiesFallback,
        minimal: response.data.minimal,
        preservesIntent: response.data.preserves_intent,
      },
    },
  };
}
