"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReviewRun, RunStatus, Severity } from "@/src/agent/types";
import { Tag } from "./Chip";
import { EmptyState } from "./EmptyState";
import { SeverityDot } from "./SeverityPill";
import { Skeleton } from "./Skeleton";
import { cn } from "./cn";
import { sampleRunList } from "./fixtures/runs";
import { getRuns } from "./lib/api";
import { configShortLabel } from "./lib/configs";
import { prettyContractTitle } from "./lib/contractTitle";
import { defaultPlaybook } from "./fixtures/samples";

const severities: Severity[] = ["critical", "high", "medium", "low"];

const statusTone: Record<RunStatus, "neutral" | "navy" | "comment" | "verified"> = {
  queued: "neutral",
  running: "navy",
  awaiting_review: "comment",
  applied: "verified",
  failed: "neutral",
};

const statusLabel: Record<RunStatus, string> = {
  queued: "queued",
  running: "running",
  awaiting_review: "awaiting review",
  applied: "applied",
  failed: "failed",
};

/** Backend failures can carry absolute paths; the table shows the message, not the machine. */
function tidyError(message: string): string {
  const withoutPaths = message.replace(/(?:\/[\w.@+-]+){2,}/g, (match) => match.split("/").pop() ?? "");
  return withoutPaths.length > 110 ? `${withoutPaths.slice(0, 109).trimEnd()}…` : withoutPaths;
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
});

export function RunsTable() {
  const [runs, setRuns] = useState<ReviewRun[] | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const remote = await getRuns();
      if (cancelled) return;
      if (remote && remote.length > 0) {
        setRuns(remote);
        setLive(true);
      } else {
        setRuns(sampleRunList);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (runs === null) {
    return (
      <div className="space-y-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-11 w-full" />
        ))}
      </div>
    );
  }

  if (runs.length === 0) {
    return (
      <EmptyState
        title="No reviews yet"
        body="Upload a vendor contract or pick one of the sample agreements, and the run will appear here with its findings, cost and output."
      />
    );
  }

  const applied = runs.filter((run) => run.status === "applied").length;
  const spend = runs.reduce((total, run) => total + run.stats.usage.costUsd, 0);
  const findings = runs.reduce((total, run) => total + run.stats.findings, 0);

  return (
    <>
      <dl className="mb-4 flex flex-wrap gap-x-10 gap-y-3 border-y border-hairline py-3.5">
        {[
          { term: "Reviews", value: `${runs.length}` },
          { term: "Findings raised", value: `${findings}` },
          { term: "Documents written", value: `${applied}` },
          { term: "Model spend", value: `$${spend.toFixed(2)}` },
        ].map((item) => (
          <div key={item.term}>
            <dt className="label-caps">{item.term}</dt>
            <dd className="mono mt-1 text-[13px] text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
      <div className="overflow-hidden rounded-card border border-hairline bg-sheet">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-hairline bg-paper">
            {["Contract", "Playbook", "Config", "Status", "Findings", "Cost", "Reviewed"].map((head) => (
              <th key={head} className="label-caps px-3 py-2.5 whitespace-nowrap">
                {head}
                {head === "Findings" ? (
                  <span className="ml-1 normal-case tracking-normal text-ink-muted">
                    (critical · high · medium · low)
                  </span>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => (
            <tr key={run.id} className="border-b border-hairline last:border-b-0 hover:bg-navy-soft/60">
              <td className="px-3 py-2.5">
                <Link
                  href={`/review/${run.id}`}
                  className="group block max-w-[340px]"
                  title={run.document.title}
                >
                  <span className="block truncate font-serif text-[13.5px] font-semibold text-ink group-hover:underline">
                    {prettyContractTitle(run.document.title).title}
                  </span>
                  <span className="mono mt-0.5 block truncate text-[11px] text-ink-muted">
                    {run.document.source.filename} · {run.document.stats.words.toLocaleString("en-US")} words
                  </span>
                </Link>
              </td>
              <td className="px-3 py-2.5 text-[12.5px] text-ink-muted">
                {run.playbookId === defaultPlaybook.id ? `Vendor Services v${defaultPlaybook.version}` : run.playbookId}
              </td>
              <td className="px-3 py-2.5">
                <span className="mono text-[11.5px] text-ink-muted">{configShortLabel(run.config)}</span>
              </td>
              <td className="px-3 py-2.5">
                <Tag tone={statusTone[run.status]}>{statusLabel[run.status]}</Tag>
                {run.error ? (
                  <span className="mt-1 block max-w-[220px] truncate text-[11px] text-ink-muted">
                    {tidyError(run.error)}
                  </span>
                ) : null}
              </td>
              <td className="px-3 py-2.5">
                <span className="flex items-center gap-2.5">
                  {severities.map((severity) => (
                    <span key={severity} className="relative flex items-center gap-1">
                      <SeverityDot severity={severity} />
                      <span
                        className={cn(
                          "mono text-[11.5px]",
                          run.stats.bySeverity[severity] > 0 ? "text-ink" : "text-ink-muted",
                        )}
                      >
                        {run.stats.bySeverity[severity]}
                      </span>
                      <span className="sr-only">{severity} findings</span>
                    </span>
                  ))}
                </span>
              </td>
              <td className="mono px-3 py-2.5 text-[11.5px] text-ink">${run.stats.usage.costUsd.toFixed(2)}</td>
              <td className="mono px-3 py-2.5 text-[11.5px] whitespace-nowrap text-ink-muted">
                {dateFormat.format(new Date(run.createdAt))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        {!live ? (
          <p className="border-t border-hairline bg-paper px-3 py-2 text-[11.5px] text-ink-muted">
            Showing the committed example history — the run store is not connected in this environment.
          </p>
        ) : null}
      </div>
    </>
  );
}
