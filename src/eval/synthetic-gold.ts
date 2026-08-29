import type { EvalParagraph } from "./deviations";
import type { GoldFile, GoldItem, GoldStatus } from "./gold";
import { paragraphId } from "@/src/engine/text";

export interface SyntheticGoldSourceItem {
  ruleId: string;
  paragraphKeys: string[];
  status: GoldStatus;
  expectedFix?: string;
  note: string;
  secondaryRuleIds?: readonly string[];
}

function keyToParagraphIds(paragraphs: readonly EvalParagraph[], keys: readonly string[]): string[] {
  return keys.map((key) => {
    const index = paragraphs.findIndex((paragraph) => paragraph.key === key);
    if (index < 0) throw new Error(`Injected paragraph key disappeared: ${key}`);
    return paragraphId(index);
  });
}

export function buildSyntheticGold(
  contractId: string,
  paragraphs: readonly EvalParagraph[],
  items: readonly SyntheticGoldSourceItem[],
): GoldFile {
  const goldItems: GoldItem[] = items.map((item, index) => ({
    id: `g${String(index + 1).padStart(2, "0")}`,
    ruleId: item.ruleId,
    paragraphIds: keyToParagraphIds(paragraphs, item.paragraphKeys),
    status: item.status,
    labeler: "synthetic-exact",
    note: item.note,
    expectedFix: item.expectedFix,
  }));
  const addAmbiguous = (ruleId: string, paragraphIds: string[], note: string): void => {
    const paragraphSet = new Set(paragraphIds);
    if (
      goldItems.some(
        (item) =>
          item.ruleId === ruleId &&
          item.paragraphIds.some((paragraph) => paragraphSet.has(paragraph)),
      )
    ) {
      return;
    }
    goldItems.push({
      id: `g${String(goldItems.length + 1).padStart(2, "0")}`,
      ruleId,
      paragraphIds,
      status: "ambiguous",
      labeler: "human",
      reviewedBy: "lead",
      note,
    });
  };

  for (const item of items) {
    const paragraphIds = keyToParagraphIds(paragraphs, item.paragraphKeys);
    for (const secondaryRuleId of item.secondaryRuleIds ?? []) {
      addAmbiguous(
        secondaryRuleId,
        paragraphIds,
        `secondary rule for the injected ${item.ruleId} deviation`,
      );
    }
  }
  if (!items.some((item) => item.ruleId === "WARRANTY")) {
    const warrantyIndex = paragraphs.findIndex((paragraph) => paragraph.text.startsWith("19.2 "));
    if (warrantyIndex < 0) throw new Error("Synthetic warranty fallback paragraph not found: 19.2");
    addAmbiguous("WARRANTY", [paragraphId(warrantyIndex)], "template sits at the fallback position");
  }

  const ruleCounts = new Map<string, number>();
  for (const item of goldItems) ruleCounts.set(item.ruleId, (ruleCounts.get(item.ruleId) ?? 0) + 1);
  for (const item of goldItems) {
    if ((ruleCounts.get(item.ruleId) ?? 0) > 1) item.distinct = true;
  }
  return { contractId, items: goldItems };
}
