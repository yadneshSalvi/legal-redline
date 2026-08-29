import JSZip from "jszip";
import { describe, expect, it } from "vitest";

import {
  applyRedlines,
  parseDocx,
  textToDocx,
  validateDocx,
  validateOp,
} from "../../src/engine/index";
import { mapBodyParagraphs } from "../../src/engine/paragraph-map";
import type { ApplyRequest } from "../../src/engine/types";
import {
  directChild,
  elementsByLocalName,
  parseXml,
  serializeXml,
  wordAttribute,
} from "../../src/engine/xml";
import { realisticFixture } from "./fixture";

const DATE = "2026-01-01T00:00:00Z";

async function mutateDocument(
  bytes: Uint8Array,
  mutate: (document: Document) => void,
): Promise<Uint8Array> {
  const zip = await JSZip.loadAsync(bytes);
  const entry = zip.file("word/document.xml");
  if (!entry) throw new Error("missing word/document.xml");
  const document = parseXml(await entry.async("string"), "word/document.xml");
  mutate(document);
  zip.file("word/document.xml", serializeXml(document));
  return zip.generateAsync({ type: "uint8array", compression: "DEFLATE" });
}

async function documentDom(bytes: Uint8Array): Promise<Document> {
  const zip = await JSZip.loadAsync(bytes);
  return parseXml(
    (await zip.file("word/document.xml")?.async("string")) ?? "",
    "word/document.xml",
  );
}

function revisionIds(document: Document): string[] {
  return [
    ...elementsByLocalName(document, "ins"),
    ...elementsByLocalName(document, "del"),
  ].map((element) => wordAttribute(element, "id") ?? "");
}

function hasAncestor(node: Node, localName: string): boolean {
  for (let parent = node.parentNode; parent; parent = parent.parentNode) {
    if (parent.nodeType === 1 && (parent as Element).localName === localName) return true;
  }
  return false;
}

describe("revision 3 tracked-insertion reconciliation", () => {
  it("inserts after an inserted paragraph without inheriting revisions or rsids", async () => {
    const original = await textToDocx("One");
    const firstDoc = await parseDocx(original, "first.docx");
    const first = await applyRedlines(original, firstDoc, {
      author: "Cycle",
      date: DATE,
      comments: [],
      ops: [{ kind: "insert_after", paragraphId: "p0000", text: "First inserted" }],
    });
    const withRsid = await mutateDocument(first.docx, (document) => {
      const inserted = mapBodyParagraphs(document).find(({ id }) => id === "p0000.1")?.node;
      const pPr = inserted && directChild(inserted, "pPr");
      pPr?.setAttribute("w:rsidR", "00ABCDEF");
    });
    const secondDoc = await parseDocx(withRsid, "second.docx");
    const request: ApplyRequest = {
      author: "Cycle",
      date: DATE,
      comments: [],
      ops: [{ kind: "insert_after", paragraphId: "p0000.1", text: "Nested inserted" }],
    };
    const second = await applyRedlines(withRsid, secondDoc, request);
    const document = await documentDom(second.docx);
    const nested = mapBodyParagraphs(document).find(({ id }) => id === "p0000.1.1")?.node;
    expect(nested).toBeTruthy();
    const nestedPPr = directChild(nested as Element, "pPr") as Element;
    const rsids = Array.from({ length: nestedPPr.attributes.length }, (_, index) =>
      nestedPPr.attributes.item(index)?.localName,
    ).filter((name) => name?.toLowerCase().startsWith("rsid"));
    expect(rsids).toEqual([]);
    const ids = revisionIds(document);
    expect(new Set(ids).size).toBe(ids.length);
    expect(await validateDocx(withRsid, second.docx, request)).toMatchObject({ ok: true });
  });

  it("edits its own prior insertion directly without nesting or changing its id", async () => {
    const original = await textToDocx("Anchor");
    const doc = await parseDocx(original, "own-ins.docx");
    const first = await applyRedlines(original, doc, {
      author: "Cycle",
      date: DATE,
      comments: [],
      ops: [{ kind: "insert_after", paragraphId: "p0000", text: "alpha target omega" }],
    });
    const firstXml = await documentDom(first.docx);
    const prior = elementsByLocalName(firstXml, "ins").find((element) =>
      (element.textContent ?? "").includes("alpha target omega"),
    );
    const priorId = prior && wordAttribute(prior, "id");
    const current = await parseDocx(first.docx, "own-ins-current.docx");
    const op = { kind: "replace" as const, paragraphId: "p0000.1", oldText: "target", newText: "updated" };
    expect(validateOp(current, op)).toMatchObject({ ok: true });
    const request: ApplyRequest = { author: "Cycle", date: DATE, comments: [], ops: [op] };
    const second = await applyRedlines(first.docx, current, request);
    const output = await documentDom(second.docx);
    const reconciled = elementsByLocalName(output, "ins").find(
      (element) => wordAttribute(element, "id") === priorId,
    );
    expect(reconciled?.textContent).toContain("alpha updated omega");
    expect(elementsByLocalName(reconciled as Element, "ins")).toHaveLength(0);
    expect((await parseDocx(second.docx, "own-ins-output.docx")).paragraphs.find(({ id }) => id === "p0000.1")?.text)
      .toBe("alpha updated omega");
    expect(await validateDocx(first.docx, second.docx, request)).toMatchObject({ ok: true });
  });

  it("reconciles its own inserted run in an original paragraph on a later pass", async () => {
    const original = await textToDocx("alpha target omega");
    const doc = await parseDocx(original, "first-pass.docx");
    const first = await applyRedlines(original, doc, {
      author: "Cycle",
      date: DATE,
      comments: [],
      ops: [{ kind: "replace", paragraphId: "p0000", oldText: "target", newText: "updated" }],
    });
    const before = await documentDom(first.docx);
    const ownInsertion = elementsByLocalName(before, "ins").find(
      (element) => (element.textContent ?? "").includes("updated"),
    );
    const ownId = ownInsertion && wordAttribute(ownInsertion, "id");
    const current = await parseDocx(first.docx, "second-pass.docx");
    const request: ApplyRequest = {
      author: "Cycle",
      date: DATE,
      comments: [],
      ops: [{ kind: "replace", paragraphId: "p0000", oldText: "updated", newText: "final" }],
    };
    const second = await applyRedlines(first.docx, current, request);
    const output = await documentDom(second.docx);
    const reconciled = elementsByLocalName(output, "ins").find(
      (element) => wordAttribute(element, "id") === ownId,
    );
    expect(reconciled?.textContent).toBe("final");
    expect(elementsByLocalName(reconciled as Element, "ins")).toHaveLength(0);
    expect(await validateDocx(first.docx, second.docx, request)).toMatchObject({ ok: true });
  });

  it("preflights an edit that overlaps a foreign insertion", async () => {
    const original = await realisticFixture();
    const doc = await parseDocx(original, "foreign-ins.docx");
    const op = {
      kind: "replace" as const,
      paragraphId: "p0005",
      oldText: "Existing insertion",
      newText: "Changed insertion",
    };
    const message =
      "anchor overlaps an existing tracked insertion by Prior Reviewer; accept or reject that change first";
    expect(validateOp(doc, op)).toMatchObject({ ok: false, error: message });
    await expect(
      applyRedlines(original, doc, {
        author: "Cycle",
        date: DATE,
        comments: [],
        ops: [op],
      }),
    ).rejects.toThrow(message);
  });

  it("places a cross-hyperlink insertion in the anchor-start context", async () => {
    const original = await realisticFixture();
    const doc = await parseDocx(original, "hyperlink.docx");
    const request: ApplyRequest = {
      author: "Cross Link",
      date: DATE,
      comments: [],
      ops: [{
        kind: "replace",
        paragraphId: "p0002",
        oldText: "See Example policy",
        newText: "Consult policy",
      }],
    };
    const result = await applyRedlines(original, doc, request);
    const document = await documentDom(result.docx);
    const inserted = elementsByLocalName(document, "ins").find(
      (element) => wordAttribute(element, "author") === "Cross Link" && (element.textContent ?? "").length > 0,
    );
    expect(inserted).toBeTruthy();
    expect(hasAncestor(inserted as Element, "hyperlink")).toBe(false);
    expect(
      elementsByLocalName(document, "del").some(
        (element) => wordAttribute(element, "author") === "Cross Link" && hasAncestor(element, "hyperlink"),
      ),
    ).toBe(true);
    expect((await parseDocx(result.docx, "hyperlink-output.docx")).paragraphs[2].text)
      .toBe("Consult policy for details.");
    const validation = await validateDocx(original, result.docx, request);
    expect(validation.errors).toEqual([]);
    expect(validation.ok).toBe(true);
  });
});

describe("revision 3 comment placement validation", () => {
  async function commentedDocument(): Promise<{
    original: Uint8Array;
    result: Uint8Array;
    request: ApplyRequest;
  }> {
    const original = await textToDocx("Heading\n\nPayment clause due.");
    const doc = await parseDocx(original, "comments.docx");
    const request: ApplyRequest = {
      author: "Comments",
      date: DATE,
      ops: [],
      comments: [{ paragraphId: "p0001", anchorText: "Payment clause", text: "Review it." }],
    };
    const applied = await applyRedlines(original, doc, request);
    return { original, result: applied.docx, request };
  }

  it("rejects comment markers moved into another paragraph", async () => {
    const { original, result, request } = await commentedDocument();
    const corrupted = await mutateDocument(result, (document) => {
      const paragraphs = mapBodyParagraphs(document);
      const source = paragraphs.find(({ id }) => id === "p0001")?.node as Element;
      const target = paragraphs.find(({ id }) => id === "p0000")?.node as Element;
      const start = elementsByLocalName(source, "commentRangeStart")[0];
      const end = elementsByLocalName(source, "commentRangeEnd")[0];
      const reference = elementsByLocalName(source, "commentReference")[0]?.parentNode;
      target.appendChild(start);
      target.appendChild(end);
      if (reference) target.appendChild(reference);
    });
    const report = await validateDocx(original, corrupted, request);
    expect(report.ok).toBe(false);
    expect(report.errors.join("\n")).toContain("expected p0001");
  });

  it("rejects an empty marker range in the requested paragraph", async () => {
    const { original, result, request } = await commentedDocument();
    const corrupted = await mutateDocument(result, (document) => {
      const paragraph = mapBodyParagraphs(document).find(({ id }) => id === "p0001")?.node as Element;
      const start = elementsByLocalName(paragraph, "commentRangeStart")[0];
      const end = elementsByLocalName(paragraph, "commentRangeEnd")[0];
      const reference = elementsByLocalName(paragraph, "commentReference")[0]?.parentNode;
      paragraph.appendChild(start);
      paragraph.appendChild(end);
      if (reference) paragraph.appendChild(reference);
    });
    const report = await validateDocx(original, corrupted, request);
    expect(report.ok).toBe(false);
    expect(report.errors.join("\n")).toContain('range encloses "", expected "Payment clause" in p0001');
  });
});
