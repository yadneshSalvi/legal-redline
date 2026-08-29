import { z } from "zod";

import type { LlmClient } from "@/src/agent/llm";
import { cachedSystem } from "@/src/agent/prompts/common";
import { PLANNER_SYSTEM } from "@/src/agent/prompts/planner";
import type { PipelineConfig } from "@/src/agent/types";
import type { DocumentModel } from "@/src/engine/types";
import { ruleSummary } from "@/src/playbook/loader";
import type { Playbook } from "@/src/playbook/schema";

const RulePlanSchema = z.object({
  ruleId: z.string(),
  candidateSectionIds: z.array(z.string()),
  candidateParagraphIds: z.array(z.string()),
  likelyAbsent: z.boolean(),
  note: z.string(),
});

const PlannerOutputSchema = z.object({
  parties: z.object({ ourParty: z.string(), counterparty: z.string() }),
  plans: z.array(RulePlanSchema),
});

export type RulePlan = z.infer<typeof RulePlanSchema>;
export type PlannerOutput = z.infer<typeof PlannerOutputSchema>;

export interface Parties {
  ourParty: string;
  counterparty: string;
}

function firstText(document: DocumentModel, paragraphIds: string[]): string {
  return paragraphIds
    .map((id) => document.paragraphs.find((paragraph) => paragraph.id === id)?.text ?? "")
    .find(Boolean)
    ?.slice(0, 200) ?? "";
}

export async function planReview(input: {
  document: DocumentModel;
  playbook: Playbook;
  config: PipelineConfig;
  llm: LlmClient;
  parties?: Partial<Parties>;
}): Promise<PlannerOutput> {
  const { document, playbook, config, llm } = input;
  const ourParty = input.parties?.ourParty ?? playbook.partyAliases[0] ?? "Customer";
  const counterparty = input.parties?.counterparty ?? playbook.counterpartyAliases[0] ?? "Vendor";
  const outline = document.sections.map((section) => ({
    id: section.id,
    number: section.number,
    heading: section.heading,
    firstText: firstText(document, section.paragraphIds),
  }));
  const response = await llm.complete({
    agent: "planner",
    effort: config.effort,
    model: config.model,
    system: cachedSystem(PLANNER_SYSTEM, playbook),
    messages: [
      {
        role: "user",
        content: [
          `Parties: our party=${ourParty}; counterparty=${counterparty}.`,
          `Sections:\n${JSON.stringify(outline)}`,
          `Defined terms: ${document.definitions.map((definition) => definition.term).join(", ") || "none"}.`,
          `Rules:\n${playbook.rules.map(ruleSummary).join("\n\n")}`,
        ].join("\n\n"),
      },
    ],
    schema: PlannerOutputSchema,
  });
  const returned = new Map(response.data.plans.map((plan) => [plan.ruleId, plan]));
  return {
    parties: response.data.parties,
    plans: playbook.rules.map(
      (rule): RulePlan =>
        returned.get(rule.id) ?? {
          ruleId: rule.id,
          candidateSectionIds: [],
          candidateParagraphIds: [],
          likelyAbsent: false,
          note: "Planner omitted this rule; worker must inspect independently.",
        },
    ),
  };
}

export function deterministicPlan(document: DocumentModel, playbook: Playbook, parties?: Partial<Parties>): PlannerOutput {
  return {
    parties: {
      ourParty: parties?.ourParty ?? playbook.partyAliases[0] ?? "Customer",
      counterparty: parties?.counterparty ?? playbook.counterpartyAliases[0] ?? "Vendor",
    },
    plans: playbook.rules.map((rule) => ({
      ruleId: rule.id,
      candidateSectionIds: document.sections.map((section) => section.id),
      candidateParagraphIds: [],
      likelyAbsent: false,
      note: "No planner call in this config; inspect the document with tools.",
    })),
  };
}
