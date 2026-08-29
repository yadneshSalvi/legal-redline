import type { IdAllocator } from "./redline-dom";
import {
  createWordElement,
  directChild,
  elementsByLocalName,
  sanitizeXmlText,
  setWordAttribute,
  XML_NS,
} from "./xml";

export interface SourceRun {
  start: number;
  end: number;
  text: string;
  rPr?: Element;
  wrappers: Element[];
}

const SOURCE_WRAPPERS = new Set([
  "bdo",
  "customXml",
  "dir",
  "fldSimple",
  "hyperlink",
  "ins",
  "sdt",
  "sdtContent",
  "smartTag",
]);

function isDeleted(run: Element, paragraph: Element): boolean {
  for (let parent = run.parentNode; parent && parent !== paragraph; parent = parent.parentNode) {
    if (parent.nodeType === 1 && (parent as Element).localName === "del") return true;
  }
  return false;
}

function visibleRunText(run: Element): string {
  let result = "";
  const visit = (node: Node): void => {
    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (child.nodeType !== 1) continue;
      const element = child as Element;
      if (element.localName === "del" || element.localName === "delText") continue;
      if (element.localName === "t") result += element.textContent ?? "";
      else if (element.localName === "tab" || element.localName === "br") result += " ";
      else visit(element);
    }
  };
  visit(run);
  return result.replace(/ /g, " ").replace(/\t/g, " ");
}

function sourceWrappers(run: Element, paragraph: Element): Element[] {
  const wrappers: Element[] = [];
  for (let parent = run.parentNode; parent && parent !== paragraph; parent = parent.parentNode) {
    if (parent.nodeType === 1 && SOURCE_WRAPPERS.has((parent as Element).localName)) {
      wrappers.unshift(parent as Element);
    }
  }
  return wrappers;
}

/** Map visible run text to source offsets, properties, and semantic wrapper ancestry. */
export function sourceRuns(paragraph: Element): SourceRun[] {
  const records: SourceRun[] = [];
  let offset = 0;
  for (const run of elementsByLocalName(paragraph, "r")) {
    if (isDeleted(run, paragraph)) continue;
    const text = visibleRunText(run);
    if (text.length === 0) continue;
    records.push({
      start: offset,
      end: offset + text.length,
      text,
      ...(directChild(run, "rPr") ? { rPr: directChild(run, "rPr")?.cloneNode(true) as Element } : {}),
      wrappers: sourceWrappers(run, paragraph),
    });
    offset += text.length;
  }
  let trimming = true;
  for (let index = records.length - 1; index >= 0 && trimming; index -= 1) {
    const record = records[index];
    record.text = record.text.replace(/\s+$/u, "");
    record.end = record.start + record.text.length;
    trimming = record.text.length === 0;
  }
  return records.filter((record) => record.end > record.start);
}

/** Recreate hyperlink, smart-tag, and existing-insertion containers around a generated node. */
export function wrapWithSourceContainers(
  document: Document,
  node: Node,
  wrappers: Element[],
  includeExistingRevisions: boolean,
  allocator?: IdAllocator,
): Node {
  let wrapped = node;
  for (const source of wrappers.toReversed()) {
    if (!includeExistingRevisions && source.localName === "ins") continue;
    const container = document.importNode(source.cloneNode(false), false);
    if (source.localName === "ins" && allocator) {
      setWordAttribute(container as Element, "id", String(allocator.next()));
    }
    if (source.localName === "sdt") {
      for (let child = source.firstChild; child; child = child.nextSibling) {
        if (child.nodeType !== 1 || (child as Element).localName !== "sdtContent") {
          container.appendChild(document.importNode(child, true));
        }
      }
    }
    container.appendChild(wrapped);
    wrapped = container;
  }
  return wrapped;
}

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
