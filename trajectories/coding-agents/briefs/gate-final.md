# Final gate review — Playbook Redliner (Fable 5 `redline-critical-reviewer`)

You are the last adversarial check before submission to the micro1 Agentic Workflows Hackathon (rubric in `hackathon-docs/*.pdf` and
`plans/00_master_plan.md` §0). Judges will (1) run the project from a clean clone, (2) open the deployed app, (3) read README /
IMPROVEMENT_CHANGELOG / REPRODUCE, (4) inspect trajectories, (5) watch the video. Verify each of those paths yourself; do not trust reports.

## Checklist (run everything; quote evidence)
1. **Clean environment**: `git clone` into a temp dir (or `git stash`-free worktree of `main`), `pnpm install --frozen-lockfile`, `pnpm typecheck`,
   `pnpm lint`, `pnpm test`; then `pnpm eval --all` (must complete from the committed replay cache with **zero** live calls — unset `ANTHROPIC_API_KEY`
   and `OPENAI_API_KEY` in that shell) and `pnpm report`; diff `evals/results/summary.md` against the committed one (must be identical).
2. **Numbers tie to evidence**: every figure in `README.md` §5 and `IMPROVEMENT_CHANGELOG.md` must appear in `evals/results/*.json` /
   `summary.md`; no placeholder `{{…}}` left anywhere in README / CHANGELOG / REPRODUCE / docs; the changelog has an entry per iteration incl.
   the removed experiment and the calibration step, each with evidence; a main failure mode and a hot take are present and grounded.
3. **Solution run**: `pnpm review data/contracts/synth-hardcase/contract.docx --config final --mode replay --accept-all` → output.docx; open with
   LibreOffice headless (`--convert-to pdf`) and unzip to check `w:ins`/`w:del`/comments; `pnpm validate-docx original output --pdf` ok.
4. **Baseline run**: `pnpm baseline … --mode replay` works.
5. **Trajectories**: `trajectories/app/final/<contract>/README.md` exists for all 12 contracts and reads from instructions → tool responses →
   verifier feedback → human checkpoint → apply; `trajectories/coding-agents/INDEX.md` lists every session with brief → report → trace; grep the
   whole `trajectories/` tree for secrets (`sk-`, `Bearer `, `vercel_blob_rw`, `BLOB_READ_WRITE_TOKEN=[REDACTED] `api_key`).
6. **Secrets/repo hygiene**: `git grep` for keys; `.env` untracked; `.env.example` present; no absolute home paths in docs; licences noted (CUAD CC-BY-4.0).
7. **Deployed app** (`https://playbook-redliner.vercel.app`): `/`, `/review/sample`, `/runs`, `/evals` (must show real data, not the fixture chip),
   `/trajectories/sample`, `/precedents` return 200 and render; start a sample run from the landing page and confirm the SSE board progresses
   (replay mode is set in production; a run should complete quickly) and the docx export downloads.
8. **Video**: `plans/video/renders/playbook-redliner.mp4` exists, ≤ 5:00, ffprobe h264/aac 1920×1080; narration contains no `{{` placeholders
   (check `plans/video/narration.json`); the beats cover problem → baseline → one realistic execution → comparison → changelog (biggest win + removed experiment).
9. **Rubric self-check**: for each of the six criteria write one sentence on whether the evidence supports a top score and what is missing.

## Hold the bar
Required fixes only for things a judge would penalise: irreproducible numbers, placeholders, broken commands, invalid docx, secrets,
dead links, missing deliverables. Polish → suggestions.

## FINAL message must be exactly one JSON block
```json
{"verdict":"approve|revise","required_fixes":[{"where":"","what":"","why":"","how":""}],"suggestions":[],"evidence":[],
 "score":{"correctness":0,"contract_compliance":0,"quality":0},"rubric_self_check":{"problem":"","agent_engineering":"","e2e_quality":"","measured_improvement":"","reproducibility":"","hot_take":""}}
```
