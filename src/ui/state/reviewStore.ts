"use client";

import { create } from "zustand";
import type {
  AgentName,
  Decision,
  DecisionAction,
  Finding,
  Precedent,
  ProgressEvent,
  ReviewRun,
  RunStatus,
  Severity,
} from "@/src/agent/types";
import type { RedlineOp } from "@/src/engine/types";
import { postDecisions } from "../lib/api";

export type FilterId = "all" | "critical" | "high" | "open" | "accepted";

export interface StageState {
  agent: AgentName;
  state: "start" | "end";
  label: string;
  durationMs?: number;
}

export interface WorkerChip {
  ruleId: string;
  ruleTitle: string;
  state: "queued" | "running" | "verifying" | "done" | "failed";
  note?: string;
  durationMs?: number;
  costUsd?: number;
  /** Wall-clock ms this chip has been in a non-terminal state — used for the live elapsed readout. */
  startedAt?: number;
}

export const boardOrder: AgentName[] = ["ingest", "planner", "drafter", "verifier", "assembler"];

/** A `ProgressEvent` as it arrives on the wire: the stream route prefixes a monotonic `seq`. */
export type SequencedProgressEvent = ProgressEvent & { seq?: number };

interface ReviewState {
  run: ReviewRun | null;
  loading: boolean;
  error: string | null;
  streamOpen: boolean;
  stages: Partial<Record<AgentName, StageState>>;
  workers: WorkerChip[];
  logs: string[];
  workerStats: Record<string, { costUsd: number; durationMs: number }>;
  precedents: Record<string, Precedent>;
  decisions: Record<string, Decision>;
  filter: FilterId;
  selectedId: string | null;
  hoveredId: string | null;
  expanded: string[];
  editing: string | null;
  /** Highest stream `seq` applied; frames at or below it are replays and are dropped. */
  lastSeq: number;
  /** Set once the docx has been produced by POST /api/runs/[id]/apply. */
  exported: boolean;
  persist: boolean;

  reset: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setRun: (run: ReviewRun, options?: { persist?: boolean }) => void;
  setStreamOpen: (open: boolean) => void;
  setPrecedents: (precedents: Precedent[]) => void;
  setWorkerStats: (stats: Record<string, { costUsd: number; durationMs: number }>) => void;
  applyEvent: (event: SequencedProgressEvent) => void;

  setFilter: (filter: FilterId) => void;
  select: (findingId: string | null) => void;
  hover: (findingId: string | null) => void;
  move: (delta: 1 | -1, visibleIds: string[]) => void;
  toggleExpanded: (findingId: string) => void;
  setEditing: (findingId: string | null) => void;
  decide: (findingId: string, action: DecisionAction, payload?: { ops?: RedlineOp[]; comment?: string; note?: string }) => void;
  clearDecision: (findingId: string) => void;
  acceptAll: (findingIds: string[]) => void;
  setExported: (exported: boolean) => void;
}

const emptyState = {
  run: null,
  loading: true,
  error: null,
  streamOpen: false,
  stages: {},
  workers: [],
  logs: [],
  workerStats: {},
  precedents: {},
  decisions: {},
  filter: "all" as FilterId,
  selectedId: null,
  hoveredId: null,
  expanded: [] as string[],
  editing: null,
  lastSeq: 0,
  exported: false,
  persist: false,
};

function decisionFor(
  findingId: string,
  action: DecisionAction,
  payload?: { ops?: RedlineOp[]; comment?: string; note?: string },
): Decision {
  return {
    findingId,
    action,
    ops: payload?.ops,
    comment: payload?.comment,
    note: payload?.note,
    at: new Date().toISOString(),
    by: "You",
  };
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  ...emptyState,

  reset: () => set({ ...emptyState }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),
  setStreamOpen: (streamOpen) => set({ streamOpen }),
  setPrecedents: (precedents) =>
    set({ precedents: Object.fromEntries(precedents.map((p) => [p.id, p])) }),
  setWorkerStats: (workerStats) => set((s) => ({ workerStats: { ...s.workerStats, ...workerStats } })),
  setExported: (exported) => set({ exported }),

  setRun: (run, options) =>
    set((s) => ({
      run,
      loading: false,
      error: null,
      persist: options?.persist ?? s.persist,
      decisions: Object.keys(s.decisions).length > 0 ? s.decisions : run.decisions,
      selectedId: s.selectedId ?? orderFindings(run.findings)[0]?.id ?? null,
      // `stats.perRule` is what a re-attached run has instead of live `worker` frames, so the cards
      // can still show cost and time.
      workerStats: {
        ...Object.fromEntries(
          Object.entries(run.stats.perRule ?? {}).map(([ruleId, entry]) => [
            ruleId,
            { costUsd: entry.costUsd, durationMs: entry.durationMs },
          ]),
        ),
        ...s.workerStats,
      },
    })),

  applyEvent: (event) =>
    set((s) => {
      // A backoff reconnect asks for `?after=<lastSeq>`, but a server that replays more than we
      // asked for must not duplicate log lines or re-apply a stale `stats` frame.
      if (typeof event.seq === "number" && event.seq <= s.lastSeq) return {};
      const seqPatch = typeof event.seq === "number" ? { lastSeq: event.seq } : {};
      switch (event.type) {
        case "status":
          return { ...seqPatch, run: s.run ? { ...s.run, status: event.status as RunStatus } : s.run };
        case "stage":
          return {
            ...seqPatch,
            stages: {
              ...s.stages,
              [event.agent]: { agent: event.agent, state: event.state, label: event.label, durationMs: event.durationMs },
            },
          };
        case "worker": {
          const next = [...s.workers];
          const index = next.findIndex((w) => w.ruleId === event.ruleId);
          const chip: WorkerChip = {
            ruleId: event.ruleId,
            ruleTitle: event.ruleTitle,
            state: event.state,
            note: event.note,
            durationMs: event.durationMs,
            costUsd: event.costUsd,
            startedAt: event.state === "running" ? Date.now() : next[index]?.startedAt,
          };
          if (index >= 0) next[index] = chip;
          else next.push(chip);
          const workerStats =
            event.costUsd !== undefined && event.durationMs !== undefined
              ? { ...s.workerStats, [event.ruleId]: { costUsd: event.costUsd, durationMs: event.durationMs } }
              : s.workerStats;
          return { ...seqPatch, workers: next, workerStats };
        }
        case "finding": {
          if (!s.run) return {};
          if (s.run.findings.some((f) => f.id === event.finding.id)) return seqPatch;
          const findings = [...s.run.findings, event.finding];
          return { ...seqPatch, run: { ...s.run, findings }, selectedId: s.selectedId ?? event.finding.id };
        }
        case "log": {
          const line = `${event.agent} · ${event.line}`;
          if (s.logs[s.logs.length - 1] === line) return seqPatch;
          return { ...seqPatch, logs: [...s.logs.filter((entry) => entry !== line), line].slice(-24) };
        }
        case "stats":
          return { ...seqPatch, run: s.run ? { ...s.run, stats: event.stats } : s.run };
        case "done":
          return {
            ...seqPatch,
            run: { ...event.run, findings: mergeFindings(s.run?.findings ?? [], event.run.findings) },
            loading: false,
          };
        case "error":
          return { ...seqPatch, error: event.message };
        default:
          return seqPatch;
      }
    }),

  setFilter: (filter) => set({ filter }),
  select: (selectedId) => set({ selectedId }),
  hover: (hoveredId) => set({ hoveredId }),

  move: (delta, visibleIds) =>
    set((s) => {
      if (visibleIds.length === 0) return {};
      const current = s.selectedId ? visibleIds.indexOf(s.selectedId) : -1;
      const next = Math.min(visibleIds.length - 1, Math.max(0, current + delta));
      return { selectedId: visibleIds[current === -1 ? 0 : next] };
    }),

  toggleExpanded: (findingId) =>
    set((s) => ({
      expanded: s.expanded.includes(findingId)
        ? s.expanded.filter((id) => id !== findingId)
        : [...s.expanded, findingId],
    })),

  setEditing: (editing) => set({ editing }),

  decide: (findingId, action, payload) => {
    const decision = decisionFor(findingId, action, payload);
    set((s) => ({ decisions: { ...s.decisions, [findingId]: decision } }));
    const { run, persist } = get();
    if (run && persist) void postDecisions(run.id, [decision]);
  },

  clearDecision: (findingId) =>
    set((s) => {
      const decisions = { ...s.decisions };
      delete decisions[findingId];
      return { decisions };
    }),

  acceptAll: (findingIds) => {
    const decisions = findingIds.map((id) => decisionFor(id, "accept"));
    set((s) => ({
      decisions: { ...s.decisions, ...Object.fromEntries(decisions.map((d) => [d.findingId, d])) },
    }));
    const { run, persist } = get();
    if (run && persist && decisions.length > 0) void postDecisions(run.id, decisions);
  },
}));

function mergeFindings(existing: Finding[], incoming: Finding[]): Finding[] {
  const byId = new Map(existing.map((f) => [f.id, f]));
  for (const finding of incoming) byId.set(finding.id, finding);
  return [...byId.values()];
}

const severityRank: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 };

/** Findings in review order: severity first, then document position. */
export function orderFindings(findings: Finding[]): Finding[] {
  return [...findings].sort((a, b) => {
    const bySeverity = severityRank[a.severity] - severityRank[b.severity];
    if (bySeverity !== 0) return bySeverity;
    return (a.paragraphIds[0] ?? "").localeCompare(b.paragraphIds[0] ?? "");
  });
}

export function filterFindings(
  findings: Finding[],
  filter: FilterId,
  decisions: Record<string, Decision>,
): Finding[] {
  switch (filter) {
    case "critical":
      return findings.filter((f) => f.severity === "critical");
    case "high":
      return findings.filter((f) => f.severity === "high");
    case "open":
      return findings.filter((f) => !decisions[f.id]);
    case "accepted":
      return findings.filter((f) => decisions[f.id]?.action === "accept" || decisions[f.id]?.action === "edit");
    default:
      return findings;
  }
}
