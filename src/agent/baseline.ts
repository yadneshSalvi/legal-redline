import { z } from "zod";

import type { LlmClient } from "@/src/agent/llm";
import { cachedSystem } from "@/src/agent/prompts/common";
import { BASELINE_SYSTEM, CHAT_BASELINE_SYSTEM, CHAT_EXTRACTION_SYSTEM } from "@/src/agent/prompts/baseline";
import type { Finding, PipelineConfig } from "@/src/agent/types";
import type { DocumentModel } from "@/src/engine/types";
import { ruleFull } from "@/src/playbook/loader";
import type { Playbook } from "@/src/playbook/schema";
import { stableFindingId } from "@/src/agent/id";

const BaselineFindingSchema = z.object({
  ruleId: z.string(),
  status: z.enum(["deviation", "missing", "compliant", "needs_review"]),
  paragraphIds: z.array(z.string()),
  quote: z.string(),
  rationale: z.string(),
  confidence: z.number(),
  replacement: z
    .object({ paragraphId: z.string(), oldText: z.string(), newText: z.string(), comment: z.string().optional() })
    .optional(),
});
const BaselineOutputSchema = z.object({ findings: z.array(BaselineFindingSchema) });

function numberedDocument(document: DocumentModel): string {
  return document.paragraphs.map((paragraph) => `${paragraph.id}: ${paragraph.text}`).join("\n\n");
}

function mapFindings(document: DocumentModel, playbook: Playbook, items: z.infer<typeof BaselineFindingSchema>[]): Finding[] {
  return items.flatMap((item) => {
    const rule = playbook.rules.find((candidate) => candidate.id === item.ruleId);
    if (!rule) return [];
    const first = document.paragraphs.find((paragraph) => paragraph.id === item.paragraphIds[0]);
    const section = document.sections.find((candidate) => candidate.id === first?.sectionId);
    return [{
      id: stableFindingId(rule.id, item.paragraphIds, item.status, item.quote),
      ruleId: rule.id,
      ruleTitle: rule.title,
      severity: rule.severity,
      status: item.status,
      paragraphIds: item.paragraphIds,
      sectionId: first?.sectionId,
      sectionRef: section ? `${section.number ? `§ ${section.number} ` : ""}${section.heading}` : undefined,
      quote: item.quote.slice(0, 600),
      rationale: item.rationale,
      proposal: item.replacement
        ? {
            ops: [{ kind: "replace" as const, paragraphId: item.replacement.paragraphId, oldText: item.replacement.oldText, newText: item.replacement.newText }],
            comment: item.replacement.comment ?? `[Playbook] ${item.rationale}`,
            level: "preferred" as const,
            summary: item.rationale,
          }
        : undefined,
      verification: { verdict: "skipped" as const, attempts: 0, notes: "Baseline output is not repaired.", checks: [] },
      confidence: Math.max(0, Math.min(1, item.confidence)),
      producedBy: "baseline" as const,
    }];
  });
}

export async function runBaseline(input: {
  document: DocumentModel;
  playbook: Playbook;
  config: PipelineConfig;
  llm: LlmClient;
}): Promise<Finding[]> {
  const contract = numberedDocument(input.document);
  if (input.config.id === "b0-chat") {
    const review = await input.llm.complete<string>({
      agent: "baseline",
      model: input.config.model,
      effort: input.config.effort,
      system: cachedSystem(CHAT_BASELINE_SYSTEM),
      messages: [{ role: "user", content: contract }],
    });
    const extracted = await input.llm.complete({
      agent: "baseline",
      model: input.config.model,
      effort: "low",
      system: cachedSystem(CHAT_EXTRACTION_SYSTEM),
      messages: [
        {
          role: "user",
          content: `Allowed rules:\n${input.playbook.rules.map((rule) => `${rule.id}: ${rule.title}`).join("\n")}\n\nContract:\n${contract}\n\nReview:\n${review.text}`,
        },
      ],
      schema: BaselineOutputSchema,
    });
    return mapFindings(input.document, input.playbook, extracted.data.findings);
  }
  const response = await input.llm.complete({
    agent: "baseline",
    model: input.config.model,
    effort: input.config.effort,
    system: cachedSystem(BASELINE_SYSTEM, input.playbook),
    messages: [
      {
        role: "user",
        content: `Playbook:\n${input.playbook.rules.map(ruleFull).join("\n\n---\n\n")}\n\nNumbered contract:\n${contract}`,
      },
    ],
    schema: BaselineOutputSchema,
  });
  return mapFindings(input.document, input.playbook, response.data.findings);
}
