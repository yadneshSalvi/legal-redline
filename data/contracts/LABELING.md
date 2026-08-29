# Gold-label workflow

CUAD supplies objective clause spans, but it does not say whether a clause complies with this project's
customer-side playbook. `pnpm exec tsx scripts/label-assist.ts` creates an LLM-assisted draft. A human
reviewer with legal exposure must confirm every status, party direction, note, and expected fix before
running `--promote <contract-id>`. Promotion records `cuad+human` for CUAD-backed items and `human` for
human-added missing-clause items. Draft labels are never represented as human-confirmed gold.
