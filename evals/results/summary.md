# Evaluation summary

## Config comparison

| Config | F1 macro | F1 micro | Ambiguous items | Ambiguous matches | Deviation accuracy | Redline validity | Minimality | Citation hallucination |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| b0-chat | 72.0% | 75.8% | 31 | 11 | 78.2% | 25.0% | 1.9% | 4.4% |
| b1-prompt | 94.9% | 94.4% | 31 | 19 | 87.2% | 40.2% | 17.4% | 3.2% |
| i1-docmodel | 91.6% | 91.0% | 31 | 25 | 86.8% | 42.9% | 34.1% | 5.4% |
| i2-workers | 84.0% | 82.6% | 12 | 10 | 81.6% | 46.7% | 25.6% | 4.6% |
| i3-verifier | 83.7% | 82.4% | 12 | 10 | 83.3% | 56.0% | 30.8% | 3.6% |
| i4-memory | 88.3% | 86.8% | 26 | 23 | 85.0% | 59.6% | 29.2% | 4.2% |

## Per-contract results

| Config | Contract | TP | FP | FN | Escalations | Ambiguous items | Ambiguous matches | F1 | Valid redlines | Integrity |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| b0-chat | cuad-americas-shopping-mall-hosting | 9 | 2 | 3 | 2 | 1 | 1 | 78.3% | 50.0% | pass |
| b0-chat | cuad-bluefly-hosting | 7 | 2 | 2 | 2 | 5 | 3 | 77.8% | 0.0% | pass |
| b0-chat | cuad-bnc-mortgage-hosting | 9 | 6 | 0 | 0 | 0 | 0 | 75.0% | 0.0% | pass |
| b0-chat | cuad-corio-hosting | 1 | 0 | 6 | 0 | 5 | 1 | 25.0% | 100.0% | pass |
| b0-chat | cuad-kubient-msa-part1 | 6 | 5 | 0 | 2 | 2 | 1 | 70.6% | 0.0% | pass |
| b0-chat | cuad-merit-life-master-services | 8 | 1 | 1 | 1 | 2 | 2 | 88.9% | 12.5% | pass |
| b0-chat | cuad-sfg-financial-license | 10 | 3 | 1 | 0 | 1 | 1 | 83.3% | 0.0% | pass |
| b0-chat | cuad-sparkling-spring-license | 7 | 3 | 0 | 0 | 2 | 2 | 82.4% | 0.0% | pass |
| b0-chat | synth-11 | 7 | 2 | 0 | 5 | 3 | 0 | 87.5% | 66.7% | fail |
| b0-chat | synth-12 | 9 | 5 | 0 | 0 | 5 | 0 | 78.3% | 50.0% | fail |
| b0-chat | synth-13 | 8 | 3 | 0 | 0 | 4 | 0 | 84.2% | 25.0% | fail |
| b0-chat | synth-hardcase | 2 | 8 | 0 | 1 | 1 | 0 | 33.3% | 50.0% | pass |
| b1-prompt | cuad-americas-shopping-mall-hosting | 12 | 2 | 0 | 0 | 1 | 1 | 92.3% | 45.5% | pass |
| b1-prompt | cuad-bluefly-hosting | 8 | 1 | 1 | 1 | 5 | 5 | 88.9% | 12.5% | pass |
| b1-prompt | cuad-bnc-mortgage-hosting | 9 | 2 | 0 | 2 | 0 | 0 | 90.0% | 33.3% | pass |
| b1-prompt | cuad-corio-hosting | 7 | 0 | 0 | 2 | 5 | 5 | 100.0% | 28.6% | pass |
| b1-prompt | cuad-kubient-msa-part1 | 6 | 0 | 0 | 2 | 2 | 1 | 100.0% | 16.7% | pass |
| b1-prompt | cuad-merit-life-master-services | 9 | 1 | 0 | 0 | 2 | 1 | 94.7% | 44.4% | pass |
| b1-prompt | cuad-sfg-financial-license | 11 | 1 | 0 | 2 | 1 | 1 | 95.7% | 9.1% | pass |
| b1-prompt | cuad-sparkling-spring-license | 5 | 1 | 2 | 5 | 2 | 2 | 76.9% | 40.0% | pass |
| b1-prompt | synth-11 | 7 | 0 | 0 | 0 | 3 | 1 | 100.0% | 71.4% | pass |
| b1-prompt | synth-12 | 9 | 0 | 0 | 0 | 5 | 1 | 100.0% | 66.7% | pass |
| b1-prompt | synth-13 | 8 | 0 | 0 | 0 | 4 | 0 | 100.0% | 75.0% | pass |
| b1-prompt | synth-hardcase | 2 | 0 | 0 | 0 | 1 | 1 | 100.0% | 50.0% | pass |
| i1-docmodel | cuad-americas-shopping-mall-hosting | 12 | 2 | 0 | 0 | 1 | 1 | 92.3% | 50.0% | pass |
| i1-docmodel | cuad-bluefly-hosting | 6 | 2 | 3 | 0 | 5 | 5 | 70.6% | 16.7% | pass |
| i1-docmodel | cuad-bnc-mortgage-hosting | 9 | 3 | 0 | 1 | 0 | 0 | 85.7% | 55.6% | pass |
| i1-docmodel | cuad-corio-hosting | 7 | 1 | 0 | 0 | 5 | 5 | 93.3% | 0.0% | pass |
| i1-docmodel | cuad-kubient-msa-part1 | 6 | 1 | 0 | 0 | 2 | 2 | 92.3% | 66.7% | pass |
| i1-docmodel | cuad-merit-life-master-services | 9 | 0 | 0 | 0 | 2 | 2 | 100.0% | 55.6% | pass |
| i1-docmodel | cuad-sfg-financial-license | 11 | 1 | 0 | 0 | 1 | 1 | 95.7% | 9.1% | pass |
| i1-docmodel | cuad-sparkling-spring-license | 7 | 3 | 0 | 0 | 2 | 2 | 82.4% | 28.6% | pass |
| i1-docmodel | synth-11 | 6 | 0 | 1 | 0 | 3 | 1 | 92.3% | 50.0% | pass |
| i1-docmodel | synth-12 | 8 | 0 | 1 | 0 | 5 | 4 | 94.1% | 50.0% | pass |
| i1-docmodel | synth-13 | 8 | 0 | 0 | 0 | 4 | 1 | 100.0% | 87.5% | pass |
| i1-docmodel | synth-hardcase | 2 | 0 | 0 | 0 | 1 | 1 | 100.0% | 50.0% | pass |
| i2-workers | cuad-americas-shopping-mall-hosting | 11 | 5 | 0 | 0 | 0 | 0 | 81.5% | 45.5% | pass |
| i2-workers | cuad-bluefly-hosting | 7 | 5 | 2 | 0 | 1 | 1 | 66.7% | 14.3% | pass |
| i2-workers | cuad-bnc-mortgage-hosting | 7 | 5 | 0 | 0 | 0 | 0 | 73.7% | 57.1% | pass |
| i2-workers | cuad-corio-hosting | 7 | 3 | 0 | 0 | 2 | 2 | 82.4% | 28.6% | pass |
| i2-workers | cuad-kubient-msa-part1 | 6 | 4 | 1 | 0 | 0 | 0 | 70.6% | 33.3% | pass |
| i2-workers | cuad-merit-life-master-services | 9 | 3 | 0 | 0 | 0 | 0 | 85.7% | 55.6% | pass |
| i2-workers | cuad-sfg-financial-license | 10 | 2 | 1 | 1 | 0 | 0 | 87.0% | 20.0% | pass |
| i2-workers | cuad-sparkling-spring-license | 7 | 5 | 0 | 0 | 0 | 0 | 73.7% | 71.4% | pass |
| i2-workers | synth-11 | 7 | 1 | 0 | 0 | 2 | 1 | 93.3% | 57.1% | pass |
| i2-workers | synth-12 | 9 | 0 | 0 | 0 | 4 | 4 | 100.0% | 66.7% | pass |
| i2-workers | synth-13 | 8 | 1 | 0 | 0 | 2 | 1 | 94.1% | 62.5% | pass |
| i2-workers | synth-hardcase | 2 | 0 | 0 | 0 | 1 | 1 | 100.0% | 50.0% | pass |
| i3-verifier | cuad-americas-shopping-mall-hosting | 11 | 4 | 0 | 1 | 0 | 0 | 84.6% | 63.6% | pass |
| i3-verifier | cuad-bluefly-hosting | 8 | 5 | 1 | 1 | 1 | 1 | 72.7% | 25.0% | pass |
| i3-verifier | cuad-bnc-mortgage-hosting | 7 | 5 | 0 | 2 | 0 | 0 | 73.7% | 57.1% | pass |
| i3-verifier | cuad-corio-hosting | 7 | 4 | 0 | 1 | 2 | 2 | 77.8% | 28.6% | pass |
| i3-verifier | cuad-kubient-msa-part1 | 6 | 4 | 1 | 2 | 0 | 0 | 70.6% | 83.3% | pass |
| i3-verifier | cuad-merit-life-master-services | 9 | 3 | 0 | 1 | 0 | 0 | 85.7% | 77.8% | pass |
| i3-verifier | cuad-sfg-financial-license | 10 | 3 | 1 | 0 | 0 | 0 | 83.3% | 40.0% | pass |
| i3-verifier | cuad-sparkling-spring-license | 7 | 5 | 0 | 1 | 0 | 0 | 73.7% | 57.1% | pass |
| i3-verifier | synth-11 | 7 | 1 | 0 | 0 | 2 | 1 | 93.3% | 57.1% | pass |
| i3-verifier | synth-12 | 9 | 0 | 0 | 1 | 4 | 4 | 100.0% | 66.7% | pass |
| i3-verifier | synth-13 | 8 | 2 | 0 | 1 | 2 | 1 | 88.9% | 62.5% | pass |
| i3-verifier | synth-hardcase | 2 | 0 | 0 | 1 | 1 | 1 | 100.0% | 50.0% | pass |
| i4-memory | cuad-americas-shopping-mall-hosting | 11 | 5 | 0 | 1 | 0 | 0 | 81.5% | 63.6% | pass |
| i4-memory | cuad-bluefly-hosting | 7 | 4 | 2 | 2 | 1 | 1 | 70.0% | 42.9% | pass |
| i4-memory | cuad-bnc-mortgage-hosting | 7 | 5 | 0 | 2 | 0 | 0 | 73.7% | 100.0% | pass |
| i4-memory | cuad-corio-hosting | 7 | 1 | 0 | 1 | 5 | 5 | 93.3% | 14.3% | pass |
| i4-memory | cuad-kubient-msa-part1 | 6 | 2 | 0 | 2 | 2 | 2 | 85.7% | 50.0% | pass |
| i4-memory | cuad-merit-life-master-services | 9 | 1 | 0 | 1 | 2 | 2 | 94.7% | 66.7% | pass |
| i4-memory | cuad-sfg-financial-license | 10 | 1 | 1 | 2 | 1 | 1 | 90.9% | 50.0% | pass |
| i4-memory | cuad-sparkling-spring-license | 7 | 3 | 0 | 1 | 2 | 2 | 82.4% | 71.4% | pass |
| i4-memory | synth-11 | 7 | 1 | 0 | 0 | 3 | 2 | 93.3% | 71.4% | pass |
| i4-memory | synth-12 | 8 | 0 | 1 | 0 | 5 | 5 | 94.1% | 75.0% | pass |
| i4-memory | synth-13 | 8 | 0 | 0 | 1 | 4 | 2 | 100.0% | 50.0% | pass |
| i4-memory | synth-hardcase | 2 | 0 | 0 | 2 | 1 | 1 | 100.0% | 50.0% | pass |

## Hard case

| Config | TP | FP | FN | F1 | Status accuracy |
|---|---:|---:|---:|---:|---:|
| b0-chat | 2 | 8 | 0 | 33.3% | 60.0% |
| b1-prompt | 2 | 0 | 0 | 100.0% | 100.0% |
| i1-docmodel | 2 | 0 | 0 | 100.0% | 100.0% |
| i2-workers | 2 | 0 | 0 | 100.0% | 100.0% |
| i3-verifier | 2 | 0 | 0 | 100.0% | 100.0% |
| i4-memory | 2 | 0 | 0 | 100.0% | 100.0% |

The hard case tests definition resolution, party direction, a cross-referenced convenience right, and a stand-alone late-payment penalty.

## Resources

| Config | LLM calls | Tool calls | Input tokens | Output tokens | Cache-read tokens | Cache-write tokens | Cost | Latency |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| b0-chat | 24 | 0 | 352812 | 175013 | 7535 | 685 | $6.1474 | 2249.0 s |
| b1-prompt | 12 | 0 | 227178 | 120453 | 7128 | 3564 | $4.1731 | 1257.5 s |
| i1-docmodel | 249 | 580 | 149676 | 304199 | 7296511 | 549033 | $15.4331 | 3537.5 s |
| i2-workers | 1462 | 2035 | 191679 | 739739 | 11138480 | 2260853 | $39.1514 | 2796.6 s |
| i3-verifier | 1767 | 2100 | 711919 | 1023919 | 11853149 | 2221773 | $48.9702 | 3860.0 s |
| i4-memory | 1821 | 2154 | 697044 | 1040221 | 12239213 | 2149304 | $49.0435 | 3895.1 s |

Replay uses committed model and judge caches. Cost and token numbers describe the recorded live run; replay itself incurs no API cost.
