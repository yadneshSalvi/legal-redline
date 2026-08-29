import type { Playbook } from "@/src/playbook/schema";
import type { SystemBlock } from "@/src/agent/llm";

export function playbookPreamble(playbook: Playbook): string {
  return [
    `We represent the ${playbook.party}.`,
    `Our party aliases: ${playbook.partyAliases.join(", ")}.`,
    `Counterparty aliases: ${playbook.counterpartyAliases.join(", ")}.`,
    `Comment prefix: ${playbook.style.commentPrefix}.`,
    `Tone: ${playbook.style.tone}`,
    "",
    "How to classify a clause against a rule (this is how the reviewing team reads its own playbook):",
    "- compliant: the clause meets the preferred position, OR it meets the fallback position on its material terms. A clause at the fallback is acceptable and is not redlined; say in the rationale that it sits at the fallback.",
    "- deviation: the clause fails the fallback on a material term, or falls into walk-away territory. Only then propose a redline.",
    "- missing: the rule expects a clause and no usable clause exists anywhere in the document.",
    "- Minor sub-elements short of the preferred wording (a missing reminder mechanic, a missing price-uplift cap, 'paid' versus 'paid or payable', an accepted-but-not-preferred governing law) are noted in the rationale, not flagged as deviations.",
    "- Do not flag a clause that benefits our party. Do not flag the same commercial term twice under two rules unless both rules are independently breached.",
  ].join("\n");
}

export function cachedSystem(instructions: string, playbook?: Playbook): SystemBlock[] {
  const text = playbook ? `${instructions}\n\n${playbookPreamble(playbook)}` : instructions;
  return [{ type: "text", text, cache_control: { type: "ephemeral" } }];
}
