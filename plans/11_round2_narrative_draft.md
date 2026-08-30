# Round 2 narrative — draft (numbers ⟨…⟩ filled from evals/results after the campaign)

## IMPROVEMENT_CHANGELOG.md — new section "Round 2: what the product is for" (goes after the round-1 table, before "The hard case")

Round 1 ended with a result we could not sell and would not hide: a frontier model with the playbook in one prompt
already detects 91.5 % of the issues on 3–8k-word contracts, and the pipeline's +3.3 pp sits inside run-to-run
variance. Detection was the wrong primary metric for this product. Two things were not being measured at all: whether
the redline is *complete* — every element of the playbook position met, applied to the document, minimal — and how
any of this behaves on the 20–60k-word agreements in-house counsel actually receive.

**Pre-registration.** Before the final configuration was run on them, `plans/campaign/preregistration.md` (SHA-256
recorded in the campaign log) fixed: the long-document tier rule (CUAD titles in the playbook's contract families,
≥ 15,000 canonical words, ≥ 150 paragraphs, sorted by length, first six — 31 qualified, none was swapped), the
metric formulas and denominators, a dev/holdout split, point predictions, and what would falsify the story. The
baseline is unchanged: the same model, the same playbook, the whole contract, one prompt, its own naive apply.

**New metrics** (independent GPT-5.6 judge v2, per-element verdicts; the judge decomposes the prose positions itself
and never sees the pipeline's checklists):
- *Complete redline rate (CRR)* — of gold deviation/missing items, the share whose redline applies to the `.docx`,
  passes the deterministic checks, meets every element of the preferred or of the fallback position, is minimal and
  preserves intent.
- *Applied tracked-change yield* — of gold deviation/missing items, the share that ends up as a valid tracked change
  in that system's own output document (LibreOffice round-trip).
- *Precedent adherence* — redlines for rules with an approved precedent that reuse its language (token Jaccard ≥ 0.6).

**The negative result first.** On the long tier the round-1 pipeline does not beat the baseline: F1 58.8 % vs
60.3 %, recall 47.9 % vs 45.8 %, CRR 0 % vs 0 %. On the short tier its CRR is 10.5 % against the baseline's 1.1 %
— an improvement, but below the 10-point threshold we had pre-registered as meaningful. Everything round 1 built
(document model, per-rule workers, verifier, memory) made detection and anchoring better and left the redline
itself unsolved.

| Stage | Config | What we tried and why | Short tier: F1 · CRR · yield · $/contract | Long tier: F1 · recall · CRR · yield · $/contract | Decision / learning |
|---|---|---|---|---|---|
| Baseline | `b1-prompt` | as in round 1 | 91.5 % · 1.1 % · 86.3 % · $0.35 | 60.3 % · 45.8 % · 0 % · 41.7 % · $0.79 | Its redlines apply (naive string replace works) but almost never carry the whole position; on long documents it misses more than half of the issues. |
| Round 1 final | `final` | as in round 1 | 94.8 % · 10.5 % · 86.3 % · $3.51 | 58.8 % · 47.9 % · 0 % · 45.8 % · $5.73 | Better detection on short contracts, no better on long ones, and one redline in ten complete. **Kept as the round-1 reference; not the product.** |
| Iteration 5 | `i5-elements` | Every playbook position written as an atomic checklist (159 elements, additive field); drafter must map each element to "already met (quote)" or "addressed by op N"; fresh-context verifier checks elements one by one with ≤ 3 repair rounds; deterministic minimality gate. (Verification, tools) | ⟨i5 short⟩ | — (no long-document planning) | ⟨learning⟩ |
| Iteration 6 | `i6-longdoc` | Above the 15,000-word threshold: definition-first whole-document search planning, paginated section reads, bounded planner/worker turns. (Context, orchestration) | ⟨i6 short⟩ | ⟨i6 long⟩ | ⟨learning⟩ |
| **Final v2** | `final-v2` | i6 + approved precedents returned as element-labelled templates. (Memory) | ⟨v2 short⟩ | ⟨v2 long⟩ | ⟨vs baseline: CRR ⟨B1_CRR⟩ → ⟨V2_CRR⟩, long F1 ⟨B1_LONG_F1⟩ → ⟨V2_LONG_F1⟩, yield …⟩ |

**The grader and the student's rubric.** The pipeline track measured its element-aware configuration at 86 % complete
redlines with a development judge that was shown the pipeline's own checklists; the pre-registered judge, which
decomposes the prose positions itself and never sees those checklists, scored the same design at 32.6 %. Both numbers
are reported. A judge that grades with the system's own rubric inflates completeness by roughly 2.5×; the round-2
iterations after `i5` were measured only against the independent judge. ⟨update with i7/final-v3 outcome⟩

**Disclosures.** (1) `final-v2`'s prompts were iterated on a dev split of six contracts — `cuad-americas-shopping-mall-
hosting`, `cuad-bnc-mortgage-hosting`, `synth-12`, `synth-hardcase` and two 15k-word CUAD agreements that are not in
the tier — against a development judge; the numbers above for the other eight short contracts and all six long ones
are a single holdout run. (2) The round-1 `i3-verifier` long-tier cell was added after pre-registration to complete
the matrix (logged). (3) The tier rule selected four biopharma development/licence agreements and one ABS servicing
agreement; a customer-side vendor-services playbook fits them less naturally than a hosting MSA — the rule was
written before results and we kept it, and gold marks rules that do not apply as `ambiguous` (excluded). (4) Long-tier
gold is GPT-5.6-drafted, CUAD-span-anchored (80/121 items) and reviewed by the evaluation agent, not yet by counsel.
(5) Judge v2's decomposition of positions is its own; the playbook checklists the pipeline uses are not shown to it.

## README.md §5 — replace the headline table with a two-part table
Part A (round 2, pre-registered, the headline): CRR short ⟨B1_CRR⟩ → ⟨V2_CRR⟩; long-document F1 ⟨B1_LONG_F1⟩ → ⟨V2_LONG_F1⟩;
long-document recall; applied yield short/long; precedent adherence; cost.
Part B (round 1, retained): detection F1 91.5 → 94.8; validity; minimality; escalations; integrity.
One paragraph under it: why round 2 exists (three sentences), the negative result, link to the changelog section.

## Hot take — sharpen
"Give a specialist agent one rule and it will find a violation; give it a *direction* instead of a *checklist* and it
will write half a redline. The two largest quality jumps in this project came from writing the playbook more precisely
— classification semantics in round 1, atomic elements in round 2 — not from any model, tool or extra agent. And before
you believe a one-point gain on an agent benchmark, record the same configuration twice."

## Video beats (narration.json already rewritten; Sol fills placeholders from changelog-data.json)
B1_CRR / V2_CRR = completeRedline.rate short tier; B1_LONG_F1 / V2_LONG_F1 = detection.macro.f1 long tier;
B1_YIELD / V2_YIELD = appliedTrackedChangeYield.rate short tier; B1_F1 = 91.5 %.
