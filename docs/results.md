# Full evaluation results

Generated deterministically from `evals/results/*.json` by `pnpm render-docs`. Percentages use the unrounded JSON values.

## b1-prompt

Aggregate evidence: 85.2% · 41.0% · 10.8% · $0.3478 (macro F1 · validity · hallucination · cost/contract).

### Per-contract quality

| Contract | TP | FP | FN | Esc. | Precision | Recall | F1 | Status accuracy | Validity | Minimality | Hallucination | Integrity |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| cuad-americas-shopping-mall-hosting | 10 | 4 | 1 | 0 | 71.4% | 90.9% | 80.0% | 91.7% | 55.6% | 22.2% | 15.4% | pass |
| cuad-bluefly-hosting | 8 | 3 | 1 | 1 | 72.7% | 88.9% | 80.0% | 90.0% | 12.5% | 37.5% | 0.0% | pass |
| cuad-bnc-mortgage-hosting | 7 | 4 | 0 | 2 | 63.6% | 100.0% | 77.8% | 80.0% | 42.9% | 0.0% | 15.8% | pass |
| cuad-corio-hosting | 7 | 1 | 0 | 2 | 87.5% | 100.0% | 93.3% | 90.0% | 14.3% | 14.3% | 4.8% | pass |
| cuad-kubient-msa-part1 | 6 | 1 | 1 | 2 | 85.7% | 85.7% | 85.7% | 88.9% | 16.7% | 33.3% | 100.0% | pass |
| cuad-merit-life-master-services | 9 | 2 | 0 | 0 | 81.8% | 100.0% | 90.0% | 90.0% | 44.4% | 22.2% | 0.0% | pass |
| cuad-sfg-financial-license | 7 | 6 | 4 | 2 | 53.8% | 63.6% | 58.3% | 100.0% | 0.0% | 28.6% | 100.0% | pass |
| cuad-sparkling-spring-license | 4 | 3 | 3 | 5 | 57.1% | 57.1% | 57.1% | 50.0% | 25.0% | 25.0% | 0.0% | pass |
| synth-11 | 7 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 71.4% | 0.0% | 0.0% | pass |
| synth-12 | 9 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 66.7% | 0.0% | 11.9% | pass |
| synth-13 | 8 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 75.0% | 12.5% | 0.0% | pass |
| synth-hardcase | 2 | 0 | 0 | 0 | 100.0% | 100.0% | 100.0% | 100.0% | 50.0% | 50.0% | 20.8% | pass |

### Per-contract resources

| Contract | Calls | Tools | Retries | Input tokens | Output tokens | Cache read | Cache write | Cost | Latency |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| cuad-americas-shopping-mall-hosting | 1 | 0 | 0 | 13729 | 13051 | 0 | 891 | $0.4005 | 140.4 s |
| cuad-bluefly-hosting | 1 | 0 | 0 | 19818 | 10503 | 0 | 891 | $0.3672 | 109.5 s |
| cuad-bnc-mortgage-hosting | 1 | 0 | 0 | 18076 | 13786 | 0 | 891 | $0.4406 | 141.2 s |
| cuad-corio-hosting | 1 | 0 | 0 | 26906 | 11878 | 891 | 0 | $0.4319 | 123.4 s |
| cuad-kubient-msa-part1 | 1 | 0 | 0 | 16373 | 9687 | 891 | 0 | $0.3245 | 98.0 s |
| cuad-merit-life-master-services | 1 | 0 | 0 | 15075 | 11063 | 891 | 0 | $0.3524 | 114.1 s |
| cuad-sfg-financial-license | 1 | 0 | 0 | 25733 | 12427 | 891 | 0 | $0.4398 | 129.3 s |
| cuad-sparkling-spring-license | 1 | 0 | 0 | 16340 | 12312 | 891 | 0 | $0.3899 | 133.9 s |
| synth-11 | 1 | 0 | 0 | 19157 | 6655 | 891 | 0 | $0.2626 | 70.1 s |
| synth-12 | 1 | 0 | 0 | 18113 | 8458 | 891 | 0 | $0.3025 | 89.5 s |
| synth-13 | 1 | 0 | 0 | 18447 | 6085 | 891 | 0 | $0.2448 | 60.8 s |
| synth-hardcase | 1 | 0 | 0 | 19411 | 4548 | 0 | 891 | $0.2163 | 47.3 s |
