import Link from "next/link";
import { EmptyState } from "@/src/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center bg-paper px-6 py-16">
      <div className="w-full max-w-[520px] rounded-card border border-hairline bg-sheet py-3 shadow-sheet">
        <EmptyState
          title="That page is not here"
          body="The link may be out of date, or the part of the product it points at is still being built. Everything you can review lives under Runs."
          action={
            <div className="flex gap-2">
              <Link
                href="/runs"
                className="inline-flex h-8 items-center justify-center rounded-field border border-hairline-strong bg-sheet px-3 text-[13px] font-medium text-ink transition-colors duration-150 hover:border-navy hover:bg-navy-soft"
              >
                All runs
              </Link>
              <Link
                href="/"
                className="inline-flex h-8 items-center justify-center rounded-field border border-navy bg-navy px-3 text-[13px] font-medium text-sheet transition-colors duration-150 hover:bg-ink"
              >
                Start a review
              </Link>
            </div>
          }
        />
      </div>
    </div>
  );
}
