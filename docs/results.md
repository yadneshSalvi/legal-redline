# Full evaluation results

Generated deterministically from `evals/results/*.json` by `pnpm render-docs`. Percentages use the unrounded JSON values.

## b0-chat

Aggregate evidence: 71.7% · 23.5% · 4.4% · $0.5123 (macro F1 · validity · hallucination · cost/contract).

### Per-contract quality

| Contract | TP | FP | FN | Esc. | Precision | Recall | F1 | Status accuracy | Validity | Minimality | Hallucination | Integrity |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| cuad-americas-shopping-mall-hosting | 9 | 2 | 3 | 2 | 81.8% | 75.0% | 78.3% | 69.2% | 100.0% | 0.0% | 0.0% | pass |
| cuad-bluefly-hosting | 7 | 2 | 2 | 2 | 77.8% | 77.8% | 77.8% | 87.5% | 0.0% | 0.0% | 13.8% | pass |
| cuad-bnc-mortgage-hosting | 9 | 6 | 0 | 0 | 60.0% | 100.0% | 75.0% | 72.7% | 0.0% | 0.0% | 0.0% | pass |
| cuad-corio-hosting | 1 | 0 | 6 | 0 | 100.0% | 14.3% | 25.0% | 100.0% | 0.0% | 0.0% | 0.0% | pass |
| cuad-kubient-msa-part1 | 5 | 5 | 0 | 2 | 50.0% | 100.0% | 66.7% | 50.0% | 0.0% | 0.0% | 0.0% | pass |
| cuad-merit-life-master-services | 8 | 1 | 1 | 1 | 88.9% | 88.9% | 88.9% | 88.9% | 0.0% | 12.5% | 0.0% | pass |
| cuad-sfg-financial-license | 10 | 3 | 1 | 0 | 76.9% | 90.9% | 83.3% | 72.7% | 0.0% | 0.0% | 100.0% | pass |
| cuad-sparkling-spring-license | 7 | 3 | 0 | 0 | 70.0% | 100.0% | 82.4% | 70.0% | 0.0% | 16.7% | 0.0% | pass |
| synth-11 | 7 | 2 | 0 | 5 | 77.8% | 100.0% | 87.5% | 100.0% | 66.7% | 0.0% | 0.0% | fail |
| synth-12 | 9 | 5 | 0 | 0 | 64.3% | 100.0% | 78.3% | 100.0% | 50.0% | 0.0% | 6.4% | fail |
| synth-13 | 8 | 3 | 0 | 0 | 72.7% | 100.0% | 84.2% | 87.5% | 25.0% | 0.0% | 4.5% | fail |
| synth-hardcase | 2 | 8 | 0 | 1 | 20.0% | 100.0% | 33.3% | 60.0% | 50.0% | 50.0% | 0.0% | pass |

### Per-contract resources

| Contract | Calls | Tools | Retries | Input tokens | Output tokens | Cache read | Cache write | Cost | Latency |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 2 | 0 | 0 | 18207 | 15140 | 685 | 0 | $0.4699 | 201.1 s |
| cuad-bluefly-hosting | 2 | 0 | 0 | 30329 | 12151 | 0 | 685 | $0.4597 | 161.1 s |
| cuad-bnc-mortgage-hosting | 2 | 0 | 0 | 28052 | 16188 | 685 | 0 | $0.5453 | 212.9 s |
| cuad-corio-hosting | 2 | 0 | 0 | 45715 | 16649 | 685 | 0 | $0.6451 | 226.8 s |
| cuad-kubient-msa-part1 | 2 | 0 | 0 | 21742 | 12599 | 685 | 0 | $0.4240 | 159.6 s |
| cuad-merit-life-master-services | 2 | 0 | 0 | 24183 | 13994 | 685 | 0 | $0.4711 | 168.3 s |
| cuad-sfg-financial-license | 2 | 0 | 0 | 49316 | 19253 | 685 | 0 | $0.7282 | 247.4 s |
| cuad-sparkling-spring-license | 2 | 0 | 0 | 24261 | 16854 | 685 | 0 | $0.5430 | 218.9 s |
| synth-11 | 2 | 0 | 0 | 28520 | 11982 | 685 | 0 | $0.4425 | 150.5 s |
| synth-12 | 2 | 0 | 0 | 26185 | 11443 | 685 | 0 | $0.4173 | 139.4 s |
| synth-13 | 2 | 0 | 0 | 28669 | 15020 | 685 | 0 | $0.5192 | 181.6 s |
| synth-hardcase | 2 | 0 | 0 | 27633 | 13740 | 685 | 0 | $0.4820 | 181.5 s |

## b1-prompt

Aggregate evidence: 91.5% · 42.7% · 2.9% · $0.3493 (macro F1 · validity · hallucination · cost/contract).

### Per-contract quality

| Contract | TP | FP | FN | Esc. | Precision | Recall | F1 | Status accuracy | Validity | Minimality | Hallucination | Integrity |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| cuad-americas-shopping-mall-hosting | 10 | 0 | 2 | 2 | 100.0% | 83.3% | 90.9% | 69.2% | 40.0% | 20.0% | 0.0% | pass |
| cuad-bluefly-hosting | 6 | 0 | 3 | 0 | 100.0% | 66.7% | 80.0% | 75.0% | 33.3% | 16.7% | 0.0% | pass |
| cuad-bnc-mortgage-hosting | 8 | 1 | 1 | 1 | 88.9% | 88.9% | 88.9% | 72.7% | 37.5% | 12.5% | 0.0% | pass |
| cuad-corio-hosting | 5 | 0 | 2 | 1 | 100.0% | 71.4% | 83.3% | 62.5% | 40.0% | 0.0% | 0.0% | pass |
| cuad-kubient-msa-part1 | 5 | 0 | 0 | 2 | 100.0% | 100.0% | 100.0% | 62.5% | 20.0% | 0.0% | 0.0% | pass |
| cuad-merit-life-master-services | 7 | 1 | 2 | 0 | 87.5% | 77.8% | 82.4% | 77.8% | 42.9% | 14.3% | 0.0% | pass |
| cuad-sfg-financial-license | 11 | 0 | 0 | 3 | 100.0% | 100.0% | 100.0% | 66.7% | 9.1% | 0.0% | 100.0% | pass |
| cuad-sparkling-spring-license | 4 | 0 | 3 | 3 | 100.0% | 57.1% | 72.7% | 77.8% | 25.0% | 25.0% | 0.0% | pass |
| synth-11 | 7 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 71.4% | 28.6% | 0.0% | pass |
| synth-12 | 9 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 88.9% | 66.7% | 0.0% | 10.0% | pass |
| synth-13 | 8 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 75.0% | 0.0% | 7.7% | pass |
| synth-hardcase | 2 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 50.0% | 50.0% | 0.0% | pass |

### Per-contract resources

| Contract | Calls | Tools | Retries | Input tokens | Output tokens | Cache read | Cache write | Cost | Latency |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 1 | 0 | 0 | 13729 | 15971 | 0 | 1194 | $0.4754 | 177.6 s |
| cuad-bluefly-hosting | 1 | 0 | 0 | 19818 | 11418 | 0 | 1194 | $0.3920 | 123.1 s |
| cuad-bnc-mortgage-hosting | 1 | 0 | 0 | 18076 | 13007 | 0 | 1194 | $0.4230 | 137.8 s |
| cuad-corio-hosting | 1 | 0 | 0 | 26906 | 11913 | 1194 | 0 | $0.4330 | 125.5 s |
| cuad-kubient-msa-part1 | 1 | 0 | 0 | 16373 | 9779 | 1194 | 0 | $0.3269 | 108.0 s |
| cuad-merit-life-master-services | 1 | 0 | 0 | 15075 | 11365 | 1194 | 0 | $0.3601 | 119.5 s |
| cuad-sfg-financial-license | 1 | 0 | 0 | 25733 | 13200 | 1194 | 0 | $0.4593 | 135.6 s |
| cuad-sparkling-spring-license | 1 | 0 | 0 | 16340 | 9229 | 1194 | 0 | $0.3130 | 104.9 s |
| synth-11 | 1 | 0 | 0 | 19157 | 6474 | 1194 | 0 | $0.2582 | 65.6 s |
| synth-12 | 1 | 0 | 0 | 18113 | 7197 | 1194 | 0 | $0.2711 | 75.4 s |
| synth-13 | 1 | 0 | 0 | 18447 | 6938 | 1194 | 0 | $0.2663 | 70.7 s |
| synth-hardcase | 1 | 0 | 0 | 19411 | 4612 | 1194 | 0 | $0.2130 | 47.4 s |

## i1-docmodel

Aggregate evidence: 91.8% · 41.5% · 3.6% · $1.2419 (macro F1 · validity · hallucination · cost/contract).

### Per-contract quality

| Contract | TP | FP | FN | Esc. | Precision | Recall | F1 | Status accuracy | Validity | Minimality | Hallucination | Integrity |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| cuad-americas-shopping-mall-hosting | 10 | 1 | 2 | 0 | 90.9% | 83.3% | 87.0% | 61.5% | 40.0% | 70.0% | 12.3% | pass |
| cuad-bluefly-hosting | 4 | 1 | 5 | 0 | 80.0% | 44.4% | 57.1% | 50.0% | 25.0% | 0.0% | 0.0% | pass |
| cuad-bnc-mortgage-hosting | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 81.8% | 25.0% | 37.5% | 0.0% | pass |
| cuad-corio-hosting | 5 | 0 | 2 | 0 | 100.0% | 71.4% | 83.3% | 50.0% | 40.0% | 60.0% | 0.0% | pass |
| cuad-kubient-msa-part1 | 5 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 40.0% | 60.0% | 0.0% | pass |
| cuad-merit-life-master-services | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 88.9% | 25.0% | 12.5% | 0.0% | pass |
| cuad-sfg-financial-license | 11 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 75.0% | 9.1% | 36.4% | 0.0% | pass |
| cuad-sparkling-spring-license | 6 | 0 | 1 | 0 | 100.0% | 85.7% | 92.3% | 90.0% | 50.0% | 33.3% | 0.0% | pass |
| synth-11 | 7 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 71.4% | 57.1% | 1.5% | pass |
| synth-12 | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 100.0% | 62.5% | 62.5% | 9.5% | pass |
| synth-13 | 8 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 75.0% | 50.0% | 6.5% | pass |
| synth-hardcase | 2 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 50.0% | 50.0% | 0.0% | pass |

### Per-contract resources

| Contract | Calls | Tools | Retries | Input tokens | Output tokens | Cache read | Cache write | Cost | Latency |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 17 | 40 | 0 | 6461 | 27629 | 396342 | 42740 | $1.1883 | 321.5 s |
| cuad-bluefly-hosting | 20 | 70 | 0 | 8313 | 28172 | 538273 | 49278 | $1.3230 | 343.7 s |
| cuad-bnc-mortgage-hosting | 16 | 41 | 0 | 6104 | 30314 | 413879 | 47383 | $1.2915 | 336.7 s |
| cuad-corio-hosting | 29 | 52 | 0 | 7999 | 25978 | 1026679 | 54666 | $1.5444 | 343.0 s |
| cuad-kubient-msa-part1 | 7 | 30 | 0 | 5258 | 20205 | 95290 | 35032 | $0.7980 | 221.9 s |
| cuad-merit-life-master-services | 10 | 35 | 0 | 6390 | 27515 | 181144 | 39422 | $1.0568 | 305.2 s |
| cuad-sfg-financial-license | 22 | 45 | 0 | 7685 | 31296 | 778292 | 57277 | $1.5680 | 354.1 s |
| cuad-sparkling-spring-license | 20 | 65 | 0 | 7919 | 26272 | 510356 | 43977 | $1.2264 | 325.3 s |
| synth-11 | 16 | 50 | 0 | 27526 | 19615 | 496314 | 48356 | $1.1784 | 218.9 s |
| synth-12 | 20 | 55 | 0 | 25771 | 24239 | 644539 | 46308 | $1.3465 | 266.4 s |
| synth-13 | 30 | 49 | 0 | 26216 | 20866 | 1100432 | 45469 | $1.4871 | 254.8 s |
| synth-hardcase | 20 | 43 | 0 | 6889 | 16018 | 470354 | 35905 | $0.8945 | 192.2 s |

## i2-workers

Aggregate evidence: 94.4% · 48.3% · 4.9% · $2.9714 (macro F1 · validity · hallucination · cost/contract).

### Per-contract quality

| Contract | TP | FP | FN | Esc. | Precision | Recall | F1 | Status accuracy | Validity | Minimality | Hallucination | Integrity |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| cuad-americas-shopping-mall-hosting | 11 | 2 | 1 | 0 | 84.6% | 91.7% | 88.0% | 76.9% | 63.6% | 54.5% | 7.5% | pass |
| cuad-bluefly-hosting | 6 | 2 | 3 | 0 | 75.0% | 66.7% | 70.6% | 85.7% | 50.0% | 16.7% | 6.8% | pass |
| cuad-bnc-mortgage-hosting | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 81.8% | 50.0% | 50.0% | 3.2% | pass |
| cuad-corio-hosting | 7 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 87.5% | 14.3% | 14.3% | 2.1% | pass |
| cuad-kubient-msa-part1 | 5 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 20.0% | 60.0% | 0.0% | pass |
| cuad-merit-life-master-services | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 88.9% | 50.0% | 25.0% | 0.0% | pass |
| cuad-sfg-financial-license | 11 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 83.3% | 45.5% | 9.1% | 0.0% | pass |
| cuad-sparkling-spring-license | 6 | 0 | 1 | 1 | 100.0% | 85.7% | 92.3% | 90.0% | 33.3% | 16.7% | 0.0% | pass |
| synth-11 | 7 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 71.4% | 42.9% | 2.2% | pass |
| synth-12 | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 100.0% | 62.5% | 50.0% | 17.5% | pass |
| synth-13 | 8 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 50.0% | 25.0% | 5.4% | pass |
| synth-hardcase | 2 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 50.0% | 50.0% | 0.0% | pass |

### Per-contract resources

| Contract | Calls | Tools | Retries | Input tokens | Output tokens | Cache read | Cache write | Cost | Latency |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 142 | 191 | 0 | 10611 | 71816 | 993926 | 158673 | $3.3371 | 270.3 s |
| cuad-bluefly-hosting | 126 | 189 | 0 | 12017 | 58019 | 802865 | 145318 | $2.8202 | 229.1 s |
| cuad-bnc-mortgage-hosting | 124 | 168 | 0 | 10702 | 67518 | 880764 | 156162 | $3.1579 | 273.0 s |
| cuad-corio-hosting | 123 | 175 | 0 | 11997 | 60780 | 981215 | 175130 | $3.1647 | 216.7 s |
| cuad-kubient-msa-part1 | 114 | 146 | 0 | 9791 | 53572 | 724669 | 145787 | $2.6618 | 218.3 s |
| cuad-merit-life-master-services | 117 | 152 | 0 | 11424 | 62803 | 750794 | 133330 | $2.8359 | 247.8 s |
| cuad-sfg-financial-license | 143 | 194 | 0 | 12338 | 79081 | 1456788 | 259553 | $4.3893 | 287.6 s |
| cuad-sparkling-spring-license | 133 | 201 | 0 | 11977 | 58434 | 926526 | 139315 | $2.8547 | 226.9 s |
| synth-11 | 88 | 113 | 0 | 31192 | 40579 | 727561 | 189802 | $2.7205 | 177.3 s |
| synth-12 | 101 | 134 | 0 | 29042 | 49024 | 1053204 | 254898 | $3.4905 | 208.2 s |
| synth-13 | 95 | 132 | 0 | 29558 | 42818 | 675561 | 152617 | $2.5099 | 185.4 s |
| synth-hardcase | 92 | 116 | 0 | 10677 | 35232 | 495375 | 85209 | $1.7144 | 158.6 s |

## i3-verifier

Aggregate evidence: 94.5% · 51.7% · 3.8% · $3.9978 (macro F1 · validity · hallucination · cost/contract).

### Per-contract quality

| Contract | TP | FP | FN | Esc. | Precision | Recall | F1 | Status accuracy | Validity | Minimality | Hallucination | Integrity |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| cuad-americas-shopping-mall-hosting | 12 | 2 | 0 | 0 | 85.7% | 100.0% | 92.3% | 84.6% | 41.7% | 50.0% | 8.7% | pass |
| cuad-bluefly-hosting | 6 | 2 | 3 | 0 | 75.0% | 66.7% | 70.6% | 85.7% | 50.0% | 33.3% | 8.6% | pass |
| cuad-bnc-mortgage-hosting | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 81.8% | 62.5% | 37.5% | 1.4% | pass |
| cuad-corio-hosting | 7 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 87.5% | 28.6% | 14.3% | 2.0% | pass |
| cuad-kubient-msa-part1 | 5 | 1 | 0 | 0 | 83.3% | 100.0% | 90.9% | 100.0% | 60.0% | 20.0% | 0.0% | pass |
| cuad-merit-life-master-services | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 88.9% | 37.5% | 12.5% | 0.0% | pass |
| cuad-sfg-financial-license | 11 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 75.0% | 27.3% | 9.1% | 0.0% | pass |
| cuad-sparkling-spring-license | 7 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 71.4% | 14.3% | 0.0% | pass |
| synth-11 | 6 | 0 | 1 | 0 | 100.0% | 85.7% | 92.3% | 100.0% | 66.7% | 50.0% | 1.6% | pass |
| synth-12 | 9 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 77.8% | 44.4% | 10.8% | pass |
| synth-13 | 8 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 62.5% | 12.5% | 2.0% | pass |
| synth-hardcase | 2 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 50.0% | 50.0% | 0.0% | pass |

### Per-contract resources

| Contract | Calls | Tools | Retries | Input tokens | Output tokens | Cache read | Cache write | Cost | Latency |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 161 | 182 | 0 | 48798 | 96344 | 1041663 | 164758 | $4.2032 | 334.8 s |
| cuad-bluefly-hosting | 156 | 195 | 0 | 45867 | 89296 | 911843 | 133601 | $3.7527 | 316.0 s |
| cuad-bnc-mortgage-hosting | 160 | 174 | 0 | 61768 | 96826 | 1090245 | 174641 | $4.3661 | 323.3 s |
| cuad-corio-hosting | 149 | 177 | 0 | 63031 | 89187 | 1140642 | 196713 | $4.3446 | 385.5 s |
| cuad-kubient-msa-part1 | 169 | 170 | 0 | 86831 | 102310 | 1097528 | 162799 | $4.5582 | 350.9 s |
| cuad-merit-life-master-services | 153 | 162 | 0 | 67206 | 95463 | 912420 | 147448 | $4.1004 | 349.4 s |
| cuad-sfg-financial-license | 163 | 193 | 0 | 65565 | 93037 | 1502819 | 260336 | $5.0323 | 331.7 s |
| cuad-sparkling-spring-license | 171 | 205 | 0 | 56242 | 102823 | 1135967 | 163887 | $4.4441 | 327.3 s |
| synth-11 | 118 | 127 | 0 | 77106 | 54053 | 897254 | 178253 | $3.2996 | 254.9 s |
| synth-12 | 123 | 123 | 0 | 72924 | 61808 | 1138280 | 247861 | $4.0281 | 268.3 s |
| synth-13 | 115 | 136 | 0 | 68731 | 58089 | 743145 | 160363 | $3.1697 | 222.1 s |
| synth-hardcase | 127 | 131 | 0 | 59606 | 57395 | 682179 | 96085 | $2.6745 | 310.6 s |

## i4-memory

Aggregate evidence: 93.6% · 50.6% · 4.3% · $4.0210 (macro F1 · validity · hallucination · cost/contract).

### Per-contract quality

| Contract | TP | FP | FN | Esc. | Precision | Recall | F1 | Status accuracy | Validity | Minimality | Hallucination | Integrity |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| cuad-americas-shopping-mall-hosting | 11 | 2 | 1 | 0 | 84.6% | 91.7% | 88.0% | 76.9% | 54.5% | 72.7% | 10.1% | pass |
| cuad-bluefly-hosting | 6 | 3 | 3 | 0 | 66.7% | 66.7% | 66.7% | 85.7% | 50.0% | 16.7% | 7.8% | pass |
| cuad-bnc-mortgage-hosting | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 81.8% | 50.0% | 37.5% | 2.2% | pass |
| cuad-corio-hosting | 6 | 0 | 1 | 0 | 100.0% | 85.7% | 92.3% | 62.5% | 33.3% | 16.7% | 3.4% | pass |
| cuad-kubient-msa-part1 | 5 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 20.0% | 60.0% | 0.0% | pass |
| cuad-merit-life-master-services | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 88.9% | 37.5% | 0.0% | 0.9% | pass |
| cuad-sfg-financial-license | 11 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 75.0% | 18.2% | 18.2% | 0.0% | pass |
| cuad-sparkling-spring-license | 7 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 71.4% | 14.3% | 0.0% | pass |
| synth-11 | 7 | 1 | 0 | 0 | 87.5% | 100.0% | 93.3% | 100.0% | 71.4% | 14.3% | 0.0% | pass |
| synth-12 | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 100.0% | 62.5% | 62.5% | 10.9% | pass |
| synth-13 | 8 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 75.0% | 25.0% | 3.5% | pass |
| synth-hardcase | 2 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 50.0% | 0.0% | pass |

### Per-contract resources

| Contract | Calls | Tools | Retries | Input tokens | Output tokens | Cache read | Cache write | Cost | Latency |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 167 | 187 | 0 | 52060 | 95942 | 1076272 | 160288 | $4.1988 | 336.3 s |
| cuad-bluefly-hosting | 160 | 206 | 0 | 45657 | 95836 | 985411 | 142911 | $4.0101 | 382.5 s |
| cuad-bnc-mortgage-hosting | 170 | 194 | 0 | 67151 | 105709 | 1197731 | 178894 | $4.6954 | 358.7 s |
| cuad-corio-hosting | 149 | 179 | 0 | 63004 | 85362 | 1078535 | 185418 | $4.1472 | 302.6 s |
| cuad-kubient-msa-part1 | 160 | 158 | 0 | 73335 | 90316 | 1008749 | 166868 | $4.1719 | 318.7 s |
| cuad-merit-life-master-services | 148 | 160 | 0 | 62989 | 88903 | 876923 | 142930 | $3.8693 | 336.5 s |
| cuad-sfg-financial-license | 162 | 190 | 0 | 64536 | 99076 | 1549619 | 274295 | $5.2887 | 334.1 s |
| cuad-sparkling-spring-license | 172 | 216 | 0 | 53057 | 101446 | 1158505 | 168697 | $4.4350 | 388.5 s |
| synth-11 | 117 | 123 | 0 | 73671 | 58632 | 943106 | 195775 | $3.5293 | 268.9 s |
| synth-12 | 121 | 129 | 0 | 73332 | 61918 | 1115215 | 242150 | $3.9857 | 270.5 s |
| synth-13 | 122 | 140 | 0 | 67516 | 58722 | 807497 | 164279 | $3.2361 | 212.8 s |
| synth-hardcase | 127 | 129 | 0 | 60744 | 55573 | 667574 | 105218 | $2.6844 | 261.6 s |

## x-monolith

Aggregate evidence: 94.1% · 42.4% · 2.1% · $0.9869 (macro F1 · validity · hallucination · cost/contract).

### Per-contract quality

| Contract | TP | FP | FN | Esc. | Precision | Recall | F1 | Status accuracy | Validity | Minimality | Hallucination | Integrity |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| cuad-americas-shopping-mall-hosting | 11 | 1 | 1 | 0 | 91.7% | 91.7% | 91.7% | 76.9% | 54.5% | 45.5% | 0.0% | pass |
| cuad-bluefly-hosting | 6 | 0 | 3 | 0 | 100.0% | 66.7% | 80.0% | 75.0% | 50.0% | 33.3% | 0.0% | pass |
| cuad-bnc-mortgage-hosting | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 72.7% | 25.0% | 25.0% | 0.0% | pass |
| cuad-corio-hosting | 5 | 0 | 2 | 0 | 100.0% | 71.4% | 83.3% | 62.5% | 20.0% | 40.0% | 3.3% | pass |
| cuad-kubient-msa-part1 | 5 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 20.0% | 40.0% | 0.0% | pass |
| cuad-merit-life-master-services | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 88.9% | 37.5% | 37.5% | 0.0% | pass |
| cuad-sfg-financial-license | 11 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 75.0% | 9.1% | 36.4% | 100.0% | pass |
| cuad-sparkling-spring-license | 6 | 0 | 1 | 0 | 100.0% | 85.7% | 92.3% | 90.0% | 50.0% | 16.7% | 0.0% | pass |
| synth-11 | 7 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 85.7% | 71.4% | 42.9% | 2.1% | pass |
| synth-12 | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 100.0% | 50.0% | 62.5% | 5.5% | pass |
| synth-13 | 8 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 75.0% | 62.5% | 4.3% | pass |
| synth-hardcase | 2 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 50.0% | 100.0% | 0.0% | pass |

### Per-contract resources

| Contract | Calls | Tools | Retries | Input tokens | Output tokens | Cache read | Cache write | Cost | Latency |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 8 | 36 | 0 | 16 | 23345 | 172376 | 44428 | $0.9476 | 261.9 s |
| cuad-bluefly-hosting | 28 | 72 | 0 | 56 | 20509 | 860001 | 49170 | $1.2503 | 250.7 s |
| cuad-bnc-mortgage-hosting | 14 | 39 | 0 | 28 | 19884 | 364720 | 46057 | $0.9675 | 233.6 s |
| cuad-corio-hosting | 26 | 49 | 0 | 52 | 17561 | 859871 | 40072 | $1.1197 | 218.9 s |
| cuad-kubient-msa-part1 | 23 | 30 | 0 | 46 | 15130 | 675162 | 26420 | $0.8812 | 210.5 s |
| cuad-merit-life-master-services | 24 | 43 | 0 | 48 | 21237 | 679533 | 34298 | $1.0853 | 266.1 s |
| cuad-sfg-financial-license | 16 | 46 | 0 | 32 | 24741 | 644013 | 55971 | $1.2905 | 274.3 s |
| cuad-sparkling-spring-license | 25 | 62 | 0 | 50 | 20379 | 724287 | 36347 | $1.0990 | 244.2 s |
| synth-11 | 8 | 54 | 0 | 16 | 12536 | 212321 | 40634 | $0.6736 | 128.8 s |
| synth-12 | 15 | 50 | 0 | 30 | 14742 | 481496 | 37669 | $0.8449 | 166.6 s |
| synth-13 | 15 | 59 | 0 | 30 | 14579 | 487534 | 38081 | $0.8464 | 175.0 s |
| synth-hardcase | 31 | 50 | 0 | 62 | 10653 | 824287 | 25370 | $0.8373 | 143.3 s |

## final

Aggregate evidence: 94.8% · 50.6% · 3.8% · $3.5122 (macro F1 · validity · hallucination · cost/contract).

### Per-contract quality

| Contract | TP | FP | FN | Esc. | Precision | Recall | F1 | Status accuracy | Validity | Minimality | Hallucination | Integrity |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| cuad-americas-shopping-mall-hosting | 11 | 2 | 1 | 0 | 84.6% | 91.7% | 88.0% | 76.9% | 45.5% | 72.7% | 5.9% | pass |
| cuad-bluefly-hosting | 7 | 1 | 2 | 0 | 87.5% | 77.8% | 82.4% | 100.0% | 57.1% | 28.6% | 8.0% | pass |
| cuad-bnc-mortgage-hosting | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 81.8% | 50.0% | 37.5% | 1.6% | pass |
| cuad-corio-hosting | 6 | 0 | 1 | 0 | 100.0% | 85.7% | 92.3% | 62.5% | 33.3% | 33.3% | 4.7% | pass |
| cuad-kubient-msa-part1 | 5 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 20.0% | 40.0% | 0.0% | pass |
| cuad-merit-life-master-services | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 88.9% | 50.0% | 12.5% | 0.0% | pass |
| cuad-sfg-financial-license | 11 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 75.0% | 36.4% | 27.3% | 0.0% | pass |
| cuad-sparkling-spring-license | 6 | 0 | 1 | 0 | 100.0% | 85.7% | 92.3% | 90.0% | 83.3% | 33.3% | 0.0% | pass |
| synth-11 | 7 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 71.4% | 28.6% | 0.8% | pass |
| synth-12 | 8 | 0 | 1 | 0 | 100.0% | 88.9% | 94.1% | 100.0% | 62.5% | 50.0% | 8.4% | pass |
| synth-13 | 8 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 87.5% | 50.0% | 25.0% | 4.9% | pass |
| synth-hardcase | 2 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 50.0% | 0.0% | 0.0% | pass |

### Per-contract resources

| Contract | Calls | Tools | Retries | Input tokens | Output tokens | Cache read | Cache write | Cost | Latency |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 152 | 187 | 0 | 47927 | 92972 | 951255 | 157969 | $4.0269 | 323.8 s |
| cuad-bluefly-hosting | 137 | 180 | 0 | 40341 | 80137 | 792026 | 124968 | $3.3822 | 281.5 s |
| cuad-bnc-mortgage-hosting | 140 | 163 | 0 | 48357 | 76989 | 887055 | 151449 | $3.5566 | 264.4 s |
| cuad-corio-hosting | 140 | 169 | 0 | 53390 | 83025 | 1002689 | 179840 | $3.9679 | 300.3 s |
| cuad-kubient-msa-part1 | 131 | 145 | 0 | 53958 | 68305 | 708218 | 132158 | $3.1575 | 257.3 s |
| cuad-merit-life-master-services | 142 | 165 | 0 | 54155 | 81158 | 834458 | 134525 | $3.5577 | 273.8 s |
| cuad-sfg-financial-license | 159 | 187 | 0 | 65692 | 88521 | 1489427 | 266237 | $4.9502 | 333.2 s |
| cuad-sparkling-spring-license | 155 | 208 | 0 | 38888 | 78649 | 1031293 | 153471 | $3.6355 | 276.1 s |
| synth-11 | 111 | 122 | 0 | 68378 | 51427 | 833114 | 187441 | $3.2156 | 199.1 s |
| synth-12 | 122 | 142 | 0 | 67178 | 67775 | 968139 | 197689 | $3.7499 | 268.6 s |
| synth-13 | 111 | 124 | 0 | 63550 | 52701 | 613310 | 129362 | $2.7504 | 202.2 s |
| synth-hardcase | 111 | 123 | 0 | 49649 | 43638 | 544802 | 93559 | $2.1963 | 186.6 s |
