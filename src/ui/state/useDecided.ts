"use client";

import { useMemo } from "react";
import { decideFindings, type DecidedFinding } from "../lib/redline";
import { filterFindings, orderFindings, useReviewStore, type FilterId } from "./reviewStore";

/** Findings in review order, each paired with the live human decision. */
export function useDecided(): DecidedFinding[] {
  const findings = useReviewStore((s) => s.run?.findings);
  const decisions = useReviewStore((s) => s.decisions);
  return useMemo(() => decideFindings(orderFindings(findings ?? []), decisions), [findings, decisions]);
}

export interface FindingCounts {
  all: number;
  critical: number;
  high: number;
  open: number;
  accepted: number;
  rejected: number;
  edited: number;
  verifiedOpen: string[];
}

export function useCounts(decided: DecidedFinding[]): FindingCounts {
  return useMemo(() => {
    const findings = decided.map((d) => d.finding);
    const decisions = Object.fromEntries(
      decided.filter((d) => d.decision).map((d) => [d.finding.id, d.decision!]),
    );
    return {
      all: findings.length,
      critical: findings.filter((f) => f.severity === "critical").length,
      high: findings.filter((f) => f.severity === "high").length,
      open: filterFindings(findings, "open", decisions).length,
      accepted: decided.filter((d) => d.action === "accept").length,
      rejected: decided.filter((d) => d.action === "reject").length,
      edited: decided.filter((d) => d.action === "edit").length,
      verifiedOpen: decided
        .filter(
          (d) =>
            d.action === "open" &&
            d.ops.length > 0 &&
            (d.finding.verification?.verdict === "pass" || d.finding.verification?.verdict === "repaired"),
        )
        .map((d) => d.finding.id),
    };
  }, [decided]);
}

/** The findings the pane is showing, honouring the active filter chip. */
export function useVisible(decided: DecidedFinding[], filter: FilterId): DecidedFinding[] {
  return useMemo(() => {
    const decisions = Object.fromEntries(
      decided.filter((d) => d.decision).map((d) => [d.finding.id, d.decision!]),
    );
    const allowed = new Set(
      filterFindings(
        decided.map((d) => d.finding),
        filter,
        decisions,
      ).map((f) => f.id),
    );
    return decided.filter((d) => allowed.has(d.finding.id));
  }, [decided, filter]);
}
