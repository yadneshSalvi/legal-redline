"use client";

import { Check, Minus, RotateCw, TriangleAlert } from "lucide-react";
import type { Verification } from "@/src/agent/types";
import { cn } from "./cn";

const badges = {
  pass: { label: "verified", className: "border-verified/40 bg-sheet text-verified", Icon: Check },
  repaired: { label: "repaired", className: "border-insertion/35 bg-insertion-soft text-insertion", Icon: RotateCw },
  fail: { label: "unverified", className: "border-deletion/35 bg-deletion-soft text-deletion", Icon: TriangleAlert },
  skipped: { label: "no redline", className: "border-hairline bg-paper text-low", Icon: Minus },
} as const;

export function VerifierBadge({
  verification,
  className,
}: {
  verification?: Verification;
  className?: string;
}) {
  const badge = badges[verification?.verdict ?? "skipped"];
  const { Icon } = badge;
  return (
    <span
      className={cn(
        "inline-flex h-[19px] shrink-0 items-center gap-1 rounded-full border px-1.5 text-[11px]",
        badge.className,
        className,
      )}
      title={verification?.notes}
    >
      <Icon size={10} strokeWidth={2.25} aria-hidden />
      {badge.label}
      {verification && verification.attempts > 1 ? (
        <span className="mono text-[10px] text-ink-muted">×{verification.attempts}</span>
      ) : null}
    </span>
  );
}
