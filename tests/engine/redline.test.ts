import { existsSync } from "node:fs";
import { performance } from "node:perf_hooks";

import JSZip from "jszip";
import { describe, expect, it } from "vitest";

import {
  applyRedlines,
  parseDocx,
  parseText,
  textToDocx,
  validateComment,
  validateDocx,
  validateOp,
} from "../../src/engine/index";
import type { ApplyRequest } from "../../src/engine/types";
import { elementsByLocalName, parseXml, wordAttribute } from "../../src/engine/xml";
import { realisticFixture } from "./fixture";

const request: ApplyRequest = {
  author: "Playbook Redliner",
  date: "2026-01-01T00:00:00Z",
  ops: [
    {
      kind: "replace",
      paragraphId: "p0001",
      oldText: "reasonable security",
      newText: "industry-standard security",
    },
    {
      kind: "replace",
      paragraphId: "p0001",
      oldText: "Customer’s controls",
      newText: "Customer’s safeguards",
    },
    {
      kind: "replace",
      paragraphId: "p0002",
      oldText: "Example policy",
      newText: "Reference policy",
    },
    {
      kind: "insert_after",
      paragraphId: "p0003",
      numbering: "2",
      text: "Inserted audit obligation.",
    },
    { kind: "delete_paragraph", paragraphId: "p0004" },
  ],
  comments: [
    { paragraphId: "p0000", text: "Scope heading." },
    { paragraphId: "p0001", anchorText: "reasonable security", text: "Use an objective standard." },
    { paragraphId: "p0002", anchorText: "Example policy", text: "Reference updated." },
  ],
};

describe("redline validation", () => {
  it("rejects zero and repeated anchors with actionable errors", () => {
    const doc = parseText("term term unique", "anchors.txt");
    expect(
      validateOp(doc, { kind: "replace", paragraphId: "p0000", oldText: "missing", newText: "x" }),
    ).toEqual({
      ok: false,
      error: 'oldText not found in p0000; nearest text: "term term unique"',
      occurrences: 0,
    });
    expect(
      validateOp(doc, { kind: "replace", paragraphId: "p0000", oldText: "term", newText: "x" }),
    ).toEqual({
      ok: false,
      error: "oldText occurs 2 times in p0000; include more context",
      occurrences: 2,
    });
    expect(
      validateComment(doc, { paragraphId: "p0000", anchorText: "unique", text: "Comment" }),
    ).toEqual({ ok: true, occurrences: 1 });
  });

  it("returns an exact copy for an empty request", async () => {
    const original = await realisticFixture();
    const doc = await parseDocx(original, "fixture.docx");
    const result = await applyRedlines(original, doc, {
      author: "Playbook Redliner",
      ops: [],
      comments: [],
    });
    expect(result.docx).toEqual(original);
    expect(result.applied).toBe(0);
  });

  it("adds a whole-paragraph comment without flattening an existing revision", async () => {
    const original = await realisticFixture();
    const doc = await parseDocx(original, "fixture.docx");
    const result = await applyRedlines(original, doc, {
      author: "Playbook Redliner",
      date: "2026-01-01T00:00:00Z",
      ops: [],
      comments: [{ paragraphId: "p0005", text: "Keep prior reviewer history." }],
    });
    const zip = await JSZip.loadAsync(result.docx);
    const xml = await zip.file("word/document.xml")?.async("string");
    expect(xml).toContain('w:author="Prior Reviewer"');
    expect(xml).toContain("Existing insertion");
    expect(xml).toContain("w:commentRangeStart");
  });

  it("styles an inserted heading and gives it a stable subordinate id", async () => {
    const original = await textToDocx("1. Existing\n\nBody text.");
    const doc = await parseDocx(original, "heading.docx");
    const result = await applyRedlines(original, doc, {
      author: "Playbook Redliner",
      date: "2026-01-01T00:00:00Z",
      comments: [],
      ops: [
        {
          kind: "insert_after",
          paragraphId: "p0001",
          numbering: "2",
          text: "New Heading",
          asHeading: true,
        },
      ],
    });
    const redlined = await parseDocx(result.docx, "heading-redlined.docx");
    expect(redlined.paragraphs.find((paragraph) => paragraph.id === "p0001.1")).toMatchObject({
      text: "2 New Heading",
      style: "Heading 1",
      isHeading: true,
    });
  });

  it("writes well-formed native changes, comments, and stable inserted ids", async () => {
    const original = await realisticFixture();
    const doc = await parseDocx(original, "fixture.docx");
    const result = await applyRedlines(original, doc, request);
    expect(result.applied).toBe(5);
    const zip = await JSZip.loadAsync(result.docx);
    const documentXml = await zip.file("word/document.xml")?.async("string");
    const commentsXml = await zip.file("word/comments.xml")?.async("string");
    expect(documentXml).toBeTruthy();
    expect(commentsXml).toBeTruthy();
    const document = parseXml(documentXml ?? "", "word/document.xml");
    const comments = parseXml(commentsXml ?? "", "word/comments.xml");
    expect(elementsByLocalName(document, "ins").length).toBeGreaterThan(1);
    expect(elementsByLocalName(document, "del").length).toBeGreaterThan(1);
    expect(elementsByLocalName(document, "delText").length).toBeGreaterThan(0);
    expect(elementsByLocalName(comments, "comment")).toHaveLength(3);
    const changes = [
      ...elementsByLocalName(document, "ins"),
      ...elementsByLocalName(document, "del"),
      ...elementsByLocalName(comments, "comment"),
    ];
    const ids = changes.map((element) => wordAttribute(element, "id"));
    expect(new Set(ids).size).toBe(ids.length);
    const newChanges = changes.filter(
      (element) => wordAttribute(element, "author") === "Playbook Redliner",
    );
    expect(newChanges.length).toBeGreaterThan(0);
    for (const element of newChanges) {
      expect(wordAttribute(element, "author")).toBe("Playbook Redliner");
      expect(wordAttribute(element, "date")).toBe("2026-01-01T00:00:00Z");
    }
    expect(documentXml).toContain("w:commentRangeStart");
    expect(documentXml).toContain("w:commentRangeEnd");
    expect(documentXml).toContain("w:commentReference");
    expect(elementsByLocalName(document, "hyperlink").length).toBeGreaterThan(0);
    expect(await zip.file("[Content_Types].xml")?.async("string")).toContain("/word/comments.xml");
    expect(await zip.file("word/_rels/document.xml.rels")?.async("string")).toContain("relationships/comments");

    const redlined = await parseDocx(result.docx, "redlined.docx");
    expect(redlined.paragraphs.map(({ id, text }) => [id, text])).toContainEqual([
      "p0003.1",
      "2 Inserted audit obligation.",
    ]);
    expect(redlined.paragraphs.find((paragraph) => paragraph.id === "p0004")?.text).toBe("");
    const insertedRun = redlined.paragraphs[1].runs?.find((run) => run.text.includes("industry-standard"));
    expect(insertedRun).toMatchObject({ bold: true });

    const report = await validateDocx(original, result.docx, request);
    expect(report).toMatchObject({ ok: true, comments: 3, untouchedIdentical: true });
    expect(report.collateralParagraphIds).toEqual([]);
  });

  it("detects a deliberately corrupted untouched paragraph", async () => {
    const original = await realisticFixture();
    const doc = await parseDocx(original, "fixture.docx");
    const applied = await applyRedlines(original, doc, request);
    const zip = await JSZip.loadAsync(applied.docx);
    const entry = zip.file("word/document.xml");
    if (!entry) throw new Error("missing document part");
    const xml = (await entry.async("string")).replace("Existing insertion", "Corrupted insertion");
    zip.file("word/document.xml", xml);
    const corrupted = await zip.generateAsync({ type: "uint8array" });
    const report = await validateDocx(original, corrupted, request);
    expect(report.ok).toBe(false);
    expect(report.collateralParagraphIds).toContain("p0005");
  });

  it("parses 8k words under 500ms and applies 30 operations under 1s", async () => {
    const text = Array.from({ length: 200 }, (_, index) =>
      `Clause token${index} ${Array.from({ length: 38 }, () => "obligation").join(" ")}`,
    ).join("\n\n");
    const bytes = await textToDocx(text);
    const parseStart = performance.now();
    const doc = await parseDocx(bytes, "large.docx");
    const parseTime = performance.now() - parseStart;
    const perfRequest: ApplyRequest = {
      author: "Performance Test",
      date: "2026-01-01T00:00:00Z",
      comments: [],
      ops: Array.from({ length: 30 }, (_, index) => ({
        kind: "replace" as const,
        paragraphId: `p${String(index).padStart(4, "0")}`,
        oldText: `token${index}`,
        newText: `updated${index}`,
      })),
    };
    const applyStart = performance.now();
    await applyRedlines(bytes, doc, perfRequest);
    const applyTime = performance.now() - applyStart;
    expect(doc.stats.words).toBe(8_000);
    expect(parseTime).toBeLessThan(500);
    expect(applyTime).toBeLessThan(1_000);
  });

  it.skipIf(
    !existsSync("/Applications/LibreOffice.app/Contents/MacOS/soffice") &&
      !process.env.PATH?.split(":").some((path) => existsSync(`${path}/soffice`)),
  )("converts a redlined DOCX to PDF with LibreOffice (skipped when unavailable)", async () => {
    const original = await realisticFixture();
    const doc = await parseDocx(original, "fixture.docx");
    const applied = await applyRedlines(original, doc, request);
    const report = await validateDocx(original, applied.docx, request, { libreoffice: true });
    expect(report.libreoffice).toMatchObject({ attempted: true, ok: true });
  });
});
