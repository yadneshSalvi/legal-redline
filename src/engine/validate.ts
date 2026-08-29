import { wordDiff } from "./diff";
import { auditCommentPlacements } from "./comment-placement";
import { auditDocx } from "./docx-audit";
import type { DocxAudit } from "./docx-audit";
import { parseDocx } from "./docx-read";
import { validateWithLibreOffice } from "./libreoffice";
import { revisionKey, validatePackageAudits } from "./package-validation";
import { insertedParagraphText } from "./redline-insert";
import { insertionSpans } from "./revision-context";
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
  if (op.kind === "replace") {
    const validation = validateAnchor(doc, op.paragraphId, op.oldText, "oldText");
    if (!validation.ok) return validation;
    const paragraph = doc.paragraphs.find(({ id }) => id === op.paragraphId);
    const start = paragraph?.text.indexOf(op.oldText) ?? -1;
    const foreign = insertionSpans(
      doc,
      op.paragraphId,
      start,
      start + op.oldText.length,
    ).find((span) => !span.engineOwned);
    if (foreign) {
      return {
        ok: false,
        error: `anchor overlaps an existing tracked insertion by ${foreign.author}; accept or reject that change first`,
        occurrences: 1,
      };
    }
    return validation;
  }
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

function requiredChangeKinds(req: ApplyRequest, doc: DocumentModel): { insertion: boolean; deletion: boolean } {
  let insertion = req.ops.some((op) => op.kind === "insert_after");
  let deletion = req.ops.some((op) => op.kind === "delete_paragraph");
  for (const op of req.ops) {
    if (op.kind !== "replace") continue;
    const paragraph = doc.paragraphs.find(({ id }) => id === op.paragraphId);
    const start = paragraph?.text.indexOf(op.oldText) ?? -1;
    const end = start + op.oldText.length;
    const ownSpans = insertionSpans(doc, op.paragraphId, start, end)
      .filter((span) => span.author === sanitizeXmlText(req.author))
      .sort((left, right) => left.start - right.start);
    let coveredThrough = start;
    for (const span of ownSpans) {
      if (span.start > coveredThrough) break;
      coveredThrough = Math.max(coveredThrough, span.end);
    }
    if (coveredThrough >= end) {
      continue;
    }
    const diff = wordDiff(op.oldText, op.newText);
    insertion ||= diff.some((segment) => segment.type === "insert");
    deletion ||= diff.some((segment) => segment.type === "delete");
  }
  return { insertion, deletion };
}

function reconciledInsertionKeys(doc: DocumentModel, req: ApplyRequest): Set<string> {
  const keys = new Set<string>();
  const author = sanitizeXmlText(req.author);
  for (const op of req.ops) {
    if (op.kind !== "replace") continue;
    const paragraph = doc.paragraphs.find(({ id }) => id === op.paragraphId);
    const start = paragraph?.text.indexOf(op.oldText) ?? -1;
    for (const span of insertionSpans(doc, op.paragraphId, start, start + op.oldText.length)) {
      if (span.author === author) keys.add(`ins:${span.id}`);
    }
  }
  return keys;
}

async function validateCommentPlacement(
  redlined: Uint8Array,
  originalAudit: DocxAudit,
  redlinedAudit: DocxAudit,
  originalDoc: DocumentModel,
  req: ApplyRequest,
  errors: string[],
): Promise<void> {
  const originalKeys = new Set(originalAudit.revisions.map(revisionKey));
  const newComments = redlinedAudit.revisions.filter(
    (revision) => revision.kind === "comment" && !originalKeys.has(revisionKey(revision)),
  );
  const projection = await auditCommentPlacements(redlined, originalKeys);
  for (const [index, comment] of req.comments.entries()) {
    const audited = newComments[index];
    if (!audited?.id) continue;
    const placement = projection.placements.get(audited.id);
    if (!placement || placement.starts.length !== 1 || placement.ends.length !== 1 || placement.references.length !== 1) {
      errors.push(`comment ${audited.id} markers could not be resolved to one source-view range and reference`);
      continue;
    }
    const start = placement.starts[0];
    const end = placement.ends[0];
    const reference = placement.references[0];
    const locations = new Set([start.paragraphId, end.paragraphId, reference.paragraphId]);
    if (locations.size !== 1 || !locations.has(comment.paragraphId)) {
      errors.push(
        `comment ${audited.id} markers are in ${[...locations].join(", ")}, expected ${comment.paragraphId}`,
      );
      continue;
    }
    const paragraph = originalDoc.paragraphs.find(({ id }) => id === comment.paragraphId);
    if (!paragraph) continue;
    const validation = validateComment(originalDoc, comment);
    const expectedAnchor = validation.ok && comment.anchorText !== undefined
      ? comment.anchorText
      : paragraph.text;
    const expectedStart = validation.ok && comment.anchorText !== undefined
      ? paragraph.text.indexOf(comment.anchorText)
      : 0;
    const projected = projection.textByParagraph.get(comment.paragraphId) ?? "";
    const enclosed = start.offset <= end.offset ? projected.slice(start.offset, end.offset) : "";
    if (
      start.offset !== expectedStart ||
      end.offset !== expectedStart + expectedAnchor.length ||
      enclosed !== expectedAnchor
    ) {
      errors.push(
        `comment ${audited.id} range encloses "${nearestText(enclosed)}", expected "${nearestText(expectedAnchor)}" in ${comment.paragraphId}`,
      );
    }
  }
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
      const replace = op.kind === "replace" ? op : undefined;
      const start = replace
        ? originalDoc.paragraphs.find(({ id }) => id === replace.paragraphId)?.text.indexOf(replace.oldText) ?? -1
        : -1;
      const spans = replace && validation.occurrences === 1
        ? insertionSpans(originalDoc, replace.paragraphId, start, start + replace.oldText.length)
        : [];
      const conflict = spans.find((span) => span.author !== sanitizeXmlText(req.author));
      if (conflict) {
        errors.push(
          `invalid requested operation: anchor overlaps an existing tracked insertion by ${conflict.author}; accept or reject that change first`,
        );
      } else if (
        !validation.ok &&
        !validation.error?.startsWith("anchor overlaps an existing tracked insertion by ")
      ) {
        errors.push(`invalid requested operation: ${validation.error}`);
      }
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

    const required = requiredChangeKinds(req, originalDoc);
    if (required.insertion && redlinedCounts.insertions <= originalCounts.insertions) {
      errors.push("no new w:ins elements were found for insertion operations");
    }
    if (required.deletion && redlinedCounts.deletions <= originalCounts.deletions) {
      errors.push("no new w:del elements were found for deletion operations");
    }
    validatePackageAudits(
      originalCounts,
      redlinedCounts,
      req,
      errors,
      reconciledInsertionKeys(originalDoc, req),
    );
    await validateCommentPlacement(
      redlined,
      originalCounts,
      redlinedCounts,
      originalDoc,
      req,
      errors,
    );
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
