import type { Dirent } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const SAMPLE_ID = /^[A-Za-z0-9][A-Za-z0-9_-]{0,99}$/;
const SAMPLE_ROOT = path.join(process.cwd(), "data", "contracts");

interface SampleMeta {
  title?: string;
  words?: number;
  source?: string;
  kind?: string;
}

export interface PackagedSample {
  id: string;
  title: string;
  words: number;
  kind: string;
}

export async function listPackagedSamples(): Promise<PackagedSample[]> {
  let entries: Dirent[];
  try {
    entries = await readdir(SAMPLE_ROOT, { withFileTypes: true });
  } catch {
    return [];
  }
  const samples = await Promise.all(entries.filter((entry) => entry.isDirectory() && SAMPLE_ID.test(entry.name)).map(async (entry) => {
    try {
      const meta = JSON.parse(await readFile(path.join(SAMPLE_ROOT, entry.name, "meta.json"), "utf8")) as SampleMeta;
      return {
        id: entry.name,
        title: meta.title ?? entry.name,
        words: meta.words ?? 0,
        kind: meta.kind ?? (entry.name.startsWith("cuad-") ? "cuad" : "synthetic"),
      };
    } catch {
      return null;
    }
  }));
  return samples.filter((sample): sample is PackagedSample => sample !== null).sort((left, right) => left.id.localeCompare(right.id));
}

export async function loadPackagedSample(id: string): Promise<{ bytes: Uint8Array; filename: string } | null> {
  if (!SAMPLE_ID.test(id)) return null;
  const known = (await listPackagedSamples()).some((sample) => sample.id === id);
  if (!known) return null;
  for (const extension of ["docx", "txt"] as const) {
    try {
      const bytes = await readFile(path.join(SAMPLE_ROOT, id, `contract.${extension}`));
      return { bytes: new Uint8Array(bytes), filename: `${id}.${extension}` };
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") continue;
      throw error;
    }
  }
  return null;
}
