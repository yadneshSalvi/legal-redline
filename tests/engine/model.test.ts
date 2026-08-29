import { describe, expect, it } from "vitest";

import {
  findText,
  parseDocx,
  parseText,
  renderParagraph,
  textToDocx,
  wordDiff,
} from "../../src/engine/index";
import { normalizeForMatch, paragraphId, splitParagraphs } from "../../src/engine/text";

describe("canonical text model", () => {
  it("splits blocks and assigns stable paragraph ids", () => {
    const text = "First\r\nline\tcontinued\r\n\r\nSecond block\n\n\nThird";
    expect(splitParagraphs(text)).toEqual(["First line continued", "Second block", "Third"]);
    expect([0, 42, 10_001].map(paragraphId)).toEqual(["p0000", "p0042", "p10001"]);
    const first = parseText(text, "sample.txt");
    const second = parseText(text, "renamed.txt");
    expect(first.paragraphs.map(({ id, text: value }) => [id, value])).toEqual([
      ["p0000", "First line continued"],
      ["p0001", "Second block"],
      ["p0002", "Third"],
    ]);
    expect(first.id).toBe(second.id);
  });

  it("detects tricky headings, a section tree, numbering, and definitions", () => {
    const text = `Preamble sentence.

ARTICLE IV

4. DEFINITIONS

“Fees” shall mean all recurring charges.

Service (the "Offering") is described below.

Notice Period: thirty days.

4.1 Other Terms

(a) this is a sub-item, not a heading.

(b) CONFIDENTIALITY

Section 5. LIABILITY

LIMITATION OF LIABILITY

THIS LINE HAS NINE WORDS AND IS NOT HEADING TEXT`;
    const doc = parseText(text, "tricky.txt");
    expect(doc.paragraphs.map((paragraph) => [paragraph.text, paragraph.isHeading])).toEqual([
      ["Preamble sentence.", false],
      ["ARTICLE IV", true],
      ["4. DEFINITIONS", true],
      ["“Fees” shall mean all recurring charges.", false],
      ['Service (the "Offering") is described below.', false],
      ["Notice Period: thirty days.", false],
      ["4.1 Other Terms", true],
      ["(a) this is a sub-item, not a heading.", false],
      ["(b) CONFIDENTIALITY", false],
      ["Section 5. LIABILITY", true],
      ["LIMITATION OF LIABILITY", true],
      ["THIS LINE HAS NINE WORDS AND IS NOT HEADING TEXT", false],
    ]);
    expect(doc.paragraphs[1].numbering).toBe("IV");
    expect(doc.paragraphs[7].numbering).toBe("(a)");
    expect(doc.paragraphs[8].numbering).toBe("(b)");
    expect(doc.sections.find((section) => section.id === "sec-4.1")?.parentId).toBe("sec-4");
    expect(doc.sections[0]).toMatchObject({ id: "sec-preamble", paragraphIds: ["p0000"] });
    expect(doc.definitions.map((definition) => definition.term)).toEqual([
      "Fees",
      "Offering",
      "Notice Period",
    ]);
  });

  it("writes byte-identical packages and round-trips the canonical model", async () => {
    const text = "MASTER AGREEMENT\n\n1. Services\n\nVendor provides services.\n\n1.1 Support\n\nSupport is continuous.";
    const [first, second] = await Promise.all([
      textToDocx(text, { title: "Master Agreement" }),
      textToDocx(text, { title: "Master Agreement" }),
    ]);
    expect(first).toEqual(second);
    const fromText = parseText(text, "contract.txt");
    const fromDocx = await parseDocx(first, "contract.docx");
    expect(fromDocx.id).toBe(fromText.id);
    expect(fromDocx.paragraphs.map(({ id, text: value }) => [id, value])).toEqual(
      fromText.paragraphs.map(({ id, text: value }) => [id, value]),
    );
  });

  it("provides word diffs, composed previews, and tolerant search", () => {
    const doc = parseText("Fees—paid by Customer. Fees remain due.", "find.txt");
    expect(normalizeForMatch(" “FEES” — Due ")).toBe('"fees" - due');
    expect(findText(doc, "fees-paid")).toMatchObject([{ paragraphId: "p0000", start: 0 }]);
    expect(findText(doc, /Fees/g)).toHaveLength(2);
    const segments = wordDiff("reasonable security", "industry-standard security");
    expect(segments.some((segment) => segment.type === "delete")).toBe(true);
    expect(segments.some((segment) => segment.type === "insert")).toBe(true);
    const whitespace = wordDiff("a  b", "a b");
    expect(whitespace.filter((segment) => segment.type !== "insert").map((segment) => segment.text).join(""))
      .toBe("a  b");
    expect(whitespace.filter((segment) => segment.type !== "delete").map((segment) => segment.text).join(""))
      .toBe("a b");
    expect(
      renderParagraph(doc, "p0000", [
        { kind: "replace", paragraphId: "p0000", oldText: "Customer", newText: "Client" },
        { kind: "replace", paragraphId: "p0000", oldText: "remain", newText: "are" },
      ])
        .filter((segment) => segment.type !== "delete")
        .map((segment) => segment.text)
        .join(""),
    ).toBe("Fees—paid by Client. Fees are due.");
  });
});
