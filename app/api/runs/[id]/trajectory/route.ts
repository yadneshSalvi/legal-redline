import type { TrajectoryEvent } from "@/src/agent/types";
import { jsonError, parseJsonLines, safeId, store } from "@/app/api/_shared";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id: rawId } = await context.params;
    const id = safeId(rawId);
    const after = Number(new URL(request.url).searchParams.get("after") ?? 0) || 0;
    const events = parseJsonLines<TrajectoryEvent>(await store().getBytes(`runs/${id}/trajectory.jsonl`)).filter((event) => event.seq > after);
    return Response.json(events);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : String(error));
  }
}
