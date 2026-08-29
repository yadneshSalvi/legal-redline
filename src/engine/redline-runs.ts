import type { IdAllocator } from "./redline-dom";
import {
  createWordElement,
  sanitizeXmlText,
  setWordAttribute,
  XML_NS,
} from "./xml";

/** Build a textual run with copied properties and mandatory whitespace preservation. */
export function newRun(
  document: Document,
  text: string,
  rPr: Element | undefined,
  deleted: boolean,
): Element {
  const run = createWordElement(document, "r");
  if (rPr) run.appendChild(document.importNode(rPr, true));
  const textNode = createWordElement(document, deleted ? "delText" : "t");
  textNode.setAttributeNS(XML_NS, "xml:space", "preserve");
  textNode.appendChild(document.createTextNode(sanitizeXmlText(text)));
  run.appendChild(textNode);
  return run;
}

/** Wrap a run in a uniquely identified insertion or deletion revision. */
export function trackedWrapper(
  document: Document,
  kind: "ins" | "del",
  run: Element,
  allocator: IdAllocator,
  author: string,
  date: string,
): Element {
  const wrapper = createWordElement(document, kind);
  setWordAttribute(wrapper, "id", String(allocator.next()));
  setWordAttribute(wrapper, "author", sanitizeXmlText(author));
  setWordAttribute(wrapper, "date", date);
  wrapper.appendChild(run);
  return wrapper;
}
