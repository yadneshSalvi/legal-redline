"use client";

import type { Severity } from "@/src/agent/types";
import { cn } from "./cn";

const styles: Record<Severity, { pill: string; dot: string; label: string }> = {
  critical: { pill: "border-deletion/25 bg-deletion-soft text-deletion", dot: "bg-deletion", label: "Critical" },
  high: { pill: "border-comment/45 bg-comment-soft text-ink", dot: "bg-comment", label: "High" },
  medium: { pill: "border-medium/25 bg-navy-soft text-medium", dot: "bg-medium", label: "Medium" },
  low: { pill: "border-hairline bg-paper text-low", dot: "bg-low", label: "Low" },
};

export function severityLabel(severity: Severity): string {
  return styles[severity].label;
}

export function SeverityPill({ severity, className }: { severity: Severity; className?: string }) {
  const s = styles[severity];
  return (
    <span
      className={cn(
        "inline-flex h-[19px] items-center rounded-full border px-2 text-[10px] font-semibold tracking-[0.08em] uppercase",
        s.pill,
        className,
      )}
    >
      {s.label}
    </span>
  );
}

export function SeverityDot({
  severity,
  className,
  title,
}: {
  severity: Severity;
  className?: string;
  title?: string;
}) {
  return (
    <span
      aria-hidden={title ? undefined : true}
      title={title}
      className={cn("inline-block size-[6px] shrink-0 rounded-full", styles[severity].dot, className)}
    />
  );
}
