import { z } from "zod";

import type { LlmClient } from "@/src/agent/llm";
import { cachedSystem } from "@/src/agent/prompts/common";
import { MEMO_SYSTEM } from "@/src/agent/prompts/memo";
import type { Finding, PipelineConfig } from "@/src/agent/types";
import type { Playbook } from "@/src/playbook/schema";

const MemoSchema = z.object({ markdown: z.string() });

export async function createMemo(input: {
  findings: Finding[];
  playbook: Playbook;
  config: PipelineConfig;
  llm: LlmClient;
  documentTitle: string;
}): Promise<string> {
  const response = await input.llm.complete({
    agent: "memo",
    model: input.config.model,
    effort: input.config.effort,
    system: cachedSystem(MEMO_SYSTEM, input.playbook),
    messages: [
      {
        role: "user",
        content: `Document: ${input.documentTitle}\n\nFindings:\n${JSON.stringify(
          input.findings.map(({ id, ruleId, ruleTitle, severity, status, sectionRef, rationale, proposal, verification }) => ({
            id, ruleId, ruleTitle, severity, status, sectionRef, rationale, proposal: proposal?.summary, verification: verification?.verdict,
          })),
        )}`,
      },
    ],
    schema: MemoSchema,
  });
  return response.data.markdown;
}
