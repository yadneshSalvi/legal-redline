# Revision 2: dataset + eval — paragraph splitting for flat CUAD text, hard-case gold corrections, gold-review CLI

Your session context is retained. The lead inspected the dataset. Fix the following, keep everything deterministic, and re-run the gates.

## 1. CUAD canonicalisation: split inline clauses (blocker)
`cuad-kubient-msa-part1` has 4,014 words in **5 paragraphs** (blocks of 878 / 618 / 1,426 / 1,042 / 50 words) and `cuad-merit-life-master-services`
3,292 words in **11**. The raw CUAD context has almost no line breaks; clause boundaries are inline ("… as follows: 1. Definitions. … 9. Representations,
Warranties, and Covenants. (a) Each Party … (b) Kubient represents …"). Paragraph-level matching and redlining are meaningless on 1,400-word paragraphs.
Extend the canonicaliser (`src/eval/cuad.ts`) so that, **after** blank-line splitting, any block longer than ~120 words is further split:
- before an inline top-level clause marker: `(?<=[.;:])\s+(?=\d{1,2}(\.\d{1,2})*\.?\s+[A-Z(“"])` (e.g. `. 9. Representations`), and before `ARTICLE|SECTION\s+[IVX\d]+`;
- before lettered/roman sub-items when preceded by sentence end: `(?<=[.;:])\s+(?=\([a-z]{1,3}\)\s)` and `(?<=[.;:])\s+(?=\([ivx]+\)\s)`;
- if a block is still > 250 words, split at sentence boundaries (`(?<=[.!?])\s+(?=[A-Z])`) into chunks of ≤ ~150 words, never mid-sentence.
Never split inside quoted defined terms or numbers like "1.5" / "USD 1,000,000" (the lookaheads above require a following capital letter or quote).
Re-run `pnpm build-dataset` — it must regenerate `contract.txt`, `contract.docx`, remap CUAD spans to the new paragraph ids (0 unmatched still), and
**preserve existing assisted labels** by matching items on (ruleId, cuadCategory, normalised spanText) rather than paragraph ids; items that cannot be
carried over are re-drafted with `label-assist` (cached calls are reused where the request is identical). Target: no CUAD contract with a paragraph
> 300 words; report the new paragraph counts. Add a regression test with a flat 600-word block containing inline "1." "(a)" "(b)" markers.

## 2. Hard-case gold corrections (blocker — the lead read the contract as a lawyer)
`data/contracts/synth-hardcase` (and `src/eval/hardcase.ts`):
- **g01 LOL-CAP is not a deviation as written.** §21.1 caps liability at "the greater of the Fees paid or payable … during the twelve months … and USD 1,000,000";
  the USD 1,000,000 floor satisfies our own preferred position regardless of how "Fees" is defined. Remove the floor from the hard case so the cap reads
  "shall not exceed the Fees paid or payable by Customer under the first Order Form during the twelve months preceding the event giving rise to the claim" —
  now the cap is genuinely illusory because §1.5 defines "Fees" as the one-off Implementation Fee. Make the definition subtler and realistic: §1.5 `"Fees" means
  the Implementation Fee.` and a separate §1.x `"Implementation Fee" means the one-time implementation charge of USD 12,000 stated in the first Order Form.`
  (no "excludes all recurring…" sentence — the trap must require resolving two definitions). Gold note: "Cap references 'Fees', defined as the USD 12,000 one-off
  Implementation Fee; the 12-month cap is illusory". `expectedFix`: cap on total fees paid or payable under the Agreement (all charges) in the 12 months, with the
  USD 1,000,000 floor, mutual.
- **Remove telegraphing.** Delete the sentence "This restriction binds Vendor only." from §12.4 (the non-compete decoy must read naturally: "Vendor shall not
  develop or market … during the term."). Keep the MFN decoy natural too (no "in Customer's favour" hints beyond the clause itself).
- **Decouple the LD trap from T4C.** §7.7 currently attaches liquidated damages to Customer's §9.4 convenience right, which makes the T4C "compliant" gold
  debatable (our T4C position is "without penalty"). Change §7.7 to a stand-alone Customer-payable penalty unrelated to termination, e.g. "If any invoice is not
  paid within ten days of its due date, Customer shall pay Vendor, as liquidated damages and not as a penalty, an amount equal to fifteen percent of the annual
  Fees for each week the invoice remains unpaid." Gold: LD deviation on that paragraph; T4C stays compliant via the §9.4 ↔ §29.4 cross-reference.
- Keep the construction deterministic; update `meta.json.hardCase` notes and `EVAL.md` §1 wording if the description changed (edit only the hard-case sentence).

## 3. Gold-review CLI (for the human-confirmation pass)
Add `scripts/gold-review.ts` (exposed via `pnpm exec tsx scripts/gold-review.ts`):
- `list <contractId>` prints every draft item as a compact block: id · ruleId · status · labeler · the paragraph text(s) (≤ 900 chars each, with paragraph ids)
  · draft note · expectedFix. Also list, for every playbook rule with **no** item, the best-guess paragraphs (top 3 by keyword search from `rule.detect`) so the
  reviewer can add missed items.
- `set <contractId> <itemId> --status deviation|compliant|missing [--note "…"] [--expected-fix "…"]` updates the draft in place and marks `labeler` as
  `cuad+human` / `human`, recording `reviewedAt` and `reviewedBy` (arg `--by`, default "lead").
- `add <contractId> --rule <ruleId> --paragraphs p0012,p0013 --status … --note "…"` adds an item (`labeler: human`).
- `remove <contractId> <itemId>`.
- `promote <contractId>` writes `gold.json` only if every item has a human labeler; appends a line to `data/contracts/LABELING_LOG.md`.
- `pnpm eval` must reject contracts whose `gold.json` still contains non-human labelers (keep the existing safeguard).

## 4. Baseline sanity
`evals/results/b1-prompt.json` currently covers only `synth-hardcase`. After the hard-case correction, re-run `pnpm eval --config b1-prompt --contracts
synth-hardcase --live` and report whether the baseline still finds the illusory cap (it should not, or only by luck).

## Gates
`pnpm typecheck && pnpm lint && pnpm exec vitest run tests/eval` clean; `pnpm build-dataset` and `pnpm synth --hardcase` idempotent (run twice, byte-identical);
report the per-contract table again (words, paragraphs, max paragraph words, items by status, unmatched). No `pnpm add`. Atomic writes. No git.

## Report (FINAL message structure — exactly)
```
## Summary
## Fixes   (1–4, each: what changed + evidence)
## Dataset status   (table)
## Test results
## Known gaps / risks
```
