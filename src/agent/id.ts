import { createHash } from "node:crypto";

export function stableFindingId(ruleId: string, paragraphIds: string[], status: string, quote: string): string {
  const suffix = createHash("sha256")
    .update(JSON.stringify({ ruleId, paragraphIds, status, quote }))
    .digest("hex")
    .slice(0, 8);
  return `f-${ruleId.toLowerCase()}-${suffix}`;
}
