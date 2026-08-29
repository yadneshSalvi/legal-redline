import { describe, expect, it } from "vitest";

import type { Finding } from "@/src/agent/types";
import type { GoldFile } from "@/src/eval/gold";
import { aggregateMetrics, computeContractMetrics, humanReviewLoad } from "@/src/eval/metrics";
import type { Rule } from "@/src/playbook/schema";

import { documentFixture, findingFixture, statsFixture } from "./fixture";

describe("evaluation metrics", () => {
  it("computes expected detection, status, validity, citation, and resource numbers", () => {
    const gold: GoldFile = {
      contractId: "test",
      items: [
        { id: "g1", ruleId: "LOL-CAP", paragraphIds: ["p0001"], status: "deviation", labeler: "human" },
        { id: "g2", ruleId: "INSURANCE", paragraphIds: [], status: "missing", labeler: "human" },
        { id: "g3", ruleId: "MFN", paragraphIds: ["p0004"], status: "compliant", labeler: "human" },
      ],
    };
    const findings: Finding[] = [
      findingFixture({
        id: "f1",
        ruleId: "LOL-CAP",
        status: "deviation",
        severity: "critical",
        paragraphIds: ["p0001"],
        rationale: "The cap in Section 1 is too low.",
        proposal: {
          ops: [{ kind: "replace", paragraphId: "p0001", oldText: "Cap is three months.", newText: "Cap is twelve (12) months." }],
          comment: "Please align the cap with our position.",
          level: "fallback",
          summary: "Raise the cap.",
        },
      }),
      findingFixture({ id: "f2", ruleId: "MFN", status: "deviation", paragraphIds: ["p0004"], rationale: "See Section 99." }),
      findingFixture({ id: "f3", ruleId: "INSURANCE", status: "missing", paragraphIds: [] }),
    ];
    const rule: Rule = {
      id: "LOL-CAP",
      title: "Cap",
      category: "liability",
      severity: "critical",
      kind: "parametric",
      cuad: [],
      summary: "Cap",
      position: { preferred: "12 months", fallback: "12 months", walkaway: "3 months" },
      detect: "find cap",
      redline: "raise cap",
      checks: [{ type: "regex_present", pattern: "twelve\\s*\\(12\\)\\s*months", flags: "i", label: "12 months" }],
    };
    const metrics = computeContractMetrics({
      gold,
      findings,
      document: documentFixture(),
      rules: [rule],
      judgements: {
        f1: { satisfies_rule: true, minimal: true, preserves_intent: true, drafting_quality: 5, reason: "Good" },
      },
      stats: statsFixture(),
    });
    expect(metrics.detection).toMatchObject({ tp: 2, fp: 1, fn: 0, precision: 2 / 3, recall: 1, f1: 0.8 });
    expect(metrics.deviationAccuracy).toEqual({ located: 3, correct: 2, accuracy: 2 / 3 });
    expect(metrics.redlineValidity.valid).toEqual({ eligible: 1, passing: 1, rate: 1 });
    expect(metrics.minimality.rate).toBe(1);
    expect(metrics.citations).toMatchObject({ references: 2, hallucinations: 1, rate: 0.5 });
    expect(metrics.resources).toMatchObject({ calls: 3, inputTokens: 100, costUsd: 0.25, latencyMs: 1_500 });

    const aggregate = aggregateMetrics([metrics, metrics]);
    expect(aggregate.detection.macro.f1).toBe(0.8);
    expect(aggregate.detection.micro).toMatchObject({ tp: 4, fp: 2, fn: 0, f1: 0.8 });
  });

  it("computes observational human review load", () => {
    expect(
      humanReviewLoad([
        { findings: [{}, {}, {}], decisions: [{ action: "accept" }, { action: "edit" }, { action: "reject" }] },
      ]),
    ).toEqual({ findings: 3, accepts: 1, edits: 1, rejects: 1, load: 2 / 3 });
  });
});
