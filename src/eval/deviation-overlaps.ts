/**
 * Variant-specific issues that a careful reviewer could reasonably classify
 * under a second playbook rule. Pure variants intentionally have no entry.
 */
export const DEVIATION_OVERLAPS = {
  "EXCLUSIVITY:all-requirements": ["NONCOMPETE"],
  "EXCLUSIVITY:vendor-sole-provider": ["NONCOMPETE"],
  "IP:vendor-owns-deliverables": ["LICENSE"],
  "LD:remaining-fees-liquidated-damages": ["T4C"],
  "LOL-CAP:fees-paid-one-month-no-carveouts": ["INDEMN"],
  "MFN:customer-must-match-offers": ["EXCLUSIVITY"],
  "MINCOMMIT:annual-volume-shortfall": ["LD"],
  "MINCOMMIT:three-year-take-or-pay": ["LD", "T4C"],
  "RENEWAL:one-year-renewal-180-day-window": ["T4C"],
  "RENEWAL:three-year-renewal-120-day-window": ["T4C"],
  "T4C:vendor-only-thirty-days": ["LD"],
} as const satisfies Readonly<Record<string, readonly string[]>>;

export function secondaryRulesForVariant(ruleId: string, variantName: string): readonly string[] {
  const overlaps: Readonly<Record<string, readonly string[]>> = DEVIATION_OVERLAPS;
  return overlaps[`${ruleId}:${variantName}`] ?? [];
}
