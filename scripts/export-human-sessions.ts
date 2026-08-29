import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import type { Decision, ReviewRun } from "@/src/agent/types";
import { atomicWriteJson } from "@/src/eval/io";

interface HumanSession {
  runId: string;
  contractId: string;
  config: string;
  decisions: Decision[];
  counts: { accept: number; edit: number; reject: number };
  reviewer: string;
  at: string;
}

async function runDirectories(root: string): Promise<string[]> {
  try {
    return (await readdir(root, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return [];
    throw error;
  }
}

function contractId(run: ReviewRun): string {
  return run.tags?.find((tag) => tag !== "eval") ?? run.document.id;
}

function sessionFor(run: ReviewRun): HumanSession | undefined {
  const decisions = Object.values(run.decisions).sort((left, right) =>
    left.at.localeCompare(right.at) || left.findingId.localeCompare(right.findingId));
  if (decisions.length === 0) return undefined;
  const reviewers = [...new Set(decisions.map((decision) => decision.by))].sort((left, right) => left.localeCompare(right));
  return {
    runId: run.id,
    contractId: contractId(run),
    config: run.config,
    decisions,
    counts: {
      accept: decisions.filter((decision) => decision.action === "accept").length,
      edit: decisions.filter((decision) => decision.action === "edit").length,
      reject: decisions.filter((decision) => decision.action === "reject").length,
    },
    reviewer: reviewers.join(", "),
    at: decisions[decisions.length - 1].at,
  };
}

async function main(): Promise<void> {
  const root = process.cwd();
  const runsRoot = path.join(root, "data/runs");
  let exported = 0;
  for (const directory of await runDirectories(runsRoot)) {
    try {
      const run = JSON.parse(await readFile(path.join(runsRoot, directory, "run.json"), "utf8")) as ReviewRun;
      const session = sessionFor(run);
      if (session === undefined) continue;
      await atomicWriteJson(path.join(root, "trajectories/human", `${run.id}.json`), session);
      exported += 1;
    } catch (error) {
      if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
    }
  }
  console.log(`Exported ${exported} human review session(s).`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
