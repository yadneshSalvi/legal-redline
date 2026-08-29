import { z } from "zod";

import { createTrajectoryWriter } from "@/src/agent/trajectory";
import { jsonError, loadRun, safeId, store } from "@/app/api/_shared";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RedlineOpSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("replace"), paragraphId: z.string().min(1), oldText: z.string(), newText: z.string() }),
  z.object({ kind: z.literal("insert_after"), paragraphId: z.string().min(1), text: z.string(), numbering: z.string().optional(), asHeading: z.boolean().optional() }),
  z.object({ kind: z.literal("delete_paragraph"), paragraphId: z.string().min(1) }),
]);
const CommonDecision = { findingId: z.string().min(1), note: z.string().optional(), at: z.string().min(1), by: z.string().min(1) };
const DecisionSchema = z.discriminatedUnion("action", [
  z.object({ ...CommonDecision, action: z.literal("accept"), ops: z.never().optional(), comment: z.never().optional() }),
  z.object({ ...CommonDecision, action: z.literal("reject"), ops: z.never().optional(), comment: z.never().optional() }),
  z.object({ ...CommonDecision, action: z.literal("edit"), ops: z.array(RedlineOpSchema).min(1), comment: z.string().min(1) }),
]);
const DecisionBatchSchema = z.object({ decisions: z.array(DecisionSchema) });

function issueMessage(error: z.ZodError): string {
  return error.issues.map((issue) => `${issue.path.join(".") || "decisions"}: ${issue.message}`).join("; ");
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id: rawId } = await context.params;
    const id = safeId(rawId);
    const run = await loadRun(id);
    if (!run) return jsonError("Run not found", 404);
    const parsed = DecisionBatchSchema.safeParse(await request.json());
    if (!parsed.success) return jsonError(`Invalid decisions: ${issueMessage(parsed.error)}`);
    const findingIds = new Set(run.findings.map((finding) => finding.id));
    const unknown = parsed.data.decisions.find((decision) => !findingIds.has(decision.findingId));
    if (unknown) return jsonError(`Unknown finding: ${unknown.findingId}`);
    const duplicates = parsed.data.decisions.filter((decision, index, all) => all.findIndex((item) => item.findingId === decision.findingId) !== index);
    if (duplicates.length) return jsonError(`Duplicate decision for finding: ${duplicates[0]?.findingId}`);
    const fs = store();
    const trajectory = createTrajectoryWriter(fs, id);
    for (const decision of parsed.data.decisions) {
      run.decisions[decision.findingId] = decision;
      await trajectory.event("human", "human_decision", `${decision.action} ${decision.findingId}`, {
        findingId: decision.findingId,
        payload: decision,
        idempotencyKey: `human-decision:${run.id}:${decision.findingId}:${decision.action}:${decision.at}`,
      });
    }
    await fs.putJson(`runs/${id}/run.json`, run);
    return Response.json({ decisions: run.decisions });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : String(error));
  }
}
