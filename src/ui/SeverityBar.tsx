"use client";

import type { Severity } from "@/src/agent/types";
import { severityLabel } from "./SeverityPill";
import { cn } from "./cn";

const order: Severity[] = ["critical", "high", "medium", "low"];

const fill: Record<Severity, string> = {
  critical: "bg-deletion",
  high: "bg-comment",
  medium: "bg-medium",
  low: "bg-low",
};

/**
 * A findings-by-severity bar: one segment per severity, in severity order, so a row's risk profile
 * reads at a glance. Falls back to an empty track when a run found nothing.
 */
export function SeverityBar({
  bySeverity,
  width = 84,
  className,
}: {
  bySeverity: Record<Severity, number>;
  width?: number;
  className?: string;
}) {
  const total = order.reduce((sum, severity) => sum + bySeverity[severity], 0);
  const label = order.map((severity) => `${bySeverity[severity]} ${severityLabel(severity).toLowerCase()}`).join(", ");

  return (
    <span className={cn("flex items-center gap-2", className)} title={total === 0 ? "No findings" : label}>
      <span
        className="flex h-[7px] shrink-0 overflow-hidden rounded-full bg-hairline"
        style={{ width }}
        aria-hidden
      >
        {total > 0
          ? order.map((severity) =>
              bySeverity[severity] > 0 ? (
                <span
                  key={severity}
                  className={fill[severity]}
                  style={{ width: `${(bySeverity[severity] / total) * 100}%` }}
                />
              ) : null,
            )
          : null}
      </span>
      <span className="mono text-[11.5px] text-ink">{total}</span>
      <span className="sr-only">{total === 0 ? "No findings" : label}</span>
    </span>
  );
}
