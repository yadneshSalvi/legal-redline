#!/bin/zsh
# Post-campaign finalisation: consistent re-score of every config with the final scoring code (replay + record only
# memo/judge misses), report, docs rendering, trajectory + coding-trace + human-session exports.
# Usage: plans/harness/finalize.sh   (idempotent; logs to plans/harness/logs/finalize.log)
set -u
cd "$(dirname "$0")/../.."
L=plans/harness/logs/finalize.log
echo "=== $(date '+%F %T') finalize start" | tee -a "$L"
for cfg in b0-chat b1-prompt i1-docmodel i2-workers i3-verifier i4-memory final x-monolith; do
  echo "--- $(date '+%T') rescore $cfg" | tee -a "$L"
  pnpm exec tsx scripts/eval.ts --config "$cfg" --allow-live --judge live --concurrency 4 >> "$L" 2>&1
  echo "--- $(date '+%T') RESCORE $cfg EXIT $?" | tee -a "$L"
done
pnpm exec tsx scripts/report.ts >> "$L" 2>&1; echo "--- report EXIT $?" | tee -a "$L"
pnpm exec tsx scripts/render-docs.ts >> "$L" 2>&1; echo "--- render-docs EXIT $?" | tee -a "$L"
pnpm exec tsx scripts/export-trajectories.ts --all-final >> "$L" 2>&1; echo "--- export-trajectories EXIT $?" | tee -a "$L"
pnpm exec tsx scripts/export-human-sessions.ts >> "$L" 2>&1; echo "--- export-human-sessions EXIT $?" | tee -a "$L"
pnpm exec tsx scripts/export-coding-traces.ts >> "$L" 2>&1; echo "--- export-coding-traces EXIT $?" | tee -a "$L"
echo "=== $(date '+%F %T') FINALIZE DONE" | tee -a "$L"
