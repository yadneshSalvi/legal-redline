import { draftRuleWithElements } from "@/src/agent/element-drafter";
import { skipCompliantElementVerification, verifyFindingWithElements } from "@/src/agent/element-verifier";
import type { LlmClient } from "@/src/agent/llm";
import type { PrecedentMemory } from "@/src/agent/memory";
import type { Parties, RulePlan } from "@/src/agent/planner";
import type { Finding, PipelineConfig } from "@/src/agent/types";
import type { TrajectoryWriter } from "@/src/agent/trajectory";
import type { DocumentModel } from "@/src/engine/types";
import type { Playbook, Rule } from "@/src/playbook/schema";

export async function runElementWorkerRounds(input: {
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
  let drafted = await draftRuleWithElements(input);
  let finding = drafted.finding;
  let repairs = 0;
  if (!input.config.verifier) return { finding, repairs };
  if (finding.status === "compliant") {
    return { finding: skipCompliantElementVerification(finding), repairs };
  }
  for (let attempt = 1; attempt <= input.config.maxRepairRounds + 1; attempt += 1) {
    input.onVerifying?.();
    const verified = await verifyFindingWithElements({ ...input, finding, attempt });
    finding = verified.finding;
    await input.trajectory.event("verifier", "validation", `Verified ${input.rule.id} elements: ${finding.verification?.verdict}`, {
      ruleId: input.rule.id,
      findingId: finding.id,
      payload: finding.verification,
    });
    if (finding.verification?.verdict !== "fail") break;
    if (attempt > input.config.maxRepairRounds) {
      finding = { ...finding, status: "needs_review" };
      break;
    }
    await input.trajectory.event("drafter", "retry", `Repair ${input.rule.id} unmet elements`, {
      ruleId: input.rule.id,
      findingId: finding.id,
      payload: { feedback: verified.feedback, round: attempt },
    });
    repairs += 1;
    drafted = await draftRuleWithElements({
      ...input,
      session: drafted.session,
      verifierFeedback: verified.feedback,
    });
    finding = drafted.finding;
    if (finding.status === "compliant") {
      finding = skipCompliantElementVerification(finding);
      break;
    }
  }
  return { finding, repairs };
}
