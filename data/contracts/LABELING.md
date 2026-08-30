# Gold-label workflow

CUAD supplies objective clause spans, but it does not say whether a clause complies with this project's
customer-side playbook. GPT-5.6 creates the assisted drafts. The lead orchestrator (Claude Fable 5) then
reviews each item against the playbook standard recorded in `plans/06_gold_review.md`. Promotion attests
that lead review; the author's separate legal-exposure spot-check remains pending unless explicitly recorded.

Use `pnpm exec tsx scripts/gold-review.ts` with its `list`, `merge`, `set`, `add`, and `remove` subcommands
during review, then `promote <contract-id>`. Promotion records `cuad+human` for CUAD-backed items and
`human` for human-added items. Draft labels are never represented as human-confirmed gold. Items marked
`ambiguous` identify questions on which careful lawyers could reasonably differ and are excluded from
TP, FP, and FN scoring.

## Long tier

The six `long-*` contracts were selected by the pre-registered rule in
`plans/campaign/preregistration.md`, before any system output was produced. `scripts/build-dataset.ts --long`
stores the raw expert mapping in `gold.cuad.json`; `scripts/label-assist.ts --tier long` uses GPT-5.6 Sol
(`reasoning.effort: high`) to draft one item for every playbook rule and an additional `distinct: true` item
only for a genuinely separate CUAD clause. Every source span is mapped to canonical paragraph ids with
`normalizeForMatch` overlap and retained in the final draft. A span paired with a model claim that the clause
is missing is forced to `ambiguous` rather than silently discarding the expert evidence.

The metrics-hard evaluation-scientist pass checked all-rule coverage, paragraph/status consistency, all
CUAD provenance, all ambiguous reasons, and every positive item's note; it corrected one absent T4C item from
an unmatchable empty-anchor `deviation` to `missing`. Promotion records `agent-reviewed` or
`cuad+agent-reviewed`, requires the explicit `--allow-agent-review` flag, and never represents this pass as
human confirmation. The author's separate human legal-exposure spot-check is pending and disclosed.

| Contract | Items | Deviation | Missing | Compliant | Ambiguous | CUAD-anchored | Distinct |
|---|---:|---:|---:|---:|---:|---:|---:|
| `long-array-biopharma-inc` | 21 | 11 | 1 | 8 | 1 | 16 | 3 |
| `long-harpoontherapeuticsinc` | 19 | 4 | 0 | 11 | 4 | 12 | 1 |
| `long-manufacturersservicesltd` | 22 | 8 | 1 | 10 | 3 | 16 | 4 |
| `long-phasebiopharmaceuticalsinc` | 19 | 9 | 1 | 7 | 2 | 14 | 1 |
| `long-revolutionmedicinesinc` | 21 | 6 | 0 | 11 | 4 | 15 | 3 |
| `long-verizonabsllc` | 19 | 6 | 1 | 11 | 1 | 7 | 1 |
| **Total** | **121** | **44** | **4** | **58** | **15** | **80 (66.1%)** | **13** |

All 294 mapped CUAD source spans are retained across the 80 anchored items; repeated or overlapping expert
answers are unioned rather than counted as independent review questions.

### Long tier — anchor provenance note (added after the round-2 gate review)

Of the 80 CUAD-anchored long-tier items, 12 carry paragraph ids that are supersets of the CUAD span's paragraph (the anchor was
widened to the clause the span sits in; none was moved). The 05:51 UTC re-promotion recorded in `LABELING_LOG.md` changed labeler
fields only — item counts and statuses are identical to the 03:44 UTC promotion.

### Long tier — anchor provenance note (added after the round-2 gate review)

Of the 80 CUAD-anchored long-tier items, 12 carry paragraph ids that are supersets of the CUAD span's paragraph (the anchor was
widened to the clause the span sits in; none was moved). The 05:51 UTC re-promotion recorded in `LABELING_LOG.md` changed labeler
fields only — item counts and statuses are identical to the 03:44 UTC promotion.
