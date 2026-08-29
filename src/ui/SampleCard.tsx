"use client";

import { ArrowRight } from "lucide-react";
import type { SampleContract } from "./fixtures/samples";
import { cn } from "./cn";
import { prettyContractTitle, sampleBlurb, sampleGold } from "./lib/contractTitle";

export function SampleCard({
  sample,
  onSelect,
  busy = false,
  disabled = false,
}: {
  sample: SampleContract;
  onSelect: (sample: SampleContract) => void;
  busy?: boolean;
  disabled?: boolean;
}) {
  const pretty = prettyContractTitle(sample.title);
  const blurb = sampleBlurb(sample);
  const eyebrow =
    sample.kind === "cuad"
      ? `CUAD · filed ${pretty.filedYear ?? "—"}`
      : sample.id.includes("hardcase")
        ? "Synthetic · hard case"
        : "Synthetic · seeded";

  return (
    <button
      type="button"
      disabled={disabled}
      title={pretty.raw}
      onClick={() => onSelect(sample)}
      className={cn(
        "group flex h-full flex-col items-start gap-1.5 rounded-card border border-hairline bg-sheet p-3.5 text-left transition-colors duration-150",
        "hover:border-navy hover:bg-navy-soft disabled:pointer-events-none disabled:opacity-55",
      )}
    >
      <span className="label-caps">{eyebrow}</span>
      <span className="font-serif text-[14.5px] leading-snug font-semibold break-words text-ink">
        {pretty.title}
        {pretty.part ? <span className="text-ink-muted"> ({pretty.part})</span> : null}
      </span>
      {blurb ? <span className="text-[12.5px] leading-[1.5] text-ink-muted">{blurb}</span> : null}
      <span className="mono mt-auto flex w-full items-center gap-1 pt-2.5 text-[11px] text-ink-muted">
        {sample.words.toLocaleString("en-US")} words · {sampleGold(sample)}
        {busy ? <span className="text-navy">· starting…</span> : null}
        <ArrowRight
          size={12}
          strokeWidth={1.75}
          aria-hidden
          className="ml-auto text-navy opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        />
      </span>
    </button>
  );
}
