#!/bin/zsh
set -euo pipefail

source "${0:A:h}/lib.sh"

finish() {
  if [[ -n "$REC_PID" && -n "$REC_OUT" ]]; then
    touch "$REC_OUT.STOP"
    wait "$REC_PID" || true
    REC_PID=""
    REC_OUT=""
  fi
  cursor_off
  "$AB_BIN" --session "$S" close >/dev/null 2>&1 || true
}
trap finish EXIT

live_meta_path() {
  print -r -- "$V/logs/live-run.json"
}

review_run_id() {
  local meta
  meta=$(live_meta_path)
  if [[ -f "$meta" ]]; then
    jq -r '.reviewRunId // .runId // "SDqRoWCFr52ycs"' "$meta"
  else
    print -r -- "SDqRoWCFr52ycs"
  fi
}

finding_id_for_rule() {
  local run_id=$1 rule_id=$2
  curl -fsS "$APP_URL/api/runs/$run_id" | jq -r --arg rule "$rule_id" '.findings[] | select(.ruleId == $rule) | .id' | head -n 1
}

select_finding() {
  local run_id=$1 rule_id=$2 finding_id encoded
  finding_id=$(finding_id_for_rule "$run_id" "$rule_id")
  [[ -n "$finding_id" ]] || return 1
  encoded=$(node -e 'process.stdout.write(JSON.stringify(process.argv[1]))' "$finding_id")
  ab eval "[...document.querySelectorAll('[data-finding]')].find((node) => node.dataset.finding === $encoded)?.click(); true"
}

write_live_meta() {
  local run_id=$1 fallback=$2 review_offset=$3 first_finding_offset=$4 capture_duration=$5
  local payload status run_duration cost by_status findings tmp target
  payload=$(curl -fsS "$APP_URL/api/runs/$run_id")
  status=$(print -r -- "$payload" | jq -r '.status')
  run_duration=$(print -r -- "$payload" | jq -r '.stats.durationMs // 0')
  cost=$(print -r -- "$payload" | jq -r '.stats.usage.costUsd // 0')
  by_status=$(print -r -- "$payload" | jq -c '.stats.byStatus // {}')
  findings=$(print -r -- "$payload" | jq -r '.findings | length')
  target=$(live_meta_path)
  tmp="$target.tmp"
  jq -n \
    --arg runId "$run_id" \
    --arg reviewRunId "$run_id" \
    --arg status "$status" \
    --argjson fallback "$fallback" \
    --argjson reviewOffset "$review_offset" \
    --argjson firstFindingOffset "$first_finding_offset" \
    --argjson captureDuration "$capture_duration" \
    --argjson runDurationMs "$run_duration" \
    --argjson costUsd "$cost" \
    --argjson findings "$findings" \
    --argjson byStatus "$by_status" \
    '{runId:$runId,reviewRunId:$reviewRunId,status:$status,fallback:$fallback,reviewOffset:$reviewOffset,firstFindingOffset:$firstFindingOffset,captureDuration:$captureDuration,runDurationMs:$runDurationMs,costUsd:$costUsd,findings:$findings,byStatus:$byStatus}' \
    > "$tmp"
  mv "$tmp" "$target"
}

record_live_run_attempt() {
  local attempt=$1 record_started review_offset first_finding_offset=0 current_url="" run_id payload status findings poll
  open_path "/"
  record_started=$SECONDS
  rec_start workspace-run 360
  if ! tap_text "Sample contracts"; then rec_stop workspace-run || true; return 1; fi
  sleep 0.6
  if ! tap_text "Corio"; then rec_stop workspace-run || true; return 1; fi
  for poll in {1..60}; do
    current_url=$(abo get url | tail -n 1)
    current_url=${current_url//\"/}
    [[ "$current_url" == *"/review/"* ]] && break
    sleep 0.5
  done
  run_id=${current_url##*/}
  if [[ ! "$run_id" =~ '^[A-Za-z0-9_-]{14}$' ]]; then rec_stop workspace-run || true; return 1; fi
  review_offset=$(( SECONDS - record_started ))
  print -r -- "live run attempt $attempt · $run_id" > "$V/logs/live-run-attempt-$attempt.log"

  while (( SECONDS - record_started < 350 )); do
    payload=$(curl -fsS "$APP_URL/api/runs/$run_id") || { sleep 2; continue; }
    status=$(print -r -- "$payload" | jq -r '.status')
    findings=$(print -r -- "$payload" | jq -r '.findings | length')
    if (( first_finding_offset == 0 && findings > 0 )); then
      first_finding_offset=$(( SECONDS - record_started ))
      print -r -- "first finding at ${first_finding_offset}s" >> "$V/logs/live-run-attempt-$attempt.log"
    fi
    if [[ "$status" == "awaiting_review" || "$status" == "applied" ]]; then
      sleep 3
      snapshot_beat workspace-run
      rec_stop workspace-run
      write_live_meta "$run_id" false "$review_offset" "$first_finding_offset" "$(( SECONDS - record_started ))"
      return 0
    fi
    if [[ "$status" == "failed" ]]; then
      print -r -- "run failed" >> "$V/logs/live-run-attempt-$attempt.log"
      break
    fi
    sleep 2
  done
  rec_stop workspace-run || true
  return 1
}

record_live_run_fallback() {
  local target started tmp
  open_path "/review/sample-running"
  started=$SECONDS
  rec_start workspace-run 75
  sleep 34
  snapshot_beat workspace-run
  rec_stop workspace-run
  target=$(live_meta_path)
  tmp="$target.tmp"
  jq -n \
    --arg runId "SDqRoWCFr52ycs" \
    --arg reviewRunId "SDqRoWCFr52ycs" \
    --arg status "fallback" \
    --argjson captureDuration "$(( SECONDS - started ))" \
    '{runId:$runId,reviewRunId:$reviewRunId,status:$status,fallback:true,reviewOffset:0,firstFindingOffset:12,captureDuration:$captureDuration,runDurationMs:0,costUsd:0,findings:0,byStatus:{}}' \
    > "$tmp"
  mv "$tmp" "$target"
}

record_live_run() {
  local attempt
  for attempt in 1 2; do
    if record_live_run_attempt "$attempt"; then return 0; fi
  done
  record_live_run_fallback
}

record_landing() {
  open_path "/"
  snapshot_beat landing
  local target=$(narration_target landing 9) started=$SECONDS
  rec_start landing $(( target + 20 ))
  move_to_text "Upload a contract" || true
  sleep 2
  move_to_text "PLAYBOOK" || true
  hold_until "$started" "$target"
  rec_stop landing
}

record_pick_sample() {
  open_path "/"
  local target=$(narration_target pick-sample 10) started=$SECONDS
  rec_start pick-sample $(( target + 20 ))
  tap_text "Synthetic MSA"
  sleep 1.5
  snapshot_beat pick-sample
  move_to_text "Start review" || true
  hold_until "$started" "$target"
  rec_stop pick-sample
}

record_workspace_run() {
  open_path "/"
  local target=$(narration_target workspace-run 15) started=$SECONDS
  rec_start workspace-run $(( target + 25 ))
  open_path "/review/sample-running"
  sleep 2.8
  snapshot_beat workspace-run
  move_to_selector '[aria-label="Agent progress"]' || move_pointer 1670 420
  hold_until "$started" "$target"
  rec_stop workspace-run
}

record_findings_arrive() {
  open_path "/review/sample-running"
  sleep 10
  local target=$(narration_target findings-arrive 18) started=$SECONDS
  rec_start findings-arrive $(( target + 25 ))
  ab wait 'article[data-finding]' || true
  sleep 1
  snapshot_beat findings-arrive
  move_to_selector 'article[data-finding]' || move_pointer 1680 590
  hold_until "$started" "$target"
  rec_stop findings-arrive
}

record_keyboard_review() {
  local run_id low_id encoded
  run_id=$(review_run_id)
  open_path "/review/$run_id"
  ab wait 'article[data-finding]'
  snapshot_beat keyboard-review-start
  local target=$(narration_target keyboard-review 20) started=$SECONDS
  rec_start keyboard-review $(( target + 45 ))
  ab press j; sleep 0.4
  ab press k; sleep 0.4
  select_finding "$run_id" "LOL-CAP"
  sleep 0.6
  ab press e
  ab wait '[role="dialog"]'
  sleep 0.4
  snapshot_beat keyboard-review-edit
  ab fill '#op-0' "the greater of (a) the fees paid or payable by Customer under this Agreement in the eighteen (18) months immediately preceding the event giving rise to the claim and (b) USD 1,500,000"
  sleep 1.2
  move_to_text "Save and accept" || true
  ab eval '[...document.querySelectorAll("button")].find((button) => button.textContent?.includes("Save and accept"))?.click(); true'
  sleep 0.9
  select_finding "$run_id" "LICENSE"
  ab press a
  sleep 0.8
  select_finding "$run_id" "T4C"
  ab press a
  sleep 0.8
  low_id=$(curl -fsS "$APP_URL/api/runs/$run_id" | jq -r '[.findings[] | select(.severity == "low")][0].id // empty')
  [[ -n "$low_id" ]] || return 1
  encoded=$(node -e 'process.stdout.write(JSON.stringify(process.argv[1]))' "$low_id")
  ab eval "[...document.querySelectorAll('[data-finding]')].find((node) => node.dataset.finding === $encoded)?.click(); true"
  ab press r
  sleep 1
  snapshot_beat keyboard-review-decisions
  hold_until "$started" "$target"
  rec_stop keyboard-review
}

record_export_dialog() {
  local run_id target started
  run_id=$(review_run_id)
  open_path "/review/$run_id"
  ab wait 'article[data-finding]'
  target=$(narration_target export-dialog 11)
  started=$SECONDS
  rec_start export-dialog $(( target + 20 ))
  tap_text "Export .docx"
  ab wait '[role="dialog"]'
  sleep 1
  snapshot_beat export-dialog
  move_to_text "Write tracked changes" || true
  tap_text "Write tracked changes"
  ab wait --text "Tracked changes written"
  sleep 1.5
  snapshot_beat export-success
  move_to_text "Download the redlined document" || true
  hold_until "$started" "$target"
  rec_stop export-dialog
}

record_memo_drawer() {
  local run_id
  run_id=$(review_run_id)
  open_path "/review/$run_id"
  ab wait 'article[data-finding]'
  local target=$(narration_target memo-drawer 9) started=$SECONDS
  rec_start memo-drawer $(( target + 20 ))
  tap_text "Memo"
  ab wait '[role="dialog"]'
  sleep 1.2
  snapshot_beat memo-drawer
  move_pointer 1660 520
  ab scroll down 420 || true
  hold_until "$started" "$target"
  rec_stop memo-drawer
}

record_evals_dashboard() {
  open_path "/evals"
  ab wait --text "The config ladder"
  snapshot_beat evals-dashboard
  local target=$(narration_target comparison 22) started=$SECONDS
  rec_start evals-dashboard $(( target + 25 ))
  move_pointer 1550 430
  sleep 5
  ab scroll down 520
  sleep 5
  move_pointer 1520 760
  hold_until "$started" "$target"
  rec_stop evals-dashboard
}

record_trajectory() {
  local run_id target started
  run_id=${HARDCASE_RUN_ID:-$(jq -r '.runId' "$V/logs/hardcase-run.json")}
  open_path "/trajectories/$run_id"
  ab wait --text "Drafters"
  snapshot_beat trajectory-start
  target=$(narration_target hard-case 20)
  started=$SECONDS
  rec_start trajectory $(( target + 30 ))
  tap_text "LOL-CAP"
  sleep 1.5
  ab fill 'input[type="search"]' "get_definition"
  sleep 2
  ab snapshot -i -c
  ab click @e16
  ab click @e17
  sleep 3
  snapshot_beat trajectory-filtered
  ab fill 'input[type="search"]' "Implementation Fee"
  sleep 3
  ab eval '[...document.querySelectorAll("main button")].filter((button) => /Tool (call|result)/.test(button.textContent ?? "")).slice(0, 2).forEach((button) => button.click()); true'
  sleep 3
  snapshot_beat trajectory-implementation-fee
  move_to_selector 'main button[aria-expanded="false"]' || move_pointer 1120 470
  hold_until "$started" "$target"
  rec_stop trajectory
}

record_precedents() {
  open_path "/precedents"
  ab wait 'input[type="search"]'
  snapshot_beat precedents
  local target=$(narration_target precedents 11) started=$SECONDS
  rec_start precedents $(( target + 20 ))
  tap_selector 'input[type="search"]'
  ab keyboard type "LOL-CAP"
  sleep 1.5
  ab scroll down 420 || true
  move_pointer 1300 520
  hold_until "$started" "$target"
  rec_stop precedents
}

record_all() {
  record_landing
  record_live_run
  record_keyboard_review
  record_precedents
  record_export_dialog
  record_memo_drawer
  record_evals_dashboard
  record_trajectory
}

usage() {
  print "usage: zsh bin/record.sh all|landing|pick-sample|live-run|workspace-run|findings-arrive|keyboard-review|export-dialog|memo-drawer|evals-dashboard|trajectory|precedents"
}

boot
case "${1:-}" in
  all) record_all ;;
  landing) record_landing ;;
  pick-sample) record_pick_sample ;;
  live-run) record_live_run ;;
  workspace-run) record_workspace_run ;;
  findings-arrive) record_findings_arrive ;;
  keyboard-review) record_keyboard_review ;;
  export-dialog) record_export_dialog ;;
  memo-drawer) record_memo_drawer ;;
  evals-dashboard) record_evals_dashboard ;;
  trajectory) record_trajectory ;;
  precedents) record_precedents ;;
  *) usage; exit 2 ;;
esac
