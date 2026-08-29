"""GPT-5.6 Sol through the Codex CLI harness (`codex exec`), non-interactively.

Verified on this machine 2026-08-29: codex-cli 0.150.1, `codex login status` =
API key. New session → `thread.started` event carries `thread_id`; resume with
`codex exec resume <thread_id>` (resume rejects --sandbox/--cd/--add-dir; they
are inherited from the original session).
"""
from __future__ import annotations

import json
import subprocess
import time
from dataclasses import dataclass
from pathlib import Path

from common import LOGS, REPORTS, stamp

MODEL = "gpt-5.6-sol"


@dataclass
class CodexResult:
    text: str
    thread_id: str | None
    exit_code: int
    log_file: Path
    report_file: Path
    duration_s: float


def _thread_id(jsonl: Path) -> str | None:
    try:
        for line in open(jsonl):
            try:
                ev = json.loads(line)
            except json.JSONDecodeError:
                continue
            if isinstance(ev, dict) and ev.get("type") == "thread.started":
                return ev.get("thread_id")
    except OSError:
        pass
    return None


def codex(prompt: str, cwd: str | Path, *, effort: str = "xhigh", model: str = MODEL,
          images: list[str | Path] | None = None, resume: str | None = None,
          sandbox: str = "danger-full-access", network: bool = True,
          add_dirs: list[str | Path] | None = None, output_schema: str | Path | None = None,
          label: str = "codex", timeout_s: int = 3 * 3600) -> CodexResult:
    """One codex exec run. sandbox: read-only | workspace-write | danger-full-access | bypass."""
    st = stamp()
    log_file = LOGS / f"{st}-{label}.codex.jsonl"
    report_file = REPORTS / f"{st}-{label}.md"

    cmd = ["codex", "exec"]
    if resume:
        cmd += ["resume", resume]
    cmd += ["--model", model, "-c", f'model_reasoning_effort="{effort}"',
            "--skip-git-repo-check", "--json", "-o", str(report_file)]
    if not resume:
        if sandbox == "bypass":
            cmd += ["--dangerously-bypass-approvals-and-sandbox"]
        else:
            cmd += ["--sandbox", sandbox]
            if sandbox == "workspace-write" and network:
                cmd += ["-c", "sandbox_workspace_write.network_access=true"]
        cmd += ["--cd", str(cwd)]
        for d in add_dirs or []:
            cmd += ["--add-dir", str(d)]
        if output_schema:
            cmd += ["--output-schema", str(output_schema)]
    for img in images or []:
        cmd += ["-i", str(img)]
    cmd += ["-"]  # prompt on stdin

    t0 = time.time()
    with open(log_file, "w") as lf:
        proc = subprocess.run(cmd, input=prompt, stdout=lf, stderr=subprocess.STDOUT, cwd=str(cwd),
                              text=True, timeout=timeout_s)
    text = report_file.read_text() if report_file.exists() else ""
    return CodexResult(text=text, thread_id=resume or _thread_id(log_file),
                       exit_code=proc.returncode, log_file=log_file,
                       report_file=report_file, duration_s=time.time() - t0)
