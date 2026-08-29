/**
 * The prompts and request payloads the example trajectory records. Kept apart from the event
 * builders so the two read as what they are: the words we send the model, and the log we keep.
 */
import type { AgentName, TrajectoryEventType, Usage } from "@/src/agent/types";
import type { Finding } from "@/src/agent/types";
import type { WorkerResult } from "./sample-run";

export interface Draft {
  agent: AgentName;
  type: TrajectoryEventType;
  title: string;
  ruleId?: string;
  findingId?: string;
  payload?: unknown;
  /** Elapsed time attributed to this event, before normalising to the run's duration. */
  dt: number;
  durationMs?: number;
  usage?: Usage;
  /** Relative share of the run's recorded tokens and cost; only model turns carry one. */
  weight?: number;
}

export const CONCURRENCY = 6;

export const DRAFTER_SYSTEM = `You are a drafter for Playbook Redliner, reviewing a vendor contract for the
CUSTOMER side. You handle exactly one playbook rule. Read only what you need with the tools; never
guess at text you have not read.

Rules of engagement:
- Propose the smallest edit that reaches the preferred position; fall back only when the preferred
  position is not achievable in this document.
- Anchors must be verbatim from the paragraph you read. propose_redline rejects anything else.
- Cite the clause you are changing by its section number, never by a number you have not seen.
- If the clause is already compliant, say so and stop. Over-flagging is a failure.

<playbook rule>…frozen playbook prefix, cached…</playbook rule>`;

export const VERIFIER_SYSTEM = `You are an independent verifier. You did not draft this redline and you do
not see the drafter's reasoning. Given the playbook rule, the original clause and the redlined
clause, decide whether the redline satisfies the rule, whether it is minimal, and whether it
preserves the rest of the clause. Answer with the structured verdict schema.`;

export const DRAFTER_TOOLS = ["read_section", "search", "get_definition", "propose_redline", "record_compliant"];

export function preview(text: string, max = 340): string {
  return text.length <= max ? text : `${text.slice(0, max).trimEnd()}…`;
}

export function requestPayload(input: {
  system: string;
  user: string;
  tools?: string[];
  turn: number;
  priorTool?: { name: string; result: string };
}): unknown {
  const messages: { role: string; content: string }[] = [{ role: "user", content: input.user }];
  if (input.priorTool) {
    messages.push({ role: "assistant", content: `[tool_use] ${input.priorTool.name}(…)` });
    messages.push({ role: "user", content: `[tool_result] ${preview(input.priorTool.result, 220)}` });
  }
  return {
    model: "claude-opus-5",
    output_config: { effort: "high" },
    thinking: { type: "adaptive" },
    turn: input.turn,
    cache_control: { system: "ephemeral", note: "frozen system + playbook prefix" },
    tools: input.tools,
    system: input.system,
    messages,
  };
}

export function ruleUserMessage(worker: WorkerResult, finding: Finding | undefined): string {
  const sections = finding?.sectionRef ?? "no candidate section — search the whole document";
  return `Rule ${worker.ruleId} — ${worker.ruleTitle}

Planner's candidate sections: ${sections}
Our party: Customer (Northwind Analytics, Inc.) · Counterparty: Vendor (Brightline Cloud Services Ltd.)
Document: 50 paragraphs, 10 sections, 6 defined terms. Paragraph ids are stable (p0001…p0050).

Check the rule, then either propose_redline with verbatim anchors or record_compliant with your reason.`;
}

