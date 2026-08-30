import { describe, expect, it } from "vitest";

import type { Finding } from "@/src/agent/types";
import type { GoldFile } from "@/src/eval/gold";
import { computeRound2Metrics, normalizedTokenJaccard } from "@/src/eval/metrics-round2";
import { evaluateTrackedChangeYield, type TrackedChangeYieldResult } from "@/src/eval/tracked-change-yield";
import { parseDocx, textToDocx } from "@/src/engine";
import type { Rule } from "@/src/playbook/schema";

import { documentFixture, findingFixture } from "./fixture";

const rule: Rule = {
  id: "LOL-CAP",
  title: "Cap",
  category: "liability",
  severity: "critical",
  kind: "parametric",
  cuad: ["Cap On Liability"],
  summary: "Cap",
  position: {
    preferred: "twelve months",
    fallback: "twelve months",
    walkaway: "uncapped",
    elements: { preferred: ["cap of twelve months' fees"], fallback: ["cap of twelve months' fees"] },
  },
  detect: "find cap",
  redline: "raise cap",
  checks: [{ type: "regex_present", pattern: "twelve", flags: "i", label: "12 months" }],
};

function yieldResult(appliedFindingIds: string[]): TrackedChangeYieldResult {
  return {
    outputOk: true,
    candidateFindingIds: appliedFindingIds,
    appliedFindingIds,
    ops: appliedFindingIds.length,
    applied: appliedFindingIds.length,
    changeCountMatches: true,
    collateralParagraphIds: [],
    libreoffice: { attempted: false, ok: false },
    errors: [],
  };
}

describe("metrics-hard registered metrics", () => {
  it("uses all positive gold items as the CRR and yield denominator", () => {
    const gold: GoldFile = {
      contractId: "test",
      items: [
        { id: "g1", ruleId: "LOL-CAP", paragraphIds: ["p0001"], status: "deviation", labeler: "human" },
        { id: "g2", ruleId: "INSURANCE", paragraphIds: [], status: "missing", labeler: "human" },
        { id: "g3", ruleId: "MFN", paragraphIds: ["p0004"], status: "compliant", labeler: "human" },
      ],
    };
    const findings: Finding[] = [findingFixture({
      id: "f1",
      ruleId: "LOL-CAP",
      status: "deviation",
      paragraphIds: ["p0001"],
      proposal: {
        ops: [{ kind: "replace", paragraphId: "p0001", oldText: "Cap is three months.", newText: "Cap is twelve months." }],
        comment: "Raise the cap.",
        level: "fallback",
        summary: "Raise cap",
      },
    })];
    const metrics = computeRound2Metrics({
      gold,
      findings,
      document: documentFixture(),
      rules: [rule],
      judgements: {
        f1: {
          elements: [
            { element: "preferred cap", level: "preferred", met: true, evidence: "twelve" },
            { element: "fallback cap", level: "fallback", met: true, evidence: "twelve" },
          ],
          satisfies_preferred: true,
          satisfies_fallback: true,
          minimal: true,
          preserves_intent: true,
          drafting_quality: 5,
          reason: "Complete",
        },
      },
      trackedChangeYield: yieldResult(["f1"]),
      precedents: [{ ruleId: "LOL-CAP", clauseAfter: "Cap is twelve months." }],
    });
    expect(metrics.completeRedline).toEqual({ eligible: 2, passing: 1, rate: 0.5 });
    expect(metrics.appliedTrackedChangeYield).toEqual({ eligible: 2, passing: 1, rate: 0.5 });
    expect(metrics.precedentAdherence).toEqual({ eligible: 1, passing: 1, rate: 1 });
  });

  it("computes registered token-set Jaccard without stopword removal", () => {
    expect(normalizedTokenJaccard("Vendor shall indemnify Customer", "Customer—vendor indemnity")).toBe(0.4);
    expect(normalizedTokenJaccard("", "")).toBe(1);
  });

  it("reconciles pipeline conflicts and credits only complete surviving proposals", async () => {
    const bytes = await textToDocx("1. LIABILITY\n\nCap is three months.", { title: "Yield" });
    const document = await parseDocx(bytes, "yield.docx");
    const proposal = {
      ops: [{ kind: "replace" as const, paragraphId: "p0001", oldText: "three", newText: "twelve" }],
      comment: "Raise cap.",
      level: "fallback" as const,
      summary: "Raise cap",
    };
    const result = await evaluateTrackedChangeYield({
      originalBytes: bytes,
      document,
      findings: [
        findingFixture({ id: "f1", ruleId: "LOL-CAP", status: "deviation", paragraphIds: ["p0001"], proposal }),
        findingFixture({ id: "f2", ruleId: "LOL-CAP", status: "deviation", paragraphIds: ["p0001"], proposal }),
      ],
      strategy: "pipeline-reconciled",
      libreoffice: false,
    });
    expect(result.outputOk).toBe(true);
    expect(result.ops).toBe(1);
    expect(result.appliedFindingIds).toEqual(["f1", "f2"]);
  });
});
