/**
 * Turns findings + human decisions into the segment stream the paper renders. Word-level, so a
 * rewritten sentence shows as the handful of words that actually changed (STYLE.md §2).
 */
import type { Decision, Finding } from "@/src/agent/types";
import { renderParagraph, wordDiff } from "@/src/engine/diff";
import type { DiffSegment, DocumentModel, Paragraph, RedlineOp } from "@/src/engine/types";

export type SegmentType = DiffSegment["type"];
export type Segment = DiffSegment;

export type ParagraphState = "clean" | "proposed" | "accepted" | "edited" | "rejected";

export interface ParagraphRender {
  /** Anchor id — `p0042` for original paragraphs, `p0042.1` for a tracked insertion after it. */
  anchorId: string;
  paragraph: Paragraph;
  /** True when this row is a paragraph we are proposing to add. */
  inserted: boolean;
  numbering?: string;
  segments: Segment[];
  state: ParagraphState;
  findingIds: string[];
  /** Comment pill numbers anchored at the end of this paragraph. */
  commentNumbers: number[];
}

export interface DecidedFinding {
  finding: Finding;
  decision?: Decision;
  /** The ops actually in play: the reviewer's when they edited, otherwise the agent's. */
  ops: RedlineOp[];
  comment: string;
  action: "open" | "accept" | "reject" | "edit";
  /** 1-based comment number, in card order. */
  commentNumber: number;
}

export function decideFindings(findings: Finding[], decisions: Record<string, Decision>): DecidedFinding[] {
  let commentNumber = 0;
  return findings.map((finding) => {
    const decision = decisions[finding.id];
    const action = decision?.action ?? "open";
    const ops = (decision?.action === "edit" ? decision.ops : undefined) ?? finding.proposal?.ops ?? [];
    const comment = (decision?.action === "edit" ? decision.comment : undefined) ?? finding.proposal?.comment ?? "";
    const hasRedline = ops.length > 0 && action !== "reject";
    if (hasRedline) commentNumber += 1;
    return {
      finding,
      decision,
      ops,
      comment,
      action,
      commentNumber: hasRedline ? commentNumber : 0,
    };
  });
}

function mergeSegments(segments: Segment[]): Segment[] {
  const out: Segment[] = [];
  for (const seg of segments) {
    if (seg.text.length === 0) continue;
    const last = out[out.length - 1];
    if (last && last.type === seg.type) last.text += seg.text;
    else out.push({ ...seg });
  }
  return out;
}

function resolveState(touching: DecidedFinding[]): ParagraphState {
  if (touching.length === 0) return "clean";
  if (touching.some((t) => t.action === "edit")) return "edited";
  if (touching.some((t) => t.action === "accept")) return "accepted";
  return "proposed";
}

/**
 * Renders every paragraph of the document, in order, with the tracked-change segments implied by the
 * live decisions. Rejected findings leave the paragraph exactly as the vendor drafted it.
 */
export function renderDocument(doc: DocumentModel, decided: DecidedFinding[]): ParagraphRender[] {
  const active = decided.filter((d) => d.action !== "reject" && d.ops.length > 0);

  const replaceOps = new Map<string, { op: Extract<RedlineOp, { kind: "replace" }>; owner: DecidedFinding }[]>();
  const deleted = new Map<string, DecidedFinding>();
  const insertions = new Map<string, { op: Extract<RedlineOp, { kind: "insert_after" }>; owner: DecidedFinding }[]>();
  const touchedBy = new Map<string, DecidedFinding[]>();

  const touch = (paragraphId: string, owner: DecidedFinding) => {
    const list = touchedBy.get(paragraphId) ?? [];
    if (!list.includes(owner)) list.push(owner);
    touchedBy.set(paragraphId, list);
  };

  for (const owner of active) {
    for (const op of owner.ops) {
      touch(op.paragraphId, owner);
      if (op.kind === "replace") {
        replaceOps.set(op.paragraphId, [...(replaceOps.get(op.paragraphId) ?? []), { op, owner }]);
      } else if (op.kind === "delete_paragraph") {
        deleted.set(op.paragraphId, owner);
      } else {
        insertions.set(op.paragraphId, [...(insertions.get(op.paragraphId) ?? []), { op, owner }]);
      }
    }
  }

  const rows: ParagraphRender[] = [];

  for (const paragraph of doc.paragraphs) {
    const touching = touchedBy.get(paragraph.id) ?? [];
    const commentNumbers = touching.filter((t) => t.commentNumber > 0).map((t) => t.commentNumber);
    const state = resolveState(touching);

    let segments: Segment[];
    if (deleted.has(paragraph.id)) {
      segments = [{ type: "delete", text: paragraph.text }];
    } else {
      const ops = (replaceOps.get(paragraph.id) ?? []).map(({ op }) => op);
      segments = renderParagraph(doc, paragraph.id, ops);
    }

    rows.push({
      anchorId: paragraph.id,
      paragraph,
      inserted: false,
      numbering: paragraph.numbering,
      segments: mergeSegments(segments),
      state,
      findingIds: touching.map((t) => t.finding.id),
      commentNumbers,
    });

    const added = insertions.get(paragraph.id) ?? [];
    added.forEach(({ op, owner }, index) => {
      rows.push({
        anchorId: `${paragraph.id}.${index + 1}`,
        paragraph: {
          ...paragraph,
          id: `${paragraph.id}.${index + 1}`,
          text: op.text,
          isHeading: Boolean(op.asHeading),
          numbering: op.numbering,
          style: op.asHeading ? "Heading 1" : "Normal",
        },
        inserted: true,
        numbering: op.numbering,
        segments: [{ type: "insert", text: op.text }],
        state: owner.action === "accept" ? "accepted" : owner.action === "edit" ? "edited" : "proposed",
        findingIds: [owner.finding.id],
        commentNumbers: owner.commentNumber > 0 ? [owner.commentNumber] : [],
      });
    });
  }

  return rows;
}

/** Severity roll-up per section, for the outline dots. */
export function sectionSeverities(doc: DocumentModel, findings: Finding[]): Map<string, Finding[]> {
  const paragraphSection = new Map(doc.paragraphs.map((p) => [p.id, p.sectionId ?? ""]));
  const bySection = new Map<string, Finding[]>();
  for (const finding of findings) {
    const sectionIds = new Set(
      finding.paragraphIds.map((id) => finding.sectionId ?? paragraphSection.get(id) ?? ""),
    );
    for (const sectionId of sectionIds) {
      if (!sectionId) continue;
      bySection.set(sectionId, [...(bySection.get(sectionId) ?? []), finding]);
    }
  }
  return bySection;
}

/**
 * A compact preview of a proposal: the changed words only. Every pair of ops is separated by a
 * newline (render with `whitespace-pre-line`) so two edits never run into each other — including two
 * insertions that share one anchor paragraph.
 */
export function proposalPreview(doc: DocumentModel, ops: RedlineOp[], limit = 160): Segment[] {
  const byId = new Map(doc.paragraphs.map((p) => [p.id, p]));
  const segments: Segment[] = [];
  ops.forEach((op, index) => {
    if (index > 0) segments.push({ type: "equal", text: "\n" });
    if (op.kind === "replace") segments.push(...wordDiff(op.oldText, op.newText));
    else if (op.kind === "insert_after") segments.push({ type: "insert", text: op.text });
    else segments.push({ type: "delete", text: byId.get(op.paragraphId)?.text ?? "" });
  });
  const merged = mergeSegments(segments);
  let total = 0;
  const clipped: Segment[] = [];
  for (const seg of merged) {
    if (total >= limit) break;
    const text = seg.text.slice(0, limit - total);
    clipped.push({ ...seg, text });
    total += text.length;
  }
  return clipped;
}
