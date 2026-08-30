/**
 * Agent contract — findings, proposals, verification, runs, decisions, trajectories, precedents,
 * pipeline configs and the streaming progress protocol. Every module and the UI code against this.
 */
import type { DocumentModel, ParagraphId, RedlineOp, SectionId } from "@/src/engine/types";

export type Severity = "critical" | "high" | "medium" | "low";
export type FindingStatus = "deviation" | "missing" | "compliant" | "needs_review";
export type PositionLevel = "preferred" | "fallback";
export type ElementCoverageMapping =
  | { element: string; status: "already_met"; quote: string }
  | { element: string; status: "addressed_by_operation"; operationIndexes: number[] }
  | { element: string; status: "unaddressed"; explanation: string };

export interface ElementCoverage {
  level: PositionLevel;
  mappings: ElementCoverageMapping[];
}

export interface VerificationElement {
  element: string;
  level: PositionLevel;
  status: "met" | "not_met" | "cannot_tell";
  evidence: string;
}
export type AgentName =
  | "ingest"
  | "planner"
  | "drafter"
  | "verifier"
  | "assembler"
  | "memo"
  | "baseline"
  | "monolith"
  | "judge"
  | "apply"
  | "human";

export interface Proposal {
  ops: RedlineOp[];
  /** Margin comment written into Word next to the change; cites the rule in plain language. */
  comment: string;
  level: PositionLevel;
  /** One-line summary shown on the card, e.g. "Cap liability at 12 months' fees, mutual, with carve-outs". */
  summary: string;
  precedentId?: string;
}

export interface VerificationCheck {
  name: string;
  ok: boolean;
  detail?: string;
}

export interface Verification {
  verdict: "pass" | "fail" | "repaired" | "skipped";
  attempts: number;
  notes: string;
  checks: VerificationCheck[];
  elements?: VerificationElement[];
  satisfiesPreferred?: boolean;
  satisfiesFallback?: boolean;
  minimal?: boolean;
  preservesIntent?: boolean;
}

export interface Finding {
  id: string;
  ruleId: string;
  ruleTitle: string;
  severity: Severity;
  status: FindingStatus;
  paragraphIds: ParagraphId[];
  sectionId?: SectionId;
  /** Human-readable section reference, e.g. "§ 9.2 Limitation of Liability". */
  sectionRef?: string;
  /** Verbatim quote (≤ 600 chars) of the clause driving the finding. */
  quote: string;
  rationale: string;
  proposal?: Proposal;
  /** Exact target-position accounting produced by element-aware drafters. */
  elementCoverage?: ElementCoverage;
  verification?: Verification;
  /** 0..1 */
  confidence: number;
  producedBy: AgentName;
  /** Model spend attributable to this finding's drafter/verifier work. */
  costUsd?: number;
  /** Wall-clock time attributable to this finding's drafter/verifier work. */
  durationMs?: number;
}

export type DecisionAction = "accept" | "reject" | "edit";

export interface Decision {
  findingId: string;
  action: DecisionAction;
  /** Present when action === "edit": the reviewer's replacement ops/comment. */
  ops?: RedlineOp[];
  comment?: string;
  note?: string;
  at: string;
  by: string;
}

export type ConfigId =
  | "b0-chat"
  | "b1-prompt"
  | "i1-docmodel"
  | "i2-workers"
  | "i3-verifier"
  | "i4-memory"
  | "i5-elements"
  | "i6-longdoc"
  | "x-monolith"
  | "final"
  | "final-v2";

export type Effort = "low" | "medium" | "high" | "xhigh" | "max";

export interface PipelineConfig {
  id: ConfigId;
  label: string;
  description: string;
  /** Whole-contract single prompt (baselines) vs. staged pipeline. */
  singlePrompt: boolean;
  playbookInContext: boolean;
  docModel: boolean;
  planner: boolean;
  perRuleWorkers: boolean;
  toolValidation: boolean;
  verifier: boolean;
  precedentMemory: boolean;
  /** Uses additive position.elements plus the dedicated coverage/verifier protocol. */
  elementAware: boolean;
  /** Uses whole-document search planning and paginated section reads. */
  longDocumentPlanning: boolean;
  longDocumentThresholdWords: number;
  /** Returns precedents as element-labelled drafting templates. */
  elementMarkedMemory: boolean;
  monolith: boolean;
  model: string;
  verifierModel: string;
  effort: Effort;
  verifierEffort: Effort;
  maxRepairRounds: number;
  /** Bounded number of model turns in a per-rule worker tool loop. */
  workerMaxIterations: number;
  /** Bounded number of model turns in a long-document planner tool loop. */
  plannerMaxIterations: number;
  /** Maximum paragraphs returned by one paginated section read. */
  sectionPageSize: number;
  /** Max concurrent drafter workers. */
  concurrency: number;
}

export interface Usage {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens?: number;
  cacheWriteTokens?: number;
  costUsd: number;
}

export interface RunStats {
  startedAt: string;
  finishedAt?: string;
  durationMs?: number;
  llmCalls: number;
  toolCalls: number;
  retries: number;
  usage: Usage;
  findings: number;
  bySeverity: Record<Severity, number>;
  byStatus: Record<FindingStatus, number>;
  perRule?: Record<string, { costUsd: number; durationMs: number; llmCalls: number; retries: number }>;
}

export type RunStatus = "queued" | "running" | "awaiting_review" | "applied" | "failed";

export interface ReviewRun {
  id: string;
  createdAt: string;
  status: RunStatus;
  config: ConfigId;
  playbookId: string;
  document: DocumentModel;
  /** Store key of the original bytes (docx or txt). */
  sourceKey: string;
  findings: Finding[];
  decisions: Record<string, Decision>;
  /** Markdown issues memo. */
  memo?: string;
  stats: RunStats;
  /** Best-effort execution ownership for SSE reconnects and stale-run takeover. */
  lease?: { owner: string; heartbeatAt: string };
  output?: { docxKey: string; memoKey: string; validation?: unknown; appliedAt: string };
  error?: string;
  /** Free-form labels (e.g. eval contract id) */
  tags?: string[];
}

export type TrajectoryEventType =
  | "run_start"
  | "stage_start"
  | "stage_end"
  | "llm_request"
  | "llm_response"
  | "tool_call"
  | "tool_result"
  | "validation"
  | "retry"
  | "human_decision"
  | "checkpoint"
  | "error"
  | "run_end";

export interface TrajectoryEvent {
  id: string;
  runId: string;
  seq: number;
  t: string;
  agent: AgentName;
  type: TrajectoryEventType;
  /** Short human-readable line for the viewer, e.g. "drafter[LOL-CAP] → read_section(sec-9.2)". */
  title: string;
  ruleId?: string;
  findingId?: string;
  /** Full payload: prompts (system+messages), responses, tool inputs/outputs, validation reports. */
  payload?: unknown;
  usage?: Usage;
  durationMs?: number;
  parentId?: string;
}

export interface Precedent {
  id: string;
  ruleId: string;
  title: string;
  /** Where it came from, e.g. "Acme Cloud MSA (Mar 2025)". */
  source: string;
  clauseBefore: string;
  clauseAfter: string;
  comment: string;
  level: PositionLevel;
  approvedAt: string;
  approvedBy: string;
  tags: string[];
  runId?: string;
  findingId?: string;
}

/** Server → client streaming protocol for a running review (SSE `data:` JSON lines). */
export type ProgressEvent =
  | { type: "status"; runId: string; status: RunStatus; message?: string }
  | { type: "stage"; runId: string; agent: AgentName; state: "start" | "end"; label: string; durationMs?: number }
  | {
      type: "worker";
      runId: string;
      ruleId: string;
      ruleTitle: string;
      state: "queued" | "running" | "verifying" | "done" | "failed";
      note?: string;
      durationMs?: number;
      costUsd?: number;
    }
  | { type: "finding"; runId: string; finding: Finding }
  | { type: "log"; runId: string; agent: AgentName; line: string }
  | { type: "stats"; runId: string; stats: RunStats }
  | { type: "done"; runId: string; run: ReviewRun }
  | { type: "error"; runId: string; message: string };

/**
 * Pipeline API (implemented in `src/agent/orchestrator.ts`):
 *
 * runReview(input: {
 *   run: ReviewRun;                 // status "queued", findings []
 *   originalBytes: Uint8Array;
 *   playbook: Playbook;
 *   config: PipelineConfig;
 *   store: Store;
 *   onProgress?: (e: ProgressEvent) => void;
 *   trajectory: TrajectoryWriter;   // append-only event sink (fs/store backed)
 *   llm: LlmClient;                 // cached/replayable wrapper around Anthropic (see src/agent/llm.ts)
 * }): Promise<ReviewRun>
 *
 * applyDecisions(input: { run: ReviewRun; originalBytes: Uint8Array; store: Store }): Promise<ReviewRun>
 *   → applies accepted/edited findings via the engine, validates, writes docx + memo to the store,
 *     records human decisions in the trajectory, promotes accepted proposals to precedents.
 */
