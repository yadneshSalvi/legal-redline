/**
 * Per-rule drafter and verifier events for the example trajectory: two model turns per worker, the
 * tool calls between them, the boundary validation that rejects a non-verbatim anchor, and the
 * verifier's independent verdict with its repair round.
 */
import type { Finding } from "@/src/agent/types";
import type { WorkerResult } from "./sample-run";
import { DRAFTER_SYSTEM, DRAFTER_TOOLS, VERIFIER_SYSTEM, preview, requestPayload, ruleUserMessage, type Draft } from "./trajectory-prompts";

export function drafterDrafts(worker: WorkerResult, finding: Finding | undefined): Draft[] {
  const drafts: Draft[] = [];
  const rule = worker.ruleId;
  const user = ruleUserMessage(worker, finding);
  const readTool = finding ? "read_section" : "search";
  const searchTerm = worker.ruleTitle.split(" — ")[0].toLowerCase();
  const readTarget = finding?.sectionId ?? `"${searchTerm}"`;
  const readInput = finding
    ? { sectionId: finding.sectionId ?? "sec-1", withDefinitions: true }
    : { query: searchTerm, limit: 8 };
  const readResult = finding
    ? {
        sectionId: finding.sectionId,
        heading: finding.sectionRef,
        paragraphs: finding.paragraphIds.map((id) => ({ id, text: preview(finding.quote, 260) })),
        words: 412,
      }
    : { matches: 0, note: worker.note, scanned: 50 };

  drafts.push({
    agent: "drafter",
    type: "llm_request",
    title: `drafter[${rule}] → turn 1`,
    ruleId: rule,
    dt: 1200,
    payload: requestPayload({ system: DRAFTER_SYSTEM, user, tools: DRAFTER_TOOLS, turn: 1 }),
  });
  drafts.push({
    agent: "drafter",
    type: "llm_response",
    title: `drafter[${rule}] → ${readTool}(${readTarget})`,
    ruleId: rule,
    dt: 4200,
    weight: finding ? 3 : 2,
    payload: {
      stop_reason: "tool_use",
      tool_use: [{ name: readTool, input: readInput }],
      text: finding
        ? `The planner points at ${finding.sectionRef}. Reading it before I draft anything.`
        : `Nothing in the planner's map covers ${rule}; searching the whole document before I conclude.`,
    },
  });
  drafts.push({
    agent: "drafter",
    type: "tool_call",
    title: `${readTool}(${readTarget})`,
    ruleId: rule,
    dt: 120,
    payload: { tool: readTool, input: readInput },
  });
  drafts.push({
    agent: "drafter",
    type: "tool_result",
    title: finding
      ? `${readTool} → ${finding.paragraphIds.length} paragraphs, 412 words`
      : `${readTool} → 0 matches in 50 paragraphs`,
    ruleId: rule,
    dt: 80,
    payload: { tool: readTool, ok: true, result: readResult },
  });

  if (rule === "LOL-CAP") {
    drafts.push({
      agent: "drafter",
      type: "tool_call",
      title: 'get_definition("Fees")',
      ruleId: rule,
      dt: 110,
      payload: { tool: "get_definition", input: { term: "Fees" } },
    });
    drafts.push({
      agent: "drafter",
      type: "tool_result",
      title: "get_definition → § 1.4, excludes professional services",
      ruleId: rule,
      dt: 70,
      payload: {
        tool: "get_definition",
        ok: true,
        result: {
          term: "Fees",
          definedIn: "p0006",
          sectionRef: "§ 1.4",
          text: "“Fees” means the recurring hosting fees set out in Schedule A, excluding professional services, overages and pass-through costs.",
        },
      },
    });
  }

  if (finding?.proposal) {
    const ops = finding.proposal.ops;
    if (finding.ruleId === "IP") {
      drafts.push({
        agent: "drafter",
        type: "llm_request",
        title: `drafter[${rule}] → turn 2`,
        ruleId: rule,
        dt: 1000,
        payload: requestPayload({
          system: DRAFTER_SYSTEM,
          user,
          tools: DRAFTER_TOOLS,
          turn: 2,
          priorTool: { name: readTool, result: JSON.stringify(readResult) },
        }),
      });
      drafts.push({
        agent: "drafter",
        type: "llm_response",
        title: `drafter[${rule}] → propose_redline(1 op)`,
        ruleId: rule,
        dt: 8600,
        weight: 3,
        payload: { stop_reason: "tool_use", tool_use: [{ name: "propose_redline", input: { ops: ops.slice(0, 1) } }] },
      });
      drafts.push({
        agent: "drafter",
        type: "tool_call",
        title: `propose_redline(${rule}, 1 op)`,
        ruleId: rule,
        dt: 130,
        payload: { tool: "propose_redline", input: { ruleId: rule, ops: ops.slice(0, 1) } },
      });
      drafts.push({
        agent: "drafter",
        type: "tool_result",
        title: "propose_redline rejected — anchor is not verbatim",
        ruleId: rule,
        dt: 90,
        payload: {
          tool: "propose_redline",
          ok: false,
          error:
            'oldText not found in p0021: "shall be jointly owned by the parties and each party may". The paragraph reads "…shall be jointly owned by the parties, and each party may…" — copy the anchor exactly.',
        },
      });
      drafts.push({
        agent: "drafter",
        type: "retry",
        title: `drafter[${rule}] retrying with the verbatim anchor (round 1 of 2)`,
        ruleId: rule,
        dt: 60,
        payload: { reason: "tool_validation_failed", tool: "propose_redline", round: 1, maxRounds: 2 },
      });
    }

    drafts.push({
      agent: "drafter",
      type: "llm_request",
      title: `drafter[${rule}] → turn ${finding.ruleId === "IP" ? 3 : 2}`,
      ruleId: rule,
      dt: 1000,
      payload: requestPayload({
        system: DRAFTER_SYSTEM,
        user,
        tools: DRAFTER_TOOLS,
        turn: finding.ruleId === "IP" ? 3 : 2,
        priorTool: { name: readTool, result: JSON.stringify(readResult) },
      }),
    });
    drafts.push({
      agent: "drafter",
      type: "llm_response",
      title: `drafter[${rule}] → propose_redline(${ops.length} ${ops.length === 1 ? "op" : "ops"})`,
      ruleId: rule,
      findingId: finding.id,
      dt: 9400,
      weight: 4,
      payload: {
        stop_reason: "tool_use",
        text: finding.proposal.summary,
        tool_use: [
          {
            name: "propose_redline",
            input: {
              ruleId: rule,
              level: finding.proposal.level,
              summary: finding.proposal.summary,
              comment: finding.proposal.comment,
              ops,
            },
          },
        ],
      },
    });
    drafts.push({
      agent: "drafter",
      type: "tool_call",
      title: `propose_redline(${rule}, ${ops.length} ${ops.length === 1 ? "op" : "ops"})`,
      ruleId: rule,
      findingId: finding.id,
      dt: 140,
      payload: { tool: "propose_redline", input: { ruleId: rule, ops } },
    });
    drafts.push({
      agent: "drafter",
      type: "tool_result",
      title: `propose_redline → finding ${finding.id} recorded`,
      ruleId: rule,
      findingId: finding.id,
      dt: 90,
      payload: {
        tool: "propose_redline",
        ok: true,
        result: {
          findingId: finding.id,
          opsAccepted: ops.length,
          severity: finding.severity,
          status: finding.status,
          level: finding.proposal.level,
        },
      },
    });
    drafts.push({
      agent: "drafter",
      type: "validation",
      title: `propose_redline accepted — ${ops.length} ${ops.length === 1 ? "anchor" : "anchors"} matched exactly once`,
      ruleId: rule,
      findingId: finding.id,
      dt: 110,
      payload: {
        tool: "propose_redline",
        verdict: "pass",
        checks: [
          { name: "anchors_verbatim", ok: true, detail: `${ops.length} of ${ops.length} matched exactly once` },
          { name: "inside_addressed_paragraphs", ok: true },
          { name: "no_collateral_paragraphs", ok: true },
          { name: "comment_cites_rule", ok: true, detail: rule },
        ],
      },
    });
  } else {
    drafts.push({
      agent: "drafter",
      type: "llm_request",
      title: `drafter[${rule}] → turn 2`,
      ruleId: rule,
      dt: 900,
      payload: requestPayload({
        system: DRAFTER_SYSTEM,
        user,
        tools: DRAFTER_TOOLS,
        turn: 2,
        priorTool: { name: readTool, result: JSON.stringify(readResult) },
      }),
    });
    drafts.push({
      agent: "drafter",
      type: "llm_response",
      title: `drafter[${rule}] → record_compliant`,
      ruleId: rule,
      dt: 3200,
      weight: 1,
      payload: {
        stop_reason: "tool_use",
        text: worker.note,
        tool_use: [{ name: "record_compliant", input: { ruleId: rule, reason: worker.note } }],
      },
    });
  }

  drafts.push({
    agent: "drafter",
    type: "stage_end",
    title: `drafter[${rule}] done — ${worker.state === "failed" ? "escalated" : finding ? "redline drafted" : "clear"}`,
    ruleId: rule,
    dt: 60,
    durationMs: worker.durationMs,
    payload: { ruleId: rule, state: worker.state, note: worker.note, costUsd: worker.costUsd },
  });

  return drafts;
}

/** Round-robin merge, so a batch of concurrent workers reads the way the sink recorded it. */
export function interleave(lists: Draft[][]): Draft[] {
  const out: Draft[] = [];
  const longest = Math.max(0, ...lists.map((list) => list.length));
  for (let index = 0; index < longest; index += 1) {
    for (const list of lists) {
      const draft = list[index];
      if (draft) out.push(draft);
    }
  }
  return out;
}

export function verifierDrafts(finding: Finding): Draft[] {
  const verdict = finding.verification?.verdict ?? "skipped";
  const attempts = finding.verification?.attempts ?? 1;
  const rounds = verdict === "repaired" ? 2 : verdict === "fail" ? 2 : 1;
  const drafts: Draft[] = [];

  for (let round = 1; round <= rounds; round += 1) {
    const last = round === rounds;
    const passed = last && verdict !== "fail";
    drafts.push({
      agent: "verifier",
      type: "llm_request",
      title: `verifier[${finding.ruleId}] → round ${round}`,
      ruleId: finding.ruleId,
      findingId: finding.id,
      dt: 900,
      payload: requestPayload({
        system: VERIFIER_SYSTEM,
        turn: round,
        user: `Rule ${finding.ruleId} — ${finding.ruleTitle}

Original clause (${finding.sectionRef ?? finding.paragraphIds[0]}):
${preview(finding.quote, 420)}

Redlined clause as it will read:
${preview(finding.proposal?.summary ?? "no redline proposed", 300)}

Margin comment:
${preview(finding.proposal?.comment ?? "", 260)}`,
      }),
    });
    drafts.push({
      agent: "verifier",
      type: "llm_response",
      title: `verifier[${finding.ruleId}] → ${passed ? "pass" : "fail"}`,
      ruleId: finding.ruleId,
      findingId: finding.id,
      dt: 6400,
      weight: 2,
      payload: {
        stop_reason: "end_turn",
        parsed: {
          satisfies_rule: passed,
          minimal: passed,
          preserves_intent: true,
          drafting_quality: passed ? 5 : 3,
          reason: passed
            ? finding.verification?.notes
            : finding.ruleId === "ASSIGN"
              ? "The added sentence duplicates § 4.3 as redrafted and “competitor” is undefined in this document."
              : "The insertion does not name the indemnified losses; add defence costs and the procedure cross-reference.",
        },
      },
    });
    drafts.push({
      agent: "verifier",
      type: "validation",
      title: `verifier[${finding.ruleId}] ${passed ? "pass" : "fail"} — ${finding.verification?.checks.length ?? 0} checks`,
      ruleId: finding.ruleId,
      findingId: finding.id,
      dt: 120,
      payload: {
        verdict: passed ? (attempts > 1 ? "repaired" : "pass") : "fail",
        attempts,
        notes: finding.verification?.notes,
        checks: finding.verification?.checks ?? [],
      },
    });
    if (!last) {
      drafts.push({
        agent: "drafter",
        type: "retry",
        title: `drafter[${finding.ruleId}] repairing on verifier feedback (round ${round} of 2)`,
        ruleId: finding.ruleId,
        findingId: finding.id,
        dt: 7200,
        weight: 3,
        payload: { reason: "verifier_rejected", round, maxRounds: 2, feedback: finding.verification?.notes },
      });
    }
  }

  if (verdict === "fail") {
    drafts.push({
      agent: "verifier",
      type: "error",
      title: `verifier[${finding.ruleId}] unresolved after 2 rounds — escalated to the reviewer`,
      ruleId: finding.ruleId,
      findingId: finding.id,
      dt: 60,
      payload: {
        message: "Repair budget exhausted; the finding is marked needs_review so a human decides.",
        ruleId: finding.ruleId,
      },
    });
  }
  return drafts;
}

