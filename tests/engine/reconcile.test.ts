import { describe, expect, it } from "vitest";

import { parseText, reconcileOps } from "@/src/engine";

const doc = parseText("TITLE\n\n2.1 Customer commits to purchase at least USD 2,000,000 of Services each year on a take-or-pay basis.\n\n2.2 Each Order Form is governed by this Agreement.", "t.txt");
const p21 = doc.paragraphs[1].id;
const p22 = doc.paragraphs[2].id;

describe("reconcileOps", () => {
  it("lets a paragraph deletion supersede replaces on the same paragraph", () => {
    const result = reconcileOps(doc, [
      { kind: "delete_paragraph", paragraphId: p21 },
      { kind: "replace", paragraphId: p21, oldText: "take-or-pay basis", newText: "usage basis" },
    ]);
    expect(result.ops).toHaveLength(1);
    expect(result.dropped[0]?.reason).toContain("deleted by another finding");
  });
  it("drops overlapping replaces and keeps the first", () => {
    const result = reconcileOps(doc, [
      { kind: "replace", paragraphId: p21, oldText: "USD 2,000,000 of Services", newText: "Services" },
      { kind: "replace", paragraphId: p21, oldText: "2,000,000", newText: "500,000" },
      { kind: "replace", paragraphId: p21, oldText: "take-or-pay basis", newText: "usage basis" },
    ]);
    expect(result.ops).toHaveLength(2);
    expect(result.dropped).toHaveLength(1);
  });
  it("collapses duplicate deletions and insertions", () => {
    const result = reconcileOps(doc, [
      { kind: "delete_paragraph", paragraphId: p22 },
      { kind: "delete_paragraph", paragraphId: p22 },
      { kind: "insert_after", paragraphId: p22, text: "2.3 New clause." },
      { kind: "insert_after", paragraphId: p22, text: "2.3 New clause." },
    ]);
    expect(result.ops).toHaveLength(2);
    expect(result.dropped).toHaveLength(2);
  });
  it("keeps independent ops untouched", () => {
    const ops = [
      { kind: "replace" as const, paragraphId: p21, oldText: "take-or-pay basis", newText: "usage basis" },
      { kind: "insert_after" as const, paragraphId: p22, text: "2.3 New clause." },
    ];
    expect(reconcileOps(doc, ops)).toEqual({ ops, dropped: [] });
  });
});
