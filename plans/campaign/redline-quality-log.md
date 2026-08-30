# Redline-quality dev campaign log

Started 2026-08-30 (IST). The fixed gold dev split is `cuad-americas-shopping-mall-hosting`,
`cuad-bnc-mortgage-hosting`, `synth-12`, and `synth-hardcase`. CRR-dev's denominator is every produced
`deviation|missing` finding with a proposal; a pass requires apply + deterministic checks + every element of
preferred or fallback + deterministic and judge minimality + preserved intent.

The long, gold-less contracts were selected before running a pipeline: canonicalize CUAD titles in families
`hosting|license|services|maintenance|outsourcing|development`, retain contracts with at least 15,000 words,
sort by word count then title, and take the first two that round-trip exactly through `textToDocx` → `parseDocx`.
The selected contracts are Teleglobe Construction and Maintenance (15,095 words, 369 paragraphs) and Tri City
Outsourcing (15,402 words, 320 paragraphs); both round-trip exactly.

## Iteration 0 — strict element baseline (`final`)

**Hypothesis.** Rejudging unchanged round-1 proposals against explicit atomic elements will expose the partial-fix
failure more directly than the v1 holistic judge and provide the before table for prompt/verifier iteration.

**Change.** Added only the dev element judge and measured committed `final` artifacts; no pipeline behavior changed.

| Contract | CRR-dev | Detection F1 | Escalations | Pipeline cost |
|---|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 1/13 (7.7%) | 88.0% | 0 | $4.0269 |
| cuad-bnc-mortgage-hosting | 0/8 (0.0%) | 94.1% | 0 | $3.5566 |
| synth-12 | 0/11 (0.0%) | 94.1% | 0 | $3.7499 |
| synth-hardcase | 0/2 (0.0%) | 100.0% | 0 | $2.1963 |
| **Combined / mean** | **1/34 (2.9%)** | — | **0** | **$3.3824 mean** |

Recurring per-element misses (the remaining misses occurred once each):

| Rule | Level | Misses | Element |
|---|---|---:|---|
| INDEMN | fallback | 3 | Vendor indemnity super-cap of 3× annual fees |
| LICENSE | preferred | 3 | Transferable to Customer successors |
| LOL-CAP | preferred | 3 | Greater of paid-or-payable 12-month fees and USD 1M |
| TRANSITION | fallback | 3 | Data export within 30 days after expiry/termination |
| TRANSITION | preferred | 3 | Data return within 30 days after expiry/termination |
| ASSIGN | fallback | 2 | Written notice for successor assignment |
| ASSIGN | fallback | 2 | Mutual successor assignment |
| ASSIGN | fallback | 2 | Consent for other assignments |
| INDEMN | fallback | 2 | Procure/modify/replace remedy |
| INDEMN | fallback | 2 | Refund if primary IP remedies unavailable |
| LICENSE | fallback | 2 | Affiliates covered on written notice |
| LICENSE | preferred | 2 | Paid-up licence irrevocable |
| LICENSE | preferred | 2 | Subscription termination only for uncured material breach |
| LOL-CAP | fallback | 2 | Cap based on 12 months of fees |
| LOL-CAP | preferred | 2 | Mutual indirect/consequential exclusion |
| WARRANTY | preferred | 2 | No-malicious-code warranty |

**Decision: keep.** The judge is intentionally much stricter than v1 and correctly surfaces the known omitted
successor, timing, defence/procedure, cap-basis, and warranty elements. Move to `i5-elements`; do not interpret the
2.9% as comparable to the changelog's v1 38% complete/minimal/intent rate. These baseline values were refreshed
after the insertion-order renderer fix, against the same final element set used for the promoted run.

## Iteration 1 — atomic drafter + verifier at maximum pipeline effort

**Hypothesis.** Exact preferred/fallback mappings, a fresh element verifier, and up to three repairs will lift the
strict dev CRR above 70% without losing detections.

**Change.** Added the element-only drafter/tool/verifier path, exact coverage and 1.5× replacement gates, and used
maximum Claude effort as an intentionally conservative quality probe. The BNC run reached all 18 rule findings but
its review process ended during the memo call, so it is retained as a superseded cache and excluded below.

| Contract | CRR-dev | Detection F1 | Escalations | Pipeline cost |
|---|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 11/14 (78.6%) | 88.0% | 1 | $11.0775 |
| synth-12 | 7/9 (77.8%) | 94.1% | 0 | $8.4430 |
| synth-hardcase | 2/2 (100.0%) | 100.0% | 0 | $5.4625 |
| **Combined / mean** | **20/25 (80.0%)** | — | **1** | **$8.3276 mean** |

The five strict failures were: `synth-12/NONCOMPETE` and `synth-12/T4C` (independent judge minimality), plus
`Americas/LD` (dangling Termination Payment mechanics caused element/minimality/intent failures),
`Americas/LOL-CAP` ("preceding event" substituted for exact "preceding claim" and the insertion carried extras),
and `Americas/INSURANCE` (one-year tail and at-own-expense language were outside the selected elements). The one
escalation was not substantive: T4C's literal `Customer` regex rejected complete language using the defined alias
`Company`, causing three futile repairs.

Most frequent element misses after the change (the table includes alternate-level misses even when the other level
was complete):

| Rule | Level | Misses | Element |
|---|---|---:|---|
| GOVLAW | fallback | 2 | Corresponding fallback forum |
| GOVLAW | fallback | 2 | Fallback governing law |
| INDEMN | fallback | 2 | Procure/modify/replace remedy |
| INDEMN | fallback | 2 | Refund backstop |
| INDEMN | fallback | 2 | 3× annual-fees super-cap |
| IP | fallback | 2 | Business-use sublicense |
| IP | fallback | 2 | Worldwide licence |
| LOL-CAP | preferred | 2 | Exact paid-or-payable 12-month claim basis + USD 1M |

**Decision: keep quality behavior, tune cost and edge cases.** CRR clears 70% and F1 is unchanged, but the mean and
two individual costs fail the cap. Normalize defined-party aliases for element-config checks, require already-met
evidence paragraphs to be cited, make the checklist a drafting ceiling, flag dangling references, and lower pipeline
effort from max to high for the cost-controlled iteration.

## Iteration 2 — alias-safe, checklist-ceiling, high-effort cost pass

**Hypothesis.** High effort retains checklist compliance while avoiding max-effort thinking cost; stricter
minimality wording removes the five known independent-judge failures, and alias normalization removes false repairs.

**Change.** Added alias-aware deterministic checks (without changing byte-stable playbook checks), cited
already-met evidence enforcement, explicit bans on non-element boilerplate and broad overrides, dangling-reference
inspection, exact temporal anchors, relevant definitions in the dev judge, and high/high drafter/verifier effort.

| Contract | CRR-dev | Detection F1 | Escalations | Pipeline cost |
|---|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 11/14 (78.6%) | 88.0% | 1 | $7.6954 |
| cuad-bnc-mortgage-hosting | 7/11 (63.6%) | 80.0% | 0 | $6.0882 |
| synth-12 | 6/8 (75.0%) | 87.5% | 1 | $4.7905 |
| synth-hardcase | 1/2 (50.0%) | 100.0% | 0 | $2.6770 |
| **Combined / mean** | **25/35 (71.4%)** | — | **2** | **$5.3128 mean** |

The high-effort cost change succeeded on three contracts and cut the mean by 36%; Americas exceeded the $7.02
ceiling because impossible literal checks caused six needless RENEWAL/T4C repair turns. The same checks caused the
two escalations (`sixty (60) days` was invisible to a digit-first regex; preferred NOSOLICIT removal could not
supply fallback duration/carve-out evidence). The strict CRR still cleared 70% in aggregate, but BNC and synth-12
F1 failed the guardrail. Root causes were specific: conditional use of an optional interface was mislabelled as
exclusivity; natural-term non-renewal was duplicated under T4C; and BNC's broad Vendor right to resell/exploit
Credit Data was observed but not repaired or cited under IP. The independent judge also rejected inferred
`pro rata`, alternate-court carve-outs, broadened cap bases, reciprocal Vendor assignment rights, and fallback
warranty periods drafted above the selected thresholds.

**Decision: keep the effort reduction; repair classification and evidence boundaries before final.** Add legal
word-plus-numeral normalization, make NOSOLICIT/RENEWAL legacy checks conditional on the chosen branch, add the
missing Vendor-data-licence element to both IP levels, supply relevant definitions to the judge, and state the
identified rule boundaries and exact-minimality cases in the new prompts. Do not promote this run as final.

## Iteration 3 — long-document planner budget (`i6-longdoc`)

**Hypothesis.** Per-rule whole-document search plus paginated worker reads finds all responsive clauses at 15k–40k
words without planner failure or unbounded context.

**Change.** The first two recorded attempts exhausted an eight-iteration planner loop before all 18 required
searches. Their caches are retained. Raised the long-only planner bound to 28, added deterministic whole-document
fallback on planner interruption, and removed planner section reads: planning consumes search snippets, while the
24-turn workers own bounded `read_section` pagination. A measurement-rendering defect found during this iteration
was fixed before recording the numbers below: insertions are now shown immediately after their anchor in document
order, rather than appended after all cited context.

| Contract | CRR-dev | Detection F1 | Escalations | Pipeline cost | Duration |
|---|---:|---:|---:|---:|---:|
| cuad-long-teleglobe-construction-maintenance | 9/9 (100.0%) | n/a | 0 | $7.9108 | 688.5s |
| cuad-long-tri-city-outsourcing | 10/14 (71.4%) | n/a | 0 | $9.7658 | 807.7s |
| **Combined / mean** | **19/23 (82.6%)** | — | **0** | **$8.8383 mean** | **748.1s mean** |

Tri-City's four strict failures were bounded, substantive edge cases rather than planner omissions: its fallback IP
licence left a broader “purposes contemplated by this Agreement” Customer-Data use right; affiliate licence coverage
was added even though the defined term `Customer` already included affiliates; transition assistance did not
guarantee the stated period following every termination; and a report-to-manual warranty was not an express software
conformance warranty. The rendered insurance list item passed after insertion order was corrected.

**Decision: keep.** Both 15k-word inputs completed with all 18 rule workers, no escalation, and CRR above 70%; the
final implementation additionally uses the deterministic search fallback if the bounded model planner is interrupted.
Carry the thresholded long-document path into `final-v2` and add element-labelled precedent memory.

## Iteration 4 — `final-v2` memory pass and gold guardrails

**Hypothesis.** Returning approved precedent language with explicit preferred/fallback element markers will preserve
the i5 completeness gains without adding precedent boilerplate or exceeding the short-contract cost ceiling.

**Change.** Enabled precedent lookup only in `final-v2`; each result carries the exact elements for its approved
level next to the frozen approved language. The drafter must adapt the language and independently map every marker.
The long-document path remains thresholded at 15,000 words, so these four short contracts use the round-1 planner.

| Contract | CRR-dev | Detection F1 | Escalations | Pipeline cost |
|---|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 13/15 (86.7%) | 92.3% | 0 | $6.5413 |
| cuad-bnc-mortgage-hosting | 6/8 (75.0%) | 94.1% | 0 | $5.1162 |
| synth-12 | 9/9 (100.0%) | 94.1% | 0 | $4.8512 |
| synth-hardcase | 2/2 (100.0%) | 100.0% | 0 | $3.2517 |
| **Combined / mean** | **30/34 (88.2%)** | — | **0** | **$4.9401 mean** |

The four failures were independently actionable. Americas IP permitted a Customer-approved use exception outside
service delivery, and its auto-renewal text let Vendor choose any termination date rather than only term end. BNC's
fallback assignment retained a no-consent affiliate exception, while its fallback licence redundantly edited a
personnel-access clause after already extending the entity-level grant.

**Decision: keep and tighten the measured edge cases.** All primary guardrails pass and every short run costs less
than $7.02. Add literal guidance for those four defects plus the Tri-City transition/software-warranty cases, then
rerun only the affected CUAD gold contracts before promotion. Retain all superseded record caches.

## Iteration 5 — frozen `final-v2`

**Hypothesis.** Literal handling of standing versus consent-contingent data rights, term-end Vendor exits, assignment
exceptions, transition duration, and quoted party aliases will remove the remaining F1 regression and mechanical
escalation without weakening the checklist discipline.

**Change.** Distinguished service-delivery processing from independent Customer-Data exploitation; treated a future
Customer consent as no present licence; required explicit term-end Vendor T4C language; tightened assignment/licence,
transition and warranty boundaries; and normalized quoted defined-party labels before applying byte-stable round-1
regex checks. The prompt and gate set was then frozen and all six contracts were freshly recorded.

| Contract | CRR-dev | Detection F1 | Escalations | Pipeline cost |
|---|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 14/15 (93.3%) | 92.3% | 0 | $6.9103 |
| cuad-bnc-mortgage-hosting | 7/8 (87.5%) | 94.1% | 0 | $6.0976 |
| synth-12 | 9/9 (100.0%) | 94.1% | 0 | $5.1778 |
| synth-hardcase | 2/2 (100.0%) | 100.0% | 0 | $3.2368 |
| cuad-long-teleglobe-construction-maintenance | 8/11 (72.7%) | n/a | 0 | $8.2256 |
| cuad-long-tri-city-outsourcing | 11/14 (78.6%) | n/a | 0 | $9.1005 |
| **Combined / mean** | **51/59 (86.4%)** | — | **0** | **$6.4581 mean** |

Short-contract mean cost is $5.3556 and every short contract is below the $7.02 ceiling. Relative to the fixed
per-contract `final` F1 values, deltas are +4.3, 0.0, 0.0 and 0.0 percentage points. All six frozen record caches
replayed at zero cost. Their six accepted-change DOCX exports passed `validateDocx` with no collateral paragraphs,
and LibreOffice PDF conversion plus DOCX round-trip preserved every tracked insertion, deletion and comment (6/6).

Representative failure-causing target-element misses:

| Target element | Strict `final` baseline | Frozen `final-v2` |
|---|---:|---:|
| Exact paid-or-payable 12-month claim cap plus USD 1M | 3 | 0 |
| Customer payment obligations outside the cap | 1 | 0 |
| Licence transfer to the selected successor scope | 3 | 0 |
| Express Vendor duty to defend at the selected level | 1 | 0 |
| 30-day transition data return/export | 3 | 0 |
| 60-day automatic-renewal reminder when the preferred branch is selected | 1 | 0 |

The eight remaining CRR failures are bounded: two target warranty-period misses, one Teleglobe indemnity super-cap,
one Teleglobe no-LD element, an inoperative Teleglobe insurance rewrite, one Tri-City assignment exception, and two
judge-only minimality/intent failures (BNC licence; Tri-City minimum commitment).

**Decision: promote.** Aggregate and per-contract long CRR exceed 70%, every gold F1 guardrail passes, escalation is
zero, all short costs pass, and every exported dev artifact is structurally and LibreOffice-valid. Further tuning is
more likely to overfit these two unusual long agreements than to improve holdout quality.
