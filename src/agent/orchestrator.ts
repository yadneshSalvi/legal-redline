import pLimit from "p-limit";

import { assembleFindings, statsFor } from "@/src/agent/assembler";
import { runBaseline } from "@/src/agent/baseline";
import { draftRule } from "@/src/agent/drafter";
import type { LlmClient } from "@/src/agent/llm";
import { createPrecedentMemory } from "@/src/agent/memory";
import { createMemo } from "@/src/agent/memo";
import { runMonolith } from "@/src/agent/monolith";
import { deterministicPlan, planReview } from "@/src/agent/planner";
import type { Parties, PlannerOutput } from "@/src/agent/planner";
import type { PipelineConfig, ProgressEvent, ReviewRun, Finding } from "@/src/agent/types";
import type { TrajectoryWriter } from "@/src/agent/trajectory";
import { skipVerification, verifyFinding } from "@/src/agent/verifier";
import type { Playbook, Rule } from "@/src/playbook/schema";
import type { Store } from "@/src/store";
import { stableFindingId } from "@/src/agent/id";

export interface RunReviewInput {
  run: ReviewRun;
  originalBytes: Uint8Array;
  playbook: Playbook;
  config: PipelineConfig;
  store: Store;
  onProgress?: (event: ProgressEvent) => void;
  trajectory: TrajectoryWriter;
  llm: LlmClient;
  parties?: Partial<Parties>;
}

function emit(input: RunReviewInput, event: ProgressEvent): void {
  input.onProgress?.(event);
}

function failedFinding(rule: Rule, error: unknown): Finding {
  const message = error instanceof Error ? error.message : String(error);
  return {
    id: stableFindingId(rule.id, [], "needs_review", message),
    ruleId: rule.id,
    ruleTitle: rule.title,
    severity: rule.severity,
    status: "needs_review",
    paragraphIds: [],
    quote: "",
    rationale: `Worker failed and requires manual review: ${message}`,
    verification: { verdict: "fail", attempts: 0, notes: message, checks: [] },
    confidence: 0,
    producedBy: "drafter",
  };
}

async function stage<T>(input: RunReviewInput, agent: Parameters<TrajectoryWriter["event"]>[0], label: string, work: () => Promise<T>): Promise<T> {
  const started = Date.now();
  emit(input, { type: "stage", runId: input.run.id, agent, state: "start", label });
  await input.trajectory.event(agent, "stage_start", label);
  try {
    return await work();
  } finally {
    const durationMs = Date.now() - started;
    await input.trajectory.event(agent, "stage_end", label, { durationMs });
    emit(input, { type: "stage", runId: input.run.id, agent, state: "end", label, durationMs });
  }
}

async function runWorker(input: RunReviewInput, rule: Rule, plan: PlannerOutput["plans"][number], parties: Parties): Promise<Finding> {
  const started = Date.now();
  emit(input, { type: "worker", runId: input.run.id, ruleId: rule.id, ruleTitle: rule.title, state: "running" });
  try {
    let drafted = await draftRule({
      document: input.run.document,
      playbook: input.playbook,
      rule,
      plan,
      parties,
      config: input.config,
      llm: input.llm,
      memory: input.config.precedentMemory ? createPrecedentMemory(input.store) : undefined,
    });
    let finding = drafted.finding;
    if (!input.config.verifier) finding = skipVerification(finding);
    else {
      for (let attempt = 1; attempt <= input.config.maxRepairRounds + 1; attempt += 1) {
        emit(input, { type: "worker", runId: input.run.id, ruleId: rule.id, ruleTitle: rule.title, state: "verifying" });
        const verified = await verifyFinding({
          document: input.run.document,
          playbook: input.playbook,
          rule,
          finding,
          config: input.config,
          llm: input.llm,
          attempt,
        });
        finding = verified.finding;
        await input.trajectory.event("verifier", "validation", `Verified ${rule.id}: ${finding.verification?.verdict}`, {
          ruleId: rule.id,
          findingId: finding.id,
          payload: finding.verification,
        });
        if (finding.verification?.verdict !== "fail") break;
        if (attempt > input.config.maxRepairRounds) {
          finding = { ...finding, status: "needs_review" };
          break;
        }
        await input.trajectory.event("drafter", "retry", `Repair ${rule.id} after verifier feedback`, {
          ruleId: rule.id,
          findingId: finding.id,
          payload: { feedback: verified.feedback, round: attempt },
        });
        drafted = await draftRule({
          document: input.run.document,
          playbook: input.playbook,
          rule,
          plan,
          parties,
          config: input.config,
          llm: input.llm,
          memory: input.config.precedentMemory ? createPrecedentMemory(input.store) : undefined,
          session: drafted.session,
          verifierFeedback: verified.feedback,
        });
        finding = drafted.finding;
      }
    }
    emit(input, { type: "worker", runId: input.run.id, ruleId: rule.id, ruleTitle: rule.title, state: "done", durationMs: Date.now() - started });
    return finding;
  } catch (error) {
    const finding = failedFinding(rule, error);
    await input.trajectory.event("drafter", "error", `Worker ${rule.id} failed`, { ruleId: rule.id, payload: { error: finding.rationale } });
    emit(input, { type: "worker", runId: input.run.id, ruleId: rule.id, ruleTitle: rule.title, state: "failed", note: finding.rationale, durationMs: Date.now() - started });
    return finding;
  }
}

function fallbackMemo(run: ReviewRun): string {
  const rows = run.findings.map((finding) => `| ${finding.severity} | ${finding.ruleTitle} | ${finding.status} | ${finding.sectionRef ?? "—"} |`).join("\n");
  return `# Issues memo\n\n## Executive summary\n\n${run.findings.length} playbook findings require review.\n\n## Findings\n\n| Severity | Rule | Status | Section |\n|---|---|---|---|\n${rows}\n\n## Walk-away items\n\nReview all critical findings.\n\n## Next steps\n\nAccept, edit, or reject each finding before applying tracked changes.\n`;
}

export async function runReview(input: RunReviewInput): Promise<ReviewRun> {
  const { run, trajectory, llm } = input;
  llm.setEventHandler?.(async (event) => {
    await trajectory.event(event.agent, event.type, event.title, event);
  });
  run.status = "running";
  if (!run.stats.startedAt) run.stats.startedAt = new Date().toISOString();
  await input.store.putJson(`runs/${run.id}/run.json`, run);
  await trajectory.event("ingest", "run_start", `Review started with ${input.config.id}`, { payload: { config: input.config, source: run.document.source } });
  emit(input, { type: "status", runId: run.id, status: "running" });

  try {
    let findings: Finding[];
    if (input.config.singlePrompt) {
      findings = await stage(input, "baseline", "Whole-contract baseline", () =>
        runBaseline({ document: run.document, playbook: input.playbook, config: input.config, llm }),
      );
      for (const finding of findings) emit(input, { type: "finding", runId: run.id, finding });
    } else if (input.config.monolith) {
      findings = await stage(input, "monolith", "Monolithic playbook review", () =>
        runMonolith({ document: run.document, playbook: input.playbook, config: input.config, llm, memory: createPrecedentMemory(input.store) }),
      );
      if (input.config.verifier) {
        findings = await Promise.all(findings.map(async (finding) => {
          const rule = input.playbook.rules.find((candidate) => candidate.id === finding.ruleId);
          if (!rule) return finding;
          const verified = await verifyFinding({ document: run.document, playbook: input.playbook, rule, finding, config: input.config, llm, attempt: 1 });
          return verified.finding.verification?.verdict === "fail" ? { ...verified.finding, status: "needs_review" } : verified.finding;
        }));
      }
      for (const finding of findings) emit(input, { type: "finding", runId: run.id, finding });
    } else {
      const planned = await stage(input, "planner", "Map rules to document", () =>
        input.config.planner
          ? planReview({ document: run.document, playbook: input.playbook, config: input.config, llm, parties: input.parties })
          : Promise.resolve(deterministicPlan(run.document, input.playbook, input.parties)),
      );
      if (!input.config.perRuleWorkers) {
        findings = await stage(input, "monolith", "Single document-model agent", () =>
          runMonolith({ document: run.document, playbook: input.playbook, config: input.config, llm, planner: planned }),
        );
        for (const finding of findings) emit(input, { type: "finding", runId: run.id, finding });
      } else {
        const limit = pLimit(input.config.concurrency);
        let checkpoint = Promise.resolve();
        const tasks = input.playbook.rules.map((rule) => {
          emit(input, { type: "worker", runId: run.id, ruleId: rule.id, ruleTitle: rule.title, state: "queued" });
          const plan = planned.plans.find((candidate) => candidate.ruleId === rule.id) ?? deterministicPlan(run.document, { ...input.playbook, rules: [rule] }).plans[0];
          return limit(async () => {
            const finding = await runWorker(input, rule, plan, planned.parties);
            run.findings.push(finding);
            run.findings = assembleFindings(run.findings);
            run.stats = statsFor(run.stats.startedAt, run.findings, llm.getTotals());
            emit(input, { type: "finding", runId: run.id, finding });
            emit(input, { type: "stats", runId: run.id, stats: run.stats });
            checkpoint = checkpoint.then(async () => {
              await input.store.putJson(`runs/${run.id}/run.json`, run);
              await trajectory.event("assembler", "checkpoint", `Persisted ${run.findings.length} findings`, { payload: { findings: run.findings.length } });
            });
            await checkpoint;
            return finding;
          });
        });
        findings = await Promise.all(tasks);
      }
    }

    run.findings = await stage(input, "assembler", "Deduplicate and order findings", async () => assembleFindings(findings));
    run.stats = statsFor(run.stats.startedAt, run.findings, llm.getTotals());
    try {
      run.memo = await stage(input, "memo", "Draft issues memo", () => createMemo({
        findings: run.findings,
        playbook: input.playbook,
        config: input.config,
        llm,
        documentTitle: run.document.title,
      }));
    } catch (error) {
      run.memo = fallbackMemo(run);
      await trajectory.event("memo", "error", "Memo call failed; used deterministic memo", { payload: { error: error instanceof Error ? error.message : String(error) } });
    }
    run.status = "awaiting_review";
    const finishedAt = new Date().toISOString();
    run.stats = statsFor(run.stats.startedAt, run.findings, llm.getTotals(), finishedAt);
    await input.store.putJson(`runs/${run.id}/run.json`, run);
    await trajectory.event("assembler", "run_end", `Review finished with ${run.findings.length} findings`, { payload: { status: run.status }, durationMs: run.stats.durationMs });
    emit(input, { type: "stats", runId: run.id, stats: run.stats });
    emit(input, { type: "status", runId: run.id, status: run.status });
    emit(input, { type: "done", runId: run.id, run });
    return run;
  } catch (error) {
    run.status = "failed";
    run.error = error instanceof Error ? error.message : String(error);
    await input.store.putJson(`runs/${run.id}/run.json`, run);
    await trajectory.event("assembler", "error", "Review failed", { payload: { error: run.error } });
    emit(input, { type: "error", runId: run.id, message: run.error });
    throw error;
  }
}
