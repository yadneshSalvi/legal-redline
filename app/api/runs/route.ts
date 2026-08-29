import { nanoid } from "nanoid";

import { getConfig } from "@/src/agent/configs";
import type { ReviewRun } from "@/src/agent/types";
import { parseDocx, parseText } from "@/src/engine";
import { loadPlaybook } from "@/src/playbook/loader";
import { initialStats, jsonError, MAX_UPLOAD_BYTES, safeId, store } from "@/app/api/_shared";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function sampleBytes(sampleId: string): Promise<{ bytes: Uint8Array; filename: string }> {
  const id = safeId(sampleId);
  const fs = store();
  const docx = await fs.getBytes(`contracts/${id}/contract.docx`);
  if (docx) return { bytes: docx, filename: `${id}.docx` };
  const text = await fs.getBytes(`contracts/${id}/contract.txt`);
  if (text) return { bytes: text, filename: `${id}.txt` };
  throw new Error(`Unknown sample: ${id}`);
}

export async function POST(request: Request): Promise<Response> {
  try {
    const form = await request.formData();
    const configId = String(form.get("config") ?? "final");
    const playbookId = String(form.get("playbookId") ?? "customer-vendor-services-v1");
    getConfig(configId);
    await loadPlaybook(playbookId);
    const upload = form.get("file");
    const sampleId = form.get("sampleId");
    let source: { bytes: Uint8Array; filename: string };
    if (upload instanceof File && upload.size > 0) {
      if (upload.size > MAX_UPLOAD_BYTES) return jsonError("File exceeds the 5 MB limit", 413);
      source = { bytes: new Uint8Array(await upload.arrayBuffer()), filename: upload.name };
    } else if (typeof sampleId === "string" && sampleId) {
      source = await sampleBytes(sampleId);
    } else {
      return jsonError("Provide a .docx/.txt file or sampleId");
    }
    const extension = source.filename.toLowerCase().endsWith(".docx") ? "docx" : source.filename.toLowerCase().endsWith(".txt") ? "txt" : null;
    if (!extension) return jsonError("Only .docx and .txt files are accepted");
    const document = extension === "docx"
      ? await parseDocx(source.bytes, source.filename)
      : parseText(new TextDecoder().decode(source.bytes), source.filename);
    const id = nanoid(14);
    const createdAt = new Date().toISOString();
    const sourceKey = `runs/${id}/source.${extension}`;
    const run: ReviewRun = {
      id,
      createdAt,
      status: "queued",
      config: getConfig(configId).id,
      playbookId,
      document,
      sourceKey,
      findings: [],
      decisions: {},
      stats: initialStats(createdAt),
      ...(typeof sampleId === "string" && sampleId ? { tags: [sampleId] } : {}),
    };
    const fs = store();
    await Promise.all([
      fs.putBytes(sourceKey, source.bytes, extension === "docx" ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "text/plain"),
      fs.putJson(`runs/${id}/run.json`, run),
    ]);
    return Response.json({ runId: id }, { status: 201 });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : String(error));
  }
}

export async function GET(): Promise<Response> {
  const fs = store();
  const keys = (await fs.list("runs")).filter((key) => /\/run\.json$/.test(key));
  const runs = (await Promise.all(keys.map((key) => fs.getJson<ReviewRun>(key))))
    .filter((run): run is ReviewRun => Boolean(run))
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  return Response.json(runs);
}
