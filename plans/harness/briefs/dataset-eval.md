# Brief: evaluation dataset + metrics + independent judge + eval runner   (GPT-5.6 Sol · backend build)

You are a senior TypeScript engineer on **Playbook Redliner**, a micro1 Agentic Workflows Hackathon entry
(agentic contract redlining with human approval). Repo: `/Users/yadneshsalvi/code/hackathons/legal-redline`
(work in the repo root; other agents work concurrently in `src/engine`, `src/agent`, `app/` — do not touch those).
The hackathon scores **Measured Improvement** and **Reproducibility** (30 of 100 points) on what you build here;
judges will run `pnpm eval` from a clean clone and expect every number in the changelog to reproduce at zero cost.

## Read first (mandatory)
1. `AGENTS.md`, then **`EVAL.md`** (the contract for everything below — implement it literally)
2. `PLAYBOOK.md`, `data/playbooks/customer-vendor-services.yaml`, `src/playbook/schema.ts` (rule ids, CUAD mapping, checks)
3. `SCHEMA.md` (§3 store, §4 LLM client modes, §5 baselines/configs), `src/agent/types.ts`, `src/engine/types.ts`, `src/engine/text.ts`
4. `data/raw/cuad/CUADv1.json` is already downloaded (SQuAD format: `data[].title`, `paragraphs[0].context` = full contract text,
   `paragraphs[0].qas[]` with `question` containing the category in quotes, `answers[] {text, answer_start}`). CUAD is CC-BY-4.0
   (The Atticus Project) — add attribution in `data/contracts/README.md`.

## Goal
Build the 12-contract evaluation set with gold labels, the synthetic generator with a fixed seed and a deterministic hard case,
the matching + metrics module, the independent GPT-5.6 judge, the eval runner (replay-by-default) and the report generator.

## Scope (exactly this)
- `scripts/fetch-cuad.ts` — downloads `https://github.com/TheAtticusProject/cuad/raw/main/data.zip` to `data/raw/` and unzips
  (skip when `data/raw/cuad/CUADv1.json` exists). Use only Node built-ins + `jszip`.
- `src/eval/cuad.ts` — load CUAD; select contracts by title substrings from the EVAL.md shortlist (implement the 8 primary picks;
  keep alternates behind a list); **text canonicalisation** for PDF-extracted text: normalise whitespace, join hard-wrapped lines into
  paragraphs, keep blank-line paragraph breaks, start a new paragraph at numbered clause starts (`^\s*(\d+(\.\d+)*|\([a-z]\)|[A-Z]\.)\s`)
  when the previous line ends a sentence, drop page-number/`Source:` boilerplate lines; then `splitParagraphs` → paragraph ids.
  Map every CUAD answer span (for categories used in the playbook `cuad` fields) to paragraph ids by tolerant text search
  (`normalizeForMatch`; try full span, then the first 120 chars, then the longest sentence) — record unmatched spans in `meta.json`.
- `scripts/build-dataset.ts` — writes `data/contracts/cuad-<slug>/{contract.txt, gold.draft.json, meta.json}` and, when
  `@/src/engine` exports `textToDocx` (built concurrently by another agent), `contract.docx`; otherwise print a clear notice and
  support `pnpm build-dataset --docx-only` to add the docx later. `meta.json` per EVAL.md §1 (`ourParty` initially `null`).
- `scripts/label-assist.ts` — for each contract: one OpenAI `gpt-5.6-sol` call (`reasoning: { effort: "high" }`, structured JSON via
  `response_format`/zod) that reads the contract text + the playbook rules and returns: the parties and which one is the
  customer/licensee/client side (`ourParty`), for every CUAD-mapped span a `status` (deviation | compliant) with a one-line `note`
  and `expectedFix`, and for `missing`-kind rules (INDEMN, INSURANCE, TRANSITION, T4C, WARRANTY) whether the clause is absent
  (`missing`) — write `gold.draft.json` with `labeler: "cuad+llm-draft"` / `"llm-draft"`; a human will review and promote to `gold.json`
  (`scripts/label-assist.ts --promote <id>` copies draft → gold and stamps `labeler` `cuad+human` / `human`). Cache the judge/labeller
  calls under `evals/cache/labeling/` keyed by request hash (same scheme as EVAL.md §6).
- `data/templates/msa-clean.md` — a realistic, **playbook-compliant** Master Services Agreement between "Northwind Analytics, Inc."
  (Customer) and "Brightline Cloud Services Ltd." (Vendor): ~30 numbered sections (definitions, services, orders, fees, term & termination
  incl. Customer T4C at 30 days, renewal 12 months with 30-day opt-out, IP with Customer ownership of deliverables, Customer Data,
  confidentiality, warranties 90 days, indemnities, LoL mutual 12 months' fees with carve-outs, insurance, audit once/12 months,
  assignment with affiliate/M&A carve-out, transition assistance, governing law New York, general), ~4,500 words, plain text,
  blank lines between paragraphs, headings numbered `N.` and sub-clauses `N.M`. Write it like a lawyer would.
- `src/eval/deviations.ts` — for each playbook rule ≥ 2 deviation variants: `{ ruleId, name, apply(doc paragraphs) → { paragraphIds,
  status, expectedFix, note } }` that rewrites or deletes the compliant text (e.g. LOL-CAP → "3 months' fees" one-sided; GOVLAW → "laws of
  the Cayman Islands … arbitration in George Town"; T4C → delete Customer right + add Vendor 30-day convenience right; INSURANCE → delete
  section; etc.). Also the hard-case constructs from EVAL.md §1 (a)–(e).
- `scripts/synth.ts` — `pnpm synth --seed 11 --count 3` picks 6–9 rules per contract with a seeded PRNG (mulberry32), applies one
  variant each, renames parties per seed, writes `data/contracts/synth-<seed>/{contract.txt, contract.docx?, gold.json, meta.json}`;
  `pnpm synth --hardcase` writes `synth-hardcase` deterministically (no randomness). Same seed → byte-identical output (test it).
- `src/eval/gold.ts` (zod schema + loader), `src/eval/match.ts` (EVAL.md §3, one-to-one matching by confidence), `src/eval/metrics.ts`
  (§4: detection P/R/F1 macro+micro, deviation accuracy, redline validity components, minimality ratio, citation-hallucination scan of
  rationale/comment/memo against `doc.sections`, cost/latency aggregation), `src/eval/judge.ts` (OpenAI `gpt-5.6-sol`, structured JSON,
  cached under `evals/cache/judge/<hash>.json`, modes live|record|replay like `LlmClient`), `src/eval/integrity.ts` (apply all TP proposals via
  `@/src/engine` `applyRedlines` + `validateDocx`), `src/eval/runner.ts` (per config × contract: load doc via engine `parseDocx`, build
  `ReviewRun`, call `runReview` from `@/src/agent` with `createLlmClient({ mode, cacheDir: evals/cache/<config>/<contractId> })`, write
  `evals/runs/<config>/<contractId>/{findings.json, trajectory.jsonl, stats.json}`, compute metrics), `src/eval/report.ts` (§7 outputs;
  `summary.md` with a table config × metric, per-contract table, hard-case section, and a "resources" table of calls/tokens/cost).
- `scripts/eval.ts` — `pnpm eval [--config <id>|--all] [--contracts a,b] [--live] [--allow-live] [--judge live|replay] [--concurrency 3]`;
  `scripts/report.ts`.
- `tests/eval/**`: matching edge cases (compliant flagged → FP; needs_review ignored; one-to-one), metrics on hand-built findings with
  expected numbers, synth determinism, gold schema validation, citation scanner, CUAD canonicalisation on a nasty PDF-text sample,
  runner with a **fake pipeline** injected (so tests never call the network).
- Integration with the concurrently-built agent: import `{ runReview, getConfig, CONFIGS, createLlmClient, createTrajectoryWriter }`
  from `@/src/agent` and `{ createStore }` from `@/src/store` per SCHEMA.md; if the module is not present yet when you need to run,
  poll every 60 s (max 45 min) and meanwhile finish everything else. Never implement agent/engine functions yourself.

## Acceptance criteria
- `pnpm build-dataset` and `pnpm synth --seed 11 --count 3 && pnpm synth --hardcase` produce the 12 contract folders (docx present when
  the engine is available); `pnpm label-assist` (add the script to package.json is NOT allowed — expose it as `pnpm exec tsx scripts/label-assist.ts`)
  produces drafts for all 8 CUAD contracts using the OpenAI key from `.env` (load with `dotenv`).
- `pnpm typecheck && pnpm lint && pnpm test` clean.
- `pnpm eval --config b1-prompt --contracts synth-hardcase --live` runs end-to-end once the agent module exists (report what happened).

## Engineering rules
- Do NOT run `pnpm add`; installed: `zod`, `yaml`, `jszip`, `openai`, `dotenv`, `commander`, `p-limit`, `diff`. Report anything missing.
- Deterministic everything: seeded PRNG, sorted keys when hashing, fixed ordering of contracts and rules.
- Secrets only via `process.env` in `scripts/**` and `src/eval/judge.ts`; never print them.
- Atomic writes; no git.

## Report (FINAL message structure — exactly)
```
## Summary
## Files
## Dataset status   (per contract: words, paragraphs, gold items by status, unmatched spans, ourParty)
## Test results
## Design notes
## Known gaps / risks
```
