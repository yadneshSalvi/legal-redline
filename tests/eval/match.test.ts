import { describe, expect, it } from "vitest";

import type { GoldFile } from "@/src/eval/gold";
import { matchFindings } from "@/src/eval/match";

import { findingFixture } from "./fixture";

describe("one-to-one finding matching", () => {
  it("counts flagging a compliant clause as a false positive", () => {
    const gold: GoldFile = {
      contractId: "test",
      items: [{ id: "g01", ruleId: "MFN", paragraphIds: ["p0004"], status: "compliant", labeler: "human" }],
    };
    const result = matchFindings(
      [findingFixture({ id: "f1", ruleId: "MFN", status: "deviation", paragraphIds: ["p0004"] })],
      gold,
    );
    expect(result.truePositiveFindingIds).toEqual([]);
    expect(result.falsePositiveFindingIds).toEqual(["f1"]);
  });

  it("reports needs_review separately and leaves the issue as a false negative", () => {
    const gold: GoldFile = {
      contractId: "test",
      items: [{ id: "g01", ruleId: "LOL-CAP", paragraphIds: ["p0001"], status: "deviation", labeler: "human" }],
    };
    const result = matchFindings(
      [findingFixture({ id: "f1", ruleId: "LOL-CAP", status: "needs_review", paragraphIds: ["p0001"] })],
      gold,
    );
    expect(result.falsePositiveFindingIds).toEqual([]);
    expect(result.falseNegativeGoldIds).toEqual(["g01"]);
    expect(result.escalationFindingIds).toEqual(["f1"]);
  });

  it("assigns one gold item to the highest-confidence finding only", () => {
    const gold: GoldFile = {
      contractId: "test",
      items: [{ id: "g01", ruleId: "LOL-CAP", paragraphIds: ["p0001"], status: "deviation", labeler: "human" }],
    };
    const result = matchFindings(
      [
        findingFixture({ id: "low", ruleId: "LOL-CAP", status: "deviation", paragraphIds: ["p0001"], confidence: 0.4 }),
        findingFixture({ id: "high", ruleId: "LOL-CAP", status: "deviation", paragraphIds: ["p0001"], confidence: 0.9 }),
      ],
      gold,
    );
    expect(result.truePositiveFindingIds).toEqual(["high"]);
    expect(result.falsePositiveFindingIds).toEqual(["low"]);
  });

  it("excludes findings matched to ambiguous gold from TP, FP, and FN", () => {
    const gold: GoldFile = {
      contractId: "test",
      items: [{ id: "g01", ruleId: "INDEMN", paragraphIds: ["p0003"], status: "ambiguous", labeler: "human" }],
    };
    const result = matchFindings(
      [findingFixture({ id: "f1", ruleId: "INDEMN", status: "deviation", paragraphIds: ["p0003"] })],
      gold,
    );
    expect(result).toMatchObject({
      truePositiveFindingIds: [],
      falsePositiveFindingIds: [],
      falseNegativeGoldIds: [],
      ambiguousItemIds: ["g01"],
      ambiguousMatchFindingIds: ["f1"],
    });
  });

  it("matches one finding to one merged deviation item without creating fragment false negatives", () => {
    const gold: GoldFile = {
      contractId: "test",
      items: [{ id: "g09", ruleId: "LICENSE", paragraphIds: ["p0002", "p0005"], status: "deviation", labeler: "human" }],
    };
    const result = matchFindings(
      [findingFixture({ id: "f1", ruleId: "LICENSE", status: "deviation", paragraphIds: ["p0005"] })],
      gold,
    );
    expect(result.truePositiveFindingIds).toEqual(["f1"]);
    expect(result.falseNegativeGoldIds).toEqual([]);
  });
});
