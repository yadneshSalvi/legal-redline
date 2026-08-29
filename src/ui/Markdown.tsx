"use client";

import type { ReactNode } from "react";

/**
 * A deliberately small Markdown renderer for the issues memo: headings, paragraphs, bullet and
 * numbered lists, pipe tables, bold, italic and inline code. No dependency, no HTML passthrough.
 */

function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${index++}`;
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key} className="font-semibold text-ink">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code key={key} className="mono rounded-[4px] bg-paper px-1 py-[1px] text-[11.5px] text-ink">
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      nodes.push(
        <em key={key} className="italic">
          {token.slice(1, -1)}
        </em>,
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

const cells = (line: string): string[] =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

const isDivider = (line: string): boolean => /^\|?[\s:|-]+\|[\s:|-]+$/.test(line.trim());

export function Markdown({ source }: { source: string }) {
  const lines = source.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().length === 0) {
      i += 1;
      continue;
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const content = inline(heading[2], `h${i}`);
      blocks.push(
        level === 1 ? (
          <h1 key={i} className="mt-1 mb-3 font-serif text-[19px] leading-tight font-semibold text-ink">
            {content}
          </h1>
        ) : level === 2 ? (
          <h2 key={i} className="mt-6 mb-2 border-t border-hairline pt-4 font-serif text-[15px] font-semibold text-ink">
            {content}
          </h2>
        ) : (
          <h3 key={i} className="mt-4 mb-1.5 font-serif text-[13.5px] font-semibold text-ink">
            {content}
          </h3>
        ),
      );
      i += 1;
      continue;
    }

    if (line.trim().startsWith("|")) {
      const table: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        table.push(lines[i]);
        i += 1;
      }
      const header = cells(table[0]);
      const body = table.slice(isDivider(table[1] ?? "") ? 2 : 1).map(cells);
      blocks.push(
        <div key={`t${i}`} className="my-3 overflow-hidden rounded-field border border-hairline">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-paper">
                {header.map((cell, index) => (
                  <th key={index} className="label-caps border-b border-hairline px-2.5 py-2 align-bottom">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-hairline last:border-b-0">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={
                        cellIndex === 0
                          ? "px-2.5 py-2 align-top text-[12.5px] leading-[1.5] whitespace-nowrap text-ink"
                          : "px-2.5 py-2 align-top text-[12.5px] leading-[1.5] text-ink"
                      }
                    >
                      {inline(cell, `c${rowIndex}-${cellIndex}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    const bullet = /^\s*[-*]\s+/;
    if (bullet.test(line)) {
      const items: string[] = [];
      while (i < lines.length && (bullet.test(lines[i]) || /^\s{2,}\S/.test(lines[i]))) {
        if (bullet.test(lines[i])) items.push(lines[i].replace(bullet, ""));
        else items[items.length - 1] += ` ${lines[i].trim()}`;
        i += 1;
      }
      blocks.push(
        <ul key={`u${i}`} className="my-2 space-y-1.5 pl-4">
          {items.map((item, index) => (
            <li key={index} className="list-disc text-[13px] leading-[1.6] text-ink marker:text-ink-faint">
              {inline(item, `li${i}-${index}`)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    const ordered = /^\s*\d+\.\s+/;
    if (ordered.test(line)) {
      const items: string[] = [];
      while (i < lines.length && (ordered.test(lines[i]) || /^\s{3,}\S/.test(lines[i]))) {
        if (ordered.test(lines[i])) items.push(lines[i].replace(ordered, ""));
        else items[items.length - 1] += ` ${lines[i].trim()}`;
        i += 1;
      }
      blocks.push(
        <ol key={`o${i}`} className="my-2 space-y-1.5 pl-5">
          {items.map((item, index) => (
            <li key={index} className="list-decimal text-[13px] leading-[1.6] text-ink marker:text-ink-faint">
              {inline(item, `oi${i}-${index}`)}
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    const paragraph: string[] = [];
    while (i < lines.length && lines[i].trim().length > 0 && !/^(#{1,4}\s|\||\s*[-*]\s|\s*\d+\.\s)/.test(lines[i])) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    blocks.push(
      <p key={`p${i}`} className="my-2 text-[13px] leading-[1.65] text-ink">
        {inline(paragraph.join(" "), `p${i}`)}
      </p>,
    );
  }

  return <div>{blocks}</div>;
}
