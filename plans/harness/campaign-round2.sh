#!/bin/zsh
# Round-2 live campaign: every config that appears in the round-2 ladder, on both tiers, judge v2.
# Replays whatever is cached (round-1 short-tier runs, Track A's long-tier baseline/final, Track B's dev caches) and
# records the rest live (--allow-live). Run detached from the main checkout:
#   nohup zsh plans/harness/campaign-round2.sh > plans/harness/logs/campaign-round2.log 2>&1 &
set -u
cd "$(dirname "$0")/../.."
LOG=plans/harness/logs/campaign-round2.log
stamp() { date "+%Y-%m-%d %H:%M:%S"; }
echo "=== $(stamp) ROUND-2 CAMPAIGN START (HEAD $(git rev-parse --short HEAD))"
CONFIGS=(b1-prompt i3-verifier final i5-elements i6-longdoc final-v2)
for cfg in $CONFIGS; do
  echo "--- $(stamp) EVAL $cfg (tier all, allow-live, judge live on misses)"
  pnpm -s eval --config "$cfg" --tier all --allow-live --judge live --concurrency 3 --judge-concurrency 4
  echo "--- $(stamp) EVAL $cfg EXIT $?"
done
echo "--- $(stamp) REPLAY CHECK (zero cost, must not miss)"
pnpm -s eval --all --tier all --concurrency 3; echo "--- $(stamp) REPLAY EXIT $?"
pnpm -s report; echo "--- $(stamp) report EXIT $?"
pnpm -s render-docs; echo "--- $(stamp) render-docs EXIT $?"
echo "=== $(stamp) ROUND-2 CAMPAIGN DONE"
