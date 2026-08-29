/**
 * Engine contract — the clause-addressable document model and the redline operations
 * that every other module (agent, eval, UI) codes against. Pure data; no DOM, no React.
 *
 * Invariants
 * - `Paragraph.id` is `p` + zero-padded 4-digit document-order index (`p0000`, `p0001`, …) and is
 *   stable across parse → apply → re-parse of the same source (tracked-change paragraphs inserted by
 *   us carry ids `p0012.1`, `p0012.2` … so original ids never shift).
 * - `Paragraph.text` is the paragraph's visible text with runs concatenated, whitespace preserved
 *   except that `\t` and non-breaking spaces are normalised to a single space and trailing spaces trimmed.
 * - A `replace` op's `oldText` must occur **exactly once** as a verbatim substring of the paragraph
 *   text; the engine rejects anything else (this is the tool-boundary validation the agent relies on).
 */

export type ParagraphId = string;
export type SectionId = string;

export interface RunSpan {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface Paragraph {
  id: ParagraphId;
  /** 0-based document order among original paragraphs. */
  index: number;
  text: string;
  /** Word style name if present (e.g. "Heading 1", "Normal", "ListParagraph"). */
  style?: string;
  /** Visible numbering label detected from text or numbering.xml, e.g. "3.2", "(a)", "7". */
  numbering?: string;
  /** Heading level (1..6) when the paragraph is a section heading; undefined otherwise. */
  level?: number;
  isHeading: boolean;
  /** Enclosing section (nearest heading at or above). */
  sectionId?: SectionId;
  runs?: RunSpan[];
}

export interface Section {
  /** e.g. "sec-3.2", "sec-7", "sec-preamble". */
  id: SectionId;
  number?: string;
  heading: string;
  level: number;
  paragraphIds: ParagraphId[];
  parentId?: SectionId;
  childIds: SectionId[];
}

export interface Definition {
  term: string;
  paragraphId: ParagraphId;
  /** The defining sentence/paragraph text. */
  text: string;
}

export interface DocumentSource {
  kind: "docx" | "txt";
  filename: string;
  sha256: string;
  bytes: number;
}

export interface DocumentModel {
  /** Stable id derived from the source sha256 (first 12 hex chars). */
  id: string;
  title: string;
  source: DocumentSource;
  paragraphs: Paragraph[];
  sections: Section[];
  definitions: Definition[];
  stats: { words: number; paragraphs: number; sections: number; definitions: number };
}

/** A redline operation. All ops address paragraphs by id; text anchors must be verbatim. */
export type RedlineOp =
  | {
      kind: "replace";
      paragraphId: ParagraphId;
      /** Verbatim substring of the paragraph text (exactly one occurrence). May be the whole paragraph. */
      oldText: string;
      newText: string;
    }
  | {
      kind: "insert_after";
      paragraphId: ParagraphId;
      /** New paragraph text inserted after the anchor paragraph (rendered as a tracked insertion). */
      text: string;
      /** Optional visible numbering label for the new paragraph, e.g. "9.4". */
      numbering?: string;
      asHeading?: boolean;
    }
  | {
      kind: "delete_paragraph";
      paragraphId: ParagraphId;
    };

export interface RedlineComment {
  paragraphId: ParagraphId;
  /** Verbatim substring to anchor the comment range to; whole paragraph when omitted. */
  anchorText?: string;
  text: string;
}

export interface ApplyRequest {
  ops: RedlineOp[];
  comments: RedlineComment[];
  /** Tracked-change author, e.g. "Playbook Redliner". */
  author: string;
  /** ISO 8601; defaults to now. Fixed in tests for determinism. */
  date?: string;
}

export interface ParagraphChange {
  paragraphId: ParagraphId;
  insertions: number;
  deletions: number;
  comments: number;
}

export interface ApplyResult {
  docx: Uint8Array;
  applied: number;
  changes: ParagraphChange[];
  warnings: string[];
}

export interface OpValidation {
  ok: boolean;
  /** Human-readable reason when not ok — returned verbatim to the agent as a tool error. */
  error?: string;
  /** Number of occurrences of `oldText`/`anchorText` found (0, 1, or >1). */
  occurrences?: number;
}

export interface DiffSegment {
  type: "equal" | "insert" | "delete";
  text: string;
}

export interface DocxValidationReport {
  ok: boolean;
  parsedParagraphs: number;
  trackedInsertions: number;
  trackedDeletions: number;
  comments: number;
  /** Every paragraph not targeted by an op is byte-identical (text + runs) to the original. */
  untouchedIdentical: boolean;
  /** Paragraph ids that changed although no op targeted them (collateral edits). Must be empty. */
  collateralParagraphIds: ParagraphId[];
  errors: string[];
  libreoffice?: { attempted: boolean; ok: boolean; message?: string };
}

/**
 * Engine API (implemented in `src/engine/index.ts`):
 *
 * parseDocx(bytes: Uint8Array, filename: string): Promise<DocumentModel>
 * parseText(text: string, filename: string): DocumentModel
 * textToDocx(text: string, opts?: { title?: string }): Promise<Uint8Array>      // deterministic
 * documentToDocx(doc: DocumentModel): Promise<Uint8Array>                        // deterministic
 * validateOp(doc: DocumentModel, op: RedlineOp): OpValidation
 * validateComment(doc: DocumentModel, c: RedlineComment): OpValidation
 * applyRedlines(original: Uint8Array, doc: DocumentModel, req: ApplyRequest): Promise<ApplyResult>
 * validateDocx(original: Uint8Array, redlined: Uint8Array, req: ApplyRequest, opts?: { libreoffice?: boolean }): Promise<DocxValidationReport>
 * wordDiff(oldText: string, newText: string): DiffSegment[]
 * renderParagraph(doc: DocumentModel, paragraphId: ParagraphId, ops: RedlineOp[]): DiffSegment[]  // UI/verifier preview
 * findText(doc: DocumentModel, query: string | RegExp, opts?: { limit?: number }): { paragraphId: ParagraphId; snippet: string; start: number }[]
 */
