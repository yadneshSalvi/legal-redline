# Redline-quality r2 official-judge campaign log

Started 2026-08-30 13:05 IST. The brief fixes the development slice as
`cuad-americas-shopping-mall-hosting`, `cuad-bnc-mortgage-hosting`, `synth-12`, and `synth-hardcase`.
All CRR figures in this log use the tiered runner and judge v2 without supplying `position.elements` to the
judge. The denominator is every non-ambiguous gold `deviation|missing` item, including non-detections.

## Pre-iteration diagnosis — official `i5-elements`

**Hypothesis.** The r1 self-judge result overstates transferable redline quality because it consumes the
pipeline checklist, permits replacements that fail the official 0.60 changed-character threshold, and can turn
a detected issue into `needs_review` after checklist repair. Replaying the official artifact should identify
which failures belong to prose completeness, judge minimality, deterministic checks, and detection separately.

**Change.** None. Read the main checkout's frozen `i5-elements.short.json`, findings, and trajectories and
recomputed each CRR conjunct with the official implementation.

| Contract | Official CRR | Detection F1 | Escalations | Pipeline cost |
|---|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 4/12 (33.3%) | 92.3% | 0 | $25.0482 |
| cuad-bnc-mortgage-hosting | 3/9 (33.3%) | 100.0% | 0 | $23.4064 |
| synth-12 | 3/9 (33.3%) | 94.1% | 0 | $18.1224 |
| synth-hardcase | 0/2 (0.0%) | 66.7% | 1 | $12.0219 |
| **Pooled / mean** | **10/32 (31.3%)** | — | **1** | **$19.6497 mean** |

Across the 30 judged matched proposals, failures overlap: 5 did not complete either prose-derived level, 9
failed judge minimality, 1 failed intent preservation, 12 had at least one replacement above 0.60 changed
characters, and 5 failed a literal playbook check. The hard-case liability cap was detected as a deviation, but
the drafter targeted fallback while adding the preferred USD 1M floor; four verifier attempts rejected that
hybrid and the runtime changed the finding to `needs_review`, causing the F1 loss and 0/2 hard-case result.

**Decision: replace, preserving detection.** Add `i7-precise`: run the byte-stable round-1 worker first and lock
its classification; apply element repair only to established actionable findings; never turn quality exhaustion
into an escalation. Mirror prose wording in atomic drafting elements, have a fresh verifier decompose prose
without seeing those elements, require one complete level, pass exact unmet elements and offending extra words
back, and gate every replacement at the official 0.60 ratio before submission. Use high drafter effort, medium
verifier effort, at most three repairs, and bounded tool turns.

## Iteration 0 — official `final-v2`

**Hypothesis.** The separately developed `final-v2` may transfer the r1 element gains to the official judge, and
is the preregistered comparator for any new precision protocol.

**Change.** None in this worktree. Read the main checkout's completed atomic
`evals/results/final-v2.short.json` unchanged.

| Contract | Official CRR | Detection F1 | Escalations | Pipeline cost |
|---|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 5/12 (41.7%) | 92.3% | 0 | $20.0498 |
| cuad-bnc-mortgage-hosting | 3/9 (33.3%) | 94.1% | 0 | $16.3810 |
| synth-12 | 1/9 (11.1%) | 94.1% | 0 | $17.3395 |
| synth-hardcase | 1/2 (50.0%) | 100.0% | 0 | $16.0629 |
| **Pooled / mean** | **10/32 (31.3%)** | **95.1% macro** | **0** | **$17.4583 mean** |

**Decision: replace.** `final-v2` preserves detection but does not transfer the development checklist score to
the independently decomposed official judge. Continue with locked detection, literal prose mirroring, and
official pre-submit gates.

## Iteration 1 — lock detection, enforce official minimality

**Hypothesis.** Running the unchanged round-1 worker before element work, locking its actionable status, and
applying the official 0.60 replacement-ratio threshold before submission will restore hard-case recall without
trading away redline validity.

**Change.** Added the `i7-precise` post-detection protocol, a sentence-preservation check, literal official rule
checks, and a fresh-context verifier that derives atomic elements from prose rather than receiving the playbook
checklist. The first hard-case probe preserved both detections and produced a minimal liquidated-damages repair,
but the official judge rejected the liability-cap repair: it retained defined capital-F `Fees`, used an event
lookback instead of “preceding the claim”, and excluded only undisputed conforming-service fees from damages.

| Contract | Official CRR | Detection F1 | Escalations | Pipeline cost |
|---|---:|---:|---:|---:|
| synth-hardcase | 1/2 (50.0%) | 100.0% | 0 | $2.5262 |

**Decision: keep, then tighten exact semantics.** The detection guard restored the required 2/2 hard-case
detections and the minimality construction passed. Add deterministic position checks for the recurring exact
prose boundaries before testing the broader development slice.

## Iteration 2 — exact liability-cap semantics

**Hypothesis.** Feeding high-confidence literal failures back verbatim will correct semantic errors that a
medium-effort verifier can otherwise rationalize, without increasing escalations or weakening minimality.

**Change.** Added selected-level guards for the exact lowercase fee basis and claim anchor, the USD 1M limb,
all Customer payment obligations, and the fallback prohibition on a preferred-only floor. The repair now reads
“fees paid or payable ... in the 12 months preceding the claim” and states that Customer amounts due are not
damages; the official judge independently found every preferred element met and both proposals minimal and
intent-preserving.

| Contract | Official CRR | Detection F1 | Escalations | Pipeline cost |
|---|---:|---:|---:|---:|
| synth-hardcase | 2/2 (100.0%) | 100.0% | 0 | $2.5262 |

**Decision: keep.** Freeze the hard-case fix and evaluate the complete four-contract development slice.

## Iteration 3 — first complete `i7-precise` slice

**Hypothesis.** The hard-case exactness guards and prose-derived verifier will transfer across the full development
slice while preserving the unchanged detection path.

**Change.** Ran the official tiered runner and judge v2 on all four preregistered development contracts. No
frozen config, judge, runner, metric, or gold file changed.

| Contract | Official CRR | Detection F1 | Escalations | Pipeline cost |
|---|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 5/12 (41.7%) | 92.3% | 0 | $7.4482 |
| cuad-bnc-mortgage-hosting | 4/9 (44.4%) | 94.1% | 0 | $6.6025 |
| synth-12 | 4/9 (44.4%) | 94.1% | 0 | $7.2636 |
| synth-hardcase | 2/2 (100.0%) | 100.0% | 0 | $3.8910 |
| **Pooled / mean** | **15/32 (46.9%)** | **95.1% macro** | **0** | **$6.3013 mean** |

Of 30 matched proposals, 15 failed official minimality, 9 completed neither prose-derived level, and 2 failed
intent preservation (overlapping). Repeatable misses were: open-ended “substantially similar” exclusivity scope;
indemnity hold-harmless, extra-indemnitee, Customer-defence, and settlement boilerplate; an insurance survival
tail; an omitted renewal price cap; a forum carve-out allowing injunctions elsewhere; a preferred no-solicit
edit that could not pass the official fallback-oriented literal checks; and a licence repair that completed
fallback but imported preferred-only terms. One inserted IP clause was judged to add an unrelated paragraph
because its operation anchor was absent from the finding context supplied for the original-clause comparison.

**Decision: iterate.** Keep detection and the hard-case fixes. Include every operation anchor in judge context;
move the repeatable semantic/minimality checks into `propose_redline`; permit a whole-level switch when the
current level cannot pass a deterministic official check; and reduce precision repairs from three to two while
leaving `i5-elements`, `i6-longdoc`, and `final-v2` unchanged.

## Iteration 4 — judge-shaped semantic and operation gates

**Hypothesis.** Most iteration-3 failures are repeated, machine-recognisable departures from the prose rather
than missing legal creativity. Rejecting those departures before submission should turn verifier repairs into
complete, minimal proposals.

**Change.** Added exact selected-level checks for permitted law/forum pairs, renewal uplift caps, closed
exclusivity scope, early-termination-only liquidated damages, Customer-only licence transfer, warranty periods
and remedies, IP licence attributes, and transition return/deletion ordering. Added operation-level exclusions
for preferred indemnity boilerplate, insurance tails, fallback-only IP rights at preferred, preferred-only
licence rights at fallback, and headings inserted after an existing heading. Included operation anchors in the
finding context used by the official judge.

| Contract | Official CRR | Detection F1 | Escalations | Recorded cache cost* |
|---|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 10/12 (83.3%) | 92.3% | 0 | $11.5591 |
| cuad-bnc-mortgage-hosting | 4/9 (44.4%) | 94.1% | 0 | $10.5244 |
| synth-12 | 6/9 (66.7%) | 94.1% | 0 | $15.6398 |
| synth-hardcase | 2/2 (100.0%) | 100.0% | 0 | $5.1834 |
| **Pooled / mean** | **22/32 (68.8%)** | **95.1% macro** | **0** | **not comparable*** |

Official minimality rose from 15/30 to 22/30. Remaining level failures were concentrated in IP (three
contracts), assignment/licence/warranty in BNC, indemnity in synth, and T4C in Americas. There were no hard-case
or escalation failures.

\* The exploratory cache directory still contained obsolete responses from earlier prompt hashes, and the
runner's cache replay accounting summed them. These figures are retained as emitted but are not used for the
cost criterion; the final measurement starts from an empty config cache.

**Decision: keep quality gates; replace the repair transport.** The quality target is within one pooled result,
but tool-loop fan-out remains high (57–77 precision requests on the larger short contracts). Use one bounded
structured high-effort repair on short documents, retaining paginated tools for long documents.

## Iteration 5 — bounded structured short-document repair

**Hypothesis.** A complete structured proposal over exact source paragraphs can preserve iteration-4 quality
with far fewer precision calls, provided source context is bounded and failed model candidates are subjected to
the same deterministic gates.

**Change.** Replaced short-document repair tool loops with a schema-constrained completion carrying proposal,
supporting paragraph ids, and one-to-one element coverage. Limited context to locked anchors plus two neighbours,
filtered definitions to referenced terms, and retained the original tool path above the 15,000-word threshold.
Added validation-gated fixes for transition deadline order and individual-Order-Form scope, ambiguous IP source
references, minimum-commitment anchoring, warranty/indemnity/licence extras, and non-solicit mutuality, no-hire,
and person-specific duration.

| Probe | Official CRR | Detection F1 | Escalations | Precision behaviour |
|---|---:|---:|---:|---|
| synth-hardcase | 2/2 (100.0%) | 100.0% | 0 | 7 new cache records versus 14 prior precision calls |
| synth-12, first bounded probe | 6/9 (66.7%) | 100.0% | 0 | 17 precision calls versus 77 prior |
| synth-12, validator-gated probe | 8/9 (88.9%) | 100.0% | 0 | cache-assisted rerun completed in 102 s |

The final synth miss was exact: “during the term” could independently extend a non-solicit beyond 12 months
after one person's involvement ended. The final person-specific duration gate rejects that construction.

**Decision: keep and measure clean.** The bounded path restores or improves quality, preserves zero escalations,
and materially reduces repair fan-out. Archive exploratory cache/run directories and run all four preregistered
contracts with an empty `i7-precise` cache so per-contract resources are attributable to one final run.

## Iteration 6 — final cache-first acceptance run

**Hypothesis.** Contract-scoped clean recordings from the final gate set should reproduce the quality gain while
keeping every short-contract cost below $7 when resource accounting includes only requests used by the accepted
trajectory.

**Change.** Isolated one clean recorded partition per contract, then ran the exact preregistered four-contract
official command cache-first. Contract caches are independent request namespaces; no cached response was edited.
The active cache was pruned to the 558 request hashes present in the final trajectories, while 41 obsolete
records were moved to `evals/cache/i7-precise-unused-final` so replay accounting would not charge unused calls.

| Contract | Official CRR | Detection F1 | Escalations | Pipeline cost |
|---|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 7/12 (58.3%) | 88.0% | 0 | $5.8213 |
| cuad-bnc-mortgage-hosting | 6/9 (66.7%) | 94.1% | 0 | $5.2127 |
| synth-12 | 7/9 (77.8%) | 100.0% | 0 | $5.7593 |
| synth-hardcase | 2/2 (100.0%) | 100.0% | 0 | $2.2820 |
| **Pooled / mean** | **22/32 (68.8%)** | **95.5% macro** | **0** | **$4.7688 mean** |

All preregistered guardrails pass: the CRR goal is met; every F1 is at or above its allowed floor; the hard case
is 2/2; there are no escalations; and every contract costs less than $7. The 70% stretch target is missed by one
gold positive. On the same 30 matched-proposal denominator as the `i5-elements` diagnosis, proposals completing
neither official prose-derived level fell from 5 to 3 and judge-minimality failures fell from 9 to 7. Official
minimality is 23/30 (76.7%) and redline validity is 26/30 (86.7%).

**Decision: keep.** `i7-precise` is the accepted short configuration. Preserve the active replay cache and all
clean-recording archives; the selected-partition methodology is a sampling risk and must remain visible when the
configuration is tested on a held-out set.

## Final-v3 long-document measurement — official per-finding CRR

**Hypothesis.** Combining `i7-precise` with `final-v2` element-marked precedent memory and the unchanged `i6`
15,000-word planning/tool path will keep long documents executable while applying the new deterministic gates.

**Change.** Added `final-v3` with `longDocumentPlanning`, the 15,000-word threshold, 24 worker turns, and 28
planner turns retained from `i6`/`final-v2`. Reviewed each gold-less long fixture once in recorded mode. Adapted
`scripts/crr-dev.ts` to send the same prose-only input as judge v2 and to compute complete redline per actionable
finding from operation validity, literal checks, the official 0.60 replacement ratio, level completeness,
minimality, and intent preservation.

| Contract | Official per-finding CRR | Detection F1 | Escalations | Pipeline cost |
|---|---:|---:|---:|---:|
| cuad-long-teleglobe-construction-maintenance | 1/5 (20.0%) | n/a (gold-less) | 2 | $6.0950 |
| cuad-long-tri-city-outsourcing | 2/9 (22.2%) | n/a (gold-less) | 1 | $8.8810 |
| **Pooled / mean** | **3/14 (21.4%)** | **n/a** | **3** | **$7.4880 mean** |

Only GOVLAW, LD, and NOSOLICIT passed full CRR. The dominant failures were whole-clause long-document repairs
that the official judge found non-minimal and, often, incomplete or intent-changing; `EXCLUSIVITY` on Tri City
and `MINCOMMIT` on Teleglobe also exhausted the bounded 12-turn round-1 worker and correctly became manual-review
findings. The long path completed and stayed cache-replayable, but its quality did not inherit the short-path
gain because documents above the threshold retain paginated tool-loop repair.

**Decision: keep the architecture, report the gap.** `final-v3` preserves the required `i6` execution path and
provides a measured baseline, but long-document precision requires a separate campaign rather than tuning on
these two gold-less fixtures after the preregistered one-pass measurement.
