/**
 * Derivations over a run's `TrajectoryEvent[]` (SCHEMA.md §7): the stage rail, the per-rule drafter
 * groups, the recorded totals, filtering and JSONL export. Everything the viewer shows is computed
 * from the log itself, so a real trajectory and the committed fixture render identically.
 */
import type { AgentName, TrajectoryEvent, TrajectoryEventType } from "@/src/agent/types";

/** Pipeline order (STYLE.md §3): ingest → planner → drafters → verifier → assembler → memo → you. */
export const stageOrder: AgentName[] = [
  "ingest",
  "planner",
  "drafter",
  "verifier",
  "assembler",
  "memo",
  "human",
  "apply",
];

export const agentLabel: Record<AgentName, string> = {
  ingest: "Ingest",
  planner: "Planner",
  drafter: "Drafters",
  verifier: "Verifier",
  assembler: "Assembler",
  memo: "Memo",
  baseline: "Baseline",
  monolith: "Monolith",
  judge: "Judge",
  human: "Your review",
  apply: "Tracked changes",
};

export const eventTypeLabel: Record<TrajectoryEventType, string> = {
  run_start: "Run start",
  stage_start: "Stage start",
  stage_end: "Stage end",
  llm_request: "Model request",
  llm_response: "Model response",
  tool_call: "Tool call",
  tool_result: "Tool result",
  validation: "Validation",
  retry: "Retry",
  human_decision: "Your decision",
  checkpoint: "Checkpoint",
  error: "Error",
  run_end: "Run end",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function payloadString(event: TrajectoryEvent, key: string): string | null {
  if (!isRecord(event.payload)) return null;
  const value = event.payload[key];
  return typeof value === "string" ? value : null;
}

export interface StageSummary {
  agent: AgentName;
  label: string;
  events: number;
  calls: number;
  toolCalls: number;
  costUsd: number;
  durationMs: number;
  firstSeq: number | null;
}

function spanMs(events: readonly TrajectoryEvent[]): number {
  if (events.length === 0) return 0;
  const first = Date.parse(events[0].t);
  const last = Date.parse(events[events.length - 1].t);
  return Number.isFinite(first) && Number.isFinite(last) ? Math.max(0, last - first) : 0;
}

/** One row per pipeline stage, in pipeline order; stages with no events are kept as "pending". */
export function stageSummaries(events: readonly TrajectoryEvent[]): StageSummary[] {
  return stageOrder.map((agent) => {
    const own = events.filter((event) => event.agent === agent);
    // Only the stage's own closing event counts; a worker's stage_end describes one rule, not the stage.
    const declared = own
      .filter((event) => event.type === "stage_end" && event.durationMs !== undefined && event.ruleId === undefined)
      .pop();
    return {
      agent,
      label: agentLabel[agent],
      events: own.length,
      calls: own.filter((event) => event.type === "llm_response").length,
      toolCalls: own.filter((event) => event.type === "tool_call").length,
      costUsd: own.reduce((total, event) => total + (event.usage?.costUsd ?? 0), 0),
      durationMs: declared?.durationMs ?? spanMs(own),
      firstSeq: own[0]?.seq ?? null,
    };
  });
}

export type RuleVerdict = "pass" | "repaired" | "fail" | "clear";

export interface RuleSummary {
  ruleId: string;
  events: number;
  costUsd: number;
  durationMs: number;
  retries: number;
  verdict: RuleVerdict;
  firstSeq: number;
  /** The worker's own one-line result, from its closing event. */
  note: string | null;
  findingId: string | null;
}

/** The drafter stage grouped by rule: what each worker did, what it cost, how it ended. */
export function ruleSummaries(events: readonly TrajectoryEvent[]): RuleSummary[] {
  const byRule = new Map<string, TrajectoryEvent[]>();
  for (const event of events) {
    if (!event.ruleId) continue;
    byRule.set(event.ruleId, [...(byRule.get(event.ruleId) ?? []), event]);
  }
  return [...byRule.entries()]
    .map(([ruleId, own]) => {
      const retries = own.filter((event) => event.type === "retry").length;
      const failed = own.some((event) => event.type === "error");
      const verified = own.filter((event) => event.agent === "verifier" && event.type === "validation");
      const proposed = own.some((event) => event.findingId !== undefined);
      const lastVerdict = payloadString(verified[verified.length - 1] ?? own[own.length - 1], "verdict");
      const verdict: RuleVerdict = failed || lastVerdict === "fail"
        ? "fail"
        : !proposed
          ? "clear"
          : lastVerdict === "repaired" || retries > 0
            ? "repaired"
            : "pass";
      const closing = [...own].reverse().find((event) => event.type === "stage_end");
      return {
        ruleId,
        events: own.length,
        costUsd: own.reduce((total, event) => total + (event.usage?.costUsd ?? 0), 0),
        durationMs: closing?.durationMs ?? spanMs(own),
        retries,
        verdict,
        firstSeq: own[0].seq,
        note: closing ? payloadString(closing, "note") : null,
        findingId: own.find((event) => event.findingId)?.findingId ?? null,
      };
    })
    .sort((left, right) => left.firstSeq - right.firstSeq);
}

export interface TrajectoryTotals {
  events: number;
  calls: number;
  toolCalls: number;
  retries: number;
  errors: number;
  checkpoints: number;
  decisions: number;
  inputTokens: number;
  outputTokens: number;
  cachedTokens: number;
  costUsd: number;
  durationMs: number;
}

export function trajectoryTotals(events: readonly TrajectoryEvent[]): TrajectoryTotals {
  const count = (type: TrajectoryEventType): number => events.filter((event) => event.type === type).length;
  const sum = (select: (event: TrajectoryEvent) => number): number =>
    events.reduce((total, event) => total + select(event), 0);
  return {
    events: events.length,
    calls: count("llm_response"),
    toolCalls: count("tool_call"),
    retries: count("retry"),
    errors: count("error"),
    checkpoints: count("checkpoint"),
    decisions: count("human_decision"),
    inputTokens: sum((event) => event.usage?.inputTokens ?? 0),
    outputTokens: sum((event) => event.usage?.outputTokens ?? 0),
    cachedTokens: sum((event) => event.usage?.cacheReadTokens ?? 0),
    costUsd: sum((event) => event.usage?.costUsd ?? 0),
    durationMs: spanMs(events),
  };
}

/** `+1:24` — time since the first event, the way a trace is read. */
export function offsetLabel(startedAt: string, at: string): string {
  const ms = Math.max(0, Date.parse(at) - Date.parse(startedAt));
  if (!Number.isFinite(ms)) return "";
  const seconds = Math.floor(ms / 1000);
  return `+${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export interface TrajectoryFilter {
  agent: AgentName | "all";
  rule: string | "all";
  type: TrajectoryEventType | "all";
  query: string;
}

export const emptyFilter: TrajectoryFilter = { agent: "all", rule: "all", type: "all", query: "" };

export function filterActive(filter: TrajectoryFilter): boolean {
  return filter.agent !== "all" || filter.rule !== "all" || filter.type !== "all" || filter.query.trim() !== "";
}

export function filterEvents(
  events: readonly TrajectoryEvent[],
  filter: TrajectoryFilter,
): TrajectoryEvent[] {
  const query = filter.query.trim().toLocaleLowerCase("en-US");
  return events.filter((event) => {
    if (filter.agent !== "all" && event.agent !== filter.agent) return false;
    if (filter.rule !== "all" && event.ruleId !== filter.rule) return false;
    if (filter.type !== "all" && event.type !== filter.type) return false;
    if (query === "") return true;
    if (event.title.toLocaleLowerCase("en-US").includes(query)) return true;
    if (event.ruleId?.toLocaleLowerCase("en-US").includes(query) === true) return true;
    try {
      return JSON.stringify(event.payload ?? "").toLocaleLowerCase("en-US").includes(query);
    } catch {
      return false;
    }
  });
}

/** Exactly what `runs/<runId>/trajectory.jsonl` holds: one event per line, in order. */
export function toJsonl(events: readonly TrajectoryEvent[]): string {
  return events.map((event) => JSON.stringify(event)).join("\n");
}

export function tokenLabel(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}k`;
  return `${value}`;
}

export function durationLabel(ms: number): string {
  if (ms <= 0) return "—";
  if (ms < 1000) return `${ms} ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)} s`;
  return `${Math.floor(ms / 60_000)}m ${String(Math.round((ms % 60_000) / 1000)).padStart(2, "0")}s`;
}
