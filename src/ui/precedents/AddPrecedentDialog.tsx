"use client";

import { useState, type ReactNode } from "react";
import type { Precedent } from "@/src/agent/types";
import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { cn } from "../cn";
import type { PlaybookSummary } from "../fixtures/samples";
import { createPrecedent } from "../lib/api";

interface Draft {
  ruleId: string;
  title: string;
  source: string;
  level: Precedent["level"];
  clauseBefore: string;
  clauseAfter: string;
  comment: string;
  approvedBy: string;
  tags: string;
}

const empty = (ruleId: string): Draft => ({
  ruleId,
  title: "",
  source: "",
  level: "preferred",
  clauseBefore: "",
  clauseAfter: "",
  comment: "",
  approvedBy: "",
  tags: "",
});

const field = "w-full rounded-field border border-hairline-strong bg-sheet px-2.5 py-1.5 text-[13px] text-ink placeholder:text-ink-faint hover:border-navy";

function Row({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="label-caps">{label}</span>
      {hint ? <span className="mt-0.5 block text-[11.5px] text-ink-faint">{hint}</span> : null}
      <span className="mt-1.5 block">{children}</span>
      {error ? <span className="mt-1 block text-[11.5px] text-deletion">{error}</span> : null}
    </label>
  );
}

/** Adds an approved redline to the bank by hand (`POST /api/precedents`). */
export function AddPrecedentDialog({
  open,
  onOpenChange,
  playbook,
  onAdded,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playbook: PlaybookSummary;
  onAdded: (precedent: Precedent) => void;
}) {
  const [draft, setDraft] = useState<Draft>(() => empty(playbook.rules[0]?.id ?? ""));
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({});
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = async () => {
    const next: Partial<Record<keyof Draft, string>> = {};
    if (!draft.ruleId) next.ruleId = "Choose the rule this language answers.";
    if (draft.title.trim().length < 3) next.title = "Give it a name a colleague would recognise.";
    if (draft.source.trim().length < 3) next.source = "Name the agreement and month it came from.";
    if (draft.clauseBefore.trim().length < 10) next.clauseBefore = "Paste the clause as the vendor drafted it.";
    if (draft.comment.trim().length < 10) next.comment = "This is what goes into Word — write the sentence.";
    if (draft.approvedBy.trim().length < 2) next.approvedBy = "Who approved it?";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSaving(true);
    setFailed(false);
    const created = await createPrecedent({
      ruleId: draft.ruleId,
      title: draft.title.trim(),
      source: draft.source.trim(),
      clauseBefore: draft.clauseBefore.trim(),
      clauseAfter: draft.clauseAfter.trim(),
      comment: draft.comment.trim(),
      level: draft.level,
      approvedBy: draft.approvedBy.trim(),
      tags: draft.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
    setSaving(false);
    if (!created) {
      setFailed(true);
      return;
    }
    onAdded(created);
    setDraft(empty(playbook.rules[0]?.id ?? ""));
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add a precedent"
      description="Approved language the drafters retrieve when they meet this rule again."
      width={680}
      footer={
        <>
          {failed ? (
            <p className="mr-auto text-[12px] text-deletion">
              The precedent could not be saved. The precedent store is not writable in this environment.
            </p>
          ) : null}
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => void submit()} disabled={saving}>
            {saving ? "Saving…" : "Add precedent"}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Row label="Playbook rule" error={errors.ruleId}>
            <select value={draft.ruleId} onChange={(event) => set("ruleId", event.target.value)} className={field}>
              {playbook.rules.map((rule) => (
                <option key={rule.id} value={rule.id}>
                  {rule.id} — {rule.title}
                </option>
              ))}
            </select>
          </Row>
          <Row label="Position" hint="Preferred is where we start; fallback is where we can land.">
            <div className="flex gap-1.5">
              {(["preferred", "fallback"] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  aria-pressed={draft.level === level}
                  onClick={() => set("level", level)}
                  className={cn(
                    "h-[34px] flex-1 rounded-field border text-[13px] transition-colors duration-150",
                    draft.level === level
                      ? "border-navy bg-navy text-sheet"
                      : "border-hairline-strong bg-sheet text-ink-muted hover:border-navy hover:text-ink",
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </Row>
        </div>

        <Row label="Name" error={errors.title}>
          <input
            className={field}
            value={draft.title}
            placeholder="Mutual cap at 12 months’ fees with an Excluded Claims carve-out"
            onChange={(event) => set("title", event.target.value)}
          />
        </Row>

        <div className="grid gap-4 sm:grid-cols-2">
          <Row label="Source" error={errors.source}>
            <input
              className={field}
              value={draft.source}
              placeholder="Acme Cloud MSA (Mar 2025)"
              onChange={(event) => set("source", event.target.value)}
            />
          </Row>
          <Row label="Approved by" error={errors.approvedBy}>
            <input
              className={field}
              value={draft.approvedBy}
              placeholder="R. Okafor"
              onChange={(event) => set("approvedBy", event.target.value)}
            />
          </Row>
        </div>

        <Row label="Clause as drafted" hint="The vendor's words." error={errors.clauseBefore}>
          <textarea
            className={cn(field, "h-[86px] resize-y font-serif leading-[1.6]")}
            value={draft.clauseBefore}
            onChange={(event) => set("clauseBefore", event.target.value)}
          />
        </Row>

        <Row label="Clause as approved" hint="Leave empty when the approved answer was to delete the clause.">
          <textarea
            className={cn(field, "h-[86px] resize-y font-serif leading-[1.6]")}
            value={draft.clauseAfter}
            onChange={(event) => set("clauseAfter", event.target.value)}
          />
        </Row>

        <Row label="Comment" hint="Written into Word next to the change." error={errors.comment}>
          <textarea
            className={cn(field, "h-[68px] resize-y leading-[1.6]")}
            value={draft.comment}
            placeholder="[Playbook] We cap liability mutually at…"
            onChange={(event) => set("comment", event.target.value)}
          />
        </Row>

        <Row label="Tags" hint="Comma separated, e.g. hosting, saas.">
          <input className={field} value={draft.tags} onChange={(event) => set("tags", event.target.value)} />
        </Row>
      </div>
    </Dialog>
  );
}
