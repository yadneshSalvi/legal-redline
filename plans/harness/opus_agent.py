"""Opus 5 build/review agents through the Claude Agent SDK (Python 0.2.147) on the API key.

Verified 2026-08-29: model "claude-opus-5" answers on ANTHROPIC_API_KEY; EffortLevel
accepts low|medium|high|xhigh|max; session id arrives in the first SystemMessage
(init) and is persisted immediately via on_session for crash-safe resume.
"""
from __future__ import annotations

import time
from dataclasses import dataclass
from pathlib import Path

import anyio
from claude_agent_sdk import (AssistantMessage, ClaudeAgentOptions, ResultMessage,
                              SystemMessage, TextBlock, ToolUseBlock, query)

from common import LOGS, REPORTS, env, stamp

MODEL = "claude-opus-5"
EFFORT = "xhigh"
BUILDER_TOOLS = ["Bash", "Read", "Write", "Edit", "Glob", "Grep", "WebFetch", "WebSearch"]
REVIEWER_TOOLS = ["Bash", "Read", "Glob", "Grep", "WebFetch"]

SYSTEM_APPEND = """
You are working inside the Playbook Redliner repository (micro1 Agentic Workflows Hackathon
entry: an agentic contract-redlining product). Read AGENTS.md / CLAUDE.md and the contract docs
they point to (STYLE.md, SCHEMA.md, PLAYBOOK.md, EVAL.md) before writing code. Your final message is a report; follow the report format in your brief
exactly. Never print secrets. Write files atomically (temp file + mv) when a dev server may be
watching. Do not run `git commit`/`git push` unless the brief says so.
"""


@dataclass
class OpusResult:
    text: str
    session_id: str | None
    cost_usd: float
    num_turns: int
    is_error: bool
    log_file: Path
    report_file: Path
    duration_s: float


async def run_agent_async(prompt: str, cwd: str | Path, *, resume: str | None = None,
                          label: str = "opus", effort: str = EFFORT, model: str = MODEL,
                          max_budget_usd: float | None = None, add_dirs: list[str | Path] | None = None,
                          reviewer: bool = False, on_session=None) -> OpusResult:
    st = stamp()
    log_file = LOGS / f"{st}-{label}.opus.log"
    report_file = REPORTS / f"{st}-{label}.md"
    key = env("ANTHROPIC_API_KEY")
    assert key, "ANTHROPIC_API_KEY missing in .env"

    opts = ClaudeAgentOptions(
        model=model, effort=effort, cwd=str(cwd),
        permission_mode="bypassPermissions",
        allowed_tools=REVIEWER_TOOLS if reviewer else BUILDER_TOOLS,
        system_prompt={"type": "preset", "preset": "claude_code", "append": SYSTEM_APPEND},
        setting_sources=["project"],
        env={"ANTHROPIC_API_KEY": key, "CLAUDE_CODE_OAUTH_TOKEN": ""},
        max_budget_usd=max_budget_usd, resume=resume,
        add_dirs=[str(d) for d in (add_dirs or [])],
        max_buffer_size=64 * 1024 * 1024,  # agents Read PNG screenshots
    )
    final_text, session_id, cost, turns, is_error = "", resume, 0.0, 0, False
    t0 = time.time()
    with open(log_file, "w") as lf:
        async for msg in query(prompt=prompt, options=opts):
            if isinstance(msg, SystemMessage):
                sid = (msg.data or {}).get("session_id")
                if sid and not session_id:
                    session_id = sid
                    if on_session:
                        on_session(sid)
            elif isinstance(msg, AssistantMessage):
                for b in msg.content:
                    if isinstance(b, TextBlock):
                        final_text = b.text
                        lf.write(f"\n--- text ---\n{b.text}\n")
                    elif isinstance(b, ToolUseBlock):
                        lf.write(f"[tool] {b.name} {str(b.input)[:220]!s}\n".replace("\n", " ") + "\n")
            elif isinstance(msg, ResultMessage):
                session_id = msg.session_id or session_id
                cost = msg.total_cost_usd or 0.0
                turns = msg.num_turns or 0
                is_error = bool(msg.is_error)
                lf.write(f"\n=== result turns={turns} cost=${cost:.2f} error={is_error} ===\n")
            lf.flush()
    report_file.write_text(final_text)
    return OpusResult(text=final_text, session_id=session_id, cost_usd=cost, num_turns=turns,
                      is_error=is_error, log_file=log_file, report_file=report_file,
                      duration_s=time.time() - t0)


def run_agent(*a, **kw) -> OpusResult:
    return anyio.run(lambda: run_agent_async(*a, **kw))
