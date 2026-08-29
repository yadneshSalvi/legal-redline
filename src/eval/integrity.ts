import type { Finding } from "@/src/agent/types";
import { applyRedlines, validateDocx } from "@/src/engine";
import type { ApplyRequest, DocumentModel } from "@/src/engine/types";

export interface DocumentIntegrityMetrics {
  attempted: boolean;
  ok: boolean;
  ops: number;
  applied: number;
  changeCountMatches: boolean;
  collateralParagraphIds: string[];
  libreoffice: { attempted: boolean; ok: boolean; message?: string };
  errors: string[];
}

export async function evaluateDocumentIntegrity(input: {
  originalBytes: Uint8Array;
  document: DocumentModel;
  findings: readonly Finding[];
  truePositiveFindingIds: readonly string[];
  author?: string;
  libreoffice?: boolean;
}): Promise<DocumentIntegrityMetrics> {
  const tp = new Set(input.truePositiveFindingIds);
  const selected = input.findings.filter((finding) => tp.has(finding.id) && finding.proposal !== undefined);
  const ops = selected.flatMap((finding) => finding.proposal?.ops ?? []);
  const comments = selected.flatMap((finding) => {
    const first = finding.proposal?.ops[0];
    if (first === undefined || finding.proposal === undefined) return [];
    return [{ paragraphId: first.paragraphId, text: finding.proposal.comment }];
  });
  const request: ApplyRequest = {
    ops,
    comments,
    author: input.author ?? "Playbook Redliner",
    date: "2026-01-01T00:00:00.000Z",
  };

  try {
    const applied = await applyRedlines(input.originalBytes, input.document, request);
    const report = await validateDocx(input.originalBytes, applied.docx, request, {
      libreoffice: input.libreoffice ?? true,
    });
    const changeCountMatches = applied.applied === ops.length;
    return {
      attempted: true,
      ok: report.ok && report.collateralParagraphIds.length === 0 && changeCountMatches,
      ops: ops.length,
      applied: applied.applied,
      changeCountMatches,
      collateralParagraphIds: report.collateralParagraphIds,
      libreoffice:
        report.libreoffice === undefined
          ? { attempted: false, ok: false }
          : { attempted: report.libreoffice.attempted, ok: report.libreoffice.ok },
      errors: report.errors,
    };
  } catch (error) {
    return {
      attempted: true,
      ok: false,
      ops: ops.length,
      applied: 0,
      changeCountMatches: false,
      collateralParagraphIds: [],
      libreoffice: { attempted: false, ok: false, message: "validation did not run" },
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
}
