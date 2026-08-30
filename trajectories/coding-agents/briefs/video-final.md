# Brief: final solution video — real numbers, one genuine end-to-end run, ≤ 5:00   (GPT-5.6 Sol · video production)

You built `plans/video/**` earlier (see `plans/video/README.md`). Now produce the **final** cut. Read `plans/07_video.md`, `plans/video/narration.json`
(rewritten by the lead — do not change the words except to fill the `{{…}}` placeholders from the values below), `evals/results/summary.md`,
`IMPROVEMENT_CHANGELOG.md` and `README.md` §5. Only write under `plans/video/**`. Never touch `src/`, `app/`, `scripts/`, `data/`, `evals/`.

## Values for the placeholders
Read them from `evals/results/summary.md` / `evals/results/*.json` (`aggregate.detection.macro.f1`, `aggregate.detection.macro.precision`,
`aggregate.redlineValidity.rate`, `aggregate.minimality.rate`): `{{B1_F1}}`, `{{B1_VALID}}`, `{{B1_MIN}}` from `b1-prompt.json`; `{{FINAL_F1}}`,
`{{FINAL_P}}`, `{{FINAL_VALID}}`, `{{FINAL_MIN}}` from `final.json`. Spell numbers for speech as percentages with one decimal
("ninety-four point eight percent"). `{{BIGGEST}}` and `{{X_REASON}}` come from `IMPROVEMENT_CHANGELOG.md` (the "Decision / learning" cells for
the largest F1/validity step and for `x-monolith`); `{{HOT_TAKE_LINE}}` is the first sentence of the changelog's "Hot take" section. Put the same
numbers on the comparison and changelog cards (`bin/cards.mjs` data).

## One genuine end-to-end run (the brief's "walk through one realistic execution from start to finish")
Run the app locally in **live** mode: `pnpm dev -p 3110` (this checkout; the fs store persists under `data/runs`; `.env` has the keys). In the
recording session: landing → "Sample contracts" → pick **cuad-corio-hosting** (title contains "CORIO") → Start review → the workspace shows the
progress board for a real run (~4–5 minutes, ~$4). Record the whole run (`rec_start workspace-run 360`), then cut two clips from it in
`assemble.mjs`/timeline: `workspace-run` (planner + first drafters lighting up, ~12 s) and `findings-arrive` (first verified findings sliding in, ~15 s;
speed up 2× if needed with `setpts` and say so in README). Then, on the completed run: `keyboard-review` (J/K through findings; **E on the LOL-CAP
finding** and change the cap text; **A** on LICENSE and T4C; **R** on one low-severity finding), `precedents` (open `/precedents`, scroll to LOL-CAP),
`export-dialog` (Export → confirm → the success banner with the download link), `memo-drawer`. Use the existing helpers in `bin/lib.sh`/`record.sh`;
add a `record_live_run` function. If the live run fails, retry once, then fall back to the already-completed local run `SDqRoWCFr52ycs`
(`/review/SDqRoWCFr52ycs`) for the review/export beats and use `/review/sample-running` for the board — and say so in the report.

## Other beats
- `cold-open`: pick the page of `data/runs/SDqRoWCFr52ycs/output.docx` (or the run you just exported) with the most tracked changes via
  `bin/pick-redline-page.mjs`; the revision-visible LibreOffice render; slow Ken Burns.
- `hard-case`: `/trajectories/<runId>` of a **real** final run of `synth-hardcase` — create it with
  `pnpm exec tsx scripts/review.ts data/contracts/synth-hardcase/contract.docx --config final --mode record --cache-dir data/runs/video-cache-hardcase --party "Northwind Analytics, Inc."`
  (~4 min) and record the trajectory filtered to LOL-CAP (the `get_definition("Fees")` → `get_definition("Implementation Fee")` calls must be visible).
- `comparison-live`: `/evals` on the local server (real data: `evals/results/changelog-data.json` exists now) — scroll the ladder slowly.
- Regenerate narration (`node bin/tts.mjs`; only changed beats re-synthesise), cards (`node bin/cards.mjs`), assemble.

## Acceptance
- `plans/video/renders/playbook-redliner.mp4`: h264/aac 1920×1080, **≤ 300 s**, narration in sync, no `{{` anywhere in narration or cards, the live run
  visibly progresses (board chips changing), keyboard review shows real redlines and the edit dialog, export banner + memo shown, evals dashboard
  shows real numbers matching the cards. Also write `plans/video/renders/playbook-redliner-1080p.md` with the per-beat table and total duration.
- Extract 8 evenly spaced frames to `plans/video/renders/frames/` and look at each (Read the PNG) for stuck cursors, dev overlays, placeholder text.

## Rules
No `pnpm add`; no edits outside `plans/video/**`; do not kill node processes you did not start (use port 3110); keep secrets out of logs; atomic writes; no git.

## Report (FINAL message structure — exactly)
```
## Summary
## Files
## Render evidence   (ffprobe, per-beat table, total duration, frame paths + what each shows)
## Live run          (run id, duration, cost, findings by status — or the fallback used)
## Known gaps / risks
```
