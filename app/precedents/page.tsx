import type { Metadata } from "next";
import { PrecedentBank } from "@/src/ui/precedents/PrecedentBank";

export const metadata: Metadata = { title: "Precedents" };

export default function PrecedentsPage() {
  return (
    <div className="mx-auto w-full max-w-[1320px] flex-1 px-8 py-8">
      <header className="mb-6">
        <h1 className="font-serif text-[24px] leading-tight font-semibold tracking-[-0.01em] text-ink">
          Precedent bank
        </h1>
        <p className="mt-1.5 max-w-[86ch] text-[13px] leading-[1.6] text-ink-muted">
          Language your team has already approved, kept per playbook rule. When a drafter meets the same rule on a new
          contract it retrieves these first, so the fifth vendor gets the wording the first one settled on. Accepting a
          redline in a review promotes it here automatically.
        </p>
      </header>
      <PrecedentBank />
    </div>
  );
}
