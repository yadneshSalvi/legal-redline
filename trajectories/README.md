# Trajectories

Representative, easy-to-follow trajectories for **every agent used** — both the agents inside the product and the
coding agents that built it. Secrets are redacted (`sk-…` → `[redacted]`).

```
trajectories/
├─ app/                      product agents (exported by `pnpm export-trajectories`)
│  ├─ final/<contractId>/    planner → drafters (one per rule) → verifier (+ repair rounds) → assembler → memo → human decisions → apply
│  │   ├─ trajectory.jsonl   one TrajectoryEvent per line (llm_request / llm_response / tool_call / tool_result / validation / retry / human_decision …)
│  │   ├─ run.json + findings.json
│  │   ├─ prompts.md         exact first system prompt used by each model-backed agent
│  │   └─ README.md          a narrated walk-through of the run: what each agent did, how tools responded, what the verifier sent back
│  ├─ b1-prompt/<contractId>/ the baseline's single call and naive apply
│  └─ i3-verifier/human-reviewed-msa/  a product run reviewed by a person in the app: 13 accept/edit/reject decisions,
│                                      then apply → output.docx (the human checkpoint and apply stages, narrated)
├─ human/                    recorded review sessions (decisions per finding, used for the human-review-load metric)
└─ coding-agents/            how this repository was built
   ├─ briefs/                the instructions given to each builder/reviewer agent (from plans/harness/briefs)
   ├─ codex/                 GPT-5.6 Sol sessions (Codex CLI JSONL event streams, one file per session)
   ├─ opus/                  Claude Opus 5 sessions (Claude Agent SDK tool logs + final reports)
   ├─ reports/               final harness reports, linked to their briefs in INDEX.md
   └─ claude-code/           the lead orchestrator's Claude Code session transcript (Fable 5)
```

Read `app/final/<contractId>/README.md` first — it is the shortest path from the agent instructions to the final result.
The evaluation runs stop at the human checkpoint by design (nothing is applied without a person), so for the two stages
after it — a human accepting, editing and rejecting findings, and the apply that writes the tracked changes — read
`app/i3-verifier/human-reviewed-msa/README.md`. The independent GPT-5.6 judge's verdicts are not trajectories; they are
in `evals/results/<config>.json → contracts[].judgements` and replay from `evals/cache/judge/`.
