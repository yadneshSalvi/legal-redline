import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

import type { LlmClient, RunnableTool } from "@/src/agent/llm";
import type { Parties, PlannerOutput, RulePlan } from "@/src/agent/planner";
import { cachedSystem } from "@/src/agent/prompts/common";
import { LONG_DOCUMENT_PLANNER_SYSTEM } from "@/src/agent/prompts/longdoc-planner";
import type { PipelineConfig } from "@/src/agent/types";
import { findText } from "@/src/engine";
import type { DocumentModel } from "@/src/engine/types";
import { ruleSummary } from "@/src/playbook/loader";
import type { Playbook, Rule } from "@/src/playbook/schema";

const RulePlanSchema = z.object({
  ruleId: z.string(),
  candidateSectionIds: z.array(z.string()),
  candidateParagraphIds: z.array(z.string()),
  likelyAbsent: z.boolean(),
  note: z.string(),
});

const PlannerSubmissionSchema = z.object({
  parties: z.object({ ourParty: z.string(), counterparty: z.string() }),
  plans: z.array(RulePlanSchema),
});

const SEARCH_SEEDS: Readonly<Record<string, readonly string[]>> = {
  "LOL-CAP": ["limitation of liability", "aggregate liability", "consequential damages"],
  INDEMN: ["indemnif", "hold harmless", "defend"],
  NONCOMPETE: ["compete", "competing business", "field of use"],
  EXCLUSIVITY: ["exclusive", "sole supplier", "requirements from"],
  MFN: ["most favored", "most favoured", "more favourable"],
  NOSOLICIT: ["solicit", "hire", "employ"],
  T4C: ["for convenience", "without cause", "for any reason"],
  RENEWAL: ["automatically renew", "renewal term", "non-renewal"],
  GOVLAW: ["governed by", "governing law", "jurisdiction"],
  ASSIGN: ["assign", "change of control", "successor"],
  IP: ["work product", "deliverables", "customer data"],
  LICENSE: ["license grant", "licence grant", "non-transferable"],
  AUDIT: ["audit", "inspect", "books and records"],
  LD: ["liquidated damages", "penalty", "termination fee"],
  WARRANTY: ["warrant", "as is", "conform"],
  INSURANCE: ["insurance", "errors and omissions", "cyber"],
  MINCOMMIT: ["minimum", "take or pay", "shortfall"],
  TRANSITION: ["transition assistance", "return customer data", "termination assistance"],
};

interface SearchHit {
  paragraphId: string;
  sectionId?: string;
  sectionRef: string;
  snippet: string;
  query: string;
}

interface LongPlannerState {
  searchedRuleIds: Set<string>;
  submission?: PlannerOutput;
}

function sectionRef(document: DocumentModel, sectionId?: string): string {
  if (!sectionId) return "Preamble";
  const section = document.sections.find((candidate) => candidate.id === sectionId);
  if (!section) return sectionId;
  return `${section.number ? `§ ${section.number}` : "§"} ${section.heading}`.trim();
}

function searchRule(document: DocumentModel, ruleId: string, queries: readonly string[]): SearchHit[] {
  const hits = new Map<string, SearchHit>();
  for (const query of queries) {
    for (const match of findText(document, query, { limit: 8 })) {
      if (hits.has(match.paragraphId)) continue;
      const paragraph = document.paragraphs.find((candidate) => candidate.id === match.paragraphId);
      hits.set(match.paragraphId, {
        paragraphId: match.paragraphId,
        sectionId: paragraph?.sectionId,
        sectionRef: sectionRef(document, paragraph?.sectionId),
        snippet: match.snippet,
        query,
      });
      if (hits.size >= 16) return [...hits.values()];
    }
  }
  return [...hits.values()];
}

function uniqueExisting(values: readonly string[], allowed: ReadonlySet<string>, limit: number): string[] {
  return [...new Set(values)].filter((value) => allowed.has(value)).slice(0, limit);
}

function normalizeSubmission(
  document: DocumentModel,
  playbook: Playbook,
  submitted: z.infer<typeof PlannerSubmissionSchema>,
): PlannerOutput {
  const paragraphIds = new Set(document.paragraphs.map((paragraph) => paragraph.id));
  const sectionIds = new Set(document.sections.map((section) => section.id));
  const returned = new Map(submitted.plans.map((plan) => [plan.ruleId, plan]));
  return {
    parties: submitted.parties,
    plans: playbook.rules.map((rule): RulePlan => {
      const plan = returned.get(rule.id);
      if (!plan) return deterministicRulePlan(document, rule);
      return {
        ...plan,
        ruleId: rule.id,
        candidateSectionIds: uniqueExisting(plan.candidateSectionIds, sectionIds, 12),
        candidateParagraphIds: uniqueExisting(plan.candidateParagraphIds, paragraphIds, 30),
      };
    }),
  };
}

function deterministicRulePlan(document: DocumentModel, rule: Rule): RulePlan {
  const hits = searchRule(document, rule.id, SEARCH_SEEDS[rule.id] ?? [rule.title]);
  return {
    ruleId: rule.id,
    candidateSectionIds: [...new Set(hits.flatMap((hit) => hit.sectionId ? [hit.sectionId] : []))].slice(0, 12),
    candidateParagraphIds: hits.map((hit) => hit.paragraphId).slice(0, 30),
    likelyAbsent: hits.length === 0,
    note: hits.length === 0
      ? "Deterministic whole-document searches found no responsive phrase; worker must confirm absence."
      : `Deterministic whole-document search found ${hits.length} responsive paragraph(s).`,
  };
}

export function deterministicLongDocumentPlan(
  document: DocumentModel,
  playbook: Playbook,
  parties?: Partial<Parties>,
): PlannerOutput {
  return {
    parties: {
      ourParty: parties?.ourParty ?? playbook.partyAliases[0] ?? "Customer",
      counterparty: parties?.counterparty ?? playbook.counterpartyAliases[0] ?? "Vendor",
    },
    plans: playbook.rules.map((rule) => deterministicRulePlan(document, rule)),
  };
}

function plannerTools(input: {
  document: DocumentModel;
  playbook: Playbook;
  state: LongPlannerState;
}): RunnableTool[] {
  const { document, playbook, state } = input;
  const rules = new Set(playbook.rules.map((rule) => rule.id));
  return [
    betaZodTool({
      name: "search",
      description: "Search the whole document for one rule. Call at least once for every supplied rule id.",
      inputSchema: z.object({ ruleId: z.string(), queries: z.array(z.string().min(2)).min(1).max(6) }),
      run: ({ ruleId, queries }) => {
        try {
          if (!rules.has(ruleId)) return JSON.stringify({ ok: false, error: `Unknown rule: ${ruleId}` });
          state.searchedRuleIds.add(ruleId);
          return JSON.stringify({ ok: true, ruleId, hits: searchRule(document, ruleId, queries) });
        } catch (error) {
          return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
        }
      },
    }),
    betaZodTool({
      name: "submit_plan",
      description: "Submit one plan per rule only after the whole document has been searched for every rule.",
      inputSchema: PlannerSubmissionSchema,
      run: (submission) => {
        try {
          const missingSearches = playbook.rules.filter((rule) => !state.searchedRuleIds.has(rule.id)).map((rule) => rule.id);
          const counts = new Map<string, number>();
          for (const plan of submission.plans) counts.set(plan.ruleId, (counts.get(plan.ruleId) ?? 0) + 1);
          const missingPlans = playbook.rules.filter((rule) => counts.get(rule.id) !== 1).map((rule) => rule.id);
          const extras = submission.plans.filter((plan) => !rules.has(plan.ruleId)).map((plan) => plan.ruleId);
          const errors = [
            ...(missingSearches.length ? [`Search required for: ${missingSearches.join(", ")}`] : []),
            ...(missingPlans.length ? [`Exactly one plan required for: ${missingPlans.join(", ")}`] : []),
            ...(extras.length ? [`Unknown plan rules: ${[...new Set(extras)].join(", ")}`] : []),
          ];
          if (errors.length) return JSON.stringify({ ok: false, errors });
          state.submission = normalizeSubmission(document, playbook, submission);
          return JSON.stringify({ ok: true, rules: state.submission.plans.length });
        } catch (error) {
          return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
        }
      },
    }),
  ];
}

export async function planLongDocumentReview(input: {
  document: DocumentModel;
  playbook: Playbook;
  config: PipelineConfig;
  llm: LlmClient;
  parties?: Partial<Parties>;
}): Promise<PlannerOutput> {
  const fallback = deterministicLongDocumentPlan(input.document, input.playbook, input.parties);
  const state: LongPlannerState = { searchedRuleIds: new Set() };
  const definitions = input.document.definitions.map((definition) => ({
    term: definition.term,
    paragraphId: definition.paragraphId,
    text: definition.text,
  }));
  const outline = input.document.sections.map((section) => ({
    id: section.id,
    number: section.number,
    heading: section.heading,
    paragraphCount: section.paragraphIds.length,
  }));
  try {
    await input.llm.runTools({
      agent: "planner",
      model: input.config.model,
      effort: input.config.effort,
      system: cachedSystem(LONG_DOCUMENT_PLANNER_SYSTEM, input.playbook),
      messages: [{
        role: "user",
        content: [
          `Parties: our party=${fallback.parties.ourParty}; counterparty=${fallback.parties.counterparty}.`,
          `Defined-term map (consult first):\n${JSON.stringify(definitions)}`,
          `Section outline:\n${JSON.stringify(outline)}`,
          `Rules and suggested literal search seeds:\n${input.playbook.rules.map((rule) => `${ruleSummary(rule)}\nSeeds: ${(SEARCH_SEEDS[rule.id] ?? [rule.title]).join(" | ")}`).join("\n\n")}`,
          "Search every rule, preserve all responsive locations, then submit the complete plan.",
        ].join("\n\n"),
      }],
      tools: plannerTools({ document: input.document, playbook: input.playbook, state }),
      maxIterations: input.config.plannerMaxIterations,
    });
  } catch {
    // The deterministic plan performs the same whole-document per-rule searches and keeps long reviews moving
    // after an API interruption or a model that exhausts its bounded planning loop.
    return fallback;
  }
  return state.submission ?? fallback;
}
