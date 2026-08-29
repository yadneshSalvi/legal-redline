"use client";

import { Fragment, type ReactNode } from "react";

/**
 * A small JSON pretty-printer for tool inputs and results. Tinted with tokens only — keys in
 * `insertion`, numbers in `medium`, booleans in `verified`, punctuation in `ink.faint` — and depth
 * limited so a huge payload cannot lock the page up.
 */
const INDENT = "  ";
const MAX_DEPTH = 6;
const MAX_ITEMS = 60;
const MAX_STRING = 1400;

function Punct({ children }: { children: ReactNode }) {
  return <span className="text-ink-faint">{children}</span>;
}

function Scalar({ value }: { value: unknown }) {
  if (value === null) return <span className="text-ink-faint">null</span>;
  if (typeof value === "number") return <span className="text-medium">{String(value)}</span>;
  if (typeof value === "boolean") return <span className="text-verified">{String(value)}</span>;
  const text = String(value);
  const clipped = text.length > MAX_STRING ? `${text.slice(0, MAX_STRING)}…` : text;
  return (
    <span className="text-ink">
      <Punct>&quot;</Punct>
      {clipped}
      <Punct>&quot;</Punct>
    </span>
  );
}

function Node({ value, depth, pad }: { value: unknown; depth: number; pad: string }) {
  if (value === null || typeof value !== "object") return <Scalar value={value} />;
  if (depth >= MAX_DEPTH) return <span className="text-ink-faint">…</span>;
  const inner = `${pad}${INDENT}`;

  if (Array.isArray(value)) {
    if (value.length === 0) return <Punct>[]</Punct>;
    const items = value.slice(0, MAX_ITEMS);
    return (
      <>
        <Punct>[</Punct>
        {items.map((item, index) => (
          <Fragment key={index}>
            {"\n"}
            {inner}
            <Node value={item} depth={depth + 1} pad={inner} />
            {index < items.length - 1 ? <Punct>,</Punct> : null}
          </Fragment>
        ))}
        {value.length > items.length ? (
          <>
            {"\n"}
            {inner}
            <span className="text-ink-faint">{`… ${value.length - items.length} more`}</span>
          </>
        ) : null}
        {"\n"}
        {pad}
        <Punct>]</Punct>
      </>
    );
  }

  const entries = Object.entries(value as Record<string, unknown>).filter(([, item]) => item !== undefined);
  if (entries.length === 0) return <Punct>{"{}"}</Punct>;
  return (
    <>
      <Punct>{"{"}</Punct>
      {entries.map(([key, item], index) => (
        <Fragment key={key}>
          {"\n"}
          {inner}
          <span className="text-insertion">{key}</span>
          <Punct>: </Punct>
          <Node value={item} depth={depth + 1} pad={inner} />
          {index < entries.length - 1 ? <Punct>,</Punct> : null}
        </Fragment>
      ))}
      {"\n"}
      {pad}
      <Punct>{"}"}</Punct>
    </>
  );
}

export function JsonView({ value, className }: { value: unknown; className?: string }) {
  return (
    <pre className={`mono overflow-x-auto text-[11.5px] leading-[1.6] whitespace-pre-wrap ${className ?? ""}`}>
      <code>
        <Node value={value} depth={0} pad="" />
      </code>
    </pre>
  );
}
