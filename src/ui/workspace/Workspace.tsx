"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../Button";
import { EmptyState } from "../EmptyState";
import { Outline } from "../Outline";
import { Paper } from "../Paper";
import { SkeletonLines } from "../Skeleton";
import { EditDialog } from "../EditDialog";
import { MemoDrawer } from "../MemoDrawer";
import { useRun } from "../data/useRun";
import { defaultPlaybook } from "../fixtures/samples";
import { renderDocument, sectionSeverities } from "../lib/redline";
import { useBoard } from "../state/board";
import { useReviewStore } from "../state/reviewStore";
import { useDecided, useVisible } from "../state/useDecided";
import { DocBar } from "./DocBar";
import { ExportDialog } from "./ExportDialog";
import { FindingsPane } from "./FindingsPane";

function scrollToParagraph(paragraphId: string) {
  const node = window.document.getElementById(paragraphId);
  if (!node) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  node.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
}

export function Workspace({ runId }: { runId: string }) {
  const router = useRouter();
  const { retry } = useRun(runId);
  const run = useReviewStore((s) => s.run);
  const loading = useReviewStore((s) => s.loading);
  const error = useReviewStore((s) => s.error);
  const filter = useReviewStore((s) => s.filter);
  const selectedId = useReviewStore((s) => s.selectedId);
  const decisions = useReviewStore((s) => s.decisions);
  const hoveredId = useReviewStore((s) => s.hoveredId);
  const persist = useReviewStore((s) => s.persist);
  const select = useReviewStore((s) => s.select);
  const hover = useReviewStore((s) => s.hover);
  const move = useReviewStore((s) => s.move);
  const toggleExpanded = useReviewStore((s) => s.toggleExpanded);
  const decide = useReviewStore((s) => s.decide);
  const setExported = useReviewStore((s) => s.setExported);

  const decided = useDecided();
  const board = useBoard();
  const visible = useVisible(decided, filter);
  const visibleIds = useMemo(() => visible.map((d) => d.finding.id), [visible]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [memoOpen, setMemoOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const openEdit = useCallback((findingId: string) => setEditingId(findingId), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable === true;
      if (typing || event.metaKey || event.ctrlKey || event.altKey) return;
      if (window.document.querySelector('[role="dialog"]')) return;

      const key = event.key.toLowerCase();
      if (key === "j" || key === "k") {
        event.preventDefault();
        move(key === "j" ? 1 : -1, visibleIds);
        return;
      }
      if (key === "/") {
        event.preventDefault();
        const chip =
          filterRef.current?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]') ??
          filterRef.current?.querySelector<HTMLButtonElement>("button");
        chip?.focus();
        return;
      }
      const current = useReviewStore.getState().selectedId;
      if (!current) return;
      if (key === "a") {
        event.preventDefault();
        decide(current, "accept");
      } else if (key === "r") {
        event.preventDefault();
        decide(current, "reject");
      } else if (key === "e") {
        event.preventDefault();
        if (decided.find((d) => d.finding.id === current)?.ops.length) openEdit(current);
      } else if (event.key === "Enter") {
        event.preventDefault();
        toggleExpanded(current);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [decide, decided, move, openEdit, toggleExpanded, visibleIds]);

  // Follow the selection, but only when it actually changes: the first selection is automatic, and
  // findings arriving mid-run must not drag the pane away from the progress board.
  const lastSelected = useRef<string | null>(null);
  const focusFollows = useRef(false);
  useEffect(() => {
    if (!selectedId) return;
    if (lastSelected.current === null || lastSelected.current === selectedId) {
      lastSelected.current = selectedId;
      return;
    }
    lastSelected.current = selectedId;
    const card = listRef.current?.querySelector<HTMLElement>(`[data-finding="${selectedId}"]`);
    card?.scrollIntoView({ block: "nearest" });
    // Selection follows focus: the card the next A/R/E acts on is the focused element.
    card?.focus({ preventScroll: true });
    focusFollows.current = true;
    const paragraphId = useReviewStore
      .getState()
      .run?.findings.find((finding) => finding.id === selectedId)?.paragraphIds[0];
    if (paragraphId) scrollToParagraph(paragraphId);
  }, [selectedId]);

  // A decision swaps the card for its collapsed form, unmounting the focused node. Put focus back on
  // the selected card so a keyboard review is never interrupted mid-list.
  useEffect(() => {
    if (!focusFollows.current || !selectedId) return;
    const active = window.document.activeElement;
    if (active && active !== window.document.body && listRef.current?.contains(active)) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-finding="${selectedId}"]`)
      ?.focus({ preventScroll: true });
  }, [decisions, selectedId]);

  const rows = useMemo(() => (run ? renderDocument(run.document, decided) : []), [run, decided]);
  const findingsBySection = useMemo(
    () => (run ? sectionSeverities(run.document, run.findings) : new Map()),
    [run],
  );
  const activeParagraphIds = useMemo(() => {
    const id = hoveredId ?? selectedId;
    const finding = decided.find((d) => d.finding.id === id)?.finding;
    return new Set(finding?.paragraphIds ?? []);
  }, [hoveredId, selectedId, decided]);
  const activeSectionId = useMemo(() => {
    const id = hoveredId ?? selectedId;
    return decided.find((d) => d.finding.id === id)?.finding.sectionId ?? null;
  }, [hoveredId, selectedId, decided]);

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center bg-paper px-6 py-16">
        <div className="w-full max-w-[520px] rounded-card border border-hairline bg-sheet py-3 shadow-sheet">
          <EmptyState
            title="That review could not be opened"
            body={error}
            action={
              <div className="flex gap-2">
                <Button variant="secondary" size="md" onClick={retry}>
                  Try again
                </Button>
                <Button variant="primary" size="md" onClick={() => router.push("/runs")}>
                  All runs
                </Button>
              </div>
            }
          />
        </div>
      </div>
    );
  }

  if (loading || !run) {
    return (
      <div className="workspace">
        <div className="h-12 shrink-0 border-b border-hairline bg-paper" />
        <div className="flex min-h-0 flex-1">
          <div className="outline-pane shrink-0 flex-col border-r border-hairline bg-paper p-4">
            <SkeletonLines lines={6} />
          </div>
          <div className="flex-1 bg-paper p-8">
            <div className="mx-auto max-w-[860px] rounded-card border border-hairline bg-sheet px-16 py-14">
              <SkeletonLines lines={6} />
              <div className="h-6" />
              <SkeletonLines lines={5} />
              <div className="h-6" />
              <SkeletonLines lines={6} />
            </div>
          </div>
          <div className="findings-pane shrink-0 space-y-3 border-l border-hairline bg-paper p-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-card border border-hairline bg-sheet p-3.5">
                <SkeletonLines lines={4} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const outline = (
    <Outline
      document={run.document}
      findingsBySection={findingsBySection}
      activeSectionId={activeSectionId}
      onJump={scrollToParagraph}
    />
  );
  const progress =
    run.status === "running" || run.status === "queued"
      ? { done: board.rulesDone, total: board.rulesTotal }
      : null;
  const editing = decided.find((d) => d.finding.id === editingId) ?? null;

  return (
    <div className="workspace">
      <DocBar
        run={run}
        playbookName={defaultPlaybook.name.replace("Customer-side ", "")}
        progress={progress}
        outline={outline}
        persisted={persist}
        onMemo={() => setMemoOpen(true)}
        onExport={() => setExportOpen(true)}
      />

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="outline-pane shrink-0">{outline}</div>
        <Paper
          rows={rows}
          activeParagraphIds={activeParagraphIds}
          onHover={hover}
          onSelect={select}
          footer={
            <p className="mx-auto mt-4 max-w-[760px] text-center text-[11.5px] text-ink-muted">
              Proposed changes are shown the way Word will render them. Nothing is written to a file until you
              export.
            </p>
          }
        />
        <aside className="findings-pane flex min-h-0 shrink-0 flex-col border-t border-hairline bg-paper lg:border-t-0 lg:border-l">
          <FindingsPane
            document={run.document}
            filterRef={filterRef}
            listRef={listRef}
            onEdit={openEdit}
            onExport={() => setExportOpen(true)}
          />
        </aside>
      </div>

      <MemoDrawer
        open={memoOpen}
        onOpenChange={setMemoOpen}
        memo={run.memo}
        filename={`${run.document.source.filename.replace(/\.(docx|txt)$/i, "")}-issues-memo.md`}
      />
      <EditDialog
        decided={editing}
        document={run.document}
        open={editingId !== null}
        onOpenChange={(next) => setEditingId(next ? editingId : null)}
        onSave={(ops, comment) => {
          if (editingId) decide(editingId, "edit", { ops, comment });
        }}
      />
      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        run={run}
        decided={decided}
        persist={persist}
        onApplied={() => setExported(true)}
      />
    </div>
  );
}
