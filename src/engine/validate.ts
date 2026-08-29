import { wordDiff } from "./diff";
import { auditDocx, preservationStructures } from "./docx-audit";
import type { DocxAudit, RevisionAudit } from "./docx-audit";
import { parseDocx } from "./docx-read";
import { validateWithLibreOffice } from "./libreoffice";
import { insertedParagraphText } from "./redline-insert";
import { isRfc3339DateTime } from "./revision-meta";
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
import { sanitizeXmlText } from "./xml";

function occurrences(text: string, anchor: string): number {
  if (anchor.length === 0) return 0;
  let count = 0;
  let offset = 0;
  while (offset <= text.length - anchor.length) {
    const found = text.indexOf(anchor, offset);
    if (found < 0) break;
    count += 1;
    offset = found + 1;
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
    result =
      result.slice(0, start) +
      sanitizeXmlText(op.newText) +
      result.slice(start + op.oldText.length);
  }
  return result;
}

function revisionKey(revision: RevisionAudit): string {
  return `${revision.kind}:${revision.id ?? "<missing>"}`;
}

function exactCommentAnchor(audit: DocxAudit, id: string): boolean {
  return (
    audit.commentStarts.get(id) === 1 &&
    audit.commentEnds.get(id) === 1 &&
    audit.commentReferences.get(id) === 1
  );
}

function validatePackageAudits(
  original: DocxAudit,
  redlined: DocxAudit,
  req: ApplyRequest,
  errors: string[],
): void {
  const ids = redlined.revisions.map((revision) => revision.id);
  if (ids.some((id) => id === undefined || id === "")) {
    errors.push("every w:ins, w:del, and comment must carry a w:id");
  }
  const duplicate = ids.find((id, index) => id !== undefined && ids.indexOf(id) !== index);
  if (duplicate !== undefined) errors.push(`duplicate revision/comment w:id ${duplicate}`);

  const originalByKey = new Map(original.revisions.map((revision) => [revisionKey(revision), revision]));
  const redlinedByKey = new Map(redlined.revisions.map((revision) => [revisionKey(revision), revision]));
  for (const prior of original.revisions) {
    const preserved = redlinedByKey.get(revisionKey(prior));
    if (!preserved) errors.push(`prior revision ${revisionKey(prior)} is missing`);
    else if (preserved.content !== prior.content) {
      errors.push(`prior revision ${revisionKey(prior)} content changed`);
    } else if (preserved.author !== prior.author || preserved.date !== prior.date) {
      errors.push(`prior revision ${revisionKey(prior)} metadata changed`);
    }
  }

  const expectedAuthor = sanitizeXmlText(req.author);
  for (const revision of redlined.revisions) {
    if (originalByKey.has(revisionKey(revision))) continue;
    if (revision.author !== expectedAuthor) {
      errors.push(`new ${revision.kind} ${revision.id ?? "<missing>"} has author "${revision.author ?? ""}", expected "${expectedAuthor}"`);
    }
    if (!revision.date || !isRfc3339DateTime(revision.date)) {
      errors.push(`new ${revision.kind} ${revision.id ?? "<missing>"} has a missing or invalid RFC 3339 date`);
    } else if (req.date && revision.date !== req.date) {
      errors.push(`new ${revision.kind} ${revision.id ?? "<missing>"} has date "${revision.date}", expected "${req.date}"`);
    }
  }

  const expectedComments = original.comments + req.comments.length;
  if (redlined.comments !== expectedComments) {
    errors.push(`expected ${req.comments.length} new comments but found ${redlined.comments - original.comments}`);
  }
  const commentIds = redlined.revisions
    .filter((revision) => revision.kind === "comment")
    .map((revision) => revision.id ?? "");
  for (const id of commentIds) {
    if (!exactCommentAnchor(redlined, id)) {
      errors.push(`comment ${id || "<missing>"} must have exactly one range start, range end, and reference`);
    }
  }
  const definitionIds = new Set(commentIds);
  for (const [kind, counts] of [
    ["range start", redlined.commentStarts],
    ["range end", redlined.commentEnds],
    ["reference", redlined.commentReferences],
  ] as const) {
    for (const id of counts.keys()) {
      if (!definitionIds.has(id)) errors.push(`orphan comment ${kind} for id ${id || "<missing>"}`);
    }
  }
  if (req.comments.length > 0 && !redlined.commentsWired) {
    errors.push("comments.xml is not wired through content types and document relationships");
  }

  const insertedParagraphs = req.ops.filter((op) => op.kind === "insert_after").length;
  for (const name of preservationStructures()) {
    const expected =
      name === "bookmarkStart" || name === "bookmarkEnd"
        ? original.structures[name] + insertedParagraphs
        : original.structures[name];
    if (redlined.structures[name] !== expected) {
      errors.push(`structural change: ${name} count ${original.structures[name]} -> ${redlined.structures[name]} (expected ${expected})`);
    }
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
      auditDocx(original),
      auditDocx(redlined),
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
      const canFallback =
        comment.anchorText !== undefined &&
        comment.anchorText.length > 0 &&
        (validation.occurrences === 0 || (validation.occurrences ?? 0) > 1);
      if (!validation.ok && !canFallback) errors.push(`invalid requested comment: ${validation.error}`);
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
    for (const paragraph of originalDoc.paragraphs) {
      const match = /^(.*)\.(\d+)$/.exec(paragraph.id);
      if (match) {
        insertionOrdinal.set(
          match[1],
          Math.max(insertionOrdinal.get(match[1]) ?? 0, Number(match[2])),
        );
      }
    }
    for (const op of req.ops) {
      if (op.kind !== "insert_after") continue;
      const ordinal = (insertionOrdinal.get(op.paragraphId) ?? 0) + 1;
      insertionOrdinal.set(op.paragraphId, ordinal);
      const inserted = redlinedById.get(`${op.paragraphId}.${ordinal}`);
      const expected = sanitizeXmlText(insertedParagraphText(op));
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
    validatePackageAudits(originalCounts, redlinedCounts, req, errors);
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
