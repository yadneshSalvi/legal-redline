import { createHash } from "node:crypto";

import JSZip from "jszip";

import { buildDocumentModel } from "./model";
import type { ParagraphInput } from "./model";
import type { DocumentModel, RunSpan } from "./types";
import {
  directChild,
  elementsByLocalName,
  parseXml,
  wordAttribute,
} from "./xml";

function isInsideDeletedText(element: Element, paragraph: Element): boolean {
  for (let parent = element.parentNode; parent && parent !== paragraph; parent = parent.parentNode) {
    if (parent.nodeType === 1 && (parent as Element).localName === "del") return true;
  }
  return false;
}

function runText(run: Element): string {
  let text = "";
  const visit = (node: Node): void => {
    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (child.nodeType !== 1) continue;
      const element = child as Element;
      if (element.localName === "del" || element.localName === "delText") continue;
      if (element.localName === "t") text += element.textContent ?? "";
      else if (element.localName === "tab" || element.localName === "br") text += " ";
      else visit(element);
    }
  };
  visit(run);
  return text.replace(/ /g, " ").replace(/\t/g, " ");
}

function hasRunProperty(rPr: Element | undefined, name: string): boolean {
  const property = rPr ? directChild(rPr, name) : undefined;
  if (!property) return false;
  const value = wordAttribute(property, "val");
  return value === undefined || !/^(?:0|false|off)$/i.test(value);
}

function paragraphRuns(paragraph: Element): RunSpan[] {
  const runs: RunSpan[] = [];
  for (const run of elementsByLocalName(paragraph, "r")) {
    if (isInsideDeletedText(run, paragraph)) continue;
    const text = runText(run);
    if (text.length === 0) continue;
    const rPr = directChild(run, "rPr");
    runs.push({
      text,
      ...(hasRunProperty(rPr, "b") ? { bold: true } : {}),
      ...(hasRunProperty(rPr, "i") ? { italic: true } : {}),
      ...(hasRunProperty(rPr, "u") ? { underline: true } : {}),
    });
  }
  let trimming = true;
  for (let index = runs.length - 1; index >= 0 && trimming; index -= 1) {
    runs[index].text = runs[index].text.replace(/\s+$/u, "");
    trimming = runs[index].text.length === 0;
  }
  return runs.filter((run) => run.text.length > 0);
}

function styleMap(styles: Document | undefined): Map<string, string> {
  const stylesById = new Map<string, string>();
  if (!styles) return stylesById;
  for (const style of elementsByLocalName(styles, "style")) {
    const id = wordAttribute(style, "styleId");
    const nameNode = directChild(style, "name");
    const name = nameNode ? wordAttribute(nameNode, "val") : undefined;
    if (id) stylesById.set(id, name ?? id);
  }
  return stylesById;
}

function insertedParagraphId(paragraph: Element): string | undefined {
  for (const bookmark of elementsByLocalName(paragraph, "bookmarkStart")) {
    const name = wordAttribute(bookmark, "name");
    const match = /^_PlaybookRedliner_(p\d{4})_(\d+)$/.exec(name ?? "");
    if (match) return `${match[1]}.${match[2]}`;
  }
  return undefined;
}

function paragraphInput(paragraph: Element, styles: Map<string, string>): ParagraphInput {
  const runs = paragraphRuns(paragraph);
  const pPr = directChild(paragraph, "pPr");
  const pStyle = pPr ? directChild(pPr, "pStyle") : undefined;
  const styleId = pStyle ? wordAttribute(pStyle, "val") : undefined;
  const text = runs.map((run) => run.text).join("").replace(/\s+$/u, "");
  return {
    text,
    ...(styleId ? { style: styles.get(styleId) ?? styleId } : {}),
    ...(runs.length > 0 ? { runs } : {}),
    ...(insertedParagraphId(paragraph) ? { insertedId: insertedParagraphId(paragraph) } : {}),
  };
}

/** Parse the main document part into visible paragraphs; deleted text and ancillary parts are ignored. */
export async function parseDocx(bytes: Uint8Array, filename: string): Promise<DocumentModel> {
  const zip = await JSZip.loadAsync(bytes);
  const documentEntry = zip.file("word/document.xml");
  if (!documentEntry) throw new Error("Invalid DOCX: word/document.xml is missing");

  const [documentXml, stylesXml] = await Promise.all([
    documentEntry.async("string"),
    zip.file("word/styles.xml")?.async("string"),
  ]);
  const document = parseXml(documentXml, "word/document.xml");
  const styles = stylesXml ? parseXml(stylesXml, "word/styles.xml") : undefined;
  const body = elementsByLocalName(document, "body")[0];
  if (!body) throw new Error("Invalid DOCX: word/document.xml has no w:body");
  const stylesById = styleMap(styles);
  const inputs = elementsByLocalName(body, "p").map((paragraph) =>
    paragraphInput(paragraph, stylesById),
  );

  return buildDocumentModel(inputs, {
    kind: "docx",
    filename,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    bytes: bytes.byteLength,
  });
}
