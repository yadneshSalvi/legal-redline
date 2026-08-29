# Brief: agent core r3 — per-finding cost/time, short section references, run-summary hygiene   (GPT-5.6 Sol · backend build, isolated worktree)

You are a senior TypeScript engineer on **Playbook Redliner** (see `AGENTS.md`). You are working in an isolated git worktree
(`/Users/yadneshsalvi/code/hackathons/legal-redline-wt/agent-r3`, branch `wt/agent-r3`) because an evaluation campaign is running from the main
checkout. **Hard constraint: do not change any prompt text, tool names, tool schemas, model ids, effort levels or request shapes** — the replay
caches being recorded right now are keyed on them (`SCHEMA.md` §4, `EVAL.md` §6). Everything below is additive metadata or deterministic post-processing.

## Read first
`AGENTS.md`, `SCHEMA.md`, `src/agent/types.ts`, `src/agent/orchestrator.ts`, `src/agent/drafter.ts`, `src/agent/tools.ts`, `src/agent/assembler.ts`,
`src/engine/types.ts` (sections), `src/ui/FindingCard.tsx` + `src/ui/workspace/DocBar.tsx` (how the UI consumes `Finding`), the UI builder's notes in
`plans/harness/reports/20260829-231420-ui-workspace.md` §Known gaps items 1 and 7.

## Scope
1. **Contract change** (`src/agent/types.ts`): add optional `costUsd?: number` and `durationMs?: number` to `Finding` (per-rule figures: the drafter
   loop + its verifier/repair rounds), and `perRule?: Record<string, { costUsd: number; durationMs: number; llmCalls: number; retries: number }>` to
   `ReviewRun.stats`. Populate them in the orchestrator for every config (baselines: split the single call's cost evenly across produced findings and
   record the total under `perRule["*"]`). Persist in `run.json`; emit in the `finding` SSE event (already carries the Finding). Update `SCHEMA.md`
   §7 wording if needed.
2. **Short `sectionRef`** derived deterministically in the tools/assembler layer from `paragraphIds` → enclosing `Section`: `"§ 14.2 Intellectual
   Property"` = section number (if any) + heading (≤ 60 chars, ellipsis) — never a sentence; for `missing` findings with no paragraph, use the
   planner's suggested insertion section or `"§ —"`. Do this as post-processing of the submitted finding (do not change the `submit_finding` schema).
3. **UI reuse of the engine diff**: change `src/ui/lib/redline.ts` to import `wordDiff`/`renderParagraph` from `@/src/engine/diff` (pure module) so the
   preview matches the docx grouping; keep the UI-only fallback for `insert_after`/`delete_paragraph` rendering. Verify the module has no Node-only
   imports (it must run in the browser); if it does, split the pure diff into `src/engine/diff-core.ts` and import that.
4. **UI card**: show `cost · time` on the card when present (`FindingCard.tsx`), `—` otherwise; no other visual changes.
5. Tests: orchestrator populates `perRule` and per-finding figures on the fake client; `sectionRef` derivation unit tests (numbered section, unnumbered
   heading, table paragraph, missing finding); a vitest asserting `src/ui/lib/redline.ts` output equals `renderParagraph` for three cases.

## Gates
`pnpm typecheck && pnpm lint && pnpm test` clean in the worktree. No `pnpm add`. Atomic writes. No git commit/push (the lead merges `wt/agent-r3`).

## Report (FINAL message structure — exactly)
```
## Summary
## Files
## Test results
## Cache-safety statement   (explicit confirmation that no prompt/tool/request shape changed; list every file touched under src/agent)
## Known gaps / risks
```
