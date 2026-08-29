#!/bin/zsh
# Evaluation campaign: record every config on all 12 contracts (live), judge live, then report.
# Usage: plans/harness/campaign.sh [concurrency] [configs...]
# Logs: plans/harness/logs/campaign-<config>.log ; last line per config is "CAMPAIGN <config> EXIT <code>".
set -u
cd "$(dirname "$0")/../.."
CONC="${1:-3}"; shift || true
CONFIGS=("$@")
if [ ${#CONFIGS[@]} -eq 0 ]; then CONFIGS=(b1-prompt b0-chat i1-docmodel i2-workers i3-verifier i4-memory final x-monolith); fi
mkdir -p plans/harness/logs
for cfg in "${CONFIGS[@]}"; do
  log="plans/harness/logs/campaign-${cfg}.log"
  echo "=== $(date '+%F %T') start $cfg (concurrency $CONC)" | tee -a "$log"
  pnpm exec tsx scripts/eval.ts --config "$cfg" --live --judge live --concurrency "$CONC" >> "$log" 2>&1
  code=$?
  echo "=== $(date '+%F %T') CAMPAIGN $cfg EXIT $code" | tee -a "$log"
done
pnpm exec tsx scripts/report.ts >> plans/harness/logs/campaign-report.log 2>&1
echo "CAMPAIGN DONE $(date '+%F %T')"
