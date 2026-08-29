"use client";

import { Plus, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Precedent, ReviewRun } from "@/src/agent/types";
import { Button } from "../Button";
import { Tag } from "../Chip";
import { Dialog } from "../Dialog";
import { EmptyState } from "../EmptyState";
import { SeverityDot } from "../SeverityPill";
import { Skeleton } from "../Skeleton";
import { defaultPlaybook, type PlaybookSummary } from "../fixtures/samples";
import { seedPrecedents } from "../fixtures/precedents";
import { deletePrecedent, getPlaybooks, getPrecedents, getRuns } from "../lib/api";
import { AddPrecedentDialog } from "./AddPrecedentDialog";
import { PrecedentCard } from "./PrecedentCard";

interface Group {
  ruleId: string;
  title: string;
  severity: PlaybookSummary["rules"][number]["severity"] | null;
  precedents: Precedent[];
}

function matches(precedent: Precedent, query: string): boolean {
  if (query === "") return true;
  const haystack = [
    precedent.title,
    precedent.source,
    precedent.comment,
    precedent.clauseBefore,
    precedent.clauseAfter,
    precedent.ruleId,
    precedent.approvedBy,
    ...precedent.tags,
  ]
    .join(" ")
    .toLocaleLowerCase("en-US");
  return haystack.includes(query);
}

/**
 * `/precedents` — the approved language the drafters retrieve by rule (`src/agent/memory.ts`).
 * Grouped by playbook rule, because that is how the agent looks it up.
 */
export function PrecedentBank() {
  const [precedents, setPrecedents] = useState<Precedent[] | null>(null);
  const [playbook, setPlaybook] = useState<PlaybookSummary>(defaultPlaybook);
  const [usage, setUsage] = useState<Record<string, number>>({});
  const [live, setLive] = useState(false);
  const [query, setQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Precedent | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const [remote, playbooks, runs] = await Promise.all([getPrecedents(), getPlaybooks(), getRuns()]);
      if (cancelled) return;
      setPrecedents(remote && remote.length > 0 ? remote : seedPrecedents);
      setLive(Boolean(remote && remote.length > 0));
      if (playbooks && playbooks.length > 0) setPlaybook(playbooks[0]);
      if (runs) setUsage(countUsage(runs));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const remove = useCallback(async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    const ok = await deletePrecedent(pendingDelete.id);
    setDeleting(false);
    if (ok) setPrecedents((current) => (current ?? []).filter((item) => item.id !== pendingDelete.id));
    setPendingDelete(null);
  }, [pendingDelete]);

  const groups = useMemo<Group[]>(() => {
    if (!precedents) return [];
    const normalized = query.trim().toLocaleLowerCase("en-US");
    const visible = precedents.filter((precedent) => matches(precedent, normalized));
    const byRule = new Map<string, Precedent[]>();
    for (const precedent of visible) {
      byRule.set(precedent.ruleId, [...(byRule.get(precedent.ruleId) ?? []), precedent]);
    }
    const order = playbook.rules.map((rule) => rule.id);
    return [...byRule.entries()]
      .sort((left, right) => {
        const leftIndex = order.indexOf(left[0]);
        const rightIndex = order.indexOf(right[0]);
        return (leftIndex < 0 ? order.length : leftIndex) - (rightIndex < 0 ? order.length : rightIndex);
      })
      .map(([ruleId, items]) => {
        const rule = playbook.rules.find((candidate) => candidate.id === ruleId);
        return {
          ruleId,
          title: rule?.title ?? items[0].title,
          severity: rule?.severity ?? null,
          precedents: [...items].sort((left, right) => right.approvedAt.localeCompare(left.approvedAt)),
        };
      });
  }, [precedents, playbook, query]);

  const total = precedents?.length ?? 0;
  const shown = groups.reduce((count, group) => count + group.precedents.length, 0);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-2.5">
        <label className="relative flex items-center">
          <Search size={13} strokeWidth={1.75} aria-hidden className="pointer-events-none absolute left-2.5 text-ink-faint" />
          <span className="sr-only">Search precedents</span>
          <input
            type="search"
            value={query}
            placeholder="Search clauses, comments, sources, tags"
            onChange={(event) => setQuery(event.target.value)}
            className="h-8 w-[320px] rounded-field border border-hairline-strong bg-sheet pr-2.5 pl-8 text-[13px] text-ink placeholder:text-ink-faint hover:border-navy"
          />
        </label>
        <p className="mono text-[11.5px] text-ink-faint">
          {shown === total ? `${total} precedents` : `${shown} of ${total} precedents`}
          {precedents ? ` · ${groups.length} ${groups.length === 1 ? "rule" : "rules"}` : ""}
        </p>
        {!live && precedents ? <Tag tone="comment">fixture</Tag> : null}
        <Button variant="primary" className="ml-auto" onClick={() => setAddOpen(true)}>
          <Plus size={13} strokeWidth={2} aria-hidden />
          Add precedent
        </Button>
      </div>

      {precedents === null ? (
        <div className="grid gap-3 xl:grid-cols-2">
          {[0, 1, 2, 3].map((index) => (
            <Skeleton key={index} className="h-[260px] w-full" />
          ))}
        </div>
      ) : groups.length === 0 ? (
        <div className="rounded-card border border-hairline bg-sheet py-4">
          <EmptyState
            title={total === 0 ? "The bank is empty" : "Nothing matches that search"}
            body={
              total === 0
                ? "Accept a redline in a review and it is promoted here automatically, or add approved language by hand — the drafters retrieve it by rule on the next contract."
                : "Try a clause word, a rule id such as LOL-CAP, or the name of the agreement it came from."
            }
            action={
              total === 0 ? (
                <Button variant="primary" onClick={() => setAddOpen(true)}>
                  Add the first precedent
                </Button>
              ) : (
                <Button variant="secondary" onClick={() => setQuery("")}>
                  Clear the search
                </Button>
              )
            }
          />
        </div>
      ) : (
        <div className="space-y-7">
          {groups.map((group) => (
            <section key={group.ruleId}>
              <div className="mb-2.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 border-b border-hairline pb-2">
                {group.severity ? <SeverityDot severity={group.severity} className="mb-[2px]" /> : null}
                <h2 className="font-serif text-[14.5px] leading-tight font-semibold text-ink">{group.title}</h2>
                <span className="mono text-[11px] text-ink-faint">{group.ruleId}</span>
                <span className="mono ml-auto text-[11px] text-ink-faint">
                  {group.precedents.length} {group.precedents.length === 1 ? "precedent" : "precedents"}
                </span>
              </div>
              <div className="grid gap-3 xl:grid-cols-2">
                {group.precedents.map((precedent) => (
                  <PrecedentCard
                    key={precedent.id}
                    precedent={precedent}
                    usedInRuns={usage[precedent.id]}
                    onDelete={() => setPendingDelete(precedent)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <AddPrecedentDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        playbook={playbook}
        onAdded={(precedent) => setPrecedents((current) => [precedent, ...(current ?? [])])}
      />

      <Dialog
        open={pendingDelete !== null}
        onOpenChange={(next) => setPendingDelete(next ? pendingDelete : null)}
        title="Remove this precedent?"
        description="The drafters will stop retrieving it. Documents already exported are untouched."
        width={520}
        footer={
          <>
            <Button variant="secondary" onClick={() => setPendingDelete(null)}>
              Keep it
            </Button>
            <Button variant="reject" onClick={() => void remove()} disabled={deleting}>
              {deleting ? "Removing…" : "Remove precedent"}
            </Button>
          </>
        }
      >
        {pendingDelete ? (
          <div>
            <p className="font-serif text-[13.5px] font-semibold text-ink">{pendingDelete.title}</p>
            <p className="mt-1 text-[12px] text-ink-muted">
              {pendingDelete.source} · {pendingDelete.ruleId} · {pendingDelete.level}
            </p>
          </div>
        ) : null}
      </Dialog>
    </>
  );
}

/** How many recorded runs used each precedent as model language, when the run store is readable. */
function countUsage(runs: readonly ReviewRun[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const run of runs) {
    const used = new Set(
      run.findings.flatMap((finding) => (finding.proposal?.precedentId ? [finding.proposal.precedentId] : [])),
    );
    for (const id of used) counts[id] = (counts[id] ?? 0) + 1;
  }
  return counts;
}
