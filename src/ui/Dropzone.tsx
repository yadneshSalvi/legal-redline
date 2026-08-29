"use client";

import { FileText, Upload, X } from "lucide-react";
import { useCallback, useRef, useState, type DragEvent } from "react";
import { cn } from "./cn";

const ACCEPT = ".docx,.txt";

function isAllowed(file: File): boolean {
  return /\.(docx|txt)$/i.test(file.name);
}

export function Dropzone({
  file,
  onFile,
  disabled = false,
}: {
  file: File | null;
  onFile: (file: File | null) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [rejected, setRejected] = useState<string | null>(null);

  const accept = useCallback(
    (candidate: File | undefined) => {
      if (!candidate) return;
      if (!isAllowed(candidate)) {
        setRejected(`${candidate.name} is not a .docx or .txt file.`);
        return;
      }
      setRejected(null);
      onFile(candidate);
    },
    [onFile],
  );

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (disabled) return;
    accept(event.dataTransfer.files[0]);
  };

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-card border border-hairline-strong bg-paper px-4 py-3.5">
        <FileText size={17} strokeWidth={1.5} className="shrink-0 text-navy" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] text-ink">{file.name}</p>
          <p className="mono mt-0.5 text-[11px] text-ink-muted">
            {(file.size / 1024).toFixed(0)} KB · ready to review
          </p>
        </div>
        <button
          type="button"
          onClick={() => onFile(null)}
          className="grid size-7 place-items-center rounded-field text-ink-muted transition-colors duration-150 hover:bg-sheet hover:text-ink"
          aria-label={`Remove ${file.name}`}
        >
          <X size={14} strokeWidth={1.75} aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload a contract — drop a .docx or .txt file, or press Enter to choose one"
        aria-disabled={disabled || undefined}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (!disabled) inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex cursor-default flex-col items-center gap-2 rounded-card border border-dashed px-6 py-9 text-center transition-colors duration-150",
          dragging ? "border-navy bg-navy-soft" : "border-hairline-strong bg-paper hover:border-navy",
          disabled && "opacity-50",
        )}
      >
        <Upload size={18} strokeWidth={1.5} className="text-navy" aria-hidden />
        <p className="text-[14px] text-ink">
          Drop the vendor’s <span className="mono">.docx</span> here, or click to choose a file
        </p>
        <p className="text-[12.5px] text-ink-muted">
          Nothing is written into your document until you approve each finding.
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={(event) => accept(event.target.files?.[0])}
      />
      {rejected ? (
        <p role="status" className="mt-2 text-[12.5px] text-deletion">
          {rejected}
        </p>
      ) : null}
    </div>
  );
}
