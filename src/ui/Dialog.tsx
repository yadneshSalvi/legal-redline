"use client";

import { Dialog as RadixDialog } from "radix-ui";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "./cn";

const overlay = "fixed inset-0 z-40 bg-ink/25 rl-fade";

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  width = 640,
  labelledBy,
  onOpenAutoFocus,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: number;
  labelledBy?: string;
  onOpenAutoFocus?: (event: Event) => void;
}) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={overlay} />
        <RadixDialog.Content
          aria-labelledby={labelledBy}
          onOpenAutoFocus={onOpenAutoFocus}
          className="rl-rise fixed top-1/2 left-1/2 z-50 flex max-h-[86vh] w-[calc(100vw-64px)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-card border border-hairline-strong bg-sheet shadow-overlay"
          style={{ maxWidth: width }}
        >
          <header className="flex items-start justify-between gap-4 border-b border-hairline px-5 py-3.5">
            <div className="min-w-0">
              <RadixDialog.Title className="font-serif text-[15px] leading-tight text-ink">
                {title}
              </RadixDialog.Title>
              {description ? (
                <RadixDialog.Description className="mt-1 text-[12px] text-ink-muted">
                  {description}
                </RadixDialog.Description>
              ) : null}
            </div>
            <RadixDialog.Close
              aria-label="Close dialog"
              className="-mt-0.5 -mr-1 grid size-7 shrink-0 place-items-center rounded-field text-ink-muted transition-colors duration-150 hover:bg-navy-soft hover:text-ink"
            >
              <X size={14} strokeWidth={1.75} aria-hidden />
            </RadixDialog.Close>
          </header>
          <div className="pane min-h-0 flex-1 px-5 py-4">{children}</div>
          {footer ? (
            <footer className="flex items-center justify-end gap-2 border-t border-hairline px-5 py-3">
              {footer}
            </footer>
          ) : null}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

/** A right-hand sheet. Same semantics as Dialog (Escape closes, focus trapped). */
export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  width = 560,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: number;
}) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={overlay} />
        <RadixDialog.Content
          className={cn(
            "rl-enter fixed top-0 right-0 z-50 flex h-full w-[calc(100vw-64px)] flex-col border-l border-hairline-strong bg-sheet shadow-overlay",
          )}
          style={{ maxWidth: width }}
        >
          <header className="flex items-start justify-between gap-4 border-b border-hairline px-5 py-3.5">
            <div className="min-w-0">
              <RadixDialog.Title className="font-serif text-[15px] leading-tight text-ink">
                {title}
              </RadixDialog.Title>
              {description ? (
                <RadixDialog.Description className="mt-1 text-[12px] text-ink-muted">
                  {description}
                </RadixDialog.Description>
              ) : null}
            </div>
            <RadixDialog.Close
              aria-label="Close panel"
              className="-mt-0.5 -mr-1 grid size-7 shrink-0 place-items-center rounded-field text-ink-muted transition-colors duration-150 hover:bg-navy-soft hover:text-ink"
            >
              <X size={14} strokeWidth={1.75} aria-hidden />
            </RadixDialog.Close>
          </header>
          <div className="pane min-h-0 flex-1 px-6 py-5">{children}</div>
          {footer ? (
            <footer className="flex items-center justify-end gap-2 border-t border-hairline px-5 py-3">
              {footer}
            </footer>
          ) : null}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
