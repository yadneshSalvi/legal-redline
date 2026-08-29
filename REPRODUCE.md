# Reproduction guide

Written for someone starting from a clean machine. Every number in `IMPROVEMENT_CHANGELOG.md` reproduces **without
API keys** from the committed replay cache; live re-runs need keys and cost money (figures below).

## 0. Requirements

| Tool | Version used | Notes |
|---|---|---|
| Node.js | 22.x | `node --version` |
| pnpm | 10.15 | `corepack enable && corepack prepare pnpm@10.15.0 --activate` |
| Git | any | |
| LibreOffice (optional) | 25.x | only for the "opens in LibreOffice" integrity check and PDF rendering; the eval records it as skipped when absent |
| Docker (optional) | 28.x | `docker build -t redliner . && docker run --rm redliner pnpm eval --all` runs the whole evaluation in a clean container |

## 1. Install

```bash
git clone {{REPO_URL}} playbook-redliner && cd playbook-redliner
pnpm install --frozen-lockfile
cp .env.example .env            # leave keys empty for replay mode
pnpm typecheck && pnpm test     # ~{{TEST_RUNTIME}} s, no network
```

## 2. Reproduce the evaluation (zero cost, ~{{REPLAY_RUNTIME}})

```bash
pnpm eval --all                 # replays evals/cache → evals/results/<config>.json
pnpm report                     # → evals/results/summary.md + changelog-data.json
```

Expected: `summary.md` matches the tables in `IMPROVEMENT_CHANGELOG.md` byte-for-byte (the runs are deterministic in replay).

## 3. Run the solution on a contract

```bash
pnpm review data/contracts/synth-hardcase/contract.docx --config final --mode replay --accept-all
# → data/runs/<runId>/{run.json, trajectory.jsonl, output.docx, memo.md}
pnpm validate-docx data/contracts/synth-hardcase/contract.docx data/runs/<runId>/output.docx --pdf
```

Live (needs `ANTHROPIC_API_KEY`): drop `--mode replay`. Typical run on a 5k-word contract: {{LIVE_RUNTIME}} min,
{{LIVE_COST}} USD.

## 4. Run the baseline on the same contract

```bash
pnpm baseline data/contracts/synth-hardcase/contract.docx --mode replay
```

## 5. The UI

```bash
pnpm dev                         # http://localhost:3000
```
Open a sample from the landing page (replays are instant), or upload your own `.docx` (live; needs the key).
`/review/sample` renders a fixture with no backend at all.

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
pnpm eval --all --live --judge live     # ≈ {{LIVE_EVAL_RUNTIME}} h wall-clock, ≈ {{LIVE_EVAL_COST}} USD
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

{{VERSIONS_TABLE}}
