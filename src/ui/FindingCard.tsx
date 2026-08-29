"use client";

import Link from "next/link";
import { BookMarked, Check, ExternalLink, Undo2, X } from "lucide-react";
import type { Finding, Precedent } from "@/src/agent/types";
import type { DocumentModel } from "@/src/engine/types";
import { Button } from "./Button";
import { Kbd } from "./Kbd";
import { RedlineText } from "./RedlineText";
import { SeverityPill } from "./SeverityPill";
import { Tooltip } from "./Tooltip";
import { VerifierBadge } from "./VerifierBadge";
import { cn } from "./cn";
import { proposalPreview, type DecidedFinding } from "./lib/redline";
import { trajectoryHref } from "./lib/api";

const statusLabel: Record<Finding["status"], string> = {
  deviation: "Deviation",
  missing: "Missing clause",
  compliant: "Compliant",
  needs_review: "Escalated",
};

/** Real documents sometimes carry a whole sentence as a section reference. */
function clip(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;
}

/** "§ 9.2 Limitation of Liability" → "§ 9.2" for the one-line collapsed row. */
function shortRef(sectionRef: string | undefined, ruleId: string): string {
  if (!sectionRef) return ruleId;
  const match = /^§\s*[\d.]+/.exec(sectionRef);
  return match ? match[0] : ruleId;
}

function formatSeconds(ms?: number): string | null {
  if (ms === undefined) return null;
  return ms >= 60_000 ? `${Math.round(ms / 60_000)}m ${Math.round((ms % 60_000) / 1000)}s` : `${Math.round(ms / 1000)}s`;
}

export interface FindingCardProps {
  decided: DecidedFinding;
  document: DocumentModel;
  runId: string;
  selected: boolean;
  expanded: boolean;
  precedent?: Precedent;
  meta?: { costUsd: number; durationMs: number };
  onSelect: () => void;
  onHover: (hovered: boolean) => void;
  onToggle: () => void;
  onAccept: () => void;
  onReject: () => void;
  onEdit: () => void;
  onUndo: () => void;
}

export function FindingCard({
  decided,
  document: doc,
  runId,
  selected,
  expanded,
  precedent,
  meta,
  onSelect,
  onHover,
  onToggle,
  onAccept,
  onReject,
  onEdit,
  onUndo,
}: FindingCardProps) {
  const { finding, action, ops, comment } = decided;
  const decidedQuietly = (action === "accept" || action === "reject") && !expanded;
  const hasRedline = ops.length > 0;

  if (decidedQuietly) {
    return (
      // The cross-fade lives on the wrapper: an animation with `fill-mode: both` on the same element
      // permanently outranks the declarative `opacity-60` a rejected card needs (STYLE §4).
      <div className="rl-fade">
        <article
          data-finding={finding.id}
          data-decision={action}
          aria-current={selected ? "true" : undefined}
          tabIndex={selected ? 0 : -1}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          className={cn(
            "flex items-center gap-2 rounded-card border border-l bg-sheet px-3 py-2 transition-colors duration-200",
            selected ? "border-navy border-l-2" : "border-hairline",
            action === "reject" && "opacity-60",
          )}
        >
          <button
            type="button"
            onClick={onSelect}
            onDoubleClick={onToggle}
            className="flex min-w-0 flex-1 items-center gap-2 text-left"
          >
            {action === "accept" ? (
              <Check size={13} strokeWidth={2.25} className="shrink-0 text-verified" aria-hidden />
            ) : (
              <Undo2 size={13} strokeWidth={2} className="shrink-0 text-ink-faint" aria-hidden />
            )}
            <span
              className={cn(
                "truncate text-[13px]",
                action === "reject" ? "text-ink-muted line-through" : "text-ink",
              )}
            >
              {finding.ruleTitle}
            </span>
            <span className="mono ml-auto shrink-0 text-[11px] text-ink-muted">
              {shortRef(finding.sectionRef, finding.ruleId)}
            </span>
          </button>
          <Button variant="quiet" size="sm" onClick={onUndo} aria-label={`Undo decision on ${finding.ruleTitle}`}>
            Undo
          </Button>
        </article>
      </div>
    );
  }

  const preview = hasRedline ? proposalPreview(doc, ops, expanded ? 1600 : 240) : [];
  const costUsd = finding.costUsd ?? meta?.costUsd;
  const seconds = formatSeconds(finding.durationMs ?? meta?.durationMs);
  const costAndTime = costUsd !== undefined && seconds ? `$${costUsd.toFixed(2)} · ${seconds}` : "—";

  return (
    <article
      data-finding={finding.id}
      data-decision={action}
      aria-current={selected ? "true" : undefined}
      tabIndex={selected ? 0 : -1}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onSelect}
      className={cn(
        "rl-enter rounded-card border border-l bg-sheet transition-colors duration-200",
        selected ? "border-navy border-l-2 shadow-sheet" : "border-hairline",
      )}
    >
      <header className="flex items-start gap-2 px-3.5 pt-3">
        <SeverityPill severity={finding.severity} className="mt-[2px]" />
        <h3 className="min-w-0 flex-1 font-serif text-[14px] leading-snug font-semibold text-ink">
          {finding.ruleTitle}
        </h3>
        <VerifierBadge verification={finding.verification} className="mt-[1px]" />
      </header>

      <p className="mono px-3.5 pt-1.5 text-[11px] text-ink-muted" title={finding.sectionRef}>
        {clip(finding.sectionRef ?? finding.ruleId, 46)} · {statusLabel[finding.status]} · confidence{" "}
        {finding.confidence.toFixed(2)}
        {action === "edit" ? <span className="ml-1.5 text-insertion">· edited by you</span> : null}
      </p>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        aria-expanded={expanded}
        aria-label={`${expanded ? "Collapse" : "Expand"} the full details for ${finding.ruleTitle}`}
        className="mt-2 block w-full px-3.5 text-left"
      >
        <span className="label-caps">{finding.status === "missing" ? "Anchor" : "Clause"}</span>
        <span
          className={cn(
            "mt-1 block border-l border-hairline-strong pl-3 font-serif text-[13px] leading-[1.55] text-ink-muted",
            expanded ? "" : "line-clamp-2",
          )}
        >
          {finding.quote}
        </span>
      </button>

      <div className="px-3.5 pt-3">
        <p className="label-caps">Why</p>
        <p className={cn("mt-1 text-[12.5px] leading-[1.55] text-ink", expanded ? "" : "line-clamp-3")}>
          {finding.rationale}
        </p>
      </div>

      {hasRedline ? (
        <div className="px-3.5 pt-3">
          <div className="flex items-baseline justify-between gap-2">
            <p className="label-caps">Proposed redline</p>
            {decided.finding.proposal?.level === "fallback" ? (
              <span className="mono text-[10px] text-ink-muted">fallback position</span>
            ) : null}
          </div>
          <div className="mt-1 rounded-field border border-hairline bg-paper px-3 py-2">
            <p className={cn("font-serif text-[13px] leading-[1.6] whitespace-pre-line", expanded ? "" : "line-clamp-4")}>
              <RedlineText segments={preview} />
            </p>
          </div>
        </div>
      ) : null}

      {comment ? (
        <div className="px-3.5 pt-3">
          <p className="label-caps">Comment — goes into Word</p>
          <div className="mt-1 rounded-field border-l-2 border-comment bg-comment-soft px-3 py-2">
            <p className={cn("text-[12.5px] leading-[1.55] text-ink", expanded ? "" : "line-clamp-3")}>{comment}</p>
          </div>
        </div>
      ) : null}

      {precedent ? (
        <div className="px-3.5 pt-2.5">
          <Tooltip label={`Approved language: ${precedent.clauseAfter}`}>
            <button
              type="button"
              onClick={(event) => event.stopPropagation()}
              aria-label={`Precedent used: ${precedent.title}, from ${precedent.source}`}
              className="inline-flex h-6 max-w-full items-center gap-1.5 rounded-full border border-verified/40 bg-sheet px-2 text-[11px] text-verified transition-colors duration-150 hover:border-verified"
            >
              <BookMarked size={11} strokeWidth={1.75} aria-hidden />
              <span className="truncate">From precedent: {precedent.source}</span>
            </button>
          </Tooltip>
        </div>
      ) : null}

      {finding.verification?.verdict === "fail" && expanded ? (
        <div className="mx-3.5 mt-3 rounded-field border border-deletion/25 bg-deletion-soft px-3 py-2">
          <p className="label-caps text-deletion">Verifier held it back</p>
          <p className="mt-1 text-[12.5px] leading-[1.55] text-ink">{finding.verification.notes}</p>
          <ul className="mt-1.5 space-y-0.5">
            {finding.verification.checks
              .filter((check) => !check.ok)
              .map((check) => (
                <li key={check.name} className="mono flex items-baseline gap-1 text-[11px] text-deletion">
                  <X size={10} strokeWidth={2.5} aria-hidden className="translate-y-[1.5px]" />
                  <span>
                    {check.name}
                    {check.detail ? <span className="text-ink-muted"> — {check.detail}</span> : null}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      ) : null}

      <footer className="mt-3 border-t border-hairline px-3.5 py-2.5">
        <div className="flex items-center gap-1.5">
          <Button variant="accept" size="sm" onClick={onAccept}>
            {hasRedline ? "Accept" : "Agree"} <Kbd className="border-sheet/40 bg-sheet/15 text-sheet">A</Kbd>
          </Button>
          {hasRedline ? (
            <Button variant="secondary" size="sm" onClick={onEdit}>
              Edit <Kbd>E</Kbd>
            </Button>
          ) : null}
          <Button variant="reject" size="sm" onClick={onReject}>
            {hasRedline ? "Reject" : "Disagree"} <Kbd>R</Kbd>
          </Button>
        </div>
        <p className="mono mt-2 flex items-center gap-1.5 text-[11px] text-ink-muted">
          <span>{costAndTime}</span>
          <Link
            href={trajectoryHref(runId, finding.id)}
            onClick={(event) => event.stopPropagation()}
            className="ml-auto inline-flex items-center gap-0.5 text-insertion hover:underline"
          >
            trajectory
            <ExternalLink size={10} strokeWidth={1.75} aria-hidden />
          </Link>
        </p>
      </footer>
    </article>
  );
}
