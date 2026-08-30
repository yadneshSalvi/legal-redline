import { z } from "zod";

import {
  deterministicElementChecks,
  elementCoverageGate,
} from "@/src/agent/element-gates";
import { ruleWithElements } from "@/src/agent/element-format";
import type { LlmClient } from "@/src/agent/llm";
import { cachedSystem } from "@/src/agent/prompts/common";
import { ELEMENT_VERIFIER_SYSTEM } from "@/src/agent/prompts/element-verifier";
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

const VerifierElementSchema = z.object({
  element: z.string(),
  level: z.enum(["preferred", "fallback"]),
  status: z.enum(["met", "not_met", "cannot_tell"]),
  evidence: z.string(),
});

const ElementVerifierOutputSchema = z.object({
  elements: z.array(VerifierElementSchema),
  satisfies_preferred: z.boolean(),
  satisfies_fallback: z.boolean(),
  minimal: z.boolean(),
  preserves_intent: z.boolean(),
  reasons: z.array(z.string()),
  severityAdjustment: z.enum(["critical", "high", "medium", "low"]).optional(),
});

export interface ElementVerifierResult {
  finding: Finding;
  feedback: string;
}

function originalContext(document: DocumentModel, finding: Finding): string {
  return finding.paragraphIds
    .map((id) => document.paragraphs.find((paragraph) => paragraph.id === id))
    .filter((paragraph) => paragraph !== undefined)
    .map((paragraph) => `${paragraph.id}: ${paragraph.text}`)
    .join("\n");
}

function referencedDefinitions(document: DocumentModel, text: string): string {
  return document.definitions
    .filter((definition) => text.toLowerCase().includes(definition.term.toLowerCase()))
    .map((definition) => `${definition.term}: ${definition.text}`)
    .join("\n");
}

function normalizeElements(rule: Rule, supplied: readonly z.infer<typeof VerifierElementSchema>[]): VerificationElement[] {
  return (["preferred", "fallback"] as const).flatMap((level) => rule.position.elements[level].map((element) => {
    const match = supplied.find((candidate) =>
      candidate.level === level && candidate.element.replace(/^[PF]\d+\.\s*/u, "") === element);
    if (!match) return {
      element,
      level,
      status: "cannot_tell" as const,
      evidence: "Verifier omitted this required element.",
    };
    return { ...match, element };
  }));
}

function complete(elements: readonly VerificationElement[], level: PositionLevel): boolean {
  const atLevel = elements.filter((element) => element.level === level);
  return atLevel.length > 0 && atLevel.every((element) => element.status === "met");
}

function targetMisses(elements: readonly VerificationElement[], level: PositionLevel): VerificationElement[] {
  return elements.filter((element) => element.level === level && element.status !== "met");
}

function actionableChecks(checks: readonly VerificationCheck[]): VerificationCheck[] {
  return checks.filter((check) => !check.ok);
}

function feedbackFor(input: {
  finding: Finding;
  elements: readonly VerificationElement[];
  checks: readonly VerificationCheck[];
  minimal: boolean;
  preservesIntent: boolean;
  reasons: readonly string[];
}): string {
  const target = input.finding.proposal?.level ?? input.finding.elementCoverage?.level ?? "fallback";
  const misses = targetMisses(input.elements, target);
  const sections: string[] = [];
  if (misses.length) {
    sections.push(
      `Unmet ${target} elements (copy these exact strings into the repaired coverage):\n` +
        misses.map((item) => `- ${item.element}\n  Verdict: ${item.status}. Evidence: ${item.evidence}`).join("\n"),
    );
  }
  const failed = actionableChecks(input.checks);
  if (failed.length) {
    sections.push(`Deterministic failures:\n${failed.map((check) => `- ${check.name}: ${check.detail ?? "failed"}`).join("\n")}`);
  }
  if (!input.minimal) sections.push("Minimality defect: revise only the words needed for one complete checklist level and remove extra terms.");
  if (!input.preservesIntent) sections.push("Intent defect: restore unrelated commercial language and remove contradictions introduced by the redline.");
  if (input.reasons.length) sections.push(`Verifier reasons:\n${input.reasons.map((reason) => `- ${reason}`).join("\n")}`);
  return sections.join("\n\n") || "The verifier could not establish a complete target position; re-check every element.";
}

/** Compliant findings have no redline to element-check and do not consume verifier/repair budget. */
export function skipCompliantElementVerification(finding: Finding): Finding {
  return {
    ...finding,
    verification: {
      verdict: "pass",
      attempts: 0,
      notes: "No proposal: element-level redline verification is not applicable.",
      checks: [],
    },
  };
}

export async function verifyFindingWithElements(input: {
  document: DocumentModel;
  playbook: Playbook;
  rule: Rule;
  finding: Finding;
  config: PipelineConfig;
  llm: LlmClient;
  attempt: number;
}): Promise<ElementVerifierResult> {
  const { document, playbook, rule, config, llm, attempt } = input;
  const ops = input.finding.proposal?.ops ?? [];
  const deterministic = deterministicElementChecks({
    document,
    rule,
    status: input.finding.status,
    proposalLevel: input.finding.proposal?.level,
    paragraphIds: input.finding.paragraphIds,
    ops,
  });
  const coverage = elementCoverageGate({
    document,
    rule,
    status: input.finding.status,
    paragraphIds: input.finding.paragraphIds,
    proposalLevel: input.finding.proposal?.level,
    operationCount: ops.length,
    coverage: input.finding.elementCoverage,
  });
  const coverageChecks: VerificationCheck[] = coverage.ok
    ? [{ name: "element coverage gate", ok: true }]
    : coverage.errors.map((detail) => ({ name: "element coverage gate", ok: false, detail }));
  const checks = [...deterministic.checks, ...coverageChecks];
  const originals = originalContext(document, input.finding);
  const response = await llm.complete({
    agent: "verifier",
    ruleId: rule.id,
    findingId: input.finding.id,
    model: config.verifierModel,
    effort: config.verifierEffort,
    system: cachedSystem(ELEMENT_VERIFIER_SYSTEM, playbook),
    messages: [{
      role: "user",
      content: [
        `Rule and exact checklists:\n${ruleWithElements(rule)}`,
        `Claimed finding status: ${input.finding.status}`,
        `Claimed target and element mapping:\n${JSON.stringify(input.finding.elementCoverage ?? null)}`,
        `Finding rationale:\n${input.finding.rationale}`,
        `Original cited paragraphs:\n${originals || "No source paragraph was cited."}`,
        `Resolved definitions:\n${referencedDefinitions(document, originals) || "none"}`,
        `Rendered operative language:\n${deterministic.rendered || "none"}`,
        `Margin comment:\n${input.finding.proposal?.comment ?? "none"}`,
        `Deterministic evidence:\n${JSON.stringify(checks)}`,
      ].join("\n\n"),
    }],
    schema: ElementVerifierOutputSchema,
  });
  const elements = normalizeElements(rule, response.data.elements);
  const satisfiesPreferred = complete(elements, "preferred");
  const satisfiesFallback = complete(elements, "fallback");
  const hardFailures = actionableChecks(checks);
  const pass =
    (satisfiesPreferred || satisfiesFallback) &&
    response.data.minimal &&
    response.data.preserves_intent &&
    hardFailures.length === 0;
  const feedback = feedbackFor({
    finding: input.finding,
    elements,
    checks,
    minimal: response.data.minimal,
    preservesIntent: response.data.preserves_intent,
    reasons: response.data.reasons,
  });
  const notes = [
    ...hardFailures.map((check) => `${check.name}: ${check.detail ?? "failed"}`),
    ...response.data.reasons,
  ].join(" ");
  const severity = (response.data.severityAdjustment ?? input.finding.severity) as Severity;
  return {
    feedback,
    finding: {
      ...input.finding,
      severity,
      verification: {
        verdict: pass ? (attempt > 1 ? "repaired" : "pass") : "fail",
        attempts: attempt,
        notes,
        checks,
        elements,
        satisfiesPreferred,
        satisfiesFallback,
        minimal: response.data.minimal,
        preservesIntent: response.data.preserves_intent,
      },
    },
  };
}
