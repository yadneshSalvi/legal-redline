import { ruleFull } from "@/src/playbook/loader";
import type { Rule } from "@/src/playbook/schema";

function checklist(label: "preferred" | "fallback", elements: readonly string[]): string {
  return [
    `${label[0]!.toUpperCase()}${label.slice(1)} atomic elements (copy the JSON string values exactly):`,
    JSON.stringify(elements, null, 2),
  ].join("\n");
}

/** Dedicated serializer for new configs; the round-1 `ruleFull` output remains unchanged. */
export function ruleWithElements(rule: Rule): string {
  return [
    ruleFull(rule),
    checklist("preferred", rule.position.elements.preferred),
    checklist("fallback", rule.position.elements.fallback),
  ].join("\n\n");
}
