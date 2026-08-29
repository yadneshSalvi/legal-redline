"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Tag } from "../Chip";
import { Skeleton } from "../Skeleton";
import { fixtureEvals } from "../fixtures/evals";
import { getEvals } from "../lib/api";
import {
  BASELINE_CONFIG,
  compact,
  contractRows,
  headlines,
  ladderRows,
  money,
  normalizeEvals,
  percent,
  seconds,
  type EvalsData,
  type LadderRow,
} from "../lib/evals";
import { BarChart, type Bar } from "./BarChart";
import { ConfigLadder } from "./ConfigLadder";
import { ContractMatrix } from "./ContractMatrix";
import { HeadlineStrip } from "./HeadlineStrip";
import { ReproduceBlock } from "./ReproduceBlock";

function Section({
  title,
  caption,
  aside,
  children,
}: {
  title: string;
  caption: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <h2 className="font-serif text-[16px] leading-tight font-semibold text-ink">{title}</h2>
          <p className="mt-1 max-w-[92ch] text-[12.5px] leading-[1.6] text-ink-muted">{caption}</p>
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}

function tone(row: LadderRow): Bar["tone"] {
  if (row.role === "final") return "final";
  if (row.role === "removed") return "removed";
  return "quiet";
}

function Panel({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return (
    <div className="min-w-0 rounded-card border border-hairline bg-sheet px-4 pt-3.5 pb-3">
      <h3 className="label-caps">{title}</h3>
      <p className="mt-1 mb-3 text-[11.5px] leading-[1.5] text-ink-faint">{hint}</p>
      {children}
    </div>
  );
}

/**
 * `/evals` — the Measured Improvement evidence. Reads `GET /api/evals`
 * (`evals/results/changelog-data.json`, written by `pnpm report`) and falls back to a committed
 * fixture of the same shape, labelled as such, so the page is never blank.
 */
export function EvalsDashboard() {
  const [state, setState] = useState<{ data: EvalsData; fixture: boolean } | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const payload = await getEvals();
      if (cancelled) return;
      const data = normalizeEvals(payload);
      setState(data ? { data, fixture: false } : { data: fixtureEvals, fixture: true });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (state === null) {
    return (
      <div className="space-y-3">
        <div className="grid gap-3 lg:grid-cols-4">
          {[0, 1, 2, 3].map((index) => (
            <Skeleton key={index} className="h-[92px] w-full" />
          ))}
        </div>
        <Skeleton className="h-[320px] w-full" />
      </div>
    );
  }

  const rows = ladderRows(state.data);
  const present = rows.filter((row) => row.present);
  const baseline = rows.find((row) => row.id === BASELINE_CONFIG);
  const contracts = contractRows(state.data);
  const contractCount = present[0]?.contracts ?? 0;
  const maxCost = Math.max(...present.map((row) => row.cost), 0.01);

  const f1Bars: Bar[] = present.map((row) => ({
    id: row.id,
    label: row.id,
    value: row.f1,
    display: percent(row.f1, 1),
    tone: tone(row),
  }));
  const costBars: Bar[] = present.map((row) => ({
    id: row.id,
    label: row.id,
    sub: `${compact(row.tokens)} tokens`,
    value: row.cost,
    display: money(row.cost),
    tone: tone(row),
  }));

  return (
    <>
      {state.fixture ? (
        <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 rounded-card border border-comment/45 bg-sheet px-4 py-3">
          <Tag tone="comment">fixture</Tag>
          <p className="max-w-[92ch] text-[12.5px] leading-[1.6] text-ink">
            No <code className="mono text-[11.5px]">evals/results/changelog-data.json</code> in this environment, so
            the page is rendering illustrative numbers of exactly the shape <code className="mono text-[11.5px]">pnpm report</code>{" "}
            writes. Run{" "}
            <code className="mono rounded-[4px] border border-hairline bg-sheet px-1 py-[1px] text-[11.5px]">
              pnpm eval --all &amp;&amp; pnpm report
            </code>{" "}
            and reload to replace every figure below with the measured ones.
          </p>
        </div>
      ) : null}

      <HeadlineStrip headlines={headlines(rows)} />

      <Section
        title="The config ladder"
        caption={`Each row is a real run of one named configuration from src/agent/configs.ts over the same ${contractCount} contracts with the same playbook, scored against the same gold. Issue-detection F1 is the primary metric; the best value in each column carries a green wash.`}
        aside={
          <p className="mono text-[11px] text-ink-faint">
            {present.length} of {rows.length} configs measured
          </p>
        }
      >
        <ConfigLadder rows={rows} />
        <p className="mt-2 max-w-[120ch] text-[11.5px] leading-[1.55] text-ink-muted">
          The green wash marks the best value in a column, which for calls, tokens and cost is whichever config did
          the least work — not the one we recommend. <span className="text-ink">b0-chat</span> is the naive approach — the whole contract in one prompt with no
          playbook. <span className="text-ink">b1-prompt</span> is the official baseline: same model, same playbook, one
          direct prompt. <span className="text-ink">x-monolith</span> was removed — one agent handling all eighteen
          rules in a single loop cost more and found less than per-rule workers.
        </p>
      </Section>

      <Section
        title="What each step bought"
        caption="The primary metric per configuration, and what it cost to get there. Navy is the shipped pipeline; the red bar is the experiment we removed."
      >
        <div className="grid gap-3 lg:grid-cols-[7fr_5fr]">
          <Panel
            title="Issue-detection F1 (macro)"
            hint={`Macro-averaged over ${contractCount} contracts. The dashed line is the official baseline.`}
          >
            <BarChart
              bars={f1Bars}
              max={1}
              ticks={[
                { value: 0, label: "0" },
                { value: 0.25, label: "25%" },
                { value: 0.5, label: "50%" },
                { value: 0.75, label: "75%" },
                { value: 1, label: "100%" },
              ]}
              reference={baseline?.present ? { value: baseline.f1, label: "baseline" } : undefined}
              ariaLabel="Issue-detection F1 by configuration. The same values are in the config ladder table above."
            />
          </Panel>
          <Panel
            title="Cost and tokens per contract"
            hint="Recorded from the live run; replaying the cache costs nothing. Tokens exclude cache reads."
          >
            <BarChart
              bars={costBars}
              max={maxCost}
              ticks={[
                { value: 0, label: "$0" },
                { value: maxCost / 2, label: money(maxCost / 2) },
                { value: maxCost, label: money(maxCost) },
              ]}
              ariaLabel="Cost per contract by configuration. The same values are in the config ladder table above."
            />
          </Panel>
        </div>
      </Section>

      <Section
        title="Per contract"
        caption="Issue-detection F1 for every contract in the evaluation set. Eight are real SEC-filed agreements from CUAD; four are seeded synthetics with exact gold."
        aside={
          <p className="mono text-[11px] text-ink-faint">
            {`${contracts.length} contracts · ${present.length} configs · final ${seconds(
              present.find((row) => row.role === "final")?.latency ?? 0,
            )} per contract`}
          </p>
        }
      >
        <ContractMatrix rows={contracts} configs={rows} />
      </Section>

      <Section
        title="How to reproduce"
        caption="From a clean clone, with no API keys and at no cost. The summary this page reads is regenerated by the same two commands."
      >
        <ReproduceBlock />
      </Section>
    </>
  );
}
