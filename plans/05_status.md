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
- Sun 01:35 — `ui-evidence` landed ($26.03): /evals, /trajectories/[runId], /precedents, /runs polish — merged (3 conflicts resolved by lead), all
  routes 200 locally. `submission-pack` landed: trajectory narrator (README per run + prompts.md), `render-docs`, `export-coding-traces`
  (redacted), `export-human-sessions` — merged `8a63b62`, 121 tests, pushed. Worktrees removed. Campaign: i1-docmodel 6/12 at 01:35.
  TODO: fix coding-trace INDEX attribution (Opus SDK transcripts in ~/.claude/projects are labelled as lead sessions).
- Sun 01:45 — coding-trace INDEX fixed (Opus SDK transcripts labelled; ui-evidence/submission-pack recovered from SDK/Codex stores after worktree
  removal deleted their gitignored logs). `trajectories/coding-agents/` (92 MB; lead transcript 14 MB, ui-workspace transcript 42 MB) is NOT
  committed yet — commit once at submission time. Campaign: i1-docmodel 7/12 at 01:45.
- Sun 01:45 — i1-docmodel recorded: F1 0.824 (P 0.77 / R 0.91), escalations 1 (b1: 14), validity 43 %, minimality 31 %, $1.29/contract. Citation
  scanner fixed (accepted only section numbers → flagged valid sub-clause refs); corrected hallucination: b0 4.4 %, b1 3.2 %, i1 5.4 %. All three
  re-scored in replay ($0). Campaign at i2-workers (01:42). Video-pipeline builder running (Sol).
## Final-round checklist (after x-monolith completes)
1. `pnpm eval --all` (replay, judge replay) → consistent results with final gold/metrics; `pnpm report`; `pnpm render-docs`.
2. Write changelog "learning" cells, hard-case analysis, main failure mode, hot take from the numbers (lead, by hand).
3. `pnpm export-trajectories --all-final`; `pnpm export-human-sessions`; `pnpm export-coding-traces`; commit caches/results/trajectories once.
4. Deploy (push) → `/evals` shows real data; smoke the deployed routes.
5. Final video with real numbers + a real `final` run recording; Fable gate review; REPRODUCE numbers (runtime/cost); submit.
6. Ask the user: 15-min gold spot-check (`plans/06_gold_review.md` §Spot-check) + one real review session on the deployed app for the human-load metric.
- Sun 02:10 — i2-workers: F1 0.840 (P 0.76 / R **0.96**, FN 4), esc 1, validity 47 %, minimality 26 %, halluc 4.6 %, $3.26/contract.
  Validity components (passing/eligible): applies 100 % in every config; checks ~82 %; **judge** b0 27 % → b1 46 % → i1 49 % → i2 59 %;
  judge drafting_quality mean 2.84 → 3.46 → 3.48 → 3.70. The independent judge is the discriminating component — narrative for the changelog.
- Sun 02:15 — `video-pipeline` landed: `plans/video/bin/{tts,record.sh,cards,word-still,assemble}`; placeholder render 3:19 (16 narrated beats,
  1080p30 h264/aac). Final cut TODO: fill `plans/video/narration.json` + card data with real numbers, re-record `workspace-run`/`findings-arrive`
  against a real `final` run, choose a redline-heavy Word page for the cold open, hot-take line.
- Sun 02:55 — i3-verifier: F1 0.837 (P 0.75 / R 0.97, FN 3), validity 56 %, minimality 31 %, halluc 3.6 %, esc 12, $4.08. Reviewed every i3 FP →
  **gold round 2** (logged in `plans/06_gold_review.md`): 2 additions (Americas IP missing, BNC WARRANTY missing), 1 flip (BNC INDEMN → deviation),
  17 `ambiguous`; matching: missing-kind gold matches deviation-or-missing findings. Re-scoring all recorded configs (judge live for new TPs).
  **Incident:** `pnpm synth` regenerated synth docx files with the post-r2 engine (different heading styles) → restored from git immediately; never
  regenerate contract.docx while caches exist (document model in tool results is hash-checked on replay). i4-memory in progress (6/12 at 02:52).
- Sun 03:15 — **Iteration 5 — calibration.** Under round-2 gold: b1 F1 0.949 (P 0.93) vs i4 0.883 (P 0.83): per-rule workers over-flag clauses
  that already meet the *fallback* (Delaware law, 90-day convenience right, 90-day warranty) or miss only a minor sub-element of preferred.
  Fix: classification semantics in the shared playbook preamble (all configs incl. b1): preferred-or-fallback = compliant; deviation only when
  the fallback fails on a material term; verifier fails "fallback → preferred" upgrades. Campaign killed; pre-calibration ladder archived
  (`evals/results/pre-calibration/`, `evals/cache-precalibration/`); calibrated ladder re-runs b1 i1 i2 i3 i4 final x-monolith (b0 unchanged).
- Sun 03:35 — calibrated ladder: b1-prompt F1 0.915 (P 0.98 / R 0.87, FN 13), validity 46 %, minimality 11 %, halluc 2.9 %, $0.35 (pre-calib
  0.949 / P 0.93 / R 0.97). Campaign continues i1 → i2 → i3 → i4 → final → x-monolith (ETA ≈ 06:45 IST).
- Sun 05:00 — calibrated i2 F1 0.944 (P 0.97 / R 0.93), i3 0.941 (P 0.94 / R 0.94) but 21 escalations: 19 were compliant findings failed by
  presence regexes with no clause to inspect (verifier model itself said "compliant"). Fix: for compliant findings only `regex_absent`
  contradictions gate (deterministic post-processing → all configs re-scored in replay at the end for consistency). i4 running.
- Sun 05:05 — replay check with the new gating: verifier verdicts replay deterministically, but the **memo** request embeds verification notes →
  cache miss after a gating change. Final re-score of all configs must use `--allow-live --judge live` (records only memo calls + any new judge calls).
- Sun 05:50 — calibrated ladder so far: b1 0.915 (R 0.87) · i1 0.918 · i2 0.944 · i3 0.941 · i4 0.936 · **final 0.948 (P 0.98 / R 0.92, esc 0,
  validity 51 %, minimality 31 %, $3.51)**. x-monolith recording; `plans/harness/finalize.sh` auto-fires after it (waiter pid 61428) → re-score all
  with the final gate (`--allow-live`), report, render-docs, exports. Production env `REDLINER_LLM_MODE=live` (replay caches are not bundled
  in the deployment); live Corio `final` run being recorded for the video (`data/runs/video-cache`).
- Sun 06:00 — **Production judge path verified live**: sample Kubient run (`final`) on playbook-redliner.vercel.app → 118 SSE events → awaiting_review
  (18 findings, $3.23) → 6 decisions → apply 6 s → output.docx (12 ins / 3 del / 6 comments, validation ok) → `/review/-QiColwui8Kpan` renders.
  Video run recorded locally: `data/runs/SDqRoWCFr52ycs` (Corio, final: 4 dev / 3 missing / 11 compliant, 18 verified, $3.88).
- Sun 06:05 — x-monolith recorded: F1 0.941 (P 0.99 / R 0.90), validity 42 %, minimality 45 %, halluc 2.1 %, $0.99 — cheapest strong detector, but
  lowest validity among pipeline configs (removed for validity/recall, not detection). Campaign complete; `finalize.sh` running (re-score all
  with the final gate, report, render-docs, exports).

## 2026-08-30 07:15 IST — finalize done, narrative written, evidence committed
- `finalize.sh` completed 06:58 (re-score of all 8 configs with `--allow-live --judge live`, report, render-docs, exports). Final ladder (macro F1 · validity · minimality · $/contract): b0 71.7 · 23.5 · 5.9 · 0.51 | b1 91.5 · 42.7 · 11.0 · 0.35 | i1 91.8 · 41.5 · 45.1 · 1.24 | i2 94.4 · 48.3 · 33.3 · 2.97 | i3 94.5 · 51.7 · 28.1 · 4.00 | i4 93.6 · 50.6 · 32.2 · 4.02 | x 94.1 · 42.4 · 42.4 · 0.99 | final 94.8 · 50.6 · 35.6 · 3.51. Escalations: b1 12, all agentic configs 0 (i2: 1).
- Lead wrote the narrative by hand: `IMPROVEMENT_CHANGELOG.md` (learning cells, Iteration 5 calibration section, variance caveat — i4 and final are the same config recorded twice, 1.2 pp apart —, hard-case verdict: it did NOT separate the configs on detection; failure mode: partial redlines (34/87 fail satisfies_rule, 29 not minimal) + "right rule, neighbouring paragraph" on bluefly; hot take). README §5/§7/§10 rewritten; REPRODUCE placeholders filled (versions, 7 s tests, ~50 min replay, ~$275 live ladder). `EvalsDashboard.tsx` monolith sentence corrected (it cost less, not more).
- Discovered: `evals/runs/<config>` for all 8 configs were already tracked (229 MB) — only `pre-calibration-*` runs are ignored.
- Next: push → deploy → verify `/evals`; launch `video-final` (Sol) and the Fable gate review; then video upload + link, submission text, ask the user for the gold spot-check + a human review session.

## 2026-08-30 07:55 IST — gate review (approve-with-fixes) → fixes 1–3, 5–8 landed
- Gate report: `plans/harness/reports/20260830-gate-final.md` (clean clone: typecheck/lint/test green, `pnpm eval --all` byte-identical in 5 m 15 s with no keys; production run→apply→download verified live).
- Fixed: CLI replay (auto `evals/cache/<config>/<id>` + meta.json parties + local precedent index shadowed in replay; `--counterparty`), baseline replay, `validate-docx --run <id>` (rebuilds the apply request; `apply-request.json` persisted by applyDecisions from now on), bluefly narrative (IP = right rule/neighbouring paragraph; second LICENSE gold item p0085 missed while p0149 caught), figures (1,371/272 references; 92.3–94.2 %; recall not comparable across golds), "one item per rule" → 144 items, MIT LICENSE, replay runtime ≈ 5–10 min, human-reviewed trajectory `trajectories/app/i3-verifier/human-reviewed-msa` (13 decisions + apply) linked from trajectories/README, ESLint ignores plans/**, two failed replay runs deleted from production blob store, `.env.example` defaults to replay.
- Pending until the video render finishes (dev server on 3110 must not reload): fix 4 (stream route replays packaged samples from evals/cache with meta.json parties + shadowed precedents), applyDecisions persisting `apply-request.json`, keep-alive for runs when the SSE client disconnects.

## 2026-08-30 08:25 IST — video final, fix 4 + keep-alive, release
- `video-final` (Sol, 66 min, exit 0): `plans/video/renders/playbook-redliner.mp4` 4:52.6, 1080p H.264/AAC, genuine CORIO live run NVDjaRym9fKYVj (interrupted once by a dev-server reload → resumed; $4.54), hard-case run JxR5VovErXWC5F, real `/evals`. Lead re-rendered cards + re-assembled after switching the end-card URL to playbook-redliner.vercel.app (custom domain does not resolve).
- Fix 4: stream route replays packaged samples from `evals/cache/<config>/<sampleId>` with meta.json parties and shadowed precedents when REDLINER_LLM_MODE=replay (verified: 118 SSE events in 2 s, 18 findings, $0, apply ok). `after(execute(...))` keeps a run alive when the SSE client disconnects. `applyDecisions` persists `apply-request.json`.
- Video published as GitHub release v1.0 asset; README header + §10 link it.

## 2026-08-30 08:35 IST — submission-ready (94cada6)
- Coding-agent traces re-exported: 23 harness sessions + 6 Claude Code transcripts incl. the Fable gate-review subagent (brief → report → trace) and the video-final Sol session; redaction verified.
- Left for the author: HackerEarth submission (text in plans/09_submission.md), optional YouTube unlisted upload (release v1.0 asset already linked), optional gold spot-check + one live review session on production, optional custom domain.

## 2026-08-30 12:10 IST — round 2 in flight
- User direction: the +3.3 pp detection story is too small; find metrics where the baseline is ≤ 50 % and the pipeline ≥ 70 %, honestly. Campaign rules in `plans/10_improvement_campaign.md` (pre-registration, rule-defined tiers, baseline unchanged, dev/holdout, negative results reported).
- Track A `metrics-hard` (Sol max, 3 h): long tier of 6 CUAD contracts (37–45k words, rule-selected, 121 gold items, 80 CUAD-anchored), judge v2 per-element, CRR/yield/adherence, `pnpm eval --tier`. Numbers: baseline short CRR 1.1 % / long F1 60.3 % recall 45.8 % CRR 0 %; round-1 `final` long F1 58.8 % (no better than baseline), short CRR 10.5 %. Pre-registration hash logged before measurement.
- Track B `redline-quality` (Sol max, 2 h 18 m): `position.elements` (159, additive), element-aware drafter/verifier + repair, minimality gate, long-doc planner; configs i5-elements / i6-longdoc / final-v2; dev CRR 86.4 % (own judge), F1 preserved, cost ≤ $6.91/short contract.
- Merged both (one conflict: schema `elements` required). Fixed: runner passed playbook elements to judge v2 → hashes drifted from the pre-registered verdicts and the judge would have used the pipeline's own checklist; now the judge decomposes positions itself (3ab5ad2c). Campaign `plans/harness/campaign-round2.sh` relaunched 12:05 (replays round-1 + A's runs; records i5 short, i6 all, final-v2 all). Opus `ui-evals-round2` running in a worktree. Narrative draft: `plans/11_round2_narrative_draft.md`; gate brief: `plans/harness/briefs/gate-round2.md`.

## 2026-08-30 16:45 IST — round-2 campaign done; ENOSPC incident
- Official ladder (judge v2, pre-registered): short CRR b1 1.1 % → final 10.5 % → i5 32.6 % → final-v2 32.6 %; long tier b1 F1 60.3 / recall 45.0 / CRR 0 → final-v2 F1 74.4 / recall 67.6 / CRR 20.8 / yield 62.5. Memory adherence ≈ 0 everywhere (non-result). r2 track (`i7-precise`) reached 68.8 % CRR on the dev split with the official judge; its report is pending → `final-v3` campaign (`campaign-round2b.sh`).
- Incident: `/` ran out of space during the i5 recording (3.3 GB free); two i5 workers (corio INDEMN, kubient INDEMN) failed with ENOSPC → escalations and replay misses. Freed 4.4 GB (reviewer clones, merged worktrees, pre-calibration runs); re-recording the two contracts in isolation and regenerating i5's short-tier results; disk guard added to the round-2b runner.
