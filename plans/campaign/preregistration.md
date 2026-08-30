# Metrics-hard pre-registration

Frozen on 2026-08-30 before any `b1-prompt`, `i3-verifier`, or `final` run on a
`long-*` contract and before any judge-v2 call. Dataset construction, paragraph parsing, CUAD-span
mapping, and assisted gold labelling are permitted before measurement; system outputs may not be
inspected while gold is drafted or reviewed. The frozen file's SHA-256 is recorded in
`plans/campaign/metrics-hard-log.md` immediately after this file is written. The campaign brief forbids
this worker from committing, so the lead must commit this pre-registration before authorising a measured
run; the hash is the local ordering evidence.

## Population and deterministic tier rule

The short tier is every promoted evaluation contract whose directory begins `cuad-` or `synth-` (the
12-contract round-1 set). The long tier is derived from `data/raw/cuad/CUADv1.json` as follows, without
examining any system output:

1. Canonicalise each CUAD contract with `canonicalizeCuadText`, then parse it with `parseText`.
2. Keep titles whose case-insensitive filename/title family contains a whole-word form of `hosting`,
   `license`/`licence`/`licensing`, `service`/`services`, `maintenance`, `outsourcing`, `development`,
   `SaaS`, `subscription`, or `master [services] agreement`.
3. Exclude a title already represented by a `cuad-*` contract. Require at least 15,000 canonical words,
   at least 150 canonical paragraphs, and at least one parsed section. Sort by canonical word count
   descending, then CUAD title ascending, and take the first six. Only if fewer than six qualify may the
   word threshold be lowered to 12,000; that fallback was not invoked (31 qualify at 15,000 words).

The resulting population, fixed by that rule, is:

| Rank | Contract id | CUAD title | Words | Paragraphs | Sections |
|---:|---|---|---:|---:|---:|
| 1 | `long-phasebiopharmaceuticalsinc` | PhasebioPharmaceuticalsInc…Development Agreement | 45,074 | 877 | 55 |
| 2 | `long-verizonabsllc` | VerizonAbsLlc…Service Agreement | 44,507 | 1,058 | 75 |
| 3 | `long-array-biopharma-inc` | Array BioPharma Inc. — LICENSE, DEVELOPMENT AND COMMERCIALIZATION AGREEMENT | 42,742 | 848 | 76 |
| 4 | `long-manufacturersservicesltd` | MANUFACTURERSSERVICESLTD…OUTSOURCING AGREEMENT | 41,906 | 1,597 | 338 |
| 5 | `long-revolutionmedicinesinc` | RevolutionMedicinesInc…Development Agreement | 40,426 | 679 | 24 |
| 6 | `long-harpoontherapeuticsinc` | HarpoonTherapeuticsInc…Development Agreement | 37,789 | 702 | 54 |

## Development and holdout split

The development split is the four shortest short-tier contracts and the two shortest selected long-tier
contracts, ties broken by id. It is therefore exactly:

- short: `cuad-americas-shopping-mall-hosting`, `cuad-merit-life-master-services`,
  `cuad-sparkling-spring-license`, `cuad-kubient-msa-part1`;
- long: `long-harpoontherapeuticsinc`, `long-revolutionmedicinesinc`.

Every other tier member is holdout (8 short and 4 long). Pipeline changes may use development only.
Holdout is run once, after configuration freeze, by the lead. This metrics track may measure the already
frozen round-1 config ids requested in the campaign (`b1-prompt`, `i3-verifier`, and `final`); it does not
tune those configs.

## Gold and matching

Gold follows `data/contracts/LABELING.md`. Each contract has one item for every playbook rule, except that
a second item is retained with `distinct: true` when CUAD supplies two genuinely separate clauses. A CUAD
expert span is attached whenever its category maps to the rule; paragraph ids are assigned by normalised
overlap against canonical text. Multiple spans for the same review question are unioned. A disagreement
between the expert span and the assisted assessment, or a question on which careful lawyers could differ,
is labelled `ambiguous` with the reason. Gold is frozen before system output is inspected.

Matching remains EVAL.md section 3: one-to-one by equal rule id and intersecting paragraph ids, with the
existing missing-clause exception. Ambiguous items and findings matched to them are excluded from every
scored denominator below.

## Estimands and exact formulas

Let \(G_t\) be the pooled set of non-ambiguous gold items with status `deviation` or `missing` in tier
\(t\), and let \(m(g)\) be the at-most-one finding matched by the existing matcher. Pooled (micro) tier
rates are the registered headline values; macro detection remains the unweighted mean of contract rates.

- **Detection precision, recall, F1:** unchanged from EVAL.md: \(P=TP/(TP+FP)\),
  \(R=TP/(TP+FN)\), and \(F1=2PR/(P+R)\), with a zero denominator producing zero.
- **Complete redline rate (CRR):** \(|\{g\in G_t: m(g)\text{ has a proposal};\ all\ ops\ validate;
  all\ deterministic\ rule\ checks\ pass;\ (all\ preferred\ elements\ met\lor all\ fallback\ elements\ met);
  judgeV2.minimal;\ judgeV2.preserves_intent;\ replacement\ changed\text{-}character\ ratio\le .60\}|/|G_t|\).
  Non-detections, proposals absent from matched findings, invalid ops, and missing judgements fail.
- **Applied tracked-change yield:** \(|\{g\in G_t: m(g)\text{'s complete proposal is present as native tracked
  changes in that system's accept-all output and the output passes package, collateral-paragraph,
  requested-change-count, and LibreOffice round-trip validation}\}|/|G_t|\). The baseline uses its output
  order and exact-string replacement ops without conflict reconciliation; pipeline configs use
  `reconcileOps` followed by `applyRedlines`. All actionable output proposals, including unmatched ones,
  participate in the output-document integrity check.
- **Precedent adherence:** among matched proposals for gold-positive rules having at least one entry in
  `data/precedents/seed.json`, the share whose proposed operative text has maximum normalised token-set
  Jaccard similarity at least 0.60 to a same-rule precedent's `clauseAfter`. Tokens are unique lowercase
  ASCII alphanumeric terms of length greater than two after `normalizeForMatch`; no stopword removal.
  Two empty texts have similarity 1. The denominator and passing count are both reported.
- **Minimality:** the unchanged round-1 proposal-denominator metric: judge minimal is true and every
  replacement's changed-character ratio is at most 0.60.
- **Cost:** recorded model-under-test USD cost from `RunStats`; judge and labelling cost are excluded.

Every round-1 field and its denominator remains unchanged. Judge-v2 verdicts and the new rates are additive.

## Judge v2

The independent model is OpenAI `gpt-5.6-sol` with `reasoning: { effort: "high" }` and structured output.
For an explicit `rule.position.elements`, the verdict must cover each supplied preferred and fallback element
once. Otherwise the same call first decomposes preferred and fallback prose into atomic elements and judges
each. `satisfies_preferred` and `satisfies_fallback` are true exactly when every element at that level is met.
The request and structured result are cached under `evals/cache/judge-v2/`; replay misses are hard errors.

## Predictions fixed before measurement

Round-1 F1 is already observed (not a blind prediction): `b1-prompt` macro F1 91.5% / micro recall 86.3%;
`final` macro F1 94.8% / micro recall 91.6%. Predictions below concern judge-v2/new-tier outcomes; values are
point predictions with a ±10 percentage-point tolerance unless stated otherwise.

| Config | Tier | Macro F1 | Micro recall | CRR | Yield | Adherence | Model cost |
|---|---|---:|---:|---:|---:|---:|---:|
| `b1-prompt` | short | 91.5% (observed) | 86.3% (observed) | 10% | 65% | 20% | $4.19 (observed) |
| `final` | short | 94.8% (observed) | 91.6% (observed) | 30% | 75% | 45% | $42.15 (observed) |
| `b1-prompt` | long | 65% | 60% | 5% | 35% | 15% | $8 ± $4 |
| `final` | long | 80% | 78% | 25% | 60% | 45% | $90 ± $45 |

The forthcoming element-aware round-2 configuration from the separate engineering track is predicted to
reach development CRR 72% and holdout CRR 65–80% without losing more than 3 points of detection F1 versus
the current `final`. That prediction is not evaluated or tuned in this worktree.

## Falsification and reporting commitments

The central “fair baseline is genuinely weak” claim is falsified if `b1-prompt` pooled CRR exceeds 50% on
either tier. The architecture-improvement story is contradicted for the existing `final` if its CRR is not
above baseline on both tiers; it is substantively unconvincing if either gap is below 10 points. The round-2
success claim is falsified if its one-shot holdout CRR is below 70%, its CRR advantage over baseline is below
20 points, or its detection F1 loses more than 3 points versus current `final`. The “long is harder” premise is
not supported if baseline long-tier macro F1 is within 2 points of or above short-tier F1. CUAD anchoring is
considered too weak for an objective long-tier claim if fewer than half of non-missing long-tier items carry
an expert span. All contrary results, replay failures, gold ambiguities, threshold fallbacks, and post-freeze
changes will be reported rather than repaired post hoc.
