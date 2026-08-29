#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BIN_DIR = dirname(fileURLToPath(import.meta.url));
const VIDEO_DIR = resolve(BIN_DIR, "..");
const TIMELINE_PATH = resolve(VIDEO_DIR, "timeline.json");
const MANIFEST_PATH = resolve(VIDEO_DIR, "narration/manifest.json");
const RENDER_DIR = resolve(VIDEO_DIR, "renders");
const WORK_DIR = resolve(RENDER_DIR, `.assemble-${process.pid}`);
const OUTPUT = resolve(RENDER_DIR, "playbook-redliner.mp4");
const FPS = 30;
const FADE = 0.25;

function run(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "unknown error").trim().split("\n").slice(-12).join("\n");
    throw new Error(`${command} failed:\n${detail}`);
  }
  return result.stdout;
}

function probeDuration(path) {
  return Number(execFileSync("ffprobe", [
    "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", path,
  ], { encoding: "utf8" }).trim());
}

function probeVideo(path) {
  return execFileSync("ffprobe", [
    "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=codec_type", "-of", "csv=p=0", path,
  ], { encoding: "utf8" }).trim() === "video";
}

function normalizeVisual(item, index, duration) {
  const source = resolve(VIDEO_DIR, item.src);
  if (!existsSync(source)) throw new Error(`missing visual for ${item.id}: ${source}`);
  const output = resolve(WORK_DIR, `segment-${String(index).padStart(2, "0")}.mp4`);
  const commonFilter = [
    "scale=1920:1080:force_original_aspect_ratio=increase",
    "crop=1920:1080",
    `fps=${FPS}`,
    `tpad=stop_mode=clone:stop_duration=${duration.toFixed(3)}`,
    `trim=duration=${duration.toFixed(3)}`,
    "setpts=PTS-STARTPTS",
    "format=yuv420p",
  ].join(",");
  const isImage = [".png", ".jpg", ".jpeg", ".webp"].includes(extname(source).toLowerCase());
  const args = ["-hide_banner", "-loglevel", "error", "-y"];
  if (isImage) args.push("-loop", "1", "-framerate", String(FPS), "-i", source);
  else {
    if (!probeVideo(source)) throw new Error(`${source} has no video stream`);
    args.push("-i", source);
  }
  args.push(
    "-vf", commonFilter, "-t", duration.toFixed(3), "-an",
    "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", output,
  );
  run("ffmpeg", args);
  return output;
}

function concatWithFades(segments, durations, output) {
  const args = ["-hide_banner", "-loglevel", "error", "-y"];
  for (const segment of segments) args.push("-i", segment);
  const filters = segments.map((_, index) => `[${index}:v]settb=AVTB,setpts=PTS-STARTPTS[v${index}]`);
  let current = "v0";
  let elapsed = durations[0];
  for (let index = 1; index < segments.length; index += 1) {
    const next = `xf${index}`;
    const offset = elapsed - FADE;
    filters.push(`[${current}][v${index}]xfade=transition=fade:duration=${FADE}:offset=${offset.toFixed(3)}[${next}]`);
    current = next;
    elapsed += durations[index] - FADE;
  }
  args.push(
    "-filter_complex", filters.join(";"), "-map", `[${current}]`, "-an",
    "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
    "-r", String(FPS), "-movflags", "+faststart", output,
  );
  run("ffmpeg", args);
  return elapsed;
}

function muxNarration(visual, items, starts, narration, total, output) {
  const args = ["-hide_banner", "-loglevel", "error", "-y", "-i", visual, "-f", "lavfi", "-t", total.toFixed(3), "-i", "anullsrc=r=48000:cl=stereo"];
  const voices = [];
  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    if (!item.narration) continue;
    const beat = narration.get(item.narration);
    const path = resolve(VIDEO_DIR, "narration", beat.file);
    args.push("-i", path);
    voices.push({ input: args.filter((arg) => arg === "-i").length - 1, beat, delay: Math.round(starts[index] * 1000) });
  }
  const filters = ["[1:a]volume=0[bed]"];
  const labels = ["bed"];
  for (let index = 0; index < voices.length; index += 1) {
    const voice = voices[index];
    const label = `voice${index}`;
    const fadeOut = Math.max(0, voice.beat.duration - 0.3);
    filters.push(
      `[${voice.input}:a]aformat=sample_rates=48000:channel_layouts=stereo,loudnorm=I=-16:TP=-1.5:LRA=7,afade=t=in:st=0:d=0.3,afade=t=out:st=${fadeOut.toFixed(3)}:d=0.3,adelay=${voice.delay}:all=1[${label}]`,
    );
    labels.push(label);
  }
  filters.push(`${labels.map((label) => `[${label}]`).join("")}amix=inputs=${labels.length}:normalize=0:dropout_transition=0,atrim=duration=${total.toFixed(3)},asetpts=N/SR/TB[aout]`);
  args.push(
    "-filter_complex", filters.join(";"), "-map", "0:v:0", "-map", "[aout]",
    "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2",
    "-movflags", "+faststart", "-shortest", output,
  );
  run("ffmpeg", args);
}

function main() {
  const items = JSON.parse(readFileSync(TIMELINE_PATH, "utf8"));
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  const narration = new Map(manifest.beats.map((beat) => [beat.id, beat]));
  if (!Array.isArray(items) || items.length < 2) throw new Error("timeline.json must contain at least two beats");
  for (const item of items) {
    if (!item.id || !["clip", "card", "still"].includes(item.kind) || !item.src) throw new Error(`invalid timeline item: ${JSON.stringify(item)}`);
    if (item.narration && !narration.has(item.narration)) throw new Error(`missing narration manifest entry: ${item.narration}`);
    if (!item.narration && !(Number(item.hold) > 0)) throw new Error(`${item.id} needs narration or a positive hold`);
  }

  mkdirSync(RENDER_DIR, { recursive: true });
  mkdirSync(WORK_DIR, { recursive: true });
  const durations = items.map((item) => item.narration ? narration.get(item.narration).duration + 0.4 : Number(item.hold));
  const starts = [];
  let cursor = 0;
  for (let index = 0; index < items.length; index += 1) {
    starts.push(cursor);
    cursor += durations[index] - (index < items.length - 1 ? FADE : 0);
  }
  if (cursor > 300) throw new Error(`planned duration is ${cursor.toFixed(2)}s; maximum is 300s`);

  try {
    const segments = items.map((item, index) => {
      process.stdout.write(`normalising ${item.id} (${durations[index].toFixed(2)}s)\n`);
      return normalizeVisual(item, index, durations[index]);
    });
    const visual = resolve(WORK_DIR, "visual.mp4");
    const calculated = concatWithFades(segments, durations, visual);
    const tmpOutput = resolve(RENDER_DIR, `playbook-redliner.tmp-${process.pid}.mp4`);
    muxNarration(visual, items, starts, narration, calculated, tmpOutput);
    const finalDuration = probeDuration(tmpOutput);
    if (finalDuration > 300) {
      rmSync(tmpOutput, { force: true });
      throw new Error(`rendered duration is ${finalDuration.toFixed(2)}s; maximum is 300s`);
    }
    renameSync(tmpOutput, OUTPUT);
    process.stdout.write(`rendered ${OUTPUT}\n`);
    process.stdout.write(`total duration ${finalDuration.toFixed(3)}s\n`);
  } finally {
    rmSync(WORK_DIR, { recursive: true, force: true });
  }
}

main();
