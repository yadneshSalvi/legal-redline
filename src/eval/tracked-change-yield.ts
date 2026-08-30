import type { Finding } from "@/src/agent/types";
import { applyRedlines, reconcileOps, validateDocx } from "@/src/engine";
import type { ApplyRequest, DocumentModel, RedlineOp } from "@/src/engine/types";

import { stableStringify } from "./io";

export interface TrackedChangeYieldResult {
  outputOk: boolean;
  candidateFindingIds: string[];
  appliedFindingIds: string[];
  ops: number;
  applied: number;
  changeCountMatches: boolean;
  collateralParagraphIds: string[];
  libreoffice: { attempted: boolean; ok: boolean; message?: string };
  errors: string[];
}

function actionable(finding: Finding): boolean {
  return (finding.status === "deviation" || finding.status === "missing") && finding.proposal !== undefined;
}

function opKey(op: RedlineOp): string {
  return stableStringify(op);
}

/** Build and validate the system's own accept-all tracked-change output for the registered yield metric. */
export async function evaluateTrackedChangeYield(input: {
  originalBytes: Uint8Array;
  document: DocumentModel;
  findings: readonly Finding[];
  strategy: "baseline-naive" | "pipeline-reconciled";
  author?: string;
  libreoffice?: boolean;
}): Promise<TrackedChangeYieldResult> {
  const candidates = input.findings.filter(actionable);
  const requested = candidates.flatMap((finding) => finding.proposal?.ops ?? []);
  const ops = input.strategy === "pipeline-reconciled"
    ? reconcileOps(input.document, requested).ops
    : requested;
  const kept = new Set(ops.map(opKey));
  const present = candidates
    .filter((finding) => (finding.proposal?.ops ?? []).every((op) => kept.has(opKey(op))))
    .map((finding) => finding.id);
  const comments = candidates.flatMap((finding) => {
    const first = finding.proposal?.ops[0];
    if (first === undefined || finding.proposal === undefined || !present.includes(finding.id)) return [];
    return [{ paragraphId: first.paragraphId, text: finding.proposal.comment }];
  });
  const request: ApplyRequest = {
    ops,
    comments,
    author: input.author ?? "Playbook Redliner",
    date: "2026-01-01T00:00:00.000Z",
  };

  try {
    const result = await applyRedlines(input.originalBytes, input.document, request);
    const report = await validateDocx(input.originalBytes, result.docx, request, {
      libreoffice: input.libreoffice ?? true,
    });
    const changeCountMatches = result.applied === ops.length;
    const outputOk = report.ok && report.collateralParagraphIds.length === 0 && changeCountMatches &&
      (report.libreoffice?.attempted !== true || report.libreoffice.ok);
    return {
      outputOk,
      candidateFindingIds: candidates.map((finding) => finding.id),
      appliedFindingIds: outputOk ? present : [],
      ops: ops.length,
      applied: result.applied,
      changeCountMatches,
      collateralParagraphIds: report.collateralParagraphIds,
      libreoffice: report.libreoffice ?? { attempted: false, ok: false },
      errors: report.errors,
    };
  } catch (error) {
    return {
      outputOk: false,
      candidateFindingIds: candidates.map((finding) => finding.id),
      appliedFindingIds: [],
      ops: ops.length,
      applied: 0,
      changeCountMatches: false,
      collateralParagraphIds: [],
      libreoffice: { attempted: false, ok: false, message: "validation did not run" },
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
}
