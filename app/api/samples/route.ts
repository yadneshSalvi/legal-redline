import type { Dirent } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface SampleMeta {
  id: string;
  title: string;
  words: number;
  source?: string;
  kind?: string;
}

export async function GET(): Promise<Response> {
  const root = path.resolve(process.cwd(), "data/contracts");
  let entries: Dirent[] = [];
  try { entries = await readdir(root, { withFileTypes: true }); } catch { return Response.json([]); }
  const samples = await Promise.all(entries.filter((entry) => entry.isDirectory()).map(async (entry) => {
    try {
      const meta = JSON.parse(await readFile(path.join(root, entry.name, "meta.json"), "utf8")) as SampleMeta;
      return { id: meta.id ?? entry.name, title: meta.title, words: meta.words, kind: meta.kind ?? (entry.name.startsWith("cuad-") ? "cuad" : "synthetic") };
    } catch { return null; }
  }));
  return Response.json(samples.filter((sample) => sample !== null));
}
