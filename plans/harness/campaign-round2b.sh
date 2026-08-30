#!/bin/zsh
# Round-2b: the r2 configs (i7-precise short tier; final-v3 both tiers) on the official runner + judge, then the
# zero-cost replay check, report and docs render. Run detached from the main checkout after merging wt/redline-quality-r2:
#   nohup zsh plans/harness/campaign-round2b.sh > plans/harness/logs/campaign-round2b.log 2>&1 &
set -u
cd "$(dirname "$0")/../.."
stamp() { date "+%Y-%m-%d %H:%M:%S"; }
free_gb=$(df -g / | awk 'NR==2{print $4}')
if [ "${free_gb:-0}" -lt 6 ]; then echo "ABORT: only ${free_gb} GB free on / — recording under ENOSPC silently degrades runs (see 2026-08-30 i5 incident)"; exit 2; fi
echo "=== $(stamp) ROUND-2b CAMPAIGN START (HEAD $(git rev-parse --short HEAD))"
PAIRS=(i7-precise:short final-v3:all)
for pair in $PAIRS; do
  cfg=${pair%%:*}; tier=${pair##*:}
  echo "--- $(stamp) EVAL $cfg (tier $tier, allow-live: model + judge replay-first, live on misses)"
  pnpm -s eval --config "$cfg" --tier "$tier" --allow-live --concurrency 3 --judge-concurrency 4
  echo "--- $(stamp) EVAL $cfg EXIT $?"
done
echo "--- $(stamp) REPLAY CHECK (zero cost, must not miss)"
ALL=(b1-prompt:all i3-verifier:all final:all i5-elements:short i6-longdoc:all final-v2:all i7-precise:short final-v3:all)
for pair in $ALL; do cfg=${pair%%:*}; tier=${pair##*:}; pnpm -s eval --config "$cfg" --tier "$tier" --concurrency 3 || echo "REPLAY MISS in $cfg/$tier"; done
echo "--- $(stamp) REPLAY DONE"
pnpm -s report; echo "--- $(stamp) report EXIT $?"
pnpm -s render-docs; echo "--- $(stamp) render-docs EXIT $?"
echo "=== $(stamp) ROUND-2b CAMPAIGN DONE"
