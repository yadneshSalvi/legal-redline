import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    const raw = await readFile(path.resolve(process.cwd(), "evals/results/changelog-data.json"), "utf8");
    return new Response(raw, { headers: { "Content-Type": "application/json" } });
  } catch {
    return Response.json([]);
  }
}
