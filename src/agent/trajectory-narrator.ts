import type { Finding, ReviewRun, TrajectoryEvent } from "@/src/agent/types";
import type { RedlineOp } from "@/src/engine/types";
import { ruleFull } from "@/src/playbook/loader";
import type { Playbook, Rule } from "@/src/playbook/schema";

export interface NarrationParties {
  ourParty: string;
  counterparty: string;
}

export interface TrajectoryNarrationInput {
  run: ReviewRun;
  events: readonly TrajectoryEvent[];
  playbook: Playbook;
  contractId: string;
  parties?: NarrationParties;
}

const STAGES = ["ingest", "planner", "drafters", "verifier", "assembler", "memo", "human", "apply"] as const;
type Stage = (typeof STAGES)[number];

function markdownCell(value: string): string {
  return value.replace(/\|/gu, "\\|").replace(/\s+/gu, " ").trim() || "—";
}

function formatDuration(durationMs: number | undefined): string {
  if (durationMs === undefined) return "—";
  const minutes = Math.floor(durationMs / 60_000);
  const seconds = ((durationMs % 60_000) / 1_000).toFixed(1);
  return `${minutes > 0 ? `${minutes}m ` : ""}${seconds}s (${durationMs.toLocaleString("en-US")} ms)`;
}

function compactJson(value: unknown, limit?: number): string {
  const rendered = JSON.stringify(value) ?? "null";
  const compact = rendered.replace(/\s+/gu, " ").trim();
  if (limit === undefined || compact.length <= limit) return compact;
  return `${compact.slice(0, limit - 1)}…`;
}

function codeFence(value: string, language = "text"): string {
  const longest = Math.max(0, ...(value.match(/`+/gu) ?? []).map((match) => match.length));
  const fence = "`".repeat(Math.max(3, longest + 1));
  return `${fence}${language}\n${value}${value.endsWith("\n") ? "" : "\n"}${fence}`;
}

function eventLine(events: readonly TrajectoryEvent[], event: TrajectoryEvent): number {
  return events.indexOf(event) + 1;
}

function eventReference(events: readonly TrajectoryEvent[], event: TrajectoryEvent): string {
  const line = eventLine(events, event);
  return `[seq ${event.seq}](trajectory.jsonl#L${line})`;
}

function payloadRecord(event: TrajectoryEvent): Record<string, unknown> | undefined {
  if (event.payload === null || typeof event.payload !== "object" || Array.isArray(event.payload)) return undefined;
  return event.payload as Record<string, unknown>;
}

function messageText(message: unknown): string {
  if (message === null || typeof message !== "object") return "";
  const content = (message as { content?: unknown }).content;
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content.flatMap((block) => {
    if (block === null || typeof block !== "object") return [];
    const text = (block as { text?: unknown }).text;
    return typeof text === "string" ? [text] : [];
  }).join("\n");
}

function requestUserText(event: TrajectoryEvent): string {
  const messages = payloadRecord(event)?.messages;
  if (!Array.isArray(messages)) return "";
  return messages.flatMap((message) => {
    if (message === null || typeof message !== "object") return [];
    return (message as { role?: unknown }).role === "user" ? [messageText(message)] : [];
  }).join("\n");
}

function extractRuleText(request: TrajectoryEvent | undefined, rule: Rule): string {
  if (request === undefined) return ruleFull(rule);
  const text = requestUserText(request);
  const start = text.indexOf(`ID: ${rule.id}`);
  if (start < 0) return ruleFull(rule);
  const endings = ["\n\n---\n\n", "\n\nPlanner hints:", "\n\nInvestigate this rule", "\n\nNumbered contract:"]
    .map((separator) => text.indexOf(separator, start))
    .filter((index) => index >= 0);
  const end = endings.length === 0 ? text.length : Math.min(...endings);
  return text.slice(start, end).trim();
}

function requestForRule(events: readonly TrajectoryEvent[], ruleId: string): TrajectoryEvent | undefined {
  const exact = events.find((event) => event.type === "llm_request" && event.ruleId === ruleId);
  if (exact !== undefined) return exact;
  return events.find((event) => event.type === "llm_request" &&
    (event.agent === "baseline" || event.agent === "monolith") &&
    requestUserText(event).includes(`ID: ${ruleId}`));
}

function inferParties(events: readonly TrajectoryEvent[]): NarrationParties | undefined {
  for (const event of events.filter((candidate) => candidate.type === "llm_request")) {
    const text = requestUserText(event);
    const match = /Parties:\s*(?:our party=|we represent\s+)([^;\n.]+);\s*counterparty(?:=| is\s+)([^\n.]+)/iu.exec(text);
    if (match !== null) return { ourParty: match[1].trim(), counterparty: match[2].trim() };
  }
  return undefined;
}

function stageFor(event: TrajectoryEvent): Stage | undefined {
  if (event.agent === "ingest") return "ingest";
  if (event.agent === "planner") return "planner";
  if (event.agent === "drafter" || event.agent === "baseline" || event.agent === "monolith") return "drafters";
  if (event.agent === "verifier") return "verifier";
  if (event.agent === "assembler") return "assembler";
  if (event.agent === "memo") return "memo";
  if (event.agent === "human") return "human";
  if (event.agent === "apply") return "apply";
  return undefined;
}

function stageTimeline(events: readonly TrajectoryEvent[], run: ReviewRun): string {
  const rows = STAGES.map((stage) => {
    const selected = events.filter((event) => stageFor(event) === stage);
    const calls = selected.filter((event) => event.type === "llm_request").length;
    const tools = selected.filter((event) => event.type === "tool_call").length;
    let outcome = "—";
    if (stage === "drafters") outcome = `${run.findings.length} submitted finding(s)`;
    if (stage === "verifier") outcome = `${selected.filter((event) => event.type === "validation").length} verdict(s)`;
    if (stage === "human") outcome = `${Object.keys(run.decisions).length} decision(s)`;
    if (stage === "apply") outcome = run.output === undefined ? "not applied" : "output written";
    const bounds = selected.length === 0
      ? "—"
      : `${eventReference(events, selected[0])}–${eventReference(events, selected[selected.length - 1])}`;
    return `| ${stage} | ${selected.length} | ${calls} | ${tools} | ${outcome} | ${bounds} |`;
  });
  return [
    "| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |",
    "|---|---:|---:|---:|---|---|",
    ...rows,
  ].join("\n");
}

function findingOrigin(events: readonly TrajectoryEvent[], finding: Finding): TrajectoryEvent | undefined {
  const exact = events.filter((event) => {
    if (event.agent !== "drafter" || event.type !== "tool_call" || !event.title.includes("submit_finding")) return false;
    const payload = payloadRecord(event);
    return payload?.status === finding.status && payload?.quote === finding.quote;
  });
  if (exact.length > 0) return exact[exact.length - 1];
  return [...events].reverse().find((event) => event.ruleId === finding.ruleId && event.type === "llm_response");
}

function renderFinding(events: readonly TrajectoryEvent[], finding: Finding): string {
  const origin = findingOrigin(events, finding);
  const lines = [
    `- Source: ${origin === undefined ? "final run state" : eventReference(events, origin)}`,
    `- Finding: \`${finding.id}\` · **${finding.status}** · confidence ${finding.confidence.toFixed(2)}`,
    `- Location: ${finding.sectionRef ?? (finding.paragraphIds.join(", ") || "not located")}`,
    `- Quote: ${finding.quote ? `“${finding.quote}”` : "—"}`,
    `- Rationale: ${finding.rationale}`,
  ];
  if (finding.proposal !== undefined) {
    lines.push(
      `- Proposal: **${finding.proposal.level}** — ${finding.proposal.summary}`,
      `- Comment: ${finding.proposal.comment}`,
      "- Proposed ops:",
      "",
      codeFence(JSON.stringify(finding.proposal.ops, null, 2), "json"),
    );
  }
  return lines.join("\n");
}

function renderTools(events: readonly TrajectoryEvent[], ruleId: string): string {
  const relevant = events.filter((event) => event.ruleId === ruleId && (event.type === "tool_call" || event.type === "tool_result"));
  if (relevant.length === 0) return "No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).";
  return relevant.map((event) => {
    if (event.type === "tool_call") {
      return `- ${eventReference(events, event)} **${event.title}**\n\n${codeFence(compactJson(event.payload), "json")}`;
    }
    const validation = event.title.includes("propose_redline")
      ? ` — **validation ${payloadRecord(event)?.ok === true ? "accepted" : "rejected"}**`
      : "";
    return `- ${eventReference(events, event)} **${event.title}**${validation}\n\n${codeFence(compactJson(event.payload, 400), "json")}`;
  }).join("\n\n");
}

function renderVerification(events: readonly TrajectoryEvent[], ruleId: string): string {
  const relevant = events.filter((event) => event.ruleId === ruleId &&
    ((event.agent === "verifier" && event.type === "validation") || event.type === "retry"));
  if (relevant.length === 0) return "No independent verifier or repair event was recorded for this configuration.";
  return relevant.map((event) => {
    const payload = payloadRecord(event);
    if (event.type === "retry") {
      return `- ${eventReference(events, event)} **Repair round ${String(payload?.round ?? "?")}**: ${compactJson(payload?.feedback ?? payload)}`;
    }
    const checks = Array.isArray(payload?.checks)
      ? payload.checks.map((check) => compactJson(check)).join("; ")
      : "none recorded";
    return `- ${eventReference(events, event)} **Verdict: ${String(payload?.verdict ?? "unknown")}** — ${String(payload?.notes ?? "No reasons recorded.")} Checks: ${checks}.`;
  }).join("\n");
}

function sameOp(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function droppedOps(events: readonly TrajectoryEvent[]): RedlineOp[] {
  return events.flatMap((event) => {
    if (event.agent !== "apply" || event.type !== "validation" || !Array.isArray(event.payload)) return [];
    return event.payload.flatMap((item) => {
      if (item === null || typeof item !== "object") return [];
      const op = (item as { op?: unknown }).op;
      return op === undefined ? [] : [op as RedlineOp];
    });
  });
}

function renderDecision(events: readonly TrajectoryEvent[], run: ReviewRun, finding: Finding): string {
  const decision = run.decisions[finding.id];
  const event = events.find((candidate) => candidate.type === "human_decision" && candidate.findingId === finding.id);
  if (decision === undefined) return "No human decision was recorded.";
  const source = event === undefined ? "run.json" : eventReference(events, event);
  const selected = decision.action === "edit" ? decision.ops ?? [] : finding.proposal?.ops ?? [];
  const dropped = droppedOps(events);
  const applied = run.output === undefined ? [] : selected.filter((op) => !dropped.some((candidate) => sameOp(candidate, op)));
  const lines = [
    `- ${source}: **${decision.action}** by ${decision.by} at ${decision.at}${decision.note ? ` — ${decision.note}` : ""}`,
  ];
  if (decision.action === "reject") lines.push("- Applied ops: none (rejected).");
  else if (run.output === undefined) lines.push("- Applied ops: not yet applied; selected ops remain at the human checkpoint.");
  else lines.push("- Applied ops:", "", codeFence(JSON.stringify(applied, null, 2), "json"));
  return lines.join("\n");
}

function renderRule(input: TrajectoryNarrationInput, rule: Rule): string {
  const request = requestForRule(input.events, rule.id);
  const finding = input.run.findings.find((candidate) => candidate.ruleId === rule.id);
  const promptReference = request === undefined
    ? "No model request contained this rule; the canonical playbook text is shown as a fallback."
    : `[${request.agent} system prompt](prompts.md#prompt-${request.agent}) · ${eventReference(input.events, request)}`;
  return [
    `## ${rule.id} — ${rule.title}`,
    "",
    "### Drafter instructions",
    "",
    promptReference,
    "",
    codeFence(extractRuleText(request, rule)),
    "",
    "### Tool trace",
    "",
    renderTools(input.events, rule.id),
    "",
    "### Submitted finding",
    "",
    finding === undefined ? "No finding for this rule is present in the final run state." : renderFinding(input.events, finding),
    "",
    "### Verifier and repair feedback",
    "",
    renderVerification(input.events, rule.id),
    "",
    "### Human checkpoint and applied ops",
    "",
    finding === undefined ? "No finding was available for a human decision." : renderDecision(input.events, input.run, finding),
  ].join("\n");
}

function responseMarkdown(event: TrajectoryEvent): string | undefined {
  const parsed = payloadRecord(event)?.parsed_output;
  if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
    const markdown = (parsed as { markdown?: unknown }).markdown;
    if (typeof markdown === "string") return markdown;
  }
  return undefined;
}

function renderMemo(input: TrajectoryNarrationInput): string {
  const memoEvents = input.events.filter((event) => event.agent === "memo");
  const calls = memoEvents.filter((event) => event.type === "llm_request" || event.type === "llm_response")
    .map((event) => `- ${eventReference(input.events, event)} ${event.title}`);
  const response = [...memoEvents].reverse().find((event) => event.type === "llm_response");
  const memo = input.run.memo ?? (response === undefined ? undefined : responseMarkdown(response));
  return [
    calls.length === 0 ? "No memo LLM call was made; this configuration used the deterministic memo renderer." : calls.join("\n"),
    "",
    memo === undefined ? "No memo body was retained in the exported run." : codeFence(memo, "markdown"),
  ].join("\n");
}

function renderApply(input: TrajectoryNarrationInput): string {
  const events = input.events.filter((event) => event.agent === "apply" && event.type === "validation");
  const lines = events.map((event) =>
    `- ${eventReference(input.events, event)} **${event.title}**\n\n${codeFence(compactJson(event.payload, 2_000), "json")}`,
  );
  if (input.run.output?.validation !== undefined) {
    lines.push(`- Final \`run.json\` validation report\n\n${codeFence(JSON.stringify(input.run.output.validation, null, 2), "json")}`);
  }
  return lines.length === 0 ? "No apply or output-validation event was recorded." : lines.join("\n\n");
}

export function renderTrajectoryNarration(input: TrajectoryNarrationInput): string {
  const parties = input.parties ?? inferParties(input.events);
  const stats = input.run.stats;
  const eventRetries = input.events.filter((event) => event.type === "retry").length;
  const retries = eventRetries === 0 ? stats.retries : eventRetries;
  const header = [
    ["Contract", `${input.contractId} — ${input.run.document.title}`],
    ["Config", input.run.config],
    ["Parties", parties === undefined ? "not recorded" : `${parties.ourParty} (our party) ↔ ${parties.counterparty}`],
    ["Playbook", `${input.playbook.name} (${input.run.playbookId})`],
    ["Wall clock", formatDuration(stats.durationMs)],
    ["Calls", `${stats.llmCalls} LLM · ${stats.toolCalls} tool · ${retries} retries`],
    ["Tokens", `${stats.usage.inputTokens.toLocaleString("en-US")} input · ${stats.usage.outputTokens.toLocaleString("en-US")} output · ${(stats.usage.cacheReadTokens ?? 0).toLocaleString("en-US")} cache read · ${(stats.usage.cacheWriteTokens ?? 0).toLocaleString("en-US")} cache write`],
    ["Cost", `$${stats.usage.costUsd.toFixed(6)}`],
  ].map(([label, value]) => `| ${label} | ${markdownCell(value)} |`);
  return [
    `# Trajectory: ${input.contractId}`,
    "",
    "| Run | Value |",
    "|---|---|",
    ...header,
    "",
    "## How to read this",
    "",
    "Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.",
    "",
    "## Stage timeline",
    "",
    stageTimeline(input.events, input.run),
    "",
    ...input.playbook.rules.flatMap((rule) => [renderRule(input, rule), ""]),
    "## Memo",
    "",
    renderMemo(input),
    "",
    "## Apply and validation",
    "",
    renderApply(input),
    "",
  ].join("\n");
}

function systemText(event: TrajectoryEvent): string[] {
  const system = payloadRecord(event)?.system;
  if (typeof system === "string") return [system];
  if (!Array.isArray(system)) return [];
  return system.map((block) => {
    if (block !== null && typeof block === "object" && typeof (block as { text?: unknown }).text === "string") {
      return (block as { text: string }).text;
    }
    return JSON.stringify(block, null, 2);
  });
}

export function renderSystemPrompts(events: readonly TrajectoryEvent[]): string {
  const firstByAgent = new Map<string, TrajectoryEvent>();
  for (const event of events) {
    if (event.type === "llm_request" && !firstByAgent.has(event.agent)) firstByAgent.set(event.agent, event);
  }
  const sections = [...firstByAgent.values()].map((event) => {
    const prompts = systemText(event);
    return [
      `<a id="prompt-${event.agent}"></a>`,
      `## ${event.agent} — seq ${event.seq}`,
      "",
      prompts.length === 0 ? "No system prompt field was recorded." : prompts.map((prompt) => codeFence(prompt)).join("\n\n"),
    ].join("\n");
  });
  return [
    "# Exact system prompts",
    "",
    "The first `llm_request` for each model-backed agent is reproduced below after credential redaction.",
    "",
    ...sections.flatMap((section) => [section, ""]),
  ].join("\n");
}
