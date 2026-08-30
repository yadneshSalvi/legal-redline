# Review brief: OOXML engine   (GPT-5.6 Sol at max · adversarial, read-only)

You are an independent, adversarial reviewer. Do not fix anything; find what is wrong and prove it.
Repo: `~/code/hackathons/legal-redline`. Scope under review: `src/engine/**`, `tests/engine/**`,
`scripts/validate-docx.ts`. Contracts: `SCHEMA.md` §1–2, `src/engine/types.ts`, `src/engine/text.ts`, `AGENTS.md`, `STYLE.md` §2.
The builder's report is at `{{BUILDER_REPORT}}` — read it, then verify every claim yourself.

## What to verify (run commands; do not trust the report)
1. `pnpm typecheck && pnpm lint && pnpm test -- tests/engine` — paste the summary.
2. Write a throwaway script under `/tmp` (not in the repo) that: builds a docx with `textToDocx` from a 60-paragraph contract
   text with headings/definitions; parses it; applies 6 ops (two `replace` in one paragraph, a multi-run anchor, an
   `insert_after` with numbering, a `delete_paragraph`, a replace whose `oldText` spans punctuation/quotes) + 3 comments; then
   unzip the result and inspect `word/document.xml` and `word/comments.xml` by eye: nesting of `w:ins`/`w:del`, `w:delText`,
   `xml:space="preserve"`, unique `w:id`s, author/date, comment ranges + references, `[Content_Types].xml` override and the
   relationship. Re-parse: untouched paragraphs identical; `validateDocx` says ok with `collateralParagraphIds = []`.
3. If `/Applications/LibreOffice.app/Contents/MacOS/soffice` exists, convert the redlined docx to PDF headless and confirm it
   succeeds; then convert to `docx` again (round-trip) and check LibreOffice preserved the tracked changes (`w:ins` count).
4. Build a "hostile" docx with the `docx` npm library (tables, hyperlinks, existing tracked changes, bookmarks, fields,
   empty paragraphs, a paragraph made of 5 runs with different formatting) and verify `parseDocx` text matches expectations and
   `applyRedlines` on a multi-run paragraph keeps the formatting of untouched runs.
5. Anchor validation: `validateOp` rejects 0 and 2+ occurrences with actionable messages; accepts exactly one; handles curly quotes.
6. Determinism: `textToDocx` twice → identical bytes (`shasum`).
7. Perf: parse an 8k-word doc < 500 ms; apply 30 ops < 1 s.
8. Read the code for: XML escaping bugs, id collisions with existing `w:ins`/`w:del`/comments in the source, paragraphs inside
   tables/sdt being skipped or double-counted, numbering detection false positives ("2. The" in prose), definitions parser
   over-matching, files > 400 lines, `any`, non-atomic writes, anything non-deterministic.

## Hold the bar consistently
- Required fixes are only for genuine defects/blockers (invalid OOXML, collateral edits, wrong ids, validation that lets a bad
  anchor through, non-determinism, failing/absent tests for the above). Polish you newly noticed goes under "suggestions".
- Quote evidence: file:line, command output, XML snippets.

## FINAL message must be exactly this JSON (no prose outside the block)
```json
{
  "verdict": "approve" | "revise",
  "required_fixes": [{"where": "file:line or artefact", "what": "…", "why": "…", "how": "…"}],
  "suggestions": ["…"],
  "evidence": ["…"],
  "score": {"correctness": 0-10, "contract_compliance": 0-10, "quality": 0-10}
}
```
