"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AgentName, ReviewRun, TrajectoryEvent } from "@/src/agent/types";
import { Button } from "../Button";
import { EmptyState } from "../EmptyState";
import { SkeletonLines } from "../Skeleton";
import { fixtureRun } from "../fixtures/sample-run";
import { fixtureTrajectory } from "../fixtures/trajectory";
import { getRun, getTrajectory } from "../lib/api";
import {
  emptyFilter,
  filterEvents,
  ruleSummaries,
  stageSummaries,
  toJsonl,
  trajectoryTotals,
  type TrajectoryFilter,
} from "../lib/trajectory";
import { EventList } from "./EventList";
import { StageRail } from "./StageRail";
import { TrajectoryFilters } from "./TrajectoryFilters";
import { TrajectoryBar, UsageStrip } from "./TrajectoryHeader";

interface Loaded {
  events: TrajectoryEvent[];
  run: ReviewRun | null;
  fixture: boolean;
}

/**
 * `/trajectories/[runId]` — every step the agents took, in the order the append-only sink recorded
 * them. Reads `GET /api/runs/[id]/trajectory` (paged with `?after=`) and falls back to the committed
 * example log for the fixture runs. `?finding=<id>` selects that finding's rule and jumps to its
 * first event, which is where the workspace's "trajectory ▸" link lands.
 */
export function TrajectoryViewer({ runId }: { runId: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const findingParam = params.get("finding");

  const [state, setState] = useState<Loaded | null>(null);
  const [filter, setFilter] = useState<TrajectoryFilter>(emptyFilter);
  const [selectedSeq, setSelectedSeq] = useState<number | null>(null);
  const [expandedSeq, setExpandedSeq] = useState<number | null>(null);
  const [scrollTarget, setScrollTarget] = useState<{ seq: number; nonce: number } | null>(null);
  const nonce = useRef(0);
  const deepLinked = useRef<string | null>(null);

  const jumpTo = useCallback((seq: number) => {
    nonce.current += 1;
    setScrollTarget({ seq, nonce: nonce.current });
  }, []);

  // The page mounts one viewer per run id (`key={runId}`), so loading is a one-shot subscription and
  // the deep link is resolved in the same continuation — no cascading state updates.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const [run, remote] = await Promise.all([getRun(runId), getTrajectory(runId)]);
      if (cancelled) return;
      const fallback = fixtureTrajectory(runId);
      const resolved = remote && remote.length > 0 ? remote : (fallback ?? []);
      setState({
        events: resolved,
        run: run ?? fixtureRun(runId),
        fixture: (!remote || remote.length === 0) && fallback !== null,
      });
      if (!findingParam || deepLinked.current === findingParam) return;
      deepLinked.current = findingParam;
      const first = resolved.find((event) => event.findingId === findingParam);
      if (!first) return;
      if (first.ruleId !== undefined) setFilter((current) => ({ ...current, rule: first.ruleId as string }));
      setSelectedSeq(first.seq);
      setExpandedSeq(first.seq);
      jumpTo(first.seq);
    })();
    return () => {
      cancelled = true;
    };
  }, [runId, findingParam, jumpTo]);

  const events = useMemo(() => state?.events ?? [], [state]);
  const totals = useMemo(() => trajectoryTotals(events), [events]);
  const stages = useMemo(() => stageSummaries(events), [events]);
  const rules = useMemo(() => ruleSummaries(events), [events]);
  const shown = useMemo(() => filterEvents(events, filter), [events, filter]);
  const startedAt = events[0]?.t ?? new Date(0).toISOString();

  const move = useCallback(
    (delta: number) => {
      if (shown.length === 0) return;
      const index = shown.findIndex((event) => event.seq === selectedSeq);
      const next = index < 0 ? 0 : Math.min(shown.length - 1, Math.max(0, index + delta));
      const target = shown[next];
      setSelectedSeq(target.seq);
      if (expandedSeq !== null) setExpandedSeq(target.seq);
      jumpTo(target.seq);
    },
    [shown, selectedSeq, expandedSeq, jumpTo],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable === true;
      if (typing || event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key.toLowerCase();
      if (key === "j" || key === "k") {
        event.preventDefault();
        move(key === "j" ? 1 : -1);
        return;
      }
      if (event.key === "Enter" && selectedSeq !== null) {
        event.preventDefault();
        setExpandedSeq((current) => (current === selectedSeq ? null : selectedSeq));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move, selectedSeq]);

  if (state === null) {
    return (
      <div className="workspace">
        <div className="h-12 shrink-0 border-b border-hairline bg-paper" />
        <div className="flex min-h-0 flex-1">
          <div className="w-[264px] shrink-0 border-r border-hairline bg-paper p-4">
            <SkeletonLines lines={8} />
          </div>
          <div className="flex-1 space-y-2 p-4">
            <SkeletonLines lines={12} />
          </div>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center bg-paper px-6 py-16">
        <div className="w-full max-w-[560px] rounded-card border border-hairline bg-sheet py-3 shadow-sheet">
          <EmptyState
            title="No trajectory was recorded for this run"
            body="Every step is written to the run's trajectory.jsonl while the pipeline works. Start a review from the landing page, or record one on the command line:"
            action={
              <div className="flex flex-col items-center gap-3.5">
                <code className="mono rounded-field border border-hairline bg-paper px-2.5 py-1.5 text-[11.5px] text-ink">
                  pnpm review data/contracts/synth-hardcase/contract.docx --config final
                </code>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => router.push("/runs")}>
                    All runs
                  </Button>
                  <Button variant="primary" onClick={() => router.push("/trajectories/sample")}>
                    Open the example trajectory
                  </Button>
                </div>
              </div>
            }
          />
        </div>
      </div>
    );
  }

  const setAgent = (agent: AgentName | "all") => {
    setFilter((current) => ({ ...current, agent, rule: agent === "drafter" ? current.rule : "all" }));
    const stage = stages.find((candidate) => candidate.agent === agent);
    if (stage?.firstSeq) jumpTo(stage.firstSeq);
  };

  const setRule = (rule: string | "all") => {
    setFilter((current) => ({ ...current, rule, agent: "all" }));
    const summary = rules.find((candidate) => candidate.ruleId === rule);
    if (summary) jumpTo(summary.firstSeq);
  };

  return (
    <div className="workspace">
      <TrajectoryBar
        runId={runId}
        run={state.run}
        events={events.length}
        fixture={state.fixture}
        onCopy={() => toJsonl(shown)}
      />
      <UsageStrip totals={totals} />
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className="flex w-full shrink-0 flex-col border-b border-hairline bg-paper lg:w-[264px] lg:border-b-0 lg:border-r">
          <StageRail
            stages={stages}
            rules={rules}
            activeAgent={filter.agent}
            activeRule={filter.rule}
            onStage={setAgent}
            onRule={setRule}
          />
        </aside>
        <div className="flex min-h-0 flex-1 flex-col bg-sheet">
          <TrajectoryFilters
            events={events}
            filter={filter}
            onChange={setFilter}
            shown={shown.length}
            total={events.length}
          />
          <EventList
            events={shown}
            startedAt={startedAt}
            selectedSeq={selectedSeq}
            expandedSeq={expandedSeq}
            onSelect={setSelectedSeq}
            onToggle={(seq) => setExpandedSeq((current) => (current === seq ? null : seq))}
            scrollToSeq={scrollTarget}
          />
        </div>
      </div>
    </div>
  );
}
