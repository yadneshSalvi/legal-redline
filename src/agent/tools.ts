import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

import type { FindingStatus, PipelineConfig, PositionLevel } from "@/src/agent/types";
import type { DocumentModel, RedlineOp } from "@/src/engine/types";
import { findText, renderParagraph, validateComment, validateOp } from "@/src/engine";
import type { PrecedentMemory } from "@/src/agent/memory";
import type { RunnableTool } from "@/src/agent/llm";

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

const SubmissionSchema = z.object({
  status: z.enum(["deviation", "missing", "compliant", "needs_review"]),
  paragraphIds: z.array(z.string()),
  quote: z.string(),
  rationale: z.string(),
  confidence: z.number().min(0).max(1),
  proposal: ProposalSchema.optional(),
});

export interface WorkerSubmission {
  status: FindingStatus;
  paragraphIds: string[];
  quote: string;
  rationale: string;
  confidence: number;
  proposal?: { ops: RedlineOp[]; comment: string; level: PositionLevel; summary: string; precedentId?: string };
}

export interface DrafterToolState {
  submission?: WorkerSubmission;
  validatedProposal?: WorkerSubmission["proposal"];
}

export interface CreateDrafterToolsOptions {
  document: DocumentModel;
  config: PipelineConfig;
  ruleId: string;
  memory?: PrecedentMemory;
  state?: DrafterToolState;
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
  const prefix = section.number ? `§ ${section.number}` : "§";
  return `${prefix} ${section.heading}`.trim();
}

function uniqueParagraphIds(ops: RedlineOp[]): string[] {
  return [...new Set(ops.map((op) => op.paragraphId))];
}

export function createDrafterTools(options: CreateDrafterToolsOptions): { tools: RunnableTool[]; state: DrafterToolState } {
  const { document, config, ruleId, memory } = options;
  const state = options.state ?? {};

  const tools: RunnableTool[] = [
    betaZodTool({
      name: "list_sections",
      description: "List the document section outline. Call this before choosing a clause location when plan hints are insufficient.",
      inputSchema: z.object({}),
      run: () =>
        safe(() =>
          document.sections.map((section) => ({
            id: section.id,
            number: section.number,
            heading: section.heading,
            level: section.level,
            paragraphCount: section.paragraphIds.length,
          })),
        ),
    }),
    betaZodTool({
      name: "read_section",
      description: "Read every paragraph in one section by stable section id. Use for a likely clause section or cross-reference.",
      inputSchema: z.object({ sectionId: z.string() }),
      run: ({ sectionId }) =>
        safe(() => {
          const section = document.sections.find((candidate) => candidate.id === sectionId);
          if (!section) return { ok: false, error: `Unknown section: ${sectionId}` };
          return {
            sectionRef: sectionRef(document, sectionId),
            paragraphs: section.paragraphIds.map((id) => ({
              id,
              text: document.paragraphs.find((paragraph) => paragraph.id === id)?.text ?? "",
            })),
          };
        }),
    }),
    betaZodTool({
      name: "read_paragraphs",
      description: "Read specific paragraphs by stable id. Use for planner candidates, nearby anchors, and referenced clauses.",
      inputSchema: z.object({ paragraphIds: z.array(z.string()).min(1).max(30) }),
      run: ({ paragraphIds }) =>
        safe(() =>
          paragraphIds.map((id) => {
            const paragraph = document.paragraphs.find((candidate) => candidate.id === id);
            return paragraph
              ? { id, sectionRef: sectionRef(document, paragraph.sectionId), text: paragraph.text }
              : { id, error: `Unknown paragraph: ${id}` };
          }),
        ),
    }),
    betaZodTool({
      name: "search",
      description: "Search document text and return paragraph ids plus snippets. Use literal search by default; use regex only for a targeted pattern.",
      inputSchema: z.object({ query: z.string(), regex: z.boolean().optional(), limit: z.number().int().min(1).max(50).optional() }),
      run: ({ query, regex, limit }) =>
        safe(() => {
          const needle = regex ? new RegExp(query, "i") : query;
          return findText(document, needle, { limit: limit ?? 20 }).map((match) => {
            const paragraph = document.paragraphs.find((candidate) => candidate.id === match.paragraphId);
            return {
              paragraphId: match.paragraphId,
              sectionRef: sectionRef(document, paragraph?.sectionId),
              snippet: match.snippet,
            };
          });
        }),
    }),
    betaZodTool({
      name: "get_definition",
      description: "Resolve a defined term before judging cap bases, obligations, or cross-references.",
      inputSchema: z.object({ term: z.string() }),
      run: ({ term }) =>
        safe(() => {
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
      description: "Retrieve up to three approved clauses for the current rule. Use when memory is enabled and model language would improve consistency.",
      inputSchema: z.object({ ruleId: z.string(), context: z.string().optional() }),
      run: ({ ruleId: requestedRule, context }) =>
        safe(async () => {
          if (!config.precedentMemory || !memory) return { precedents: [] };
          if (requestedRule !== ruleId) return { ok: false, error: `Worker may only retrieve ${ruleId} precedents` };
          const precedents = await memory.lookup(ruleId, context ?? "");
          return {
            precedents: precedents.map(({ id, source, clauseAfter, comment, level }) => ({ id, source, clauseAfter, comment, level })),
          };
        }),
    }),
    betaZodTool({
      name: "propose_redline",
      description: "Validate a proposed minimal redline before submitting a deviation or missing finding. Correct all returned errors and call again until ok:true.",
      inputSchema: ProposalSchema,
      run: (proposal) =>
        safe(() => {
          const typedProposal = { ...proposal, ops: proposal.ops as RedlineOp[] };
          if (!config.toolValidation) {
            state.validatedProposal = typedProposal;
            return { ok: true, errors: [], rendered: [] };
          }
          const errors = typedProposal.ops
            .map((op) => validateOp(document, op).error)
            .filter((error): error is string => Boolean(error));
          const first = typedProposal.ops[0];
          if (first) {
            const comment = validateComment(document, {
              paragraphId: first.paragraphId,
              anchorText: first.kind === "replace" ? first.oldText : undefined,
              text: typedProposal.comment,
            });
            if (!comment.ok && comment.error) errors.push(comment.error);
          }
          const rendered = uniqueParagraphIds(typedProposal.ops).flatMap((paragraphId) => {
            try {
              return [{ paragraphId, segments: renderParagraph(document, paragraphId, typedProposal.ops) }];
            } catch (error) {
              errors.push(error instanceof Error ? error.message : String(error));
              return [];
            }
          });
          if (!errors.length) state.validatedProposal = typedProposal;
          return { ok: !errors.length, errors, rendered };
        }),
    }),
    betaZodTool({
      name: "submit_finding",
      description: "Submit the final finding for this rule. After a successful call, stop calling tools.",
      inputSchema: SubmissionSchema,
      run: (submission) =>
        safe(() => {
          const errors: string[] = [];
          if (submission.quote.length > 600) errors.push("quote exceeds 600 characters");
          for (const id of submission.paragraphIds) {
            if (!document.paragraphs.some((paragraph) => paragraph.id === id)) errors.push(`Unknown paragraph: ${id}`);
          }
          if (submission.quote && !submission.paragraphIds.some((id) => document.paragraphs.find((p) => p.id === id)?.text.includes(submission.quote))) {
            errors.push("quote is not a verbatim substring of a cited paragraph");
          }
          const needsProposal = submission.status === "deviation" || submission.status === "missing";
          if (needsProposal && !state.validatedProposal) errors.push("Call propose_redline successfully before submit_finding");
          if (submission.proposal && state.validatedProposal && json(submission.proposal) !== json(state.validatedProposal)) {
            errors.push("Submitted proposal differs from the validated proposal");
          }
          if (errors.length) return { ok: false, errors };
          state.submission = {
            ...submission,
            paragraphIds: submission.paragraphIds,
            proposal: needsProposal ? state.validatedProposal : undefined,
          };
          return { ok: true, errors: [] };
        }),
    }),
  ];

  return { tools, state };
}
