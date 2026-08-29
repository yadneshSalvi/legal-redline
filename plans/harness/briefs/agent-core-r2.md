# Revision 2: agent core — required fixes from the adversarial review

Your session context is retained. An independent reviewer (GPT-5.6 at max) probed the pipeline and returned `revise` (correctness 4/10,
contract compliance 3/10). Full report: `plans/harness/reports/20260829-234850-review-agent.md`. Fix everything below, add the regression tests
the reviewer listed, and re-run the gates and the live smoke. Note: the dataset builder regenerated `data/contracts/synth-*` (paragraph
splitting changed) — re-record the smoke on the **current** files and store the cache under `evals/cache/smoke/<contractId>/`.

## Required fixes (all of them)

1. **Replay determinism + hard failure** (`llm.ts:98/221/322`, `orchestrator.ts:126`). In `replay` mode a cache miss must throw a typed
   `ReplayCacheMiss` that propagates out of `runReview` (workers must not catch it into `needs_review`; only genuine tool/LLM runtime errors are
   downgraded). Tool handlers are deterministic on the same `DocumentModel`, so re-executing them in replay is acceptable — but assert it: record
   each tool result's sha256 alongside the cached response and, on replay, compare; a mismatch throws `ReplayDrift` with the tool name and rule.
   Document this in a short comment and in `EVAL.md` §6 (one sentence: "tool results are re-executed and hash-checked"). Test: replay of a recorded
   run yields byte-identical findings; a deliberately removed cache file makes `runReview` throw `ReplayCacheMiss`.
2. **`pause_turn`** (`llm.ts:146/319`): append the paused assistant content and continue; if iterations are exhausted while paused, throw. Test with a scripted fake.
3. **Deterministic checks gate every status** (`verifier.ts:129`): when the drafter says `compliant`, run the rule's `checks` against the *original* clause text
   (a compliant clause must already satisfy them, e.g. "12 months" present, "revocable at discretion" absent); a failed applicable check → verifier
   fail → repair round with the check result as feedback → `needs_review` if unresolved. Test: three-month cap labelled compliant → not `pass`.
4. **Config fidelity** (`configs.ts`, `orchestrator.ts:161/208`, `monolith.ts:41`): `b1-prompt` and `b0-chat` = exactly one model call for findings
   (b0 keeps its cheap extraction call — document it in the config description and stats) and a **deterministic memo** rendered from the findings
   (template, no LLM); `x-monolith` = one tool loop for all rules using the *same* `tools.ts` invariants (verbatim anchors, quote length, paragraph ids,
   proposal presence, exactly one `submit_finding` per rule) and **no separate verifier** (it is the "everything in one agent" experiment) — it may
   self-check inside its loop only. Update `CONFIGS` descriptions accordingly. Test: call counts per config on a fake client.
5. **Checkpoints** (`orchestrator.ts:152/157/176`): persist `run.json` after every finding for single-prompt and monolith configs too (map baseline
   findings one at a time; expose monolith submissions to the orchestrator as they happen). Test: snapshots observed at 1 and 2 findings.
6. **Decision validation** (`app/api/runs/[id]/decisions/route.ts`): zod-validate the whole batch against the `Decision` contract (`RedlineOp`
   discriminated union; `edit` requires ops/comment; finding ids must exist) **before** any mutation or trajectory write; reject the batch with 400
   and a precise message otherwise. Test: `ops: ["not-a-redline-op"]` → 400, nothing persisted.
7. **Precedent promotion** (`apply.ts:16/36`, `memory.ts:59`): promote only after `applyRedlines` + `validateDocx` succeed; serialize index updates
   through one in-process queue per store key (and a read-modify-write with retry on Blob). `clauseAfter` stores the full rendered post-edit clause,
   not the replacement fragment. Test: failed apply → no precedent; two concurrent promotions → both stored.
8. **Samples on Vercel** (`app/api/samples/route.ts`, `app/api/runs/route.ts`): one packaged sample repository (metadata + bytes from
   `data/contracts/*` bundled with the function via `outputFileTracingIncludes` in `next.config.ts` or an import-time manifest) used by both GET and
   POST regardless of the selected Store. Test with `VERCEL=1` and no blob token: GET lists N, POST of each id → 201.
9. **SSE ownership across instances** (`stream/route.ts:24/76`): add a `lease { owner, heartbeatAt }` to `run.json` updated every 10 s by the executing
   process; a stream request that finds a run `running` with a fresh lease (< 60 s) but no local owner **polls `run.json` every 2 s** and emits
   `finding`/`stats`/`status` events derived from the persisted state until terminal; a stale lease (≥ 60 s) lets the new instance take over and
   resume from the persisted findings (skip completed rules). Document the limitation honestly in `SCHEMA.md` §6 (single-instance execution, polling
   fallback). Test: persisted running run with no local owner → stream polls and closes on terminal status.
10. **Playbook id resolver** (`loader.ts:10`, `runs/route.ts:26`): HTTP routes resolve ids only against `data/playbooks/<id>.yaml` after a strict id
    regex; explicit paths only for CLI; unknown id → 404 with a generic message. Test: `playbookId=./package.json` → 404.
11. **Redaction** (`trajectory.ts:21`): redact only credential-shaped values (`sk-…`, `Bearer …`, keys named `api_key`/`apiKey`/`authorization`/
    `x-api-key`), never `max_tokens`/`*_tokens`. Test: usage fields survive; an `sk-` value is redacted.
12. **appendLine atomicity** (`store/fs.ts:52`, `blob.ts:37`, `memory.ts:23`): fs → `appendFile` with `flag: "a"` and a per-key promise chain; memory →
    per-key promise chain; blob → per-key promise chain with read-modify-write and one retry. Test: 50 concurrent appends → 50 lines in order.

## Also (reviewer suggestions — do them, they are cheap)
- Idempotent `human_decision` events (decisions route vs apply): emit once per decision id.
- `stats.startedAt` set when execution begins; keep `createdAt` for queue time.
- Add the regression tests listed above under `tests/agent/**` (network-free, fake client).

## Gates
`pnpm typecheck && pnpm lint && pnpm test` clean. Live smoke (record mode, current files):
`pnpm review data/contracts/synth-12/contract.docx --config i3-verifier --mode record --cache-dir evals/cache/smoke/synth-12 --accept-all`
then `--mode replay` twice → identical `findings.json` (paste sha256 of both), then delete one cache file and show `ReplayCacheMiss`.
Also run `pnpm baseline data/contracts/synth-12/contract.docx --mode record --cache-dir evals/cache/smoke/synth-12-b1` and confirm `llmCalls = 1`.
No `pnpm add`. Atomic writes. No git. Do not run `next dev`.

## Report (FINAL message structure — exactly)
```
## Summary
## Fixes   (1–12 + suggestions, each: what changed + which test proves it)
## Test results
## Live smoke   (commands, durations, costs, findings by status, replay hashes, ReplayCacheMiss demo, baseline llmCalls)
## Known gaps / risks
```
