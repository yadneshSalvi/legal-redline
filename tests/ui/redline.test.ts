import { describe, expect, it } from "vitest";

import type { Finding } from "@/src/agent/types";
import { renderParagraph } from "@/src/engine/diff";
import { parseText } from "@/src/engine/parse-text";
import type { RedlineOp } from "@/src/engine/types";
import { decideFindings, renderDocument } from "@/src/ui/lib/redline";

function renderUi(text: string, ops: RedlineOp[]) {
  const document = parseText(text, "redline-ui.txt");
  const finding: Finding = {
    id: "finding-1",
    ruleId: "TEST",
    ruleTitle: "Test rule",
    severity: "medium",
    status: "deviation",
    paragraphIds: ["p0000"],
    quote: text,
    rationale: "Test rationale.",
    proposal: { ops, comment: "Test comment.", level: "preferred", summary: "Test redline" },
    confidence: 0.9,
    producedBy: "drafter",
  };
  const rendered = renderDocument(document, decideFindings([finding], {}));
  return { document, segments: rendered.find((row) => row.anchorId === "p0000")?.segments };
}

describe("UI redline rendering", () => {
  it.each([
    {
      name: "one surgical replacement",
      text: "Liability is capped at three months of fees.",
      ops: [{ kind: "replace", paragraphId: "p0000", oldText: "three months", newText: "twelve months" }],
    },
    {
      name: "a dense rewrite",
      text: "Vendor owns every deliverable created for Customer.",
      ops: [{
        kind: "replace", paragraphId: "p0000", oldText: "Vendor owns every deliverable created for Customer",
        newText: "Customer owns all bespoke deliverables upon payment",
      }],
    },
    {
      name: "two replacements in one paragraph",
      text: "The cap is three months and applies only to Vendor.",
      ops: [
        { kind: "replace", paragraphId: "p0000", oldText: "three months", newText: "twelve months" },
        { kind: "replace", paragraphId: "p0000", oldText: "only to Vendor", newText: "mutually to both parties" },
      ],
    },
  ] satisfies Array<{ name: string; text: string; ops: RedlineOp[] }>)
  ("matches the engine for $name", ({ text, ops }) => {
    const { document, segments } = renderUi(text, ops);
    expect(segments).toEqual(renderParagraph(document, "p0000", ops));
  });
});
