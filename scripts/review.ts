import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Command } from "commander";
import { nanoid } from "nanoid";

import { applyDecisions, createLlmClient, createTrajectoryWriter, getConfig, loadPlaybook, runReview } from "@/src/agent";
import type { ConfigId, Decision, ProgressEvent, ReviewRun } from "@/src/agent/types";
import type { LlmMode } from "@/src/agent/llm";
import { parseDocx, parseText } from "@/src/engine";
import { resolveEvalContext, withoutLocalPrecedents } from "@/src/eval/replay-context";
import { initialStats } from "@/app/api/_shared";
import { createStore } from "@/src/store";

interface Options {
  config: string;
  playbook: string;
  party?: string;
  counterparty?: string;
  acceptAll: boolean;
  mode: LlmMode;
  cacheDir?: string;
}

function logProgress(event: ProgressEvent): void {
  if (event.type === "stage") console.log(`${event.state === "start" ? "→" : "✓"} ${event.label}`);
  if (event.type === "worker" && (event.state === "done" || event.state === "failed")) console.log(`${event.state === "done" ? "✓" : "!"} ${event.ruleId}${event.note ? `: ${event.note}` : ""}`);
}

async function main(): Promise<void> {
  const program = new Command()
    .name("review")
    .argument("<file>", "Contract .docx, .txt, or .md")
    .option("--config <id>", "Pipeline config", "final")
    .option("--playbook <id>", "Playbook id or path", "customer-vendor-services-v1")
    .option("--party <name>", "Name of the represented customer (default: meta.json beside an evaluation contract)")
    .option("--counterparty <name>", "Name of the vendor / counterparty (default: meta.json beside an evaluation contract)")
    .option("--accept-all", "Apply every verified deviation/missing proposal", false)
    .option("--mode <mode>", "live, record, or replay", "live")
    .option("--cache-dir <path>", "Replay cache directory (default in replay: evals/cache/<config>/<contract> for an evaluation contract)")
    .parse();
  const filename = path.resolve(program.args[0]);
  const options = program.opts<Options>();
  if (!(["live", "record", "replay"] as string[]).includes(options.mode)) throw new Error(`Invalid mode: ${options.mode}`);
  const bytes = new Uint8Array(await readFile(filename));
  const isDocx = filename.toLowerCase().endsWith(".docx");
  const document = isDocx ? await parseDocx(bytes, path.basename(filename)) : parseText(new TextDecoder().decode(bytes), path.basename(filename));
  const config = getConfig(options.config);
  const playbook = await loadPlaybook(options.playbook);
  // A contract from the evaluation set replays from its committed cache with the parties the evaluation used;
  // both must match exactly for the recorded request hashes to hit.
  const evalContext = await resolveEvalContext({ contractDir: path.dirname(filename), configId: config.id });
  const parties = options.party || options.counterparty
    ? { ...(options.party ? { ourParty: options.party } : {}), ...(options.counterparty ? { counterparty: options.counterparty } : {}) }
    : (evalContext.parties ?? undefined);
  const cacheDir = options.cacheDir ?? (options.mode === "replay" ? (evalContext.cacheDir ?? undefined) : undefined);
  if (options.mode === "replay" && cacheDir === undefined) {
    throw new Error(
      `Replay needs a cache: pass --cache-dir, or review a contract under data/contracts/<id>/ that has evals/cache/${config.id}/<id>`,
    );
  }
  console.log(
    `Config: ${config.id} · mode: ${options.mode}` +
      (cacheDir ? ` · cache: ${path.relative(process.cwd(), cacheDir)}` : "") +
      (parties?.ourParty ? ` · parties: ${parties.ourParty} / ${parties.counterparty ?? "(inferred)"}` : ""),
  );
  const runId = nanoid(14);
  const createdAt = new Date().toISOString();
  const sourceKey = `runs/${runId}/source.${isDocx ? "docx" : "txt"}`;
  const run: ReviewRun = {
    id: runId,
    createdAt,
    status: "queued",
    config: config.id as ConfigId,
    playbookId: playbook.id,
    document,
    sourceKey,
    findings: [],
    decisions: {},
    stats: initialStats(),
  };
  // In replay the local precedent index is ignored (the evaluation ran with a fresh memory store) and left untouched.
  const store = options.mode === "replay" ? withoutLocalPrecedents(createStore("fs")) : createStore("fs");
  await Promise.all([store.putBytes(sourceKey, bytes), store.putJson(`runs/${runId}/run.json`, run)]);
  const trajectory = createTrajectoryWriter(store, runId);
  const llm = createLlmClient({ mode: options.mode, cacheDir });
  const started = Date.now();
  const reviewed = await runReview({
    run,
    originalBytes: bytes,
    playbook,
    config,
    store,
    trajectory,
    llm,
    parties,
    onProgress: logProgress,
  });
  await store.putJson(`runs/${runId}/findings.json`, reviewed.findings);
  if (options.acceptAll) {
    for (const finding of reviewed.findings) {
      if (!finding.proposal || !["deviation", "missing"].includes(finding.status)) continue;
      if (config.verifier && !["pass", "repaired"].includes(finding.verification?.verdict ?? "")) continue;
      const decision: Decision = { findingId: finding.id, action: "accept", at: new Date().toISOString(), by: "CLI reviewer" };
      reviewed.decisions[finding.id] = decision;
    }
    await applyDecisions({ run: reviewed, originalBytes: bytes, store });
  }
  const byVerdict = reviewed.findings.reduce<Record<string, number>>((counts, finding) => {
    const verdict = finding.verification?.verdict ?? "none";
    counts[verdict] = (counts[verdict] ?? 0) + 1;
    return counts;
  }, {});
  console.log(`Run: ${runId}`);
  console.log(`Duration: ${((Date.now() - started) / 1000).toFixed(1)}s`);
  console.log(`Cost: $${reviewed.stats.usage.costUsd.toFixed(6)}`);
  console.log(`Findings: ${JSON.stringify(reviewed.stats.byStatus)}`);
  console.log(`Verifier verdicts: ${JSON.stringify(byVerdict)}`);
  if (reviewed.output) console.log(`Output: data/${reviewed.output.docxKey}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? `${error.name}: ${error.message}` : String(error));
  process.exitCode = 1;
});
