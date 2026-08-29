import JSZip from "jszip";

import type {
  ApplyRequest,
  ApplyResult,
  ParagraphChange,
  RedlineComment,
  RedlineOp,
} from "./types";
import { parseDocx } from "./docx-read";
import { mapBodyParagraphs } from "./paragraph-map";
import { isRfc3339DateTime } from "./revision-meta";
import { validateComment, validateOp } from "./validate";
import type { DocumentModel } from "./types";
import { addComments, rewriteParagraph } from "./redline-dom";
import type { AppliedCounts, AssignedComment, IdAllocator } from "./redline-dom";
import { insertTrackedParagraph } from "./redline-insert";
import {
  CONTENT_TYPES_NS,
  elementsByLocalName,
  OFFICE_REL_NS,
  parseXml,
  REL_NS,
  serializeXml,
  sanitizeXmlText,
  setWordAttribute,
  WORD_NS,
  XML_NS,
} from "./xml";

const FIXED_ZIP_DATE = new Date("2026-01-01T00:00:00.000Z");

function groupByParagraph<T extends { paragraphId: string }>(items: T[]): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const item of items) grouped.set(item.paragraphId, [...(grouped.get(item.paragraphId) ?? []), item]);
  return grouped;
}

async function initialId(zip: JSZip): Promise<number> {
  const entries = Object.values(zip.files).filter(
    (entry) => !entry.dir && entry.name.startsWith("word/") && entry.name.endsWith(".xml"),
  );
  let max = -1;
  for (const xml of await Promise.all(entries.map((entry) => entry.async("string")))) {
    for (const match of xml.matchAll(/\b(?:[\w.-]+:)?id=["'](\d+)["']/g)) {
      max = Math.max(max, Number(match[1]));
    }
  }
  return max + 1;
}

function commentsDocument(existing: string | undefined): Document {
  return existing
    ? parseXml(existing, "word/comments.xml")
    : parseXml(
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:comments xmlns:w="${WORD_NS}"/>`,
        "word/comments.xml",
      );
}

function appendCommentPart(
  comments: Document,
  assigned: AssignedComment,
  author: string,
  date: string,
): void {
  const root = comments.documentElement;
  const comment = comments.createElementNS(WORD_NS, "w:comment");
  setWordAttribute(comment, "id", String(assigned.id));
  setWordAttribute(comment, "author", sanitizeXmlText(author));
  setWordAttribute(comment, "date", date);
  setWordAttribute(comment, "initials", "PR");
  const paragraph = comments.createElementNS(WORD_NS, "w:p");
  const run = comments.createElementNS(WORD_NS, "w:r");
  const text = comments.createElementNS(WORD_NS, "w:t");
  text.setAttributeNS(XML_NS, "xml:space", "preserve");
  text.appendChild(comments.createTextNode(sanitizeXmlText(assigned.comment.text)));
  run.appendChild(text);
  paragraph.appendChild(run);
  comment.appendChild(paragraph);
  root.appendChild(comment);
}

function ensureCommentsContentType(xml: string): string {
  const document = parseXml(xml, "[Content_Types].xml");
  const exists = elementsByLocalName(document, "Override").some(
    (element) => element.getAttribute("PartName") === "/word/comments.xml",
  );
  if (!exists) {
    const override = document.createElementNS(CONTENT_TYPES_NS, "Override");
    override.setAttribute("PartName", "/word/comments.xml");
    override.setAttribute(
      "ContentType",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml",
    );
    document.documentElement.appendChild(override);
  }
  return serializeXml(document);
}

function ensureCommentsRelationship(xml: string | undefined): string {
  const document = xml
    ? parseXml(xml, "word/_rels/document.xml.rels")
    : parseXml(`<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="${REL_NS}"/>`, "document.xml.rels");
  const relationships = elementsByLocalName(document, "Relationship");
  if (!relationships.some((element) => element.getAttribute("Type") === `${OFFICE_REL_NS}/comments`)) {
    const ids = relationships
      .map((element) => /^rId(\d+)$/.exec(element.getAttribute("Id") ?? "")?.[1])
      .filter((value): value is string => value !== undefined)
      .map(Number);
    const relationship = document.createElementNS(REL_NS, "Relationship");
    relationship.setAttribute("Id", `rId${Math.max(0, ...ids) + 1}`);
    relationship.setAttribute("Type", `${OFFICE_REL_NS}/comments`);
    relationship.setAttribute("Target", "comments.xml");
    document.documentElement.appendChild(relationship);
  }
  return serializeXml(document);
}

function updateZipFile(zip: JSZip, path: string, content: string): void {
  zip.file(path, content, {
    date: FIXED_ZIP_DATE,
    createFolders: false,
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });
}

function validateRequest(doc: DocumentModel, req: ApplyRequest): void {
  const errors: string[] = [
    ...req.ops.map((op) => validateOp(doc, op).error),
  ].filter((error): error is string => error !== undefined);
  for (const comment of req.comments) {
    const validation = validateComment(doc, comment);
    const mayFallback =
      comment.anchorText !== undefined &&
      comment.anchorText.length > 0 &&
      (validation.occurrences === 0 || (validation.occurrences ?? 0) > 1);
    if (!validation.ok && !mayFallback && validation.error) errors.push(validation.error);
  }
  if (req.author.trim().length === 0) errors.push("tracked-change author must not be empty");
  if (req.date && !isRfc3339DateTime(req.date)) {
    errors.push("tracked-change date must be an RFC 3339 date-time (YYYY-MM-DDTHH:MM:SS(.sss)?Z or ±HH:MM)");
  }
  const byParagraph = groupByParagraph(req.ops);
  for (const [paragraphId, ops] of byParagraph) {
    if (ops.some((op) => op.kind === "delete_paragraph") && ops.some((op) => op.kind === "replace")) {
      errors.push(`cannot combine replace and delete_paragraph operations in ${paragraphId}`);
    }
  }
  if (errors.length > 0) throw new Error(`Cannot apply redlines:\n- ${errors.join("\n- ")}`);
}

function assignedComments(
  doc: DocumentModel,
  comments: RedlineComment[],
  allocator: IdAllocator,
  warnings: string[],
): AssignedComment[] {
  return comments.map((comment) => {
    const validation = validateComment(doc, comment);
    if (
      !validation.ok &&
      comment.anchorText !== undefined &&
      comment.anchorText.length > 0 &&
      (validation.occurrences === 0 || (validation.occurrences ?? 0) > 1)
    ) {
      warnings.push(
        validation.occurrences === 0
          ? `Comment anchor in ${comment.paragraphId} was not found; anchored to the whole paragraph`
          : `Comment anchor in ${comment.paragraphId} was ambiguous (${validation.occurrences} occurrences); anchored to the whole paragraph`,
      );
      return { comment: { ...comment, anchorText: undefined }, id: allocator.next() };
    }
    return { comment, id: allocator.next() };
  });
}

/** Apply native tracked changes; when date is omitted, the current time is used. Invalid ops throw. */
export async function applyRedlines(
  original: Uint8Array,
  doc: DocumentModel,
  req: ApplyRequest,
): Promise<ApplyResult> {
  validateRequest(doc, req);
  const sourceDoc = await parseDocx(original, doc.source.filename);
  const sourceById = new Map(sourceDoc.paragraphs.map((paragraph) => [paragraph.id, paragraph]));
  for (const paragraph of doc.paragraphs) {
    if (sourceById.get(paragraph.id)?.text !== paragraph.text) {
      throw new Error(`Document model does not match the source DOCX at ${paragraph.id}`);
    }
  }
  if (req.ops.length === 0 && req.comments.length === 0) {
    return { docx: original.slice(), applied: 0, changes: [], warnings: [] };
  }
  const zip = await JSZip.loadAsync(original);
  const documentEntry = zip.file("word/document.xml");
  if (!documentEntry) throw new Error("Invalid DOCX: word/document.xml is missing");
  const document = parseXml(await documentEntry.async("string"), "word/document.xml");
  const mappedNodes = mapBodyParagraphs(document);
  const nodeById = new Map(mappedNodes.map(({ id, node }) => [id, node]));
  if (nodeById.size < doc.paragraphs.length) {
    throw new Error("Document model does not match the source DOCX paragraph count");
  }

  let nextId = await initialId(zip);
  const allocator: IdAllocator = { next: () => nextId++ };
  const date = req.date ?? new Date().toISOString();
  const ops = groupByParagraph(req.ops);
  const warnings: string[] = [];
  const assigned = assignedComments(doc, req.comments, allocator, warnings);
  const comments = groupByParagraph(assigned.map((item) => ({ ...item, paragraphId: item.comment.paragraphId })));
  const changes = new Map<string, ParagraphChange>();

  for (const paragraph of doc.paragraphs) {
    const paragraphOps = ops.get(paragraph.id) ?? [];
    const paragraphComments = (comments.get(paragraph.id) ?? []).map(({ comment, id }) => ({ comment, id }));
    const replacements = paragraphOps.filter(
      (op): op is Extract<RedlineOp, { kind: "replace" }> => op.kind === "replace",
    );
    const deletion = paragraphOps.some((op) => op.kind === "delete_paragraph");
    if (replacements.length === 0 && !deletion && paragraphComments.length === 0) continue;
    const node = nodeById.get(paragraph.id);
    if (!node) throw new Error(`Source XML paragraph missing for ${paragraph.id}`);
    const wholeParagraphComments = paragraphComments.every(
      ({ comment }) => comment.anchorText === undefined,
    );
    let counts: AppliedCounts;
    if (replacements.length === 0 && !deletion && wholeParagraphComments) {
      addComments(node, paragraphComments);
      counts = { insertions: 0, deletions: 0, comments: paragraphComments.length };
    } else {
      counts = rewriteParagraph(
        node,
        replacements,
        deletion,
        paragraphComments,
        allocator,
        req.author,
        date,
      );
    }
    if (replacements.some((op) => op.oldText === op.newText)) warnings.push(`No-op replacement in ${paragraph.id}`);
    changes.set(paragraph.id, { paragraphId: paragraph.id, ...counts });
  }

  const lastInserted = new Map<string, Element>();
  const insertedCounts = new Map<string, number>();
  for (const mapped of mappedNodes) {
    const match = /^(.*)\.(\d+)$/.exec(mapped.id);
    if (!match) continue;
    const ordinal = Number(match[2]);
    if (ordinal > (insertedCounts.get(match[1]) ?? 0)) {
      insertedCounts.set(match[1], ordinal);
      lastInserted.set(match[1], mapped.node);
    }
  }
  for (const op of req.ops) {
    if (op.kind !== "insert_after") continue;
    const paragraph = doc.paragraphs.find((candidate) => candidate.id === op.paragraphId);
    if (!paragraph) continue;
    const sourceNode = nodeById.get(paragraph.id);
    if (!sourceNode) throw new Error(`Source XML paragraph missing for ${paragraph.id}`);
    const anchor = lastInserted.get(op.paragraphId) ?? sourceNode;
    const ordinal = (insertedCounts.get(op.paragraphId) ?? 0) + 1;
    insertedCounts.set(op.paragraphId, ordinal);
    const inserted = insertTrackedParagraph(
      sourceNode,
      op,
      `${op.paragraphId}.${ordinal}`,
      allocator,
      req.author,
      date,
    );
    anchor.parentNode?.insertBefore(inserted, anchor.nextSibling);
    lastInserted.set(op.paragraphId, inserted);
    const current = changes.get(op.paragraphId) ?? {
      paragraphId: op.paragraphId,
      insertions: 0,
      deletions: 0,
      comments: 0,
    };
    current.insertions += 1;
    changes.set(op.paragraphId, current);
  }

  updateZipFile(zip, "word/document.xml", serializeXml(document));
  if (assigned.length > 0) {
    const existingComments = await zip.file("word/comments.xml")?.async("string");
    const commentPart = commentsDocument(existingComments);
    for (const item of assigned) appendCommentPart(commentPart, item, req.author, date);
    const contentTypes = zip.file("[Content_Types].xml");
    if (!contentTypes) throw new Error("Invalid DOCX: [Content_Types].xml is missing");
    updateZipFile(
      zip,
      "[Content_Types].xml",
      ensureCommentsContentType(await contentTypes.async("string")),
    );
    updateZipFile(
      zip,
      "word/_rels/document.xml.rels",
      ensureCommentsRelationship(await zip.file("word/_rels/document.xml.rels")?.async("string")),
    );
    updateZipFile(zip, "word/comments.xml", serializeXml(commentPart));
  }

  const docx = await zip.generateAsync({
    type: "uint8array",
    platform: "DOS",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });
  return {
    docx,
    applied: req.ops.length,
    changes: [...changes.values()],
    warnings,
  };
}
