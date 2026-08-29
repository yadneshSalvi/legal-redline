"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  count?: number;
  children: ReactNode;
}

/** A filter chip / segmented toggle. Renders as a real button so it is focusable. */
export function Chip({ active = false, count, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[12px] transition-colors duration-150 ease-out",
        active
          ? "border-navy bg-navy text-sheet"
          : "border-hairline bg-sheet text-ink-muted hover:border-hairline-strong hover:text-ink",
        className,
      )}
      {...rest}
    >
      {children}
      {count !== undefined ? (
        <span className={cn("tnum text-[11px]", active ? "text-sheet/75" : "text-ink-muted")}>{count}</span>
      ) : null}
    </button>
  );
}

/** A non-interactive label chip (playbook name, config id, precedent source). */
export function Tag({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "navy" | "comment" | "verified";
  className?: string;
}) {
  const tones = {
    neutral: "border-hairline bg-paper text-ink-muted",
    navy: "border-navy/20 bg-navy-soft text-navy",
    comment: "border-comment/45 bg-comment-soft text-ink",
    verified: "border-verified/35 bg-sheet text-verified",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full border px-2 text-[11px] whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
