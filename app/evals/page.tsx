import type { Metadata } from "next";
import { EvalsDashboard } from "@/src/ui/evals/EvalsDashboard";

export const metadata: Metadata = { title: "Evaluation" };

export default function EvalsPage() {
  return (
    <div className="mx-auto w-full max-w-[1320px] flex-1 px-8 py-8">
      <header className="mb-6">
        <h1 className="font-serif text-[24px] leading-tight font-semibold tracking-[-0.01em] text-ink">
          Measured improvement
        </h1>
        <p className="mt-1.5 max-w-[86ch] text-[13px] leading-[1.6] text-ink-muted">
          Every configuration of the pipeline, from “paste it into a chat assistant” to the version we shipped, run
          over the same contracts against the same playbook and the same lawyer-confirmed gold. Round 1 measured
          issue-detection F1 on twelve short contracts; round 2 adds a pre-registered long-document tier and the
          end-to-end question underneath it — how often the result is a complete redline. Every number reproduces from
          the committed replay cache at zero cost.
        </p>
      </header>
      <EvalsDashboard />
    </div>
  );
}
