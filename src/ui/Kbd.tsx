import type { ReactNode } from "react";
import { cn } from "./cn";

/** A keycap. Always paired with the action's own accessible name, never used alone as a label. */
export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "mono inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-[4px] border border-hairline-strong bg-paper px-1 text-[10px] leading-none text-ink-muted",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
