import { execFile } from "node:child_process";
import { constants } from "node:fs";
import { access, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { promisify } from "node:util";

import JSZip from "jszip";

import { wordDiff } from "./diff";
import { parseDocx } from "./docx-read";
import { insertedParagraphText } from "./redline-insert";
import type {
  ApplyRequest,
  DocxValidationReport,
  DocumentModel,
  OpValidation,
  Paragraph,
  RedlineComment,
  RedlineOp,
  RunSpan,
} from "./types";
import { elementsByLocalName, OFFICE_REL_NS, parseXml, wordAttribute } from "./xml";

const execFileAsync = promisify(execFile);

function occurrences(text: string, anchor: string): number {
  if (anchor.length === 0) return 0;
  let count = 0;
  let offset = 0;
  while (offset <= text.length - anchor.length) {
    const found = text.indexOf(anchor, offset);
    if (found < 0) break;
    count += 1;
    offset = found + anchor.length;
  }
  return count;
}

function nearestText(text: string): string {
  const compact = text.replace(/\s+/g, " ").trim();
  return compact.length <= 160 ? compact : `${compact.slice(0, 157)}…`;
}

function validateAnchor(
  doc: DocumentModel,
  paragraphId: string,
  anchor: string,
  label: "oldText" | "anchorText",
): OpValidation {
  const paragraph = doc.paragraphs.find((candidate) => candidate.id === paragraphId);
  if (!paragraph) return { ok: false, error: `paragraph ${paragraphId} not found`, occurrences: 0 };
  if (anchor.length === 0) {
    return { ok: false, error: `${label} must not be empty in ${paragraphId}`, occurrences: 0 };
  }
  const count = occurrences(paragraph.text, anchor);
  if (count === 0) {
    return {
      ok: false,
      error: `${label} not found in ${paragraphId}; nearest text: "${nearestText(paragraph.text)}"`,
      occurrences: 0,
    };
  }
  if (count > 1) {
    return {
      ok: false,
      error: `${label} occurs ${count} times in ${paragraphId}; include more context`,
      occurrences: count,
    };
  }
  return { ok: true, occurrences: 1 };
}

/** Validate paragraph existence and the exactly-once verbatim anchor invariant for one operation. */
export function validateOp(doc: DocumentModel, op: RedlineOp): OpValidation {
  if (op.kind === "replace") return validateAnchor(doc, op.paragraphId, op.oldText, "oldText");
  const paragraph = doc.paragraphs.find((candidate) => candidate.id === op.paragraphId);
  if (!paragraph) return { ok: false, error: `paragraph ${op.paragraphId} not found`, occurrences: 0 };
  if (op.kind === "insert_after" && op.text.trim().length === 0) {
    return { ok: false, error: `inserted text must not be empty after ${op.paragraphId}`, occurrences: 0 };
  }
  return { ok: true };
}

/** Validate comment text and an optional exactly-once verbatim range anchor. */
export function validateComment(doc: DocumentModel, comment: RedlineComment): OpValidation {
  const paragraph = doc.paragraphs.find((candidate) => candidate.id === comment.paragraphId);
  if (!paragraph) {
    return { ok: false, error: `paragraph ${comment.paragraphId} not found`, occurrences: 0 };
  }
  if (comment.text.trim().length === 0) {
    return { ok: false, error: `comment text must not be empty in ${comment.paragraphId}` };
  }
  if (comment.anchorText === undefined) {
    if (paragraph.text.length === 0) {
      return { ok: false, error: `cannot anchor a comment to empty paragraph ${comment.paragraphId}` };
    }
    return { ok: true, occurrences: 1 };
  }
  return validateAnchor(doc, comment.paragraphId, comment.anchorText, "anchorText");
}

function normalizeRuns(runs: RunSpan[] | undefined): RunSpan[] {
  const normalized: RunSpan[] = [];
  for (const run of runs ?? []) {
    const properties = { bold: run.bold, italic: run.italic, underline: run.underline };
    const previous = normalized.at(-1);
    if (
      previous &&
      previous.bold === properties.bold &&
      previous.italic === properties.italic &&
      previous.underline === properties.underline
    ) {
      previous.text += run.text;
    } else {
      normalized.push({ text: run.text, ...properties });
    }
  }
  return normalized;
}

function paragraphEqual(left: Paragraph, right: Paragraph): boolean {
  return (
    left.text === right.text &&
    left.style === right.style &&
    left.numbering === right.numbering &&
    JSON.stringify(normalizeRuns(left.runs)) === JSON.stringify(normalizeRuns(right.runs))
  );
}

function expectedText(paragraph: Paragraph, ops: RedlineOp[]): string {
  if (ops.some((op) => op.kind === "delete_paragraph" && op.paragraphId === paragraph.id)) return "";
  let result = paragraph.text;
  const replacements = ops
    .filter(
      (op): op is Extract<RedlineOp, { kind: "replace" }> =>
        op.kind === "replace" && op.paragraphId === paragraph.id,
    )
    .map((op) => ({ op, start: paragraph.text.indexOf(op.oldText) }))
    .sort((left, right) => right.start - left.start);
  for (const { op, start } of replacements) {
    result = result.slice(0, start) + op.newText + result.slice(start + op.oldText.length);
  }
  return result;
}

async function partCounts(bytes: Uint8Array): Promise<{
  insertions: number;
  deletions: number;
  comments: number;
  commentStarts: number;
  commentEnds: number;
  commentReferences: number;
  commentsConsistent: boolean;
  commentsWired: boolean;
}> {
  const zip = await JSZip.loadAsync(bytes);
  const documentXml = await zip.file("word/document.xml")?.async("string");
  if (!documentXml) throw new Error("Invalid DOCX: word/document.xml is missing");
  const document = parseXml(documentXml, "word/document.xml");
  const commentsXml = await zip.file("word/comments.xml")?.async("string");
  const commentElements = commentsXml
    ? elementsByLocalName(parseXml(commentsXml, "word/comments.xml"), "comment")
    : [];
  const comments = commentElements.length;
  const starts = elementsByLocalName(document, "commentRangeStart");
  const ends = elementsByLocalName(document, "commentRangeEnd");
  const references = elementsByLocalName(document, "commentReference");
  const ids = (elements: Element[]): Set<string | undefined> =>
    new Set(elements.map((element) => wordAttribute(element, "id")));
  const definitionIds = ids(commentElements);
  const startIds = ids(starts);
  const endIds = ids(ends);
  const referenceIds = ids(references);
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
    insertions: elementsByLocalName(document, "ins").length,
    deletions: elementsByLocalName(document, "del").length,
    comments,
    commentStarts: starts.length,
    commentEnds: ends.length,
    commentReferences: references.length,
    commentsConsistent: [...definitionIds].every(
      (id) => id !== undefined && startIds.has(id) && endIds.has(id) && referenceIds.has(id),
    ),
    commentsWired: comments === 0 || (contentTypeWired && relationshipWired),
  };
}

async function libreOfficeExecutable(): Promise<string | undefined> {
  const macPath = "/Applications/LibreOffice.app/Contents/MacOS/soffice";
  try {
    await access(macPath, constants.X_OK);
    return macPath;
  } catch {
    try {
      await execFileAsync("soffice", ["--version"], { timeout: 5_000 });
      return "soffice";
    } catch {
      return undefined;
    }
  }
}

async function validateWithLibreOffice(bytes: Uint8Array): Promise<{
  attempted: boolean;
  ok: boolean;
  message?: string;
}> {
  const executable = await libreOfficeExecutable();
  if (!executable) return { attempted: false, ok: false, message: "LibreOffice soffice was not found" };
  const directory = await mkdtemp(join(tmpdir(), "playbook-redliner-"));
  const input = join(directory, "redlined.docx");
  try {
    await writeFile(input, bytes);
    const { stderr } = await execFileAsync(
      executable,
      ["--headless", "--convert-to", "pdf", "--outdir", directory, input],
      { timeout: 30_000 },
    );
    const pdf = join(directory, `${basename(input, ".docx")}.pdf`);
    await access(pdf, constants.R_OK);
    return { attempted: true, ok: true, ...(stderr.trim() ? { message: stderr.trim() } : {}) };
  } catch (error) {
    return {
      attempted: true,
      ok: false,
      message: error instanceof Error ? error.message : String(error),
    };
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

function requiredChangeKinds(req: ApplyRequest): { insertion: boolean; deletion: boolean } {
  let insertion = req.ops.some((op) => op.kind === "insert_after");
  let deletion = req.ops.some((op) => op.kind === "delete_paragraph");
  for (const op of req.ops) {
    if (op.kind !== "replace") continue;
    const diff = wordDiff(op.oldText, op.newText);
    insertion ||= diff.some((segment) => segment.type === "insert");
    deletion ||= diff.some((segment) => segment.type === "delete");
  }
  return { insertion, deletion };
}

/** Validate package wiring, tracked-change effects, paragraph integrity, and optional LibreOffice conversion. */
export async function validateDocx(
  original: Uint8Array,
  redlined: Uint8Array,
  req: ApplyRequest,
  opts: { libreoffice?: boolean } = {},
): Promise<DocxValidationReport> {
  const errors: string[] = [];
  let parsedParagraphs = 0;
  let trackedInsertions = 0;
  let trackedDeletions = 0;
  let comments = 0;
  const collateralParagraphIds: string[] = [];
  let libreoffice: DocxValidationReport["libreoffice"];

  try {
    const [originalDoc, redlinedDoc, originalCounts, redlinedCounts] = await Promise.all([
      parseDocx(original, "original.docx"),
      parseDocx(redlined, "redlined.docx"),
      partCounts(original),
      partCounts(redlined),
    ]);
    parsedParagraphs = redlinedDoc.paragraphs.length;
    trackedInsertions = redlinedCounts.insertions;
    trackedDeletions = redlinedCounts.deletions;
    comments = redlinedCounts.comments;
    for (const op of req.ops) {
      const validation = validateOp(originalDoc, op);
      if (!validation.ok) errors.push(`invalid requested operation: ${validation.error}`);
    }
    for (const comment of req.comments) {
      const validation = validateComment(originalDoc, comment);
      if (!validation.ok) errors.push(`invalid requested comment: ${validation.error}`);
    }
    const targets = new Set(req.ops.map((op) => op.paragraphId));
    const redlinedById = new Map(redlinedDoc.paragraphs.map((paragraph) => [paragraph.id, paragraph]));

    for (const paragraph of originalDoc.paragraphs) {
      const candidate = redlinedById.get(paragraph.id);
      if (!candidate) {
        errors.push(`original paragraph ${paragraph.id} is missing from the redlined document`);
        if (!targets.has(paragraph.id)) collateralParagraphIds.push(paragraph.id);
        continue;
      }
      if (!targets.has(paragraph.id) && !paragraphEqual(paragraph, candidate)) {
        collateralParagraphIds.push(paragraph.id);
      }
      if (targets.has(paragraph.id)) {
        const expected = expectedText(paragraph, req.ops);
        if (candidate.text !== expected) {
          errors.push(`redline result mismatch in ${paragraph.id}; expected "${nearestText(expected)}"`);
        }
      }
    }

    const insertionOrdinal = new Map<string, number>();
    for (const op of req.ops) {
      if (op.kind !== "insert_after") continue;
      const ordinal = (insertionOrdinal.get(op.paragraphId) ?? 0) + 1;
      insertionOrdinal.set(op.paragraphId, ordinal);
      const inserted = redlinedById.get(`${op.paragraphId}.${ordinal}`);
      const expected = insertedParagraphText(op);
      if (!inserted) errors.push(`inserted paragraph ${op.paragraphId}.${ordinal} is missing`);
      else if (inserted.text !== expected) errors.push(`inserted paragraph ${inserted.id} text does not match the request`);
    }

    const required = requiredChangeKinds(req);
    if (required.insertion && redlinedCounts.insertions <= originalCounts.insertions) {
      errors.push("no new w:ins elements were found for insertion operations");
    }
    if (required.deletion && redlinedCounts.deletions <= originalCounts.deletions) {
      errors.push("no new w:del elements were found for deletion operations");
    }
    if (redlinedCounts.comments < originalCounts.comments + req.comments.length) {
      errors.push(`expected ${req.comments.length} new comments but found ${redlinedCounts.comments - originalCounts.comments}`);
    }
    if (
      redlinedCounts.commentStarts < originalCounts.commentStarts + req.comments.length ||
      redlinedCounts.commentEnds < originalCounts.commentEnds + req.comments.length ||
      redlinedCounts.commentReferences < originalCounts.commentReferences + req.comments.length
    ) {
      errors.push("one or more comments are missing a range start, range end, or reference");
    }
    if (req.comments.length > 0 && !redlinedCounts.commentsWired) {
      errors.push("comments.xml is not wired through content types and document relationships");
    }
    if (req.comments.length > 0 && !redlinedCounts.commentsConsistent) {
      errors.push("one or more comment ids are not connected to matching ranges and references");
    }
    if (collateralParagraphIds.length > 0) {
      errors.push(`collateral paragraph changes: ${collateralParagraphIds.join(", ")}`);
    }
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }

  if (opts.libreoffice) {
    libreoffice = await validateWithLibreOffice(redlined);
    if (libreoffice.attempted && !libreoffice.ok) {
      errors.push(`LibreOffice validation failed: ${libreoffice.message ?? "unknown error"}`);
    }
  }
  return {
    ok: errors.length === 0,
    parsedParagraphs,
    trackedInsertions,
    trackedDeletions,
    comments,
    untouchedIdentical: collateralParagraphIds.length === 0,
    collateralParagraphIds,
    errors,
    ...(libreoffice ? { libreoffice } : {}),
  };
}
