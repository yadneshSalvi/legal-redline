# HackerEarth submission — Playbook Redliner (ready except the video link)

**Deadline:** Mon 2026-08-31 18:00 UTC (23:30 IST). Submit from the registered HackerEarth account (the participant must submit).

## Fields (HackerEarth "Submission Package")
- **Title:** Playbook Redliner — agentic first-pass contract review with real Word tracked changes, verified and human-approved
- **Repository:** https://github.com/yadneshSalvi/legal-redline (public) — README with intended user, bottleneck, value; labelled *Improvement Changelog*; main failure mode; hot take
- **Live demo:** https://playbook-redliner.vercel.app (later https://playbook-redliner.yadneshsalvi.com)
- **Video (≤ 5 min):** {{VIDEO_URL}} (unlisted YouTube)
- **Reproduction guide:** `REPRODUCE.md` — clean-clone commands for solution, baseline and evaluation; `pnpm eval --all` reproduces every number at zero cost from the committed replay cache; Docker image for a clean environment
- **Agent trajectories:** `trajectories/` — narrated per-run READMEs for the product agents (planner, drafters, verifier, assembler, memo, judge, human checkpoints) for all 12 contracts, plus every coding-agent session (Codex/GPT-5.6 Sol, Claude Opus 5 via Agent SDK, Claude Code/Fable 5 lead) with briefs, reports and redacted event traces
- **Tools disclosure:** Claude Code (Claude Fable 5) as lead orchestrator; GPT-5.6 Sol via Codex CLI and Claude Opus 5 via Claude Agent SDK as builders/reviewers; product runs Claude Opus 5 (drafter/verifier/planner/memo) and GPT-5.6 Sol (independent judge, gold-label drafting); CUAD (CC-BY-4.0) evaluation data

## Short description (≤ 1,000 chars)
Customer-side in-house counsel spend 1–3 hours per vendor contract producing the one thing the negotiation runs on: a Word file with tracked
changes and comments that apply the company playbook. Playbook Redliner turns the .docx into a clause-addressable model, runs one drafter per
playbook rule with tools that validate every edit anchor, has an independent verifier check each redline, remembers approved language, and
waits for a human to accept/edit/reject before writing real OOXML tracked changes and margin comments. Measured on 12 contracts (8 lawyer-labelled
CUAD filings + 4 seeded synthetic incl. a definition-trap hard case) against a fair single-prompt baseline: issue-detection F1 91.5% → 94.8% (recall +5.2 pp at the same precision), redline validity 42.7% → 50.6%, minimal edits 11% → 36%, unplaced findings 12 → 0, document integrity 12/12, at $3.51 per contract. Everything reproduces
from the repo at zero cost.

## Long description (structure)
1. Who has the problem / bottleneck / why it matters (README §1–2)
2. What the agent does and the design choices (context · tools · verification · memory · orchestration) — README §3, SCHEMA.md
3. Evaluation design (EVAL.md): gold provenance, metrics, independent judge, replay cache, hard case
4. Results table (README §5) + changelog summary (biggest win, removed experiment, calibration iteration)
5. Main failure mode + hot take
6. Reproduction + trajectories + tools disclosure

## Pre-submit checklist
- [ ] `pnpm eval --all && pnpm report` from a clean clone reproduces `evals/results/summary.md`
- [x] README / CHANGELOG / REPRODUCE have no `{{` placeholders; numbers match `evals/results` (2026-08-30 07:10 IST)
- [ ] `trajectories/` committed (app + coding agents), secrets redacted
- [ ] Deployed `/evals` shows real data; sample run completes in replay; export works
- [ ] Video uploaded; link in README and submission
- [ ] Final gate review (`plans/harness/briefs/gate-final.md`) verdict approve
- [ ] Author spot-check of gold + one human review session recorded (`trajectories/human/`)
