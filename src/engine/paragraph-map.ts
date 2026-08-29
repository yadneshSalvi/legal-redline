import { elementsByLocalName, wordAttribute } from "./xml";

export interface MappedParagraph {
  id: string;
  node: Element;
  index: number;
  inserted: boolean;
}

/** Recover the stable subordinate id carried by a Playbook Redliner bookmark. */
export function insertedParagraphId(paragraph: Element): string | undefined {
  for (const bookmark of elementsByLocalName(paragraph, "bookmarkStart")) {
    let owner: Node | null = bookmark.parentNode;
    while (owner && !(owner.nodeType === 1 && (owner as Element).localName === "p")) {
      owner = owner.parentNode;
    }
    if (owner !== paragraph) continue;
    const name = wordAttribute(bookmark, "name");
    const match = /^_PlaybookRedliner_(p\d{4}(?:_\d+)+)$/.exec(name ?? "");
    if (match) return match[1].replaceAll("_", ".");
  }
  return undefined;
}

/** Map stable ids directly to body paragraph elements while inserted paragraphs do not shift originals. */
export function mapBodyParagraphs(document: Document): MappedParagraph[] {
  const body = elementsByLocalName(document, "body")[0];
  if (!body) return [];
  let originalIndex = 0;
  return elementsByLocalName(body, "p").map((node) => {
    const insertedId = insertedParagraphId(node);
    if (insertedId) return { id: insertedId, node, index: originalIndex, inserted: true };
    const id = `p${String(originalIndex).padStart(4, "0")}`;
    const mapped = { id, node, index: originalIndex, inserted: false };
    originalIndex += 1;
    return mapped;
  });
}
