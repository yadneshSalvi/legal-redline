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
    id: "i5-elements",
    label: "i5 · Element-complete redlines",
    description: "Atomic position checklists per rule, element-mapped drafting, deterministic minimality and fresh-context element verification with up to three repairs.",
    kind: "iteration",
  },
  {
    id: "i6-longdoc",
    label: "i6 · Long-document elements",
    description: "i5 plus, past 15,000 words, whole-document per-rule search planning, definition-first context, paginated worker reads and raised planner/worker budgets.",
    kind: "iteration",
  },
  {
    id: "i7-precise",
    label: "i7 · Official-judge precision",
    description: "Locks round-1 detection, then repairs against prose-derived elements with official minimality gates.",
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
  {
    id: "final-v2",
    label: "Final v2 · Element-complete pipeline",
    description: "i6's thresholded long-document element completeness plus approved precedent language returned as element-labelled drafting templates.",
    kind: "iteration",
  },
  {
    id: "final-v3",
    label: "Final v3 · Precise element pipeline",
    description: "i7 precision with precedent memory and the thresholded long-document planning path.",
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
