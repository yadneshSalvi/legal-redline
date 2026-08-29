import { readFile } from "node:fs/promises";
import path from "node:path";

import { loadEvaluationResults, renderFullResults, replaceResultPlaceholders, resultReplacements } from "@/src/eval/docs-renderer";
import { atomicWrite } from "@/src/eval/io";

async function main(): Promise<void> {
  const root = process.cwd();
  const results = await loadEvaluationResults(path.join(root, "evals/results"));
  if (results.length === 0) throw new Error("No evaluation result JSON files found in evals/results.");
  const replacements = resultReplacements(results);
  const warnings: string[] = [];
  for (const filename of ["README.md", "IMPROVEMENT_CHANGELOG.md"]) {
    const target = path.join(root, filename);
    const rendered = replaceResultPlaceholders(await readFile(target, "utf8"), replacements, filename);
    warnings.push(...rendered.warnings);
    await atomicWrite(target, rendered.document);
  }
  await atomicWrite(path.join(root, "docs/results.md"), renderFullResults(results));
  for (const warning of warnings) console.warn(`Warning: ${warning}`);
  console.log(`Rendered README.md, IMPROVEMENT_CHANGELOG.md, and docs/results.md from ${results.length} config result(s).`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
