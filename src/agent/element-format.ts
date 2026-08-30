import { ruleFull } from "@/src/playbook/loader";
import type { Rule } from "@/src/playbook/schema";
import type { PipelineConfig } from "@/src/agent/types";

export type ElementLists = Rule["position"]["elements"];

function checklist(label: "preferred" | "fallback", elements: readonly string[]): string {
  return [
    `${label[0]!.toUpperCase()}${label.slice(1)} atomic elements (copy the JSON string values exactly):`,
    JSON.stringify(elements, null, 2),
  ].join("\n");
}

/**
 * The checklist a configuration drafts and gates against. `i5-elements` / `i6-longdoc` / `final-v2` use
 * `position.elements`; the precise protocol (`i7-precise` / `final-v3`) uses the prose-mirrored `position.elementsPrecise`
 * when the playbook provides it. Keeping the two lists apart keeps every recorded prompt byte-identical.
 */
export function activeElements(rule: Rule, config: Pick<PipelineConfig, "preciseElementProtocol">): ElementLists {
  return config.preciseElementProtocol ? (rule.position.elementsPrecise ?? rule.position.elements) : rule.position.elements;
}

/** Dedicated serializer for new configs; the round-1 `ruleFull` output remains unchanged. */
export function ruleWithElements(rule: Rule, elements: ElementLists = rule.position.elements): string {
  return [
    ruleFull(rule),
    checklist("preferred", elements.preferred),
    checklist("fallback", elements.fallback),
  ].join("\n\n");
}
