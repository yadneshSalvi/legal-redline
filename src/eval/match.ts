import type { Finding } from "@/src/agent/types";

import type { GoldFile, GoldItem } from "./gold";

export interface FindingGoldMatch {
  finding: Finding;
  gold: GoldItem;
}

export interface MatchResult {
  matches: FindingGoldMatch[];
  truePositiveFindingIds: string[];
  falsePositiveFindingIds: string[];
  falseNegativeGoldIds: string[];
  escalationFindingIds: string[];
  unmatchedFindingIds: string[];
  unmatchedGoldIds: string[];
  ambiguousItemIds: string[];
  ambiguousMatchFindingIds: string[];
}

function isIssueStatus(status: string): status is "deviation" | "missing" {
  return status === "deviation" || status === "missing";
}

function intersects(left: readonly string[], right: readonly string[]): boolean {
  const rightSet = new Set(right);
  return left.some((value) => rightSet.has(value));
}

export function findingMatchesGold(finding: Finding, gold: GoldItem): boolean {
  if (finding.ruleId !== gold.ruleId) return false;
  // A missing-kind gold item (no paragraphs) is the review conclusion "no usable clause"; a finding that
  // reaches the same conclusion by pointing at a disclaimer and calling it a deviation is the same match.
  if (gold.status === "missing" && gold.paragraphIds.length === 0 && isIssueStatus(finding.status)) return true;
  if (finding.status === "missing" && gold.status === "missing") return true;
  return intersects(finding.paragraphIds, gold.paragraphIds);
}

export function matchFindings(findings: readonly Finding[], goldFile: GoldFile): MatchResult {
  const orderedFindings = [...findings].sort(
    (left, right) => right.confidence - left.confidence || left.id.localeCompare(right.id),
  );
  const availableGold = new Map(goldFile.items.map((item) => [item.id, item]));
  const matches: FindingGoldMatch[] = [];
  const matchedFindingIds = new Set<string>();

  for (const finding of orderedFindings) {
    const candidates = [...availableGold.values()]
      .filter((gold) => findingMatchesGold(finding, gold))
      .sort((left, right) => {
        const leftOverlap = left.paragraphIds.filter((id) => finding.paragraphIds.includes(id)).length;
        const rightOverlap = right.paragraphIds.filter((id) => finding.paragraphIds.includes(id)).length;
        return rightOverlap - leftOverlap || left.id.localeCompare(right.id);
      });
    const selected = candidates[0];
    if (selected === undefined) continue;
    matches.push({ finding, gold: selected });
    availableGold.delete(selected.id);
    matchedFindingIds.add(finding.id);
  }

  const tp = matches
    .filter(({ finding, gold }) => isIssueStatus(finding.status) && isIssueStatus(gold.status))
    .map(({ finding }) => finding.id);
  const tpSet = new Set(tp);
  const ambiguousMatches = matches
    .filter(({ gold }) => gold.status === "ambiguous")
    .map(({ finding }) => finding.id);
  const ambiguousMatchSet = new Set(ambiguousMatches);
  const fp = findings
    .filter(
      (finding) => isIssueStatus(finding.status) && !tpSet.has(finding.id) && !ambiguousMatchSet.has(finding.id),
    )
    .map((finding) => finding.id)
    .sort();
  const matchedActiveGold = new Set(
    matches
      .filter(({ finding, gold }) => isIssueStatus(finding.status) && isIssueStatus(gold.status))
      .map(({ gold }) => gold.id),
  );
  const fn = goldFile.items
    .filter((gold) => isIssueStatus(gold.status) && !matchedActiveGold.has(gold.id))
    .map((gold) => gold.id)
    .sort();

  return {
    matches: matches.sort((left, right) => left.gold.id.localeCompare(right.gold.id)),
    truePositiveFindingIds: tp.sort(),
    falsePositiveFindingIds: fp,
    falseNegativeGoldIds: fn,
    escalationFindingIds: findings.filter((finding) => finding.status === "needs_review").map((finding) => finding.id).sort(),
    unmatchedFindingIds: findings.filter((finding) => !matchedFindingIds.has(finding.id)).map((finding) => finding.id).sort(),
    unmatchedGoldIds: [...availableGold.keys()].sort(),
    ambiguousItemIds: goldFile.items.filter((gold) => gold.status === "ambiguous").map((gold) => gold.id).sort(),
    ambiguousMatchFindingIds: ambiguousMatches.sort(),
  };
}
