import type { Finding, Precedent } from "@/src/agent/types";
import { validateOp } from "@/src/engine";
import { normalizeForMatch } from "@/src/engine/text";
import type { DocumentModel } from "@/src/engine/types";
import type { Rule } from "@/src/playbook/schema";

import type { GoldFile } from "./gold";
import type { JudgeV2Result } from "./judge";
import { changedCharacterRatio, proposalPassesChecks, type ComponentMetrics } from "./metrics";
import { matchFindings } from "./match";
import type { TrackedChangeYieldResult } from "./tracked-change-yield";

export interface Round2Metrics {
  completeRedline: ComponentMetrics;
  appliedTrackedChangeYield: ComponentMetrics;
  precedentAdherence: ComponentMetrics;
}

function ratio(numerator: number, denominator: number): number {
  return denominator === 0 ? 0 : numerator / denominator;
}

export function normalizedTokenJaccard(left: string, right: string): number {
  const tokens = (value: string): Set<string> => new Set(
    normalizeForMatch(value)
      .replace(/[^a-z0-9]+/g, " ")
      .split(/\s+/)
      .filter((token) => token.length > 2),
  );
  const leftTokens = tokens(left);
  const rightTokens = tokens(right);
  if (leftTokens.size === 0 && rightTokens.size === 0) return 1;
  let intersection = 0;
  for (const token of leftTokens) if (rightTokens.has(token)) intersection += 1;
  return ratio(intersection, leftTokens.size + rightTokens.size - intersection);
}

function proposalOperativeText(finding: Finding): string {
  return (finding.proposal?.ops ?? []).map((op) => {
    if (op.kind === "replace") return op.newText;
    if (op.kind === "insert_after") return op.text;
    return "";
  }).filter(Boolean).join("\n");
}

export function computeRound2Metrics(input: {
  gold: GoldFile;
  findings: readonly Finding[];
  document: DocumentModel;
  rules: readonly Rule[];
  judgements: Readonly<Record<string, JudgeV2Result>>;
  trackedChangeYield: TrackedChangeYieldResult;
  precedents: readonly Pick<Precedent, "ruleId" | "clauseAfter">[];
}): Round2Metrics {
  const matched = matchFindings(input.findings, input.gold);
  const matchesByGold = new Map(matched.matches.map((match) => [match.gold.id, match.finding]));
  const positives = input.gold.items.filter((item) => item.status === "deviation" || item.status === "missing");
  let complete = 0;
  let yielded = 0;
  let adherenceEligible = 0;
  let adherencePassing = 0;
  const applied = new Set(input.trackedChangeYield.appliedFindingIds);
  for (const gold of positives) {
    const finding = matchesByGold.get(gold.id);
    if (finding === undefined || (finding.status !== "deviation" && finding.status !== "missing") ||
      finding.proposal === undefined) continue;
    const rule = input.rules.find((candidate) => candidate.id === finding.ruleId);
    const judgement = input.judgements[finding.id];
    const applies = finding.proposal.ops.every((op) => validateOp(input.document, op).ok);
    const checks = rule !== undefined && proposalPassesChecks(input.document, finding, rule);
    const deterministicMinimal = finding.proposal.ops.every(
      (op) => op.kind !== "replace" || changedCharacterRatio(op) <= 0.6,
    );
    if (applies && checks && judgement !== undefined &&
      (judgement.satisfies_preferred || judgement.satisfies_fallback) && judgement.minimal &&
      judgement.preserves_intent && deterministicMinimal) complete += 1;
    if (applied.has(finding.id)) yielded += 1;

    const sameRule = input.precedents.filter((precedent) => precedent.ruleId === finding.ruleId);
    if (sameRule.length > 0) {
      adherenceEligible += 1;
      const proposed = proposalOperativeText(finding);
      const score = Math.max(...sameRule.map((precedent) => normalizedTokenJaccard(proposed, precedent.clauseAfter)));
      if (score >= 0.6) adherencePassing += 1;
    }
  }
  return {
    completeRedline: { eligible: positives.length, passing: complete, rate: ratio(complete, positives.length) },
    appliedTrackedChangeYield: { eligible: positives.length, passing: yielded, rate: ratio(yielded, positives.length) },
    precedentAdherence: {
      eligible: adherenceEligible,
      passing: adherencePassing,
      rate: ratio(adherencePassing, adherenceEligible),
    },
  };
}
