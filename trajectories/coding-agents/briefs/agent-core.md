# Brief: agent core — planner, drafter workers with validated tools, verifier, memory, trajectories, baselines, API   (GPT-5.6 Sol · backend build)

You are a senior TypeScript engineer on **Playbook Redliner**, a micro1 Agentic Workflows Hackathon entry
(agentic contract redlining with human approval). Repo: `~/code/hackathons/legal-redline`
(work in the repo root; other agents work concurrently in `src/engine`, `src/eval`, `app/` pages + `src/ui` — do not touch those).
This is the 30-point "Agent Solution & Engineering" item of the rubric: every design choice must be purposeful, observable in the
trajectory, and switchable by config so the changelog can measure it.

## Read first (mandatory — API facts, do not rely on memory)
1. `AGENTS.md`, `SCHEMA.md` (all sections), **`src/agent/types.ts`**, `src/engine/types.ts`, `src/engine/text.ts`
2. `PLAYBOOK.md`, `data/playbooks/customer-vendor-services.yaml`, `src/playbook/schema.ts`
3. `EVAL.md` §5–6 (configs, fairness, replay cache)
4. `plans/harness/refs/claude-api-ts-README.md`, `plans/harness/refs/claude-api-ts-tool-use.md`,
   `plans/harness/refs/claude-prompt-caching.md`, `plans/harness/refs/claude-agent-design.md`, `plans/harness/refs/claude-tool-use-concepts.md`
   — the Anthropic SDK 0.122 surface (structured outputs `client.messages.parse` + `zodOutputFormat`; `betaZodTool` + `client.beta.messages.toolRunner`;
   adaptive thinking; `output_config.effort`; `cache_control`; stop reasons incl. `refusal`; typed errors). Also `node_modules/@anthropic-ai/sdk` when unsure.
5. `node_modules/next/dist/docs/` for route handlers (Next 16 App Router; `export const maxDuration`, streaming `Response`).

## Goal
Implement the pipeline in `SCHEMA.md` end to end: `runReview` (planner → per-rule drafter workers with validated tools → independent
verifier with repair loop → assembler → memo), `applyDecisions` (engine apply + validation + precedent promotion), precedent memory,
trajectory logging of every step, the replayable `LlmClient`, all iteration configs (`b0-chat`, `b1-prompt`, `i1-docmodel`, `i2-workers`,
`i3-verifier`, `i4-memory`, `x-monolith`, `final`), the store abstraction, the HTTP API with SSE progress, and CLIs.

## Scope (exactly this)
- `src/playbook/loader.ts` — `loadPlaybook(id | path)`, `listPlaybooks()`, `ruleById`, `ruleSummary(rule)` (id/title/kind/summary),
  `ruleFull(rule)` (positions, detect, redline, model language, examples) — plain-text renderers used in prompts.
- `src/store/{index,fs,blob,memory}.ts` per SCHEMA §3 (`createStore()`; fs root `data/runs` + `data/precedents`; blob via `@vercel/blob`).
- `src/agent/pricing.ts` — `claude-opus-5` $5/$25 per MTok (cache read 10 %, cache write 125 %); `gpt-5.6-sol` $5/$30; cost helper.
- `src/agent/llm.ts` — `createLlmClient({ mode, cacheDir?, model?, onEvent })` implementing SCHEMA §4: Anthropic client (`maxRetries: 5`,
  timeout 10 min), `complete` (structured via `messages.parse` + `zodOutputFormat`, or text), `runTools` (use `client.beta.messages.toolRunner`
  with `betaZodTool`s; if per-turn control is needed, a manual loop is acceptable — either way every request/response/tool call becomes a
  trajectory event and usage accumulates), adaptive thinking (omit `thinking`), `output_config: { effort }`, `max_tokens: 16000` (streaming
  with `.stream().finalMessage()` if you go above), `cache_control: { type: "ephemeral" }` on the last frozen system block (system prompt + rule
  text must be byte-stable across calls — no timestamps/ids in the prefix), handle `stop_reason === "refusal"` and `max_tokens` explicitly,
  typed error handling (`RateLimitError`, `APIConnectionError`, `APIError`) with backoff. Replay cache per EVAL §6: sha256 of the canonical
  request (sorted keys) → `<cacheDir>/<hash>.json` storing the full response; `replay` mode errors clearly on a miss unless `allowLive`.
- `src/agent/trajectory.ts` — `createTrajectoryWriter(store, runId)`: `seq` monotonic, `appendLine` to `runs/<id>/trajectory.jsonl`,
  in-memory mirror for the SSE/UI; helper `event(agent, type, title, payload, …)`; secrets never logged.
- `src/agent/tools.ts` — the drafter tools of SCHEMA §5 as `betaZodTool`s bound to a `DocumentModel` + config (`list_sections`, `read_section`,
  `read_paragraphs`, `search`, `get_definition`, `lookup_precedent`, `propose_redline`, `submit_finding`). Handlers never throw; validation
  through `@/src/engine` `validateOp`/`validateComment`/`renderParagraph`; when `config.toolValidation` is false, `propose_redline` echoes ok
  without validating (that is the measured difference). `submit_finding` stores the finding in the worker state and returns ok; the loop ends when
  the model stops calling tools (instruct it to stop after submit).
- `src/agent/prompts/*.ts` — frozen prompt text: system prompts for planner/drafter/verifier/memo/baselines with the playbook tone; the drafter
  system prompt explains the tools, the verbatim-anchor rule, minimal-edit rule, direction reasoning (who is bound), quoting rule (≤ 600 chars),
  when to use fallback vs preferred, comment style (`[Playbook] …`), and that it must call `propose_redline` before `submit_finding` for
  deviations/missing clauses. Keep prompts concise and exact; put the rule text (`ruleFull`) and parties in the first user message, not the system prompt,
  except that the *playbook preamble* (party aliases, tone) is in the cached system block.
- `src/agent/planner.ts` (SCHEMA §5), `src/agent/drafter.ts` (one worker per rule; input = rule, plan hints, doc tools; output Finding; repair round
  = append `"Verifier feedback: …"` and continue the same loop), `src/agent/verifier.ts` (deterministic pre-checks from `rule.checks` + `validateOp` +
  minimality ratio → then the structured Claude call at `config.verifierEffort` in a fresh context: rule, original paragraphs, rendered redline
  text, resolved definitions referenced in the clause, comment → verdict/reasons), `src/agent/assembler.ts` (merge duplicates by rule+paragraph
  overlap, order by severity, `RunStats`, `bySeverity/byStatus`), `src/agent/memo.ts` (one structured call → Markdown memo: executive summary,
  table of findings with section refs, walk-away items, next steps), `src/agent/memory.ts` (precedent bank: `data/precedents/seed.json` +
  store index; `lookup(ruleId, context)` = same-rule precedents ranked by lexical overlap (Jaccard on normalised tokens), top 3; `promote(run, finding)`
  on accept/edit), `src/agent/baseline.ts` (`b0-chat`, `b1-prompt` exactly per SCHEMA §5 — the numbered-paragraph rendering of the whole document
  is `p0042: text`), `src/agent/monolith.ts` (`x-monolith`), `src/agent/configs.ts` (`CONFIGS`, `getConfig(id)`; defaults model `claude-opus-5`,
  effort `high`, verifierEffort `xhigh`, concurrency 6, maxRepairRounds 2), `src/agent/orchestrator.ts` (`runReview` — persists `run.json` after
  every finding; emits `ProgressEvent`s; `p-limit` concurrency; a failed worker yields a `needs_review` finding with the error, never a failed run),
  `src/agent/apply.ts` (`applyDecisions`: accepted + edited findings → `ApplyRequest` (ops + one comment per finding anchored to the first op's
  paragraph), engine `applyRedlines` + `validateDocx`, store `output.docx` + `memo.md`, `human_decision` trajectory events, promote precedents),
  `src/agent/index.ts` (exports: `runReview, applyDecisions, getConfig, CONFIGS, createLlmClient, createTrajectoryWriter, loadPlaybook`).
- `data/precedents/seed.json` — 20 realistic precedents across the rules (source names like "Acme Cloud MSA (Mar 2025)"), tagged `seed`.
- `app/api/**` — every route in SCHEMA §6 (`route.ts` files; `export const runtime = "nodejs"`; stream route `maxDuration = 800`, `dynamic =
  "force-dynamic"`, SSE via `ReadableStream` with `data: <json>\n\n` lines and a 15 s keep-alive comment; `?after=<seq>` replays buffered events
  for reconnects). Samples come from `data/contracts/*/meta.json` (+ `contract.docx`), playbooks from the loader, evals from `evals/results/changelog-data.json`
  (404 → empty). Uploads: accept `.docx` (parseDocx) and `.txt` (parseText); max 5 MB.
- `scripts/review.ts` — `pnpm review <file.docx|txt> [--config final] [--playbook id] [--party "Name"] [--accept-all] [--mode live|record|replay]
  [--cache-dir …]` runs the pipeline in-process with progress logging, writes `data/runs/<id>/…`; with `--accept-all` applies all verified
  findings and writes `output.docx` + `memo.md`. `scripts/baseline.ts` = same for `b1-prompt`. `scripts/export-trajectories.ts` per SCHEMA §7
  (redact any `sk-` tokens defensively).
- `tests/agent/**` (vitest, network-free): a `FakeLlmClient` with scripted responses; orchestrator happy path (findings persisted, events emitted,
  stats summed); tool validation rejects a non-verbatim anchor and the drafter recovers; verifier fail → repair round → pass; repair exhausted →
  `needs_review`; replay cache hit/miss behaviour; `applyDecisions` on a `textToDocx` document produces a docx with the expected number of
  changes (uses the real engine once `@/src/engine` exists — poll every 60 s up to 45 min if not there yet; meanwhile finish everything else);
  precedent lookup ranking; route handlers invoked directly (`POST /api/runs` with a `.txt`, `GET /api/runs/[id]`).
- **Live smoke (required, uses the real key from `.env` via `dotenv`)**: `pnpm review data/templates/msa-clean.md --config i3-verifier --mode record
  --cache-dir data/runs/smoke-cache --accept-all` (the template is being written concurrently by another agent; if absent, use any ~2k-word
  services-agreement text you write to `data/runs/smoke/input.txt`). Report duration, cost, findings by status, verifier verdicts, and paste 3
  representative trajectory lines. Fix what breaks. Do not run `next dev` (the UI agent owns the dev server); test routes via direct invocation.

## Acceptance criteria
- `pnpm typecheck && pnpm lint && pnpm test` clean.
- The live smoke completes with ≥ 1 verified deviation carrying a valid proposal, an `output.docx` that `validateDocx` accepts, a memo, a
  trajectory with `llm_request`/`llm_response`/`tool_call`/`tool_result`/`validation`/`human_decision` events and correct cost totals.
- Replaying the same run with `--mode replay` yields identical findings at zero cost.

## Engineering rules
- Do NOT run `pnpm add`; installed: `@anthropic-ai/sdk`, `openai`, `zod`, `yaml`, `nanoid`, `p-limit`, `dotenv`, `@vercel/blob`, `diff`, `jszip`.
- No `any`; named exports; files ≤ ~400 lines; ESM (`import.meta.url`, never `__dirname`).
- No `budget_tokens`, no assistant prefill, no `temperature`; never construct model ids with date suffixes.
- Prompts never contain timestamps, run ids or random values (cache + replay depend on it).
- Secrets only via `process.env` in `src/agent/llm.ts`, `src/store/blob.ts`, `app/api/**`, `scripts/**`. Atomic writes. No git.

## Report (FINAL message structure — exactly)
```
## Summary
## Files
## Test results
## Live smoke   (command, duration, cost, findings by status, 3 trajectory lines, validation report)
## Design notes (tool loop mechanics, caching layout, repair loop, memory ranking, SSE)
## Known gaps / risks
```
