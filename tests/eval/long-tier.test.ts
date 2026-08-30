import { describe, expect, it } from "vitest";

import {
  isLongTierFamily,
  longTierContractId,
  selectLongTierContracts,
  type CuadDataset,
} from "@/src/eval/cuad";

function contractText(wordsInLastParagraph: number): string {
  const headings = Array.from({ length: 150 }, (_, index) => `${index + 1}. SECTION ${index + 1}`);
  const body = Array.from({ length: wordsInLastParagraph }, () => "service").join(" ");
  return [...headings, body].join("\n\n");
}

function contract(title: string, words: number): CuadDataset["data"][number] {
  return { title, paragraphs: [{ context: contractText(words), qas: [] }] };
}

describe("registered long-tier selection", () => {
  it("matches only registered whole-word title families and derives stable ids", () => {
    expect(isLongTierFamily("Issuer_EX-10_Hosting Agreement")).toBe(true);
    expect(isLongTierFamily("Issuer — LICENCE AND MAINTENANCE AGREEMENT")).toBe(true);
    expect(isLongTierFamily("Issuer_Master Agreement")).toBe(true);
    expect(isLongTierFamily("Issuer_Servicestation Lease")).toBe(false);
    expect(longTierContractId("Array BioPharma Inc. - LICENSE AGREEMENT")).toBe("long-array-biopharma-inc");
  });

  it("excludes round-one titles, applies parse gates, and sorts by words then title", () => {
    const excluded = contract("ExcludedCo_Hosting Agreement", 800);
    const dataset: CuadDataset = {
      data: [
        contract("BetaCo_Service Agreement", 600),
        contract("AlphaCo_Development Agreement", 600),
        contract("SmallCo_Outsourcing Agreement", 10),
        contract("WrongCo_Equipment Purchase", 900),
        excluded,
      ],
    };
    const selected = selectLongTierContracts({
      dataset,
      excludedTitles: new Set([excluded.title]),
      minimumWords: 500,
      limit: 6,
    });
    expect(selected.map(({ contract: item }) => item.title)).toEqual([
      "AlphaCo_Development Agreement",
      "BetaCo_Service Agreement",
    ]);
    expect(selected.every((item) => item.paragraphs >= 150 && item.sections > 0)).toBe(true);
  });
});
