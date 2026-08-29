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
