import type { Finding } from "@/src/agent/types";
import type { DocumentModel, Paragraph, Section } from "@/src/engine/types";

/**
 * Longest text we still set as a heading. Real contracts trip heading detection on long ALL-CAPS
 * definitions ("1.1 “AFFILIATE” MEANS, WITH RESPECT TO A PARTY, …"); anything this long reads as
 * body text, so it is set as body text — and it must not appear in the outline either.
 */
export const HEADING_MAX_CHARS = 72;

export function isRenderedHeading(paragraph: Paragraph | undefined): boolean {
  if (!paragraph) return false;
  return paragraph.isHeading && paragraph.text.trim().length <= HEADING_MAX_CHARS;
}

export interface OutlineEntry {
  id: string;
  number?: string;
  heading: string;
  /** Paragraph the entry scrolls to. */
  jumpTo?: string;
  findings: Finding[];
}

function headingParagraphOf(doc: DocumentModel, section: Section): Paragraph | undefined {
  return doc.paragraphs.find((p) => p.id === section.paragraphIds[0] && p.isHeading);
}

/**
 * The outline the left pane renders: one entry per section whose heading is actually set as a
 * heading in the paper. A section built from a mis-detected heading is folded into the entry above
 * it, so the two panes never disagree about what a section is.
 */
export function buildOutline(doc: DocumentModel, findingsBySection: Map<string, Finding[]>): OutlineEntry[] {
  const entries: OutlineEntry[] = [];

  for (const section of doc.sections) {
    const heading = headingParagraphOf(doc, section);
    const findings = findingsBySection.get(section.id) ?? [];
    const previous = entries[entries.length - 1];

    if (previous && heading && !isRenderedHeading(heading)) {
      const seen = new Set(previous.findings.map((f) => f.id));
      previous.findings.push(...findings.filter((f) => !seen.has(f.id)));
      continue;
    }

    entries.push({
      id: section.id,
      number: section.number,
      heading: section.heading,
      jumpTo: section.paragraphIds[0],
      findings: [...findings],
    });
  }

  return entries;
}
