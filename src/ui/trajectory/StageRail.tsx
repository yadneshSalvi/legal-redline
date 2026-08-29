"use client";

import { Check, Circle, RotateCw, TriangleAlert } from "lucide-react";
import type { AgentName } from "@/src/agent/types";
import { cn } from "../cn";
import { durationLabel, type RuleSummary, type RuleVerdict, type StageSummary } from "../lib/trajectory";

const verdictStyle: Record<RuleVerdict, { dot: string; label: string; Icon: typeof Check | null }> = {
  pass: { dot: "bg-verified", label: "verified", Icon: Check },
  repaired: { dot: "bg-insertion", label: "repaired", Icon: RotateCw },
  fail: { dot: "bg-deletion", label: "escalated", Icon: TriangleAlert },
  clear: { dot: "bg-hairline-strong", label: "clear", Icon: null },
};

function money(value: number): string | null {
  return value > 0 ? `$${value.toFixed(2)}` : null;
}

/**
 * The left rail: the pipeline as it actually ran, with the drafter stage opened up into one row per
 * rule. Clicking a stage or a rule filters the log and jumps to that stage's first event.
 */
export function StageRail({
  stages,
  rules,
  activeAgent,
  activeRule,
  onStage,
  onRule,
}: {
  stages: StageSummary[];
  rules: RuleSummary[];
  activeAgent: AgentName | "all";
  activeRule: string | "all";
  onStage: (agent: AgentName | "all") => void;
  onRule: (ruleId: string | "all") => void;
}) {
  return (
    <nav aria-label="Pipeline stages" className="pane min-h-0 flex-1 px-3 py-3">
      <div className="mb-2 flex items-baseline justify-between px-1">
        <h2 className="label-caps">Pipeline</h2>
        {activeAgent !== "all" || activeRule !== "all" ? (
          <button
            type="button"
            onClick={() => {
              onStage("all");
              onRule("all");
            }}
            className="rounded-[4px] text-[11.5px] text-ink-muted underline decoration-hairline-strong underline-offset-[3px] hover:text-ink"
          >
            Show all
          </button>
        ) : null}
      </div>

      <ol className="space-y-px">
        {stages.map((stage) => {
          const active = activeAgent === stage.agent;
          const pending = stage.events === 0;
          return (
            <li key={stage.agent}>
              <button
                type="button"
                disabled={pending}
                aria-current={active ? "true" : undefined}
                onClick={() => onStage(active ? "all" : stage.agent)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-field px-2 py-1.5 text-left transition-colors duration-150",
                  active ? "bg-navy-soft" : pending ? "" : "hover:bg-navy-soft/50",
                  pending && "cursor-default opacity-70",
                )}
              >
                {pending ? (
                  <Circle size={11} strokeWidth={1.5} className="shrink-0 text-ink-faint" aria-hidden />
                ) : (
                  <span
                    aria-hidden
                    className="grid size-[13px] shrink-0 place-items-center rounded-full bg-verified-soft text-verified"
                  >
                    <Check size={9} strokeWidth={2.5} />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className={cn("block truncate text-[12.5px]", pending ? "text-ink-muted" : "text-ink")}>
                    {stage.label}
                  </span>
                  <span className="mono block truncate text-[10.5px] text-ink-faint">
                    {pending
                      ? "pending"
                      : [
                          `${stage.events} ${stage.events === 1 ? "event" : "events"}`,
                          stage.durationMs > 0 ? durationLabel(stage.durationMs) : null,
                          money(stage.costUsd),
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                  </span>
                </span>
              </button>

              {stage.agent === "drafter" && rules.length > 0 ? (
                <ul className="mt-1 mb-2 ml-[13px] space-y-px border-l border-hairline pl-2">
                  {rules.map((rule) => {
                    const style = verdictStyle[rule.verdict];
                    const selected = activeRule === rule.ruleId;
                    return (
                      <li key={rule.ruleId}>
                        <button
                          type="button"
                          aria-current={selected ? "true" : undefined}
                          onClick={() => onRule(selected ? "all" : rule.ruleId)}
                          title={rule.note ?? undefined}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-field px-1.5 py-1 text-left transition-colors duration-150",
                            selected ? "bg-navy-soft" : "hover:bg-navy-soft/50",
                          )}
                        >
                          <span aria-hidden className={cn("size-[6px] shrink-0 rounded-full", style.dot)} />
                          <span className="mono min-w-0 flex-1 truncate text-[11px] text-ink">{rule.ruleId}</span>
                          <span className="mono shrink-0 text-[10px] text-ink-faint">
                            {rule.costUsd > 0 ? `$${rule.costUsd.toFixed(2)}` : ""}
                          </span>
                          <span className="sr-only">{style.label}</span>
                          {style.Icon ? (
                            <style.Icon
                              size={10}
                              strokeWidth={2}
                              aria-hidden
                              className={cn(
                                "shrink-0",
                                rule.verdict === "pass"
                                  ? "text-verified"
                                  : rule.verdict === "repaired"
                                    ? "text-insertion"
                                    : "text-deletion",
                              )}
                            />
                          ) : (
                            <span aria-hidden className="w-[10px] shrink-0" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
