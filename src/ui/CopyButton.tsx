"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, type ButtonProps } from "./Button";

/**
 * Copies text to the clipboard and says so for two seconds. No toast library (STYLE.md §6): the
 * button itself is the confirmation.
 */
export function CopyButton({
  text,
  label,
  copiedLabel = "Copied",
  variant = "secondary",
  size = "sm",
  className,
}: {
  text: string | (() => string);
  label: string;
  copiedLabel?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  }, []);

  const copy = useCallback(async () => {
    const value = typeof text === "function" ? text() : text;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return; // A blocked clipboard must not throw into the page.
    }
    setCopied(true);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <Button variant={variant} size={size} className={className} onClick={() => void copy()} aria-live="polite">
      {copied ? (
        <Check size={12} strokeWidth={2.25} className="text-verified" aria-hidden />
      ) : (
        <Copy size={12} strokeWidth={1.75} aria-hidden />
      )}
      {copied ? copiedLabel : label}
    </Button>
  );
}
