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

## Long description (ready to paste; replace VIDEO_URL)

**Who has the problem.** Customer-side in-house counsel and contracts managers: the people who receive a vendor's
master services, SaaS, licence or hosting agreement and have to send it back marked up. The deliverable is not an
opinion — it is a Word file with tracked changes and margin comments that applies the company playbook (preferred /
fallback / walk-away positions on liability caps, indemnities, termination, renewals, IP, licence scope, audit,
assignment, governing law …). A first pass takes 1–3 hours per contract, the risky term is often hidden in a definition
three sections away, and a sloppy edit or a citation to a section that does not exist costs credibility in the
negotiation. Pasting the contract into a chat assistant produces a plausible list in prose: it cannot write into the
.docx, misses clauses in long documents and forgets everything between contracts.

**What Playbook Redliner does.** Upload the vendor's .docx and pick the playbook. The document becomes a
clause-addressable model (paragraph ids, section tree, resolved definitions). A planner maps each of the 18 playbook
rules to the sections and definitions that matter; one drafter worker per rule reads sections, searches, resolves
defined terms and must validate every edit anchor verbatim through a `propose_redline` tool before it can submit. An
independent verifier — a fresh context that never sees the drafter's reasoning — runs deterministic checks and judges
each proposal against the rule, sends failures back for repair (≤ 2 rounds) and escalates what still fails to the
human instead of applying it. Accepted redlines become precedents keyed by rule and are retrieved as model language on
the next contract. Nothing is written until counsel accepts, edits or rejects each finding (keyboard-first review with
live agent progress and a full trajectory of every model call and tool result); export then writes real OOXML tracked
changes (w:ins / w:del) and margin comments citing the playbook rule, plus an issues memo, and re-parses the output to
prove every untouched paragraph is byte-identical. Design choices, in the judges' vocabulary: context (document model +
definitions), tools with validation at the tool boundary, orchestration (planner → per-rule workers → verifier →
assembler), verification (independent verifier + deterministic checks + escalation), memory (precedents), human
checkpoint (accept / edit / reject before any write).

**How it is measured.** 12 contracts — 8 lawyer-labelled CUAD filings (CC-BY-4.0) and 4 seeded synthetic ones, one of
them a definition-trap hard case — one playbook, gold of 144 items — one per rule per contract, a second where CUAD labels two distinct clauses (LLM-drafted, human-confirmed; protocol in
data/contracts/LABELING.md). The baseline is fair: the same model (Claude Opus 5) with the same playbook in one prompt.
Metrics: issue-detection F1 (primary), deviation-status accuracy, redline validity (applies ∧ deterministic checks ∧ an
independent GPT-5.6 judge), minimality, document integrity (LibreOffice round-trip), citation hallucination, cost and
latency. Every model output is cached, so `pnpm eval --all` reproduces every number at zero cost.

**Results.** Baseline → final: macro F1 91.5% → 94.8% (recall +5.2 pp at the same 98% precision), deviation-status
accuracy 77.6% → 86.8%, redline validity 42.7% → 50.6%, minimal edits 11% → 36%, findings the system could not place
12 → 0, document integrity 12/12, output a .docx with tracked changes instead of JSON — at $3.51 per contract (×10).
Eight configurations in the labelled Improvement Changelog: the document model bought anchoring, not F1; per-rule
workers with tools were the biggest measured step (recall 87.6% → 92.6%); the verifier bought validity and zero silent
failures; memory is an honest non-result on independent contracts; the single-agent monolith was removed (a third of
the cost, lower recall, baseline-level validity). Two rows are the same configuration recorded twice — 1.2 pp apart —
so we state that F1 differences under ~1.5 pp are noise and only claim the differences far outside it. The iteration
that mattered most was not a model change: reading our own false positives showed the specialists over-flagged clauses
that already met the fallback; writing the classification semantics into the playbook (shared by every config, baseline
included) moved specialist precision from 76% to 97%.

**Main failure mode.** The redline is only half right: validity plateaus at ≈ 50% because the drafter reads a playbook
position as a direction while the judge reads it as a checklist — 34 of 87 final redlines omit one element of a
multi-part position, 29 are whole-clause insertions scored as rewrites. The next fix is a schema change (positions as
element lists the verifier can enumerate), not another agent. On detection, the residual errors are "right rule,
neighbouring paragraph".

**Hot take.** Give a specialist agent one rule and it will find a violation — the biggest quality jump came from writing
the semantics into the playbook, not from any model, tool or extra agent. And before you believe a one-point gain on an
agent benchmark, record the same configuration twice.

**Reproduction and evidence.** REPRODUCE.md (clean-clone commands, Docker image, runtimes and costs); trajectories/
holds narrated trajectories of every product agent for all 12 contracts, the human review sessions, and every
coding-agent session used to build the project (GPT-5.6 Sol via Codex, Claude Opus 5 via the Agent SDK, Claude Fable 5
lead in Claude Code) with briefs, reports and redacted traces. Live demo: https://playbook-redliner.vercel.app. Video:
VIDEO_URL.

## Video upload text (YouTube, unlisted)
- **Title:** Playbook Redliner — agentic contract redlining with real Word tracked changes (micro1 Agentic Workflows Hackathon 2026)
- **Description:** An agentic first-pass contract review for customer-side in-house counsel: playbook-driven, one drafter per rule with validated edit anchors, an independent verifier, precedent memory, a human accept/edit/reject gate, and real OOXML tracked changes + comments. Measured on 12 contracts against a fair single-prompt baseline (F1 91.5% → 94.8%, redline validity 42.7% → 50.6%, minimal edits 11% → 36%). Repo: https://github.com/yadneshSalvi/legal-redline · Demo: https://playbook-redliner.vercel.app

## Pre-submit checklist
- [ ] `pnpm eval --all && pnpm report` from a clean clone reproduces `evals/results/summary.md`
- [x] README / CHANGELOG / REPRODUCE have no `{{` placeholders; numbers match `evals/results` (2026-08-30 07:10 IST)
- [ ] `trajectories/` committed (app + coding agents), secrets redacted
- [ ] Deployed `/evals` shows real data; sample run completes in replay; export works
- [ ] Video uploaded; link in README and submission
- [ ] Final gate review (`plans/harness/briefs/gate-final.md`) verdict approve
- [ ] Author spot-check of gold + one human review session recorded (`trajectories/human/`)
