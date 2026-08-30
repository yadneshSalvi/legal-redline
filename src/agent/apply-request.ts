import { reconcileOps } from "@/src/engine";
import type { ApplyRequest, RedlineComment, RedlineOp } from "@/src/engine/types";
import type { Decision, Finding, ReviewRun } from "@/src/agent/types";

export interface ApplyPlan {
  /** The exact request handed to `applyRedlines` / `validateDocx`. */
  request: ApplyRequest;
  /** Findings whose accepted or edited redline becomes a precedent. */
  promotions: Array<{ finding: Finding; decision: Decision }>;
  /** Operations dropped by reconciliation (overlaps, duplicates, replace-under-delete). */
  dropped: ReturnType<typeof reconcileOps>["dropped"];
}

/**
 * Turns a run's human decisions into the apply request: accepted proposals and edited ops, one margin comment per
 * finding, reconciled against each other. Pure — the same run and options always yield the same request, which is
 * what lets `validate-docx --run` re-derive the request for an output written earlier.
 */
export function buildApplyRequest(run: ReviewRun, options: { author: string; date: string }): ApplyPlan {
  const ops: RedlineOp[] = [];
  const comments: RedlineComment[] = [];
  const promotions: ApplyPlan["promotions"] = [];
  for (const finding of run.findings) {
    const decision = run.decisions[finding.id];
    if (!decision || decision.action === "reject") continue;
    const selectedOps = decision.action === "edit" ? decision.ops ?? [] : finding.proposal?.ops ?? [];
    if (!selectedOps.length) continue;
    ops.push(...selectedOps);
    const first = selectedOps[0];
    comments.push({
      paragraphId: first.paragraphId,
      anchorText: first.kind === "replace" ? first.oldText : undefined,
      text: decision.comment ?? finding.proposal?.comment ?? `[Playbook] ${finding.rationale}`,
    });
    promotions.push({ finding, decision });
  }
  const reconciled = reconcileOps(run.document, ops);
  return {
    request: { ops: reconciled.ops, comments, author: options.author, date: options.date },
    promotions,
    dropped: reconciled.dropped,
  };
}
