# Revision 2: OOXML engine — required fixes from the adversarial review + lead findings

Your session context is retained. An independent reviewer (GPT-5.6 at max effort) probed the engine and returned `revise`
(correctness 4/10). Its full report: `plans/harness/reports/20260829-233431-review-engine.md`. The lead also ran a hands-on smoke
(`data/runs/lead-smoke/smoke.mts`, output in `data/runs/lead-smoke/out/`) and rendered the result in LibreOffice
(`data/runs/lead-smoke/out/lo/page-1.png`). **LibreOffice is now installed** at `/Applications/LibreOffice.app/Contents/MacOS/soffice`
(26.8) — use it. Fix everything below, add the regression tests the reviewer asked for, and re-run the full gates.

## Required fixes (all of them)

1. **Preserve unrelated OOXML inside edited paragraphs** (`redline-dom.ts:173`). Never reset the paragraph's children. Edit runs in place:
   split only the runs that intersect the anchor span; leave bookmarks (`w:bookmarkStart/End`), complex fields (`w:fldChar`, `w:instrText`),
   simple fields, prior `w:ins`/`w:del` (ids untouched), existing comment ranges/references, `w:sdt`, `w:hyperlink`, `w:smartTag`, `w:proofErr`,
   `mc:AlternateContent`, text boxes exactly where they are. Add hostile regression tests: bookmark count unchanged, fldChar/instrText counts
   unchanged, inline SDT count unchanged (no duplicated `w:id`), prior revision ids unchanged and their hidden deleted text still present.
2. **Paragraph id → XML node mapping** (`redline.ts:197`). Map ids to nodes directly (walk the body and count original paragraphs, skipping
   paragraphs we inserted — mark ours with a stable attribute such as `w14:paraId`-style marker or by recognising the paragraph-mark `w:ins`
   with our author), so that apply → re-parse → apply works and subordinate ids (`p0000.1`) are honoured. Test repeated cycles: insert after
   p0000, re-parse, replace in p0002, re-parse, delete p0003 — ids stable, text correct, no "overlapping" errors.
3. **Overlapping anchor occurrences** (`validate.ts:27`): advance by one code unit after each match; "aa" in "aaa" = 2 occurrences → reject. Tests.
4. **Numbering + heading heuristics** (`docx-read.ts:108`, `model.ts`): resolve `numbering.xml` / `w:numPr` to a visible label when it is a simple
   decimal/multilevel list (best effort; leave undefined when not resolvable); **numbered prose is not a heading** — a paragraph is a heading only if
   (a) style is `Heading N`/`Title`, or (b) it is ALL-CAPS and ≤ 12 words, or (c) it has a numbering label AND the remaining text is ≤ 12 words AND does
   not end with a period/semicolon (title-like). "9.1 Vendor's aggregate liability … preceding the claim." and "2. The Vendor shall…" are body
   paragraphs with `numbering` set and `sectionId` of the nearest heading above (in the lead's smoke every `N.M` sub-clause became a `Heading2` section —
   wrong, and it makes `list_sections` unusable on real contracts). An `insert_after` with an explicit `numbering` label must not also inherit
   automatic `w:numPr` from the anchor (drop `w:numPr` in that case). Tests for all of these.
5. **Definitions** (`model.ts:199`): implement the documented patterns with word boundaries — `"Term" means / shall mean / has the meaning`, `“Term”`
   with curly quotes, `(the "Term")` / `("Term")` alias forms **only when the alias is ≤ 4 words and followed by punctuation**, `"Term" (as defined in
   Section X)` (record the pointer), `Term: definition` **only inside a section whose heading contains "Definition"**; reject `"Bogus" meanslessness`,
   `Administrative Note:` etc. The lead's smoke missed `1.1 "Fees" means the implementation fee…` and `1.2 "Services" means…` because the paragraph
   was classified as a heading — after fix 4 these must be detected. Tests with positive and negative cases.
6. **Dates** (`redline.ts:135`): accept only RFC 3339 / ISO 8601 date-times (`YYYY-MM-DDTHH:MM:SS(.sss)?(Z|±HH:MM)`); otherwise throw a clear error.
7. **Forbidden XML characters** (`docx-write.ts:8`): strip or replace U+0000–U+0008, U+000B, U+000C, U+000E–U+001F (and lone surrogates) in all
   text/attribute output; test.
8. **validateDocx must be adversarial** (`validate.ts:147`): enforce unique `w:id` across `w:ins`/`w:del`/comments, verify every *new* revision
   carries the requested author and an ISO date, verify comment count/anchors, and detect structural loss versus the source: bookmark, field,
   SDT, hyperlink and prior-revision counts must be unchanged (report which). Test with corrupted documents for each condition.
9. **Comment anchors are lenient** (lead finding): when `RedlineComment.anchorText` is not found (or ambiguous), anchor the comment to the whole
   paragraph and push a warning into `ApplyResult.warnings` instead of throwing (ops stay strict; comments degrade gracefully). `validateComment`
   still reports `ok:false` so the agent can fix it upstream. Test.
10. **Group dense changes in the word diff** (lead finding; see `page-1.png`, the 14.1 sentence): after `diffWords`, merge consecutive change
    chunks that are separated only by short equal segments (≤ 2 words or ≤ 12 characters) into a single delete + single insert. "three (3) months →
    twelve (12) months" may become one delete/insert pair; "Vendor's aggregate liability → Each party's aggregate liability" stays a single
    word-level change. Apply the same grouping in `renderParagraph` so UI preview and docx agree. Test with the 14.1 example.
11. **LibreOffice round-trip test** (now possible): convert a redlined docx to PDF (`--headless --convert-to pdf`) and back to docx
    (`--convert-to docx:"MS Word 2007 XML"`) using an isolated profile (`-env:UserInstallation=file:///tmp/lo-profile-<pid>`), and assert the
    round-tripped docx keeps the tracked-change and comment counts. Also make `validateDocx({libreoffice:true})` use the isolated profile and
    a 60 s timeout; the lead's smoke (`pnpm exec tsx data/runs/lead-smoke/smoke.mts data/runs/lead-smoke/out`) must report `libreoffice.ok = true`.

## Also
- Apply the reviewer's suggestions where cheap: runtime-validate `--ops` JSON in the CLI (zod), document that `applyRedlines` uses the current
  time only when `date` is omitted.
- Keep exported type shapes unchanged. Files ≤ 400 lines (split further if needed). No `pnpm add`. Atomic writes. No git.
- Gates: `pnpm typecheck` (run `pnpm exec next typegen` first; ignore errors outside `src/engine`/`tests/engine`/`scripts/validate-docx.ts` and list them),
  `pnpm lint`, `pnpm exec vitest run tests/engine`. Then re-run the lead smoke and paste its `validation:` line.

## Report (FINAL message structure — exactly)
```
## Summary
## Fixes   (numbered 1–11, each: what changed + which test proves it)
## Test results
## Lead smoke output   (the validation line + libreoffice status)
## Known gaps / risks
```
