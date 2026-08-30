import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

import { activeElements, type ElementLists } from "@/src/agent/element-format";
import { elementCoverageGate, minimalityGate } from "@/src/agent/element-gates";
import { deterministicPreciseChecks, preciseMinimalityGate } from "@/src/agent/precise-element-gates";
import type { RunnableTool } from "@/src/agent/llm";
import type { PrecedentMemory } from "@/src/agent/memory";
import {
  validateProposal,
  validateSubmission,
  type DrafterToolState,
  type WorkerSubmission,
} from "@/src/agent/tools";
import type { ElementCoverage, FindingStatus, PipelineConfig } from "@/src/agent/types";
import { findText } from "@/src/engine";
import type { DocumentModel, RedlineOp } from "@/src/engine/types";
import type { Rule } from "@/src/playbook/schema";

const RedlineOpSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("replace"), paragraphId: z.string(), oldText: z.string(), newText: z.string() }),
  z.object({
    kind: z.literal("insert_after"),
    paragraphId: z.string(),
    text: z.string(),
    numbering: z.string().optional(),
    asHeading: z.boolean().optional(),
  }),
  z.object({ kind: z.literal("delete_paragraph"), paragraphId: z.string() }),
]);

const ProposalSchema = z.object({
  ops: z.array(RedlineOpSchema).min(1),
  comment: z.string(),
  level: z.enum(["preferred", "fallback"]),
  summary: z.string(),
  precedentId: z.string().optional(),
});

const ElementMappingSchema = z.discriminatedUnion("status", [
  z.object({ element: z.string(), status: z.literal("already_met"), quote: z.string() }),
  z.object({
    element: z.string(),
    status: z.literal("addressed_by_operation"),
    operationIndexes: z.array(z.number().int().positive()).min(1),
  }),
  z.object({ element: z.string(), status: z.literal("unaddressed"), explanation: z.string() }),
]);

const ElementCoverageSchema = z.object({
  level: z.enum(["preferred", "fallback"]),
  mappings: z.array(ElementMappingSchema).min(1),
});

const SubmissionSchema = z.object({
  status: z.enum(["deviation", "missing", "compliant", "needs_review"]),
  paragraphIds: z.array(z.string()),
  quote: z.string(),
  rationale: z.string(),
  confidence: z.number().min(0).max(1),
  proposal: ProposalSchema.optional(),
  elementCoverage: ElementCoverageSchema.optional(),
});

export interface ElementWorkerSubmission extends WorkerSubmission {
  elementCoverage?: ElementCoverage;
}

export interface ElementDrafterToolState {
  submission?: ElementWorkerSubmission;
  validatedProposal?: WorkerSubmission["proposal"];
}

function json(value: unknown): string {
  return JSON.stringify(value);
}

async function safe(handler: () => unknown | Promise<unknown>): Promise<string> {
  try {
    return json(await handler());
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : String(error) });
  }
}

function sectionRef(document: DocumentModel, sectionId?: string): string {
  if (!sectionId) return "Preamble";
  const section = document.sections.find((candidate) => candidate.id === sectionId);
  if (!section) return sectionId;
  return `${section.number ? `§ ${section.number}` : "§"} ${section.heading}`.trim();
}

function sectionParagraphs(document: DocumentModel, sectionId: string): Array<{ id: string; text: string }> | null {
  const section = document.sections.find((candidate) => candidate.id === sectionId);
  if (!section) return null;
  return section.paragraphIds.map((id) => ({
    id,
    text: document.paragraphs.find((paragraph) => paragraph.id === id)?.text ?? "",
  }));
}

function readSectionTool(document: DocumentModel, config: PipelineConfig): RunnableTool {
  if (!config.longDocumentPlanning || document.stats.words < config.longDocumentThresholdWords) {
    return betaZodTool({
      name: "read_section",
      description: "Read every paragraph in one likely clause section by stable section id.",
      inputSchema: z.object({ sectionId: z.string() }),
      run: ({ sectionId }) => safe(() => {
        const paragraphs = sectionParagraphs(document, sectionId);
        if (!paragraphs) return { ok: false, error: `Unknown section: ${sectionId}` };
        return { sectionRef: sectionRef(document, sectionId), paragraphs };
      }),
    });
  }
  return betaZodTool({
    name: "read_section",
    description: "Read a bounded page of a section. Follow nextCursor until null when the responsive clause spans pages.",
    inputSchema: z.object({
      sectionId: z.string(),
      cursor: z.number().int().nonnegative().optional(),
      limit: z.number().int().min(1).max(config.sectionPageSize).optional(),
    }),
    run: ({ sectionId, cursor, limit }) => safe(() => {
      const paragraphs = sectionParagraphs(document, sectionId);
      if (!paragraphs) return { ok: false, error: `Unknown section: ${sectionId}` };
      const start = cursor ?? 0;
      const size = limit ?? config.sectionPageSize;
      const page = paragraphs.slice(start, start + size);
      const nextCursor = start + page.length < paragraphs.length ? start + page.length : null;
      return {
        sectionRef: sectionRef(document, sectionId),
        cursor: start,
        totalParagraphs: paragraphs.length,
        nextCursor,
        paragraphs: page,
      };
    }),
  });
}

function precedentTemplate(rule: Rule, precedent: Awaited<ReturnType<PrecedentMemory["lookup"]>>[number], lists: ElementLists): unknown {
  const elements = lists[precedent.level];
  return {
    id: precedent.id,
    source: precedent.source,
    level: precedent.level,
    comment: precedent.comment,
    template: {
      elements: elements.map((element, index) => ({ marker: `${precedent.level === "preferred" ? "P" : "F"}${index + 1}`, element })),
      approvedLanguage: precedent.clauseAfter,
    },
  };
}

export function createElementDrafterTools(options: {
  document: DocumentModel;
  config: PipelineConfig;
  rule: Rule;
  memory?: PrecedentMemory;
  state?: ElementDrafterToolState;
  /** Precise repair starts after classification and may not erase or change that detection result. */
  expectedStatus?: FindingStatus;
  /** At least one established source anchor must survive precision repair for a present clause. */
  requiredParagraphIds?: readonly string[];
}): { tools: RunnableTool[]; state: ElementDrafterToolState } {
  const { document, config, rule, memory } = options;
  const state = options.state ?? {};
  const tools: RunnableTool[] = [
    betaZodTool({
      name: "list_sections",
      description: "List the document section outline when planner hints are insufficient.",
      inputSchema: z.object({}),
      run: () => safe(() => document.sections.map((section) => ({
        id: section.id,
        number: section.number,
        heading: section.heading,
        level: section.level,
        paragraphCount: section.paragraphIds.length,
      }))),
    }),
    readSectionTool(document, config),
    betaZodTool({
      name: "read_paragraphs",
      description: "Read specific planner, search, nearby, or cross-referenced paragraphs by stable id.",
      inputSchema: z.object({ paragraphIds: z.array(z.string()).min(1).max(40) }),
      run: ({ paragraphIds }) => safe(() => paragraphIds.map((id) => {
        const paragraph = document.paragraphs.find((candidate) => candidate.id === id);
        return paragraph
          ? { id, sectionRef: sectionRef(document, paragraph.sectionId), text: paragraph.text }
          : { id, error: `Unknown paragraph: ${id}` };
      })),
    }),
    betaZodTool({
      name: "search",
      description: "Search the entire document. Use multiple targeted searches and inspect every responsive clause, not only the first hit.",
      inputSchema: z.object({ query: z.string(), regex: z.boolean().optional(), limit: z.number().int().min(1).max(50).optional() }),
      run: ({ query, regex, limit }) => safe(() => {
        const needle = regex ? new RegExp(query, "i") : query;
        return findText(document, needle, { limit: limit ?? 20 }).map((match) => {
          const paragraph = document.paragraphs.find((candidate) => candidate.id === match.paragraphId);
          return { paragraphId: match.paragraphId, sectionRef: sectionRef(document, paragraph?.sectionId), snippet: match.snippet };
        });
      }),
    }),
    betaZodTool({
      name: "get_definition",
      description: "Resolve every defined term material to scope, amount, direction, duration, or a cross-reference.",
      inputSchema: z.object({ term: z.string() }),
      run: ({ term }) => safe(() => {
        const normalized = term.trim().toLowerCase();
        const found = document.definitions.find((definition) => definition.term.toLowerCase() === normalized);
        if (found) return { found: true, term: found.term, paragraphId: found.paragraphId, text: found.text };
        const nearest = document.definitions
          .filter((definition) => definition.term.toLowerCase().includes(normalized) || normalized.includes(definition.term.toLowerCase()))
          .slice(0, 5)
          .map((definition) => definition.term);
        return { found: false, nearest };
      }),
    }),
    betaZodTool({
      name: "lookup_precedent",
      description: "Retrieve approved language as an element-labelled template; adapt it to the current clause and re-check every marker.",
      inputSchema: z.object({ ruleId: z.string(), context: z.string().optional() }),
      run: ({ ruleId, context }) => safe(async () => {
        if (!config.precedentMemory || !memory) return { precedents: [] };
        if (ruleId !== rule.id) return { ok: false, error: `Worker may only retrieve ${rule.id} precedents` };
        const precedents = await memory.lookup(ruleId, context ?? "");
        return {
          precedents: config.elementMarkedMemory
            ? precedents.map((precedent) => precedentTemplate(rule, precedent, activeElements(rule, config)))
            : precedents.map(({ id, source, clauseAfter, comment, level }) => ({ id, source, clauseAfter, comment, level })),
        };
      }),
    }),
    betaZodTool({
      name: "propose_redline",
      description: "Validate anchors, rendering, and the deterministic minimality gate. Correct every error before submission.",
      inputSchema: ProposalSchema,
      run: (proposal) => safe(() => {
        const typed = { ...proposal, ops: proposal.ops as RedlineOp[] };
        const temporary: DrafterToolState = {};
        const base = validateProposal(document, config, temporary, typed);
        const minimality = config.preciseElementProtocol
          ? preciseMinimalityGate(document, options.expectedStatus ?? "deviation", typed.ops)
          : minimalityGate("deviation", typed.ops);
        const precision = config.preciseElementProtocol
          ? deterministicPreciseChecks({
              document,
              rule,
              status: options.expectedStatus ?? "deviation",
              target: typed.level,
              paragraphIds: [
                ...(options.requiredParagraphIds ?? []),
                ...typed.ops.map((op) => op.paragraphId),
              ],
              ops: typed.ops,
            })
          : undefined;
        const precisionErrors = precision?.checks
          .filter((check) => !check.ok)
          .map((check) => `${check.name}: ${check.detail ?? "failed"}`) ?? minimality.errors;
        const errors = [...base.errors, ...precisionErrors];
        if (errors.length === 0) state.validatedProposal = typed;
        return { ok: errors.length === 0, errors, rendered: base.rendered, minimality, precisionChecks: precision?.checks };
      }),
    }),
    betaZodTool({
      name: "submit_finding",
      description: "Submit once. Actionable findings require exact coverage of every selected checklist element.",
      inputSchema: SubmissionSchema,
      run: (submission) => safe(() => {
        if (state.submission) return { ok: false, errors: ["submit_finding already succeeded for this rule"] };
        const typed: ElementWorkerSubmission = {
          ...submission,
          paragraphIds: submission.paragraphIds,
          proposal: submission.proposal === undefined
            ? undefined
            : { ...submission.proposal, ops: submission.proposal.ops as RedlineOp[] },
          elementCoverage: submission.elementCoverage as ElementCoverage | undefined,
        };
        const baseState: DrafterToolState = { validatedProposal: state.validatedProposal };
        const base = validateSubmission(document, baseState, typed);
        const coverage = elementCoverageGate({
          document,
          rule,
          elements: activeElements(rule, config),
          status: typed.status,
          paragraphIds: typed.paragraphIds,
          proposalLevel: typed.proposal?.level,
          operationCount: typed.proposal?.ops.length ?? 0,
          coverage: typed.elementCoverage,
        });
        const missingMinimality = typed.status === "missing" && typed.proposal
          ? config.preciseElementProtocol
            ? preciseMinimalityGate(document, typed.status, typed.proposal.ops)
            : minimalityGate(typed.status, typed.proposal.ops)
          : { ok: true, errors: [] };
        const statusErrors = options.expectedStatus !== undefined && typed.status !== options.expectedStatus
          ? [`Detection status is locked as ${options.expectedStatus}; precise repair may not submit ${typed.status}`]
          : [];
        const anchorErrors = options.requiredParagraphIds !== undefined && options.requiredParagraphIds.length > 0 &&
          !options.requiredParagraphIds.some((paragraphId) => typed.paragraphIds.includes(paragraphId))
          ? ["Precision repair must retain at least one paragraph from the established finding"]
          : [];
        const errors = [...base.errors, ...coverage.errors, ...missingMinimality.errors, ...statusErrors, ...anchorErrors];
        if (errors.length === 0) {
          state.submission = {
            ...typed,
            proposal: typed.status === "deviation" || typed.status === "missing" ? state.validatedProposal : undefined,
          };
        }
        return { ok: errors.length === 0, errors };
      }),
    }),
  ];
  return { tools, state };
}
