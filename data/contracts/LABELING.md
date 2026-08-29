# Gold-label workflow

CUAD supplies objective clause spans, but it does not say whether a clause complies with this project's
customer-side playbook. GPT-5.6 creates the assisted drafts. The lead orchestrator (Claude Fable 5) then
reviews each item against the playbook standard recorded in `plans/06_gold_review.md`, and the author, who
has legal exposure, spot-checks the result before promotion.

Use `pnpm exec tsx scripts/gold-review.ts` with its `list`, `merge`, `set`, `add`, and `remove` subcommands
during review, then `promote <contract-id>`. Promotion records `cuad+human` for CUAD-backed items and
`human` for human-added items. Draft labels are never represented as human-confirmed gold. Items marked
`ambiguous` identify questions on which careful lawyers could reasonably differ and are excluded from
TP, FP, and FN scoring.
