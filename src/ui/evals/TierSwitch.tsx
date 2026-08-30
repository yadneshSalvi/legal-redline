"use client";

import { useRef, type KeyboardEvent } from "react";
import { cn } from "../cn";
import { tierLabels, tierViews, type TierView } from "../lib/evals-round2";

/**
 * Short · Long · All, as a real radio group: arrows and Home/End move and select, the selection is
 * mirrored into `?tier=` and remembered, and a tier the report has no data for is disabled rather
 * than hidden so the reader can see it exists.
 */
export function TierSwitch({
  value,
  counts,
  onChange,
}: {
  value: TierView;
  counts: Record<TierView, number>;
  onChange: (next: TierView) => void;
}) {
  const buttons = useRef(new Map<TierView, HTMLButtonElement>());
  const enabled = tierViews.filter((view) => counts[view] > 0);

  function select(next: TierView | undefined): void {
    if (next === undefined) return;
    onChange(next);
    buttons.current.get(next)?.focus();
  }

  function step(from: TierView, delta: number): void {
    if (enabled.length === 0) return;
    const index = enabled.indexOf(from);
    select(enabled[(index + delta + enabled.length) % enabled.length]);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, view: TierView): void {
    const jump: Record<string, () => void> = {
      ArrowRight: () => step(view, 1),
      ArrowDown: () => step(view, 1),
      ArrowLeft: () => step(view, -1),
      ArrowUp: () => step(view, -1),
      Home: () => select(enabled[0]),
      End: () => select(enabled[enabled.length - 1]),
    };
    const handler = jump[event.key];
    if (!handler) return;
    event.preventDefault();
    handler();
  }

  return (
    <div
      role="radiogroup"
      aria-label="Contract tier"
      className="inline-flex items-center gap-0.5 rounded-full border border-hairline bg-sheet p-0.5"
    >
      {tierViews.map((view) => {
        const count = counts[view];
        const active = view === value;
        return (
          <button
            key={view}
            ref={(node) => {
              if (node) buttons.current.set(view, node);
              else buttons.current.delete(view);
            }}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${tierLabels[view]} tier, ${count} contract${count === 1 ? "" : "s"}`}
            disabled={count === 0}
            tabIndex={active ? 0 : -1}
            title={count === 0 ? `No ${tierLabels[view].toLowerCase()}-tier results in this report` : undefined}
            onClick={() => onChange(view)}
            onKeyDown={(event) => onKeyDown(event, view)}
            className={cn(
              "inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-[12.5px] transition-colors duration-150 ease-out",
              active ? "bg-navy text-sheet" : "text-ink-muted hover:text-ink",
              count === 0 && "cursor-not-allowed text-ink-faint hover:text-ink-faint",
            )}
          >
            <span>{tierLabels[view]}</span>
            <span aria-hidden className={cn("tnum text-[11px]", active ? "text-sheet/70" : "text-ink-faint")}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
