import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { assertEvaluationLabelers, carryDraftLabels, GoldFileSchema, loadGold } from "@/src/eval/gold";

describe("GoldFileSchema", () => {
  it("accepts a well-formed gold file", () => {
    expect(
      GoldFileSchema.parse({
        contractId: "synth-11",
        items: [
          { id: "g01", ruleId: "LOL-CAP", paragraphIds: ["p0001"], status: "deviation", labeler: "synthetic-exact" },
          { id: "g02", ruleId: "INSURANCE", paragraphIds: [], status: "missing", labeler: "synthetic-exact" },
        ],
      }).items,
    ).toHaveLength(2);
  });

  it("rejects duplicate ids and located missing clauses", () => {
    const result = GoldFileSchema.safeParse({
      contractId: "bad",
      items: [
        { id: "g01", ruleId: "INSURANCE", paragraphIds: ["p0001"], status: "missing", labeler: "human" },
        { id: "g01", ruleId: "T4C", paragraphIds: [], status: "missing", labeler: "human" },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("accepts ambiguous, distinct, and merged CUAD provenance", () => {
    const gold = GoldFileSchema.parse({
      contractId: "cuad-example",
      items: [
        {
          id: "g010",
          ruleId: "INDEMN",
          paragraphIds: ["p0007"],
          status: "ambiguous",
          cuadCategory: "Indemnification",
          cuadCategories: ["Indemnification", "IP Indemnification"],
          distinct: true,
          mergedFrom: ["g001", "g002"],
          labeler: "cuad+human",
          reviewedBy: "lead",
          reviewedAt: "2026-08-30T00:00:00.000Z",
        },
      ],
    });
    expect(gold.items[0].status).toBe("ambiguous");
  });

  it("carries assisted labels by normalized span identity while refreshing paragraph ids", () => {
    const existing = GoldFileSchema.parse({
      contractId: "cuad-example",
      items: [
        {
          id: "g007",
          ruleId: "LOL-CAP",
          paragraphIds: ["p0004"],
          status: "deviation",
          cuadCategory: "Cap On Liability",
          spanText: "Liability SHALL be capped.",
          labeler: "cuad+llm-draft",
          note: "Draft assessment",
        },
      ],
    });
    const generated = GoldFileSchema.parse({
      contractId: "cuad-example",
      items: [
        {
          id: "g001",
          ruleId: "LOL-CAP",
          paragraphIds: ["p0019", "p0020"],
          status: "compliant",
          cuadCategory: "Cap On Liability",
          spanText: " liability shall be capped. ",
          labeler: "cuad-draft",
        },
      ],
    });
    const result = carryDraftLabels(generated, existing);
    expect(result).toMatchObject({ carried: 1, needsDraft: 0 });
    expect(result.gold.items[0]).toMatchObject({
      id: "g007",
      paragraphIds: ["p0019", "p0020"],
      status: "deviation",
      labeler: "cuad+llm-draft",
      note: "Draft assessment",
    });
  });

  it("rejects non-human CUAD gold but accepts exact and reviewed synthetic gold", () => {
    const draft = GoldFileSchema.parse({
      contractId: "cuad-example",
      items: [{ id: "g001", ruleId: "T4C", paragraphIds: [], status: "missing", labeler: "llm-draft" }],
    });
    expect(() => assertEvaluationLabelers("cuad-example", draft)).toThrow(/unapproved labelers/);
    const synthetic = GoldFileSchema.parse({
      contractId: "synth-example",
      items: [{ id: "g01", ruleId: "T4C", paragraphIds: [], status: "missing", labeler: "synthetic-exact" }],
    });
    expect(() => assertEvaluationLabelers("synth-example", synthetic)).not.toThrow();
    const reviewedSynthetic = GoldFileSchema.parse({
      contractId: "synth-example",
      items: [{
        id: "g02",
        ruleId: "WARRANTY",
        paragraphIds: ["p0002"],
        status: "ambiguous",
        labeler: "human",
        reviewedBy: "lead",
      }],
    });
    expect(() => assertEvaluationLabelers("synth-example", reviewedSynthetic)).not.toThrow();
    const unreviewedSynthetic = structuredClone(reviewedSynthetic);
    delete unreviewedSynthetic.items[0].reviewedBy;
    expect(() =>
      assertEvaluationLabelers("synth-example", unreviewedSynthetic),
    ).toThrow(/missing reviewedBy/);

    const agentReviewed = GoldFileSchema.parse({
      contractId: "long-example",
      items: [{
        id: "g003",
        ruleId: "T4C",
        paragraphIds: [],
        status: "missing",
        labeler: "agent-reviewed",
        reviewedBy: "evaluation scientist",
      }],
    });
    expect(() => assertEvaluationLabelers("long-example", agentReviewed)).not.toThrow();
    expect(() => assertEvaluationLabelers("cuad-example", agentReviewed)).toThrow(/unapproved labelers/);
  });

  it("accepts every promoted CUAD contract through the evaluation labeler gate", async () => {
    const contractIds = [
      "cuad-americas-shopping-mall-hosting",
      "cuad-bluefly-hosting",
      "cuad-bnc-mortgage-hosting",
      "cuad-corio-hosting",
      "cuad-kubient-msa-part1",
      "cuad-merit-life-master-services",
      "cuad-sfg-financial-license",
      "cuad-sparkling-spring-license",
    ];
    for (const contractId of contractIds) {
      const gold = await loadGold(resolve("data/contracts", contractId, "gold.json"));
      expect(() => assertEvaluationLabelers(contractId, gold)).not.toThrow();
    }
  });
});
