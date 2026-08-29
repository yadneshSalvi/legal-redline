import { z } from "zod";

import type { Decision } from "@/src/agent/types";
import { createTrajectoryWriter } from "@/src/agent/trajectory";
import { jsonError, loadRun, safeId, store } from "@/app/api/_shared";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DecisionSchema = z.object({
  findingId: z.string(),
  action: z.enum(["accept", "reject", "edit"]),
  ops: z.array(z.unknown()).optional(),
  comment: z.string().optional(),
  note: z.string().optional(),
  at: z.string(),
  by: z.string(),
});

export async function POST(request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id: rawId } = await context.params;
    const id = safeId(rawId);
    const run = await loadRun(id);
    if (!run) return jsonError("Run not found", 404);
    const body = z.object({ decisions: z.array(DecisionSchema) }).parse(await request.json());
    const decisions = body.decisions as Decision[];
    const trajectory = createTrajectoryWriter(store(), id);
    for (const decision of decisions) {
      if (!run.findings.some((finding) => finding.id === decision.findingId)) return jsonError(`Unknown finding: ${decision.findingId}`);
      run.decisions[decision.findingId] = decision;
      await trajectory.event("human", "human_decision", `${decision.action} ${decision.findingId}`, { findingId: decision.findingId, payload: decision });
    }
    await store().putJson(`runs/${id}/run.json`, run);
    return Response.json({ decisions: run.decisions });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : String(error));
  }
}
