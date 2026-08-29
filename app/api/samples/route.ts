import { listPackagedSamples } from "@/app/api/_samples";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  return Response.json(await listPackagedSamples());
}
