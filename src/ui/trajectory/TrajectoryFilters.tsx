"use client";

import { Search, X } from "lucide-react";
import type { AgentName, TrajectoryEvent, TrajectoryEventType } from "@/src/agent/types";
import { Kbd } from "../Kbd";
import { cn } from "../cn";
import { agentLabel, eventTypeLabel, filterActive, type TrajectoryFilter } from "../lib/trajectory";

const selectClass =
  "h-7 rounded-field border border-hairline-strong bg-sheet pr-6 pl-2 text-[12px] text-ink transition-colors duration-150 hover:border-navy";

/** Agent · rule · type · full-text, plus the count of what survived. */
export function TrajectoryFilters({
  events,
  filter,
  onChange,
  shown,
  total,
}: {
  events: TrajectoryEvent[];
  filter: TrajectoryFilter;
  onChange: (next: TrajectoryFilter) => void;
  shown: number;
  total: number;
}) {
  const agents = [...new Set(events.map((event) => event.agent))] as AgentName[];
  const rules = [...new Set(events.flatMap((event) => (event.ruleId ? [event.ruleId] : [])))];
  const types = [...new Set(events.map((event) => event.type))] as TrajectoryEventType[];

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-hairline bg-paper px-3 py-2">
      <label className="relative flex items-center">
        <Search size={12} strokeWidth={1.75} aria-hidden className="pointer-events-none absolute left-2 text-ink-faint" />
        <span className="sr-only">Search the log</span>
        <input
          type="search"
          value={filter.query}
          placeholder="Search titles and payloads"
          onChange={(event) => onChange({ ...filter, query: event.target.value })}
          className="h-7 w-[230px] rounded-field border border-hairline-strong bg-sheet pr-2 pl-7 text-[12px] text-ink placeholder:text-ink-faint hover:border-navy"
        />
      </label>

      <label className="flex items-center gap-1.5">
        <span className="label-caps">Agent</span>
        <select
          value={filter.agent}
          onChange={(event) => onChange({ ...filter, agent: event.target.value as AgentName | "all" })}
          className={selectClass}
        >
          <option value="all">All</option>
          {agents.map((agent) => (
            <option key={agent} value={agent}>
              {agentLabel[agent]}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-1.5">
        <span className="label-caps">Rule</span>
        <select
          value={filter.rule}
          onChange={(event) => onChange({ ...filter, rule: event.target.value })}
          className={selectClass}
        >
          <option value="all">All</option>
          {rules.map((rule) => (
            <option key={rule} value={rule}>
              {rule}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-1.5">
        <span className="label-caps">Type</span>
        <select
          value={filter.type}
          onChange={(event) => onChange({ ...filter, type: event.target.value as TrajectoryEventType | "all" })}
          className={selectClass}
        >
          <option value="all">All</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {eventTypeLabel[type]}
            </option>
          ))}
        </select>
      </label>

      {filterActive(filter) ? (
        <button
          type="button"
          onClick={() => onChange({ agent: "all", rule: "all", type: "all", query: "" })}
          className="inline-flex h-7 items-center gap-1 rounded-field border border-hairline-strong bg-sheet px-2 text-[12px] text-ink-muted transition-colors duration-150 hover:border-navy hover:text-ink"
        >
          <X size={11} strokeWidth={1.75} aria-hidden />
          Clear
        </button>
      ) : null}

      <p className={cn("mono ml-auto text-[11px]", shown === total ? "text-ink-faint" : "text-ink")}>
        {shown === total ? `${total} events` : `${shown} of ${total} events`}
      </p>
      {/* The keyboard hint is a nicety; below the three-pane width the filters get the room. */}
      <p className="hidden items-center gap-1 text-[11px] text-ink-faint wide:flex">
        <Kbd>J</Kbd>
        <Kbd>K</Kbd>
        <span>move</span>
        <Kbd>Enter</Kbd>
        <span>expand</span>
      </p>
    </div>
  );
}
