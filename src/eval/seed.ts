import {
  DEVIATION_VARIANTS,
  type EvalParagraph,
  variantsForRule,
} from "./deviations";
import { secondaryRulesForVariant } from "./deviation-overlaps";
import type { GoldStatus } from "./gold";

export interface SeededDeviation {
  ruleId: string;
  paragraphKeys: string[];
  status: GoldStatus;
  expectedFix: string;
  note: string;
  variant: string;
  secondaryRuleIds: readonly string[];
}

export function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function selectRules(random: () => number): string[] {
  const ruleIds = [...new Set(DEVIATION_VARIANTS.map((variant) => variant.ruleId))].sort();
  for (let index = ruleIds.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [ruleIds[index], ruleIds[swap]] = [ruleIds[swap], ruleIds[index]];
  }
  return ruleIds.slice(0, 6 + Math.floor(random() * 4)).sort();
}

export function applySeededDeviations(
  source: readonly EvalParagraph[],
  seed: number,
): { paragraphs: EvalParagraph[]; items: SeededDeviation[] } {
  const random = mulberry32(seed);
  let paragraphs = source.map((paragraph) => ({ ...paragraph }));
  const items: SeededDeviation[] = [];
  for (const ruleId of selectRules(random)) {
    const choices = variantsForRule(ruleId);
    const variant = choices[Math.floor(random() * choices.length)];
    const result = variant.apply(paragraphs);
    paragraphs = result.paragraphs;
    items.push({
      ruleId,
      paragraphKeys: result.paragraphKeys,
      status: result.status,
      expectedFix: result.expectedFix,
      note: result.note,
      variant: variant.name,
      secondaryRuleIds: secondaryRulesForVariant(ruleId, variant.name),
    });
  }
  return { paragraphs, items };
}
