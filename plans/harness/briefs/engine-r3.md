# Revision 3: OOXML engine — four remaining edge cases from the r2 verification review

Your session context is retained. The reviewer verified all 11 r2 fixes (report `plans/harness/reports/20260830-000947-review-engine.md`) and found
four remaining defects. Fix them with regression tests, keep the exported types unchanged, and re-run the gates. LibreOffice cannot run inside your
sandbox — treat that single test as environment-only (it passes for the lead).

1. **Insert after a subordinate inserted paragraph** (`redline-insert.ts:28-48`): cloning `p0000.1`'s `pPr/rPr` copies its paragraph-mark `w:ins` into
   `p0000.1.1` → duplicate `w:id`. Strip inherited revision markup (`w:ins`/`w:del` inside `w:rPr` of the cloned `w:pPr`, and any `w:rsid*`) before adding
   the fresh paragraph-mark insertion. Test: insert → re-parse → insert after the inserted paragraph → `validateDocx` ok, ids unique.
2. **Edits intersecting a prior `w:ins`** (`redline-dom.ts:221-274`): a replace whose anchor lies (wholly or partly) inside an existing insertion must not
   nest `w:ins` or mutate the prior revision's content. Implement proper reconciliation: text inside our own prior insertion (same author) may be edited
   by editing that insertion's runs directly (no nesting, the outer `w:ins` keeps its id); text inside a *foreign* insertion (other author) is treated like
   ordinary text but the new `w:ins`/`w:del` wrappers are placed as siblings *after splitting* the foreign `w:ins` at the anchor boundaries (split the
   wrapper into up to three `w:ins` elements with the same author/date and fresh ids for the split parts is NOT allowed to change the prior id — keep the
   original id on the first part and allocate new ids for the other parts, and record this in `ApplyResult.warnings`). If that is more than ~80 lines,
   the acceptable fallback is a consistent **preflight rejection** (`validateOp` returns ok:false with "anchor overlaps an existing tracked insertion by
   <author>; accept or reject that change first") for foreign insertions only — but same-author edits must work, because the app re-applies decisions on
   already-redlined documents. Tests for both cases.
3. **Replacement spanning into a hyperlink** (`redline-dom.ts:253-274`): inserted text must be placed in the context of the anchor *start* (outside the
   hyperlink when the anchor starts outside it), never inside an endpoint-only wrapper; deletions inside the hyperlink stay inside it. Test: anchor
   "see Example policy" where "Example" is a hyperlink → the `w:ins` is a sibling of the hyperlink, not a child.
4. **Comment placement validation** (`validate.ts:147-152,193-214`): for every new comment, verify `commentRangeStart/End` and the reference sit in the
   requested paragraph and enclose the requested anchor text (or the whole paragraph after fallback). Test with a deliberately misplaced marker set.
5. Suggestion: remove or use the unused helpers in `redline-runs.ts:64-117`.

Gates: `pnpm typecheck && pnpm lint && pnpm exec vitest run tests/engine` (LibreOffice test excepted in your sandbox). No `pnpm add`. Atomic writes. No git.

## Report (FINAL message structure — exactly)
```
## Summary
## Fixes   (1–5, each: what changed + which test proves it)
## Test results
## Known gaps / risks
```
