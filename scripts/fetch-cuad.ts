import { mkdir, readFile, stat } from "node:fs/promises";
import { basename, dirname, join, normalize, relative, resolve } from "node:path";

import JSZip from "jszip";

import { atomicWrite } from "@/src/eval/io";

const CUAD_URL = "https://github.com/TheAtticusProject/cuad/raw/main/data.zip";
const rawRoot = resolve("data/raw");
const expected = join(rawRoot, "cuad", "CUADv1.json");

async function exists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

function safeArchivePath(name: string): string {
  const cleaned = normalize(name).replace(/^(?:\.\.(?:[/\\]|$))+/, "");
  const destination = resolve(rawRoot, cleaned);
  if (relative(rawRoot, destination).startsWith("..")) throw new Error(`Unsafe archive path: ${name}`);
  return destination;
}

async function main(): Promise<void> {
  if (await exists(expected)) {
    console.log(`CUAD already present at ${relative(process.cwd(), expected)}; skipping download.`);
    return;
  }

  const response = await fetch(CUAD_URL, { redirect: "follow" });
  if (!response.ok) throw new Error(`CUAD download failed: HTTP ${response.status}`);
  const zipBytes = new Uint8Array(await response.arrayBuffer());
  await atomicWrite(join(rawRoot, "cuad_data.zip"), zipBytes);
  const archive = await JSZip.loadAsync(zipBytes);
  let cuadBytes: Uint8Array | null = null;

  for (const [name, entry] of Object.entries(archive.files).sort(([left], [right]) => left.localeCompare(right))) {
    if (entry.dir) continue;
    const bytes = await entry.async("uint8array");
    const destination = safeArchivePath(name);
    await mkdir(dirname(destination), { recursive: true });
    await atomicWrite(destination, bytes);
    if (basename(name).toLocaleLowerCase("en-US") === "cuadv1.json") cuadBytes = bytes;
  }
  if (cuadBytes === null) {
    const downloaded = await readFile(join(rawRoot, "cuad_data.zip"));
    throw new Error(`Downloaded ${downloaded.byteLength} bytes, but the archive did not contain CUADv1.json`);
  }
  await atomicWrite(expected, cuadBytes);
  console.log(`CUAD extracted to ${relative(process.cwd(), expected)}.`);
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
