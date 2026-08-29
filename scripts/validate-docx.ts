import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { validateDocx } from "../src/engine/index";
import type { ApplyRequest } from "../src/engine/types";

interface CliOptions {
  original: string;
  redlined: string;
  opsPath?: string;
  pdf: boolean;
}

function usage(): never {
  throw new Error(
    "Usage: pnpm validate-docx <original.docx> <redlined.docx> [--ops ops.json] [--pdf]",
  );
}

function parseArgs(args: string[]): CliOptions {
  const positional: string[] = [];
  let opsPath: string | undefined;
  let pdf = false;
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (value === "--pdf") pdf = true;
    else if (value === "--ops") {
      opsPath = args[index + 1];
      if (!opsPath) usage();
      index += 1;
    } else if (value.startsWith("--")) usage();
    else positional.push(value);
  }
  if (positional.length !== 2) usage();
  return {
    original: resolve(positional[0]),
    redlined: resolve(positional[1]),
    ...(opsPath ? { opsPath: resolve(opsPath) } : {}),
    pdf,
  };
}

async function readRequest(path: string | undefined): Promise<ApplyRequest> {
  if (!path) return { ops: [], comments: [], author: "Playbook Redliner" };
  const parsed: unknown = JSON.parse(await readFile(path, "utf8"));
  if (Array.isArray(parsed)) {
    return {
      ops: parsed as ApplyRequest["ops"],
      comments: [],
      author: "Playbook Redliner",
    };
  }
  if (!parsed || typeof parsed !== "object") throw new Error("--ops JSON must be an ApplyRequest object");
  const candidate = parsed as Partial<ApplyRequest>;
  if (!Array.isArray(candidate.ops)) {
    throw new Error("--ops JSON must contain ops[]");
  }
  return {
    ops: candidate.ops,
    comments: candidate.comments ?? [],
    author: candidate.author || "Playbook Redliner",
    ...(candidate.date ? { date: candidate.date } : {}),
  };
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const [original, redlined, request] = await Promise.all([
    readFile(options.original),
    readFile(options.redlined),
    readRequest(options.opsPath),
  ]);
  const report = await validateDocx(original, redlined, request, {
    libreoffice: options.pdf,
  });
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!report.ok) process.exitCode = 1;
}

void main().catch((error: unknown) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
