import type { MappedParagraph } from "./paragraph-map";
import type { DocumentModel } from "./types";
import { directChild, wordAttribute } from "./xml";

export interface InsertionSpan {
  id: string;
  start: number;
  end: number;
  author: string;
  engineOwned: boolean;
}

const contexts = new WeakMap<DocumentModel, Map<string, InsertionSpan[]>>();

function textValue(element: Element): string {
  if (element.localName === "tab" || element.localName === "br") return " ";
  return (element.textContent ?? "").replaceAll(" ", " ").replaceAll("\t", " ");
}

function paragraphSpans(mapped: MappedParagraph): InsertionSpan[] {
  const wrappers = new Map<Element, InsertionSpan>();
  const pPr = directChild(mapped.node, "pPr");
  const rPr = pPr && directChild(pPr, "rPr");
  const paragraphRevision = rPr && directChild(rPr, "ins");
  const engineAuthor = paragraphRevision && wordAttribute(paragraphRevision, "author");
  let offset = 0;
  const visit = (node: Node, insertion: Element | undefined): void => {
    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (child.nodeType !== 1) continue;
      const element = child as Element;
      if (element.localName === "p" && element !== mapped.node) continue;
      if (element.localName === "del" || element.localName === "delText") continue;
      const current = element.localName === "ins" ? element : insertion;
      if (["t", "tab", "br"].includes(element.localName)) {
        const length = textValue(element).length;
        if (current && length > 0) {
          const existing = wrappers.get(current);
          if (existing) existing.end = offset + length;
          else {
            const author = wordAttribute(current, "author") ?? "unknown author";
            wrappers.set(current, {
              id: wordAttribute(current, "id") ?? "<missing>",
              start: offset,
              end: offset + length,
              author,
              engineOwned: mapped.inserted && author === engineAuthor,
            });
          }
        }
        offset += length;
      } else {
        visit(element, current);
      }
    }
  };
  visit(mapped.node, undefined);
  return [...wrappers.values()];
}

/** Attach private tracked-insertion spans to a parsed model without changing its public shape. */
export function registerRevisionContext(
  doc: DocumentModel,
  paragraphs: MappedParagraph[],
): void {
  contexts.set(
    doc,
    new Map(paragraphs.map((mapped) => [mapped.id, paragraphSpans(mapped)])),
  );
}

/** Return insertion revisions intersecting a source-text range. */
export function insertionSpans(
  doc: DocumentModel,
  paragraphId: string,
  start: number,
  end: number,
): InsertionSpan[] {
  return (contexts.get(doc)?.get(paragraphId) ?? []).filter(
    (span) => span.start < end && span.end > start,
  );
}
