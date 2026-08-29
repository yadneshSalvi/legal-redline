import { preservationStructures } from "./docx-audit";
import type { DocxAudit, RevisionAudit } from "./docx-audit";
import { isRfc3339DateTime } from "./revision-meta";
import type { ApplyRequest } from "./types";
import { sanitizeXmlText } from "./xml";

/** Form a stable key for comparing an audited revision across packages. */
export function revisionKey(revision: RevisionAudit): string {
  return `${revision.kind}:${revision.id ?? "<missing>"}`;
}

function exactCommentAnchor(audit: DocxAudit, id: string): boolean {
  return (
    audit.commentStarts.get(id) === 1 &&
    audit.commentEnds.get(id) === 1 &&
    audit.commentReferences.get(id) === 1
  );
}

/** Append metadata, identity, comment-wiring, and preservation failures to an error list. */
export function validatePackageAudits(
  original: DocxAudit,
  redlined: DocxAudit,
  req: ApplyRequest,
  errors: string[],
  reconciledInsertionKeys: ReadonlySet<string>,
): void {
  const ids = redlined.revisions.map((revision) => revision.id);
  if (ids.some((id) => id === undefined || id === "")) {
    errors.push("every w:ins, w:del, and comment must carry a w:id");
  }
  const duplicate = ids.find((id, index) => id !== undefined && ids.indexOf(id) !== index);
  if (duplicate !== undefined) errors.push(`duplicate revision/comment w:id ${duplicate}`);

  const originalByKey = new Map(original.revisions.map((revision) => [revisionKey(revision), revision]));
  const redlinedByKey = new Map(redlined.revisions.map((revision) => [revisionKey(revision), revision]));
  const expectedAuthor = sanitizeXmlText(req.author);
  const targets = new Set(req.ops.map((op) => op.paragraphId));
  for (const prior of original.revisions) {
    const preserved = redlinedByKey.get(revisionKey(prior));
    if (!preserved) errors.push(`prior revision ${revisionKey(prior)} is missing`);
    else {
      const reconciledOwnInsertion =
        prior.kind === "ins" &&
        prior.author === expectedAuthor &&
        prior.paragraphId !== undefined &&
        targets.has(prior.paragraphId) &&
        reconciledInsertionKeys.has(revisionKey(prior));
      if (preserved.content !== prior.content && !reconciledOwnInsertion) {
        errors.push(`prior revision ${revisionKey(prior)} content changed`);
      }
      if (preserved.author !== prior.author || preserved.date !== prior.date) {
        errors.push(`prior revision ${revisionKey(prior)} metadata changed`);
      }
    }
  }

  for (const revision of redlined.revisions) {
    if (originalByKey.has(revisionKey(revision))) continue;
    if (revision.author !== expectedAuthor) {
      errors.push(
        `new ${revision.kind} ${revision.id ?? "<missing>"} has author "${revision.author ?? ""}", expected "${expectedAuthor}"`,
      );
    }
    if (!revision.date || !isRfc3339DateTime(revision.date)) {
      errors.push(`new ${revision.kind} ${revision.id ?? "<missing>"} has a missing or invalid RFC 3339 date`);
    } else if (req.date && revision.date !== req.date) {
      errors.push(
        `new ${revision.kind} ${revision.id ?? "<missing>"} has date "${revision.date}", expected "${req.date}"`,
      );
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
      errors.push(
        `structural change: ${name} count ${original.structures[name]} -> ${redlined.structures[name]} (expected ${expected})`,
      );
    }
  }
}
