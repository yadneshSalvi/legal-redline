import { describe, expect, it } from "vitest";

import { renderSystemPrompts, renderTrajectoryNarration } from "@/src/agent/trajectory-narrator";
import type { Finding, ReviewRun, TrajectoryEvent, TrajectoryEventType } from "@/src/agent/types";
import type { Playbook } from "@/src/playbook/schema";

import { documentFixture, statsFixture } from "../eval/fixture";

const rule: Playbook["rules"][number] = {
  id: "LOL-CAP",
  title: "Liability cap",
  category: "liability",
  severity: "critical",
  kind: "parametric",
  cuad: [],
  summary: "Use a meaningful mutual cap.",
  position: { preferred: "Twelve months.", fallback: "Six months.", walkaway: "Customer uncapped." },
  detect: "Locate the aggregate cap.",
  redline: "Make the smallest replacement.",
  checks: [],
};

const playbook: Playbook = {
  id: "fixture-playbook",
  name: "Fixture playbook",
  version: "1",
  party: "customer",
  partyAliases: ["Customer"],
  counterpartyAliases: ["Vendor"],
  description: "Fixture",
  style: { author: "Legal", commentPrefix: "[Playbook]", tone: "Concise" },
  rules: [rule],
};

const proposal = {
  level: "preferred" as const,
  summary: "Raise the cap.",
  comment: "[Playbook] We raised the cap.",
  ops: [{ kind: "replace" as const, paragraphId: "p0001", oldText: "three", newText: "twelve" }],
};

const finding: Finding = {
  id: "f-cap",
  ruleId: "LOL-CAP",
  ruleTitle: "Liability cap",
  severity: "critical",
  status: "deviation",
  paragraphIds: ["p0001"],
  sectionRef: "§ 1 Liability",
  quote: "Cap is three months.",
  rationale: "The cap is below the preferred position.",
  proposal,
  verification: { verdict: "pass", attempts: 1, notes: "Valid and minimal.", checks: [] },
  confidence: 0.95,
  producedBy: "drafter",
};

function event(
  seq: number,
  agent: TrajectoryEvent["agent"],
  type: TrajectoryEventType,
  title: string,
  options: Pick<TrajectoryEvent, "ruleId" | "findingId" | "payload"> = {},
): TrajectoryEvent {
  return { id: `e${seq}`, runId: "run-fixture", seq, t: "2026-01-01T00:00:00.000Z", agent, type, title, ...options };
}

const events: TrajectoryEvent[] = [
  event(1, "ingest", "run_start", "Review started"),
  event(2, "drafter", "llm_request", "drafter request", {
    ruleId: "LOL-CAP",
    payload: {
      system: [{ type: "text", text: "You are the fixture drafter.\nKeep anchors verbatim.\n" }],
      messages: [{ role: "user", content: `Parties: we represent Customer; counterparty is Vendor.\n\nRule:\nID: LOL-CAP\nTitle: Liability cap\nKind: parametric\nSummary: Use a meaningful mutual cap.\n\nPlanner hints:\n{}\n\nInvestigate this rule.` }],
    },
  }),
  event(3, "drafter", "tool_call", "drafter → read_section", { ruleId: "LOL-CAP", payload: { sectionId: "sec-1" } }),
  event(4, "drafter", "tool_result", "read_section result", {
    ruleId: "LOL-CAP",
    payload: { ok: true, text: `Cap is three months. ${"context ".repeat(60)}` },
  }),
  event(5, "drafter", "tool_call", "drafter → propose_redline", { ruleId: "LOL-CAP", payload: proposal }),
  event(6, "drafter", "tool_result", "propose_redline result", { ruleId: "LOL-CAP", payload: { ok: true, errors: [] } }),
  event(7, "drafter", "tool_call", "drafter → submit_finding", {
    ruleId: "LOL-CAP",
    payload: { status: finding.status, quote: finding.quote },
  }),
  event(8, "drafter", "tool_result", "submit_finding result", { ruleId: "LOL-CAP", payload: { ok: true } }),
  event(9, "verifier", "validation", "Verified LOL-CAP: pass", {
    ruleId: "LOL-CAP",
    findingId: finding.id,
    payload: { verdict: "pass", attempts: 1, notes: "Valid and minimal.", checks: [{ name: "operation applies", ok: true }] },
  }),
  event(10, "assembler", "checkpoint", "Persisted 1 finding"),
  event(11, "human", "human_decision", "accept LOL-CAP", { ruleId: "LOL-CAP", findingId: finding.id }),
  event(12, "apply", "validation", "Output validation passed", { payload: { ok: true, trackedInsertions: 1 } }),
];

const run: ReviewRun = {
  id: "run-fixture",
  createdAt: "2026-01-01T00:00:00.000Z",
  status: "applied",
  config: "final",
  playbookId: playbook.id,
  document: documentFixture(),
  sourceKey: "runs/run-fixture/source.docx",
  findings: [finding],
  decisions: {
    [finding.id]: { findingId: finding.id, action: "accept", at: "2026-01-01T00:01:00.000Z", by: "Fixture reviewer" },
  },
  memo: "# Fixture memo\n",
  stats: { ...statsFixture(), findings: 1 },
  output: {
    docxKey: "runs/run-fixture/output.docx",
    memoKey: "runs/run-fixture/memo.md",
    validation: { ok: true, trackedInsertions: 1 },
    appliedAt: "2026-01-01T00:01:01.000Z",
  },
};

describe("trajectory narrator", () => {
  it("renders a deterministic walk-through snapshot with trimmed tool results", () => {
    const narration = renderTrajectoryNarration({ run, events, playbook, contractId: "fixture-contract" });
    expect(narration).toMatchSnapshot();
    const result = narration.match(/read_section result[^`]+```json\n([^\n]+)/u)?.[1] ?? "";
    expect(result.length).toBeLessThanOrEqual(400);
  });

  it("snapshots exact first system prompts", () => {
    expect(renderSystemPrompts(events)).toMatchSnapshot();
  });
});
