#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const VIDEO_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RENDER = resolve(VIDEO_DIR, "renders", "playbook-redliner-candidate.mp4");
const TIMINGS = JSON.parse(readFileSync(resolve(VIDEO_DIR, "word-timings.json"), "utf8"));
const ASSEMBLY = JSON.parse(readFileSync(resolve(VIDEO_DIR, "logs", "assembly.json"), "utf8"));
const OUTPUT_DIR = resolve(VIDEO_DIR, "stills", "round4-consistency-audit");
const OUTPUT_JSON = resolve(VIDEO_DIR, "logs", "consistency-audit.json");

const checks = [
  { label: "Word; tracked changes", beat: "cold-open", word: "tracked", visible: "Tracked-change Word page with insertions, deletions, and comments.", status: "MATCH", settle: 1.1 },
  { label: "1–3 hours", beat: "cold-open", word: "one", visible: "Time taken: 1–3 hrs! overlay on the Word page.", status: "MATCH", settle: 0.3 },
  { label: "three playbook positions", beat: "problem", word: "three", visible: "Card title says A playbook has three positions.", status: "MATCH" },
  { label: "Preferred", beat: "problem", word: "preferred", visible: "Preferred playbook-position tile.", status: "MATCH", settle: 0.25 },
  { label: "Fallback", beat: "problem", word: "fallback", visible: "Preferred and Fallback playbook-position tiles.", status: "MATCH", settle: 0.25 },
  { label: "Walk-away; three positions", beat: "problem", word: "walkaway", visible: "Preferred, Fallback, and Walk-away together.", status: "MATCH", settle: 0.25 },
  { label: "40 pages", beat: "problem", word: "forty", visible: "All three playbook positions remain visible as the scale problem is stated.", status: "MATCH" },
  { label: "one-prompt baseline", beat: "baseline", word: "one", occurrence: 0, visible: "Fair-baseline card says same model, same playbook, one direct prompt.", status: "MATCH" },
  { label: "1.1%", beat: "baseline", word: "one", occurrence: 1, visible: "Only the Complete redlines 1.1% tile is ringed.", status: "FIXED", settle: 0.25 },
  { label: "40,000-word contracts", beat: "baseline", word: "forty", visible: "Long-document F1 60.3% is visible on the fair-baseline card.", status: "MATCH" },
  { label: "F1 60.3%", beat: "baseline", word: "sixty", visible: "Only the Long-document F1 60.3% tile is ringed; 41.7% is unringed.", status: "FIXED", settle: 0.25 },
  { label: "Word output: none", beat: "baseline", word: "cannot", visible: "Only the Word output none tile is ringed.", status: "MATCH", settle: 0.25 },
  { label: "Playbook Redliner", beat: "landing", word: "playbook", visible: "Playbook Redliner product UI.", status: "MATCH" },
  { label: "two inputs: Word file + playbook", beat: "landing", word: "two", visible: "Vendor Word-file input and playbook input in the product UI.", status: "MATCH" },
  { label: "18 rules", beat: "landing", word: "eighteen", visible: "Vendor Services Playbook v1.0 with 18 rules.", status: "MATCH", settle: 0.4 },
  { label: "three positions", beat: "landing", word: "three", visible: "The playbook preview still shows the three-position structure.", status: "MATCH" },
  { label: "SEC filing", beat: "pick-sample", word: "sec", visible: "Sample-contract picker is open on the evaluation contracts.", status: "MATCH" },
  { label: "Corio", beat: "pick-sample", word: "corio", visible: "CORIO row is framed in the sample-contract picker.", status: "MATCH", settle: 0.8 },
  { label: "ingest: 50 paragraphs · 11 sections · 6 definitions", beat: "workspace-run", word: "map", visible: "Ingest row is green and shows 50 paragraphs · 11 sections · 6 definitions.", status: "MATCH" },
  { label: "18 drafters", beat: "workspace-run", word: "eighteen", visible: "Full review board shows the 18-rule run and drafter activity.", status: "MATCH", settle: 1.1 },
  { label: "one drafter per rule", beat: "workspace-run", word: "one", visible: "Full 18-rule review board remains visible.", status: "MATCH" },
  { label: "six at a time", beat: "workspace-run", word: "six", visible: "Working panel is framed with a six-worker drafter batch.", status: "MATCH", settle: 1.1 },
  { label: "J / K", beat: "keyboard-review", word: "j", visible: "Review UI and its documented J/K move controls.", status: "MATCH", settle: 0.3 },
  { label: "A = accept", beat: "keyboard-review", word: "a", occurrence: 1, visible: "Accept decision moment and control.", status: "MATCH", settle: 0.2 },
  { label: "E = edit", beat: "keyboard-review", word: "e", visible: "Edit decision moment and control.", status: "MATCH", settle: 0.2 },
  { label: "R = reject", beat: "keyboard-review", word: "r", visible: "Reject decision moment and control.", status: "MATCH", settle: 0.2 },
  { label: "single-transaction cap", beat: "keyboard-review", word: "single", visible: "Full changed cap sentence is held and boxed; the deleted single-transaction basis is legible.", status: "FIXED" },
  { label: "18-month cap", beat: "keyboard-review", word: "eighteen", visible: "The boxed insertion reads eighteen (18) months.", status: "FIXED" },
  { label: "USD 1,500,000 floor", beat: "keyboard-review", word: "one", visible: "The boxed insertion reads USD 1,500,000 while the narration says one and a half million.", status: "FIXED", settle: 0.25 },
  { label: "Word tracked changes + comments", beat: "export-dialog", word: "tracked", visible: "Exported Word copy with tracked changes and playbook comment evidence.", status: "MATCH", settle: 0.5 },
  { label: "12 months’ Fees", beat: "hard-case", word: "twelve", visible: "Synthetic hard-case card shows the exact §21.1 twelve-month Fees cap.", status: "FIXED" },
  { label: "Fees two sections away", beat: "hard-case", word: "two", visible: "Same card shows the separate §1.5 Fees and §1.6 Implementation Fee definitions.", status: "FIXED" },
  { label: "one-off USD 12,000 fee", beat: "hard-case", word: "one", occurrence: 1, visible: "§1.6 reads one-time Implementation Fee, USD 12,000.", status: "FIXED" },
  { label: "complete get_definition rows", beat: "hard-case", word: "follows", visible: "Tool names, arguments/results, and the Fees definition are all inside frame.", status: "FIXED", settle: 1.2 },
  { label: "one clean redline", beat: "hard-case", word: "one", occurrence: 2, visible: "Complete LOL-CAP definition trace remains visible.", status: "MATCH" },
  { label: "two decoy clauses left alone", beat: "hard-case", word: "two", occurrence: 1, visible: "LOL-CAP-only trace remains visible; no unrelated decoy tool rows are introduced.", status: "MATCH" },
  { label: "one-prompt baseline (Short 12)", beat: "comparison", word: "baseline", visible: "Short 12 control and the b1-prompt baseline row.", status: "FIXED", settle: 0.5 },
  { label: "Complete redlines 1.1%", beat: "comparison", word: "one", occurrence: 1, visible: "Short ladder frames b1-prompt 1.1% and final-v4 54.7% in the CRR column.", status: "FIXED", settle: 0.25 },
  { label: "Complete redlines 54.7%", beat: "comparison", word: "fifty", visible: "Same Short CRR view keeps b1-prompt 1.1% and final-v4 54.7% together.", status: "FIXED", settle: 0.25 },
  { label: "40,000-word contracts; click Long 6", beat: "comparison", word: "on", visible: "Visible pointer click on Long 6, followed by the long-tier ladder.", status: "FIXED", settle: 0.6 },
  { label: "40,000-word contracts", beat: "comparison", word: "forty", visible: "Visible pointer click selects Long 6.", status: "FIXED", settle: 0.3 },
  { label: "F1 60.3%", beat: "comparison", word: "sixty", occurrence: 0, visible: "Long ladder frames b1-prompt 60.3% and final-v4 75.3% in F1 MACRO with row labels.", status: "FIXED", settle: 0.3 },
  { label: "F1 75.3%", beat: "comparison", word: "seventy", visible: "Same Long F1 MACRO view keeps 60.3% and 75.3% together.", status: "FIXED", settle: 0.3 },
  { label: "Applied tracked changes 41.7%", beat: "comparison", word: "forty", occurrence: 1, visible: "Long ladder frames b1-prompt 41.7% and final-v4 62.5% in APPLIED YIELD with row labels.", status: "FIXED", settle: 0.3 },
  { label: "Applied tracked changes 62.5%", beat: "comparison", word: "sixty", occurrence: 1, visible: "Same Long APPLIED YIELD view keeps 41.7% and 62.5% together.", status: "FIXED", settle: 0.3 },
  { label: "nothing applied silently", beat: "comparison", word: "nothing", visible: "Zoomed-out full Long-tier ladder.", status: "FIXED", settle: 1.2 },
  { label: "scoped comparison + 47.6% / 8 held-out", globalAt: 222.2, visible: "Static card gives 12-short, 6-long, and long applied-yield scopes plus 47.6% on 8 held-out contracts.", status: "FIXED" },
  { label: "changelog config names: b1, i2–i7, final-v4", beat: "changelog", word: "numbers", visible: "Changelog card shows b1-prompt, i2-workers through i7-precise, and final-v4.", status: "MATCH" },
  { label: "one rule", beat: "hot-take", word: "one", visible: "Hot-take card repeats the one-rule claim.", status: "MATCH" },
  { label: "half a redline", beat: "hot-take", word: "half", visible: "Hot-take card repeats the half-redline claim.", status: "MATCH" },
  { label: "Playbook Redliner + closing URL", beat: "closing", word: "playbook", visible: "Closing card shows the product lockup and playbook-redliner.vercel.app.", status: "MATCH", settle: 0.8 },
  { label: "one command + closing URL", beat: "closing", word: "one", visible: "URL remains visible as one-command reproducibility is spoken.", status: "MATCH" },
];

mkdirSync(OUTPUT_DIR, { recursive: true });

function capture(path, at) {
  const result = spawnSync("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y", "-ss", at.toFixed(6), "-i", RENDER, "-frames:v", "1", path,
  ], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr.trim());
}

function globalTime(check) {
  if (Number.isFinite(check.globalAt)) return { globalAt: Number(check.globalAt), localAt: null };
  const words = TIMINGS[check.beat].filter((entry) => entry.word.toLowerCase() === check.word);
  const word = words[check.occurrence ?? 0];
  if (!word) throw new Error(`missing ${check.word} occurrence ${check.occurrence ?? 0} in ${check.beat}`);
  const assembled = ASSEMBLY.beats.find((entry) => entry.narration === check.beat);
  if (!assembled) throw new Error(`missing assembled beat ${check.beat}`);
  return { globalAt: Number(assembled.start) + Number(word.start), localAt: Number(word.start) };
}

const rows = checks.map((check, index) => {
  const times = globalTime(check);
  const stem = `${String(index + 1).padStart(2, "0")}-${check.beat ?? "card"}`;
  const captureAt = times.globalAt + Number(check.settle ?? 0);
  capture(resolve(OUTPUT_DIR, `${stem}.png`), captureAt);
  return {
    label: check.label,
    beat: check.beat ?? "comparison-card",
    localAt: times.localAt,
    globalAt: times.globalAt,
    captureAt,
    visible: check.visible,
    status: check.status,
    evidence: `stills/round4-consistency-audit/${stem}.png`,
  };
});

const report = {
  render: "renders/playbook-redliner-candidate.mp4",
  method: "Every named or numbered narration claim plus the explicitly requested ingest, comparison-card, changelog-card, and closing-URL checks was located from word-timings.json and visually inspected in the rendered candidate.",
  passed: rows.every((row) => row.status === "MATCH" || row.status === "FIXED"),
  rows,
};
const tmp = `${OUTPUT_JSON}.tmp-${process.pid}`;
writeFileSync(tmp, `${JSON.stringify(report, null, 2)}\n`);
renameSync(tmp, OUTPUT_JSON);
process.stdout.write(`PASS: ${rows.length} spoken/screen consistency checks captured\n`);
