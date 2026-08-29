"use client";

import {
  ArrowUpRight,
  Check,
  CornerDownRight,
  Flag,
  MessageSquare,
  Play,
  RotateCw,
  ShieldCheck,
  TriangleAlert,
  UserCheck,
  Wrench,
} from "lucide-react";
import type { AgentName, TrajectoryEvent, TrajectoryEventType } from "@/src/agent/types";
import { cn } from "../cn";
import { eventTypeLabel, offsetLabel, tokenLabel } from "../lib/trajectory";

const icons: Record<TrajectoryEventType, typeof Check> = {
  run_start: Play,
  stage_start: Flag,
  stage_end: Check,
  llm_request: ArrowUpRight,
  llm_response: MessageSquare,
  tool_call: Wrench,
  tool_result: CornerDownRight,
  validation: ShieldCheck,
  retry: RotateCw,
  human_decision: UserCheck,
  checkpoint: Flag,
  error: TriangleAlert,
  run_end: Check,
};

const iconTone: Partial<Record<TrajectoryEventType, string>> = {
  error: "text-deletion",
  retry: "text-insertion",
  validation: "text-verified",
  human_decision: "text-navy",
  checkpoint: "text-comment",
};

const agentTone: Record<AgentName, string> = {
  ingest: "border-hairline text-ink-muted",
  planner: "border-navy/30 text-navy",
  drafter: "border-insertion/30 text-insertion",
  verifier: "border-verified/40 text-verified",
  assembler: "border-hairline-strong text-ink",
  memo: "border-comment/50 text-ink",
  baseline: "border-hairline text-ink-muted",
  monolith: "border-hairline text-ink-muted",
  judge: "border-hairline text-ink-muted",
  human: "border-navy/30 text-navy",
  apply: "border-verified/40 text-verified",
};

export const EVENT_ROW_HEIGHT = 34;

export function AgentChip({ agent, className }: { agent: AgentName; className?: string }) {
  return (
    <span
      className={cn(
        "mono inline-flex h-[17px] shrink-0 items-center rounded-full border bg-sheet px-1.5 text-[10px] leading-none",
        agentTone[agent],
        className,
      )}
    >
      {agent}
    </span>
  );
}

/** The right-hand column: what the event cost or how long it took, whichever it knows. */
function meta(event: TrajectoryEvent): string | null {
  if (event.usage) {
    const cost = event.usage.costUsd > 0 ? `$${event.usage.costUsd.toFixed(3)}` : null;
    const tokens = `${tokenLabel(event.usage.inputTokens)}→${tokenLabel(event.usage.outputTokens)}`;
    return cost ? `${tokens} · ${cost}` : tokens;
  }
  if (event.durationMs !== undefined) return `${(event.durationMs / 1000).toFixed(1)}s`;
  return null;
}

export function EventRow({
  event,
  startedAt,
  selected,
  expanded,
  onSelect,
  onToggle,
}: {
  event: TrajectoryEvent;
  startedAt: string;
  selected: boolean;
  expanded: boolean;
  onSelect: () => void;
  onToggle: () => void;
}) {
  const Icon = icons[event.type];
  return (
    <button
      type="button"
      data-seq={event.seq}
      aria-expanded={expanded}
      onClick={() => {
        onSelect();
        onToggle();
      }}
      style={{ height: EVENT_ROW_HEIGHT }}
      className={cn(
        "relative flex w-full items-center gap-2.5 border-b border-hairline px-3 text-left transition-colors duration-150",
        selected ? "bg-navy-soft" : "bg-sheet hover:bg-navy-soft/45",
      )}
    >
      {selected ? <span aria-hidden className="absolute inset-y-0 left-0 w-[2px] bg-navy" /> : null}
      <span className="mono w-[30px] shrink-0 text-right text-[10.5px] text-ink-faint">{event.seq}</span>
      <span className="mono w-[42px] shrink-0 text-right text-[10.5px] text-ink-faint">
        {offsetLabel(startedAt, event.t)}
      </span>
      <AgentChip agent={event.agent} className="w-[62px] justify-center" />
      <span title={eventTypeLabel[event.type]} className="shrink-0">
        <Icon
          size={12}
          strokeWidth={1.75}
          aria-hidden
          className={cn("shrink-0", iconTone[event.type] ?? "text-ink-faint")}
        />
        <span className="sr-only">{eventTypeLabel[event.type]}</span>
      </span>
      {event.ruleId ? (
        <span className="mono w-[86px] shrink-0 truncate text-[10.5px] text-ink-muted">{event.ruleId}</span>
      ) : (
        <span aria-hidden className="w-[86px] shrink-0" />
      )}
      <span className={cn("min-w-0 flex-1 truncate text-[12.5px]", event.type === "error" ? "text-deletion" : "text-ink")}>
        {event.title}
      </span>
      <span className="mono shrink-0 text-[10.5px] text-ink-faint">{meta(event)}</span>
    </button>
  );
}
