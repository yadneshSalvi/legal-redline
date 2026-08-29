import type { Playbook } from "@/src/playbook/schema";
import type { SystemBlock } from "@/src/agent/llm";

export function playbookPreamble(playbook: Playbook): string {
  return [
    `We represent the ${playbook.party}.`,
    `Our party aliases: ${playbook.partyAliases.join(", ")}.`,
    `Counterparty aliases: ${playbook.counterpartyAliases.join(", ")}.`,
    `Comment prefix: ${playbook.style.commentPrefix}.`,
    `Tone: ${playbook.style.tone}`,
  ].join("\n");
}

export function cachedSystem(instructions: string, playbook?: Playbook): SystemBlock[] {
  const text = playbook ? `${instructions}\n\n${playbookPreamble(playbook)}` : instructions;
  return [{ type: "text", text, cache_control: { type: "ephemeral" } }];
}
