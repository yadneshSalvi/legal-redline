#!/usr/bin/env python3
"""Playbook Redliner orchestration CLI — spawn/resume Sol (codex) and Opus (SDK) subagents.

  run.py codex --label engine-geometry --brief plans/harness/briefs/engine-geometry.md [--resume]
         [--effort xhigh|max] [--sandbox danger-full-access|workspace-write|read-only|bypass]
         [--cwd DIR] [--add-dir D ...] [--image PNG ...] [--timeout SEC]
  run.py opus  --label ui-catalog --brief ... [--resume] [--effort xhigh|max] [--budget 60]
         [--cwd DIR] [--add-dir D ...] [--reviewer]
  run.py list                      # registry summary
  run.py show --label X            # last report for a label

Every run records {kind, id (thread/session), status, cost, exit, report, log} under
plans/harness/sessions.json keyed by --label, so any agent can be resumed later with --resume.
The final stdout line is `DONE …` (or `FAIL …`) for background-task notifications.
"""
from __future__ import annotations

import argparse
import os
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from common import ROOT, load_sessions, record  # noqa: E402


def _brief(path: str) -> str:
    p = Path(path)
    if not p.is_absolute():
        p = ROOT / p
    return p.read_text()


def cmd_codex(a):
    from codex_run import codex
    entry = load_sessions().get(a.label, {})
    resume = entry.get("id") if a.resume else None
    if a.resume and str(a.cwd) == str(ROOT) and entry.get("cwd"):
        a.cwd = entry["cwd"]  # resume inherits the shell cwd otherwise — keep the worktree
    if a.resume and not resume:
        sys.exit(f"FAIL no session recorded for label {a.label}")
    record(a.label, kind="codex", status="running", pid=os.getpid(), started=time.strftime("%F %T"),
           brief=a.brief, cwd=str(a.cwd), effort=a.effort)
    r = codex(_brief(a.brief), a.cwd, effort=a.effort, images=a.image, resume=resume,
              sandbox=a.sandbox, add_dirs=a.add_dir, label=a.label, timeout_s=a.timeout)
    status = "done" if r.exit_code == 0 else "error"
    record(a.label, id=r.thread_id, status=status, exit=r.exit_code,
           run={"at": time.strftime("%F %T"), "resume": bool(resume), "exit": r.exit_code,
                "duration_s": round(r.duration_s), "report": str(r.report_file), "log": str(r.log_file)})
    print(f"{'DONE' if status == 'done' else 'FAIL'} label={a.label} kind=codex id={r.thread_id} "
          f"exit={r.exit_code} {r.duration_s:.0f}s report={r.report_file}")


def cmd_opus(a):
    from opus_agent import run_agent
    entry = load_sessions().get(a.label, {})
    resume = entry.get("id") if a.resume else None
    if a.resume and str(a.cwd) == str(ROOT) and entry.get("cwd"):
        a.cwd = entry["cwd"]  # resume inherits the shell cwd otherwise — keep the worktree
    if a.resume and not resume:
        sys.exit(f"FAIL no session recorded for label {a.label}")
    record(a.label, kind="opus", status="running", pid=os.getpid(), started=time.strftime("%F %T"),
           brief=a.brief, cwd=str(a.cwd), effort=a.effort)
    r = run_agent(_brief(a.brief), a.cwd, resume=resume, label=a.label, effort=a.effort,
                  max_budget_usd=a.budget, add_dirs=a.add_dir, reviewer=a.reviewer,
                  on_session=lambda sid: record(a.label, id=sid))
    status = "error" if r.is_error else "done"
    prev = load_sessions().get(a.label, {}).get("cost_usd", 0.0) or 0.0
    record(a.label, id=r.session_id, status=status, cost_usd=round(prev + r.cost_usd, 2),
           run={"at": time.strftime("%F %T"), "resume": bool(resume), "cost_usd": round(r.cost_usd, 2),
                "turns": r.num_turns, "error": r.is_error, "duration_s": round(r.duration_s),
                "report": str(r.report_file), "log": str(r.log_file)})
    print(f"{'DONE' if status == 'done' else 'FAIL'} label={a.label} kind=opus id={r.session_id} "
          f"cost=${r.cost_usd:.2f} turns={r.num_turns} {r.duration_s:.0f}s report={r.report_file}")


def cmd_list(a):
    data = load_sessions()
    if not data:
        print("(no sessions yet)")
    for label, e in sorted(data.items(), key=lambda kv: kv[1].get("updated", "")):
        print(f"{label:28} {e.get('kind','?'):5} {e.get('status','?'):8} "
              f"runs={len(e.get('runs', []))} cost=${e.get('cost_usd', 0) or 0:.2f} id={e.get('id')}")


def cmd_show(a):
    e = load_sessions().get(a.label)
    if not e:
        sys.exit(f"no such label {a.label}")
    runs = e.get("runs", [])
    if runs:
        print(Path(runs[-1]["report"]).read_text())
    else:
        print(e)


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    for kind in ("codex", "opus"):
        s = sub.add_parser(kind)
        s.add_argument("--label", required=True)
        s.add_argument("--brief", required=True)
        s.add_argument("--resume", action="store_true")
        s.add_argument("--effort", default="xhigh")
        s.add_argument("--cwd", default=str(ROOT))
        s.add_argument("--add-dir", action="append", default=[])
        if kind == "codex":
            s.add_argument("--sandbox", default="danger-full-access")
            s.add_argument("--image", action="append", default=[])
            s.add_argument("--timeout", type=int, default=3 * 3600)
            s.set_defaults(fn=cmd_codex)
        else:
            s.add_argument("--budget", type=float, default=None, help="USD cap; default none (user: no spend ceiling)")
            s.add_argument("--reviewer", action="store_true")
            s.set_defaults(fn=cmd_opus)
    sub.add_parser("list").set_defaults(fn=cmd_list)
    s = sub.add_parser("show"); s.add_argument("--label", required=True); s.set_defaults(fn=cmd_show)
    a = p.parse_args()
    a.fn(a)


if __name__ == "__main__":
    main()
