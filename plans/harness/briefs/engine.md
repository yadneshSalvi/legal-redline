# Brief: OOXML engine — parse .docx into a clause-addressable model, write real tracked changes + comments   (GPT-5.6 Sol · backend build)

You are a senior TypeScript engineer on **Playbook Redliner**, a micro1 Agentic Workflows Hackathon entry
(agentic contract redlining with human approval). Repo: `/Users/yadneshsalvi/code/hackathons/legal-redline`
(work in the repo root; other agents work concurrently in `src/agent`, `src/eval`, `app/` — do not touch those).

## Read first (mandatory)
1. `AGENTS.md` (conventions, pins, rules — obey them)
2. `SCHEMA.md` §1–2 (document model, OOXML redline rules) and **`src/engine/types.ts`** (the contract; do not change
   exported type names/shapes — add fields only if strictly necessary and list them in your report)
3. `src/engine/text.ts` (canonical paragraph splitting — use it; do not re-implement)
4. `STYLE.md` §2 (how DiffSegments are rendered; word-level diff is required)
5. `EVAL.md` §1 (the dataset builder will call `textToDocx` on `contract.txt`; ids must line up)

## Goal
Implement `src/engine/**` so that (1) any reasonable `.docx` parses into a `DocumentModel` with stable paragraph ids,
a section tree and definitions; (2) plain text converts to a deterministic `.docx`; (3) `applyRedlines` writes
**valid Word tracked changes (`w:ins`/`w:del`/`w:delText`) and margin comments** into a copy of the original,
touching nothing else; (4) `validateDocx` proves it. This engine is what turns the agent's proposals into a document a
lawyer would sign, and it is the "tool-boundary validation" the agent relies on (`validateOp`).

## Scope (exactly this)
- `src/engine/index.ts` — re-exports the API listed at the bottom of `src/engine/types.ts` (same names/signatures).
- `src/engine/parse-text.ts` — `parseText(text, filename)`: `splitParagraphs` → paragraphs; heading detection
  (numbered `1.`, `1.2`, `ARTICLE IV`, `Section 3.`, `(a)`-style sub-items are NOT headings; ALL-CAPS short lines ≤ 8 words are;
  "Heading N" style when known); numbering label extraction; section tree (levels from numbering depth); definitions
  (`"Term" means|shall mean|has the meaning`, `“Term”`, `(the "Term")`, `Term: ` in definitions sections); `stats`; `id` = first
  12 hex of sha256 of the canonical text; `title` = first heading or first non-empty line (≤ 120 chars).
- `src/engine/docx-read.ts` — `parseDocx(bytes, filename)` with `jszip` + `@xmldom/xmldom` (+ `xpath` if useful): iterate
  `w:body` in order (paragraphs, table cell paragraphs, `w:sdt` content); concatenate `w:t`, `w:tab` (→ space), `w:br` (→ space),
  text inside `w:hyperlink`/`w:smartTag`/`w:ins` (existing insertions count as text), skip `w:del`/`w:delText`, ignore
  headers/footers/footnotes; style name from `w:pStyle` resolved via `styles.xml`; numbering: if `w:numPr` present, keep
  `numbering` undefined unless the label is in the text (do not try to compute list labels); apply the same heading/section/definition
  detection as `parseText` (share the code). Paragraph ids by document order via `paragraphId(index)`. Keep a private map
  paragraphId → XML node index so `applyRedlines` can address nodes (re-parse inside apply is fine).
- `src/engine/docx-write.ts` — `textToDocx(text, opts)` / `documentToDocx(doc)`: minimal, deterministic package
  ([Content_Types].xml, _rels/.rels, word/document.xml, word/styles.xml with Normal + Heading 1–3 + a "Title" style,
  word/_rels/document.xml.rels, docProps/core.xml with fixed dates `2026-01-01T00:00:00Z`, JSZip `date` fixed) — one `w:p`
  per block; headings get `Heading N` styles; JSZip options deterministic (no timestamps, fixed compression). Same bytes on every run.
- `src/engine/diff.ts` — `wordDiff` via `diff.diffWords` (keep punctuation/whitespace attached sensibly), `renderParagraph(doc, id, ops)`.
- `src/engine/find.ts` — `findText(doc, query|RegExp, {limit})` with snippet (±80 chars) and tolerant matching (`normalizeForMatch`).
- `src/engine/validate.ts` — `validateOp`, `validateComment` (verbatim single occurrence; error messages must be precise and
  actionable, e.g. `oldText not found in p0042; nearest text: "…"`, `oldText occurs 3 times in p0042; include more context`);
  `validateDocx(original, redlined, req, {libreoffice})`: re-parse both, compare untouched paragraphs (text + runs), count
  `w:ins`/`w:del`/comments, return `collateralParagraphIds`; when `libreoffice` is requested, try
  `/Applications/LibreOffice.app/Contents/MacOS/soffice` or `soffice` on PATH with `--headless --convert-to pdf --outdir <tmp>`;
  record attempted/ok/message; never throw when absent.
- `src/engine/redline.ts` — `applyRedlines(original, doc, req)` exactly per `SCHEMA.md` §2: word-level `w:del`/`w:ins` inside the
  paragraph preserving run formatting (copy `w:rPr` of the run containing the anchor start; split runs at anchor boundaries;
  handle anchors spanning multiple runs), `insert_after` (new paragraph with paragraph-mark insertion; copy `w:pPr` from the
  anchor paragraph, heading style when `asHeading`), `delete_paragraph`, comments (`word/comments.xml`, content type override,
  relationship, `w:commentRangeStart/End` + `w:commentReference` run with `CommentReference` style optional); unique `w:id`s across
  the whole document (scan existing max id first); `author`/`date` from the request; `xml:space="preserve"` on every `w:t`/`w:delText`;
  proper XML escaping. Multiple ops on the same paragraph must compose (apply in descending offset order or merge into one diff).
- `scripts/validate-docx.ts` — CLI: `pnpm validate-docx <original.docx> <redlined.docx> [--ops ops.json] [--pdf]` prints the report.
- `tests/engine/**` (vitest): text splitting/ids; heading/section/definition detection on tricky inputs; `textToDocx` determinism
  (byte-equal across runs) and round-trip (`parseDocx(textToDocx(t))` ids/text equal `parseText(t)`); a **realistic fixture docx**
  generated in-test with the `docx` npm library (styles, bold/italic runs, a table, a hyperlink, a numbered list, an existing
  tracked change) parsing correctly; `applyRedlines` on that fixture: XML well-formed, `w:ins`/`w:del`/`w:delText` present with ids/author/date,
  formatting preserved on equal segments, comments part wired (content types + rels + ranges), untouched paragraphs identical,
  0/1/2-occurrence anchors validated, unicode quotes/dashes, multi-run anchors, two ops in one paragraph, insert_after with numbering,
  delete_paragraph; `validateDocx` catches a deliberately corrupted output; perf: an 8k-word doc parses < 500 ms and applies 30 ops < 1 s.
  If LibreOffice is present (check the path above; it may finish installing while you work), add a test that converts a redlined
  docx to PDF successfully (skip with a clear message when absent).

## Acceptance criteria
- `pnpm typecheck && pnpm lint && pnpm test` clean (run `pnpm exec next typegen` first if `LayoutProps` errors appear — that is
  another agent's area; do not edit `app/`).
- A redlined docx produced from `textToDocx(sample)` + 5 ops + 3 comments opens in LibreOffice headless (if available) and its
  `word/document.xml` contains correctly nested `w:ins`/`w:del` with `w:delText`.
- Deterministic outputs; no timestamps except the requested tracked-change date.

## Engineering rules
- Pure modules (no React/DOM); no `any`; named exports; files ≤ ~400 lines (split by concern).
- Do NOT run `pnpm add` — the needed deps are installed (`jszip`, `@xmldom/xmldom`, `xpath`, `diff`, `docx`). If something else is
  essential, say so in the report; do not modify `package.json`.
- Write files atomically (temp + `mv`). No `git commit` / `git push`.
- Public functions get a 1–3 line doc comment stating invariants and failure modes.

## Report (FINAL message structure — exactly)
```
## Summary
## Files
## Test results   (command + pass/fail counts + runtime)
## Design notes   (OOXML decisions, run splitting, id allocation, LibreOffice status)
## Known gaps / risks
```
