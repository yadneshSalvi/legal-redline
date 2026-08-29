import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { buildHardCase, DEVIATION_VARIANTS, type EvalParagraph } from "@/src/eval/deviations";
import { stableStringify } from "@/src/eval/io";
import { applySeededDeviations } from "@/src/eval/seed";
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
