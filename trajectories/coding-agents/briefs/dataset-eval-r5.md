# Revision 5: synthetic gold — mark legitimately overlapping secondary rules as `ambiguous` (gold-only; no text/docx changes)

Your session context is retained. **Hard constraint: do not modify any `contract.txt` / `contract.docx` / `meta.json` or the template — an
evaluation campaign is recording caches keyed on document content. Gold files only.** Assert the dataset text hash is unchanged before and after.

## Why
A live run on `synth-12` found all 9 injected deviations, plus four defensible flags the gold penalises as FP because one injected clause violates
two rules at once: §2.1 take-or-pay (gold MINCOMMIT; also LD), §7.2 disclose-and-match (gold MFN; also EXCLUSIVITY), §14.2 ownership + revocable licence
(gold IP; also LICENSE), §12.4 combined non-compete/no-hire (gold NONCOMPETE + NOSOLICIT both present — fine). Under EVAL.md §2, clauses where two
careful lawyers could differ are `ambiguous` and excluded from scoring.

## What to do
1. In `src/eval/deviations.ts` (or a small overlap table next to it), declare for each deviation variant the **secondary rules it plausibly triggers**:
   at minimum MINCOMMIT↔LD (take-or-pay / shortfall payments), MFN↔EXCLUSIVITY (right-to-match, disclose-before-engaging), IP↔LICENSE (ownership clauses
   that also grant/limit a licence), T4C↔LD (early-termination fees), RENEWAL↔T4C (evergreen with penalties), LOL-CAP↔INDEMN (indemnities inside the
   cap). For every injected deviation in `synth-11/12/13/hardcase`, add an `ambiguous` gold item for each secondary rule on the **same paragraph ids**
   (note: "secondary rule for the injected <RULE> deviation"), unless that rule already has a gold item on those paragraphs.
2. `WARRANTY` in the clean template is 90 days for Deliverables, which is the playbook *fallback* (preferred is 12 months for software); where WARRANTY was
   not injected, add an `ambiguous` WARRANTY item on the warranty paragraph(s) with the note "template sits at the fallback position".
3. Re-run `pnpm synth --seed 11 --count 3 && pnpm synth --hardcase` only if the generator writes gold (it must produce byte-identical `contract.txt`);
   otherwise edit the gold files directly with the gold-review CLI. Either way: `labeler: synthetic-exact` stays for original items; new items get
   `labeler: human`, `reviewedBy: lead`.
4. Report the before/after item counts per synthetic contract and the unchanged text hash. `pnpm typecheck && pnpm lint && pnpm exec vitest run tests/eval`.
No `pnpm add`. No git.

## Report (FINAL message structure — exactly)
```
## Summary
## Items added   (per contract: rule, status, paragraph ids, note)
## Hash check
## Test results
## Known gaps / risks
```
