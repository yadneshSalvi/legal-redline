import type { ConfigId, PipelineConfig } from "@/src/agent/types";

const BASE = {
  model: "claude-opus-5",
  verifierModel: "claude-opus-5",
  effort: "high",
  verifierEffort: "xhigh",
  maxRepairRounds: 2,
  concurrency: 6,
} as const;

export const CONFIGS: Record<ConfigId, PipelineConfig> = {
  "b0-chat": {
    ...BASE, id: "b0-chat", label: "Chat baseline", description: "Whole contract, no playbook, free-text review.",
    singlePrompt: true, playbookInContext: false, docModel: false, planner: false, perRuleWorkers: false,
    toolValidation: false, verifier: false, precedentMemory: false, monolith: false,
  },
  "b1-prompt": {
    ...BASE, id: "b1-prompt", label: "Prompt baseline", description: "One structured prompt with the full playbook.",
    singlePrompt: true, playbookInContext: true, docModel: false, planner: false, perRuleWorkers: false,
    toolValidation: false, verifier: false, precedentMemory: false, monolith: false,
  },
  "i1-docmodel": {
    ...BASE, id: "i1-docmodel", label: "Document model", description: "Planner plus paragraph-addressed document access.",
    singlePrompt: false, playbookInContext: true, docModel: true, planner: true, perRuleWorkers: false,
    toolValidation: false, verifier: false, precedentMemory: false, monolith: false,
  },
  "i2-workers": {
    ...BASE, id: "i2-workers", label: "Validated workers", description: "One tool-using worker per rule with boundary validation.",
    singlePrompt: false, playbookInContext: true, docModel: true, planner: true, perRuleWorkers: true,
    toolValidation: true, verifier: false, precedentMemory: false, monolith: false,
  },
  "i3-verifier": {
    ...BASE, id: "i3-verifier", label: "Verified workers", description: "Independent verification and bounded repair.",
    singlePrompt: false, playbookInContext: true, docModel: true, planner: true, perRuleWorkers: true,
    toolValidation: true, verifier: true, precedentMemory: false, monolith: false,
  },
  "i4-memory": {
    ...BASE, id: "i4-memory", label: "Precedent memory", description: "Verified workers with approved-clause retrieval.",
    singlePrompt: false, playbookInContext: true, docModel: true, planner: true, perRuleWorkers: true,
    toolValidation: true, verifier: true, precedentMemory: true, monolith: false,
  },
  "x-monolith": {
    ...BASE, id: "x-monolith", label: "Monolith", description: "One tool loop handles the entire playbook.",
    singlePrompt: false, playbookInContext: true, docModel: true, planner: false, perRuleWorkers: false,
    toolValidation: true, verifier: true, precedentMemory: false, monolith: true,
  },
  final: {
    ...BASE, id: "final", label: "Final", description: "Planner, validated workers, verifier repair, and precedent memory.",
    singlePrompt: false, playbookInContext: true, docModel: true, planner: true, perRuleWorkers: true,
    toolValidation: true, verifier: true, precedentMemory: true, monolith: false,
  },
};

export function getConfig(id: string): PipelineConfig {
  const config = CONFIGS[id as ConfigId];
  if (!config) throw new Error(`Unknown pipeline config: ${id}`);
  return config;
}
