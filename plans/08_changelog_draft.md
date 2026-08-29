# Changelog narrative draft (lead) — numbers to be filled from `evals/results/*.json` via `pnpm render-docs`

## Decision / learning cells (qualitative, evidence-backed)

**b0-chat — "paste it into a chat assistant".** No playbook, free-text answer, extraction pass. Finds the obvious (recall ~0.8) but
flags many things a customer-side lawyer would not (precision ~0.6), produces the weakest redlines (judge pass ~27 %, minimality ~4 %)
and cannot write into the document. Learning: the problem is not "can the model read a contract" — it is *whose* position it should take.

**b1-prompt — one direct prompt with the playbook (official baseline).** Same model, same playbook, one call. Detection jumps
(F1 {{B1_F1}}); redlines are still mostly rewrites (minimality {{B1_MIN}}), a judge rejects more than half ({{B1_VALID}} valid), and the
prompt cannot escalate what it is unsure about. Learning: context (the playbook) is the single biggest lever for *finding* issues; a frontier
model with the whole document in context is already a strong detector. Everything after this row is about the *edit*, not the *find*.

**i1-docmodel — clause-addressable document model + planner.** Paragraph ids, section tree, resolved definitions, section-scoped reads.
Escalations drop from 12–14 to ~1 because the model can now cite exact paragraphs; minimality nearly doubles ({{I1_MIN}}). Detection does not
improve on its own ({{I1_F1}}) — knowing *where* to read is not the same as knowing *what to flag*. Kept: it is the substrate every later stage needs.

**i2-workers — one drafter per rule with validated tools.** `propose_redline` rejects non-verbatim anchors; each worker reads only what its
rule needs. Recall rises to {{I2_R}} (the best of any config — a specialist per rule does not forget rules), judge pass rises to {{I2_JUDGE}}.
Cost rises ~10× over the baseline. Precision falls: **a worker given one rule wants to find a violation** (see iteration 5).

**i3-verifier — independent verifier with deterministic pre-checks and a repair loop.** Fresh context, never sees the drafter's reasoning.
Validity {{I3_VALID}} (from {{I2_VALID}}); escalations rise because the verifier now refuses to sign redlines it cannot defend — those go to the
human instead of into the document. Learning: the first version failed correct redlines on heuristics (a changed-character ratio, regexes that
did not know "thirty (30) days"); we made heuristics evidence for the verifier rather than verdicts, keeping only anchor validity as a hard gate.

**i4-memory — precedent memory.** Approved language keyed by rule, retrieved as model language. {{I4_EFFECT}}. Learning: memory changes
*consistency* (the same cap language every time) more than accuracy; it needs provenance — a bad precedent is repeated as confidently as a good one.

**Iteration 5 — calibration (fallback-met = compliant).** Reviewing the 36 false positives of i3 showed that most were clauses that already met
the playbook's *fallback* position (Delaware law, a 90-day convenience right, a 90-day warranty) or missed one minor sub-element of *preferred*
(no CPI cap). We wrote the classification semantics into the shared playbook preamble — for every config including the baseline — and re-ran the
ladder. {{CALIBRATION_EFFECT}}. Learning: calibration is a *playbook semantics* problem, not a model problem; per-rule specialists need it
most, and a single reader with the whole document is naturally better calibrated.

**x-monolith — removed.** One agent, all 18 rules, same tools, no verifier. {{X_EFFECT}}. Removed because {{X_REASON}}.

**final.** i4 + calibration. {{FINAL_ROW}}.

## Hard case (synth-hardcase)
Definition chain (§1.5 "Fees" → §1.6 "Implementation Fee" USD 12,000) that makes a "12 months' Fees" cap illusory; a non-compete that binds the
vendor; an MFN in our favour; a convenience right split across §9.4 and §29.4; a late-payment liquidated-damages clause. {{HARD_CASE_TABLE}}.
The frontier model with full context resolves the definition in one prompt; what the pipeline adds here is the *redline* (cap on all charges with
a floor, not a rewrite) and refusing to flag the two decoys.

## Main failure mode
{{FAILURE_MODE}} — candidates: (1) over-flagging at the fallback (fixed by iteration 5 — but the remaining precision gap is still where a
specialist-per-rule design pays a price); (2) the independent judge disagreeing with a legally defensible redline about *drafting* (validity
plateaus around {{FINAL_VALID}} because "satisfies the rule" is itself a judgment call); (3) verifier escalations on compliant-because-absent
clauses (fixed).

## Hot take
Candidate A: "Detection is a solved problem for a frontier model with the whole contract in context; the engineering that matters is at the
edit — verbatim anchors, minimal diffs, an independent verifier, and telling the agent what *acceptable* means. Per-rule specialists are the
best readers and the worst calibrators: give each one a rule and it will find a violation. Calibration lives in the playbook, not the prompt."
Candidate B: "The verifier's real value was permission for the drafter to be aggressive — but only after we demoted our own heuristics from
verdicts to evidence; a regex that fails on 'thirty (30) days' is worse than no regex."
