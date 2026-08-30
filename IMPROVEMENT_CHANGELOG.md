# Improvement Changelog

Two rounds. **Round 1** (first table) measured issue detection on 12 short contracts with the same playbook; **round 2**
(second table, pre-registered) measured what the product is for — complete, minimal, applied redlines — and added a
long-document tier. Every row is a named configuration in `src/agent/configs.ts`; every number comes from
`evals/results/<id>[.tier].json` and reproduces from the committed replay cache (`pnpm eval --tier all`). Definitions in
[`EVAL.md`](EVAL.md); full tables in [`evals/results/summary.md`](evals/results/summary.md).

**How to read the evidence.** Two rows of this table (`i4-memory` and `final`) are the *same configuration recorded
twice*; they differ by 1.2 pp macro F1. That is our measured run-to-run variance, so F1 differences under about 1.5 pp
are noise and we do not claim them. The differences we stand behind are the ones far outside it: recall, redline
validity, minimality, escalations and status accuracy.

| Stage | Config | What we tried and why | Evidence (macro F1 · validity · halluc. · $/contract) | Decision / learning |
|---|---|---|---|---|
| Baseline 0 | `b0-chat` | Whole contract in one prompt, no playbook — "paste it into a chat assistant". Represents what people do today. | 71.7% · 23.5% · 4.4% · $0.51 | Without a playbook the model flags everything that looks vendor-friendly (40 false positives across 12 contracts, precision 70%) and its "redlines" are prose rewrites: 3 of 51 minimal. It exists to show why the fair baseline must include the playbook. |
| **Baseline** | `b1-prompt` | One direct prompt with basic instructions: contract (numbered paragraphs) + playbook → JSON findings + replacement text; naive string apply. The official fair baseline (same model, same playbook). | 91.5% · 42.7% · 2.9% · $0.35 | The honest surprise of the project. A frontier model with the whole contract and the playbook in one prompt detects issues nearly as well as anything we built (precision 98%, recall 87%). Where it fails is everything *after* detection: 12 findings it could not place in the document, 57% of its redlines rejected by the judge, 11% minimal edits, no path into the `.docx`. Detection was near-saturated on day one; the remaining validity and the document itself became the target. |
| Iteration 1 | `i1-docmodel` | Clause-addressable document model + planner: paragraph ids, section tree, resolved definitions; workers read sections instead of the whole text. (Context) | 91.8% · 41.5% · 3.6% · $1.24 | No F1 change (+0.3 pp, inside variance) — but escalations 12 → 0 and minimal edits 11% → 45%, because every finding must now name a paragraph id and every edit is anchored to verbatim text before it can be written. The document model's value is structural, not statistical: it is what makes real tracked changes possible at all. **Kept.** |
| Iteration 2 | `i2-workers` | One drafter worker per rule with tools (`read_section`, `search`, `get_definition`, `propose_redline`); `propose_redline` rejects non-verbatim anchors. (Tools + orchestration + validation at the tool boundary) | 94.4% · 48.3% · 4.9% · $2.97 | The biggest measured step: recall 87.6% → 92.6% (macro F1 +2.6 pp), validity +6.8 pp, status accuracy 81% → 90%. One rule per worker with tools finds the clauses a single pass skims past — the *missing* insurance, transition and audit items. Cost ×2.4, and the first run showed the price of specialists: precision 75.7% before calibration, because a worker asked about one rule finds a violation (see *Iteration 5* below). **Kept, after calibration.** |
| Iteration 3 | `i3-verifier` | Independent verifier in a fresh context with deterministic pre-checks and a repair loop (≤ 2 rounds); unresolved → escalated to the human. (Verification) | 94.5% · 51.7% · 3.8% · $4.00 | F1 flat (inside variance): the verifier's job is the redline, not detection. Validity 48.3% → 51.7% (best in the ladder), status accuracy 90.6%, hallucinated citations 4.9% → 3.8%, and every failing proposal is repaired or escalated instead of applied — nothing silently written. The first version was too strict (it rejected "thirty (30) days" against a `30 days` regex and any edit longer than 1.5× the original); soft checks became advisory, only anchor / render / contradiction checks stay hard. **Kept.** |
| Iteration 4 | `i4-memory` | Precedent memory: approved redlines keyed by rule, retrieved as model language. (Memory) | 93.6% · 50.6% · 4.3% · $4.02 | On this benchmark memory does not move accuracy (−1.0 pp, inside variance): the 12 contracts are independent, so there is nothing to be consistent *with*. Its value is consistency across a team's contracts — the approved LOL-CAP wording reused verbatim on the next contract, visible in the app — and it is free (+$0.02). **Kept for the product; honestly labelled a non-result for the eval.** |
| Removed | `x-monolith` | One agent handling all 18 rules in a single tool loop with the same tools — to test whether per-rule workers were worth their cost. | 94.1% · 42.4% · 2.1% · $0.99 | The cheapest agent that scores well on detection (F1 within variance of the workers at a third of the cost, best hallucination rate) — and we still removed it. Recall 90.2% vs 92.3–94.2%: one context stops looking after the obvious clauses. Validity 42.4%: back at baseline level, because one context drafting eighteen redlines writes worse redlines. If detection were the product this is the config to ship; the product is the redline. **Removed.** |
| **Final** | `final` | The combination that worked: document model + per-rule workers + verifier + memory, with the calibrated playbook semantics. | 94.8% · 50.6% · 3.8% · $3.51 | Versus the baseline: macro F1 +3.3 pp (recall +5.2 pp at the same precision), validity +7.9 pp, minimal edits 11% → 36%, escalations 12 → 0, status accuracy 77.6% → 86.8%, document integrity 12/12, and the output is a `.docx` with tracked changes rather than JSON. Ten times the cost — $3.51 per contract, about two minutes of a lawyer's time. Citation hallucination is +0.9 pp (3.8% of 1,371 final references vs 2.9% of 272 baseline references — the pipeline cites five times more often), and we report it as it is. |

## The calibration pass — the change that was not a model change

After the first full ladder, the specialist configs were *worse* than the one-prompt baseline: `i2-workers` 84.0% F1
at 75.7% precision (34 false positives), `i3-verifier` 83.7% at 74.5% (36), against `b1-prompt` at 93.5% precision
(archived in `evals/results/pre-calibration/`; scored against the gold as it was then). Reading the false positives one
by one showed a pattern, not noise: a worker given a single rule flagged clauses that already met the rule's *fallback*
(a 60-day renewal notice where the fallback allows 60; a cap at 12 months' fees without the preferred USD floor), and the
playbook never said what "compliant" meant.

The fix was prose, not code: the classification semantics were written into the playbook preamble shared by **every**
config including the baseline (`src/agent/prompts/common.ts`) — *preferred or fallback met = compliant; deviation only
when the fallback fails on a material term; missing = no usable clause* — the regex checks that encoded one phrasing were
relaxed, the gold review corrected the items where the labeller had made the same mistake, and the whole ladder was
re-recorded. Precision moved from 75.7% → 96.6% (`i2`) and 74.5% → 95.3% (`i3`). Recall (96.2% → 92.6% for `i2`) and
the baseline's own F1 (94.9% → 91.5%) moved too, because the gold changed in the same pass; the two ladders are not on
the same gold and we do not compare them row by row — the precision jump is the one difference large enough to survive
that caveat. What we take from it: the largest quality jump in the project came from reviewing our own false
positives and fixing the specification, and no metric would have found it for us.

## Round 2 — measuring what the product is for

Round 1 ended with a result we could not sell and would not hide: a frontier model with the playbook in one prompt
already detects 91.5 % of the issues on 3–8k-word contracts, and the pipeline's +3.3 pp sits inside run-to-run
variance. Detection was the wrong primary metric for this product. Two things were not being measured at all: whether
the redline is *complete* — every element of the playbook position met, applied to the document, minimal — and how any
of this behaves on the 20–60k-word agreements in-house counsel actually receive.

**Pre-registration.** Before the final configuration was run on them, [`plans/campaign/preregistration.md`](plans/campaign/preregistration.md)
(SHA-256 recorded in [`plans/campaign/metrics-hard-log.md`](plans/campaign/metrics-hard-log.md)) fixed: the
long-document tier rule (CUAD titles in the playbook's contract families, ≥ 15,000 canonical words, ≥ 150 paragraphs,
sorted by length, first six — 31 qualified, none was swapped), the metric formulas and denominators, a dev/holdout
split, point predictions, and what would falsify the story. The baseline is unchanged: the same model, the same
playbook, the whole contract, one prompt, its own naive apply.

**New metrics** — scored by an independent GPT-5.6 judge (v2) that gives a verdict per element of the position. The
judge decomposes the prose positions itself and never sees the checklists the pipeline drafts against.
- *Complete redline rate (CRR)* — of gold deviation/missing items, the share whose redline applies to the `.docx`,
  passes the deterministic checks, meets every element of the preferred or of the fallback position, is minimal and
  preserves intent.
- *Applied tracked-change yield* — of gold deviation/missing items, the share that ends up as a valid tracked change in
  that system's own output document (LibreOffice round-trip).
- *Precedent adherence* — redlines for rules with an approved precedent that reuse its language (token Jaccard ≥ 0.6).

**The negative result first.** On the long tier the round-1 pipeline does not beat the baseline: F1 58.8 % vs 60.3 %,
recall 43.7 % vs 45.0 %, CRR 0 % vs 0 %. On the short tier its CRR is 10.5 % against the baseline's 1.1 % — better,
but below the 10-point threshold we had pre-registered as meaningful. Everything round 1 built made detection and
anchoring better and left the redline itself unsolved.

| Stage | Config | What we tried and why | Short tier (12): F1 · CRR · yield · $/contract | Long tier (6): F1 · recall · CRR · yield · $/contract | Decision / learning |
|---|---|---|---|---|---|
| Baseline | `b1-prompt` | As in round 1. | 91.5 % · 1.1 % · 86.3 % · $0.35 | 60.3 % · 45.0 % · 0 % · 41.7 % · $0.79 | Its redlines apply (naive string replacement works) but almost never carry the whole position; on long documents it misses more than half of the issues. |
| Round-1 final | `final` | As in round 1. | 94.8 % · 10.5 % · 86.3 % · $3.51 | 58.8 % · 43.7 % · 0 % · 45.8 % · $5.73 | Better detection on short contracts, no better on long ones, one redline in ten complete. **Kept as the round-1 reference; not the product.** |
| Round 2 · i5 | `i5-elements` | Every playbook position written as an atomic checklist (`position.elements`, 159 items, additive); the drafter must map each element to "already met (quote)" or "addressed by op N"; a fresh-context verifier checks elements one by one with ≤ 3 repair rounds; a deterministic minimality gate. (Verification, tools) | 92.1 % · 34.7 % · 84.2 % · $10.49 | — (no long-document planning) | CRR ×3 over the round-1 final at ×3 the cost, and F1 slipped 2.7 pp with 3 escalations: a worker that must account for every element sometimes fails to submit at all. |
| Round 2 · i6 | `i6-longdoc` | Above 15,000 words: definition-first whole-document search planning, paginated section reads, bounded planner/worker turns. (Context, orchestration) | 93.8 % · 28.4 % · 87.4 % · $5.90 | 75.3 % · 68.6 % · 22.9 % · 62.5 % · $11.11 | The first real long-document gain: F1 +15 pp and recall +24 pp over the baseline, CRR from zero to 23 %, applied yield 42 → 63 %. **Kept.** |
| Round 2 · final v2 | `final-v2` | i6 + approved precedents returned as element-labelled templates. (Memory) | 91.6 % · 32.6 % · 86.3 % · $10.04 | 74.4 % · 67.6 % · 20.8 % · 62.5 % · $11.38 | Memory again moves nothing the eval can see (adherence ≈ 0 on independent contracts). The builder's own judge, shown the pipeline's checklist, had scored this design at 86 %; the independent judge says 33 %. **Superseded.** |
| Round 2 · i7 | `i7-precise` | Iterated only against the independent judge on a four-contract dev split: checklists that mirror the prose phrase by phrase (`position.elementsPrecise`), one committed position level per finding in the position's own words, a minimality gate with the judge's definition, bounded structured repair. (Verification, tools) | 94.7 % · 54.7 % · 91.6 % · $5.10 | — | The step that moved the redline: CRR 32.6 → 54.7 % on the same twelve contracts at half the cost, F1 back to 94.7 %, zero escalations, judge-v2 validity 42.7 → 74.2 %, minimal edits 3.7 → 59.6 %. Honest split: **68.8 % on the four contracts it was developed on, 47.6 % on the eight it never saw** — it over-fitted its dev split, and the holdout is the number we stand behind. |
| Round 2 · final v3 | `final-v3` | i7 + the long-document planner + precedent memory, as built by the iteration track. | 93.9 % · 47.4 % · 87.4 % · $5.21 | 52.2 % · 39.3 % · 20.8 % · 43.8 % · $7.21 | **Regressed on long documents and is not shipped.** The precise worker "locks" round-1 detection, which on a 40k-word document bypasses i6's whole-document search and paginated workers: long-tier recall fell to 39 % (i6: 69 %, baseline: 45 %). The track had measured long documents only per finding on two gold-less dev contracts, so it could not see recall. Memory again ≈ 0. |
| **Final v4** | `final-v4` | A length router: below 15,000 words the run *is* `i7-precise`; at or above it *is* `i6-longdoc` (their prompts and caches, unchanged); memory off. The shipped configuration. | 94.7 % · 54.7 % · 91.6 % · $5.14 | 75.3 % · 68.6 % · 22.9 % · 62.5 % · $11.11 | Versus the baseline on the pre-registered metrics: complete redlines 1.1 → 54.7 % on short contracts (47.6 % on the eight holdout contracts), long-document F1 60.3 → 75.3 % and recall 45 → 69 %, applied tracked changes on long documents 42 → 63 %, judge-v2 validity 42.7 → 74.2 %, minimal edits 3.7 → 59.6 %, zero escalations on short contracts — at $5.10 / $11.11 per contract. Chosen per tier from the ladder after the results, which we say plainly; the route threshold (15,000 words) predates them. **Shipped.** |

**The grader and the student's rubric.** The pipeline track measured its element-aware configuration at 86 % complete
redlines with a development judge that was shown the pipeline's own checklists; the pre-registered judge, which
decomposes the prose positions itself and never sees those checklists, scored the same design at 32.6 %. Both numbers
are reported. A judge that grades with the system's own rubric inflated completeness by roughly 2.5×; every iteration
after `i5` was measured only against the independent judge, and `i7` still over-fitted the four contracts it could see
(68.8 % dev vs 47.6 % holdout). The holdout run is the one we report.

**Disclosures.** (1) `final-v2`'s prompts were iterated on `cuad-americas-shopping-mall-hosting`,
`cuad-bnc-mortgage-hosting`, `synth-12`, `synth-hardcase` and two 15k-word CUAD agreements outside the tier, against a
development judge; `i7-precise`/`final-v3` on the same four short contracts against the independent judge. The other
eight short contracts and all six long ones are a single holdout run each. (2) The round-1 `i3-verifier` long-tier
cell was added after pre-registration to complete the matrix (logged). (3) The tier rule selected four biopharma
development/licence agreements and one ABS servicing agreement; a customer-side vendor-services playbook fits them
less naturally than a hosting MSA — the rule was written before results and we kept it; gold marks rules that do not
apply as `ambiguous` (excluded). (4) Long-tier gold is GPT-5.6-drafted, CUAD-span-anchored (80/121 items) and reviewed
by the evaluation agent, not yet by counsel. (5) Judge v2's decomposition is its own; neither `position.elements` nor
`position.elementsPrecise` is ever shown to it. (6) During the `i5-elements` recording the machine ran out of disk; two
workers failed with `ENOSPC` and were re-recorded in isolation (status log). (7) Judge v2 is stricter than judge v1 on
the same runs (round-1 `final` validity 50.6 % under v1, 44.8 % under v2); round-1 columns keep v1, round-2 columns are
v2 throughout.

## The hard case

`synth-hardcase` — a liability cap that reads "12 months' Fees" where "Fees" is defined elsewhere as a one-off
implementation fee (illusory cap), a non-compete that binds the *vendor* (decoy), an MFN in the customer's favour
(decoy), a convenience-termination right split across two sections, and a customer-payable early-termination fee
buried in the fee schedule.

| Config | TP | FP | FN | F1 | Status accuracy |
|---|---:|---:|---:|---:|---:|
| `b0-chat` | 2 | 8 | 0 | 33.3% | 60.0% |
| `b1-prompt` | 2 | 0 | 0 | 100.0% | 100.0% |
| `i1-docmodel` | 2 | 0 | 0 | 100.0% | 100.0% |
| `i2-workers` | 2 | 0 | 0 | 100.0% | 100.0% |
| `i3-verifier` | 2 | 0 | 0 | 100.0% | 100.0% |
| `i4-memory` | 2 | 0 | 0 | 100.0% | 100.0% |
| `x-monolith` | 2 | 0 | 0 | 100.0% | 100.0% |
| `final` | 2 | 0 | 0 | 100.0% | 100.0% |

We designed this case to show the pipeline beating the baseline, and it did not: every playbook-aware configuration,
including the single prompt, resolved "Fees" to the implementation fee and left both decoys alone. A frontier model with
the whole contract in context does not fall into a definition trap. Only the playbook-less `b0-chat` took the bait (8
false positives: the vendor-side non-compete, the customer-favourable MFN, and everything vendor-friendly around them).
The case still earns its place for what the *trajectory* shows — `get_definition("Fees")` →
`get_definition("Implementation Fee")` → one anchored redline that caps all charges with a floor
([`trajectories/app/final/synth-hardcase/README.md`](trajectories/app/final/synth-hardcase/README.md)) — and for
being the contract where the pipeline's redline is a minimal tracked change and the baseline's is a paragraph rewrite.

## Main failure mode

**The redline is only half right, and the judge can tell.** Redline validity plateaus at ≈ 50% for every agentic
config. Of the 87 final-run redlines the independent judge assessed, 34 fail `satisfies_rule` — almost always a *partial*
fix: the edit improves the clause but omits one element of a multi-part playbook position (the successor-transfer right
in a licence grant, the 60-day renewal reminder, a stated warranty period, the duty to defend inside an indemnity), and
29 are not minimal because a clause that has to be inserted whole (insurance, transition assistance) is scored as a
rewrite. The drafter reads a position as a *direction*; the judge reads it as a *checklist*. The verifier cannot close
the gap today because its deterministic checks only cover the regexes in the playbook, not the position's elements. The
fix we would ship next is a schema change, not another agent: positions as explicit element lists that the verifier can
enumerate and the memo can report as "3 of 4 elements met".

**On detection, the residual errors are "right rule, neighbouring paragraph" — and one genuine miss.** The weakest
final-run contract, `cuad-bluefly-hosting` (82.4% F1: 1 FP, 2 FN), has no wrong rules in it. The false positive and one
of the false negatives are the same finding: the Section 7 `IP` deviation, which the pipeline anchored on paragraphs
a./c./d. (`p0082`, `p0085`, `p0086`) where gold has b./1. (`p0083`, `p0084`) — the paragraph-overlap matcher scores that
once as an FP and once as an FN. The other false negative is a real miss: this contract's gold carries two distinct
`LICENSE` deviations — the revocable Base Components licence in § 12.1 (`p0149`), which the pipeline caught, and the
Type II Materials licence in Section 7 (`p0085`), which it did not; a worker given one rule tends to stop after its
first deviation. We left the gold as it is rather than tune it to the system.

**Round 2 — where the redline still falls short.** Three things, in order of size. (1) *Long documents.* The shipped
router reaches 75 % F1 and 69 % recall on 40k-word agreements (baseline 60 / 45 %), but only 23 % of their gold issues end
as a complete redline and 63 % as any valid tracked change: paginated workers find the clause and then draft a repair
that is broad, incomplete or not minimal, and the precise protocol that fixed this on short contracts (`i7`) did not
transfer — `final-v3` lost recall instead. (2) *Over-fitting the dev split.* `i7-precise` reached 68.8 % CRR on the four
contracts it was tuned on and 47.6 % on the eight it never saw; the remaining short-tier misses are still partial
positions (an unstated warranty period, an indemnity without the duty to defend) and edits the judge calls not minimal.
(3) *Memory.* Precedent adherence is ≈ 0 in every round-2 configuration: on independent contracts there is nothing to be
consistent with, and the element-labelled templates did not change what the drafter wrote. The next fix is not another
agent: it is a long-document repair loop with the same single-level, prose-mirrored discipline as `i7`, measured on gold
we do not tune against.

## Hot take

Give a specialist agent one rule and it will find a violation; give it a *direction* instead of a *checklist* and it
will write half a redline. The two largest quality jumps in this project came from writing the playbook more precisely
— classification semantics in round 1, atomic elements that mirror the prose in round 2 — not from any model, tool or
extra agent. Two more things we would tell anyone measuring agents: never let the grader use the student's rubric (ours
inflated completeness 2.5×), and before you believe a one-point gain, record the same configuration twice — two rows of
our round-1 table are the same pipeline and they differ by more than most published "improvements".
