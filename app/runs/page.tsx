import type { Metadata } from "next";
import { RunsTable } from "@/src/ui/RunsTable";

export const metadata: Metadata = { title: "Runs" };

export default function RunsPage() {
  return (
    <div className="mx-auto w-full max-w-[1320px] flex-1 px-8 py-8">
      <header className="mb-6">
        <h1 className="font-serif text-[24px] leading-tight font-semibold tracking-[-0.01em] text-ink">Runs</h1>
        <p className="mt-1.5 max-w-[70ch] text-[13px] leading-[1.6] text-ink-muted">
          Every review, with the pipeline configuration it used, what it found, what it cost and whether the
          tracked changes were written. Open a run to pick up the review where you left it, or open its trajectory to
          see every step the agents took.
        </p>
      </header>
      <RunsTable />
    </div>
  );
}
