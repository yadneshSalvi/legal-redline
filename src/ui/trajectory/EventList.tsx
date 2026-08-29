"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { TrajectoryEvent } from "@/src/agent/types";
import { EmptyState } from "../EmptyState";
import { EVENT_ROW_HEIGHT, EventRow } from "./EventRow";
import { PayloadView } from "./PayloadView";

const OVERSCAN = 8;

/**
 * A windowed event list: only the rows near the viewport are mounted, with spacers standing in for
 * the rest, so a run with thousands of events scrolls at the same speed as one with ten. Exactly one
 * event is expanded at a time; its measured height is added to whichever spacer it sits behind.
 */
export function EventList({
  events,
  startedAt,
  selectedSeq,
  expandedSeq,
  onSelect,
  onToggle,
  scrollToSeq,
}: {
  events: TrajectoryEvent[];
  startedAt: string;
  selectedSeq: number | null;
  expandedSeq: number | null;
  onSelect: (seq: number) => void;
  onToggle: (seq: number) => void;
  /** Bumped by the parent when it wants a given seq brought into view. */
  scrollToSeq: { seq: number; nonce: number } | null;
}) {
  const container = useRef<HTMLDivElement | null>(null);
  const payload = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewport, setViewport] = useState(560);
  const [payloadHeight, setPayloadHeight] = useState(0);

  const expandedIndex = useMemo(
    () => (expandedSeq === null ? -1 : events.findIndex((event) => event.seq === expandedSeq)),
    [events, expandedSeq],
  );
  const extra = expandedIndex >= 0 ? payloadHeight : 0;

  const offsetOf = useCallback(
    (index: number): number => index * EVENT_ROW_HEIGHT + (expandedIndex >= 0 && index > expandedIndex ? extra : 0),
    [expandedIndex, extra],
  );

  const indexAt = useCallback(
    (y: number): number => {
      if (expandedIndex < 0) return Math.floor(y / EVENT_ROW_HEIGHT);
      const boundary = (expandedIndex + 1) * EVENT_ROW_HEIGHT + extra;
      if (y < boundary) return Math.min(expandedIndex, Math.floor(y / EVENT_ROW_HEIGHT));
      return Math.floor((y - extra) / EVENT_ROW_HEIGHT);
    },
    [expandedIndex, extra],
  );

  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const measure = () => setViewport(node.clientHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const node = payload.current;
    if (!node) {
      setPayloadHeight(0);
      return;
    }
    const measure = () => setPayloadHeight(node.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [expandedSeq]);

  useEffect(() => {
    if (!scrollToSeq || !container.current) return;
    const index = events.findIndex((event) => event.seq === scrollToSeq.seq);
    if (index < 0) return;
    container.current.scrollTo({ top: Math.max(0, offsetOf(index) - 120), behavior: "auto" });
  }, [scrollToSeq, events, offsetOf]);

  const total = events.length * EVENT_ROW_HEIGHT + extra;
  const start = Math.max(0, indexAt(scrollTop) - OVERSCAN);
  const end = Math.min(events.length, indexAt(scrollTop + viewport) + OVERSCAN + 1);
  const visible = events.slice(start, end);
  const topSpacer = start * EVENT_ROW_HEIGHT + (expandedIndex >= 0 && expandedIndex < start ? extra : 0);
  const bottomSpacer = Math.max(
    0,
    (events.length - end) * EVENT_ROW_HEIGHT + (expandedIndex >= end ? extra : 0),
  );

  if (events.length === 0) {
    return (
      <div className="pane min-h-0 flex-1">
        <EmptyState
          title="No events match those filters"
          body="Clear the agent, rule or type filter, or search for something else — the log itself is untouched."
        />
      </div>
    );
  }

  return (
    <div
      ref={container}
      className="pane min-h-0 flex-1"
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
    >
      <div style={{ minHeight: total }}>
        <div aria-hidden style={{ height: topSpacer }} />
        {visible.map((event) => (
          <div key={event.id}>
            <EventRow
              event={event}
              startedAt={startedAt}
              selected={event.seq === selectedSeq}
              expanded={event.seq === expandedSeq}
              onSelect={() => onSelect(event.seq)}
              onToggle={() => onToggle(event.seq)}
            />
            {event.seq === expandedSeq ? (
              <div ref={payload} className="rl-fade border-b border-hairline bg-paper px-4 py-3.5">
                <PayloadView event={event} />
              </div>
            ) : null}
          </div>
        ))}
        <div aria-hidden style={{ height: bottomSpacer }} />
      </div>
    </div>
  );
}
