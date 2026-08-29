"use client";

import { Check, Download } from "lucide-react";
import { useState, type RefObject } from "react";
import type { DocumentModel } from "@/src/engine/types";
import { Button } from "../Button";
import { Chip } from "../Chip";
import { Dialog } from "../Dialog";
import { EmptyState } from "../EmptyState";
import { FindingCard } from "../FindingCard";
import { ProgressBoard } from "../ProgressBoard";
import { SkeletonLines } from "../Skeleton";
import { useBoard } from "../state/board";
import { useReviewStore, type FilterId } from "../state/reviewStore";
import { useCounts, useDecided, useVisible } from "../state/useDecided";
import { outputDocxUrl } from "../lib/api";

const chipOrder: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "critical", label: "Critical" },
  { id: "high", label: "High" },
  { id: "open", label: "Open" },
  { id: "accepted", label: "Accepted" },
];

export function FindingsPane({
  document: doc,
  filterRef,
  listRef,
  onEdit,
  onExport,
}: {
  document: DocumentModel;
  filterRef: RefObject<HTMLDivElement | null>;
  listRef: RefObject<HTMLDivElement | null>;
  onEdit: (findingId: string) => void;
  onExport: () => void;
}) {
  const run = useReviewStore((s) => s.run);
  const filter = useReviewStore((s) => s.filter);
  const selectedId = useReviewStore((s) => s.selectedId);
  const expanded = useReviewStore((s) => s.expanded);
  const precedents = useReviewStore((s) => s.precedents);
  const workerStats = useReviewStore((s) => s.workerStats);
  const workers = useReviewStore((s) => s.workers);
  const logs = useReviewStore((s) => s.logs);
  const exported = useReviewStore((s) => s.exported);
  const setFilter = useReviewStore((s) => s.setFilter);
  const select = useReviewStore((s) => s.select);
  const hover = useReviewStore((s) => s.hover);
  const toggleExpanded = useReviewStore((s) => s.toggleExpanded);
  const decide = useReviewStore((s) => s.decide);
  const clearDecision = useReviewStore((s) => s.clearDecision);
  const acceptAll = useReviewStore((s) => s.acceptAll);

  const decided = useDecided();
  const counts = useCounts(decided);
  const board = useBoard();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const visible = useVisible(decided, filter);

  if (!run) return null;
  const running = run.status === "running" || run.status === "queued";
  const rulesChecked = board.rulesTotal || Object.keys(workerStats).length;
  const rulesDone = board.rulesDone;
  const applied = run.status === "applied" || exported;

  return (
    <>
      <div className="shrink-0 border-b border-hairline bg-paper px-4 pt-3.5 pb-3" ref={filterRef}>
        <div className="mb-2.5 flex items-baseline justify-between gap-3">
          <h2 className="label-caps">Findings</h2>
          <p className="mono text-[11px] text-ink-muted">
            {rulesChecked > 0
              ? running
                ? `${rulesDone} of ${rulesChecked} rules · `
                : `${rulesChecked} rules checked · `
              : ""}
            {counts.all} engaged
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {chipOrder.map((chip) => (
            <Chip
              key={chip.id}
              active={filter === chip.id}
              count={
                chip.id === "all"
                  ? counts.all
                  : chip.id === "critical"
                    ? counts.critical
                    : chip.id === "high"
                      ? counts.high
                      : chip.id === "open"
                        ? counts.open
                        : counts.accepted + counts.edited
              }
              onClick={() => setFilter(chip.id)}
            >
              {chip.label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="pane min-h-0 flex-1" ref={listRef}>
        {applied ? (
          <div className="m-4 rounded-card border border-verified/40 bg-verified-soft px-4 py-3">
            <p className="flex items-center gap-1.5 font-serif text-[14px] font-semibold text-ink">
              <Check size={14} strokeWidth={2.25} aria-hidden />
              Tracked changes written
            </p>
            <p className="mt-1 text-[12.5px] leading-[1.55] text-ink">
              A copy of {run.document.source.filename} now carries your accepted redlines and margin comments.
            </p>
            <a
              href={outputDocxUrl(run.id)}
              className="mt-2 inline-flex items-center gap-1 text-[12.5px] text-insertion hover:underline"
            >
              <Download size={12} strokeWidth={1.75} aria-hidden />
              Download the redlined document
            </a>
          </div>
        ) : null}

        {running ? (
          <ProgressBoard
            stages={board.stages}
            workers={workers}
            logs={logs}
            resumed={board.resumed}
            rulesDone={board.rulesDone}
            rulesTotal={board.rulesTotal}
          />
        ) : null}

        <div className="space-y-3 p-4">
          {visible.length === 0 ? (
            running ? (
              <div className="space-y-3">
                <p className="font-serif text-[13.5px] italic text-ink-muted">
                  Findings appear here as each rule is verified — you can start deciding straight away.
                </p>
                {[0, 1].map((i) => (
                  <div key={i} className="rounded-card border border-hairline bg-sheet p-3.5">
                    <SkeletonLines lines={4} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title={counts.all === 0 ? "No findings" : "Nothing matches this filter"}
                body={
                  counts.all === 0
                    ? "Every rule in the playbook came back compliant for this document. The memo records what was checked."
                    : "Clear the filter to see the rest of the findings for this document."
                }
                action={
                  counts.all > 0 ? (
                    <Button variant="secondary" size="sm" onClick={() => setFilter("all")}>
                      Show all {counts.all}
                    </Button>
                  ) : undefined
                }
              />
            )
          ) : (
            visible.map((item) => (
              <FindingCard
                key={item.finding.id}
                decided={item}
                document={doc}
                runId={run.id}
                selected={selectedId === item.finding.id}
                expanded={expanded.includes(item.finding.id)}
                precedent={
                  item.finding.proposal?.precedentId ? precedents[item.finding.proposal.precedentId] : undefined
                }
                meta={workerStats[item.finding.ruleId]}
                onSelect={() => select(item.finding.id)}
                onHover={(hovered) => hover(hovered ? item.finding.id : null)}
                onToggle={() => toggleExpanded(item.finding.id)}
                onAccept={() => decide(item.finding.id, "accept")}
                onReject={() => decide(item.finding.id, "reject")}
                onEdit={() => onEdit(item.finding.id)}
                onUndo={() => clearDecision(item.finding.id)}
              />
            ))
          )}
        </div>
      </div>

      <footer className="shrink-0 border-t border-hairline bg-sheet px-4 py-3">
        <dl className="mb-2.5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          {[
            { term: "open", value: counts.open },
            { term: "accepted", value: counts.accepted },
            { term: "edited", value: counts.edited },
            { term: "rejected", value: counts.rejected },
          ].map((item) => (
            <div key={item.term} className="flex items-baseline gap-1">
              <dt className="text-[12px] text-ink-muted">{item.term}</dt>
              <dd className="mono text-[12px] text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="md"
            className="flex-1"
            disabled={counts.verifiedOpen.length === 0}
            onClick={() => setConfirmOpen(true)}
          >
            Accept all verified
            {counts.verifiedOpen.length > 0 ? (
              <span className="mono text-[11px] text-ink-muted">{counts.verifiedOpen.length}</span>
            ) : null}
          </Button>
          <Button variant="primary" size="md" className="flex-1" onClick={onExport}>
            Export .docx
          </Button>
        </div>
      </footer>

      <Dialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Accept all verified findings"
        description="Only findings the verifier passed or repaired. Escalated findings stay open for you."
        width={480}
        footer={
          <>
            <Button variant="quiet" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="accept"
              onClick={() => {
                acceptAll(counts.verifiedOpen);
                setConfirmOpen(false);
              }}
            >
              Accept {counts.verifiedOpen.length}
            </Button>
          </>
        }
      >
        <ul className="space-y-1.5">
          {decided
            .filter((d) => counts.verifiedOpen.includes(d.finding.id))
            .map((d) => (
              <li key={d.finding.id} className="flex items-baseline gap-3">
                <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{d.finding.ruleTitle}</span>
                <span className="mono shrink-0 text-[11px] text-ink-muted">
                  {d.finding.sectionRef ?? d.finding.ruleId}
                </span>
              </li>
            ))}
        </ul>
      </Dialog>
    </>
  );
}
