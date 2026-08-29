import { jsonError, loadRun, store } from "@/app/api/_shared";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  const { id } = await context.params;
  const run = await loadRun(id);
  if (!run?.output) return jsonError("Output not found", 404);
  const bytes = await store().getBytes(run.output.docxKey);
  if (!bytes) return jsonError("Output not found", 404);
  return new Response(Buffer.from(bytes), { headers: { "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "Content-Disposition": `attachment; filename="${id}-redlined.docx"` } });
}
