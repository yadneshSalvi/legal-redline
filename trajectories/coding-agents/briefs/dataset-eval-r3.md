# Revision 3: gold semantics (one item per rule, `ambiguous`), apply the lead's review decisions, finish gold for all 8 CUAD contracts

Your session context is retained. `EVAL.md` §2–3 changed (read it again): (1) gold carries **one item per rule per contract** (union of
paragraphIds and cuadCategories, notes concatenated) unless the reviewer marks `distinct: true`; (2) new status **`ambiguous`** — findings that
match an ambiguous item are excluded from TP/FP/FN and reported as "ambiguous matches". The lead reviewed six CUAD contracts and logged
decisions in **`plans/06_gold_review.md`** — apply them exactly.

## 1. Schema, matching, metrics
- `src/eval/gold.ts`: add `ambiguous` to the status enum; optional `distinct?: boolean`; optional `reviewedBy`, `reviewedAt`, `cuadCategories: string[]`
  (keep `cuadCategory` for backwards compatibility, filled with the first).
- `src/eval/match.ts` / `metrics.ts`: implement the ambiguous exclusion; report `ambiguousItems` and `ambiguousMatches` per contract and in aggregate;
  update tests (a compliant clause flagged → FP; an ambiguous clause flagged → ignored; one merged deviation item matched by one finding → 1 TP, 0 FN).
- `src/eval/report.ts`: show ambiguous counts in the per-contract table.

## 2. Gold-review CLI additions
- `merge <contractId> <itemId,itemId,…> [--status …] [--note "…"]` → one item (union of paragraphs/categories), new id, provenance kept in `mergedFrom`.
- `set … --rule <ruleId>` (re-assign the rule), `--status ambiguous`, `--distinct`.
- `add`, `remove`, `promote` as already specified. `promote` must refuse if any rule has > 1 non-distinct item.
- `list` shows, for every playbook rule with no item, the top-3 candidate paragraphs (keyword search from `rule.detect` + `rule.cuad` names).

## 3. Apply the lead's decisions (`plans/06_gold_review.md`)
For `cuad-americas-shopping-mall-hosting`, `cuad-bnc-mortgage-hosting`, `cuad-bluefly-hosting`, `cuad-corio-hosting`, `cuad-sparkling-spring-license`,
`cuad-sfg-financial-license`: apply every row (merge / set / remove / add / rule re-assignment / ambiguous). Where the log says "re-map" (SFG), re-locate the
paragraph ids on the re-split text by searching the quoted subject (e.g. the Licensor's seven-year renewal option, the three-year non-solicit, the
change-of-control termination) and print the paragraph text you chose in your report so the lead can verify. Stamp `reviewedBy: "lead"` and `labeler`
`cuad+human` / `human` per the CLI semantics; do **not** promote to `gold.json` yet — the lead promotes after verification (leave everything in
`gold.draft.json`, but make `promote` ready).
For `cuad-kubient-msa-part1` and `cuad-merit-life-master-services` (regenerated after the r2 re-split): run `label-assist` again if the drafts still
reference the old giant paragraphs, then apply the merge rule mechanically (one item per rule) and print the full `list` output for both contracts in
your report (the lead will review them from the report — include ≤ 350 chars of paragraph text per item).
For all 8 contracts: run `list` and include the "rules without items" candidates in the report (≤ 200 chars each) so the lead can add missed items.

## 4. Provenance text
Update `data/contracts/LABELING.md`: drafts by GPT-5.6 → reviewed item-by-item by the lead orchestrator (Claude Fable 5) under the playbook standard
recorded in `plans/06_gold_review.md` → spot-checked by the author (legal exposure); ambiguous items excluded from scoring. Keep it factual.

## Gates
`pnpm typecheck && pnpm lint && pnpm exec vitest run tests/eval` clean; `pnpm eval --config b1-prompt --contracts synth-hardcase` (replay) still works;
byte-identical dataset regeneration. No `pnpm add`. Atomic writes. No git.

## Report (FINAL message structure — exactly)
```
## Summary
## Decisions applied   (per contract: item ids before → after, with the paragraph text for every re-mapped SFG item)
## Kubient + Merit Life draft listings   (full `list` output, trimmed as above)
## Rules without items   (per contract, candidates)
## Test results
## Known gaps / risks
```
