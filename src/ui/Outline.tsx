"use client";

import type { Finding, Severity } from "@/src/agent/types";
import type { DocumentModel } from "@/src/engine/types";
import { SeverityDot } from "./SeverityPill";
import { cn } from "./cn";
import { buildOutline } from "./lib/heading";

const rank: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 };

/** The section outline. Severity dots roll up the findings inside each section. */
export function Outline({
  document: doc,
  findingsBySection,
  activeSectionId,
  onJump,
}: {
  document: DocumentModel;
  findingsBySection: Map<string, Finding[]>;
  activeSectionId: string | null;
  onJump: (paragraphId: string) => void;
}) {
  const entries = buildOutline(doc, findingsBySection);

  return (
    <nav aria-label="Document outline" className="pane min-h-0 w-full flex-1 border-r border-hairline bg-paper">
      <div className="px-3 py-4">
        <h2 className="label-caps px-2 pb-2">Outline</h2>
        <ul className="space-y-0.5">
          {entries.map((entry) => {
            const findings = entry.findings
              .filter((finding) => finding.status !== "compliant")
              .sort((a, b) => rank[a.severity] - rank[b.severity]);
            const active = activeSectionId === entry.id;
            return (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() => entry.jumpTo && onJump(entry.jumpTo)}
                  className={cn(
                    "flex w-full items-start gap-2 rounded-field px-2 py-1.5 text-left transition-colors duration-150",
                    active ? "bg-navy-soft text-ink" : "text-ink-muted hover:bg-sheet hover:text-ink",
                  )}
                >
                  {entry.number ? (
                    <span className="mono mt-[2px] w-[18px] shrink-0 text-[11px] text-ink-muted">
                      {entry.number}
                    </span>
                  ) : (
                    <span className="w-[18px] shrink-0" aria-hidden />
                  )}
                  <span className="line-clamp-2 min-w-0 flex-1 text-[12.5px] leading-[1.45]">{entry.heading}</span>
                  {findings.length > 0 ? (
                    <span className="relative mt-[5px] flex shrink-0 items-center gap-[3px]">
                      {findings.slice(0, 3).map((finding) => (
                        <SeverityDot key={finding.id} severity={finding.severity} />
                      ))}
                      {findings.length > 3 ? (
                        <span className="mono text-[10px] text-ink-muted">+{findings.length - 3}</span>
                      ) : null}
                      <span className="sr-only">
                        {findings.length} open finding{findings.length === 1 ? "" : "s"}:{" "}
                        {findings.map((finding) => `${finding.severity} — ${finding.ruleTitle}`).join("; ")}
                      </span>
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mono mt-5 border-t border-hairline px-2 pt-3 text-[11px] leading-[1.6] text-ink-muted">
          {doc.stats.paragraphs} paragraphs
          <br />
          {doc.stats.words.toLocaleString("en-US")} words
          <br />
          {doc.stats.definitions} defined terms
        </p>
      </div>
    </nav>
  );
}
