# Playbook Redliner

**An agentic first-pass contract review that hands in-house counsel a Word file with tracked changes they would sign.**

> Upload the vendor's `.docx`. The agent reads it the way a lawyer does — clause by clause against your playbook —
> drafts surgical redlines and margin comments, has an independent verifier check every one, remembers the language
> your team already approved, and waits for you to accept, edit or reject each finding before it writes a single
> tracked change into the document.

Entry for the **micro1 Frontier Engineering Challenge 2026 (Agentic Workflows Hackathon)**. Live demo:
`{{DEPLOY_URL}}` · Video: `{{VIDEO_URL}}` · Reproduction: [`REPRODUCE.md`](REPRODUCE.md) ·
Changelog with evidence: [`IMPROVEMENT_CHANGELOG.md`](IMPROVEMENT_CHANGELOG.md) · Trajectories: [`trajectories/`](trajectories/)

---

## 1. Who has this problem

**Customer-side in-house counsel and contracts managers** — the people who receive a vendor's paper (a master
services agreement, a SaaS subscription, a software licence and maintenance agreement, a hosting agreement) and
have to send it back marked up. Every mid-size company has one to three of them; every one of them has a queue.

## 2. The bottleneck

A first-pass review of 20–60 pages against the company **playbook** (the pre-agreed preferred / fallback /
walk-away positions on liability caps, indemnities, termination, renewals, IP, licence scope, audit rights,
assignment, governing law …) takes **one to three hours per contract**, and the deliverable is not an opinion —
it is a **Word document with tracked changes and comments** the vendor's lawyer can respond to. The work is
repetitive but unforgiving: the risky term is often hidden in a definition three sections away, the same clause
must be redlined consistently with what the team accepted last quarter, and a sloppy edit (a changed word in the
wrong place, a comment pointing at a section that does not exist) costs credibility in the negotiation.

The naive alternative — paste the contract into a chat assistant and ask for risks — produces a plausible list
in prose. It misses clauses in long documents, cites sections that don't exist, cannot write into the `.docx`,
and forgets everything between contracts. Counsel still has to do the actual work.

## 3. What Playbook Redliner does

```
.docx ─▶ ingest ─▶ planner ─▶ 18 drafter workers (one per playbook rule, tools + validated anchors)
                                   │
                                   ▼
                    independent verifier (fresh context, deterministic checks, repair loop)
                                   │
                                   ▼
        assembler + memo ─▶ YOU: accept / edit / reject every finding ─▶ tracked changes + comments in Word
                                                     │
                                                     └─▶ approved language becomes precedent for the next contract
```

- **Reads like a lawyer.** The document becomes a clause-addressable model (paragraph ids, section tree,
  definitions). Workers read sections and resolve defined terms instead of skimming a wall of text.
- **Edits like a lawyer.** Redlines are minimal, word-level tracked changes (`w:ins` / `w:del`) with a margin
  comment that cites the playbook position — real OOXML, opened in Word or LibreOffice, nothing else in the
  document is touched (verified by re-parsing the output).
- **Checks its own work.** A `propose_redline` tool rejects any edit whose anchor text is not verbatim in the
  paragraph; an independent verifier that never sees the drafter's reasoning judges every proposal against the
  rule and sends failures back for repair. What still fails is escalated to you, not silently applied.
- **Remembers.** Accepted redlines are stored as precedents keyed by rule; drafters retrieve them so the third
  liability cap this month is worded like the first two.
- **Keeps you in charge.** Nothing is written into the document until you decide. Keyboard-first review,
  live agent progress, full trajectory of every model call and tool result.

## 4. What existed before, what we added

| Existed before | Added during the hackathon (everything in this repo) |
|---|---|
| CUAD dataset (The Atticus Project, CC-BY-4.0) — 510 lawyer-labelled contracts | Contract selection, text canonicalisation, gold construction and human labelling protocol (`data/contracts/`) |
| Anthropic / OpenAI SDKs, Next.js, `diff`, `jszip`, `@xmldom/xmldom` | OOXML engine (`src/engine`), agent pipeline (`src/agent`), evaluation harness (`src/eval`), UI (`app/`, `src/ui`), playbook (`data/playbooks`) |
| An orchestration harness pattern from a previous project (`plans/harness`, adapted) | Every brief, review and trajectory of the coding agents used to build this (`trajectories/coding-agents/`) |

## 5. Results (headline)

| Metric | Baseline (one prompt + playbook) | Playbook Redliner (final) | Change |
|---|---|---|---|
| Issue-detection F1 (12 contracts) | {{B1_F1}} | {{FINAL_F1}} | {{F1_DELTA}} |
| Redline validity (applies ∧ satisfies rule ∧ judge) | {{B1_VALID}} | {{FINAL_VALID}} | {{VALID_DELTA}} |
| Citation hallucination rate | {{B1_HALL}} | {{FINAL_HALL}} | {{HALL_DELTA}} |
| Document integrity (untouched paragraphs identical, opens in LibreOffice) | n/a (no docx) | {{FINAL_INTEGRITY}} | — |
| Cost per contract | {{B1_COST}} | {{FINAL_COST}} | {{COST_DELTA}} |

Full tables, per-contract results and the hard case: [`evals/results/summary.md`](evals/results/summary.md).
How each iteration earned its place: [`IMPROVEMENT_CHANGELOG.md`](IMPROVEMENT_CHANGELOG.md).

## 6. Repository map

```
app/            Next.js 16 UI + route handlers (SSE progress, apply, precedents, evals)
src/engine/     pure-TS OOXML: parse .docx → DocumentModel; tracked changes + comments writer; validation
src/agent/      llm client (live/record/replay), planner, drafters + tools, verifier, assembler, memory, baselines, configs
src/eval/       datasets (CUAD + seeded synthetic), gold, matching, metrics, independent judge, runner, report
data/           playbooks · contracts (eval set + gold) · precedents seed · templates
evals/          cache (committed model outputs → zero-cost replay) · results · runs
trajectories/   representative app-agent trajectories + coding-agent traces
scripts/        CLIs: review, baseline, eval, report, build-dataset, synth, validate-docx, export-trajectories
```

Contracts that govern the code: [`AGENTS.md`](AGENTS.md) · [`SCHEMA.md`](SCHEMA.md) · [`PLAYBOOK.md`](PLAYBOOK.md) ·
[`EVAL.md`](EVAL.md) · [`STYLE.md`](STYLE.md).

## 7. Main failure mode and hot take

{{FAILURE_MODE_AND_HOT_TAKE}}

## 8. Tools disclosure

Built with coding agents: GPT-5.6 Sol via the Codex CLI (engine, agent core, evaluation, reviews), Claude Opus 5 via the
Claude Agent SDK (UI), orchestrated by Claude Fable 5 in Claude Code (planning, contracts, briefs, merges, gates). Their
trajectories are in `trajectories/coding-agents/`. The product itself runs Claude Opus 5 (drafter, verifier, planner, memo)
and GPT-5.6 Sol (independent evaluation judge and gold-label drafting).

## 9. Licences and data

Code: MIT. Evaluation contracts: CUAD v1 © The Atticus Project, CC BY 4.0 (public SEC filings). Synthetic contracts and
the playbook: original, MIT. No private or personal data is used anywhere.
