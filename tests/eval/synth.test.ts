import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  buildHardCase,
  DEVIATION_VARIANTS,
  type EvalParagraph,
} from "@/src/eval/deviations";
import { secondaryRulesForVariant } from "@/src/eval/deviation-overlaps";
import { assertEvaluationLabelers, loadGold } from "@/src/eval/gold";
import { stableStringify } from "@/src/eval/io";
import { applySeededDeviations } from "@/src/eval/seed";
import { buildSyntheticGold } from "@/src/eval/synthetic-gold";
import { splitParagraphs } from "@/src/engine/text";

describe("synthetic evaluation data", () => {
  it("is byte-identical for the same seed", async () => {
    const template = await readFile(resolve("data/templates/msa-clean.md"), "utf8");
    const source: EvalParagraph[] = splitParagraphs(template).map((text, index) => ({ key: `source-${index}`, text }));
    const first = applySeededDeviations(source, 11);
    const second = applySeededDeviations(source, 11);
    const bytes = (value: typeof first): Uint8Array =>
      new TextEncoder().encode(`${value.paragraphs.map((paragraph) => paragraph.text).join("\n\n")}\n${stableStringify(value.items)}`);
    expect(bytes(first)).toEqual(bytes(second));
    expect(first.items.length).toBeGreaterThanOrEqual(6);
    expect(first.items.length).toBeLessThanOrEqual(9);
  });

  it("provides at least two deviations for every playbook rule", () => {
    const counts = new Map<string, number>();
    for (const variant of DEVIATION_VARIANTS) counts.set(variant.ruleId, (counts.get(variant.ruleId) ?? 0) + 1);
    expect(counts.size).toBe(18);
    expect([...counts.values()].every((count) => count >= 2)).toBe(true);
  });

  it("declares the defensible cross-rule overlaps", () => {
    expect(secondaryRulesForVariant("MINCOMMIT", "three-year-take-or-pay")).toEqual(["LD"]);
    expect(secondaryRulesForVariant("MFN", "customer-must-match-offers")).toEqual(["EXCLUSIVITY"]);
    expect(secondaryRulesForVariant("IP", "vendor-owns-deliverables")).toEqual(["LICENSE"]);
    expect(secondaryRulesForVariant("T4C", "vendor-only-thirty-days")).toEqual(["LD"]);
    expect(secondaryRulesForVariant("RENEWAL", "one-year-renewal-180-day-window")).toEqual(["T4C"]);
    expect(secondaryRulesForVariant("LOL-CAP", "fees-paid-one-month-no-carveouts")).toEqual(["INDEMN"]);
  });

  it("reconstructs the committed synthetic gold deterministically", async () => {
    const template = await readFile(resolve("data/templates/msa-clean.md"), "utf8");
    const source: EvalParagraph[] = splitParagraphs(template).map((text, index) => ({ key: `source-${index}`, text }));
    for (const seed of [11, 12, 13]) {
      const contractId = `synth-${seed}`;
      const generated = applySeededDeviations(source, seed);
      const actual = await loadGold(resolve("data/contracts", contractId, "gold.json"));
      expect(() => assertEvaluationLabelers(contractId, actual)).not.toThrow();
      expect(stableStringify(buildSyntheticGold(contractId, generated.paragraphs, generated.items))).toBe(
        stableStringify(actual),
      );
    }
    const hardCase = buildHardCase(source);
    const actual = await loadGold(resolve("data/contracts/synth-hardcase/gold.json"));
    expect(() => assertEvaluationLabelers("synth-hardcase", actual)).not.toThrow();
    expect(stableStringify(buildSyntheticGold("synth-hardcase", hardCase.paragraphs, hardCase.items))).toBe(
      stableStringify(actual),
    );
  });

  it("constructs all five deterministic hard-case labels", async () => {
    const template = await readFile(resolve("data/templates/msa-clean.md"), "utf8");
    const source = splitParagraphs(template).map((text, index) => ({ key: `source-${index}`, text }));
    const hardCase = buildHardCase(source);
    expect(hardCase.items.map((item) => [item.ruleId, item.status])).toEqual([
      ["LOL-CAP", "deviation"],
      ["NONCOMPETE", "compliant"],
      ["MFN", "compliant"],
      ["T4C", "compliant"],
      ["LD", "deviation"],
    ]);
  });
});
