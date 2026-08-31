# Coding-agent trajectories

The lead orchestrator was Claude Fable 5 in Claude Code. Builders and reviewers ran as GPT-5.6 Sol through the Codex CLI and Claude Opus 5 through the Claude Agent SDK. The lead issued scoped briefs, reviewed reports and gates, and sent follow-up repair briefs when a build or review exposed a gap; the chronological sessions below preserve those review loops.

All copied files are credential-redacted and absolute home paths are normalized to `~`.

| Label | Model | Harness | Started | Duration | Cost | Brief → report | Event trace |
|---|---|---|---|---:|---:|---|---|
| lead-325ba387 | Claude Fable 5 | Claude Code | 2026-08-29T16:27:41.821Z | 2268m 30s | — | lead orchestration (this transcript) | [trace](claude-code/325ba387-1ab8-4b57-9e70-3f69911246c4.jsonl) |
| smoke-codex | GPT-5.6 Sol | Codex CLI | 2026-08-29 22:55:13 | 6s | — | [brief](briefs/_smoke_codex.md) → [report](reports/20260829-225513-smoke-codex.md) | [trace](codex/20260829-225513-smoke-codex.codex.jsonl) |
| smoke-opus | Claude Opus 5 | Claude Agent SDK | 2026-08-29 22:55:20 | 3s | $0.12 | [brief](briefs/_smoke_opus.md) → [report](reports/20260829-225520-smoke-opus.md) | [trace](opus/20260829-225520-smoke-opus.opus.log) |
| smoke-opus (SDK transcript) | Claude Opus 5 | Claude Agent SDK | 2026-08-29T17:25:20.608Z | 2s | — | same session as the harness row above (full SDK transcript) | [trace](claude-code/b3f10255-a938-4bc0-aa51-4c01490b12e7.jsonl) |
| engine | GPT-5.6 Sol | Codex CLI | 2026-08-29 23:14:14 | 19m 50s | — | [brief](briefs/engine-r3.md) → [report](reports/20260829-231414-engine.md) | [trace](codex/20260829-231414-engine.codex.jsonl) |
| dataset-eval | GPT-5.6 Sol | Codex CLI | 2026-08-29 23:14:16 | 45m 12s | — | [brief](briefs/dataset-eval-r5.md) → [report](reports/20260829-231416-dataset-eval.md) | [trace](codex/20260829-231416-dataset-eval.codex.jsonl) |
| agent-core | GPT-5.6 Sol | Codex CLI | 2026-08-29 23:14:18 | 34m 12s | — | [brief](briefs/agent-core-r2.md) → [report](reports/20260829-231418-agent-core.md) | [trace](codex/20260829-231418-agent-core.codex.jsonl) |
| ui-workspace | Claude Opus 5 | Claude Agent SDK | 2026-08-29 23:14:20 | 71m 56s | $42.63 | [brief](briefs/_continue.md) → [report](reports/20260829-231420-ui-workspace.md) | [trace](opus/20260829-231420-ui-workspace.opus.log) |
| ui-workspace (SDK transcript) | Claude Opus 5 | Claude Agent SDK | 2026-08-29T17:44:21.039Z | 125m 58s | — | same session as the harness row above (full SDK transcript) | [trace](claude-code/235cc964-b388-426a-a07e-0a90e8bef7a4.jsonl) |
| review-engine | GPT-5.6 Sol | Codex CLI | 2026-08-29 23:34:31 | 10m 18s | — | [brief](briefs/review-engine-r2.md) → [report](reports/20260829-233431-review-engine.md) | [trace](codex/20260829-233431-review-engine.codex.jsonl) |
| engine | GPT-5.6 Sol | Codex CLI | 2026-08-29 23:45:39 | 23m 23s | — | [brief](briefs/engine-r3.md) → [report](reports/20260829-234539-engine.md) | [trace](codex/20260829-234539-engine.codex.jsonl) |
| review-agent | GPT-5.6 Sol | Codex CLI | 2026-08-29 23:48:50 | 23m 23s | — | [brief](briefs/review-agent-r1.md) → [report](reports/20260829-234850-review-agent.md) | [trace](codex/20260829-234850-review-agent.codex.jsonl) |
| dataset-eval | GPT-5.6 Sol | Codex CLI | 2026-08-30 00:00:56 | 12m 8s | — | [brief](briefs/dataset-eval-r5.md) → [report](reports/20260830-000056-dataset-eval.md) | [trace](codex/20260830-000056-dataset-eval.codex.jsonl) |
| review-engine | GPT-5.6 Sol | Codex CLI | 2026-08-30 00:09:47 | 19m 29s | — | [brief](briefs/review-engine-r2.md) → [report](reports/20260830-000947-review-engine.md) | [trace](codex/20260830-000947-review-engine.codex.jsonl) |
| agent-core | GPT-5.6 Sol | Codex CLI | 2026-08-30 00:13:16 | 20m 7s | — | [brief](briefs/agent-core-r2.md) → [report](reports/20260830-001316-agent-core.md) | [trace](codex/20260830-001316-agent-core.codex.jsonl) |
| dataset-eval | GPT-5.6 Sol | Codex CLI | 2026-08-30 00:13:47 | 11m 55s | — | [brief](briefs/dataset-eval-r5.md) → [report](reports/20260830-001347-dataset-eval.md) | [trace](codex/20260830-001347-dataset-eval.codex.jsonl) |
| dataset-eval | GPT-5.6 Sol | Codex CLI | 2026-08-30 00:26:26 | 3m 35s | — | [brief](briefs/dataset-eval-r5.md) → [report](reports/20260830-002626-dataset-eval.md) | [trace](codex/20260830-002626-dataset-eval.codex.jsonl) |
| review-ui | Claude Opus 5 | Claude Agent SDK | 2026-08-30 00:27:22 | 20m 5s | $9.29 | [brief](briefs/review-ui-r1.md) → [report](reports/20260830-002722-review-ui.md) | [trace](opus/20260830-002722-review-ui.opus.log) |
| review-ui (SDK transcript) | Claude Opus 5 | Claude Agent SDK | 2026-08-29T18:57:22.650Z | 20m 4s | — | same session as the harness row above (full SDK transcript) | [trace](claude-code/35526831-84a2-4ab1-b0f0-a42122ad0fe1.jsonl) |
| ui-evidence (SDK transcript) | Claude Opus 5 | Claude Agent SDK | 2026-08-29T18:57:30.070Z | 61m 17s | — | same session as the harness row above (full SDK transcript) | [trace](claude-code/e73eaf27-2c41-443e-beee-5dd9ab8c6b84.jsonl) |
| engine | GPT-5.6 Sol | Codex CLI | 2026-08-30 00:29:48 | 13m 31s | — | [brief](briefs/engine-r3.md) → [report](reports/20260830-002948-engine.md) | [trace](codex/20260830-002948-engine.codex.jsonl) |
| agent-core-r3 | GPT-5.6 Sol | Codex CLI | 2026-08-30 00:34:43 | 9m 45s | — | [brief](briefs/agent-core-r3.md) → [report](reports/20260830-003443-agent-core-r3.md) | [trace](codex/20260830-003443-agent-core-r3.codex.jsonl) |
| ui-workspace | Claude Opus 5 | Claude Agent SDK | 2026-08-30 00:49:19 | — | — | [brief](briefs/_continue.md) → — | [trace](opus/20260830-004919-ui-workspace.opus.log) |
| dataset-eval | GPT-5.6 Sol | Codex CLI | 2026-08-30 00:55:27 | 6m 27s | — | [brief](briefs/dataset-eval-r5.md) → [report](reports/20260830-005527-dataset-eval.md) | [trace](codex/20260830-005527-dataset-eval.codex.jsonl) |
| ui-workspace | Claude Opus 5 | Claude Agent SDK | 2026-08-30 01:05:54 | 14m 25s | $17.84 | [brief](briefs/_continue.md) → [report](reports/20260830-010554-ui-workspace.md) | [trace](opus/20260830-010554-ui-workspace.opus.log) |
| submission-pack | GPT-5.6 Sol | Codex CLI | 2026-08-30 01:21:53 | 9m 50s | — | [brief](briefs/submission-pack.md) → [report](reports/20260830-012153-submission-pack.md) | [trace](codex/20260830-012153-submission-pack.codex.jsonl) |
| video-pipeline | GPT-5.6 Sol | Codex CLI | 2026-08-30 01:38:35 | 29m 44s | — | [brief](briefs/video-pipeline.md) → [report](reports/20260830-013835-video-pipeline.md) | [trace](codex/20260830-013835-video-pipeline.codex.jsonl) |
| gate-final (reviewer subagent) | Claude Fable 5 | Claude Code subagent | 2026-08-30T01:39:03.460Z | 34m 49s | — | [brief](briefs/gate-final.md) → [report](reports/20260830-gate-final.md) | [trace](claude-code/agent-agate-final-28a2ab8618420328.jsonl) |
| video-final | GPT-5.6 Sol | Codex CLI | 2026-08-30 07:09:23 | 66m 4s | — | [brief](briefs/video-final.md) → [report](reports/20260830-070923-video-final.md) | [trace](codex/20260830-070923-video-final.codex.jsonl) |
| metrics-hard | GPT-5.6 Sol | Codex CLI | 2026-08-30 08:56:57 | 180m 31s | — | [brief](briefs/metrics-hard.md) → [report](reports/20260830-085657-metrics-hard.md) | [trace](codex/20260830-085657-metrics-hard.codex.jsonl) |
| redline-quality | GPT-5.6 Sol | Codex CLI | 2026-08-30 08:56:57 | 138m 10s | — | [brief](briefs/redline-quality.md) → [report](reports/20260830-085657-redline-quality.md) | [trace](codex/20260830-085657-redline-quality.codex.jsonl) |
| ui-evals-round2 | Claude Opus 5 | Claude Agent SDK | 2026-08-30 12:00:40 | 31m 52s | $13.56 | [brief](briefs/ui-evals-round2.md) → [report](reports/20260830-120040-ui-evals-round2.md) | [trace](opus/20260830-120040-ui-evals-round2.opus.log) |
| redline-quality-r2 | GPT-5.6 Sol | Codex CLI | 2026-08-30 13:02:44 | 246m 52s | — | [brief](briefs/redline-quality-r2.md) → [report](reports/20260830-130244-redline-quality-r2.md) | [trace](codex/20260830-130244-redline-quality-r2.codex.jsonl) |
| video-round2 | GPT-5.6 Sol | Codex CLI | 2026-08-30 19:37:59 | 18m 45s | — | [brief](briefs/video-round2.md) → [report](reports/20260830-193759-video-round2.md) | [trace](codex/20260830-193759-video-round2.codex.jsonl) |
| gate-round2 (reviewer subagent) | Claude Fable 5 | Claude Code subagent | 2026-08-30T14:08:11.275Z | 61m 6s | — | [brief](briefs/gate-round2.md) → [report](reports/20260830-200900-gate-round2.md) | [trace](claude-code/agent-agate-round2-8339f1e378a06d6c.jsonl) |
| video-round2-fix | GPT-5.6 Sol | Codex CLI | 2026-08-30 19:58:05 | 8m 25s | — | [brief](briefs/video-round2-fix.md) → [report](reports/20260830-195805-video-round2-fix.md) | [trace](codex/20260830-195805-video-round2-fix.codex.jsonl) |
| video-round3 | GPT-5.6 Sol | Codex CLI | 2026-08-31 09:55:44 | 41m 6s | — | [brief](briefs/video-round3.md) → [report](reports/20260831-095544-video-round3.md) | [trace](codex/20260831-095544-video-round3.codex.jsonl) |
| video-round4 | GPT-5.6 Sol | Codex CLI | 2026-08-31 11:03:17 | 41m 44s | — | [brief](briefs/video-round4.md) → [report](reports/20260831-110317-video-round4.md) | [trace](codex/20260831-110317-video-round4.codex.jsonl) |

No Claude Code transcript exceeded the 50 MB export limit.
