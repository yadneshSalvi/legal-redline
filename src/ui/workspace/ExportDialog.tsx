"use client";

import { useState } from "react";
import type { ReviewRun } from "@/src/agent/types";
import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { applyRun, outputDocxUrl } from "../lib/api";
import type { DecidedFinding } from "../lib/redline";

/** Confirms exactly what is about to be written into the copy — nothing else touches the document. */
export function ExportDialog({
  open,
  onOpenChange,
  run,
  decided,
  persist,
  onApplied,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  run: ReviewRun;
  decided: DecidedFinding[];
  persist: boolean;
  onApplied: () => void;
}) {
  const [state, setState] = useState<"idle" | "working" | "unavailable">("idle");

  const applying = decided.filter((d) => d.action === "accept" || d.action === "edit");
  const openCount = decided.filter((d) => d.action === "open").length;
  const replacements = applying.flatMap((d) => d.ops).filter((op) => op.kind === "replace").length;
  const insertions = applying.flatMap((d) => d.ops).filter((op) => op.kind === "insert_after").length;
  const deletions = applying.flatMap((d) => d.ops).filter((op) => op.kind === "delete_paragraph").length;
  const comments = applying.filter((d) => d.comment.length > 0).length;
  const replacedParagraphs = new Set(
    applying
      .flatMap((d) => d.ops)
      .filter((op) => op.kind === "replace")
      .map((op) => op.paragraphId),
  ).size;

  const rows = [
    {
      label: "Tracked replacements",
      value: `${replacements} across ${replacedParagraphs} paragraph${replacedParagraphs === 1 ? "" : "s"}`,
    },
    { label: "Paragraphs inserted", value: `${insertions}` },
    { label: "Paragraphs struck out", value: `${deletions}` },
    { label: "Margin comments", value: `${comments}` },
  ];

  const confirm = async () => {
    setState("working");
    const ok = persist ? await applyRun(run.id) : false;
    if (ok) {
      onApplied();
      onOpenChange(false);
      setState("idle");
      window.location.assign(outputDocxUrl(run.id));
      return;
    }
    setState("unavailable");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setState("idle");
      }}
      title="Write tracked changes"
      description={`A new copy of ${run.document.source.filename} — the original is never modified.`}
      width={540}
      footer={
        <>
          <Button variant="quiet" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => void confirm()} disabled={state === "working" || applying.length === 0}>
            {state === "working" ? "Writing…" : "Write tracked changes"}
          </Button>
        </>
      }
    >
      {applying.length === 0 ? (
        <p className="font-serif text-[13.5px] leading-[1.65] italic text-ink-muted">
          Nothing has been accepted yet. Accept or edit at least one finding — or use “Accept all verified” — and
          those redlines will be written into a copy of the document.
        </p>
      ) : (
        <p className="text-[13px] leading-[1.6] text-ink">
          {applying.length} finding{applying.length === 1 ? "" : "s"} will be written as real Word tracked changes,
          author <span className="mono">Playbook Redliner</span>, with a margin comment naming the playbook rule.
        </p>
      )}

      {applying.length > 0 ? (
        <dl className="mt-4 divide-y divide-hairline rounded-field border border-hairline">
          {rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4 px-3 py-2">
              <dt className="text-[12.5px] text-ink-muted">{row.label}</dt>
              <dd className="mono text-[12px] text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {openCount > 0 && applying.length > 0 ? (
        <p className="mt-3 rounded-field border-l-2 border-comment bg-comment-soft px-3 py-2 text-[12.5px] leading-[1.55] text-ink">
          {openCount} finding{openCount === 1 ? " is" : "s are"} still open and will not be written. Rejected findings
          leave the vendor’s wording untouched.
        </p>
      ) : null}

      {state === "unavailable" ? (
        <p role="status" className="mt-3 rounded-field border border-hairline bg-paper px-3 py-2 text-[12.5px] leading-[1.55] text-ink-muted">
          The apply service is not running in this environment, so nothing has been written. The engine produces the
          docx from exactly the operations listed above — see <span className="mono">pnpm review</span> for the
          command-line path.
        </p>
      ) : null}
    </Dialog>
  );
}
