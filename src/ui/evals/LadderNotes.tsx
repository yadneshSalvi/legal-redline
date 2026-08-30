import type { ReactNode } from "react";
import type { TierView } from "../lib/evals-round2";

const population: Record<TierView, ReactNode> = {
  short: (
    <>
      The twelve round-1 contracts. Every round-1 column here is the round-1 figure, unchanged; CRR, applied yield and
      adherence come from re-scoring those same runs against the pre-registered round-2 metrics.
    </>
  ),
  long: (
    <>
      The six long documents selected by the frozen rule in the pre-registration — 37–45k words, gold anchored on CUAD&apos;s
      expert spans. A configuration that was never run on this tier reads “—” rather than borrowing its short-tier number.
    </>
  ),
  all: (
    <>
      Both tiers pooled over eighteen contracts: counts add and every rate is recomputed from the pooled counts, so this
      is the number one eighteen-contract run would print. A configuration appears only when it was measured on both
      tiers.
    </>
  ),
};

/**
 * What the reader needs to trust the table: which contracts the view covers, what the green wash
 * means, which judge scored the judged columns, and the round-1 caveats that are still true.
 */
export function LadderNotes({ view, judgeV2 }: { view: TierView; judgeV2: boolean }) {
  return (
    <div className="mt-2 max-w-[120ch] space-y-1.5 text-[11.5px] leading-[1.55] text-ink-muted">
      <p>{population[view]}</p>
      <p>
        The green wash marks the best value in a column, which for calls, tokens and cost is whichever config did the
        least work — not the one we recommend.
        {judgeV2 ? (
          <>
            {" "}
            A <span className="mono text-[11px] text-ink">²</span> marks a value scored by judge v2, which decomposes
            each playbook position into atomic elements and is materially stricter than round 1&apos;s judge on the
            identical runs.
          </>
        ) : null}
      </p>
      {view === "short" ? (
        <p>
          <span className="text-ink">b0-chat</span> is the naive approach — the whole contract in one prompt with no
          playbook. <span className="text-ink">b1-prompt</span> is the official baseline: same model, same playbook, one
          direct prompt. <span className="text-ink">x-monolith</span> was removed — one agent handling all eighteen rules
          in a single loop ran at a third of the workers&apos; cost, but recall fell and its redlines dropped back to
          baseline validity. <span className="text-ink">i4-memory</span> and <span className="text-ink">final</span> are
          the same configuration recorded twice: the 1.2 pp between them is run-to-run variance, so F1 differences under
          about 1.5 pp are noise.
        </p>
      ) : null}
    </div>
  );
}
