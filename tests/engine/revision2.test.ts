import JSZip from "jszip";
import { describe, expect, it } from "vitest";

import {
  applyRedlines,
  parseDocx,
  parseText,
  renderParagraph,
  textToDocx,
  validateComment,
  validateDocx,
  validateOp,
  wordDiff,
} from "../../src/engine/index";
import { mapBodyParagraphs } from "../../src/engine/paragraph-map";
import type { ApplyRequest } from "../../src/engine/types";
import { directChild, elementsByLocalName, parseXml } from "../../src/engine/xml";
import { hostileFixture, multilevelNumberingFixture, realisticFixture } from "./fixture";

const DATE = "2026-01-01T00:00:00Z";

async function mutatePart(
  bytes: Uint8Array,
  path: string,
  mutate: (xml: string) => string,
): Promise<Uint8Array> {
  const zip = await JSZip.loadAsync(bytes);
  const entry = zip.file(path);
  if (!entry) throw new Error(`missing ${path}`);
  zip.file(path, mutate(await entry.async("string")));
  return zip.generateAsync({ type: "uint8array", compression: "DEFLATE" });
}

describe("revision 2 model and validation rules", () => {
  it("counts overlapping anchor occurrences", () => {
    const doc = parseText("aaa", "overlap.txt");
    expect(
      validateOp(doc, { kind: "replace", paragraphId: "p0000", oldText: "aa", newText: "x" }),
    ).toEqual({
      ok: false,
      error: "oldText occurs 2 times in p0000; include more context",
      occurrences: 2,
    });
  });

  it("distinguishes numbered prose from short numbered headings", async () => {
    const doc = await parseDocx(await multilevelNumberingFixture(), "numbering.docx");
    expect(doc.paragraphs.map(({ numbering, isHeading }) => [numbering, isHeading])).toEqual([
      ["1", true],
      ["1.1", false],
      ["2", false],
    ]);
    const text = parseText(
      "9.1 Vendor's aggregate liability arising out of this Agreement shall not exceed the Fees paid in the preceding claim.\n\n2. The Vendor shall perform.\n\n3. Short Commercial Heading",
      "numbered.txt",
    );
    expect(text.paragraphs.map(({ numbering, isHeading }) => [numbering, isHeading])).toEqual([
      ["9.1", false],
      ["2", false],
      ["3", true],
    ]);
  });

  it("extracts strict definition forms and rejects false positives", () => {
    const doc = parseText(
      `1. DEFINITIONS

1.1 "Fees" means the implementation fee.

1.2 “Services” shall mean the hosted services.

"Affiliate" has the meaning assigned in Section 4.

"Pointer" (as defined in Section 4.2).

The product (the "Short Alias"), is supplied.

The product ("Other Alias"); is supplied.

The product (the "This Alias Has Five Words"), is supplied.

"Bogus" meanslessness is not a definition.

Payment Term: thirty days.

Long But Valid Defined Term Name: still a definition.

Administrative Note: for reviewers only.

2. OTHER TERMS

Outside Term: not a definition.`,
      "definitions.txt",
    );
    expect(doc.definitions.map(({ term }) => term)).toEqual([
      "Fees",
      "Services",
      "Affiliate",
      "Pointer",
      "Short Alias",
      "Other Alias",
      "Payment Term",
      "Long But Valid Defined Term Name",
    ]);
    expect(doc.definitions.find(({ term }) => term === "Pointer")?.text).toContain("Section 4.2");
  });

  it("rejects non-RFC-3339 tracked-change dates", async () => {
    const original = await textToDocx("A target clause.");
    const doc = await parseDocx(original, "date.docx");
    for (const date of ["2026-01-01", "2026-01-01T00:00:00", "2026-02-30T00:00:00Z", "2026-01-01T00:00:00.1Z"]) {
      await expect(
        applyRedlines(original, doc, {
          author: "Date Test",
          date,
          comments: [],
          ops: [{ kind: "replace", paragraphId: "p0000", oldText: "target", newText: "revised" }],
        }),
      ).rejects.toThrow("tracked-change date must be an RFC 3339 date-time");
    }
    await expect(
      applyRedlines(original, doc, {
        author: "Date Test",
        date: "2026-01-01T05:30:00.123+05:30",
        comments: [],
        ops: [{ kind: "replace", paragraphId: "p0000", oldText: "target", newText: "revised" }],
      }),
    ).resolves.toMatchObject({ applied: 1 });
  });

  it("sanitizes forbidden controls and lone surrogates in text and attributes", async () => {
    const bytes = await textToDocx("Safe\u0000text \ud800 end", { title: "Bad\u000btitle\udfff" });
    const doc = await parseDocx(bytes, "sanitized.docx");
    expect(doc.paragraphs[0].text).toBe("Safetext � end");
    const zip = await JSZip.loadAsync(bytes);
    expect(await zip.file("docProps/core.xml")?.async("string")).toContain("Badtitle�");
    const applied = await applyRedlines(bytes, doc, {
      author: "Bad\u0001Author\ud800",
      date: DATE,
      comments: [{ paragraphId: "p0000", text: "Comment\u000c text\udfff" }],
      ops: [{ kind: "replace", paragraphId: "p0000", oldText: "Safe", newText: "New\u0002\ud800" }],
    });
    const appliedZip = await JSZip.loadAsync(applied.docx);
    const output =
      ((await appliedZip.file("word/document.xml")?.async("string")) ?? "") +
      ((await appliedZip.file("word/comments.xml")?.async("string")) ?? "");
    expect(output).not.toMatch(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/);
    expect(output).toContain("BadAuthor�");
    expect(output).toContain("Comment text�");
  });

  it("groups dense changes identically in engine output and preview", () => {
    const oldText =
      "three (3) months preceding the claim. Customer's liability shall be unlimited.";
    const newText = "twelve (12) months preceding the claim.";
    const segments = wordDiff(oldText, newText);
    expect(segments.filter(({ type }) => type !== "equal").length).toBeLessThanOrEqual(4);
    expect(segments.find(({ type }) => type === "delete")?.text).toContain("three (3");
    expect(segments.find(({ type }) => type === "insert")?.text).toContain("twelve (12");
    const vendor = wordDiff(
      "Vendor's aggregate liability",
      "Each party's aggregate liability",
    );
    expect(vendor.filter(({ type }) => type !== "equal")).toHaveLength(2);
    const doc = parseText(oldText, "dense.txt");
    expect(
      renderParagraph(doc, "p0000", [
        { kind: "replace", paragraphId: "p0000", oldText, newText },
      ]),
    ).toEqual(segments);
  });
});

describe("revision 2 surgical OOXML editing", () => {
  it("preserves hostile inline structures and prior revisions while splitting a multi-run anchor", async () => {
    const original = await hostileFixture();
    const doc = await parseDocx(original, "hostile.docx");
    expect(doc.paragraphs.find(({ id }) => id === "p0006")?.text).not.toContain("Box text");
    expect(doc.paragraphs.find(({ id }) => id === "p0007")?.text).toBe("Box text");
    const request: ApplyRequest = {
      author: "Revision Two",
      date: DATE,
      ops: [
        {
          kind: "replace",
          paragraphId: "p0006",
          oldText: "Hostile ordinary target",
          newText: "Revised ordinary target",
        },
      ],
      comments: [],
    };
    const result = await applyRedlines(original, doc, request);
    const [sourceZip, outputZip] = await Promise.all([
      JSZip.loadAsync(original),
      JSZip.loadAsync(result.docx),
    ]);
    const sourceXml = await sourceZip.file("word/document.xml")?.async("string");
    const outputXml = await outputZip.file("word/document.xml")?.async("string");
    const source = parseXml(sourceXml ?? "", "source.xml");
    const output = parseXml(outputXml ?? "", "output.xml");
    for (const name of [
      "bookmarkStart",
      "bookmarkEnd",
      "commentRangeStart",
      "commentRangeEnd",
      "commentReference",
      "fldChar",
      "fldSimple",
      "instrText",
      "sdt",
      "hyperlink",
      "smartTag",
      "proofErr",
      "AlternateContent",
      "txbxContent",
    ]) {
      expect(elementsByLocalName(output, name), name).toHaveLength(elementsByLocalName(source, name).length);
    }
    expect(elementsByLocalName(output, "sdt").flatMap((node) => elementsByLocalName(node, "id")))
      .toHaveLength(1);
    expect(outputXml).toContain('w:ins w:id="601"');
    expect(outputXml).toContain('w:del w:id="602"');
    expect(outputXml).toContain("prior hidden deletion");
    expect(outputXml).toContain('w:commentRangeStart w:id="700"');
    expect((await parseDocx(result.docx, "output.docx")).paragraphs[6].text).toContain(
      "Revised ordinary target",
    );
    expect(await validateDocx(original, result.docx, request)).toMatchObject({ ok: true });
  });

  it("keeps original ids stable over repeated insert, replace, and delete cycles", async () => {
    const original = await textToDocx("One\n\nTwo\n\nThree target\n\nFour remove");
    const firstDoc = await parseDocx(original, "cycle.docx");
    const first = await applyRedlines(original, firstDoc, {
      author: "Cycle",
      date: DATE,
      comments: [],
      ops: [{ kind: "insert_after", paragraphId: "p0000", text: "Inserted" }],
    });
    const secondDoc = await parseDocx(first.docx, "cycle-1.docx");
    expect(secondDoc.paragraphs.map(({ id }) => id)).toEqual([
      "p0000",
      "p0000.1",
      "p0001",
      "p0002",
      "p0003",
    ]);
    const second = await applyRedlines(first.docx, secondDoc, {
      author: "Cycle",
      date: DATE,
      comments: [],
      ops: [{ kind: "replace", paragraphId: "p0002", oldText: "target", newText: "updated" }],
    });
    const thirdDoc = await parseDocx(second.docx, "cycle-2.docx");
    expect(thirdDoc.paragraphs.find(({ id }) => id === "p0002")?.text).toBe("Three updated");
    const third = await applyRedlines(second.docx, thirdDoc, {
      author: "Cycle",
      date: DATE,
      comments: [],
      ops: [{ kind: "delete_paragraph", paragraphId: "p0003" }],
    });
    const finalDoc = await parseDocx(third.docx, "cycle-3.docx");
    expect(finalDoc.paragraphs.find(({ id }) => id === "p0003")?.text).toBe("");
    expect(finalDoc.paragraphs.find(({ id }) => id === "p0000.1")?.text).toBe("Inserted");
  });

  it("drops inherited automatic numbering when an explicit label is inserted", async () => {
    const original = await realisticFixture();
    const doc = await parseDocx(original, "numbered-anchor.docx");
    const result = await applyRedlines(original, doc, {
      author: "Numbering",
      date: DATE,
      comments: [],
      ops: [{ kind: "insert_after", paragraphId: "p0003", numbering: "2", text: "Explicit item." }],
    });
    const zip = await JSZip.loadAsync(result.docx);
    const xml = await zip.file("word/document.xml")?.async("string");
    const document = parseXml(xml ?? "", "document.xml");
    const inserted = mapBodyParagraphs(document).find(({ id }) => id === "p0003.1")?.node;
    expect(inserted).toBeTruthy();
    expect(directChild(directChild(inserted as Element, "pPr") as Element, "numPr")).toBeUndefined();
  });

  it("falls back ambiguous or absent comment anchors to the whole paragraph with a warning", async () => {
    const original = await textToDocx("term term");
    const doc = await parseDocx(original, "comments.docx");
    const ambiguous = { paragraphId: "p0000", anchorText: "term", text: "Clarify." };
    const missing = { paragraphId: "p0000", anchorText: "absent", text: "Also clarify." };
    expect(validateComment(doc, ambiguous)).toMatchObject({ ok: false, occurrences: 2 });
    expect(validateComment(doc, missing)).toMatchObject({ ok: false, occurrences: 0 });
    const request: ApplyRequest = {
      author: "Comments",
      date: DATE,
      ops: [],
      comments: [ambiguous, missing],
    };
    const result = await applyRedlines(original, doc, request);
    expect(result.warnings).toEqual([
      "Comment anchor in p0000 was ambiguous (2 occurrences); anchored to the whole paragraph",
      "Comment anchor in p0000 was not found; anchored to the whole paragraph",
    ]);
    expect(await validateDocx(original, result.docx, request)).toMatchObject({ ok: true, comments: 2 });
  });
});

describe("revision 2 adversarial package validation", () => {
  it("detects a comment id reused by an existing tracked revision", async () => {
    const original = await realisticFixture();
    const doc = await parseDocx(original, "collision.docx");
    const request: ApplyRequest = {
      author: "Revision Two",
      date: DATE,
      ops: [],
      comments: [{ paragraphId: "p0000", text: "Collision check." }],
    };
    const applied = await applyRedlines(original, doc, request);
    const corrupted = await mutatePart(applied.docx, "word/comments.xml", (xml) =>
      xml.replace(/w:comment w:id="\d+"/, 'w:comment w:id="41"'),
    );
    const report = await validateDocx(original, corrupted, request);
    expect(report.errors.join("\n")).toContain("duplicate revision/comment w:id 41");
  });

  it.each([
    {
      name: "duplicate ids",
      mutate: (xml: string) =>
        xml.replace(/w:id="\d+" w:author="Revision Two"/, 'w:id="601" w:author="Revision Two"'),
      error: "duplicate revision/comment w:id 601",
    },
    {
      name: "wrong author",
      mutate: (xml: string) => xml.replace('w:author="Revision Two"', 'w:author="Wrong"'),
      error: "has author",
    },
    {
      name: "invalid date",
      mutate: (xml: string) => xml.replace(`w:date="${DATE}"`, 'w:date="not-a-date"'),
      error: "invalid RFC 3339 date",
    },
    {
      name: "missing comment anchor",
      mutate: (xml: string) => xml.replace(/<w:commentRangeStart[^>]*\/>/, ""),
      error: "exactly one range start",
    },
    {
      name: "bookmark loss",
      mutate: (xml: string) => xml.replace(/<w:bookmarkStart w:id="501"[^>]*\/>/, ""),
      error: "bookmarkStart count",
    },
    {
      name: "field loss",
      mutate: (xml: string) => xml.replace(/<w:fldChar[^>]*\/>/, ""),
      error: "fldChar count",
    },
    {
      name: "SDT loss",
      mutate: (xml: string) => xml.replace("<w:sdt>", "<w:customXml>").replace("</w:sdt>", "</w:customXml>"),
      error: "sdt count",
    },
    {
      name: "hyperlink loss",
      mutate: (xml: string) =>
        xml.replaceAll("<w:hyperlink", "<w:customXml").replaceAll("</w:hyperlink>", "</w:customXml>"),
      error: "hyperlink count",
    },
    {
      name: "prior revision loss",
      mutate: (xml: string) =>
        xml.replace(/<w:del w:id="602"[\s\S]*?<\/w:del>/, ""),
      error: "prior revision del:602 is missing",
    },
  ])("detects $name", async ({ mutate, error }) => {
    const original = await hostileFixture();
    const doc = await parseDocx(original, "hostile.docx");
    const request: ApplyRequest = {
      author: "Revision Two",
      date: DATE,
      comments: [{ paragraphId: "p0006", text: "Whole paragraph." }],
      ops: [
        {
          kind: "replace",
          paragraphId: "p0006",
          oldText: "Hostile ordinary target",
          newText: "Revised ordinary target",
        },
      ],
    };
    const applied = await applyRedlines(original, doc, request);
    const corrupted = await mutatePart(applied.docx, "word/document.xml", mutate);
    const report = await validateDocx(original, corrupted, request);
    expect(report.ok).toBe(false);
    expect(report.errors.join("\n")).toContain(error);
  });
});
