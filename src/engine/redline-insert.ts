import type { IdAllocator } from "./redline-dom";
import { ensureParagraphMarkChange } from "./redline-paragraph";
import { newRun, trackedWrapper } from "./redline-runs";
import type { RedlineOp } from "./types";
import { createWordElement, directChild, elementsByLocalName, setWordAttribute } from "./xml";

function stripInheritedParagraphMetadata(pPr: Element): void {
  for (const name of ["ins", "del"] as const) {
    for (const revision of elementsByLocalName(pPr, name)) {
      revision.parentNode?.removeChild(revision);
    }
  }
  const visit = (element: Element): void => {
    for (let index = element.attributes.length - 1; index >= 0; index -= 1) {
      const attribute = element.attributes.item(index);
      if (attribute?.localName.toLocaleLowerCase().startsWith("rsid")) {
        element.removeAttributeNode(attribute);
      }
    }
    for (let child = element.firstChild; child; child = child.nextSibling) {
      if (child.nodeType === 1) visit(child as Element);
    }
  };
  visit(pPr);
}

/** Add an explicit numbering label unless the inserted text already starts with that full label. */
export function insertedParagraphText(op: Extract<RedlineOp, { kind: "insert_after" }>): string {
  if (!op.numbering) return op.text;
  const trimmed = op.text.trimStart();
  const suffix = trimmed.slice(op.numbering.length);
  const alreadyNumbered =
    trimmed.startsWith(op.numbering) && (suffix.length === 0 || /^[.)\s]/.test(suffix));
  return alreadyNumbered ? op.text : `${op.numbering} ${op.text}`;
}

/** Create a new tracked paragraph after an existing paragraph, preserving paragraph properties. */
export function insertTrackedParagraph(
  anchor: Element,
  op: Extract<RedlineOp, { kind: "insert_after" }>,
  insertedId: string,
  allocator: IdAllocator,
  author: string,
  date: string,
): Element {
  const document = anchor.ownerDocument;
  const paragraph = createWordElement(document, "p");
  const anchorPPr = directChild(anchor, "pPr");
  if (anchorPPr) paragraph.appendChild(document.importNode(anchorPPr, true));
  let pPr = directChild(paragraph, "pPr");
  if (!pPr) {
    pPr = createWordElement(document, "pPr");
    paragraph.appendChild(pPr);
  }
  stripInheritedParagraphMetadata(pPr);
  if (op.numbering) {
    const numPr = directChild(pPr, "numPr");
    if (numPr) pPr.removeChild(numPr);
  }
  if (op.asHeading) {
    let pStyle = directChild(pPr, "pStyle");
    if (!pStyle) {
      pStyle = createWordElement(document, "pStyle");
      pPr.insertBefore(pStyle, pPr.firstChild);
    }
    const level = Math.min(3, Math.max(1, op.numbering?.split(".").length ?? 1));
    setWordAttribute(pStyle, "val", `Heading${level}`);
  }
  ensureParagraphMarkChange(paragraph, "ins", allocator, author, date);

  const bookmarkId = allocator.next();
  const bookmarkStart = createWordElement(document, "bookmarkStart");
  setWordAttribute(bookmarkStart, "id", String(bookmarkId));
  setWordAttribute(bookmarkStart, "name", `_PlaybookRedliner_${insertedId.replaceAll(".", "_")}`);
  paragraph.appendChild(bookmarkStart);

  const visibleText = insertedParagraphText(op);
  const run = newRun(document, visibleText, undefined, false);
  paragraph.appendChild(trackedWrapper(document, "ins", run, allocator, author, date));
  const bookmarkEnd = createWordElement(document, "bookmarkEnd");
  setWordAttribute(bookmarkEnd, "id", String(bookmarkId));
  paragraph.appendChild(bookmarkEnd);
  return paragraph;
}
