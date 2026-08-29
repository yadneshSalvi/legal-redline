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
  agent-browser --session "$S" close >/dev/null 2>&1 || true
}
trap finish EXIT

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
  open_path "/review/sample"
  ab wait 'article[data-finding]'
  ab eval 'document.querySelector("[data-finding=f-lol-cap]")?.click(); true'
  snapshot_beat keyboard-review-start
  local target=$(narration_target keyboard-review 20) started=$SECONDS
  rec_start keyboard-review $(( target + 35 ))
  ab press j; sleep 0.4
  ab press k; sleep 0.4
  ab press e
  ab wait '[role="dialog"]'
  sleep 0.4
  snapshot_beat keyboard-review-edit
  ab fill '#op-1' "the greater of (a) the fees paid or payable by Customer under this Agreement in the eighteen (18) months immediately preceding the event giving rise to the claim and (b) USD 1,500,000"
  sleep 0.5
  tap_text "Save and accept"
  sleep 0.5
  ab press j; sleep 0.3
  ab press a; sleep 0.5
  ab press j; sleep 0.3
  ab press r
  hold_until "$started" "$target"
  rec_stop keyboard-review
}

record_export_dialog() {
  open_path "/review/sample"
  ab wait 'article[data-finding]'
  ab press a
  sleep 0.8
  local target=$(narration_target export-dialog 11) started=$SECONDS
  rec_start export-dialog $(( target + 20 ))
  tap_text "Export .docx"
  ab wait '[role="dialog"]'
  sleep 1
  snapshot_beat export-dialog
  move_to_text "Write tracked changes" || true
  hold_until "$started" "$target"
  rec_stop export-dialog
}

record_memo_drawer() {
  open_path "/review/sample"
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
  open_path "/trajectories/sample"
  ab wait --text "Drafters"
  snapshot_beat trajectory-start
  local target=$(narration_target hard-case 20) started=$SECONDS
  rec_start trajectory $(( target + 30 ))
  tap_text "LOL-CAP"
  sleep 1.5
  tap_selector 'input[type="search"]'
  ab keyboard type "resolve_definition"
  sleep 2
  snapshot_beat trajectory-filtered
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
  ab keyboard type "liability"
  sleep 1.5
  move_pointer 1300 520
  hold_until "$started" "$target"
  rec_stop precedents
}

record_all() {
  record_landing
  record_pick_sample
  record_workspace_run
  record_findings_arrive
  record_keyboard_review
  record_export_dialog
  record_memo_drawer
  record_evals_dashboard
  record_trajectory
  record_precedents
}

usage() {
  print "usage: zsh bin/record.sh all|landing|pick-sample|workspace-run|findings-arrive|keyboard-review|export-dialog|memo-drawer|evals-dashboard|trajectory|precedents"
}

boot
case "${1:-}" in
  all) record_all ;;
  landing) record_landing ;;
  pick-sample) record_pick_sample ;;
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
