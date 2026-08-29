import { cn } from "./cn";

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("rl-pulse rounded-field bg-paper", className)} />;
}

/** Skeleton lines that echo a paragraph of the paper. */
export function SkeletonLines({ lines = 4, className }: { lines?: number; className?: string }) {
  const widths = ["100%", "96%", "88%", "93%", "72%", "97%"];
  return (
    <div aria-hidden className={cn("space-y-2", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className="h-[9px] rounded-full bg-hairline"
          style={{ width: widths[i % widths.length], opacity: 1 - i * 0.08 }}
        />
      ))}
    </div>
  );
}
