"use client";

import { Check, X } from "lucide-react";
import type { ReactNode } from "react";
import type { TrajectoryEvent } from "@/src/agent/types";
import { Tag } from "../Chip";
import { cn } from "../cn";
import { JsonView } from "./JsonView";

interface CheckRow {
  name: string;
  ok: boolean;
  detail?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function asChecks(value: unknown): CheckRow[] | null {
  if (!Array.isArray(value)) return null;
  const checks = value.filter(
    (item): item is CheckRow => isRecord(item) && typeof item.name === "string" && typeof item.ok === "boolean",
  );
  return checks.length > 0 ? checks : null;
}

function asMessages(value: unknown): { role: string; content: string }[] | null {
  if (!Array.isArray(value)) return null;
  const messages = value.filter(
    (item): item is { role: string; content: string } =>
      isRecord(item) && typeof item.role === "string" && typeof item.content === "string",
  );
  return messages.length > 0 ? messages : null;
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mt-3 first:mt-0">
      <h4 className="label-caps mb-1.5">{label}</h4>
      {children}
    </section>
  );
}

function Prose({ text, tone = "quiet" }: { text: string; tone?: "quiet" | "plain" }) {
  return (
    <p
      className={cn(
        "mono rounded-field border px-2.5 py-2 text-[11.5px] leading-[1.6] whitespace-pre-wrap",
        tone === "quiet" ? "border-hairline bg-paper text-ink" : "border-hairline bg-sheet text-ink",
      )}
    >
      {text}
    </p>
  );
}

function ChecksList({ checks }: { checks: CheckRow[] }) {
  return (
    <ul className="divide-y divide-hairline overflow-hidden rounded-field border border-hairline">
      {checks.map((check) => (
        <li key={check.name} className="flex items-start gap-2 bg-sheet px-2.5 py-1.5">
          {check.ok ? (
            <Check size={12} strokeWidth={2.25} className="mt-[3px] shrink-0 text-verified" aria-hidden />
          ) : (
            <X size={12} strokeWidth={2.25} className="mt-[3px] shrink-0 text-deletion" aria-hidden />
          )}
          <span className="min-w-0">
            <span className="mono block text-[11.5px] text-ink">{check.name}</span>
            {check.detail ? <span className="block text-[11.5px] text-ink-muted">{check.detail}</span> : null}
          </span>
          <span className="sr-only">{check.ok ? "passed" : "failed"}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Renders an event payload the way it should be read: prompts as messages, tool inputs and results
 * as tinted JSON, validation reports as check lists, verifier verdicts and human decisions as prose.
 * Anything unrecognised falls back to JSON, so a real trajectory never renders blank.
 */
export function PayloadView({ event }: { event: TrajectoryEvent }) {
  const payload = event.payload;
  if (payload === undefined || payload === null) {
    return <p className="text-[12px] text-ink-muted italic">This event carries no payload.</p>;
  }
  if (!isRecord(payload)) return <JsonView value={payload} />;

  const blocks: ReactNode[] = [];
  const system = asString(payload.system);
  const messages = asMessages(payload.messages);
  const text = asString(payload.text);
  const checks = asChecks(payload.checks);
  const parsed = payload.parsed;
  const input = payload.input;
  const result = payload.result;
  const error = asString(payload.error);
  const feedback = asString(payload.feedback);
  const notes = asString(payload.notes) ?? asString(payload.note);
  const toolUse = payload.tool_use;
  const verdict = asString(payload.verdict);
  const stopReason = asString(payload.stop_reason);
  const rest = Object.fromEntries(
    Object.entries(payload).filter(
      ([key]) =>
        ![
          "system",
          "messages",
          "text",
          "checks",
          "parsed",
          "input",
          "result",
          "error",
          "feedback",
          "notes",
          "note",
          "tool_use",
          "verdict",
          "stop_reason",
          "tool",
        ].includes(key),
    ),
  );

  if (system) {
    blocks.push(
      <Block key="system" label="System">
        <Prose text={system} />
      </Block>,
    );
  }
  if (messages) {
    blocks.push(
      <Block key="messages" label="Messages">
        <div className="space-y-1.5">
          {messages.map((message, index) => (
            <div key={index} className="rounded-field border border-hairline bg-sheet">
              <p className="label-caps border-b border-hairline px-2.5 py-1">{message.role}</p>
              <p className="mono px-2.5 py-2 text-[11.5px] leading-[1.6] whitespace-pre-wrap text-ink">
                {message.content}
              </p>
            </div>
          ))}
        </div>
      </Block>,
    );
  }
  if (text) {
    blocks.push(
      <Block key="text" label={event.agent === "memo" ? "Memo (start)" : "Assistant"}>
        <Prose text={text} tone="plain" />
      </Block>,
    );
  }
  if (toolUse !== undefined) {
    blocks.push(
      <Block key="tool_use" label="Tool use">
        <JsonView value={toolUse} className="rounded-field border border-hairline bg-paper px-2.5 py-2" />
      </Block>,
    );
  }
  if (input !== undefined) {
    blocks.push(
      <Block key="input" label="Tool input">
        <JsonView value={input} className="rounded-field border border-hairline bg-paper px-2.5 py-2" />
      </Block>,
    );
  }
  if (result !== undefined) {
    blocks.push(
      <Block key="result" label="Tool result">
        <JsonView value={result} className="rounded-field border border-hairline bg-paper px-2.5 py-2" />
      </Block>,
    );
  }
  if (error) {
    blocks.push(
      <Block key="error" label="Rejected">
        <p className="rounded-field border border-deletion/35 bg-deletion-soft px-2.5 py-2 text-[12px] leading-[1.6] text-ink">
          {error}
        </p>
      </Block>,
    );
  }
  if (parsed !== undefined) {
    blocks.push(
      <Block key="parsed" label="Structured output">
        <JsonView value={parsed} className="rounded-field border border-hairline bg-paper px-2.5 py-2" />
      </Block>,
    );
  }
  if (checks) {
    blocks.push(
      <Block key="checks" label={`Checks${verdict ? ` — ${verdict}` : ""}`}>
        <ChecksList checks={checks} />
      </Block>,
    );
  }
  if (feedback) {
    blocks.push(
      <Block key="feedback" label="Verifier feedback">
        <p className="rounded-field border border-comment/45 bg-comment-soft px-2.5 py-2 text-[12px] leading-[1.6] text-ink">
          {feedback}
        </p>
      </Block>,
    );
  }
  if (notes) {
    blocks.push(
      <Block key="notes" label="Note">
        <p className="text-[12px] leading-[1.6] text-ink">{notes}</p>
      </Block>,
    );
  }
  if (Object.keys(rest).length > 0) {
    blocks.push(
      <Block key="rest" label="Event data">
        <JsonView value={rest} className="rounded-field border border-hairline bg-paper px-2.5 py-2" />
      </Block>,
    );
  }

  return (
    <div>
      {stopReason || verdict ? (
        <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
          {stopReason ? <Tag tone="neutral">stop: {stopReason}</Tag> : null}
          {verdict ? <Tag tone={verdict === "pass" ? "verified" : "comment"}>{verdict}</Tag> : null}
        </div>
      ) : null}
      {blocks}
    </div>
  );
}
