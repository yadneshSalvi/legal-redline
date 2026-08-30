import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { fixtureEvals } from "@/src/ui/fixtures/evals";
import { ladderRows, metricColumns, normalizeEvals, type EvalsData, type MetricKey } from "@/src/ui/lib/evals";
import { legacyHeadlines, tierHeadlines } from "@/src/ui/lib/evals-headlines";
import {
  contractGroups,
  contractIdsInView,
  elementMissRows,
  poolAggregates,
  shippedConfig,
  tierLadderRows,
} from "@/src/ui/lib/evals-round2";

/** The committed report is the contract the page is written against (EVAL.md §9). */
function committed(): EvalsData {
  const raw = readFileSync(path.resolve(process.cwd(), "evals/results/changelog-data.json"), "utf8");
  const data = normalizeEvals(JSON.parse(raw));
  expect(data).not.toBeNull();
  return data as EvalsData;
}

const roundOneKeys: MetricKey[] = metricColumns
  .filter((column) => column.group !== "redline")
  .map((column) => column.key);

describe("normalizeEvals", () => {
  it("reads the round-1 configs and both round-2 tiers out of the committed report", () => {
    const data = committed();
    expect(data.configs.length).toBeGreaterThan(0);
    expect(data.tiers.map((tier) => tier.id)).toEqual(["short", "long"]);
    expect(data.tiers[1].configs.map((config) => config.id).sort()).toEqual(
      expect.arrayContaining(["b1-prompt", "final", "i3-verifier"]),
    );
  });

  it("rejects a payload with neither configs nor tiers", () => {
    expect(normalizeEvals([])).toBeNull();
    expect(normalizeEvals({ configs: [], tiers: [] })).toBeNull();
    expect(normalizeEvals({ tiers: [{ id: "medium", configs: [] }] })).toBeNull();
  });

  it("keeps only element misses that carry an element and a count", () => {
    const data = normalizeEvals({
      configs: [],
      tiers: [{
        id: "short",
        configs: [{ id: "final", aggregate: {}, contracts: [] }],
        elementMisses: [
          { ruleId: "LOL-CAP", element: "Cap is mutual.", misses: 4, judged: 9 },
          { ruleId: "LOL-CAP", unmet: 2 },
          "nonsense",
        ],
      }],
    });
    expect(data?.tiers[0].elementMisses).toEqual([
      { ruleId: "LOL-CAP", ruleTitle: undefined, element: "Cap is mutual.", level: undefined, eligible: 9, unmet: 4, configId: undefined },
    ]);
  });
});

describe("the short view", () => {
  it("renders every round-1 column exactly as round 1 did", () => {
    const data = committed();
    const roundOneIds = new Set(data.configs.map((config) => config.id));
    const before = ladderRows(data).filter((row) => roundOneIds.has(row.id));
    const after = tierLadderRows(data, "short");
    for (const row of before) {
      const rescored = after.find((candidate) => candidate.id === row.id);
      expect(rescored?.present).toBe(row.present);
      for (const key of roundOneKeys) expect(rescored?.[key]).toBe(row[key]);
    }
  });

  it("takes the three round-2 columns from the re-scored tier run", () => {
    const data = committed();
    const final = tierLadderRows(data, "short").find((row) => row.id === "final");
    expect(final?.crr).toBeCloseTo(10 / 95, 12);
    expect(final?.appliedYield).toBeCloseTo(82 / 95, 12);
    expect(final?.adherence).toBeCloseTo(6 / 87, 12);
    expect(final?.judge).toBe("v1");
  });

  it("leaves the round-2 columns null for configs that were never re-scored", () => {
    const row = tierLadderRows(committed(), "short").find((candidate) => candidate.id === "b0-chat");
    expect(row?.present).toBe(true);
    expect([row?.crr, row?.appliedYield, row?.adherence]).toEqual([null, null, null]);
  });
});

describe("the long and all views", () => {
  it("scores the long tier with judge v2 and marks unrun configs absent", () => {
    const rows = tierLadderRows(committed(), "long");
    expect(rows.find((row) => row.id === "final")?.judge).toBe("v2");
    expect(rows.find((row) => row.id === "final")?.contracts).toBe(6);
    expect(rows.find((row) => row.id === "b0-chat")?.present).toBe(false);
  });

  it("pools the two tiers by their counts, not by averaging their rates", () => {
    const data = committed();
    const all = tierLadderRows(data, "all").find((row) => row.id === "final");
    expect(all?.contracts).toBe(18);
    // CRR: 10 of 95 short and 0 of 48 long.
    expect(all?.crr).toBeCloseTo(10 / 143, 12);
    // Macro F1 is the unweighted mean over the union of contracts, i.e. count-weighted here.
    expect(all?.f1).toBeCloseTo((0.947768 * 12 + 0.587948 * 6) / 18, 4);
  });

  it("drops a configuration from All unless it was measured on both tiers", () => {
    const data = committed();
    const shortOnly: EvalsData = {
      ...data,
      tiers: data.tiers.map((tier) =>
        tier.id === "long" ? { ...tier, configs: tier.configs.filter((c) => c.id !== "final") } : tier,
      ),
    };
    expect(tierLadderRows(shortOnly, "all").find((row) => row.id === "final")?.present).toBe(false);
    expect(tierLadderRows(shortOnly, "short").find((row) => row.id === "final")?.present).toBe(true);
  });

  it("counts eighteen distinct contracts across the two tiers", () => {
    const data = committed();
    expect(contractIdsInView(data, "short")).toHaveLength(12);
    expect(contractIdsInView(data, "long")).toHaveLength(6);
    expect(contractIdsInView(data, "all")).toHaveLength(18);
  });
});

describe("poolAggregates", () => {
  it("returns undefined round-2 components unless every part reported them", () => {
    const data = committed();
    const short = data.tiers[0].configs.find((config) => config.id === "final");
    const long = data.tiers[1].configs.find((config) => config.id === "final");
    const stripped = { ...long!.aggregate, completeRedline: undefined };
    expect(poolAggregates([short!.aggregate, long!.aggregate]).completeRedline?.eligible).toBe(143);
    expect(poolAggregates([short!.aggregate, stripped]).completeRedline).toBeUndefined();
  });
});

describe("the per-contract matrix", () => {
  it("groups the tiers and carries the word counts it is given", () => {
    const groups = contractGroups(committed(), "all", { "long-verizonabsllc": 44_507 });
    expect(groups.map((group) => group.tier)).toEqual(["short", "long"]);
    expect(groups[0].rows[0].id).toBe("synth-hardcase");
    expect(groups[0].rows[0].words).toBeNull();
    expect(groups[1].rows.find((row) => row.id === "long-verizonabsllc")?.words).toBe(44_507);
    expect(groups[1].rows.every((row) => row.tier === "long")).toBe(true);
  });
});

describe("the headline strip", () => {
  it("compares the baseline with the shipped config and signs the delta by direction", () => {
    const data = committed();
    // The shipped config is the latest `final*` the committed report carries (round 1: final; round 2: final-v2/v3).
    expect(shippedConfig(data)).toMatch(/^final(-v\d+)?$/);
    const cards = tierHeadlines(data);
    expect(cards.map((card) => card.label)).toEqual([
      "Complete redline rate",
      "Long-document F1",
      "Applied tracked-change yield",
      "Issue-detection F1",
    ]);
    expect(cards[0].scope).toBe("all · 18 contracts");
    expect(cards[0].improved).toBe(true);
    // The pill's direction must agree with the sign of the delta whichever way the shipped config moved
    // (round-1 `final` regressed on the long tier; `final-v2`/`final-v3` improve it) — never hard-code the direction.
    for (const card of cards) expect(card.improved).toBe(!card.delta.startsWith("−"));
  });

  it("falls back to the round-1 four when the report has no tiers", () => {
    const data = committed();
    const roundOne: EvalsData = { ...data, tiers: [] };
    expect(tierHeadlines(roundOne)).toEqual([]);
    expect(legacyHeadlines(ladderRows(roundOne), "short · 12 contracts").map((card) => card.label)).toEqual([
      "Issue-detection F1",
      "Redline validity",
      "Citation hallucinations",
      "Cost per contract",
    ]);
  });
});

describe("the fixture", () => {
  it("survives its own normaliser and carries both tiers", () => {
    const data = normalizeEvals(JSON.parse(JSON.stringify(fixtureEvals)));
    expect(data?.tiers.map((tier) => tier.id)).toEqual(["short", "long"]);
    expect(shippedConfig(data as EvalsData)).toBe("final-v2");
    expect(contractIdsInView(data as EvalsData, "all")).toHaveLength(18);
  });

  it("only offers element misses where the report supplies them", () => {
    expect(elementMissRows(committed(), "all")).toEqual([]);
    const misses = elementMissRows(fixtureEvals, "short");
    expect(misses.length).toBeGreaterThan(0);
    expect(misses.map((miss) => miss.unmet)).toEqual([...misses.map((miss) => miss.unmet)].sort((a, b) => b - a));
  });
});
