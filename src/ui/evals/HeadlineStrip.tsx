"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "../cn";
import type { Headline } from "../lib/evals";

/**
 * Baseline versus shipped pipeline on the four numbers the changelog is judged on: the primary
 * metric first, then redline validity, citation hallucination and cost.
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
          <dt className="label-caps" title={item.hint}>
            {item.label}
          </dt>
          <dd className="mt-2">
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
              <span>b1-prompt {item.baseline}</span>
              <ArrowRight size={11} strokeWidth={1.75} aria-hidden />
              <span className="text-ink-muted">final {item.final}</span>
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
