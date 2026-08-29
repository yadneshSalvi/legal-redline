"use client";

import Link from "next/link";
import { Popover } from "radix-ui";
import { ChevronLeft, Download, FileText, ListTree, MessageSquareQuote } from "lucide-react";
import type { ReactNode } from "react";
import type { ReviewRun } from "@/src/agent/types";
import { Button } from "../Button";
import { Tag } from "../Chip";
import { cn } from "../cn";
import { configShortLabel } from "../lib/configs";

function ProgressRing({ value }: { value: number }) {
  const radius = 6.5;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden focusable="false">
      <circle cx="8" cy="8" r={radius} fill="none" stroke="var(--color-hairline-strong)" strokeWidth="2" />
      <circle
        cx="8"
        cy="8"
        r={radius}
        fill="none"
        stroke="var(--color-navy)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - Math.min(1, Math.max(0, value)))}
        transform="rotate(-90 8 8)"
        style={{ transition: "stroke-dashoffset 200ms var(--ease-out-quiet)" }}
      />
    </svg>
  );
}

const statusCopy: Record<ReviewRun["status"], string> = {
  queued: "queued",
  running: "reviewing",
  awaiting_review: "awaiting your review",
  applied: "tracked changes written",
  failed: "run failed",
};

export function DocBar({
  run,
  playbookName,
  progress,
  outline,
  persisted,
  onMemo,
  onExport,
}: {
  run: ReviewRun;
  playbookName: string;
  progress: { done: number; total: number } | null;
  outline: ReactNode;
  /** False for the packaged demo runs, which have no store behind them. */
  persisted: boolean;
  onMemo: () => void;
  onExport: () => void;
}) {
  const cost = run.stats.usage.costUsd;
  return (
    <div className="flex h-12 shrink-0 items-center gap-2 overflow-hidden border-b border-hairline bg-paper px-3">
      <Link
        href="/runs"
        className="inline-flex h-7 items-center gap-1 rounded-field px-1.5 text-[12.5px] text-ink-muted transition-colors duration-150 hover:bg-sheet hover:text-ink"
      >
        <ChevronLeft size={14} strokeWidth={1.75} aria-hidden />
        Runs
      </Link>

      <Popover.Root>
        <Popover.Trigger
          aria-label="Document outline"
          className="inline-flex h-7 items-center gap-1.5 rounded-field border border-hairline-strong bg-sheet px-2 text-[12.5px] text-ink-muted transition-colors duration-150 hover:border-navy hover:text-ink wide:hidden"
        >
          <ListTree size={13} strokeWidth={1.75} aria-hidden />
          Outline
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={6}
            className="rl-rise z-50 flex max-h-[min(560px,calc(100dvh-120px))] w-[300px] flex-col overflow-hidden rounded-card border border-hairline-strong bg-sheet shadow-overlay"
          >
            {outline}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      <div className="mx-1 h-5 w-px bg-hairline" aria-hidden />

      <FileText size={14} strokeWidth={1.5} className="shrink-0 text-ink-faint" aria-hidden />
      <p className="mono min-w-[80px] truncate text-[12px] text-ink" title={run.document.source.filename}>
        {run.document.source.filename}
      </p>

      <Tag tone="navy" className="hidden shrink-0 lg:inline-flex">
        {playbookName}
      </Tag>
      <Tag className="hidden shrink-0 wide:inline-flex">
        config <span className="mono">{configShortLabel(run.config)}</span>
      </Tag>
      {persisted ? null : (
        <span className="hidden shrink-0 text-[12px] whitespace-nowrap text-ink-muted lg:inline">
          prepared example — decisions are not saved
        </span>
      )}

      <div className="flex shrink-0 items-center gap-3 pl-1">
        <span className="flex items-center gap-1.5 whitespace-nowrap text-[12px] text-ink-muted">
          {progress ? <ProgressRing value={progress.total === 0 ? 0 : progress.done / progress.total} /> : null}
          <span className={cn(run.status === "failed" && "text-deletion")}>
            {progress ? `${progress.done} of ${progress.total} rules · ` : ""}
            {statusCopy[run.status]}
          </span>
        </span>
        <span className="mono shrink-0 text-[12px] text-ink-muted" title="Model spend for this run">
          · ${cost.toFixed(2)}
        </span>
        <Button variant="secondary" size="sm" onClick={onMemo}>
          <MessageSquareQuote size={13} strokeWidth={1.75} aria-hidden />
          Memo
        </Button>
        <Button variant="secondary" size="sm" onClick={onExport}>
          <Download size={13} strokeWidth={1.75} aria-hidden />
          Export .docx
        </Button>
      </div>
    </div>
  );
}
