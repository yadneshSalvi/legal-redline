import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { z } from "zod";

import { validateDocx } from "../src/engine/index";
import type { ApplyRequest } from "../src/engine/types";

const redlineOpSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("replace"),
    paragraphId: z.string().min(1),
    oldText: z.string().min(1),
    newText: z.string(),
  }),
  z.object({
    kind: z.literal("insert_after"),
    paragraphId: z.string().min(1),
    text: z.string().min(1),
    numbering: z.string().optional(),
    asHeading: z.boolean().optional(),
  }),
  z.object({ kind: z.literal("delete_paragraph"), paragraphId: z.string().min(1) }),
]);

const commentsSchema = z.array(
  z.object({
    paragraphId: z.string().min(1),
    anchorText: z.string().optional(),
    text: z.string().min(1),
  }),
);

const requestSchema = z.object({
  ops: z.array(redlineOpSchema),
  comments: commentsSchema.optional().default([]),
  author: z.string().min(1).optional().default("Playbook Redliner"),
  date: z.string().optional(),
});

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
      ops: z.array(redlineOpSchema).parse(parsed),
      comments: [],
      author: "Playbook Redliner",
    };
  }
  const result = requestSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(`--ops JSON is invalid: ${z.prettifyError(result.error)}`);
  }
  return result.data;
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
