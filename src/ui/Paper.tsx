"use client";

import type { ReactNode } from "react";
import type { ParagraphRender } from "./lib/redline";
import { Paragraph } from "./Paragraph";

/**
 * "The paper": the document itself, set in Source Serif on a white sheet over the paper background,
 * 760 px column with 64 px gutters (STYLE.md §1, §3).
 */
export function Paper({
  rows,
  activeParagraphIds,
  onHover,
  onSelect,
  footer,
}: {
  rows: ParagraphRender[];
  activeParagraphIds: Set<string>;
  onHover: (findingId: string | null) => void;
  onSelect: (findingId: string) => void;
  footer?: ReactNode;
}) {
  return (
    <div className="pane flex-1 bg-paper" role="document" aria-label="The contract, with proposed redlines">
      <div className="mx-auto w-full max-w-[824px] px-8 py-8">
        <article className="paper-sheet rounded-card border border-hairline bg-sheet py-14 shadow-sheet">
          {rows.map((row) => (
            <Paragraph
              key={row.anchorId}
              render={row}
              active={activeParagraphIds.has(row.anchorId)}
              onHover={onHover}
              onSelect={onSelect}
            />
          ))}
        </article>
        {footer}
      </div>
    </div>
  );
}
