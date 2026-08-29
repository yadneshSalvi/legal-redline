# Gold review log (lead, human-confirmed pass) — apply with `scripts/gold-review.ts` after dataset-eval r2

Review standard: mark `deviation` only where a careful customer-side in-house lawyer would actually redline under the playbook;
`compliant` when the playbook's preferred/fallback position is met or the clause runs in our favour; `missing` when a `missing`-kind
rule's clause is absent (paragraphIds empty). Merge duplicate items (same rule, same paragraphs) into one item with both CUAD categories.
Every reviewed item → labeler `cuad+human` / `human`, reviewedBy "lead (legal exposure), spot-checked by author".

## cuad-americas-shopping-mall-hosting (Deerskin ↔ HDI) — reviewed 2026-08-30 00:30
| item | rule | draft | decision | why |
|---|---|---|---|---|
| g001+g002 | RENEWAL | deviation ×2 (same p0024) | **merge → deviation** | auto-renewal with 90-day opt-out > 60-day fallback |
| g003 | GOVLAW | deviation (no venue) | **compliant** | New York law is in the accepted set; a silent venue is not a playbook deviation |
| g004 | NONCOMPETE | deviation | deviation | Company barred from similar projects during term, undefined scope |
| g005 | NONCOMPETE | compliant | compliant | binds HDI (vendor) |
| g006 | EXCLUSIVITY | deviation | deviation | HDI exclusive right to the brand online, no performance exit |
| g007 | MINCOMMIT | compliant | compliant | launch-deadline termination right, no commitment |
| g008 | LICENSE | deviation (no affiliates) | **compliant** | §1.4 is a hosting access right; a lawyer would not redline affiliates into it |
| g009, g010 | LICENSE | compliant | compliant | Company's licence *to* HDI; non-transferability binds vendor |
| g011 | AUDIT | deviation | deviation | inspection right lacks once-per-12-months cap; mild but redlined in practice |
| g012 | LOL-CAP | deviation on p0026 | **missing (paragraphIds [])** | no liability cap exists; p0026 is the termination payment, not a cap |
| g013 | LD | deviation | deviation | Company-payable termination payment based on Net Sales |
| g014–g016 | INDEMN, INSURANCE, TRANSITION | missing | missing | absent |
| g017 | WARRANTY | missing | missing | only authority reps; no performance warranty |
| **add** | T4C | — | **deviation on p0024 + p0026** | either party may terminate on 90 days (fallback range) but Company pays a large termination payment — not "without penalty" |

## Pending: remaining 7 CUAD contracts (after r2 paragraph re-split; use `gold-review list <id>`)

## EVAL-DESIGN corrections for dataset-eval r3 (found during review)
1. **One gold item per rule per contract by default**: merge same-rule items (union of paragraphIds and cuadCategories; concatenated notes) unless the
   reviewer marks `distinct: true` (genuinely separate clauses, e.g. two different non-competes). Otherwise one correct finding = 1 TP + N FN.
2. **New status `ambiguous`**: excluded from TP/FP/FN entirely (findings matching an ambiguous item are ignored). Report the count. Use where two
   careful lawyers could reasonably differ.
3. Rule re-assignment during review must be supported by the CLI (`set --rule IP`).

## cuad-bnc-mortgage-hosting (Mortgage Logic ↔ TrueLink) — reviewed 00:40
| item | rule | draft | decision | why |
|---|---|---|---|---|
| g001+g002 | RENEWAL | compliant ×2 | merge → compliant | 1-year term, 30-day notice |
| g003 | GOVLAW | compliant | compliant | California accepted |
| g004 | ASSIGN | deviation | deviation | consent required, no M&A successor carve-out, no reasonableness |
| g005 | MINCOMMIT | deviation | deviation | minimum monthly fees, no reduction right |
| g006+g008 | LICENSE | deviation ×2 (same licence) | merge → deviation (p0022,p0025–p0027) | licence to Client excludes affiliates/contractors, site-restricted |
| g007 | LICENSE → **IP** | deviation | **rule IP, deviation** | Client grants Vendor rights to resell/exploit Credit Data (Customer Data) |
| g009 | LOL-CAP | deviation | deviation | one-sided cap; Client uncapped; carve-outs absent |
| g010, g011 | INSURANCE, TRANSITION | missing | missing | |
| (T4C) | — | no item | none needed | 1-year term with 30-day non-renewal is an acceptable exit |

## cuad-bluefly-hosting (Bluefly ↔ IBM) — reviewed 00:45
| item | rule | draft | decision | why |
|---|---|---|---|---|
| g001+g002 | RENEWAL | deviation ×2 | merge → deviation | 90-day notice; renewal equal to prior term (multi-year possible) |
| g003 | GOVLAW | compliant | compliant | New York |
| g004 | T4C | deviation | deviation | 1-month convenience right subject to unspecified early-termination charges |
| g005 | T4C | compliant (p0159) | **remove** | not a convenience clause (termination on IBM's unilateral changes) |
| g006 | ASSIGN | deviation | deviation | affiliates omitted; one-sided restriction; Customer stays liable |
| g007+g011 | LICENSE → **IP** | deviation ×2 | **merge → rule IP, deviation** (p0082–p0083) | Customer-owned Type I materials licensed back to IBM irrevocably incl. external distribution/sublicensing |
| g008+g012 | LICENSE | deviation ×2 | merge → deviation (p0084) | Type II licence limited to Customer's Enterprise; no contractors/successors |
| g009 | LICENSE | compliant | compliant | no-implied-licence boilerplate |
| g010 | LICENSE | deviation | deviation | revocable Base Components licence |
| g013,g014,g016,g018 | LOL-CAP | deviation ×4 | **merge → deviation** (p0108–p0111, p0115–p0118, p0122) | mutual cap greater of $100k / 12 months' charges *paid*; consequential exclusion carve-out only for IBM's unpaid charges; no confidentiality/data carve-outs; fallback met only partially → redline |
| g015,g017,g019 | LOL-CAP | compliant fragments | **remove** | fragments of the same scheme (limitation period, aggregation language) |
| g020 | LOL-CAP (p0090) | deviation | **rule INDEMN, status ambiguous** | IP indemnity exists with exclusive-remedy + credit cap; lawyers differ |
| g021 | LD | compliant | compliant | credit payable by IBM |
| g022, g023 | INSURANCE, TRANSITION | missing | missing | |

## cuad-corio-hosting (Corio ↔ Commerce One) — reviewed 00:55
| item | rule | draft | decision | why |
|---|---|---|---|---|
| g001+g002 | RENEWAL | compliant ×2 | merge → compliant | 1-year renewals, 30-day notice (initial 5-year term is a T4C matter) |
| g003 | GOVLAW | deviation (AAA arbitration) | **ambiguous** | California law accepted; domestic AAA arbitration is not "arbitration seated abroad"; lawyers differ |
| g004+g005+g006 | ASSIGN | dev/dev/compliant | merge → deviation | mutual consent, M&A carve-out present, affiliate carve-out missing |
| g007+g008+g009 | IP | dev/compliant/dev | merge → **ambiguous** | Corio owns its sole Developments (assigned), but support-related ownership and derivative works are unsettled |
| g010,g011,g013–g022 | LICENSE | deviation ×12 | merge → deviation (p0030–p0033, p0102) | licences exclude affiliates/contractors; transfer only via §14.1; source-code licence time-limited |
| g012 | LICENSE (trademark display) | compliant | **remove** | trademark licence, not the rule's subject |
| g023 | TRANSITION | deviation on p0061 | **missing, paragraphIds []** | no transition/data-return obligation; §5.3 is support |
| g024+g025 | AUDIT | compliant/deviation | merge → compliant | once yearly, independent accountant, cost shifts at >5 %; "reasonable notice" acceptable |
| g026+g028+g029 | LOL-CAP | deviation ×3 | merge → deviation (p0087) | cap = amounts paid for the transaction in 12 months; only indemnity carved out |
| g027 | LOL-CAP (7.3 remedies) | compliant | **remove** | wrong rule |
| g030–g034 | WARRANTY | deviation ×5 | merge → deviation (p0076) | 60-day warranty < 90-day fallback |
| g035, g036 | INSURANCE, T4C | missing | missing | 5-year initial term with no convenience right |

## cuad-sparkling-spring-license (Sparkling ↔ Garman) — reviewed 01:05
| item | rule | draft | decision | why |
|---|---|---|---|---|
| g001 | RENEWAL | compliant | compliant | renewable 1-year maintenance term, no burdensome window |
| g002 | GOVLAW | deviation | deviation | Nova Scotia law/courts outside accepted set |
| g003 | NOSOLICIT | deviation | deviation | mutual no-hire (12 months, directly-involved staff) — playbook rejects no-hire |
| g004 | T4C | compliant | compliant | Sparkling may terminate on 90 days; Garman has no convenience right |
| g005+g006+g007 | ASSIGN | deviation ×3 | merge → deviation (p0033, p0142) | no affiliate/M&A carve-out; Garman's discretion; drop p0030 lead-in |
| g008–g011 | LICENSE | deviation ×4 | merge → deviation (p0028, p0115) | affiliates at Authorized Locations covered but non-transferable to successors; source-code licence not irrevocable |
| g012 | TRANSITION | deviation (p0128) | **remove** (duplicate of g020) | licence continuation ≠ transition; g020 already `missing` |
| g013+g014 | LOL-CAP | deviation ×2 | merge → deviation (p0105) | mutual consequential exclusion but no aggregate cap; carve-outs absent |
| g015–g018 | WARRANTY | compliant ×4 | merge → compliant (p0086) | one-year conformance warranty + acceptance testing |
| g019, g020 | INSURANCE, TRANSITION | missing | missing | |

## cuad-sfg-financial-license (551 FX ↔ SFG/E-Path) — statuses reviewed 01:10; **paragraph ids must be re-mapped after r2** (current paragraphs contain several ARTICLEs each; e.g. g001 RENEWAL points at "ARTICLE III OWNERSHIP")
| item | rule | draft | decision | why |
|---|---|---|---|---|
| g001 | RENEWAL | deviation | deviation (re-map to the renewal-option text) | Licensor's unilateral seven-year renewal option |
| g002 | GOVLAW | compliant | compliant | New York law + NYC courts |
| g003 | NOSOLICIT | deviation | deviation (re-map) | Licensee-only, all Licensor/affiliate employees, 3 years post-term — walk-away |
| g004–g009 | ASSIGN | deviation ×6 | merge → deviation (re-map: change-of-control termination + blanket anti-assignment) | automatic termination on Licensee change of control absent consent; no affiliate/M&A carve-out — walk-away |
| g010 | LICENSE | deviation | deviation (p0018) | licence limited to Licensee and Field of Use; no affiliates/contractors/successors |
| g011 | LICENSE | compliant | **remove** | reservation-of-rights fragment |
| g012+g013+g014 | AUDIT | deviation ×3 | merge → deviation (p0049, p0058) | no frequency cap or notice; cost shifts on any discrepancy |
| g015,g016,g017,g019 | LOL-CAP | deviation ×4 | merge → deviation (p0025, p0026, p0103) | Licensor disclaims nearly all liability; only Licensor capped (½ of amounts paid); Licensee uncapped |
| g018 | LOL-CAP | compliant | **remove** | no-damages-for-termination fragment |
| g020–g024 | INDEMN, INSURANCE, T4C, TRANSITION, WARRANTY | missing ×5 | missing | one-way Licensee indemnity only; AS IS; 36-month term without convenience right |

## Remaining after r2: cuad-kubient-msa-part1, cuad-merit-life-master-services (drafts regenerate with new paragraphs); re-map SFG ids; run `gold-review list` for rules without items on all 8.

## cuad-kubient-msa-part1 (AP ↔ Kubient) — reviewed 01:20 (post re-split ids)
| item | rule | draft | decision | why |
|---|---|---|---|---|
| g001 | RENEWAL | deviation | deviation | auto-renewal; exit only on 90 days after the Initial Term (> 60-day fallback) |
| g002 | GOVLAW | compliant | compliant | Delaware law, New York courts |
| g003 | T4C | deviation | deviation (mild) | Customer convenience right only after the Initial Term on 90 days; Vendor may exit any time on 90 days |
| g004 | ASSIGN | compliant | compliant | affiliate + M&A carve-outs, reasonable consent |
| g005, g006 | ASSIGN (p0025) | compliant | **remove** | Service transfer/third-party access restriction, not assignment of the Agreement |
| g007+g008 | LICENSE | deviation ×2 | merge → deviation (p0002) | revocable, non-transferable, non-assignable; no affiliates/contractors |
| g009+g010 | LOL-CAP | deviation ×2 | merge → deviation (p0027, p0028) | mutual consequential exclusion with indemnity/confidentiality carve-outs but **no aggregate cap at all** |
| g011, g012 | INSURANCE, TRANSITION | missing | missing | |

## cuad-merit-life-master-services (Clear Capital ↔ RadialSpark) — reviewed 01:22
| item | rule | draft | decision | why |
|---|---|---|---|---|
| g001 | GOVLAW | deviation | deviation | Arizona law |
| g002 | NOSOLICIT | deviation | deviation (mild) | mutual 12-month, involved personnel, consent not unreasonably withheld — but no general-advertising carve-out (playbook check) |
| g003 | T4C | deviation | deviation (mild) | 15-day convenience only when no SOW is outstanding; no Customer exit from a running SOW |
| g004 | ASSIGN | deviation | deviation | no affiliate / M&A carve-out |
| g005–g008 | IP | compliant ×4 | merge → compliant (p0017, p0019–p0020, p0033, p0044) | Company owns Works; Contractor keeps pre-existing materials with licence to Company |
| g009+g010 | LICENSE | deviation ×2 | merge → deviation (mild) (p0021) | perpetual, royalty-free, sublicensable, but not irrevocable/transferable to successors |
| g011–g014 | LOL-CAP | deviation ×4 | merge → deviation (p0035, p0036) | Contractor cap = fees paid for the particular Services; carve-out only for ¶9; consequential exclusion without carve-outs |
| g015 | INSURANCE | deviation | deviation (low) | CGL/E&O $1M present, no cyber cover |
| g016, g017 | INDEMN, TRANSITION | missing | missing | heading without operative indemnity |

## Spot-check for the author (≈15 min) — the judgment calls most worth a second legal eye
Run `pnpm exec tsx scripts/gold-review.ts list <contractId>` to see each item with its paragraph text. If you disagree, use
`set <contractId> <itemId> --status … --note "…" --by author` then `promote <contractId>`; the log records your confirmation.
1. cuad-americas: GOVLAW → compliant (NY law, venue silent). T4C → deviation (90-day exit but Net-Sales termination payment).
2. cuad-bluefly: LOL-CAP merged deviation (greater of $100k / 12 months' charges *paid*, carve-outs thin). INDEMN → ambiguous (exclusive-remedy cap). WARRANTY → compliant ("reasonable care and skill").
3. cuad-corio: GOVLAW → ambiguous (California law + AAA arbitration). IP → ambiguous. AUDIT → compliant ("reasonable notice", once yearly).
4. cuad-sparkling: NOSOLICIT → deviation (mutual 12-month *no-hire* of involved staff). LOL-CAP → deviation (no aggregate cap at all).
5. cuad-merit-life: NOSOLICIT → deviation (mild; no general-advertising carve-out). INSURANCE → deviation (no cyber cover).
6. cuad-kubient: T4C → deviation (mild; 90-day right only after the Initial Term). LOL-CAP → deviation (no aggregate cap).
7. synth-hardcase: LOL-CAP deviation relies on §1.5 "Fees" → §1.6 "Implementation Fee" (USD 12,000); T4C compliant via §9.4 ↔ §29.4.
