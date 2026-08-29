"use client";

import { ExternalLink } from "lucide-react";
import { CopyButton } from "../CopyButton";
import { REPO_URL, repoFileUrl } from "../lib/repo";

const commands = [
  { line: `git clone ${REPO_URL} playbook-redliner && cd playbook-redliner`, note: "" },
  { line: "pnpm install --frozen-lockfile", note: "" },
  { line: "cp .env.example .env", note: "leave the keys empty — replay needs none" },
  { line: "pnpm eval --all", note: "replays evals/cache → evals/results/<config>.json" },
  { line: "pnpm report", note: "→ evals/results/summary.md + changelog-data.json" },
];

const SUMMARY_PATH = "evals/results/summary.md";

/**
 * The exact commands from REPRODUCE.md §1–§2. Every number on this page comes out of the committed
 * replay cache, so a judge reproduces it without an API key and at no cost (EVAL.md §6).
 */
export function ReproduceBlock() {
  const summaryUrl = repoFileUrl(SUMMARY_PATH);
  return (
    <div className="overflow-hidden rounded-card border border-hairline bg-sheet">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-2.5">
        <p className="text-[12.5px] text-ink-muted">
          Replay is deterministic and free: the model and judge calls are committed under{" "}
          <code className="mono rounded-[4px] bg-paper px-1 py-[1px] text-[11.5px] text-ink">evals/cache/</code>. Add{" "}
          <code className="mono rounded-[4px] bg-paper px-1 py-[1px] text-[11.5px] text-ink">--live</code> to re-run
          against the API.
        </p>
        <CopyButton text={commands.map((command) => command.line).join("\n")} label="Copy commands" />
      </div>
      <pre className="mono overflow-x-auto px-4 py-3.5 text-[12px] leading-[1.9] text-ink">
        <code>
          {commands.map((command) => (
            <span key={command.line} className="block whitespace-pre">
              <span className="mr-2 text-ink-faint select-none">$</span>
              {command.line}
              {command.note ? <span className="text-ink-faint">{`  # ${command.note}`}</span> : null}
            </span>
          ))}
        </code>
      </pre>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-hairline bg-paper px-4 py-2.5">
        <span className="text-[12px] text-ink-muted">Full tables, per contract and per finding:</span>
        {summaryUrl ? (
          <a
            href={summaryUrl}
            target="_blank"
            rel="noreferrer"
            className="mono inline-flex items-center gap-1 text-[11.5px] text-insertion underline decoration-hairline-strong underline-offset-[3px] hover:decoration-insertion"
          >
            {SUMMARY_PATH}
            <ExternalLink size={11} strokeWidth={1.75} aria-hidden />
          </a>
        ) : (
          <span className="mono text-[11.5px] text-ink-muted">{SUMMARY_PATH}</span>
        )}
        <span className="mono text-[11.5px] text-ink-faint">EVAL.md · IMPROVEMENT_CHANGELOG.md · REPRODUCE.md</span>
      </div>
    </div>
  );
}
