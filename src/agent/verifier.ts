import { diffChars } from "diff";
import { z } from "zod";

import type { LlmClient } from "@/src/agent/llm";
import { cachedSystem } from "@/src/agent/prompts/common";
import { VERIFIER_SYSTEM } from "@/src/agent/prompts/verifier";
import type { Finding, PipelineConfig, Severity, VerificationCheck } from "@/src/agent/types";
import type { DocumentModel, RedlineOp } from "@/src/engine/types";
import { renderParagraph, validateOp } from "@/src/engine";
import { ruleFull } from "@/src/playbook/loader";
import type { Playbook, Rule } from "@/src/playbook/schema";

const VerifierOutputSchema = z.object({
  verdict: z.enum(["pass", "fail"]),
  reasons: z.array(z.string()),
  severityAdjustment: z.enum(["critical", "high", "medium", "low"]).optional(),
});

export interface VerifierResult {
  finding: Finding;
  feedback: string;
}

const NUMBER_WORDS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
  thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20,
  thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90, hundred: 100,
};

/** Rewrite written-out numbers ("thirty", "twenty-four", "one hundred eighty") as digits so numeric checks can read them. */
export function normalizeNumberWords(text: string): string {
  return text.replace(
    /\b(?:(one|two|three|four|five|six|seven|eight|nine)\s+hundred(?:\s+and)?\s*)?((?:twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)(?:[-\s](?:one|two|three|four|five|six|seven|eight|nine))?|[a-z]+)\b/gi,
    (whole, hundreds: string | undefined, rest: string) => {
      const parts = rest.toLowerCase().split(/[-\s]/);
      const values = parts.map((part) => NUMBER_WORDS[part]);
      if (values.some((value) => value === undefined) || (values.length === 2 && values[0] < 20)) return whole;
      const total = (hundreds ? NUMBER_WORDS[hundreds.toLowerCase()] * 100 : 0) + values.reduce((sum, value) => sum + value, 0);
      return hundreds || NUMBER_WORDS[parts[0]] !== undefined ? String(total) : whole;
    },
  );
}

function postEditText(document: DocumentModel, paragraphId: string, ops: RedlineOp[]): string {
  const base = renderParagraph(document, paragraphId, ops)
    .filter((segment) => segment.type !== "delete")
    .map((segment) => segment.text)
    .join("");
  const inserted = ops.flatMap((op) => (op.kind === "insert_after" && op.paragraphId === paragraphId ? [op.text] : []));
  return [base, ...inserted].filter(Boolean).join("\n");
}

function deterministicChecks(document: DocumentModel, rule: Rule, finding: Finding): { checks: VerificationCheck[]; rendered: string } {
  // A compliant finding is judged on the untouched clause, never on an attached/proposed edit.
  const ops = finding.status === "compliant" ? [] : finding.proposal?.ops ?? [];
  const checks: VerificationCheck[] = ops.map((op, index) => {
    const validation = validateOp(document, op);
    return { name: `operation ${index + 1} applies`, ok: validation.ok, detail: validation.error };
  });
  const targetIds = [...new Set(ops.length ? ops.map((op) => op.paragraphId) : finding.paragraphIds)];
  let rendered = "";
  try {
    rendered = targetIds.map((id) => `${id}: ${postEditText(document, id, ops)}`).join("\n");
  } catch (error) {
    checks.push({ name: "redline renders", ok: false, detail: error instanceof Error ? error.message : String(error) });
  }
  for (const check of rule.checks) {
    let ok = false;
    let detail: string | undefined;
    try {
      if (check.type === "regex_present") ok = new RegExp(check.pattern, check.flags).test(rendered);
      if (check.type === "regex_absent") ok = !new RegExp(check.pattern, check.flags).test(rendered);
      if (check.type === "one_of") ok = check.phrases.some((phrase) => rendered.toLowerCase().includes(phrase.toLowerCase()));
      if (check.type === "number_min" || check.type === "number_max") {
        const match = new RegExp(check.pattern, "i").exec(normalizeNumberWords(rendered));
        const value = match?.[1] ? Number(match[1]) : Number.NaN;
        ok = Number.isFinite(value) && (check.type === "number_min" ? value >= check.min : value <= check.max);
        detail = Number.isFinite(value) ? `value=${value}` : "number not found";
      }
    } catch (error) {
      detail = error instanceof Error ? error.message : String(error);
    }
    checks.push({ name: check.label, ok, detail });
  }
  for (const op of ops) {
    if (op.kind !== "replace") continue;
    const changed = diffChars(op.oldText, op.newText)
      .filter((part) => part.added || part.removed)
      .reduce((sum, part) => sum + part.value.length, 0);
    const ratio = changed / Math.max(op.oldText.length, op.newText.length, 1);
    checks.push({
      name: `minimal edit ${op.paragraphId}`,
      ok: ratio <= 0.6,
      detail: `changed-character ratio=${ratio.toFixed(3)} (advisory: whole-clause rewrites are acceptable when the rule requires them)`,
    });
  }
  if ((finding.status === "deviation" || finding.status === "missing") && !finding.proposal) {
    checks.push({ name: "proposal present", ok: false, detail: "Deviation/missing finding has no proposal" });
  }
  return { checks, rendered };
}

/** Checks whose failure blocks a finding regardless of the model's verdict. */
function isHardCheck(name: string): boolean {
  return /^operation \d+ applies$/.test(name) || name === "redline renders" || name === "proposal present";
}

function originalContext(document: DocumentModel, finding: Finding): string {
  return finding.paragraphIds
    .map((id) => document.paragraphs.find((paragraph) => paragraph.id === id))
    .filter((paragraph) => Boolean(paragraph))
    .map((paragraph) => `${paragraph?.id}: ${paragraph?.text}`)
    .join("\n");
}

function referencedDefinitions(document: DocumentModel, text: string): string {
  return document.definitions
    .filter((definition) => text.toLowerCase().includes(definition.term.toLowerCase()))
    .map((definition) => `${definition.term}: ${definition.text}`)
    .join("\n");
}

export async function verifyFinding(input: {
  document: DocumentModel;
  playbook: Playbook;
  rule: Rule;
  finding: Finding;
  config: PipelineConfig;
  llm: LlmClient;
  attempt: number;
}): Promise<VerifierResult> {
  const { document, playbook, rule, config, llm, attempt } = input;
  const deterministic = deterministicChecks(document, rule, input.finding);
  const originals = originalContext(document, input.finding);
  const response = await llm.complete({
    agent: "verifier",
    ruleId: rule.id,
    findingId: input.finding.id,
    model: config.verifierModel,
    effort: config.verifierEffort,
    system: cachedSystem(VERIFIER_SYSTEM, playbook),
    messages: [
      {
        role: "user",
        content: [
          `Rule:\n${ruleFull(rule)}`,
          `Claimed finding status: ${input.finding.status}`,
          `Finding rationale:\n${input.finding.rationale}`,
          `Original paragraphs:\n${originals || "Missing clause; no source paragraph quoted."}`,
          `Resolved definitions:\n${referencedDefinitions(document, originals) || "none"}`,
          `Rendered redline:\n${deterministic.rendered || "none"}`,
          `Comment:\n${input.finding.proposal?.comment ?? "none"}`,
          `Deterministic checks:\n${JSON.stringify(deterministic.checks)}`,
        ].join("\n\n"),
      },
    ],
    schema: VerifierOutputSchema,
  });
  // Hard gates are mechanical facts (anchors resolve, the redline renders, a deviation carries a proposal).
  // Rule regexes and the minimality ratio are heuristics: they are evidence for the verifier model, not verdicts.
  const failedChecks = deterministic.checks.filter((check) => !check.ok);
  // A finding labelled compliant must satisfy the rule's own checks on the untouched clause; a failure there
  // sends it back to the drafter (which may re-classify it as a deviation, or escalate it after repairs).
  // "number not found" is inconclusive (phrasing), not a contradiction — it stays advisory even for compliant findings.
  const hardFailures = failedChecks.filter(
    (check) =>
      isHardCheck(check.name) ||
      (input.finding.status === "compliant" && !check.name.startsWith("minimal edit") && check.detail !== "number not found"),
  );
  const pass = response.data.verdict === "pass" && hardFailures.length === 0;
  const reasons = [
    ...hardFailures.map((check) => `${check.name}: ${check.detail ?? "failed"}`),
    ...response.data.reasons,
  ];
  const severity = (response.data.severityAdjustment ?? input.finding.severity) as Severity;
  const finding: Finding = {
    ...input.finding,
    severity,
    verification: {
      verdict: pass ? (attempt > 1 ? "repaired" : "pass") : "fail",
      attempts: attempt,
      notes: reasons.join(" "),
      checks: deterministic.checks,
    },
  };
  return { finding, feedback: reasons.join("; ") || "Verifier rejected the proposal; re-check the rule and redline." };
}

export function skipVerification(finding: Finding): Finding {
  return { ...finding, verification: { verdict: "skipped", attempts: 0, notes: "Verifier disabled by config.", checks: [] } };
}
