"use client";

import { useRef } from "react";
import { useElementWidth } from "../lib/useElementWidth";

export type BarTone = "final" | "removed" | "quiet" | "baseline";

export interface Bar {
  id: string;
  /** Left-hand label — the config id, in mono. */
  label: string;
  /** Second line under the label, e.g. a token count. */
  sub?: string;
  value: number;
  display: string;
  tone: BarTone;
}

const fills: Record<BarTone, string> = {
  final: "var(--color-navy)",
  removed: "var(--color-deletion)",
  baseline: "var(--color-hairline-strong)",
  quiet: "var(--color-ink-faint)",
};

const ROW = 30;
const BAR = 10;
const LABEL_WIDTH = 116;
const VALUE_WIDTH = 54;
const AXIS = 22;

/**
 * A horizontal bar chart drawn as inline SVG — small enough that a charting library would add more
 * weight than it removes. Colour carries one meaning only (STYLE.md §1): navy is the shipped
 * pipeline, `deletion` the removed experiment, `ink.faint` everything else.
 */
export function BarChart({
  bars,
  max,
  ticks,
  reference,
  ariaLabel,
}: {
  bars: Bar[];
  max: number;
  /** Axis tick values in data units, with the label to print under each. */
  ticks: { value: number; label: string }[];
  /** A dashed vertical marker, e.g. the official baseline. */
  reference?: { value: number; label: string };
  ariaLabel: string;
}) {
  const box = useRef<HTMLDivElement | null>(null);
  const width = useElementWidth(box, 640);
  const plotLeft = LABEL_WIDTH;
  const plotWidth = Math.max(80, width - LABEL_WIDTH - VALUE_WIDTH);
  const height = bars.length * ROW + AXIS;
  const scale = (value: number) => (max <= 0 ? 0 : (Math.max(0, value) / max) * plotWidth);

  return (
    <div ref={box} className="w-full">
      <svg
        role="img"
        aria-label={ariaLabel}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ display: "block", maxWidth: "100%" }}
      >
        {ticks.map((tick) => (
          <g key={tick.label}>
            <line
              x1={plotLeft + scale(tick.value)}
              x2={plotLeft + scale(tick.value)}
              y1={0}
              y2={bars.length * ROW}
              stroke="var(--color-hairline)"
              strokeWidth={1}
            />
            <text
              x={plotLeft + scale(tick.value)}
              y={bars.length * ROW + 14}
              textAnchor={tick.value === 0 ? "start" : "middle"}
              fontFamily="var(--font-mono)"
              fill="var(--color-ink-faint)"
              fontSize={10}
            >
              {tick.label}
            </text>
          </g>
        ))}

        {reference ? (
          <g>
            <line
              x1={plotLeft + scale(reference.value)}
              x2={plotLeft + scale(reference.value)}
              y1={0}
              y2={bars.length * ROW}
              stroke="var(--color-hairline-strong)"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <text
              x={plotLeft + scale(reference.value) + 5}
              y={11}
              fontFamily="var(--font-mono)"
              fill="var(--color-ink-faint)"
              fontSize={10}
            >
              {reference.label}
            </text>
          </g>
        ) : null}

        {bars.map((bar, index) => {
          const y = index * ROW;
          const barWidth = scale(bar.value);
          return (
            <g key={bar.id}>
              <text
                x={0}
                y={y + (bar.sub ? ROW / 2 - 2 : ROW / 2 + 4)}
                fontFamily="var(--font-mono)"
                fill={bar.tone === "quiet" ? "var(--color-ink-muted)" : "var(--color-ink)"}
                fontSize={11}
              >
                {bar.label}
              </text>
              {bar.sub ? (
                <text x={0} y={y + ROW / 2 + 10} fontFamily="var(--font-mono)" fill="var(--color-ink-faint)" fontSize={10}>
                  {bar.sub}
                </text>
              ) : null}
              <rect
                x={plotLeft}
                y={y + (ROW - BAR) / 2}
                width={Math.max(1, barWidth)}
                height={BAR}
                rx={2}
                fill={fills[bar.tone]}
              />
              <text
                x={plotLeft + plotWidth + VALUE_WIDTH - 8}
                y={y + ROW / 2 + 4}
                textAnchor="end"
                fontFamily="var(--font-mono)"
                fill="var(--color-ink)"
                fontSize={11}
              >
                {bar.display}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
