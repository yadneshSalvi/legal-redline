import type { ReactNode } from "react";
import { cn } from "./cn";

export function EmptyState({
  title,
  body,
  action,
  className,
}: {
  title: string;
  body: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-3 px-6 py-12 text-center", className)}>
      <div className="h-px w-10 bg-hairline-strong" />
      <p className="font-serif text-[15px] text-ink">{title}</p>
      <p className="max-w-[40ch] font-serif text-[13.5px] italic leading-[1.6] text-ink-muted">{body}</p>
      {action}
    </div>
  );
}
