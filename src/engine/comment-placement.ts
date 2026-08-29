import JSZip from "jszip";

import { mapBodyParagraphs } from "./paragraph-map";
import { parseXml, wordAttribute } from "./xml";

export interface CommentMarkerPosition {
  paragraphId: string;
  offset: number;
}

export interface CommentPlacement {
  starts: CommentMarkerPosition[];
  ends: CommentMarkerPosition[];
  references: CommentMarkerPosition[];
}

export interface CommentPlacementAudit {
  placements: Map<string, CommentPlacement>;
  textByParagraph: Map<string, string>;
}

function placementFor(
  placements: Map<string, CommentPlacement>,
  id: string,
): CommentPlacement {
  const existing = placements.get(id);
  if (existing) return existing;
  const created = { starts: [], ends: [], references: [] };
  placements.set(id, created);
  return created;
}

function revisionKey(element: Element): string {
  return `${element.localName}:${wordAttribute(element, "id") ?? "<missing>"}`;
}

/** Project comment marker offsets onto the source view, retaining new deleted text and hiding new insertions. */
export async function auditCommentPlacements(
  bytes: Uint8Array,
  originalRevisionKeys: Set<string>,
): Promise<CommentPlacementAudit> {
  const zip = await JSZip.loadAsync(bytes);
  const xml = await zip.file("word/document.xml")?.async("string");
  if (!xml) throw new Error("Invalid DOCX: word/document.xml is missing");
  const document = parseXml(xml, "word/document.xml");
  const placements = new Map<string, CommentPlacement>();
  const textByParagraph = new Map<string, string>();

  for (const { id: paragraphId, node: paragraph } of mapBodyParagraphs(document)) {
    let text = "";
    const record = (element: Element, kind: keyof CommentPlacement): void => {
      const id = wordAttribute(element, "id") ?? "";
      placementFor(placements, id)[kind].push({ paragraphId, offset: text.length });
    };
    const visit = (node: Node, newDeletion: boolean): void => {
      for (let child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType !== 1) continue;
        const element = child as Element;
        if (element.localName === "p" && element !== paragraph) continue;
        if (element.localName === "commentRangeStart") record(element, "starts");
        else if (element.localName === "commentRangeEnd") record(element, "ends");
        else if (element.localName === "commentReference") record(element, "references");
        else if (element.localName === "ins") {
          if (originalRevisionKeys.has(revisionKey(element))) visit(element, false);
        } else if (element.localName === "del") {
          if (!originalRevisionKeys.has(revisionKey(element))) visit(element, true);
        } else if (
          (element.localName === "t" && !newDeletion) ||
          (element.localName === "delText" && newDeletion)
        ) {
          text += (element.textContent ?? "").replaceAll(" ", " ").replaceAll("\t", " ");
        } else if ((element.localName === "tab" || element.localName === "br") && !newDeletion) {
          text += " ";
        } else {
          visit(element, newDeletion);
        }
      }
    };
    visit(paragraph, false);
    textByParagraph.set(paragraphId, text.replace(/\s+$/u, ""));
  }
  return { placements, textByParagraph };
}
