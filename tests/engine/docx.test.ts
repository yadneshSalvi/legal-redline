import { describe, expect, it } from "vitest";

import { parseDocx } from "../../src/engine/index";
import { realisticFixture } from "./fixture";

describe("DOCX reading", () => {
  it("reads styles, formatted runs, tables, hyperlinks, numbering, and existing changes", async () => {
    const doc = await parseDocx(await realisticFixture(), "fixture.docx");
    expect(doc.paragraphs.map((paragraph) => paragraph.text)).toEqual([
      "1. Services",
      "Vendor shall maintain reasonable security measures—and Customer’s controls.",
      "See Example policy for details.",
      "Numbered obligation without a literal label",
      "Table cell obligation must be removed.",
      "Existing insertion",
    ]);
    expect(doc.paragraphs[0]).toMatchObject({ style: "Heading 1", isHeading: true, level: 1 });
    expect(doc.paragraphs[1].runs).toEqual([
      { text: "Vendor shall maintain " },
      { text: "reasonable ", bold: true },
      { text: "security", italic: true },
      { text: " measures—and Customer’s controls." },
    ]);
    expect(doc.paragraphs[2].text).toContain("Example policy");
    expect(doc.paragraphs[3].numbering).toBeUndefined();
    expect(doc.paragraphs[5].text).not.toContain("hidden deletion");
  });
});
