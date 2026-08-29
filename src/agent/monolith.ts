import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

import type { LlmClient, RunnableTool } from "@/src/agent/llm";
import type { PrecedentMemory } from "@/src/agent/memory";
import type { PlannerOutput } from "@/src/agent/planner";
import { cachedSystem } from "@/src/agent/prompts/common";
import { MONOLITH_SYSTEM } from "@/src/agent/prompts/monolith";
import { createDrafterTools } from "@/src/agent/tools";
import type { Finding, PipelineConfig, Proposal } from "@/src/agent/types";
import type { DocumentModel, RedlineOp } from "@/src/engine/types";
import { renderParagraph, validateOp } from "@/src/engine";
import { ruleFull } from "@/src/playbook/loader";
import type { Playbook } from "@/src/playbook/schema";
import { stableFindingId } from "@/src/agent/id";

const OpSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("replace"), paragraphId: z.string(), oldText: z.string(), newText: z.string() }),
  z.object({ kind: z.literal("insert_after"), paragraphId: z.string(), text: z.string(), numbering: z.string().optional(), asHeading: z.boolean().optional() }),
  z.object({ kind: z.literal("delete_paragraph"), paragraphId: z.string() }),
]);
const ProposalInputSchema = z.object({ ruleId: z.string(), ops: z.array(OpSchema).min(1), comment: z.string(), level: z.enum(["preferred", "fallback"]), summary: z.string(), precedentId: z.string().optional() });
const SubmissionSchema = z.object({ ruleId: z.string(), status: z.enum(["deviation", "missing", "compliant", "needs_review"]), paragraphIds: z.array(z.string()), quote: z.string(), rationale: z.string(), confidence: z.number() });

async function safe(handler: () => unknown | Promise<unknown>): Promise<string> {
  try {
    return JSON.stringify(await handler());
  } catch (error) {
    return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
  }
}

export async function runMonolith(input: {
  document: DocumentModel;
  playbook: Playbook;
  config: PipelineConfig;
  llm: LlmClient;
  memory?: PrecedentMemory;
  planner?: PlannerOutput;
}): Promise<Finding[]> {
  const dummy = createDrafterTools({ document: input.document, config: input.config, ruleId: "*", memory: input.memory });
  const proposals = new Map<string, Proposal>();
  const submissions: z.infer<typeof SubmissionSchema>[] = [];
  const ruleIds = new Set(input.playbook.rules.map((rule) => rule.id));
  const tools: RunnableTool[] = [
    ...dummy.tools.slice(0, 5),
    betaZodTool({
      name: "lookup_precedent",
      description: "Retrieve approved precedents for a specified playbook rule when memory is enabled.",
      inputSchema: z.object({ ruleId: z.string(), context: z.string().optional() }),
      run: ({ ruleId, context }) => safe(async () => ({ precedents: input.config.precedentMemory && input.memory ? await input.memory.lookup(ruleId, context) : [] })),
    }),
    betaZodTool({
      name: "propose_redline",
      description: "Validate a minimal redline for one rule before submitting its finding.",
      inputSchema: ProposalInputSchema,
      run: (proposal) => safe(() => {
        if (!ruleIds.has(proposal.ruleId)) return { ok: false, errors: [`Unknown rule: ${proposal.ruleId}`], rendered: [] };
        const ops = proposal.ops as RedlineOp[];
        const errors = input.config.toolValidation
          ? ops.map((op) => validateOp(input.document, op).error).filter((error): error is string => Boolean(error))
          : [];
        const rendered = errors.length ? [] : [...new Set(ops.map((op) => op.paragraphId))].map((paragraphId) => ({ paragraphId, segments: renderParagraph(input.document, paragraphId, ops) }));
        if (!errors.length) proposals.set(proposal.ruleId, { ...proposal, ops });
        return { ok: !errors.length, errors, rendered };
      }),
    }),
    betaZodTool({
      name: "submit_finding",
      description: "Submit one final finding for a rule. Submit every playbook rule exactly once.",
      inputSchema: SubmissionSchema,
      run: (submission) => safe(() => {
        const errors: string[] = [];
        if (!ruleIds.has(submission.ruleId)) errors.push(`Unknown rule: ${submission.ruleId}`);
        if (submission.quote.length > 600) errors.push("quote exceeds 600 characters");
        if ((submission.status === "deviation" || submission.status === "missing") && !proposals.has(submission.ruleId)) errors.push("Validate a proposal first");
        if (errors.length) return { ok: false, errors };
        submissions.push(submission);
        return { ok: true, errors: [] };
      }),
    }),
  ];
  await input.llm.runTools({
    agent: "monolith",
    model: input.config.model,
    effort: input.config.effort,
    system: cachedSystem(MONOLITH_SYSTEM, input.playbook),
    messages: [{ role: "user", content: `Rules:\n${input.playbook.rules.map(ruleFull).join("\n\n---\n\n")}\n\nPlanner hints:\n${input.planner ? JSON.stringify(input.planner.plans) : "none"}\n\nReview every rule and submit one finding for each.` }],
    tools,
    maxIterations: 40,
  });
  return submissions.map((submission): Finding => {
    const rule = input.playbook.rules.find((candidate) => candidate.id === submission.ruleId);
    if (!rule) throw new Error(`Unknown monolith rule ${submission.ruleId}`);
    const paragraph = input.document.paragraphs.find((candidate) => candidate.id === submission.paragraphIds[0]);
    const section = input.document.sections.find((candidate) => candidate.id === paragraph?.sectionId);
    return {
      id: stableFindingId(rule.id, submission.paragraphIds, submission.status, submission.quote),
      ruleId: rule.id,
      ruleTitle: rule.title,
      severity: rule.severity,
      status: submission.status,
      paragraphIds: submission.paragraphIds,
      sectionId: paragraph?.sectionId,
      sectionRef: section ? `${section.number ? `§ ${section.number} ` : ""}${section.heading}` : undefined,
      quote: submission.quote,
      rationale: submission.rationale,
      proposal: proposals.get(rule.id),
      confidence: submission.confidence,
      producedBy: "monolith",
    };
  });
}
