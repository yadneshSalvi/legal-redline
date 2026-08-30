# Brief: evidence pages — evaluation dashboard, trajectory viewer, precedent bank, run history polish   (Opus 5 · frontend build)

You are a senior product designer-engineer on **Playbook Redliner**, a micro1 Agentic Workflows Hackathon entry
(agentic contract redlining with human approval). Repo: `~/code/hackathons/legal-redline`.
Dev server port for you: **3102** (`pnpm dev -p 3102`). Other agents may be working in `src/engine`, `src/agent`, `src/eval`,
`app/api/**`, `scripts/**` — never edit those. The design system and the review workspace already exist (`src/tokens.ts`, `app/globals.css`,
`src/ui/**`, `app/review/**`) — reuse those components and patterns; do not restyle them.

These pages are how the judges *see* the evidence for 60 of the 100 rubric points: Agent Solution & Engineering (trajectories that make every
design choice visible), Measured Improvement (baseline vs iterations on the same contracts), Reproducibility (what to run), and End-to-End
Quality (it must look as finished as the workspace).

## Read first (mandatory, in this order)
1. `AGENTS.md`, `STYLE.md` (the law), `node_modules/next/dist/docs/` (Next 16 conventions)
2. `src/agent/types.ts` (TrajectoryEvent, Precedent, ReviewRun), `SCHEMA.md` §6–7, `EVAL.md` §4–7
3. `src/eval/report.ts` (the exact shape of `evals/results/changelog-data.json` — the `/api/evals` payload), `src/eval/metrics.ts`
4. `app/api/runs/[id]/trajectory/route.ts`, `app/api/precedents/route.ts`, `app/api/evals/route.ts`, `app/api/runs/route.ts`
5. The existing UI: `src/ui/**`, `app/review/[runId]/page.tsx`, `app/runs/page.tsx`, `app/page.tsx`; screenshots in `plans/harness/logs/ui-workspace-*.png`
6. `IMPROVEMENT_CHANGELOG.md` (structure of the story the evals page tells) and `plans/00_master_plan.md` §2.2 (config ladder)

## Goal
Ship four pages that read as one product with the workspace: `/evals`, `/trajectories/[runId]`, `/precedents`, and a polished `/runs`.

## Scope (exactly this)
- **`/evals` — Evaluation dashboard.** Data from `GET /api/evals` (fallback: a realistic fixture in `src/ui/fixtures/evals.ts` matching the
  report shape, clearly labelled "fixture" in a small chip when used). Sections: (1) headline strip — primary metric (issue-detection F1)
  baseline vs final with delta, redline validity, citation-hallucination rate, cost per contract; (2) the **config ladder** — a table with one
  row per config in the documented order (b0-chat → b1-prompt → i1 → i2 → i3 → i4 → x-monolith (marked "removed") → final) and columns for
  the metrics + calls/tokens/cost, the primary metric first, best value per column subtly emphasised (`verified.soft` wash), the official
  baseline and final rows distinguished; (3) a compact chart: F1 per config as a horizontal bar chart drawn in **inline SVG** (no charting
  lib for this), tokens/cost on a second small chart; (4) per-contract table (contracts × configs, F1) with the hard case row pinned and
  annotated; (5) "How to reproduce" block with the exact commands from `REPRODUCE.md` in a mono code block and a link to `evals/results/summary.md`
  on GitHub (`{{REPO_URL}}` placeholder constant). Empty state when no results yet: "Run `pnpm eval --all && pnpm report`".
- **`/trajectories/[runId]` — Trajectory viewer.** Data from `GET /api/runs/[id]` + `GET /api/runs/[id]/trajectory` (paginate with `?after=`;
  fixture fallback for `sample` derived from the workspace fixture — generate ~120 plausible events for it). Layout: left rail = agent/stage
  timeline (ingest → planner → drafters grouped by rule with pass/repaired/fail badges → verifier → assembler → memo → human → apply) with
  counts, cost and duration per stage; main = a virtualised (windowed) list of events, each a compact row: seq · time offset · agent chip ·
  type icon · title; expandable to show the payload — prompts/messages rendered as readable blocks (system / user / assistant, tool inputs
  as JSON with syntax tint using tokens only, tool results, validation reports, verifier feedback, human decisions). Filters: by agent, by
  rule, by type, text search; `?finding=<id>` deep link selects the finding's rule and scrolls to its first event; keyboard `J/K` and `Enter`.
  A "Copy as JSONL" button (clipboard). Cost/usage strip at the top (tokens in/out/cached, cost, retries, human checkpoints).
- **`/precedents` — Precedent bank.** `GET /api/precedents` (fixture fallback = `data/precedents/seed.json`, importable). Cards grouped by rule
  (rule title from `/api/playbooks`): source, level chip, before → after rendered as a word diff (reuse `RedlineText`), the comment, approved-by/at,
  tags; search box; a "used in N runs" count when available. Add precedent dialog (POST) with validation; delete with confirm (DELETE).
- **`/runs` polish** — make it the run history it should be: status chips, severity mini-bars, cost, config, "open" / "trajectory" links,
  empty state pointing to the landing page.
- Nav: highlight the active page; the top bar's "Sample contracts" menu should link to `/review/sample` and the three sample contracts.
- Components go in `src/ui/**` following the existing patterns (small, typed, tokens only). Fixtures in `src/ui/fixtures/`.

## Acceptance criteria (all must be true)
- Screenshots at 1440×900 of `/evals` (with fixture and, if `evals/results/changelog-data.json` exists, with real data), `/trajectories/sample`
  (collapsed, one event expanded, filtered by rule), `/precedents`, `/runs`; plus 1280 and 1920 checks. They must satisfy STYLE.md at first glance
  and look like the same product as `/review/sample`.
- Zero console errors/warnings; `pnpm typecheck && pnpm lint` clean; keyboard navigation works; no horizontal page scroll.
- Charts are legible, labelled, and use only tokens (navy for the final config, `ink.faint` for others, `deletion` for the removed experiment).

## Verification loop (mandatory — do not skip, do not shorten)
1. `agent-browser skills get core --full` once; `pnpm dev -p 3102`; viewport 1440×900; `--load networkidle`.
2. Screenshot each page to `plans/harness/logs/ui-evidence-<page>-pass<N>.png`, **Read the PNG**, critique against STYLE.md like a hostile design director.
3. `agent-browser console` / `errors` → zero. Exercise filters, expand/collapse, deep link, dialogs, keyboard.
4. Fix, re-run typecheck/lint, repeat. Minimum two full passes. Then 1280×800 and 1920×1080 checks.

## Rules
- Only STYLE.md tokens and fonts; no emoji; no new deps (`pnpm add` forbidden); `recharts` is installed but prefer inline SVG for these small charts.
- Client components `"use client"`; no `any`; files ≤ ~400 lines; atomic writes; do not modify files outside your scope (list incidental edits).
- No `git commit` / `git push`.

## Report (your FINAL message must follow this structure exactly)
```
## Summary
## Files
## Verification evidence   (screenshot paths + what each proves; console/errors status; typecheck/lint output)
## Known gaps / risks
## Suggestions for reviewer
```
