"use client";

import { Check, TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AgentName } from "@/src/agent/types";
import { RESUMED_STAGE_LABEL } from "./state/board";
import { boardOrder, type StageState, type WorkerChip } from "./state/reviewStore";
import { cn } from "./cn";

const stageNames: Record<string, string> = {
  ingest: "Ingest",
  planner: "Planner",
  drafter: "Drafters",
  verifier: "Verifier",
  assembler: "Assembler",
};

const chipStyles: Record<WorkerChip["state"], string> = {
  queued: "border-hairline bg-paper text-ink-muted",
  running: "rl-pulse border-navy/30 text-ink",
  // A crisp navy ring, not a wash: distinct from the pulsing `running` state, and amber stays
  // reserved for comments and high severity (STYLE §1).
  verifying: "border-navy bg-sheet text-ink",
  done: "border-hairline bg-sheet text-ink-muted",
  failed: "border-deletion/25 bg-deletion-soft text-ink",
};

function useTicker(active: boolean): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [active]);
  return now;
}

/** One informative line per chip: the rule while it works, the result once it is done. */
function chipLine(chip: WorkerChip): string {
  if (chip.state === "queued") return "queued";
  if (chip.state === "running") return chip.ruleTitle;
  if (chip.state === "verifying") return "verifier reviewing the redline";
  return chip.note ?? chip.state;
}

function elapsedLabel(chip: WorkerChip, now: number): string {
  if (chip.durationMs !== undefined) return `${(chip.durationMs / 1000).toFixed(0)}s`;
  if (chip.state === "running" || chip.state === "verifying") {
    if (!chip.startedAt) return "";
    return `${((now - chip.startedAt) / 1000).toFixed(1)}s`;
  }
  return "";
}

function StageDot({ stage }: { stage?: StageState }) {
  if (!stage) return <span aria-hidden className="size-[7px] shrink-0 rounded-full border border-hairline-strong" />;
  if (stage.state === "end")
    return (
      <span aria-hidden className="grid size-[13px] shrink-0 place-items-center rounded-full bg-verified-soft text-verified">
        <Check size={9} strokeWidth={2.5} />
      </span>
    );
  return <span aria-hidden className="rl-pulse size-[13px] shrink-0 rounded-full border border-navy/40" />;
}

/**
 * The agent progress board (STYLE.md §3): planner → one chip per rule worker → verifier → assembler,
 * driven entirely by SSE `ProgressEvent`s. Findings appear in the pane below as they are verified.
 */
export function ProgressBoard({
  stages,
  workers,
  logs,
  resumed = false,
  rulesDone,
  rulesTotal,
}: {
  stages: Partial<Record<AgentName, StageState>>;
  workers: WorkerChip[];
  logs: string[];
  /** Rows were reconstructed from the persisted run: label unknown stages honestly. */
  resumed?: boolean;
  rulesDone: number;
  rulesTotal: number;
}) {
  const liveWorkers = workers.some((w) => w.state === "running" || w.state === "verifying");
  const now = useTicker(liveWorkers);
  const chipList = useRef<HTMLUListElement | null>(null);

  // Keep the wave that is currently working in view without hiding the rest of the pipeline.
  useEffect(() => {
    chipList.current?.querySelector<HTMLElement>('[data-state="running"]')?.scrollIntoView({
      block: "nearest",
    });
  }, [rulesDone]);

  return (
    <section aria-label="Agent progress" className="border-b border-hairline bg-sheet px-4 py-4">
      <h2 className="label-caps mb-3">Working</h2>
      <ol className="space-y-2.5">
        {boardOrder.map((agent) => {
          const stage = stages[agent];
          const isDrafters = agent === "drafter";
          return (
            <li key={agent}>
              <div className="flex items-baseline gap-2">
                <span className="flex w-[13px] items-center justify-center self-center">
                  <StageDot stage={stage} />
                </span>
                <span
                  className={cn(
                    "w-[74px] shrink-0 text-[12.5px]",
                    stage ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {stageNames[agent]}
                </span>
                <span className="min-w-0 flex-1 truncate text-[12px] text-ink-muted">
                  {isDrafters && stage?.state === "start" && workers.length > 0
                    ? `${rulesDone} of ${rulesTotal} rules finished`
                    : (stage?.label ?? (resumed ? RESUMED_STAGE_LABEL : "waiting"))}
                </span>
                {stage?.durationMs !== undefined ? (
                  <span className="mono shrink-0 text-[11px] text-ink-muted">
                    {(stage.durationMs / 1000).toFixed(0)}s
                  </span>
                ) : null}
              </div>

              {isDrafters && workers.length > 0 ? (
                <ul ref={chipList} className="pane mt-2 ml-[21px] max-h-[206px] space-y-1 pr-1">
                  {workers.map((chip) => (
                    <li
                      key={chip.ruleId}
                      data-state={chip.state}
                      className={cn(
                        "flex items-center gap-2 rounded-field border px-2 py-1",
                        chipStyles[chip.state],
                      )}
                    >
                      <span className="mono w-[76px] shrink-0 text-[10.5px] tracking-tight">{chip.ruleId}</span>
                      {chip.state === "failed" ? (
                        <TriangleAlert size={11} strokeWidth={2} className="shrink-0 text-deletion" aria-hidden />
                      ) : chip.state === "done" ? (
                        <Check size={11} strokeWidth={2.25} className="shrink-0 text-verified" aria-hidden />
                      ) : null}
                      <span className="min-w-0 flex-1 truncate text-[11.5px]">{chipLine(chip)}</span>
                      <span className="mono shrink-0 text-[10.5px] text-ink-muted">{elapsedLabel(chip, now)}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ol>

      {logs.length > 0 || resumed ? (
        <p className="mono mt-3 border-t border-hairline pt-2.5 text-[11px] leading-[1.6] text-ink-muted">
          {logs.length > 0
            ? logs[logs.length - 1]
            : "reattached to a run already in progress — stage detail resumes with the next event"}
        </p>
      ) : null}
    </section>
  );
}
