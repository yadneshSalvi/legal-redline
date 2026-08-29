"use client";

import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";
import type { ReviewRun } from "@/src/agent/types";
import { Tag } from "../Chip";
import { CopyButton } from "../CopyButton";
import { prettyContractTitle } from "../lib/contractTitle";
import { durationLabel, tokenLabel, type TrajectoryTotals } from "../lib/trajectory";

/** The 48 px bar the workspace uses, with the trajectory's own actions. */
export function TrajectoryBar({
  runId,
  run,
  events,
  fixture,
  onCopy,
}: {
  runId: string;
  run: ReviewRun | null;
  events: number;
  fixture: boolean;
  onCopy: () => string;
}) {
  const title = run ? prettyContractTitle(run.document.title).title : runId;
  return (
    <div className="flex h-12 shrink-0 items-center gap-3 border-b border-hairline bg-paper px-4">
      <Link
        href="/runs"
        className="inline-flex items-center gap-1 rounded-field text-[12.5px] text-ink-muted transition-colors duration-150 hover:text-ink"
      >
        <ChevronLeft size={13} strokeWidth={1.75} aria-hidden />
        Runs
      </Link>
      <span aria-hidden className="h-4 w-px bg-hairline" />
      <h1 className="min-w-0 truncate font-serif text-[13.5px] font-semibold text-ink" title={title}>
        {title}
      </h1>
      <span className="mono shrink-0 text-[11px] text-ink-faint">trajectory · {events} events</span>
      {run ? <Tag tone="neutral">config {run.config}</Tag> : null}
      {fixture ? <Tag tone="comment">fixture</Tag> : null}
      <div className="ml-auto flex shrink-0 items-center gap-2">
        <CopyButton text={onCopy} label="Copy as JSONL" copiedLabel="Copied JSONL" />
        <Link
          href={`/review/${encodeURIComponent(runId)}`}
          className="inline-flex h-7 items-center gap-1.5 rounded-field border border-hairline-strong bg-sheet px-2.5 text-[12px] text-ink transition-colors duration-150 hover:border-navy hover:bg-navy-soft"
        >
          Open the review
          <ExternalLink size={11} strokeWidth={1.75} aria-hidden />
        </Link>
      </div>
    </div>
  );
}

/** Everything the log recorded about resources, so the cost of a run is never a mystery. */
export function UsageStrip({ totals }: { totals: TrajectoryTotals }) {
  const items: { term: string; value: string; hint?: string }[] = [
    { term: "Wall clock", value: durationLabel(totals.durationMs) },
    { term: "Model calls", value: `${totals.calls}` },
    { term: "Tool calls", value: `${totals.toolCalls}` },
    { term: "Retries", value: `${totals.retries}`, hint: "Tool rejections and verifier repair rounds" },
    { term: "Tokens in → out", value: `${tokenLabel(totals.inputTokens)} → ${tokenLabel(totals.outputTokens)}` },
    { term: "Cache reads", value: tokenLabel(totals.cachedTokens), hint: "Prompt-cache hits on the frozen prefix" },
    { term: "Cost", value: `$${totals.costUsd.toFixed(2)}` },
    { term: "Human checkpoints", value: `${totals.checkpoints + totals.decisions}` },
    { term: "Escalations", value: `${totals.errors}` },
  ];
  return (
    <dl className="flex shrink-0 flex-wrap items-baseline gap-x-8 gap-y-2 border-b border-hairline bg-sheet px-4 py-2.5">
      {items.map((item) => (
        <div key={item.term} title={item.hint}>
          <dt className="label-caps text-[11px]">{item.term}</dt>
          <dd className="mono mt-0.5 text-[12.5px] text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
