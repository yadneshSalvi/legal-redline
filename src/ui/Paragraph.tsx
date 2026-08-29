"use client";

import type { ParagraphRender } from "./lib/redline";
import { RedlineText } from "./RedlineText";
import { cn } from "./cn";

const rule: Record<ParagraphRender["state"], string> = {
  clean: "border-transparent",
  rejected: "border-transparent",
  proposed: "border-hairline-strong",
  accepted: "border-verified",
  edited: "border-insertion",
};

/** One paragraph of the paper. Anchors are `#p0042` so a finding card can link straight to it. */
export function Paragraph({
  render,
  active,
  onHover,
  onSelect,
}: {
  render: ParagraphRender;
  active: boolean;
  onHover: (findingId: string | null) => void;
  onSelect: (findingId: string) => void;
}) {
  const { paragraph, segments, state, commentNumbers, findingIds, anchorId } = render;
  const interactive = findingIds.length > 0;
  const isTitle = paragraph.style === "Title";
  // Real contracts trip heading detection on long ALL-CAPS definitions; anything this long reads as
  // body text, so it is set as body text.
  const isHeading = paragraph.isHeading && paragraph.text.length <= 72;

  const shared = cn(
    "paper-row border-l-2 transition-colors duration-[160ms] ease-out",
    rule[state],
    active && "bg-navy-soft",
    interactive && "cursor-default",
  );

  if (isTitle) {
    return (
      <h1
        id={anchorId}
        className={cn(shared, "mb-8 scroll-mt-24 text-center font-serif text-[19px] leading-snug font-semibold tracking-[0.02em] text-ink")}
      >
        {paragraph.text}
      </h1>
    );
  }

  if (isHeading) {
    return (
      <h2
        id={anchorId}
        className={cn(
          shared,
          "z-[5] mt-9 mb-3 scroll-mt-24 bg-sheet py-1.5 font-serif text-[14.5px] font-semibold tracking-[0.03em] text-ink",
          (paragraph.level ?? 1) <= 1 && "sticky top-0",
        )}
      >
        {paragraph.text}
      </h2>
    );
  }

  return (
    <p
      id={anchorId}
      onMouseEnter={() => interactive && onHover(findingIds[0])}
      onMouseLeave={() => interactive && onHover(null)}
      onClick={() => interactive && onSelect(findingIds[0])}
      className={cn(
        shared,
        "mb-4 scroll-mt-24 font-serif text-[15.5px] leading-[1.65] text-ink",
        render.inserted && "text-insertion",
      )}
    >
      <RedlineText segments={segments} commentNumbers={commentNumbers} />
    </p>
  );
}
