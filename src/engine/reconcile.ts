import type { DocumentModel, RedlineOp } from "./types";

export interface DroppedOp {
  op: RedlineOp;
  reason: string;
}

export interface ReconcileResult {
  ops: RedlineOp[];
  dropped: DroppedOp[];
}

/**
 * Reconcile operations contributed by several findings before they are applied together.
 * Ops are honoured in the order given (callers pass findings in severity order), so the first
 * finding wins a conflict. Rules: a `delete_paragraph` supersedes every `replace` on that paragraph;
 * duplicate deletes/insertions collapse; a `replace` whose anchor overlaps an earlier replace in the
 * same paragraph is dropped. Dropped ops are returned with a reason for the audit trail.
 */
export function reconcileOps(doc: DocumentModel, ops: RedlineOp[]): ReconcileResult {
  const paragraphText = new Map(doc.paragraphs.map((paragraph) => [paragraph.id, paragraph.text]));
  const deleted = new Set<string>();
  for (const op of ops) if (op.kind === "delete_paragraph") deleted.add(op.paragraphId);
  const kept: RedlineOp[] = [];
  const dropped: DroppedOp[] = [];
  const seenDelete = new Set<string>();
  const seenInsert = new Set<string>();
  const ranges = new Map<string, Array<[number, number]>>();
  for (const op of ops) {
    if (op.kind === "delete_paragraph") {
      if (seenDelete.has(op.paragraphId)) {
        dropped.push({ op, reason: `duplicate deletion of ${op.paragraphId}` });
        continue;
      }
      seenDelete.add(op.paragraphId);
      kept.push(op);
      continue;
    }
    if (op.kind === "replace") {
      if (deleted.has(op.paragraphId)) {
        dropped.push({ op, reason: `${op.paragraphId} is deleted by another finding` });
        continue;
      }
      const text = paragraphText.get(op.paragraphId) ?? "";
      const start = text.indexOf(op.oldText);
      const end = start + op.oldText.length;
      const list = ranges.get(op.paragraphId) ?? [];
      if (start >= 0 && list.some(([s, e]) => start < e && s < end)) {
        dropped.push({ op, reason: `overlaps an earlier edit in ${op.paragraphId}` });
        continue;
      }
      list.push([start, end]);
      ranges.set(op.paragraphId, list);
      kept.push(op);
      continue;
    }
    const key = `${op.paragraphId}|${op.text}`;
    if (seenInsert.has(key)) {
      dropped.push({ op, reason: `duplicate insertion after ${op.paragraphId}` });
      continue;
    }
    seenInsert.add(key);
    kept.push(op);
  }
  return { ops: kept, dropped };
}
