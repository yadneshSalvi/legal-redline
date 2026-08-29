import { diffWords } from "diff";
import type { DiffWordsOptionsNonabortable } from "diff";

import type { DiffSegment, DocumentModel, RedlineOp } from "./types";

function isShortBridge(segment: DiffSegment): boolean {
  if (segment.type !== "equal") return false;
  const words = segment.text.trim().split(/\s+/u).filter(Boolean).length;
  return segment.text.length <= 12 || words <= 2;
}

function collapseGroup(group: DiffSegment[]): DiffSegment[] {
  const deleted = group
    .filter((segment) => segment.type !== "insert")
    .map((segment) => segment.text)
    .join("");
  const inserted = group
    .filter((segment) => segment.type !== "delete")
    .map((segment) => segment.text)
    .join("");
  return [
    ...(deleted ? [{ type: "delete" as const, text: deleted }] : []),
    ...(inserted ? [{ type: "insert" as const, text: inserted }] : []),
  ];
}

function groupDenseChanges(segments: DiffSegment[]): DiffSegment[] {
  const result: DiffSegment[] = [];
  let index = 0;
  while (index < segments.length) {
    if (segments[index].type === "equal") {
      result.push(segments[index]);
      index += 1;
      continue;
    }
    const group: DiffSegment[] = [segments[index]];
    index += 1;
    while (index < segments.length) {
      if (segments[index].type !== "equal") {
        group.push(segments[index]);
        index += 1;
        continue;
      }
      if (
        isShortBridge(segments[index]) &&
        index + 1 < segments.length &&
        segments[index + 1].type !== "equal"
      ) {
        group.push(segments[index], segments[index + 1]);
        index += 2;
        continue;
      }
      break;
    }
    result.push(...collapseGroup(group));
  }
  return result;
}

/** Produce a word-level edit script whose equal/delete and equal/insert sides reconstruct the inputs. */
export function wordDiff(oldText: string, newText: string): DiffSegment[] {
  const options = { ignoreWhitespace: false } as DiffWordsOptionsNonabortable;
  const segments: DiffSegment[] = diffWords(oldText, newText, options)
    .filter((change) => change.value.length > 0)
    .map((change) => ({
      type: change.added ? "insert" : change.removed ? "delete" : "equal",
      text: change.value,
    }));
  return groupDenseChanges(segments);
}

/** Render all valid replacements for one paragraph as a single word-level preview. */
export function renderParagraph(
  doc: DocumentModel,
  paragraphId: string,
  ops: RedlineOp[],
): DiffSegment[] {
  const paragraph = doc.paragraphs.find((candidate) => candidate.id === paragraphId);
  if (!paragraph) throw new Error(`paragraph ${paragraphId} not found`);
  const replacements = ops
    .filter(
      (op): op is Extract<RedlineOp, { kind: "replace" }> =>
        op.kind === "replace" && op.paragraphId === paragraphId,
    )
    .map((op) => ({ op, start: paragraph.text.indexOf(op.oldText) }))
    .filter(({ start }) => start >= 0)
    .sort((left, right) => right.start - left.start);
  const deleted = ops.some(
    (op) => op.kind === "delete_paragraph" && op.paragraphId === paragraphId,
  );
  if (deleted) return paragraph.text ? [{ type: "delete", text: paragraph.text }] : [];

  let rendered = paragraph.text;
  for (const { op, start } of replacements) {
    rendered = rendered.slice(0, start) + op.newText + rendered.slice(start + op.oldText.length);
  }
  return wordDiff(paragraph.text, rendered);
}
