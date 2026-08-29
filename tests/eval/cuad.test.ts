import { describe, expect, it } from "vitest";

import { canonicalizeCuadText } from "@/src/eval/cuad";
import { splitParagraphs } from "@/src/engine/text";

describe("CUAD PDF-text canonicalisation", () => {
  it("joins hard wraps, preserves breaks, creates numbered clauses, and drops boilerplate", () => {
    const nasty = [
      "Source: SEC filing 10-K",
      "The recitals end here.",
      "1. Scope",
      "Vendor will provide hosted",
      "services to Customer.",
      "2. Fees",
      "Customer pays monthly.",
      "",
      "Page 2 of 8",
      "(a) Taxes",
      "Taxes are excluded.",
    ].join("\r\n");
    expect(splitParagraphs(canonicalizeCuadText(nasty))).toEqual([
      "The recitals end here.",
      "1. Scope Vendor will provide hosted services to Customer.",
      "2. Fees Customer pays monthly.",
      "(a) Taxes Taxes are excluded.",
    ]);
  });

  it("splits a flat 600-word block at inline clauses and complete sentences", () => {
    const sentences = (label: string, count: number): string =>
      Array.from(
        { length: count },
        (_, index) => `${label} sentence ${index + 1} contains several ordinary contract words for reliable testing.`,
      ).join(" ");
    const flat = [
      sentences("Recital", 30),
      "The limitation applies under SECTION 8 of this Agreement.",
      "1. Definitions.",
      sentences("Definition", 12),
      "The defined service is called “1.5 Enterprise Plan” in each Order Form. ARTICLE II GENERAL TERMS.",
      sentences("Article", 12),
      "(a) First obligation applies.",
      sentences("Alpha", 12),
      "(b) Second obligation applies.",
      sentences("Beta", 12),
    ].join(" ");
    expect(flat.split(/\s+/).length).toBeGreaterThan(600);

    const paragraphs = splitParagraphs(canonicalizeCuadText(flat));
    expect(paragraphs.some((paragraph) => paragraph.startsWith("1. Definitions."))).toBe(true);
    expect(paragraphs.some((paragraph) => paragraph.startsWith("ARTICLE II GENERAL TERMS."))).toBe(true);
    expect(paragraphs.some((paragraph) => paragraph.startsWith("(a) First obligation"))).toBe(true);
    expect(paragraphs.some((paragraph) => paragraph.startsWith("(b) Second obligation"))).toBe(true);
    expect(paragraphs.some((paragraph) => paragraph.startsWith("SECTION 8 OF"))).toBe(false);
    expect(Math.max(...paragraphs.map((paragraph) => paragraph.split(/\s+/).length))).toBeLessThanOrEqual(300);
    expect(paragraphs.join(" ")).toBe(flat);
  });
});
