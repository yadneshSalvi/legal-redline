import JSZip from "jszip";

import { mapBodyParagraphs } from "./paragraph-map";
import { elementsByLocalName, OFFICE_REL_NS, parseXml, wordAttribute } from "./xml";

export interface RevisionAudit {
  kind: "ins" | "del" | "comment";
  id?: string;
  author?: string;
  date?: string;
  content: string;
  paragraphId?: string;
}

const STRUCTURES = [
  "bookmarkStart",
  "bookmarkEnd",
  "fldChar",
  "fldSimple",
  "instrText",
  "sdt",
  "hyperlink",
  "smartTag",
  "proofErr",
  "AlternateContent",
  "txbxContent",
] as const;

export interface DocxAudit {
  insertions: number;
  deletions: number;
  comments: number;
  revisions: RevisionAudit[];
  structures: Record<(typeof STRUCTURES)[number], number>;
  commentStarts: Map<string, number>;
  commentEnds: Map<string, number>;
  commentReferences: Map<string, number>;
  commentsWired: boolean;
}

function countIds(elements: Element[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const element of elements) {
    const id = wordAttribute(element, "id") ?? "";
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return counts;
}

function revisionContent(element: Element, kind: RevisionAudit["kind"]): string {
  if (kind === "del") {
    return elementsByLocalName(element, "delText").map((node) => node.textContent ?? "").join("");
  }
  return elementsByLocalName(element, "t").map((node) => node.textContent ?? "").join("");
}

function owningParagraphId(element: Element, ids: Map<Element, string>): string | undefined {
  for (let node: Node | null = element; node; node = node.parentNode) {
    if (node.nodeType === 1 && (node as Element).localName === "p") {
      return ids.get(node as Element);
    }
  }
  return undefined;
}

/** Inspect revision metadata, comment wiring, and preservation-sensitive main-part structures. */
export async function auditDocx(bytes: Uint8Array): Promise<DocxAudit> {
  const zip = await JSZip.loadAsync(bytes);
  const documentXml = await zip.file("word/document.xml")?.async("string");
  if (!documentXml) throw new Error("Invalid DOCX: word/document.xml is missing");
  const document = parseXml(documentXml, "word/document.xml");
  const paragraphIds = new Map(
    mapBodyParagraphs(document).map(({ id, node }) => [node, id]),
  );
  const commentsXml = await zip.file("word/comments.xml")?.async("string");
  const commentsDocument = commentsXml ? parseXml(commentsXml, "word/comments.xml") : undefined;
  const comments = commentsDocument ? elementsByLocalName(commentsDocument, "comment") : [];
  const insertions = elementsByLocalName(document, "ins");
  const deletions = elementsByLocalName(document, "del");
  const revisions: RevisionAudit[] = [
    ...insertions.map((element) => ({
      kind: "ins" as const,
      id: wordAttribute(element, "id"),
      author: wordAttribute(element, "author"),
      date: wordAttribute(element, "date"),
      content: revisionContent(element, "ins"),
      paragraphId: owningParagraphId(element, paragraphIds),
    })),
    ...deletions.map((element) => ({
      kind: "del" as const,
      id: wordAttribute(element, "id"),
      author: wordAttribute(element, "author"),
      date: wordAttribute(element, "date"),
      content: revisionContent(element, "del"),
      paragraphId: owningParagraphId(element, paragraphIds),
    })),
    ...comments.map((element) => ({
      kind: "comment" as const,
      id: wordAttribute(element, "id"),
      author: wordAttribute(element, "author"),
      date: wordAttribute(element, "date"),
      content: revisionContent(element, "comment"),
    })),
  ];
  const contentTypesXml = await zip.file("[Content_Types].xml")?.async("string");
  const relsXml = await zip.file("word/_rels/document.xml.rels")?.async("string");
  const contentTypeWired = contentTypesXml
    ? elementsByLocalName(parseXml(contentTypesXml, "[Content_Types].xml"), "Override").some(
        (element) => element.getAttribute("PartName") === "/word/comments.xml",
      )
    : false;
  const relationshipWired = relsXml
    ? elementsByLocalName(parseXml(relsXml, "document.xml.rels"), "Relationship").some(
        (element) => element.getAttribute("Type") === `${OFFICE_REL_NS}/comments`,
      )
    : false;
  return {
    insertions: insertions.length,
    deletions: deletions.length,
    comments: comments.length,
    revisions,
    structures: Object.fromEntries(
      STRUCTURES.map((name) => [name, elementsByLocalName(document, name).length]),
    ) as DocxAudit["structures"],
    commentStarts: countIds(elementsByLocalName(document, "commentRangeStart")),
    commentEnds: countIds(elementsByLocalName(document, "commentRangeEnd")),
    commentReferences: countIds(elementsByLocalName(document, "commentReference")),
    commentsWired: comments.length === 0 || (contentTypeWired && relationshipWired),
  };
}

/** Names of main-document structures that an edited paragraph must not lose. */
export function preservationStructures(): ReadonlyArray<keyof DocxAudit["structures"]> {
  return STRUCTURES;
}
