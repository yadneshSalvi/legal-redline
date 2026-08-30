"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "../cn";
import type { Headline } from "../lib/evals-headlines";

/**
 * Baseline versus the shipped pipeline on the four numbers the changelog is judged on. Each card
 * names the population it was measured over, because round 2's cards are not all the same tier.
 */
export function HeadlineStrip({ headlines }: { headlines: Headline[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {headlines.map((item) => (
        <div
          key={item.label}
          className={cn(
            "relative overflow-hidden rounded-card border bg-sheet px-4 py-3.5",
            item.primary ? "border-navy/25" : "border-hairline",
          )}
        >
          {item.primary ? <span aria-hidden className="absolute inset-y-0 left-0 w-[2px] bg-navy" /> : null}
          <dt className="label-caps truncate" title={item.hint}>
            {item.label}
          </dt>
          <p className="mono mt-1 text-[10.5px] whitespace-nowrap text-ink-faint">{item.scope}</p>
          <dd className="mt-1.5">
            <span className="flex items-baseline gap-2">
              <span className="mono text-[24px] leading-none text-ink">{item.final}</span>
              <span
                className={cn(
                  "mono rounded-full border px-1.5 py-[1px] text-[11px]",
                  item.improved ? "border-verified/35 text-verified" : "border-deletion/35 text-deletion",
                )}
              >
                {item.delta}
              </span>
            </span>
            <span className="mono mt-2 flex items-center gap-1.5 text-[11px] text-ink-faint">
              <span>
                {item.baselineId} {item.baseline}
              </span>
              <ArrowRight size={11} strokeWidth={1.75} aria-hidden />
              <span className="text-ink-muted">
                {item.finalId} {item.final}
              </span>
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
