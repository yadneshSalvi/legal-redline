# Revision 4: add the missed gold items, verify two spots, promote all 8 CUAD contracts

Your session context is retained. The lead reviewed your r3 report (`plans/harness/reports/20260830-001347-dataset-eval.md`) and the Kubient /
Merit Life merged drafts (decisions in `plans/06_gold_review.md` — they match your merges; no further changes there except as below).

## 1. Add items from the "rules without items" candidates (read the paragraph text before adding; quote it in the report)
- `cuad-bnc-mortgage-hosting`: INDEMN → **compliant** on the TrueLink-indemnifies-Client paragraph (p0073 and any continuation), note "Vendor indemnity present".
- `cuad-corio-hosting`: INDEMN → **compliant** on the Commerce One IP-indemnity paragraph(s) (p0086 ± p0088).
- `cuad-kubient-msa-part1`: INDEMN → **compliant** on p0047 (+ procedure paragraphs if part of the same clause); WARRANTY → **missing** if p0062 is an
  AS-IS disclaimer with no express performance warranty (quote it; if an express warranty exists elsewhere, make it `compliant` on that paragraph).
- `cuad-sparkling-spring-license`: INDEMN → read p0087–p0090; if Garman gives an IP indemnity, add **compliant**; else add **missing**.
- `cuad-bluefly-hosting`: WARRANTY → **missing** if p0073/p0074 disclaim warranties with no express conformance/performance warranty (quote); MINCOMMIT →
  read p0052 (charges): add **deviation** only if Customer commits to minimum charges/volumes; otherwise no item.
- `cuad-merit-life-master-services`: WARRANTY → read p0023 (heading) and p0030 (disclaimer): if an express professional/workmanlike or conformance
  warranty exists → **compliant**; if only a disclaimer → **missing**.
- `cuad-sfg-financial-license`: MINCOMMIT → read p0066–p0067 (Monthly Notional Volume bands): if Licensee must pay minimum monthly fees regardless of
  volume → **deviation**; if it is pure usage-band pricing → no item.
- Everything else in the candidate lists is keyword noise — do not add.

## 2. Promote
Run `promote` for all 8 CUAD contracts (labeler stamps per the CLI; `reviewedBy: "lead"`). Append `data/contracts/LABELING_LOG.md` entries (contract,
items by status incl. ambiguous, distinct items, date). Confirm `pnpm eval` no longer rejects any contract for unapproved labelers (a replay run will
still fail on cache misses — that is expected until the campaign records caches; show that the labeler gate passes by running with `--allow-live`
against a **dry** flag if you have one, or by unit-testing the gate). Update `data/contracts/LABELING.md` wording if needed (factual: GPT-5.6 draft →
lead review under the playbook standard → author spot-check pending/complete).

## Gates
`pnpm typecheck && pnpm lint && pnpm exec vitest run tests/eval`; dataset hash unchanged for `contract.txt`/`contract.docx` (gold changes only). No git.

## Report (FINAL message structure — exactly)
```
## Summary
## Items added / decided   (per contract: rule, status, paragraph ids, quoted text ≤ 300 chars)
## Promotion   (per contract: counts by status, ambiguous, distinct; LABELING_LOG lines)
## Test results
## Known gaps / risks
```
