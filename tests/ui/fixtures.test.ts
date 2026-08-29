import { describe, expect, it } from "vitest";

import type { Severity } from "@/src/agent/types";
import { sampleDocument } from "@/src/ui/fixtures/sample-document";
import { sampleFindings } from "@/src/ui/fixtures/sample-findings";
import { sampleRun, sampleRunFindings } from "@/src/ui/fixtures/sample-run";
import { decideFindings, renderDocument } from "@/src/ui/lib/redline";

const byId = new Map(sampleDocument.paragraphs.map((p) => [p.id, p]));

/** The leading clause number of a paragraph as a reader sees it, e.g. "8.3" in "8.3 Procedure. …". */
function leadingNumber(text: string): string | undefined {
  return /^(\d+(?:\.\d+)*)[.\s]/.exec(text.trimStart())?.[1];
}

function duplicateNumbering(rows: { sectionId?: string; numbering?: string; id: string }[]): string[] {
  const seen = new Map<string, string>();
  const clashes: string[] = [];
  for (const row of rows) {
    if (!row.numbering) continue;
    const key = `${row.sectionId ?? "-"}/${row.numbering}`;
    const previous = seen.get(key);
    if (previous) clashes.push(`${row.numbering} in ${row.sectionId}: ${previous} and ${row.id}`);
    else seen.set(key, row.id);
  }
  return clashes;
}

describe("fixture document", () => {
  it("gives every paragraph a paragraph that exists and a stable id", () => {
    expect(sampleDocument.paragraphs).toHaveLength(sampleDocument.stats.paragraphs);
    for (const [index, paragraph] of sampleDocument.paragraphs.entries()) {
      expect(paragraph.id).toBe(`p${String(index).padStart(4, "0")}`);
      expect(paragraph.sectionId).toBeDefined();
    }
  });

  it("has no duplicate clause numbering within a section", () => {
    expect(
      duplicateNumbering(
        sampleDocument.paragraphs.map((p) => ({ sectionId: p.sectionId, numbering: p.numbering, id: p.id })),
      ),
    ).toEqual([]);
  });
});

describe("fixture findings", () => {
  it("anchors every replace op on text that occurs exactly once", () => {
    for (const finding of sampleFindings) {
      for (const op of finding.proposal?.ops ?? []) {
        const paragraph = byId.get(op.paragraphId);
        expect(paragraph, `${finding.ruleId}: paragraph ${op.paragraphId}`).toBeDefined();
        if (op.kind !== "replace") continue;
        const occurrences = paragraph!.text.split(op.oldText).length - 1;
        expect(occurrences, `${finding.ruleId} → ${op.paragraphId}: "${op.oldText.slice(0, 40)}…"`).toBe(1);
      }
    }
  });

  it("quotes text that appears verbatim in the document", () => {
    for (const finding of sampleFindings) {
      const matches = sampleDocument.paragraphs.filter((p) => p.text.includes(finding.quote));
      expect(matches.length, `${finding.ruleId} quote`).toBe(1);
    }
  });

  it("keeps clause numbering unique once every proposal is accepted", () => {
    const decisions = Object.fromEntries(
      sampleRunFindings.map((finding) => [
        finding.id,
        { findingId: finding.id, action: "accept" as const, at: "2026-08-30T00:00:00.000Z", by: "test" },
      ]),
    );
    const rows = renderDocument(sampleDocument, decideFindings(sampleRunFindings, decisions));
    const accepted = rows
      .filter((row) => row.segments.some((segment) => segment.type !== "delete"))
      .map((row) => ({
        id: row.anchorId,
        sectionId: row.paragraph.sectionId,
        numbering: leadingNumber(
          row.segments
            .filter((segment) => segment.type !== "delete")
            .map((segment) => segment.text)
            .join(""),
        ),
      }));
    expect(duplicateNumbering(accepted)).toEqual([]);
  });

  it("matches the run stats it ships with", () => {
    const bySeverity = sampleRun.stats.bySeverity;
    const counted = sampleRunFindings.reduce<Record<Severity, number>>(
      (acc, finding) => ({ ...acc, [finding.severity]: acc[finding.severity] + 1 }),
      { critical: 0, high: 0, medium: 0, low: 0 },
    );
    expect(counted).toEqual(bySeverity);
    expect(sampleRun.stats.findings).toBe(sampleRunFindings.length);
    for (const finding of sampleRunFindings) {
      expect(finding.costUsd, `${finding.ruleId} costUsd`).toBeGreaterThan(0);
      expect(finding.durationMs, `${finding.ruleId} durationMs`).toBeGreaterThan(0);
    }
  });
});
