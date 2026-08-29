# Review brief: agent core + API   (GPT-5.6 Sol at max · adversarial, read-only)

You are an independent, adversarial reviewer. Do not fix anything; find what is wrong and prove it.
Repo: `/Users/yadneshsalvi/code/hackathons/legal-redline`. Scope: `src/agent/**`, `src/store/**`, `src/playbook/loader.ts`,
`app/api/**`, `scripts/{review,baseline,export-trajectories}.ts`, `data/precedents/seed.json`, `tests/agent/**`.
Contracts: `SCHEMA.md` (all), `src/agent/types.ts`, `src/engine/types.ts`, `EVAL.md` §5–6, `AGENTS.md`, `PLAYBOOK.md`,
`plans/harness/refs/claude-api-ts-README.md`, `plans/harness/refs/claude-api-ts-tool-use.md`, `plans/harness/refs/claude-prompt-caching.md`.
The builder's report is at `plans/harness/reports/20260829-231418-agent-core.md` — read it, then verify every claim yourself.

## What to verify (run commands; do not trust the report)
1. `pnpm typecheck && pnpm lint && pnpm test -- tests/agent` — paste the summary.
2. Read `src/agent/llm.ts` against the SDK docs in `plans/harness/refs/`: model id exactly `claude-opus-5`; no `budget_tokens`,
   no prefill, no `temperature`; `output_config.effort`; structured outputs via `messages.parse` + `zodOutputFormat`; tool loop
   correct (`betaZodTool` + `toolRunner`, or a manual loop that returns **all** tool results in one user message and handles
   `stop_reason` `max_tokens` / `refusal` / `pause_turn`); `cache_control` only on byte-stable blocks (grep the prompts for
   `Date`, `nanoid`, run ids — any of these in the cached prefix is a defect); retries/backoff on the typed errors; cost table.
3. Replay cache: request hash is canonical (sorted keys), the cache stores enough to replay tool loops deterministically,
   `replay` mode fails loudly on a miss. Run the builder's recorded smoke in replay (`--mode replay`) and diff findings.
4. Tools (`src/agent/tools.ts`): `propose_redline` really calls the engine's `validateOp` per op when `config.toolValidation`
   is true and returns actionable errors; `submit_finding` enforces `quote ≤ 600 chars`, paragraph ids exist, proposal present for
   deviation/missing; handlers never throw; every call produces `tool_call`/`tool_result` trajectory events.
5. Orchestrator: workers run with `p-limit(concurrency)`; a throwing worker becomes a `needs_review` finding and the run still
   completes; `run.json` persisted after every finding; `ProgressEvent`s emitted in the documented shapes; stats sum correctly
   (compare with the trajectory usage totals); verifier runs in a fresh context (must not include the drafter's messages);
   repair feedback goes to the drafter's loop; exhausted repairs → `needs_review`.
6. Configs: each `ConfigId` flips only what `EVAL.md` §5 / `plans/00_master_plan.md` §2.2 says; `b1-prompt` uses one call +
   naive apply; `b0-chat` has no playbook; `x-monolith` is one loop for all rules.
7. `applyDecisions`: only accepted/edited findings are applied; one comment per finding anchored correctly; `validateDocx`
   runs; precedents promoted with provenance; `human_decision` events written.
8. API routes: invoke handlers directly (construct `Request` objects): `POST /api/runs` with a `.txt` and with a `.docx`;
   `GET /api/runs/[id]`; the SSE route sets `maxDuration = 800`, `dynamic = "force-dynamic"`, streams `data:` lines, supports
   `?after=`; decisions merge; `apply` returns output keys; file routes set content types; no secrets in responses; upload limits.
9. Store: fs implementation writes atomically; blob implementation guarded by the token; `createStore()` selection logic.
10. Code hygiene: `any`, files > 400 lines, direct SDK calls outside `llm.ts`, logging of prompts containing keys.

## Hold the bar consistently
- Required fixes only for genuine defects/blockers (wrong API usage that will fail or silently degrade, non-reproducible replay,
  validation gaps, unfair baseline implementations, broken routes, secrets). Polish → suggestions.
- Quote evidence: file:line, command output.

## FINAL message must be exactly this JSON (no prose outside the block)
```json
{
  "verdict": "approve" | "revise",
  "required_fixes": [{"where": "file:line", "what": "…", "why": "…", "how": "…"}],
  "suggestions": ["…"],
  "evidence": ["…"],
  "score": {"correctness": 0-10, "contract_compliance": 0-10, "quality": 0-10}
}
```
