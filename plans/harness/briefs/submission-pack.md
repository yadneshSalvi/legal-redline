# Brief: submission pack — trajectory narrator, changelog/README renderer, coding-agent trace export   (GPT-5.6 Sol · backend build)

You are a senior TypeScript engineer on **Playbook Redliner** (read `AGENTS.md`, `EVAL.md` §7, `trajectories/README.md`, `IMPROVEMENT_CHANGELOG.md`,
`README.md`, `REPRODUCE.md`, `src/agent/types.ts`, `src/eval/report.ts`, `scripts/export-trajectories.ts`). Repo: `/Users/yadneshsalvi/code/hackathons/legal-redline`.
The hackathon's final deliverables are (1) code + README with a labelled Improvement Changelog tied to evidence, (2) a reproduction guide, (3) a ≤5-min video,
(4) **agent trajectories for every agent used — easy to follow from instructions to result, showing tool responses, feedback, retries and human checkpoints**.
Everything you build here must be deterministic and runnable by judges.

## Scope
1. **Trajectory narrator** — `scripts/export-trajectories.ts` gains a `README.md` per exported run (`trajectories/app/<config>/<contractId>/README.md`):
   a deterministic Markdown walk-through generated from `trajectory.jsonl` + `run.json`: header (contract, config, parties, playbook, wall clock, calls,
   tokens, cost); "How to read this"; a stage timeline (ingest → planner → drafters → verifier → assembler → memo → human → apply) with per-stage counts;
   **one section per rule** in playbook order: the drafter's instructions (system prompt reference + the rule text as sent), each tool call and a
   trimmed tool result (≤ 400 chars), `propose_redline` validation outcomes, the submitted finding, the verifier's verdict/reasons and any repair feedback,
   the human decision (if any) and the applied ops; then the memo call and the apply/validation report. Include seq numbers so readers can jump to the raw
   JSONL line. Secrets stay redacted. Also write `trajectories/app/<config>/<contractId>/prompts.md` with the exact system prompts used (from the first
   `llm_request` of each agent). Add `--config <id> --contracts <ids>` to export from `evals/runs/<config>/<contractId>/` (the campaign output) and
   `--all-final` to export `final` + `b1-prompt` for all 12 contracts; keep the per-run mode. Tests: narrator on a fixture trajectory (snapshot).
2. **Changelog/README renderer** — `scripts/render-docs.ts` (`pnpm exec tsx scripts/render-docs.ts`): reads `evals/results/*.json` and replaces the
   `{{…}}` placeholders in `README.md` and `IMPROVEMENT_CHANGELOG.md` with rendered tables/values. Keep the prose; only fill placeholders and the
   changelog table cells ("Evidence" column: `F1 macro · validity · hallucination · $/contract`). Never invent a number: a missing config leaves the
   placeholder and prints a warning. Also render `docs/results.md` (full per-contract tables) from the results.
3. **Coding-agent trace export** — `scripts/export-coding-traces.ts`: copies the Codex JSONL event logs (`plans/harness/logs/*.codex.jsonl`), Opus SDK logs
   (`*.opus.log`), the harness reports (`plans/harness/reports/*.md`) and briefs into `trajectories/coding-agents/{codex,opus,reports,briefs}/`, **redacting**
   anything matching `sk-[A-Za-z0-9_-]{8,}`, `Bearer …`, `vercel_blob_rw_…`, `BLOB_READ_WRITE_TOKEN=…`, `ANTHROPIC_API_KEY=…`, `OPENAI_API_KEY=…`, and absolute
   home paths (`/Users/yadneshsalvi` → `~`). Write `trajectories/coding-agents/INDEX.md` listing each session (label, model, harness, started, duration, cost when
   known, brief → report) in chronological order, and a paragraph explaining the orchestration (lead = Claude Fable 5 in Claude Code; builders/reviewers = GPT-5.6
   Sol via Codex CLI and Claude Opus 5 via Claude Agent SDK; review loops). Also export the lead's Claude Code session transcript if present at
   `~/.claude/projects/-Users-yadneshsalvi-code-hackathons-legal-redline/*.jsonl` into `trajectories/coding-agents/claude-code/` with the same redaction
   (skip files > 50 MB and say so in INDEX.md).
4. **Human review sessions** — `scripts/export-human-sessions.ts`: for runs whose `decisions` are non-empty, write `trajectories/human/<runId>.json`
   (`{ runId, contractId, config, decisions[], counts: { accept, edit, reject }, reviewer, at }`) and make `src/eval/metrics.ts`' human-review-load metric read them.
5. Add all three to `package.json` scripts (`export-trajectories` exists; add `render-docs`, `export-coding-traces`, `export-human-sessions`) and to `REPRODUCE.md` §"Trajectories".

## Gates
`pnpm typecheck && pnpm lint && pnpm test` clean; run the narrator on `evals/runs/b1-prompt/synth-hardcase` and on `data/runs/W6aXqNXLJrTHid` (i3-verifier) and
paste the first 40 lines of each README. Do not modify prompts, tools, playbook or contracts. No `pnpm add`. Atomic writes. No git.

## Report (FINAL message structure — exactly)
```
## Summary
## Files
## Sample output   (first 40 lines of two narrated READMEs; INDEX.md head)
## Test results
## Known gaps / risks
```
