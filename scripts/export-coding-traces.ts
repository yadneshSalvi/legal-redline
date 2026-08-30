import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

import { atomicWrite } from "@/src/eval/io";
import { redactSubmissionText } from "@/src/submission/redact";

const MAX_CLAUDE_TRANSCRIPT_BYTES = 50 * 1024 * 1024;
const CLAUDE_PROJECT = "/Users/yadneshsalvi/.claude/projects/-Users-yadneshsalvi-code-hackathons-legal-redline";

type HarnessKind = "codex" | "opus";

interface HarnessRun {
  at?: string;
  cost_usd?: number;
  duration_s?: number;
  report?: string;
  log?: string;
}

interface HarnessSession {
  label: string;
  kind?: HarnessKind;
  started?: string;
  brief?: string;
  runs: HarnessRun[];
}

interface IndexSession {
  label: string;
  model: string;
  harness: string;
  started: string;
  startedMs: number;
  duration: string;
  cost: string;
  briefReport: string;
  trace: string;
}

interface ClaudeMetadata {
  started: string;
  startedMs: number;
  duration: string;
}

async function filesIn(root: string, suffix: string): Promise<string[]> {
  try {
    return (await readdir(root, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith(suffix))
      .map((entry) => path.join(root, entry.name))
      .sort((left, right) => left.localeCompare(right));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return [];
    throw error;
  }
}

async function walkMarkdown(root: string): Promise<string[]> {
  const files: string[] = [];
  async function walk(directory: string): Promise<void> {
    let entries;
    try {
      entries = await readdir(directory, { withFileTypes: true });
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") return;
      throw error;
    }
    for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(target);
      else if (entry.isFile() && entry.name.endsWith(".md")) files.push(target);
    }
  }
  await walk(root);
  return files;
}

function parseSessions(value: unknown): Map<string, HarnessSession> {
  const sessions = new Map<string, HarnessSession>();
  if (value === null || typeof value !== "object" || Array.isArray(value)) return sessions;
  for (const [label, raw] of Object.entries(value)) {
    if (raw === null || typeof raw !== "object" || Array.isArray(raw)) continue;
    const record = raw as Record<string, unknown>;
    const runs = Array.isArray(record.runs) ? record.runs.flatMap((run) => {
      if (run === null || typeof run !== "object" || Array.isArray(run)) return [];
      const item = run as Record<string, unknown>;
      return [{
        at: typeof item.at === "string" ? item.at : undefined,
        cost_usd: typeof item.cost_usd === "number" ? item.cost_usd : undefined,
        duration_s: typeof item.duration_s === "number" ? item.duration_s : undefined,
        report: typeof item.report === "string" ? item.report : undefined,
        log: typeof item.log === "string" ? item.log : undefined,
      }];
    }) : [];
    const kind = record.kind === "codex" || record.kind === "opus" ? record.kind : undefined;
    sessions.set(label, {
      label,
      kind,
      started: typeof record.started === "string" ? record.started : undefined,
      brief: typeof record.brief === "string" ? record.brief : undefined,
      runs,
    });
  }
  return sessions;
}

async function loadSessions(filename: string): Promise<Map<string, HarnessSession>> {
  try {
    return parseSessions(JSON.parse(await readFile(filename, "utf8")) as unknown);
  } catch (error) {
    if (error instanceof Error && ("code" in error && error.code === "ENOENT" || error instanceof SyntaxError)) return new Map();
    throw error;
  }
}

function logIdentity(filename: string): { stamp: string; label: string; kind: HarnessKind } | undefined {
  const match = /^(\d{8}-\d{6})-(.+)\.(codex\.jsonl|opus\.log)$/u.exec(path.basename(filename));
  if (match === null) return undefined;
  return { stamp: match[1], label: match[2], kind: match[3] === "codex.jsonl" ? "codex" : "opus" };
}

function stampMetadata(stamp: string): { rendered: string; milliseconds: number } {
  const match = /^(\d{4})(\d{2})(\d{2})-(\d{2})(\d{2})(\d{2})$/u.exec(stamp);
  if (match === null) return { rendered: stamp, milliseconds: Number.MAX_SAFE_INTEGER };
  const rendered = `${match[1]}-${match[2]}-${match[3]} ${match[4]}:${match[5]}:${match[6]}`;
  return { rendered, milliseconds: new Date(`${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}:${match[6]}+05:30`).getTime() };
}

function formatSeconds(seconds: number | undefined): string {
  if (seconds === undefined) return "—";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.round(seconds % 60);
  return minutes === 0 ? `${remainder}s` : `${minutes}m ${remainder}s`;
}

function sourceLink(destination: string, filename: string): string {
  return path.posix.join(destination, path.basename(filename));
}

function matchingRun(session: HarnessSession | undefined, filename: string): HarnessRun | undefined {
  return session?.runs.find((run) => run.log !== undefined && path.basename(run.log) === path.basename(filename));
}

function link(label: string, target: string | undefined): string {
  return target === undefined ? "—" : `[${label}](${target.replaceAll(path.sep, "/")})`;
}

async function copyRedacted(source: string, destination: string): Promise<void> {
  await atomicWrite(destination, redactSubmissionText(await readFile(source, "utf8")));
}

async function exportHarnessLogs(root: string, sessions: Map<string, HarnessSession>): Promise<IndexSession[]> {
  const logsRoot = path.join(root, "plans/harness/logs");
  const destinations: Array<[HarnessKind, string]> = [["codex", "codex"], ["opus", "opus"]];
  const indexed: IndexSession[] = [];
  for (const [kind, destinationName] of destinations) {
    const suffix = kind === "codex" ? ".codex.jsonl" : ".opus.log";
    for (const source of await filesIn(logsRoot, suffix)) {
      const identity = logIdentity(source);
      if (identity === undefined) continue;
      const session = sessions.get(identity.label);
      const run = matchingRun(session, source);
      const started = stampMetadata(identity.stamp);
      const output = path.join(root, "trajectories/coding-agents", destinationName, path.basename(source));
      await copyRedacted(source, output);
      const reportSource = run?.report ?? path.join(root, "plans/harness/reports", `${identity.stamp}-${identity.label}.md`);
      const reportExists = await stat(reportSource).then((value) => value.isFile()).catch(() => false);
      const briefSource = session?.brief === undefined ? path.join(root, "plans/harness/briefs", `${identity.label}.md`) : path.resolve(root, session.brief);
      const briefExists = await stat(briefSource).then((value) => value.isFile()).catch(() => false);
      indexed.push({
        label: identity.label,
        model: kind === "codex" ? "GPT-5.6 Sol" : "Claude Opus 5",
        harness: kind === "codex" ? "Codex CLI" : "Claude Agent SDK",
        started: started.rendered,
        startedMs: started.milliseconds,
        duration: formatSeconds(run?.duration_s),
        cost: run?.cost_usd === undefined ? "—" : `$${run.cost_usd.toFixed(2)}`,
        briefReport: `${link("brief", briefExists ? sourceLink("briefs", briefSource) : undefined)} → ${link("report", reportExists ? sourceLink("reports", reportSource) : undefined)}`,
        trace: link("trace", sourceLink(destinationName, source)),
      });
    }
  }
  return indexed;
}

async function exportSupportingFiles(root: string): Promise<void> {
  const destinationRoot = path.join(root, "trajectories/coding-agents");
  for (const source of await walkMarkdown(path.join(root, "plans/harness/briefs"))) {
    const relative = path.relative(path.join(root, "plans/harness/briefs"), source);
    await copyRedacted(source, path.join(destinationRoot, "briefs", relative));
  }
  for (const source of await walkMarkdown(path.join(root, "plans/harness/reports"))) {
    const relative = path.relative(path.join(root, "plans/harness/reports"), source);
    await copyRedacted(source, path.join(destinationRoot, "reports", relative));
  }
}

function claudeMetadata(contents: string, fallback: string): ClaudeMetadata {
  let first: number | undefined;
  let last: number | undefined;
  for (const line of contents.split("\n")) {
    if (!line) continue;
    try {
      const value = JSON.parse(line) as unknown;
      if (value === null || typeof value !== "object" || Array.isArray(value)) continue;
      const timestamp = (value as { timestamp?: unknown }).timestamp;
      if (typeof timestamp !== "string") continue;
      const milliseconds = Date.parse(timestamp);
      if (Number.isNaN(milliseconds)) continue;
      first = first === undefined ? milliseconds : Math.min(first, milliseconds);
      last = last === undefined ? milliseconds : Math.max(last, milliseconds);
    } catch {
      // Keep a transcript with a malformed/incomplete final line; the raw record remains useful.
    }
  }
  if (first === undefined || last === undefined) {
    const stamp = stampMetadata(fallback);
    return { started: stamp.rendered, startedMs: stamp.milliseconds, duration: "—" };
  }
  return {
    started: new Date(first).toISOString(),
    startedMs: first,
    duration: formatSeconds((last - first) / 1_000),
  };
}

/** Opus builder/reviewer sessions run through the Claude Agent SDK store their transcripts next to the lead's. */
async function opusTranscriptLabels(root: string): Promise<Map<string, string>> {
  try {
    const raw = JSON.parse(await readFile(path.join(root, "plans/harness/sessions.json"), "utf8")) as Record<
      string,
      { kind?: string; id?: string }
    >;
    const labels = new Map<string, string>();
    for (const [label, record] of Object.entries(raw)) {
      if (record?.kind === "opus" && typeof record.id === "string") labels.set(record.id, label);
    }
    return labels;
  } catch {
    return new Map();
  }
}

async function exportClaudeCode(root: string): Promise<{ sessions: IndexSession[]; skipped: string[] }> {
  const sessions: IndexSession[] = [];
  const skipped: string[] = [];
  const opusLabels = await opusTranscriptLabels(root);
  for (const source of await filesIn(CLAUDE_PROJECT, ".jsonl")) {
    const sessionId = path.basename(source, ".jsonl");
    const opusLabel = opusLabels.get(sessionId);
    const details = await stat(source);
    if (details.size > MAX_CLAUDE_TRANSCRIPT_BYTES) {
      skipped.push(`${path.basename(source)} (${(details.size / 1024 / 1024).toFixed(1)} MB)`);
      continue;
    }
    const contents = await readFile(source, "utf8");
    const metadata = claudeMetadata(contents, path.basename(source, ".jsonl"));
    const destination = path.join(root, "trajectories/coding-agents/claude-code", path.basename(source));
    await atomicWrite(destination, redactSubmissionText(contents));
    sessions.push({
      label: opusLabel ? `${opusLabel} (SDK transcript)` : `lead-${sessionId.slice(0, 8)}`,
      model: opusLabel ? "Claude Opus 5" : "Claude Fable 5",
      harness: opusLabel ? "Claude Agent SDK" : "Claude Code",
      started: metadata.started,
      startedMs: metadata.startedMs,
      duration: metadata.duration,
      cost: "—",
      briefReport: opusLabel ? "same session as the harness row above (full SDK transcript)" : "lead orchestration (this transcript)",
      trace: link("trace", sourceLink("claude-code", source)),
    });
    sessions.push(...(await exportSubagents(root, path.join(CLAUDE_PROJECT, sessionId, "subagents"))));
  }
  return { sessions, skipped };
}

/**
 * Reviewer subagents the lead spawned inside Claude Code (e.g. the Fable 5 phase-gate reviewer) keep their own
 * transcript under `<session>/subagents/agent-<name>-<hash>.jsonl` with a `.meta.json` beside it. They are exported
 * like any other session: brief from plans/harness/briefs/<name>.md, report from plans/harness/reports/*-<name>.md.
 */
async function exportSubagents(root: string, directory: string): Promise<IndexSession[]> {
  const sessions: IndexSession[] = [];
  for (const source of await filesIn(directory, ".jsonl")) {
    const base = path.basename(source, ".jsonl");
    let name = base.replace(/^agent-/u, "");
    let description = "";
    try {
      const meta = JSON.parse(await readFile(path.join(directory, `${base}.meta.json`), "utf8")) as { name?: string; description?: string };
      if (typeof meta.name === "string" && meta.name) name = meta.name;
      if (typeof meta.description === "string") description = meta.description;
    } catch {
      // No metadata: the file name still identifies the agent.
    }
    const contents = await readFile(source, "utf8");
    const metadata = claudeMetadata(contents, base);
    const destination = path.join(root, "trajectories/coding-agents/claude-code", `${base}.jsonl`);
    await atomicWrite(destination, redactSubmissionText(contents));
    const briefSource = path.join(root, "plans/harness/briefs", `${name}.md`);
    const reportSource = (await filesIn(path.join(root, "plans/harness/reports"), `-${name}.md`))[0];
    let brief: string | undefined;
    let report: string | undefined;
    if (await stat(briefSource).then(() => true, () => false)) {
      brief = `briefs/${name}.md`;
      await copyRedacted(briefSource, path.join(root, "trajectories/coding-agents", brief));
    }
    if (reportSource !== undefined) {
      report = `reports/${path.basename(reportSource)}`;
      await copyRedacted(reportSource, path.join(root, "trajectories/coding-agents", report));
    }
    const briefReport = brief || report
      ? `${link("brief", brief)} → ${link("report", report)}`
      : description || "Claude Code subagent";
    sessions.push({
      label: `${name} (reviewer subagent)`,
      model: "Claude Fable 5",
      harness: "Claude Code subagent",
      started: metadata.started,
      startedMs: metadata.startedMs,
      duration: metadata.duration,
      cost: "—",
      briefReport,
      trace: link("trace", `claude-code/${base}.jsonl`),
    });
  }
  return sessions;
}

function renderIndex(sessions: readonly IndexSession[], skipped: readonly string[]): string {
  const rows = [...sessions].sort((left, right) => left.startedMs - right.startedMs || left.label.localeCompare(right.label))
    .map((session) => `| ${session.label} | ${session.model} | ${session.harness} | ${session.started} | ${session.duration} | ${session.cost} | ${session.briefReport} | ${session.trace} |`);
  const skippedText = skipped.length === 0
    ? "No Claude Code transcript exceeded the 50 MB export limit."
    : `Skipped Claude Code transcripts over 50 MB: ${skipped.join(", ")}.`;
  return [
    "# Coding-agent trajectories",
    "",
    "The lead orchestrator was Claude Fable 5 in Claude Code. Builders and reviewers ran as GPT-5.6 Sol through the Codex CLI and Claude Opus 5 through the Claude Agent SDK. The lead issued scoped briefs, reviewed reports and gates, and sent follow-up repair briefs when a build or review exposed a gap; the chronological sessions below preserve those review loops.",
    "",
    "All copied files are credential-redacted and absolute home paths are normalized to `~`.",
    "",
    "| Label | Model | Harness | Started | Duration | Cost | Brief → report | Event trace |",
    "|---|---|---|---|---:|---:|---|---|",
    ...rows,
    "",
    skippedText,
    "",
  ].join("\n");
}

async function main(): Promise<void> {
  const root = process.cwd();
  const sessions = await loadSessions(path.join(root, "plans/harness/sessions.json"));
  await exportSupportingFiles(root);
  const harness = await exportHarnessLogs(root, sessions);
  const claude = await exportClaudeCode(root);
  await atomicWrite(
    path.join(root, "trajectories/coding-agents/INDEX.md"),
    renderIndex([...harness, ...claude.sessions], claude.skipped),
  );
  console.log(`Exported ${harness.length} harness session(s) and ${claude.sessions.length} Claude Code transcript(s).`);
  if (claude.skipped.length > 0) console.warn(`Skipped ${claude.skipped.length} Claude Code transcript(s) over 50 MB.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
