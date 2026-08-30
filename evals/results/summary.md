# Evaluation summary

## Config comparison

| Config | F1 macro | F1 micro | Ambiguous items | Ambiguous matches | Deviation accuracy | Redline validity | Minimality | Citation hallucination |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| b0-chat | 71.7% | 75.6% | 32 | 12 | 78.0% | 23.5% | 5.9% | 4.4% |
| b1-prompt | 91.5% | 91.6% | 32 | 20 | 77.6% | 42.7% | 11.0% | 2.9% |
| final | 94.8% | 94.1% | 32 | 26 | 86.8% | 50.6% | 35.6% | 3.8% |
| i1-docmodel | 91.8% | 91.6% | 32 | 24 | 81.3% | 41.5% | 45.1% | 3.6% |
| i2-workers | 94.4% | 93.5% | 32 | 28 | 89.6% | 48.3% | 33.3% | 4.9% |
| i3-verifier | 94.5% | 94.2% | 32 | 25 | 90.6% | 51.7% | 28.1% | 3.8% |
| i4-memory | 93.6% | 92.6% | 32 | 24 | 87.7% | 50.6% | 32.2% | 4.3% |
| x-monolith | 94.1% | 93.9% | 32 | 23 | 84.1% | 42.4% | 42.4% | 2.1% |

## Per-contract results

| Config | Contract | TP | FP | FN | Escalations | Ambiguous items | Ambiguous matches | F1 | Valid redlines | Integrity |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| b0-chat | cuad-americas-shopping-mall-hosting | 9 | 2 | 3 | 2 | 1 | 1 | 78.3% | 100.0% | pass |
| b0-chat | cuad-bluefly-hosting | 7 | 2 | 2 | 2 | 5 | 3 | 77.8% | 0.0% | pass |
| b0-chat | cuad-bnc-mortgage-hosting | 9 | 6 | 0 | 0 | 0 | 0 | 75.0% | 0.0% | pass |
| b0-chat | cuad-corio-hosting | 1 | 0 | 6 | 0 | 5 | 1 | 25.0% | 0.0% | pass |
| b0-chat | cuad-kubient-msa-part1 | 5 | 5 | 0 | 2 | 3 | 2 | 66.7% | 0.0% | pass |
| b0-chat | cuad-merit-life-master-services | 8 | 1 | 1 | 1 | 2 | 2 | 88.9% | 0.0% | pass |
| b0-chat | cuad-sfg-financial-license | 10 | 3 | 1 | 0 | 1 | 1 | 83.3% | 0.0% | pass |
| b0-chat | cuad-sparkling-spring-license | 7 | 3 | 0 | 0 | 2 | 2 | 82.4% | 0.0% | pass |
| b0-chat | synth-11 | 7 | 2 | 0 | 5 | 3 | 0 | 87.5% | 66.7% | fail |
| b0-chat | synth-12 | 9 | 5 | 0 | 0 | 5 | 0 | 78.3% | 50.0% | fail |
| b0-chat | synth-13 | 8 | 3 | 0 | 0 | 4 | 0 | 84.2% | 25.0% | fail |
| b0-chat | synth-hardcase | 2 | 8 | 0 | 1 | 1 | 0 | 33.3% | 50.0% | pass |
| b1-prompt | cuad-americas-shopping-mall-hosting | 10 | 0 | 2 | 2 | 1 | 1 | 90.9% | 40.0% | pass |
| b1-prompt | cuad-bluefly-hosting | 6 | 0 | 3 | 0 | 5 | 5 | 80.0% | 33.3% | pass |
| b1-prompt | cuad-bnc-mortgage-hosting | 8 | 1 | 1 | 1 | 0 | 0 | 88.9% | 37.5% | pass |
| b1-prompt | cuad-corio-hosting | 5 | 0 | 2 | 1 | 5 | 5 | 83.3% | 40.0% | pass |
| b1-prompt | cuad-kubient-msa-part1 | 5 | 0 | 0 | 2 | 3 | 2 | 100.0% | 20.0% | pass |
| b1-prompt | cuad-merit-life-master-services | 7 | 1 | 2 | 0 | 2 | 1 | 82.4% | 42.9% | pass |
| b1-prompt | cuad-sfg-financial-license | 11 | 0 | 0 | 3 | 1 | 1 | 100.0% | 9.1% | pass |
| b1-prompt | cuad-sparkling-spring-license | 4 | 0 | 3 | 3 | 2 | 2 | 72.7% | 25.0% | pass |
| b1-prompt | synth-11 | 7 | 0 | 0 | 0 | 3 | 1 | 100.0% | 71.4% | pass |
| b1-prompt | synth-12 | 9 | 0 | 0 | 0 | 5 | 1 | 100.0% | 66.7% | pass |
| b1-prompt | synth-13 | 8 | 0 | 0 | 0 | 4 | 0 | 100.0% | 75.0% | pass |
| b1-prompt | synth-hardcase | 2 | 0 | 0 | 0 | 1 | 1 | 100.0% | 50.0% | pass |
| final | cuad-americas-shopping-mall-hosting | 11 | 2 | 1 | 0 | 1 | 1 | 88.0% | 45.5% | pass |
| final | cuad-bluefly-hosting | 7 | 1 | 2 | 0 | 5 | 5 | 82.4% | 57.1% | pass |
| final | cuad-bnc-mortgage-hosting | 8 | 0 | 1 | 0 | 0 | 0 | 94.1% | 50.0% | pass |
| final | cuad-corio-hosting | 6 | 0 | 1 | 0 | 5 | 5 | 92.3% | 33.3% | pass |
| final | cuad-kubient-msa-part1 | 5 | 0 | 0 | 0 | 3 | 3 | 100.0% | 20.0% | pass |
| final | cuad-merit-life-master-services | 8 | 0 | 1 | 0 | 2 | 2 | 94.1% | 50.0% | pass |
| final | cuad-sfg-financial-license | 11 | 0 | 0 | 0 | 1 | 1 | 100.0% | 36.4% | pass |
| final | cuad-sparkling-spring-license | 6 | 0 | 1 | 0 | 2 | 2 | 92.3% | 83.3% | pass |
| final | synth-11 | 7 | 0 | 0 | 0 | 3 | 1 | 100.0% | 71.4% | pass |
| final | synth-12 | 8 | 0 | 1 | 0 | 5 | 4 | 94.1% | 62.5% | pass |
| final | synth-13 | 8 | 0 | 0 | 0 | 4 | 1 | 100.0% | 50.0% | pass |
| final | synth-hardcase | 2 | 0 | 0 | 0 | 1 | 1 | 100.0% | 50.0% | pass |
| i1-docmodel | cuad-americas-shopping-mall-hosting | 10 | 1 | 2 | 0 | 1 | 1 | 87.0% | 40.0% | pass |
| i1-docmodel | cuad-bluefly-hosting | 4 | 1 | 5 | 0 | 5 | 5 | 57.1% | 25.0% | pass |
| i1-docmodel | cuad-bnc-mortgage-hosting | 8 | 0 | 1 | 0 | 0 | 0 | 94.1% | 25.0% | pass |
| i1-docmodel | cuad-corio-hosting | 5 | 0 | 2 | 0 | 5 | 5 | 83.3% | 40.0% | pass |
| i1-docmodel | cuad-kubient-msa-part1 | 5 | 0 | 0 | 0 | 3 | 3 | 100.0% | 40.0% | pass |
| i1-docmodel | cuad-merit-life-master-services | 8 | 0 | 1 | 0 | 2 | 2 | 94.1% | 25.0% | pass |
| i1-docmodel | cuad-sfg-financial-license | 11 | 0 | 0 | 0 | 1 | 1 | 100.0% | 9.1% | pass |
| i1-docmodel | cuad-sparkling-spring-license | 6 | 0 | 1 | 0 | 2 | 2 | 92.3% | 50.0% | pass |
| i1-docmodel | synth-11 | 7 | 0 | 0 | 0 | 3 | 1 | 100.0% | 71.4% | pass |
| i1-docmodel | synth-12 | 8 | 0 | 1 | 0 | 5 | 3 | 94.1% | 62.5% | pass |
| i1-docmodel | synth-13 | 8 | 0 | 0 | 0 | 4 | 0 | 100.0% | 75.0% | pass |
| i1-docmodel | synth-hardcase | 2 | 0 | 0 | 0 | 1 | 1 | 100.0% | 50.0% | pass |
| i2-workers | cuad-americas-shopping-mall-hosting | 11 | 2 | 1 | 0 | 1 | 1 | 88.0% | 63.6% | pass |
| i2-workers | cuad-bluefly-hosting | 6 | 2 | 3 | 0 | 5 | 5 | 70.6% | 50.0% | pass |
| i2-workers | cuad-bnc-mortgage-hosting | 8 | 0 | 1 | 0 | 0 | 0 | 94.1% | 50.0% | pass |
| i2-workers | cuad-corio-hosting | 7 | 0 | 0 | 0 | 5 | 5 | 100.0% | 14.3% | pass |
| i2-workers | cuad-kubient-msa-part1 | 5 | 0 | 0 | 0 | 3 | 3 | 100.0% | 20.0% | pass |
| i2-workers | cuad-merit-life-master-services | 8 | 0 | 1 | 0 | 2 | 2 | 94.1% | 50.0% | pass |
| i2-workers | cuad-sfg-financial-license | 11 | 0 | 0 | 0 | 1 | 1 | 100.0% | 45.5% | pass |
| i2-workers | cuad-sparkling-spring-license | 6 | 0 | 1 | 1 | 2 | 2 | 92.3% | 33.3% | pass |
| i2-workers | synth-11 | 7 | 0 | 0 | 0 | 3 | 1 | 100.0% | 71.4% | pass |
| i2-workers | synth-12 | 8 | 0 | 1 | 0 | 5 | 5 | 94.1% | 62.5% | pass |
| i2-workers | synth-13 | 8 | 0 | 0 | 0 | 4 | 2 | 100.0% | 50.0% | pass |
| i2-workers | synth-hardcase | 2 | 0 | 0 | 0 | 1 | 1 | 100.0% | 50.0% | pass |
| i3-verifier | cuad-americas-shopping-mall-hosting | 12 | 2 | 0 | 0 | 1 | 1 | 92.3% | 41.7% | pass |
| i3-verifier | cuad-bluefly-hosting | 6 | 2 | 3 | 0 | 5 | 5 | 70.6% | 50.0% | pass |
| i3-verifier | cuad-bnc-mortgage-hosting | 8 | 0 | 1 | 0 | 0 | 0 | 94.1% | 62.5% | pass |
| i3-verifier | cuad-corio-hosting | 7 | 0 | 0 | 0 | 5 | 5 | 100.0% | 28.6% | pass |
| i3-verifier | cuad-kubient-msa-part1 | 5 | 1 | 0 | 0 | 3 | 2 | 90.9% | 60.0% | pass |
| i3-verifier | cuad-merit-life-master-services | 8 | 0 | 1 | 0 | 2 | 2 | 94.1% | 37.5% | pass |
| i3-verifier | cuad-sfg-financial-license | 11 | 0 | 0 | 0 | 1 | 1 | 100.0% | 27.3% | pass |
| i3-verifier | cuad-sparkling-spring-license | 7 | 0 | 0 | 0 | 2 | 2 | 100.0% | 71.4% | pass |
| i3-verifier | synth-11 | 6 | 0 | 1 | 0 | 3 | 2 | 92.3% | 66.7% | pass |
| i3-verifier | synth-12 | 9 | 0 | 0 | 0 | 5 | 3 | 100.0% | 77.8% | pass |
| i3-verifier | synth-13 | 8 | 0 | 0 | 0 | 4 | 1 | 100.0% | 62.5% | pass |
| i3-verifier | synth-hardcase | 2 | 0 | 0 | 0 | 1 | 1 | 100.0% | 50.0% | pass |
| i4-memory | cuad-americas-shopping-mall-hosting | 11 | 2 | 1 | 0 | 1 | 1 | 88.0% | 54.5% | pass |
| i4-memory | cuad-bluefly-hosting | 6 | 3 | 3 | 0 | 5 | 4 | 66.7% | 50.0% | pass |
| i4-memory | cuad-bnc-mortgage-hosting | 8 | 0 | 1 | 0 | 0 | 0 | 94.1% | 50.0% | pass |
| i4-memory | cuad-corio-hosting | 6 | 0 | 1 | 0 | 5 | 5 | 92.3% | 33.3% | pass |
| i4-memory | cuad-kubient-msa-part1 | 5 | 0 | 0 | 0 | 3 | 3 | 100.0% | 20.0% | pass |
| i4-memory | cuad-merit-life-master-services | 8 | 0 | 1 | 0 | 2 | 2 | 94.1% | 37.5% | pass |
| i4-memory | cuad-sfg-financial-license | 11 | 0 | 0 | 0 | 1 | 1 | 100.0% | 18.2% | pass |
| i4-memory | cuad-sparkling-spring-license | 7 | 0 | 0 | 0 | 2 | 2 | 100.0% | 71.4% | pass |
| i4-memory | synth-11 | 7 | 1 | 0 | 0 | 3 | 1 | 93.3% | 71.4% | pass |
| i4-memory | synth-12 | 8 | 0 | 1 | 0 | 5 | 3 | 94.1% | 62.5% | pass |
| i4-memory | synth-13 | 8 | 0 | 0 | 0 | 4 | 1 | 100.0% | 75.0% | pass |
| i4-memory | synth-hardcase | 2 | 0 | 0 | 0 | 1 | 1 | 100.0% | 100.0% | pass |
| x-monolith | cuad-americas-shopping-mall-hosting | 11 | 1 | 1 | 0 | 1 | 1 | 91.7% | 54.5% | pass |
| x-monolith | cuad-bluefly-hosting | 6 | 0 | 3 | 0 | 5 | 5 | 80.0% | 50.0% | pass |
| x-monolith | cuad-bnc-mortgage-hosting | 8 | 0 | 1 | 0 | 0 | 0 | 94.1% | 25.0% | pass |
| x-monolith | cuad-corio-hosting | 5 | 0 | 2 | 0 | 5 | 5 | 83.3% | 20.0% | pass |
| x-monolith | cuad-kubient-msa-part1 | 5 | 0 | 0 | 0 | 3 | 3 | 100.0% | 20.0% | pass |
| x-monolith | cuad-merit-life-master-services | 8 | 0 | 1 | 0 | 2 | 2 | 94.1% | 37.5% | pass |
| x-monolith | cuad-sfg-financial-license | 11 | 0 | 0 | 0 | 1 | 1 | 100.0% | 9.1% | pass |
| x-monolith | cuad-sparkling-spring-license | 6 | 0 | 1 | 0 | 2 | 2 | 92.3% | 50.0% | pass |
| x-monolith | synth-11 | 7 | 0 | 0 | 0 | 3 | 1 | 100.0% | 71.4% | pass |
| x-monolith | synth-12 | 8 | 0 | 1 | 0 | 5 | 2 | 94.1% | 50.0% | pass |
| x-monolith | synth-13 | 8 | 0 | 0 | 0 | 4 | 0 | 100.0% | 75.0% | pass |
| x-monolith | synth-hardcase | 2 | 0 | 0 | 0 | 1 | 1 | 100.0% | 50.0% | pass |

## Hard case

| Config | TP | FP | FN | F1 | Status accuracy |
|---|---:|---:|---:|---:|---:|
| b0-chat | 2 | 8 | 0 | 33.3% | 60.0% |
| b1-prompt | 2 | 0 | 0 | 100.0% | 100.0% |
| final | 2 | 0 | 0 | 100.0% | 100.0% |
| i1-docmodel | 2 | 0 | 0 | 100.0% | 100.0% |
| i2-workers | 2 | 0 | 0 | 100.0% | 100.0% |
| i3-verifier | 2 | 0 | 0 | 100.0% | 100.0% |
| i4-memory | 2 | 0 | 0 | 100.0% | 100.0% |
| x-monolith | 2 | 0 | 0 | 100.0% | 100.0% |

The hard case tests definition resolution, party direction, a cross-referenced convenience right, and a stand-alone late-payment penalty.

## Resources

| Config | LLM calls | Tool calls | Input tokens | Output tokens | Cache-read tokens | Cache-write tokens | Cost | Latency |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| b0-chat | 24 | 0 | 352812 | 175013 | 7535 | 685 | $6.1474 | 2249.0 s |
| b1-prompt | 12 | 0 | 227178 | 121103 | 10746 | 3582 | $4.1912 | 1290.9 s |
| final | 1611 | 1915 | 651463 | 865297 | 10655786 | 1908668 | $42.1468 | 3167.2 s |
| i1-docmodel | 227 | 575 | 142531 | 298119 | 6651894 | 545813 | $14.9029 | 3483.7 s |
| i2-workers | 1398 | 1911 | 191326 | 679676 | 10469248 | 1995794 | $35.6569 | 2699.0 s |
| i3-verifier | 1765 | 1975 | 773675 | 996631 | 12293985 | 2086745 | $47.9733 | 3774.9 s |
| i4-memory | 1775 | 2011 | 757052 | 997435 | 12465137 | 2127723 | $48.2520 | 3771.7 s |
| x-monolith | 233 | 590 | 466 | 215296 | 6985601 | 474517 | $11.8433 | 2573.8 s |

Replay uses committed model and judge caches. Cost and token numbers describe the recorded live run; replay itself incurs no API cost.

## Round 2 tiers

| Config | Tier | F1 macro | Recall micro | CRR | Tracked-change yield | Precedent adherence | Minimality | Cost |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| b1-prompt | long | 60.3% | 45.8% | 0.0% | 41.7% | 0.0% | 0.0% | $4.7510 |
| final | long | 58.8% | 47.9% | 0.0% | 45.8% | 4.3% | 0.0% | $34.3835 |
| i3-verifier | long | 57.2% | 45.8% | 0.0% | 45.8% | 0.0% | 4.5% | $33.9355 |
| b1-prompt | short | 91.5% | 86.3% | 1.1% | 86.3% | 2.4% | 3.7% | $4.1912 |
| final | short | 94.8% | 91.6% | 10.5% | 86.3% | 6.9% | 13.8% | $42.1468 |
| i3-verifier | short | 94.5% | 93.7% | 11.6% | 88.4% | 4.5% | 15.7% | $47.9733 |

CRR and tracked-change yield use all non-ambiguous deviation/missing gold items as their pooled denominator. Precedent adherence reports only matched proposals for seeded rules.
