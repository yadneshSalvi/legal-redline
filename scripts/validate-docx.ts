import { readFile } from "node:fs/promises";
import path, { resolve } from "node:path";

import JSZip from "jszip";
import { z } from "zod";

import { buildApplyRequest } from "../src/agent/apply-request";
import type { ReviewRun } from "../src/agent/types";
import { validateDocx } from "../src/engine/index";
import type { ApplyRequest } from "../src/engine/types";
import { loadPlaybook } from "../src/playbook/loader";

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
  original?: string;
  redlined?: string;
  opsPath?: string;
  runId?: string;
  pdf: boolean;
}

const USAGE =
  "Usage: pnpm validate-docx <original.docx> <redlined.docx> [--ops ops.json | --run <runId>] [--pdf]\n" +
  "       pnpm validate-docx --run <runId> [--pdf]        (paths taken from data/runs/<runId>/)";

function usage(): never {
  throw new Error(USAGE);
}

function parseArgs(args: string[]): CliOptions {
  const positional: string[] = [];
  let opsPath: string | undefined;
  let runId: string | undefined;
  let pdf = false;
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (value === "--pdf") pdf = true;
    else if (value === "--ops" || value === "--run") {
      const next = args[index + 1];
      if (!next) usage();
      if (value === "--ops") opsPath = next;
      else runId = next;
      index += 1;
    } else if (value.startsWith("--")) usage();
    else positional.push(value);
  }
  if (opsPath && runId) usage();
  if (positional.length !== 2 && !(positional.length === 0 && runId)) usage();
  if (runId && !/^[A-Za-z0-9_-]{1,64}$/.test(runId)) usage();
  return {
    ...(positional.length === 2 ? { original: resolve(positional[0]), redlined: resolve(positional[1]) } : {}),
    ...(opsPath ? { opsPath: resolve(opsPath) } : {}),
    ...(runId ? { runId } : {}),
    pdf,
  };
}

async function readOpsFile(opsPath: string): Promise<ApplyRequest> {
  const parsed: unknown = JSON.parse(await readFile(opsPath, "utf8"));
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

/** The revision date stamped on the output's tracked changes (all of one export share it). */
async function stampedDate(docxPath: string): Promise<string | undefined> {
  const zip = await JSZip.loadAsync(await readFile(docxPath));
  const xml = await zip.file("word/document.xml")?.async("string");
  return xml?.match(/<w:(?:ins|del)\b[^>]*\sw:date="([^"]+)"/u)?.[1];
}

/**
 * The request a run's export was written with: the one `applyDecisions` persisted next to the output when it
 * exists, otherwise rebuilt from the run's decisions. A rebuilt request takes its revision date from the output
 * (the validator checks every tracked change against it), so for such runs the date check is informational only;
 * anchors, counts, comments and collateral are still checked in full.
 */
async function readRunRequest(runDir: string): Promise<{ request: ApplyRequest; run: ReviewRun }> {
  const run = JSON.parse(await readFile(path.join(runDir, "run.json"), "utf8")) as ReviewRun;
  try {
    const persisted = JSON.parse(await readFile(path.join(runDir, "apply-request.json"), "utf8")) as unknown;
    return { request: requestSchema.parse(persisted), run };
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
  }
  if (!run.output) throw new Error(`Run ${run.id} has no exported output to validate`);
  const playbook = await loadPlaybook(run.playbookId);
  const date = (await stampedDate(path.join(runDir, "output.docx"))) ?? run.output.appliedAt;
  process.stderr.write(`note: no apply-request.json for run ${run.id}; request rebuilt from its decisions (date taken from the output).\n`);
  return { request: buildApplyRequest(run, { author: playbook.style.author, date }).request, run };
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  let request: ApplyRequest = { ops: [], comments: [], author: "Playbook Redliner" };
  let originalPath = options.original;
  let redlinedPath = options.redlined;
  if (options.runId) {
    const runDir = resolve("data/runs", options.runId);
    const loaded = await readRunRequest(runDir);
    request = loaded.request;
    originalPath ??= resolve("data", loaded.run.sourceKey);
    redlinedPath ??= resolve(runDir, "output.docx");
  } else if (options.opsPath) {
    request = await readOpsFile(options.opsPath);
  } else {
    process.stderr.write(
      "note: validating without --ops/--run treats every tracked change and comment as unexpected; pass --run <runId> for a real export.\n",
    );
  }
  if (!originalPath || !redlinedPath) usage();
  const [original, redlined] = await Promise.all([readFile(originalPath), readFile(redlinedPath)]);
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
