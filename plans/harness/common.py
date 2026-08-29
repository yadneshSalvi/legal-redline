"""Shared helpers for the Playbook Redliner orchestration harness (plans/harness/).

- ROOT   : repo root (this file lives at plans/harness/common.py)
- env()  : read a value from ROOT/.env without echoing it (falls back to os.environ)
- sessions registry: plans/harness/sessions.json, label -> run metadata (ids for resume)
"""
from __future__ import annotations

import fcntl
import json
import os
import re
import time
from pathlib import Path

HARNESS = Path(__file__).resolve().parent
ROOT = HARNESS.parents[1]
LOGS = HARNESS / "logs"
REPORTS = HARNESS / "reports"
BRIEFS = HARNESS / "briefs"
SESSIONS = HARNESS / "sessions.json"
for d in (LOGS, REPORTS, BRIEFS):
    d.mkdir(parents=True, exist_ok=True)

_ENV_RE = re.compile(r'^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$')


def env(name: str, default: str | None = None) -> str | None:
    """Value of NAME from ROOT/.env (KEY=VALUE, optional quotes/comments) or os.environ."""
    envfile = ROOT / ".env"
    if envfile.exists():
        for line in envfile.read_text().splitlines():
            if not line.strip() or line.lstrip().startswith("#"):
                continue
            m = _ENV_RE.match(line)
            if m and m.group(1) == name:
                v = m.group(2)
                if v[:1] in ("'", '"') and v[-1:] == v[:1]:
                    v = v[1:-1]
                return v.split(" #")[0].strip() if not v.startswith(("'", '"')) else v
    return os.environ.get(name, default)


def stamp() -> str:
    return time.strftime("%Y%m%d-%H%M%S")


def _locked(fn):
    def wrapper(*a, **kw):
        lock = HARNESS / ".sessions.lock"
        with open(lock, "w") as lf:
            fcntl.flock(lf, fcntl.LOCK_EX)
            try:
                return fn(*a, **kw)
            finally:
                fcntl.flock(lf, fcntl.LOCK_UN)
    return wrapper


def load_sessions() -> dict:
    if SESSIONS.exists():
        try:
            return json.loads(SESSIONS.read_text())
        except json.JSONDecodeError:
            return {}
    return {}


@_locked
def record(label: str, **fields) -> dict:
    """Merge fields into the registry entry for `label` (creates it). Returns the entry."""
    data = load_sessions()
    entry = data.get(label, {"label": label, "runs": []})
    for k, v in fields.items():
        if k == "run":
            entry["runs"].append(v)
        else:
            entry[k] = v
    entry["updated"] = time.strftime("%Y-%m-%d %H:%M:%S")
    data[label] = entry
    tmp = SESSIONS.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(data, indent=2))
    tmp.replace(SESSIONS)
    return entry


def parse_json_block(text: str) -> dict | None:
    """Pull the last ```json ... ``` block (or bare JSON object) out of a reply."""
    blocks = re.findall(r"```json\s*(.*?)```", text, re.DOTALL)
    candidates = blocks or re.findall(r"(\{[\s\S]*\})", text)
    for cand in reversed(candidates):
        try:
            return json.loads(cand)
        except json.JSONDecodeError:
            continue
    return None
