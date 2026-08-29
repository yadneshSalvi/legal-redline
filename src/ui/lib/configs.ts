import type { ConfigId } from "@/src/agent/types";

/** Human labels for the pipeline configs the eval harness measures (master plan §2.2). */
export const configCatalog: { id: ConfigId; label: string; description: string; kind: "baseline" | "iteration" }[] = [
  {
    id: "b0-chat",
    label: "b0 · Chat baseline",
    description: "Whole contract in one prompt, no playbook, free-text answer — the “paste it into a chatbot” approach.",
    kind: "baseline",
  },
  {
    id: "b1-prompt",
    label: "b1 · Single prompt + playbook",
    description: "One structured call with the contract and the playbook; replacements applied by naive string match.",
    kind: "baseline",
  },
  {
    id: "i1-docmodel",
    label: "i1 · Document model + planner",
    description: "Clause-addressable paragraphs and a planner that maps each rule to candidate sections.",
    kind: "iteration",
  },
  {
    id: "i2-workers",
    label: "i2 · Per-rule drafter workers",
    description: "One worker per playbook rule with validated tools; redlines rejected unless the anchor is verbatim.",
    kind: "iteration",
  },
  {
    id: "i3-verifier",
    label: "i3 · Independent verifier",
    description: "A second session judges each redline, with deterministic checks and up to two repair rounds.",
    kind: "iteration",
  },
  {
    id: "i4-memory",
    label: "i4 · Precedent memory",
    description: "Approved language from earlier reviews is retrieved per rule so the team stays consistent.",
    kind: "iteration",
  },
  {
    id: "x-monolith",
    label: "x · Monolith (removed)",
    description: "One agent handling every rule in a single loop — the experiment we removed on cost and recall.",
    kind: "iteration",
  },
  {
    id: "final",
    label: "Final pipeline",
    description: "Planner → per-rule drafters → independent verifier → assembler, with precedent memory. Recommended.",
    kind: "iteration",
  },
];

export const defaultConfigId: ConfigId = "final";

export function configLabel(id: ConfigId): string {
  return configCatalog.find((c) => c.id === id)?.label ?? id;
}

/** Short form for dense chrome (the workspace document bar, the runs table). */
export function configShortLabel(id: ConfigId): string {
  return id === "final" ? "final" : id;
}
