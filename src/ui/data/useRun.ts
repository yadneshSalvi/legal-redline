"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ProgressEvent } from "@/src/agent/types";
import { fixtureRun, sampleWorkerStats } from "../fixtures/sample-run";
import { samplePrecedents } from "../fixtures/sample-findings";
import { playSampleTimeline } from "../fixtures/simulate";
import { getPrecedents, getRun } from "../lib/api";
import { useReviewStore, type SequencedProgressEvent } from "../state/reviewStore";

const MAX_RECONNECTS = 6;

/**
 * Loads a run and, while it is still going, follows `/api/runs/[id]/stream` (SSE, `?after=<seq>` on
 * reconnect). When the route is not there yet — or the id is one of the built-in samples — it falls
 * back to the committed fixture, and `/review/sample-running` replays the fixture as a live stream.
 */
export function useRun(runId: string): { retry: () => void } {
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((a) => a + 1), []);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const store = useReviewStore.getState();
    store.reset();

    let cancelled = false;
    let source: EventSource | null = null;
    let reconnects = 0;
    let lastSeq = 0;

    const apply = (event: SequencedProgressEvent) => {
      if (cancelled) return;
      useReviewStore.getState().applyEvent(event);
      if (event.type === "done" || event.type === "error") closeStream();
    };

    const closeStream = () => {
      source?.close();
      source = null;
      useReviewStore.getState().setStreamOpen(false);
    };

    const openStream = () => {
      if (cancelled) return;
      const url = `/api/runs/${encodeURIComponent(runId)}/stream?after=${lastSeq}`;
      source = new EventSource(url);
      source.onopen = () => {
        reconnects = 0;
        useReviewStore.getState().setStreamOpen(true);
      };
      source.onmessage = (message) => {
        try {
          // The route writes `data: {seq, ...event}` and no `id:` line, so the cursor for
          // `?after=<seq>` has to come out of the payload (SCHEMA §6).
          const payload = JSON.parse(message.data) as ProgressEvent & { seq?: number };
          if (typeof payload.seq === "number" && payload.seq > lastSeq) lastSeq = payload.seq;
          apply(payload);
        } catch {
          /* a malformed frame must not take the workspace down */
        }
      };
      source.onerror = () => {
        closeStream();
        if (cancelled || reconnects >= MAX_RECONNECTS) return;
        const delay = Math.min(8000, 1000 * 2 ** reconnects);
        reconnects += 1;
        window.setTimeout(openStream, delay);
      };
    };

    const startFixture = () => {
      const run = fixtureRun(runId);
      if (!run) {
        useReviewStore.getState().setError("We could not find that review.");
        return;
      }
      const state = useReviewStore.getState();
      state.setRun(run, { persist: false });
      state.setPrecedents(samplePrecedents);
      if (run.status === "running") {
        cleanupRef.current = playSampleTimeline(apply);
      } else {
        state.setWorkerStats(sampleWorkerStats);
      }
    };

    void (async () => {
      const [run, precedents] = await Promise.all([getRun(runId), getPrecedents()]);
      if (cancelled) return;
      if (!run) {
        startFixture();
        return;
      }
      const state = useReviewStore.getState();
      state.setRun(run, { persist: true });
      if (precedents) state.setPrecedents(precedents);
      if (run.status === "queued" || run.status === "running") openStream();
    })();

    return () => {
      cancelled = true;
      closeStream();
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [runId, attempt]);

  return { retry };
}
