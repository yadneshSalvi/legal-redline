import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { Command } from "commander";

import type { ReviewRun } from "@/src/agent/types";

function redact(text: string): string {
  return text
    .replace(/sk-[A-Za-z0-9_-]{8,}/g, "[REDACTED]")
    .replace(/("(?:apiKey|api_key|authorization|token|secret)"\s*:\s*)"[^"]+"/gi, "$1\"[REDACTED]\"");
}

async function atomicWrite(filename: string, content: string): Promise<void> {
  await mkdir(path.dirname(filename), { recursive: true });
  const temp = `${filename}.${randomUUID()}.tmp`;
  await writeFile(temp, content, "utf8");
  await rename(temp, filename);
}

async function main(): Promise<void> {
  const program = new Command()
    .option("--run <id>", "Export only one run")
    .option("--contract <id>", "Override contract directory name")
    .parse();
  const options = program.opts<{ run?: string; contract?: string }>();
  const root = path.resolve(process.cwd(), "data/runs");
  const runIds = options.run ? [options.run] : (await readdir(root, { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  let exported = 0;
  for (const runId of runIds) {
    try {
      const runText = await readFile(path.join(root, runId, "run.json"), "utf8");
      const run = JSON.parse(runText) as ReviewRun;
      const trajectory = await readFile(path.join(root, runId, "trajectory.jsonl"), "utf8");
      const contractId = options.contract ?? run.tags?.[0] ?? run.document.id;
      const destination = path.resolve(process.cwd(), "trajectories/app", run.config, contractId);
      await Promise.all([
        atomicWrite(path.join(destination, "run.json"), redact(runText)),
        atomicWrite(path.join(destination, "trajectory.jsonl"), redact(trajectory)),
      ]);
      exported += 1;
    } catch {
      // Skip incomplete/non-run directories such as replay caches.
    }
  }
  console.log(`Exported ${exported} run trajectories.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
