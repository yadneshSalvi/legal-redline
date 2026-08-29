# Status — Playbook Redliner (lead: Fable 5). Update at every gate.

## Timeline
- Sat 2026-08-29 22:00 IST — idea evaluated; research done; harness copied from hearth and smoke-tested (codex READY / opus OK).
- Sat 23:10 — master plan + contracts written (`plans/00_master_plan.md`, AGENTS/STYLE/SCHEMA/PLAYBOOK/EVAL, `src/engine/types.ts`,
  `src/agent/types.ts`, `src/playbook/schema.ts`, playbook YAML validated: 18 rules / 18 checks). CUAD downloaded to `data/raw/cuad`.
- Sat 23:45 — foundation commit `b2c5d55`; **Phase 1 launched** (4 agents in parallel, all in repo root, disjoint dirs):
  - `engine` (Sol xhigh) → `src/engine/**`, `tests/engine`, `scripts/validate-docx.ts`
  - `dataset-eval` (Sol xhigh) → `src/eval/**`, `scripts/{fetch-cuad,build-dataset,synth,label-assist,eval,report}.ts`, `data/templates`, `data/contracts`
  - `agent-core` (Sol xhigh) → `src/agent/**`, `src/store/**`, `src/playbook/loader.ts`, `app/api/**`, `scripts/{review,baseline,export-trajectories}.ts`, `data/precedents/seed.json`
  - `ui-workspace` (Opus xhigh, port 3101) → `src/tokens.ts`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/review/[runId]`, `app/runs`, `src/ui/**`
- LibreOffice: `brew install --cask libreoffice` running in background (log `data/raw/libreoffice-install.log`).

- Sat 23:34 — `engine` landed (20 min, 12 tests). Lead smoke: OOXML correct (w:ins/w:del/comments; LibreOffice PDF + docx round-trip keep
  15/15/2), but numbered sub-clauses classified as headings, `"Term" means` definitions missed, choppy word diff on heavy rewrites.
- Sat 23:45 — `review-engine` (Sol max): **revise**, 8 required fixes (destroys bookmarks/fields/SDTs in edited paragraphs; id→node mapping
  breaks after inserts; overlapping anchors; numbering/headings; definitions; dates; XML control chars; validateDocx too lenient).
  `engine-r2` sent (reviewer's 8 + lead's 4 + LibreOffice round-trip test). LibreOffice 26.8 installed.

- Sun 00:00 — `agent-core` landed (34 min): typecheck/lint/tests clean; live smokes: clean template 18/18 compliant ($3.30, 183 s);
  deviation contract 7 dev / 3 missing / 6 compliant / 2 needs_review ($5.81, 407 s); replay $0 in 1.6 s. Memo is lawyer-grade. `review-agent` (Sol max) launched.
- Sun 00:05 — Vercel: project `playbook-redliner` (prj_BIzhMqPeRfToSYVTGzVIJMbnFl1D, team yadneshsalvis-projects), first deploy OK
  https://playbook-redliner-l4oxd5loz-yadneshsalvis-projects.vercel.app ; SSO deployment protection **disabled** (was 302 for everyone);
  env ANTHROPIC/OPENAI keys + REDLINER_LLM_MODE=replay set for prod+preview; GitHub `yadneshSalvi/legal-redline` (public) pushed → push-to-deploy.

- Sun 00:10 — `engine-r2` landed (23 min): all 11 fixes; 34/34 engine tests after the lead patched the LibreOffice round-trip check to compare
  tracked *text* (LibreOffice merges adjacent wrappers). Lead smoke: definitions found, sub-clauses are body text, dense changes grouped,
  `libreoffice.ok = true`. `review-engine` r2 verification (Sol max) launched. dataset-eval r2 running (inline-clause split, hard-case gold, review CLI);
  r3 brief staged (one-item-per-rule merge, `ambiguous`, apply `plans/06_gold_review.md`).

- Sun 00:27 — `ui-workspace` landed (72 min, $42.63, 219 turns): design system, shell, landing, workspace (paper + findings + approvals +
  SSE board), runs page, fixtures; 3 verification passes; zero console errors; live against the real API. Committed `8761c76`, pushed (deploy).
  STYLE.md updated: amber never as text (contrast). `review-ui` (Opus reviewer, port 3201) launched; `ui-evidence` (evals/trajectory/precedents)
  launched in worktree `../legal-redline-wt/ui-evidence` (branch `wt/ui-evidence`, port 3102).
- Sun 00:20 — `review-agent` (Sol max): revise, 12 fixes → `agent-core-r2` running. `dataset-eval` r2+r3 landed (inline-clause split, hard-case
  gold, one-item-per-rule + ambiguous, lead decisions applied); r4 running (adds + promote all 8).

- Sun 00:48 — **Eval campaign launched** (`plans/harness/campaign.sh 3`, pid 81309, logs `plans/harness/logs/campaign-*.log`, monitor task
  bznrp1pu2): configs b1-prompt → b0-chat → i1 → i2 → i3 → i4 → final → x-monolith, live + judge live, concurrency 3, then `pnpm report`.
  Pre-launch: agent-core r2 (12 fixes) + r3 (per-finding cost/time, short sectionRef, engine diff in UI) merged; engine r3 + op reconciliation;
  verifier hard/soft checks (hard = anchors/render/proposal; compliant findings keep rule checks; minimality advisory); playbook regexes relaxed.
  **No playbook/prompt/tool-schema edits until the campaign completes** (cache keys). LibreOffice available from this shell (campaign runs here).
- `review-ui` (Opus): revise, 12 fixes → `ui-workspace-r2` running (port 3101). `ui-evidence` still running in worktree (port 3102).

## Queued for agent-core r3 (after r2 lands) — DONE (merged 4762588)
- `Finding.costUsd?` / `Finding.durationMs?` (per-rule figures survive reload; UI card shows them) — contract change in `src/agent/types.ts`.
- `sectionRef` must be short: "§ 14.2 Intellectual Property" (number + heading), never a sentence.
- UI `src/ui/lib/redline.ts` should import `wordDiff`/`renderParagraph` from `@/src/engine/diff` so preview == docx (assign to UI polish round).
- Screenshots for README: copy curated PNGs to `docs/screenshots/` at submission time (logs dir is gitignored).

## Decisions
- Stack: TypeScript monorepo (Next 16.3 + pure-TS OOXML engine + Anthropic TS SDK), one `pnpm` toolchain — chosen over Python for a
  single reproducible runtime and Vercel deploy. Vercel team `yadneshsalvis-projects` (Pro → 800 s functions).
- Models: `claude-opus-5` for planner/drafter/verifier/memo (baselines use the same model — fair); `gpt-5.6-sol` as the independent judge/labeller.
- Eval set: 8 CUAD + 3 seeded synthetic + 1 deterministic hard case. Gold = CUAD spans + human-confirmed status (LLM draft → human).
- Round-2 negotiation diff = stretch only.

## Next (lead)
1. When `engine` lands: run tests; open a redlined docx in LibreOffice; Sol review at max (`review-engine`).
2. When `dataset-eval` lands: review `gold.draft.json` per contract → promote to `gold.json` (human-confirmed); check docx generation.
3. When `agent-core` lands: inspect live smoke run + trajectory; Sol review (`review-agent`); run `pnpm review` on a CUAD contract.
4. When `ui-workspace` lands: read screenshots; Opus reviewer (`--reviewer`) pass; integrate with real API on port 3000.
5. Phase 2: end-to-end run through the UI; eval b0/b1/i1; Fable gate 1.
6. Phase 3: i2/i3/i4/x-monolith runs; changelog; O2 (evals dashboard, trajectory viewer, precedents); labels confirmed.
7. Phase 4: polish, Vercel deploy (+Blob), README/REPRODUCE/CHANGELOG. Phase 5: Docker clean-env test, trajectories export, video, submit.

## Open items / risks
- Background-task timeout: verify the four builder processes survive > 10 min; if killed, relaunch with `nohup … &` and `--resume`.
- `radix-ui` pinned 1.4.3 (installed fine; latest 1.6.7).

## UI notes for review (lead, Sun 00:15)
- Workspace pass1d looks on-spec. Watch: disabled "Export .docx" button text nearly invisible on navy (contrast); verify keyboard nav; the
  dense-change grouping in the preview should match the engine's post-r2 rendering.
- Sun 01:05 — campaign b1-prompt aborted at scoring (transient: r5 was editing synthetic gold mid-run); caches intact; gate now passes; b1 re-scored
  via `--allow-live` (log `campaign-b1-prompt-rescore.log`). Campaign continues with b0-chat → … Synthetic gold r5: 9 `ambiguous` overlap items.
  Verifier smoke after soft-check fix: 16 pass / 1 repaired / 1 fail (was 7 fails); written-number parsing added (code only, no cache impact).
- Sun 01:10 — `scripts/export-trajectories.ts --run <id> --contract <id>` works (trajectory.jsonl + run.json) but does **not** write the narrated per-run
  README promised in `trajectories/README.md` → add a deterministic narrator (submission brief). Docker daemon was down; started Docker Desktop, build queued.
- Sun 01:20 — Docker clean-env image builds (4.4 GB, LibreOffice 7.4 inside); `docker run --rm playbook-redliner pnpm test` → 117/117 pass.
  Opus builders (`ui-workspace` r2, `ui-evidence`) were killed with their task wrappers → resumed detached (nohup); b1 re-score relaunched detached.
- Sun 01:15 — **b1-prompt baseline results** (12 contracts, Opus 5 single prompt + playbook): macro F1 **0.85** (P 0.81 / R 0.91), micro TP 84 / FP 24 /
  FN 10, synthetic 4/4 at 100 % (incl. hard case), redline validity **41 %**, minimality **18 %**, citation hallucination **10.8 %** (30/279), integrity
  ok everywhere, $0.35/contract, 105 s/contract. Strategic reframing for the changelog: detection is near-saturated for a frontier model with full
  context; the pipeline must win on validity / minimality / hallucination / escalation quality and on cost per *valid* redline, not on F1 alone.
- Sun 01:25 — `ui-workspace` r2 landed ($17.84): all 12 review fixes with measurements; committed `ed6854d`, pushed. Curated screenshots → `docs/screenshots/`.
