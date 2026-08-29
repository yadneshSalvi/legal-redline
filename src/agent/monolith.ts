import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

import { stableFindingId } from "@/src/agent/id";
import type { LlmClient, RunnableTool } from "@/src/agent/llm";
import type { PrecedentMemory } from "@/src/agent/memory";
import type { PlannerOutput } from "@/src/agent/planner";
import { cachedSystem } from "@/src/agent/prompts/common";
import { MONOLITH_SYSTEM } from "@/src/agent/prompts/monolith";
import {
  createDrafterTools,
  validateProposal,
  validateSubmission,
  type DrafterToolState,
  type WorkerSubmission,
} from "@/src/agent/tools";
import type { Finding, PipelineConfig } from "@/src/agent/types";
import type { DocumentModel, RedlineOp } from "@/src/engine/types";
import { ruleFull } from "@/src/playbook/loader";
import type { Playbook, Rule } from "@/src/playbook/schema";

const OpSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("replace"), paragraphId: z.string(), oldText: z.string(), newText: z.string() }),
  z.object({ kind: z.literal("insert_after"), paragraphId: z.string(), text: z.string(), numbering: z.string().optional(), asHeading: z.boolean().optional() }),
  z.object({ kind: z.literal("delete_paragraph"), paragraphId: z.string() }),
]);
const ProposalInputSchema = z.object({
  ruleId: z.string(), ops: z.array(OpSchema).min(1), comment: z.string(),
  level: z.enum(["preferred", "fallback"]), summary: z.string(), precedentId: z.string().optional(),
});
const SubmissionSchema = z.object({
  ruleId: z.string(), status: z.enum(["deviation", "missing", "compliant", "needs_review"]),
  paragraphIds: z.array(z.string()), quote: z.string(), rationale: z.string(), confidence: z.number().min(0).max(1),
});

async function safe(handler: () => unknown | Promise<unknown>): Promise<string> {
  try {
    return JSON.stringify(await handler());
  } catch (error) {
    return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
  }
}

function toFinding(document: DocumentModel, rule: Rule, state: DrafterToolState): Finding {
  const submission = state.submission;
  if (!submission) throw new Error(`Missing monolith submission for ${rule.id}`);
  const paragraph = document.paragraphs.find((candidate) => candidate.id === submission.paragraphIds[0]);
  const section = document.sections.find((candidate) => candidate.id === paragraph?.sectionId);
  return {
    id: stableFindingId(rule.id, submission.paragraphIds, submission.status, submission.quote),
    ruleId: rule.id, ruleTitle: rule.title, severity: rule.severity, status: submission.status,
    paragraphIds: submission.paragraphIds, sectionId: paragraph?.sectionId,
    sectionRef: section ? `${section.number ? `§ ${section.number} ` : ""}${section.heading}` : undefined,
    quote: submission.quote, rationale: submission.rationale, proposal: submission.proposal,
    confidence: submission.confidence, producedBy: "monolith",
  };
}

export async function runMonolith(input: {
  document: DocumentModel;
  playbook: Playbook;
  config: PipelineConfig;
  llm: LlmClient;
  memory?: PrecedentMemory;
  planner?: PlannerOutput;
  onFinding?: (finding: Finding) => void | Promise<void>;
}): Promise<Finding[]> {
  const documentTools = createDrafterTools({ document: input.document, config: input.config, ruleId: "*" }).tools.slice(0, 5);
  const rules = new Map(input.playbook.rules.map((rule) => [rule.id, rule]));
  const states = new Map<string, DrafterToolState>();
  const findings = new Map<string, Finding>();
  const stateFor = (ruleId: string): DrafterToolState => {
    const state = states.get(ruleId) ?? {};
    states.set(ruleId, state);
    return state;
  };
  const tools: RunnableTool[] = [
    ...documentTools,
    betaZodTool({
      name: "lookup_precedent",
      description: "Retrieve approved precedents for a specified playbook rule when memory is enabled.",
      inputSchema: z.object({ ruleId: z.string(), context: z.string().optional() }),
      run: ({ ruleId, context }) => safe(async () => {
        if (!rules.has(ruleId)) return { ok: false, error: `Unknown rule: ${ruleId}` };
        const precedents = input.config.precedentMemory && input.memory ? await input.memory.lookup(ruleId, context) : [];
        return { precedents };
      }),
    }),
    betaZodTool({
      name: "propose_redline",
      description: "Validate a minimal redline for one rule before submitting its finding.",
      inputSchema: ProposalInputSchema,
      run: ({ ruleId, ...proposal }) => safe(() => {
        if (!rules.has(ruleId)) return { ok: false, errors: [`Unknown rule: ${ruleId}`], rendered: [] };
        return validateProposal(input.document, input.config, stateFor(ruleId), { ...proposal, ops: proposal.ops as RedlineOp[] });
      }),
    }),
    betaZodTool({
      name: "submit_finding",
      description: "Submit each playbook rule exactly once, then stop after every rule succeeds.",
      inputSchema: SubmissionSchema,
      run: ({ ruleId, ...submission }) => safe(async () => {
        const rule = rules.get(ruleId);
        if (!rule) return { ok: false, errors: [`Unknown rule: ${ruleId}`] };
        const state = stateFor(ruleId);
        const result = validateSubmission(input.document, state, submission as WorkerSubmission);
        if (!result.ok) return result;
        const finding = toFinding(input.document, rule, state);
        findings.set(ruleId, finding);
        await input.onFinding?.(finding);
        return result;
      }),
    }),
  ];
  await input.llm.runTools({
    agent: "monolith", model: input.config.model, effort: input.config.effort,
    system: cachedSystem(MONOLITH_SYSTEM, input.playbook),
    messages: [{
      role: "user",
      content: `Rules:\n${input.playbook.rules.map(ruleFull).join("\n\n---\n\n")}\n\nPlanner hints:\n${input.planner ? JSON.stringify(input.planner.plans) : "none"}\n\nReview every rule and submit each rule exactly once.`,
    }],
    tools,
    maxIterations: 40,
  });
  const missing = input.playbook.rules.filter((rule) => !findings.has(rule.id)).map((rule) => rule.id);
  if (missing.length) throw new Error(`Monolith stopped without submissions for: ${missing.join(", ")}`);
  return input.playbook.rules.map((rule) => findings.get(rule.id)).filter((finding): finding is Finding => Boolean(finding));
}
