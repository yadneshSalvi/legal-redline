import { createHash } from "node:crypto";

import JSZip from "jszip";

import { buildDocumentModel } from "./model";
import type { ParagraphInput } from "./model";
import { resolveNumberingLabels } from "./docx-numbering";
import { mapBodyParagraphs } from "./paragraph-map";
import { registerRevisionContext } from "./revision-context";
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

function belongsToParagraph(element: Element, paragraph: Element): boolean {
  for (let parent = element.parentNode; parent; parent = parent.parentNode) {
    if (parent.nodeType === 1 && (parent as Element).localName === "p") return parent === paragraph;
  }
  return false;
}

function runText(run: Element, paragraph: Element): string {
  let text = "";
  const visit = (node: Node): void => {
    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (child.nodeType !== 1) continue;
      const element = child as Element;
      if (element.localName === "p" && element !== paragraph) continue;
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
    if (!belongsToParagraph(run, paragraph)) continue;
    if (isInsideDeletedText(run, paragraph)) continue;
    const text = runText(run, paragraph);
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

function paragraphInput(
  paragraph: Element,
  styles: Map<string, string>,
  numbering: string | undefined,
  insertedId?: string,
): ParagraphInput {
  const runs = paragraphRuns(paragraph);
  const pPr = directChild(paragraph, "pPr");
  const pStyle = pPr ? directChild(pPr, "pStyle") : undefined;
  const styleId = pStyle ? wordAttribute(pStyle, "val") : undefined;
  const text = runs.map((run) => run.text).join("").replace(/\s+$/u, "");
  const literalNumbering =
    /^\(([a-zivxlcdm]+|\d+)\)\s+/i.exec(text)?.[0].trim() ??
    /^(?:Section\s+)?(\d+(?:\.\d+)*)(?:[.)])?\s+/i.exec(text)?.[1] ??
    /^ARTICLE\s+([IVXLCDM]+|\d+)\b/i.exec(text)?.[1];
  return {
    text,
    ...(styleId ? { style: styles.get(styleId) ?? styleId } : {}),
    ...(literalNumbering || numbering ? { numbering: literalNumbering ?? numbering } : {}),
    ...(runs.length > 0 ? { runs } : {}),
    ...(insertedId ? { insertedId } : {}),
  };
}

/** Parse the main document part into visible paragraphs; deleted text and ancillary parts are ignored. */
export async function parseDocx(bytes: Uint8Array, filename: string): Promise<DocumentModel> {
  const zip = await JSZip.loadAsync(bytes);
  const documentEntry = zip.file("word/document.xml");
  if (!documentEntry) throw new Error("Invalid DOCX: word/document.xml is missing");

  const [documentXml, stylesXml, numberingXml] = await Promise.all([
    documentEntry.async("string"),
    zip.file("word/styles.xml")?.async("string"),
    zip.file("word/numbering.xml")?.async("string"),
  ]);
  const document = parseXml(documentXml, "word/document.xml");
  const styles = stylesXml ? parseXml(stylesXml, "word/styles.xml") : undefined;
  const numbering = numberingXml ? parseXml(numberingXml, "word/numbering.xml") : undefined;
  const body = elementsByLocalName(document, "body")[0];
  if (!body) throw new Error("Invalid DOCX: word/document.xml has no w:body");
  const stylesById = styleMap(styles);
  const mapped = mapBodyParagraphs(document);
  const labels = resolveNumberingLabels(mapped.map(({ node }) => node), numbering);
  const inputs = mapped.map(({ node, id, inserted }, index) =>
    paragraphInput(node, stylesById, labels[index], inserted ? id : undefined),
  );

  const model = buildDocumentModel(inputs, {
    kind: "docx",
    filename,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    bytes: bytes.byteLength,
  });
  registerRevisionContext(model, mapped);
  return model;
}
