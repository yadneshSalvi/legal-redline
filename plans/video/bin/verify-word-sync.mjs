#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const VIDEO_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RENDER = resolve(VIDEO_DIR, "renders", "playbook-redliner-candidate.mp4");
const TIMINGS = JSON.parse(readFileSync(resolve(VIDEO_DIR, "word-timings.json"), "utf8"));
const TIMELINE = JSON.parse(readFileSync(resolve(VIDEO_DIR, "timeline.json"), "utf8"));
const ASSEMBLY = JSON.parse(readFileSync(resolve(VIDEO_DIR, "logs", "assembly.json"), "utf8"));
const OUTPUT_DIR = resolve(VIDEO_DIR, "stills", "word-sync");
const OUTPUT_JSON = resolve(VIDEO_DIR, "logs", "word-sync-verification.json");

const checks = [
  { beat: "opening", word: "negotiating", occurrence: 0, event: "second title line fades in", eventAt: (item) => item.states[1].at, settle: 0.25 },
  { beat: "cold-open", word: "tracked", occurrence: 0, event: "smooth redline crop begins", eventAt: (item) => item.cameraMoves[0].at, settle: 0.5 },
  { beat: "cold-open", word: "one", occurrence: 0, event: "time-taken card fades in", eventAt: (item) => item.timeCardAt, settle: 0.25 },
  { beat: "problem", word: "preferred", occurrence: 0, event: "Preferred tile fades in", eventAt: (item) => item.states[0].at, settle: 0.25 },
  { beat: "baseline", word: "one", occurrence: 1, event: "Complete redlines tile gains its ring", eventAt: (item) => item.states[0].at, settle: 0.25 },
  { beat: "pick-sample", word: "corio", occurrence: 0, event: "camera starts its CORIO-row punch-in", eventAt: (item) => item.cameraMoves[0].at, settle: 0.5 },
  { beat: "workspace-run", word: "planner", occurrence: 0, event: "camera starts its Working-panel punch-in", eventAt: (item) => item.cameraMoves[0].at, settle: 0.5 },
  { beat: "findings-arrive", word: "findings", occurrence: 0, event: "camera starts its findings-pane punch-in", eventAt: (item) => item.cameraMoves[1].at, settle: 0.5 },
];

mkdirSync(OUTPUT_DIR, { recursive: true });

function capture(path, at) {
  const result = spawnSync("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y", "-ss", Math.max(0, at).toFixed(6), "-i", RENDER, "-frames:v", "1", path,
  ], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr.trim());
}

const rows = checks.map((check, index) => {
  const words = TIMINGS[check.beat].filter((entry) => entry.word.toLowerCase() === check.word);
  const word = words[check.occurrence];
  if (!word) throw new Error(`missing ${check.word} occurrence ${check.occurrence} in ${check.beat}`);
  const item = TIMELINE.find((entry) => entry.narration === check.beat);
  const assembled = ASSEMBLY.beats.find((entry) => entry.narration === check.beat);
  const eventAt = Number(check.eventAt(item));
  const delta = eventAt - Number(word.start);
  const globalAt = Number(assembled.start) + eventAt;
  const stem = `${String(index + 1).padStart(2, "0")}-${check.beat}-${check.word}`;
  capture(resolve(OUTPUT_DIR, `${stem}-before.png`), globalAt - 0.05);
  capture(resolve(OUTPUT_DIR, `${stem}-after.png`), globalAt + check.settle);
  return {
    beat: check.beat,
    word: check.word,
    deepgramTime: word.start,
    eventTime: eventAt,
    delta,
    event: check.event,
    passed: Math.abs(delta) <= 0.02,
    evidence: [`stills/word-sync/${stem}-before.png`, `stills/word-sync/${stem}-after.png`],
  };
});

const report = { passed: rows.every((row) => row.passed), toleranceSeconds: 0.02, checks: rows };
const tmp = `${OUTPUT_JSON}.tmp-${process.pid}`;
writeFileSync(tmp, `${JSON.stringify(report, null, 2)}\n`);
renameSync(tmp, OUTPUT_JSON);
process.stdout.write(`${report.passed ? "PASS" : "FAIL"}: ${rows.length} word-timed events checked\n`);
if (!report.passed) process.exitCode = 1;
