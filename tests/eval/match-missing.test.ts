import { describe, expect, it } from "vitest";

import { findingMatchesGold } from "@/src/eval/match";
import type { Finding } from "@/src/agent/types";
import type { GoldItem } from "@/src/eval/gold";

const base: Finding = { id: "f1", ruleId: "WARRANTY", ruleTitle: "Warranty", severity: "medium", status: "deviation", paragraphIds: ["p0109"], quote: "AS IS", rationale: "", confidence: 0.9, producedBy: "drafter" };
const goldMissing = { id: "g1", ruleId: "WARRANTY", paragraphIds: [], status: "missing", labeler: "human" } as unknown as GoldItem;

describe("missing-kind gold matching", () => {
  it("matches a deviation finding that points at the disclaimer", () => {
    expect(findingMatchesGold(base, goldMissing)).toBe(true);
  });
  it("still matches a missing finding", () => {
    expect(findingMatchesGold({ ...base, status: "missing", paragraphIds: [] }, goldMissing)).toBe(true);
  });
  it("does not match a compliant finding", () => {
    expect(findingMatchesGold({ ...base, status: "compliant" }, goldMissing)).toBe(false);
  });
});
