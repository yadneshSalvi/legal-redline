import { jsonError, loadRun, store } from "@/app/api/_shared";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  const { id } = await context.params;
  const run = await loadRun(id);
  if (!run?.output) return jsonError("Memo not found", 404);
  const bytes = await store().getBytes(run.output.memoKey);
  return bytes ? new Response(Buffer.from(bytes), { headers: { "Content-Type": "text/markdown; charset=utf-8" } }) : jsonError("Memo not found", 404);
}
