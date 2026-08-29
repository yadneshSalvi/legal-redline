import { generateReport } from "@/src/eval/report";

void generateReport()
  .then(() => console.log("Wrote evals/results/summary.md and changelog-data.json"))
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
