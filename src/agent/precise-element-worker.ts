import { draftRule } from "@/src/agent/drafter";
import { skipCompliantElementVerification } from "@/src/agent/element-verifier";
import { isReplayFailure, type LlmClient } from "@/src/agent/llm";
import type { PrecedentMemory } from "@/src/agent/memory";
import type { Parties, RulePlan } from "@/src/agent/planner";
import {
  repairFindingPrecisely,
  type PreciseElementDrafterSession,
} from "@/src/agent/precise-element-drafter";
import { verifyFindingPrecisely } from "@/src/agent/precise-element-verifier";
import type { Finding, PipelineConfig } from "@/src/agent/types";
import type { TrajectoryWriter } from "@/src/agent/trajectory";
import type { DocumentModel } from "@/src/engine/types";
import type { Playbook, Rule } from "@/src/playbook/schema";

function includeProposalAnchors(finding: Finding): Finding {
  if (finding.status === "missing" && finding.proposal !== undefined) {
    const paragraphIds = [...new Set(finding.proposal.ops.map((op) => op.paragraphId))];
    return paragraphIds.length > 0 ? { ...finding, paragraphIds } : finding;
  }
  const paragraphIds = [...finding.paragraphIds];
  const seen = new Set(paragraphIds);
  for (const op of finding.proposal?.ops ?? []) {
    if (seen.has(op.paragraphId)) continue;
    paragraphIds.push(op.paragraphId);
    seen.add(op.paragraphId);
  }
  return paragraphIds.length === finding.paragraphIds.length ? finding : { ...finding, paragraphIds };
}

export async function runPreciseElementWorkerRounds(input: {
  document: DocumentModel;
  playbook: Playbook;
  rule: Rule;
  plan: RulePlan;
  parties: Parties;
  config: PipelineConfig;
  llm: LlmClient;
  memory?: PrecedentMemory;
  trajectory: TrajectoryWriter;
  onVerifying?: () => void;
}): Promise<{ finding: Finding; repairs: number }> {
  // Classification deliberately remains the byte-stable round-1 worker path. Quality work starts afterward.
  const established = (await draftRule(input)).finding;
  if (established.status === "compliant") {
    return { finding: skipCompliantElementVerification(established), repairs: 0 };
  }
  if (established.status === "needs_review") return { finding: established, repairs: 0 };

  let finding = established;
  let repairs = 0;
  let session: PreciseElementDrafterSession | undefined;
  for (let attempt = 1; attempt <= input.config.maxRepairRounds + 1; attempt += 1) {
    input.onVerifying?.();
    const verified = await verifyFindingPrecisely({ ...input, finding, attempt });
    finding = verified.finding;
    await input.trajectory.event(
      "verifier",
      "validation",
      `Verified ${input.rule.id} against prose-derived elements: ${finding.verification?.verdict}`,
      { ruleId: input.rule.id, findingId: finding.id, payload: finding.verification },
    );
    if (finding.verification?.verdict !== "fail" || attempt > input.config.maxRepairRounds) break;
    await input.trajectory.event("drafter", "retry", `Precision repair ${input.rule.id}`, {
      ruleId: input.rule.id,
      findingId: finding.id,
      payload: { feedback: verified.feedback, round: attempt },
    });
    try {
      const repaired = await repairFindingPrecisely({
        ...input,
        established,
        current: finding,
        session,
        verifierFeedback: verified.feedback,
      });
      finding = repaired.finding;
      session = repaired.session;
      repairs += 1;
    } catch (error) {
      if (isReplayFailure(error)) throw error;
      await input.trajectory.event("drafter", "error", `Precision repair ${input.rule.id} stopped`, {
        ruleId: input.rule.id,
        findingId: finding.id,
        payload: { error: error instanceof Error ? error.message : String(error) },
      });
      break;
    }
  }
  // A quality failure never erases an established detection or converts it to an escalation.
  return { finding: includeProposalAnchors({ ...finding, status: established.status }), repairs };
}
