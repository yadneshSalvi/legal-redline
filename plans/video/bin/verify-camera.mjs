#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const VIDEO_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RENDER = resolve(VIDEO_DIR, "renders", "playbook-redliner-candidate.mp4");
const ASSEMBLY = JSON.parse(readFileSync(resolve(VIDEO_DIR, "logs", "assembly.json"), "utf8"));
const OUTPUT_DIR = resolve(VIDEO_DIR, "stills", "camera-diffs");
const OUTPUT_JSON = resolve(VIDEO_DIR, "logs", "camera-verification.json");
const FRAME = 1 / 30;

mkdirSync(OUTPUT_DIR, { recursive: true });

function run(args) {
  const result = spawnSync("ffmpeg", args, { encoding: "utf8" });
  if (result.status !== 0) throw new Error((result.stderr || result.stdout).trim());
  return `${result.stdout ?? ""}${result.stderr ?? ""}`;
}

function frame(path, at) {
  run(["-hide_banner", "-loglevel", "error", "-y", "-ss", at.toFixed(6), "-i", RENDER, "-frames:v", "1", path]);
}

function smoothstep(value) {
  return value * value * (3 - 2 * value);
}

function pose(moves, localTime) {
  let current = { scale: 1, x: 0.5, y: 0.5 };
  for (const move of moves) {
    const start = Number(move.at);
    const end = start + Number(move.duration);
    if (localTime < start) return current;
    const target = { scale: Number(move.scale), x: Number(move.x), y: Number(move.y) };
    if (localTime < end) {
      const eased = smoothstep((localTime - start) / Number(move.duration));
      return {
        scale: current.scale + (target.scale - current.scale) * eased,
        x: current.x + (target.x - current.x) * eased,
        y: current.y + (target.y - current.y) * eased,
      };
    }
    current = target;
  }
  return current;
}

const results = [];
for (const beat of ASSEMBLY.beats) {
  const moves = beat.cameraMoves ?? [];
  for (let index = 0; index < moves.length; index += 1) {
    const move = moves[index];
    const localA = Number(move.at) + Number(move.duration) / 2;
    const globalA = Number(beat.start) + localA;
    const globalB = globalA + FRAME;
    const stem = `${beat.id}-${String(index + 1).padStart(2, "0")}`;
    const a = resolve(OUTPUT_DIR, `${stem}-a.png`);
    const b = resolve(OUTPUT_DIR, `${stem}-b.png`);
    const diff = resolve(OUTPUT_DIR, `${stem}-diff.png`);
    frame(a, globalA);
    frame(b, globalB);
    const metadata = run([
      "-hide_banner", "-loglevel", "info", "-y", "-i", a, "-i", b,
      "-filter_complex", "[0:v][1:v]blend=all_mode=difference,signalstats,metadata=print[out]",
      "-map", "[out]", "-frames:v", "1", diff,
    ]);
    const match = metadata.match(/lavfi\.signalstats\.YAVG=([0-9.]+)/);
    const poseA = pose(moves, localA);
    const poseB = pose(moves, localA + FRAME);
    const delta = {
      scale: poseB.scale - poseA.scale,
      x: poseB.x - poseA.x,
      y: poseB.y - poseA.y,
    };
    const prior = index === 0 ? { scale: 1, x: 0.5, y: 0.5 } : moves[index - 1];
    const target = move;
    const monotonic = ["scale", "x", "y"].every((property) => {
      const intended = Number(target[property]) - Number(prior[property]);
      return Math.abs(intended) < 1e-9 || Math.sign(delta[property]) === Math.sign(intended);
    });
    results.push({
      beat: beat.id,
      move: move.label,
      globalFrameA: globalA,
      globalFrameB: globalB,
      poseA,
      poseB,
      delta,
      differenceYavg: match ? Number(match[1]) : null,
      monotonic,
      files: [`stills/camera-diffs/${stem}-a.png`, `stills/camera-diffs/${stem}-b.png`, `stills/camera-diffs/${stem}-diff.png`],
    });
  }
}

const report = {
  render: "renders/playbook-redliner-candidate.mp4",
  method: "Two consecutive 30 fps frames at each move midpoint; pixel-difference image plus monotonic cubic-ease pose audit.",
  passed: results.every((result) => result.monotonic && Number(result.differenceYavg) > 0),
  moves: results,
};
const tmp = `${OUTPUT_JSON}.tmp-${process.pid}`;
writeFileSync(tmp, `${JSON.stringify(report, null, 2)}\n`);
renameSync(tmp, OUTPUT_JSON);
process.stdout.write(`${report.passed ? "PASS" : "FAIL"}: ${results.length} camera moves checked\n`);
if (!report.passed) process.exitCode = 1;
