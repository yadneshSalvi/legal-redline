"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import type { Precedent } from "@/src/agent/types";
import { Button } from "../Button";
import { Tag } from "../Chip";
import { RedlineText } from "../RedlineText";
import { Tooltip } from "../Tooltip";
import { cn } from "../cn";
import { diffSegments } from "../lib/redline";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function approvedOn(value: string): string {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? dateFormat.format(new Date(parsed)) : value;
}

/**
 * One approved redline, rendered the way the reviewer approved it: a word-level diff from the
 * clause we were given to the clause we accepted, plus the comment that went into Word.
 */
export function PrecedentCard({
  precedent,
  usedInRuns,
  onDelete,
}: {
  precedent: Precedent;
  usedInRuns?: number;
  onDelete?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const seeded = precedent.tags.includes("seed");
  const deletion = precedent.clauseAfter.trim() === "";
  const segments = diffSegments(precedent.clauseBefore, precedent.clauseAfter);
  // Promoted precedents can carry several paragraphs; clip on a line boundary, never mid-glyph.
  const long = precedent.clauseBefore.length + precedent.clauseAfter.length > 300;

  return (
    <article className="flex flex-col rounded-card border border-hairline bg-sheet">
      <header className="flex items-start justify-between gap-3 border-b border-hairline px-3.5 py-2.5">
        <div className="min-w-0">
          <h3 className="font-serif text-[13.5px] leading-tight font-semibold text-ink">{precedent.title}</h3>
          <p className="mt-1 text-[11.5px] leading-[1.5] text-ink-muted">
            {precedent.source}
            <span className="text-ink-faint"> · approved by </span>
            {precedent.approvedBy}
            <span className="text-ink-faint"> · {approvedOn(precedent.approvedAt)}</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <Tag tone={precedent.level === "preferred" ? "navy" : "neutral"}>{precedent.level}</Tag>
        </div>
      </header>

      <div className="px-3.5 py-3">
        <p className="label-caps mb-1.5">
          {deletion ? "Clause deleted" : precedent.clauseBefore.trim() === "" ? "Clause added" : "Before → after"}
        </p>
        <p
          className={cn(
            "font-serif text-[12.5px] leading-[1.6] whitespace-pre-line text-ink",
            !expanded && long && "clamp-box [-webkit-line-clamp:6]",
          )}
        >
          <RedlineText segments={segments} />
        </p>
        {long ? (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((current) => !current)}
            className="mt-1 rounded-[4px] text-[11.5px] text-ink-muted underline decoration-hairline-strong underline-offset-[3px] hover:text-ink"
          >
            {expanded ? "Show less" : "Show the full clause"}
          </button>
        ) : null}

        <p className="label-caps mt-3 mb-1.5">Comment written into Word</p>
        <div className="rounded-field border border-comment/40 bg-comment-soft px-2.5 py-2">
          {/* -webkit-line-clamp ignores padding, so the clamp lives on an unpadded child. */}
          <p className="clamp-box text-[12px] leading-[1.55] text-ink [-webkit-line-clamp:3]">
            {precedent.comment}
          </p>
        </div>
      </div>

      <footer className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-hairline px-3.5 py-2">
        <span className="mono text-[11px] text-ink-faint">{precedent.ruleId}</span>
        {precedent.tags.map((tag) => (
          <span key={tag} className="mono text-[11px] text-ink-muted">
            #{tag}
          </span>
        ))}
        {precedent.runId ? (
          <span className="mono text-[11px] text-ink-faint" title={`Promoted from run ${precedent.runId}`}>
            run {precedent.runId.slice(0, 8)}
          </span>
        ) : null}
        <span className={cn("mono ml-auto text-[11px]", usedInRuns ? "text-ink" : "text-ink-faint")}>
          {usedInRuns ? `used in ${usedInRuns} ${usedInRuns === 1 ? "run" : "runs"}` : ""}
        </span>
        {onDelete ? (
          seeded ? (
            <Tooltip label="Seeded precedents are committed in data/precedents/seed.json — edit the file to change them.">
              <span>
                <Button variant="quiet" size="sm" disabled aria-label={`Delete ${precedent.title}`}>
                  <Trash2 size={12} strokeWidth={1.75} aria-hidden />
                  Delete
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Button
              variant="quiet"
              size="sm"
              onClick={onDelete}
              aria-label={`Delete ${precedent.title}`}
              className="hover:text-deletion"
            >
              <Trash2 size={12} strokeWidth={1.75} aria-hidden />
              Delete
            </Button>
          )
        ) : null}
      </footer>
    </article>
  );
}
