import { applyDecisions } from "@/src/agent/apply";
import { jsonError, loadRun, safeId, store } from "@/app/api/_shared";

export const runtime = "nodejs";
export const maxDuration = 800;
export const dynamic = "force-dynamic";

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id: rawId } = await context.params;
    const id = safeId(rawId);
    const run = await loadRun(id);
    if (!run) return jsonError("Run not found", 404);
    const fs = store();
    const originalBytes = await fs.getBytes(run.sourceKey);
    if (!originalBytes) return jsonError("Run source is missing", 404);
    const applied = await applyDecisions({ run, originalBytes, store: fs });
    return Response.json({ output: applied.output });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : String(error));
  }
}
