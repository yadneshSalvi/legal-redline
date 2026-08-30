import { applyRedlines, textToDocx, validateDocx } from "@/src/engine";
import { buildApplyRequest } from "@/src/agent/apply-request";
import { createPrecedentMemory } from "@/src/agent/memory";
import type { ReviewRun } from "@/src/agent/types";
import { createTrajectoryWriter } from "@/src/agent/trajectory";
import { loadPlaybook } from "@/src/playbook/loader";
import type { Store } from "@/src/store";

export async function applyDecisions(input: { run: ReviewRun; originalBytes: Uint8Array; store: Store }): Promise<ReviewRun> {
  const { run, store } = input;
  const trajectory = createTrajectoryWriter(store, run.id);
  const playbook = await loadPlaybook(run.playbookId);
  const memory = createPrecedentMemory(store);

  for (const finding of run.findings) {
    const decision = run.decisions[finding.id];
    if (!decision) continue;
    await trajectory.event("human", "human_decision", `${decision.action} ${finding.ruleId}`, {
      findingId: finding.id,
      ruleId: finding.ruleId,
      payload: decision,
      idempotencyKey: `human-decision:${run.id}:${finding.id}:${decision.action}:${decision.at}`,
    });
  }

  const { request, promotions, dropped } = buildApplyRequest(run, { author: playbook.style.author, date: new Date().toISOString() });
  if (dropped.length > 0) {
    await trajectory.event("apply", "validation", `Reconciled ${dropped.length} conflicting operation(s)`, {
      payload: dropped.map((entry) => ({ reason: entry.reason, op: entry.op })),
    });
  }
  // The exact request is kept next to the output so `pnpm validate-docx --run <id>` can re-check the file later.
  await store.putJson(`runs/${run.id}/apply-request.json`, request);
  const originalDocx = run.document.source.kind === "txt"
    ? await textToDocx(new TextDecoder().decode(input.originalBytes), { title: run.document.title })
    : input.originalBytes;
  const result = await applyRedlines(originalDocx, run.document, request);
  const validation = await validateDocx(originalDocx, result.docx, request);
  await trajectory.event("apply", "validation", `Output validation ${validation.ok ? "passed" : "failed"}`, { payload: validation });
  if (!validation.ok) throw new Error(`Applied document failed validation: ${validation.errors.join("; ")}`);
  const docxKey = `runs/${run.id}/output.docx`;
  const memoKey = `runs/${run.id}/memo.md`;
  await Promise.all([
    store.putBytes(docxKey, result.docx, "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
    store.putBytes(memoKey, new TextEncoder().encode(run.memo ?? "# Issues memo\n"), "text/markdown"),
  ]);
  await Promise.all(promotions.map(({ finding, decision }) => memory.promote(run, finding, decision)));
  run.output = { docxKey, memoKey, validation, appliedAt: new Date().toISOString() };
  run.status = "applied";
  await store.putJson(`runs/${run.id}/run.json`, run);
  return run;
}
