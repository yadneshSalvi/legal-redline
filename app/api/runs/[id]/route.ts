import { jsonError, loadRun } from "@/app/api/_shared";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    const run = await loadRun(id);
    return run ? Response.json(run) : jsonError("Run not found", 404);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : String(error));
  }
}
