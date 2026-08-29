import type { IdAllocator } from "./redline-dom";
import { createWordElement, directChild, sanitizeXmlText, setWordAttribute } from "./xml";

/** Add a tracked paragraph-mark property change without replacing existing paragraph properties. */
export function ensureParagraphMarkChange(
  paragraph: Element,
  kind: "ins" | "del",
  allocator: IdAllocator,
  author: string,
  date: string,
): void {
  let pPr = directChild(paragraph, "pPr");
  if (!pPr) {
    pPr = createWordElement(paragraph.ownerDocument, "pPr");
    paragraph.insertBefore(pPr, paragraph.firstChild);
  }
  let rPr = directChild(pPr, "rPr");
  if (!rPr) {
    rPr = createWordElement(paragraph.ownerDocument, "rPr");
    pPr.appendChild(rPr);
  }
  const change = createWordElement(paragraph.ownerDocument, kind);
  setWordAttribute(change, "id", String(allocator.next()));
  setWordAttribute(change, "author", sanitizeXmlText(author));
  setWordAttribute(change, "date", date);
  rPr.appendChild(change);
}
