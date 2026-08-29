"use client";

import type { Segment } from "./lib/redline";
import { cn } from "./cn";

/**
 * Word's own conventions: deletions struck through in red, insertions underlined in blue
 * (STYLE.md §2). Rendered from a word-level diff, so only the words that changed are marked.
 */
export function RedlineText({
  segments,
  commentNumbers = [],
  className,
}: {
  segments: Segment[];
  commentNumbers?: number[];
  className?: string;
}) {
  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.type === "insert") {
          return (
            <ins key={index} className="text-insertion underline decoration-1 underline-offset-[3px]">
              {segment.text}
            </ins>
          );
        }
        if (segment.type === "delete") {
          return (
            <del key={index} className="text-deletion line-through decoration-[1.5px]">
              {segment.text}
            </del>
          );
        }
        return <span key={index}>{segment.text}</span>;
      })}
      {commentNumbers.map((number) => (
        <CommentPill key={number} number={number} />
      ))}
    </span>
  );
}

export function CommentPill({ number, className }: { number: number; className?: string }) {
  return (
    <span
      aria-label={`Margin comment ${number}`}
      className={cn(
        "mono ml-1 inline-flex h-[16px] min-w-[16px] translate-y-[-1px] items-center justify-center rounded-full border border-comment/50 bg-comment-soft px-[5px] text-[11px] leading-none text-ink align-middle",
        className,
      )}
    >
      {number}
    </span>
  );
}
