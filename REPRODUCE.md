# Reproduction guide

Written for someone starting from a clean machine. Every number in `IMPROVEMENT_CHANGELOG.md` reproduces **without
API keys** from the committed replay cache; live re-runs need keys and cost money (figures below).

## 0. Requirements

| Tool | Version used | Notes |
|---|---|---|
| Node.js | 22.x (22.22 used) | `node --version` |
| pnpm | 10.15 | `corepack enable && corepack prepare pnpm@10.15.0 --activate` |
| Git | any | |
| LibreOffice (optional) | 26.8 | only for the "opens in LibreOffice" integrity check and PDF rendering; the eval records it as skipped when absent |
| Docker (optional) | 28.3 | `docker build -t redliner . && docker run --rm redliner pnpm eval --all` runs the whole evaluation in a clean container |

## 1. Install

```bash
git clone https://github.com/yadneshSalvi/legal-redline playbook-redliner && cd playbook-redliner
pnpm install --frozen-lockfile
cp .env.example .env            # leave keys empty for replay mode
pnpm typecheck && pnpm test     # ~10 s, no network
```

## 2. Reproduce the evaluation (zero cost, ≈ 5–10 min for the round-1 short tier, ≈ 15 min for both tiers)

```bash
pnpm eval --all                 # round 1: replays evals/cache → evals/results/<config>.json  (add --config final for one)
pnpm eval --all --tier all      # round 2: both tiers → evals/results/<config>.{short,long}.json (final-v4 replays from
                                #          the caches of the members it routes to: i7-precise below 15k words, i6-longdoc above)
pnpm report                     # → evals/results/summary.md + changelog-data.json
```

Expected: `summary.md` matches the tables in `IMPROVEMENT_CHANGELOG.md` and `evals/results/*.json` byte-for-byte (the runs are
deterministic in replay; the judge verdicts replay from `evals/cache/judge`). A cache miss throws `ReplayCacheMiss` rather than
silently calling a model — if you see one, the checkout and the cache are out of sync.

## 3. Run the solution on a contract

```bash
pnpm review data/contracts/synth-hardcase/contract.docx --config final --mode replay --accept-all
# → Run: <runId> · Duration: ~1 s · Cost: $0 · 18 verified findings (2 deviations)
# → data/runs/<runId>/{run.json, findings.json, trajectory.jsonl, output.docx, memo.md}
pnpm validate-docx data/contracts/synth-hardcase/contract.docx data/runs/<runId>/output.docx --run <runId> --pdf
```

A contract from the evaluation set (`data/contracts/<id>/`) replays from `evals/cache/<config>/<id>` with the parties
the evaluation used (`meta.json`); the local precedent index is ignored in replay so the recorded request hashes
match. For any other file pass `--cache-dir`, `--party` and `--counterparty` yourself — or drop `--mode replay`.
`validate-docx --run <runId>` rebuilds the exact apply request from the run's decisions (the same report is stored
in `run.json → output.validation`); `--pdf` adds the LibreOffice round-trip when LibreOffice is installed.

Live (needs `ANTHROPIC_API_KEY`): drop `--mode replay`. Typical run on a 5k-word contract: 4–5 min,
3–4 USD.

## 4. Run the baseline on the same contract

```bash
pnpm baseline data/contracts/synth-hardcase/contract.docx --mode replay
# → 0.1 s · $0 · findings: deviation 2 / compliant 16 · verifier skipped (the baseline has none)
```

## 5. The UI

```bash
pnpm dev                         # http://localhost:3000
```
With `REDLINER_LLM_MODE=replay` (the `.env.example` default) and no keys, every **sample contract** on the landing
page replays from the committed cache: the progress board, findings, verifier verdicts and memo arrive in seconds
and cost nothing; accept / edit / reject and export write a real `.docx`. Uploading your own file needs a key and
`REDLINER_LLM_MODE=live`. `/review/sample` renders a fixture with no backend at all.

## 6. Rebuild the dataset from scratch (optional)

```bash
pnpm fetch-cuad                  # downloads CUAD_v1 (≈ 80 MB) from GitHub
pnpm build-dataset               # 8 CUAD contracts → data/contracts/cuad-*
pnpm synth --seed 11 --count 3 && pnpm synth --hardcase
```
Gold files are committed; `scripts/label-assist.ts` regenerates the LLM drafts (needs `OPENAI_API_KEY`), and
`data/contracts/LABELING.md` describes how the human-confirmed labels were produced.

## 7. Live re-run of everything (needs both keys)

```bash
pnpm eval --all --live --judge live     # ≈ 4.5 h wall-clock, ≈ 275 (≈ 210 of Claude Opus 5 calls across the eight configs + ≈ 65 of GPT-5.6 judge calls) USD
```

## 8. Trajectories

```bash
pnpm export-trajectories --config b1-prompt --contracts synth-hardcase
pnpm export-trajectories --all-final       # b1-prompt + final, all 12 contracts
pnpm export-human-sessions                 # review decisions → trajectories/human
pnpm export-coding-traces                  # harness + lead traces, with redaction
pnpm render-docs                           # result-backed README/changelog values + docs/results.md
```

For a local product run, use `pnpm export-trajectories --run <runId>`; add `--contract <id>` only to override
its destination label. Each app export includes the redacted raw JSONL, final run and findings, an exact-system-prompt
appendix, and a seq-linked narrated `README.md`. Missing campaign directories fail explicit exports instead of
silently creating evidence. Coding transcripts over 50 MB are skipped and identified in their generated index.

## 9. Versions

| Component | Version |
|---|---|
| macOS (development) / Debian bookworm (Docker image `node:22-bookworm-slim`) | 26.5.2 / 12 |
| Node.js | 22.22.3 |
| pnpm | 10.15.0 (pinned in `package.json` `packageManager`) |
| TypeScript / tsx / vitest | 5.9.3 / 4.23.12 / 4.1.11 |
| Next.js / React / Tailwind | 16.3.3 / 19.2.8 / 4.3.3 |
| `@anthropic-ai/sdk` (Claude Opus 5: drafter, verifier, planner, memo, baselines) | 0.122.0 — model id `claude-opus-5` |
| `openai` (GPT-5.6 Sol: independent judge, gold-label drafting) | 7.8.0 — model id `gpt-5.6-sol` |
| `jszip` / `@xmldom/xmldom` / `diff` / `zod` / `yaml` | 3.10.1 / 0.9.12 / 9.0.0 / 4.5.2 / 2.9.0 |
| LibreOffice (integrity check, PDF render; optional) | 26.8.0.3 |
| Docker (optional) | 28.3.2 |

Model outputs are pinned by the replay cache (`evals/cache/**`), so the numbers do not depend on the models still
behaving the same way; a live re-run (§7) is expected to land within about ±1 pp macro F1 of the committed results
(see "run-to-run variance" in `IMPROVEMENT_CHANGELOG.md`).
