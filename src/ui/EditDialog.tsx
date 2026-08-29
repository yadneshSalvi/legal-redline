"use client";

import { useRef, useState } from "react";
import type { DocumentModel, RedlineOp } from "@/src/engine/types";
import { Button } from "./Button";
import { Dialog } from "./Dialog";
import { SeverityPill } from "./SeverityPill";
import type { DecidedFinding } from "./lib/redline";

const textareaClass =
  "w-full resize-y rounded-field border border-hairline-strong bg-sheet px-2.5 py-2 font-serif text-[13.5px] leading-[1.6] text-ink transition-colors duration-150 hover:border-navy focus:border-navy";

/**
 * The reviewer's edit surface: the agent's wording is a starting point, not the answer. Saving records
 * a `Decision{action:"edit"}` so the applied document carries the reviewer's text, not the agent's.
 */
interface EditDialogProps {
  decided: DecidedFinding | null;
  document: DocumentModel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (ops: RedlineOp[], comment: string) => void;
}

export function EditDialog({ decided, ...rest }: EditDialogProps) {
  if (!decided) return null;
  // Remounting on open resets the form to the agent's current wording.
  return <EditForm key={`${decided.finding.id}-${rest.open}`} decided={decided} {...rest} />;
}

function EditForm({
  decided,
  document: doc,
  open,
  onOpenChange,
  onSave,
}: EditDialogProps & { decided: DecidedFinding }) {
  const [ops, setOps] = useState<RedlineOp[]>(() => decided.ops.map((op) => ({ ...op })));
  const [comment, setComment] = useState(decided.comment);
  const firstField = useRef<HTMLTextAreaElement | null>(null);

  const byId = new Map(doc.paragraphs.map((p) => [p.id, p]));

  const update = (index: number, patch: Partial<Extract<RedlineOp, { kind: "replace" }>> & { text?: string }) =>
    setOps((current) =>
      current.map((op, i) => {
        if (i !== index) return op;
        if (op.kind === "replace" && patch.newText !== undefined) return { ...op, newText: patch.newText };
        if (op.kind === "insert_after" && patch.text !== undefined) return { ...op, text: patch.text };
        return op;
      }),
    );

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={decided.finding.ruleTitle}
      description={`${decided.finding.sectionRef ?? decided.finding.ruleId} · edit the wording before it is written into the document`}
      width={760}
      onOpenAutoFocus={(event) => {
        if (!firstField.current) return;
        event.preventDefault();
        firstField.current.focus();
        firstField.current.setSelectionRange(0, 0);
      }}
      footer={
        <>
          <Button variant="quiet" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onSave(ops, comment);
              onOpenChange(false);
            }}
          >
            Save and accept
          </Button>
        </>
      }
    >
      <div className="mb-4 flex items-center gap-2">
        <SeverityPill severity={decided.finding.severity} />
        <p className="text-[12.5px] text-ink-muted">
          {ops.length} change{ops.length === 1 ? "" : "s"} in {new Set(ops.map((op) => op.paragraphId)).size} paragraph
          {new Set(ops.map((op) => op.paragraphId)).size === 1 ? "" : "s"}
        </p>
      </div>

      <div className="space-y-5">
        {ops.map((op, index) => (
          <section key={`${op.paragraphId}-${index}`} className="rounded-card border border-hairline p-3.5">
            <p className="mono text-[11px] text-ink-muted">
              {op.kind === "replace"
                ? `replace · ${op.paragraphId}`
                : op.kind === "insert_after"
                  ? `insert after · ${op.paragraphId}`
                  : `delete paragraph · ${op.paragraphId}`}
            </p>

            {op.kind === "replace" ? (
              <div className="mt-2.5 grid gap-3 md:grid-cols-2">
                <div>
                  <p className="label-caps mb-1.5">Their text</p>
                  <p className="rounded-field border border-hairline bg-paper px-2.5 py-2 font-serif text-[13.5px] leading-[1.6] text-deletion line-through decoration-[1.5px]">
                    {op.oldText}
                  </p>
                </div>
                <div>
                  <label className="label-caps mb-1.5 block" htmlFor={`op-${index}`}>
                    Your text
                  </label>
                  <textarea
                    ref={index === 0 ? firstField : undefined}
                    id={`op-${index}`}
                    rows={Math.max(3, Math.ceil(op.newText.length / 46) + 1)}
                    value={op.newText}
                    onChange={(event) => update(index, { newText: event.target.value })}
                    className={textareaClass}
                  />
                </div>
              </div>
            ) : op.kind === "insert_after" ? (
              <div className="mt-2.5">
                <label className="label-caps mb-1.5 block" htmlFor={`op-${index}`}>
                  New paragraph
                </label>
                <textarea
                  ref={index === 0 ? firstField : undefined}
                  id={`op-${index}`}
                  rows={Math.max(3, Math.ceil(op.text.length / 72) + 1)}
                  value={op.text}
                  onChange={(event) => update(index, { text: event.target.value })}
                  className={textareaClass}
                />
              </div>
            ) : (
              <div className="mt-2.5">
                <p className="label-caps mb-1.5">Paragraph to be struck out in full</p>
                <p className="rounded-field border border-hairline bg-paper px-2.5 py-2 font-serif text-[13.5px] leading-[1.6] text-deletion line-through decoration-[1.5px]">
                  {byId.get(op.paragraphId)?.text ?? op.paragraphId}
                </p>
              </div>
            )}
          </section>
        ))}

        <section>
          <label className="label-caps mb-1.5 block" htmlFor="edit-comment">
            Margin comment — goes into Word
          </label>
          <textarea
            id="edit-comment"
            rows={4}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            className={textareaClass}
          />
        </section>
      </div>
    </Dialog>
  );
}
