import { wordDiff } from "./diff";
import { newRun, trackedWrapper } from "./redline-runs";
import type { RedlineComment, RedlineOp } from "./types";
import {
  createWordElement,
  directChild,
  elementsByLocalName,
  sanitizeXmlText,
  setWordAttribute,
  XML_NS,
} from "./xml";

export interface IdAllocator {
  next(): number;
}

export interface AppliedCounts {
  insertions: number;
  deletions: number;
  comments: number;
}

export interface AssignedComment {
  comment: RedlineComment;
  id: number;
}

interface Carrier {
  element: Element;
  run: Element;
  start: number;
  end: number;
  text: string;
}

interface Boundary {
  parent: Node;
  before: Node | null;
}

function hasAncestor(node: Node, stop: Node, localName: string): boolean {
  for (let parent = node.parentNode; parent && parent !== stop; parent = parent.parentNode) {
    if (parent.nodeType === 1 && (parent as Element).localName === localName) return true;
  }
  return false;
}

function belongsToParagraph(node: Node, paragraph: Element): boolean {
  for (let parent = node.parentNode; parent; parent = parent.parentNode) {
    if (parent.nodeType === 1 && (parent as Element).localName === "p") return parent === paragraph;
  }
  return false;
}

function carrierText(element: Element): string {
  if (element.localName === "tab" || element.localName === "br") return " ";
  return (element.textContent ?? "").replaceAll(" ", " ").replaceAll("\t", " ");
}

function textCarriers(paragraph: Element): Carrier[] {
  const records: Carrier[] = [];
  let offset = 0;
  const visit = (node: Node, run: Element | undefined): void => {
    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (child.nodeType !== 1) continue;
      const element = child as Element;
      if (!belongsToParagraph(element, paragraph)) continue;
      if (element.localName === "del" || element.localName === "delText") continue;
      const currentRun = element.localName === "r" ? element : run;
      if (currentRun && ["t", "tab", "br"].includes(element.localName)) {
        const text = carrierText(element);
        records.push({ element, run: currentRun, start: offset, end: offset + text.length, text });
        offset += text.length;
      } else {
        visit(element, currentRun);
      }
    }
  };
  visit(paragraph, undefined);
  return records;
}

function visibleText(paragraph: Element): string {
  return textCarriers(paragraph).map((carrier) => carrier.text).join("").replace(/\s+$/u, "");
}

function cloneRunProperties(run: Element, target: Element): void {
  const rPr = directChild(run, "rPr");
  if (rPr) target.appendChild(run.ownerDocument.importNode(rPr, true));
}

function splitRun(carrier: Carrier, offset: number): Boundary {
  const run = carrier.run;
  const parent = run.parentNode;
  if (!parent) throw new Error("Cannot split a detached Word run");
  const relative = offset - carrier.start;
  if (carrier.element.parentNode !== run || relative < 0 || relative > carrier.text.length) {
    return relative <= 0 ? { parent, before: run } : { parent, before: run.nextSibling };
  }

  const rPr = directChild(run, "rPr");
  let contentBefore = false;
  for (let child = run.firstChild; child && child !== carrier.element; child = child.nextSibling) {
    if (child !== rPr) contentBefore = true;
  }
  const contentAfter = carrier.element.nextSibling !== null;
  if (relative === 0 && !contentBefore) return { parent, before: run };
  if (relative === carrier.text.length && !contentAfter) return { parent, before: run.nextSibling };

  const suffixRun = createWordElement(run.ownerDocument, "r");
  cloneRunProperties(run, suffixRun);
  if (relative > 0 && relative < carrier.text.length && carrier.element.localName === "t") {
    const suffixText = carrier.element.cloneNode(false) as Element;
    suffixText.setAttributeNS(XML_NS, "xml:space", "preserve");
    suffixText.appendChild(run.ownerDocument.createTextNode(carrier.text.slice(relative)));
    carrier.element.textContent = carrier.text.slice(0, relative);
    carrier.element.setAttributeNS(XML_NS, "xml:space", "preserve");
    suffixRun.appendChild(suffixText);
    for (let sibling = carrier.element.nextSibling; sibling; ) {
      const next = sibling.nextSibling;
      suffixRun.appendChild(sibling);
      sibling = next;
    }
  } else {
    let sibling: Node | null = relative === 0 ? carrier.element : carrier.element.nextSibling;
    while (sibling) {
      const next = sibling.nextSibling;
      suffixRun.appendChild(sibling);
      sibling = next;
    }
  }
  parent.insertBefore(suffixRun, run.nextSibling);
  return { parent, before: suffixRun };
}

function paragraphBoundary(paragraph: Element, offset: number): Boundary {
  const carriers = textCarriers(paragraph);
  const match = carriers.find((carrier) => offset >= carrier.start && offset <= carrier.end);
  if (match) return splitRun(match, offset);
  const pPr = directChild(paragraph, "pPr");
  if (offset <= 0) return { parent: paragraph, before: pPr?.nextSibling ?? paragraph.firstChild };
  return { parent: paragraph, before: null };
}

function insertAt(boundary: Boundary, node: Node): void {
  boundary.parent.insertBefore(node, boundary.before);
}

function commentMarker(document: Document, name: "commentRangeStart" | "commentRangeEnd", id: number): Element {
  const marker = createWordElement(document, name);
  setWordAttribute(marker, "id", String(id));
  return marker;
}

function commentReference(document: Document, id: number): Element {
  const run = createWordElement(document, "r");
  const rPr = createWordElement(document, "rPr");
  const style = createWordElement(document, "rStyle");
  setWordAttribute(style, "val", "CommentReference");
  rPr.appendChild(style);
  run.appendChild(rPr);
  const reference = createWordElement(document, "commentReference");
  setWordAttribute(reference, "id", String(id));
  run.appendChild(reference);
  return run;
}

/** Add comment markers at exact source offsets without recreating surrounding OOXML. */
export function addComments(paragraph: Element, comments: AssignedComment[]): void {
  const text = visibleText(paragraph);
  for (const assigned of comments) {
    const anchor = assigned.comment.anchorText;
    const start = anchor === undefined ? 0 : text.indexOf(anchor);
    const end = anchor === undefined ? text.length : start + anchor.length;
    const endBoundary = paragraphBoundary(paragraph, end);
    insertAt(endBoundary, commentMarker(paragraph.ownerDocument, "commentRangeEnd", assigned.id));
    insertAt(endBoundary, commentReference(paragraph.ownerDocument, assigned.id));
    insertAt(paragraphBoundary(paragraph, start), commentMarker(paragraph.ownerDocument, "commentRangeStart", assigned.id));
  }
}

function formatAt(paragraph: Element, offset: number): Element | undefined {
  const carriers = textCarriers(paragraph);
  const carrier = carriers.find((item) => item.start <= offset && item.end > offset) ?? carriers.at(-1);
  if (!carrier) return undefined;
  return directChild(carrier.run, "rPr")?.cloneNode(true) as Element | undefined;
}

function replaceTextElement(element: Element): void {
  if (element.localName === "t") {
    const replacement = createWordElement(element.ownerDocument, "delText");
    replacement.setAttributeNS(XML_NS, "xml:space", "preserve");
    replacement.appendChild(element.ownerDocument.createTextNode(sanitizeXmlText(element.textContent ?? "")));
    element.parentNode?.replaceChild(replacement, element);
  } else if (element.localName === "tab" || element.localName === "br") {
    const replacement = createWordElement(element.ownerDocument, "delText");
    replacement.setAttributeNS(XML_NS, "xml:space", "preserve");
    replacement.appendChild(element.ownerDocument.createTextNode(" "));
    element.parentNode?.replaceChild(replacement, element);
  }
}

function deleteRange(
  paragraph: Element,
  start: number,
  end: number,
  allocator: IdAllocator,
  author: string,
  date: string,
): number {
  if (start >= end) return 0;
  paragraphBoundary(paragraph, end);
  paragraphBoundary(paragraph, start);
  const runs = new Set(
    textCarriers(paragraph)
      .filter((carrier) => carrier.start >= start && carrier.end <= end && carrier.end > carrier.start)
      .map((carrier) => carrier.run),
  );
  let count = 0;
  for (const run of runs) {
    if (hasAncestor(run, paragraph, "del")) continue;
    if (hasAncestor(run, paragraph, "ins")) {
      throw new Error("Cannot replace text inside a pre-existing tracked insertion");
    }
    for (const name of ["t", "tab", "br"] as const) {
      for (const element of elementsByLocalName(run, name)) replaceTextElement(element);
    }
    const parent = run.parentNode;
    if (!parent) continue;
    const next = run.nextSibling;
    const wrapper = trackedWrapper(paragraph.ownerDocument, "del", run, allocator, author, date);
    parent.insertBefore(wrapper, next);
    count += 1;
  }
  return count;
}

interface EditAction {
  position: number;
  end?: number;
  text?: string;
}

function replaceRange(
  paragraph: Element,
  start: number,
  oldText: string,
  newText: string,
  allocator: IdAllocator,
  author: string,
  date: string,
): { insertions: number; deletions: number } {
  const style = formatAt(paragraph, start);
  const actions: EditAction[] = [];
  let cursor = start;
  for (const segment of wordDiff(oldText, newText)) {
    if (segment.type === "equal") cursor += segment.text.length;
    else if (segment.type === "delete") {
      actions.push({ position: cursor, end: cursor + segment.text.length });
      cursor += segment.text.length;
    } else actions.push({ position: cursor, text: segment.text });
  }
  actions.sort((left, right) => right.position - left.position);
  let insertions = 0;
  let deletions = 0;
  for (const action of actions) {
    if (action.end !== undefined) {
      deletions += deleteRange(paragraph, action.position, action.end, allocator, author, date);
    } else if (action.text !== undefined && action.text.length > 0) {
      const run = newRun(paragraph.ownerDocument, action.text, style, false);
      insertAt(
        paragraphBoundary(paragraph, action.position),
        trackedWrapper(paragraph.ownerDocument, "ins", run, allocator, author, date),
      );
      insertions += 1;
    }
  }
  return { insertions, deletions };
}

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

/** Surgically redline only intersecting runs; unrelated paragraph children retain identity and order. */
export function rewriteParagraph(
  paragraph: Element,
  replacements: Extract<RedlineOp, { kind: "replace" }>[],
  deleteParagraph: boolean,
  comments: AssignedComment[],
  allocator: IdAllocator,
  author: string,
  date: string,
): AppliedCounts {
  const source = visibleText(paragraph);
  addComments(paragraph, comments);
  let insertions = 0;
  let deletions = 0;
  if (deleteParagraph) {
    deletions = deleteRange(paragraph, 0, source.length, allocator, author, date);
    ensureParagraphMarkChange(paragraph, "del", allocator, author, date);
  } else {
    const ranges = replacements
      .map((op) => ({ op, start: source.indexOf(op.oldText) }))
      .sort((left, right) => right.start - left.start);
    for (let index = 1; index < ranges.length; index += 1) {
      const later = ranges[index - 1];
      const current = ranges[index];
      if (current.start + current.op.oldText.length > later.start) {
        throw new Error("overlapping replace operations in the same paragraph");
      }
    }
    for (const range of ranges) {
      const counts = replaceRange(paragraph, range.start, range.op.oldText, range.op.newText, allocator, author, date);
      insertions += counts.insertions;
      deletions += counts.deletions;
    }
  }
  return { insertions, deletions, comments: comments.length };
}
