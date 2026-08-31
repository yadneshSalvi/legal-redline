#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const outputDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "audio", "sfx");
mkdirSync(outputDir, { recursive: true });

function render(name, inputs, filter) {
  const result = spawnSync("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y",
    ...inputs,
    "-filter_complex", filter,
    "-map", "[out]", "-ar", "48000", "-ac", "2", resolve(outputDir, name),
  ], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr.trim());
  process.stdout.write(`rendered ${name}\n`);
}

render("soft-whoosh.wav", ["-f", "lavfi", "-i", "anoisesrc=color=pink:duration=0.75:sample_rate=48000"],
  "[0:a]highpass=f=180,lowpass=f=4200,afade=t=in:st=0:d=0.24,afade=t=out:st=0.25:d=0.5,aformat=channel_layouts=stereo[out]");
render("decision-tick.wav", ["-f", "lavfi", "-i", "sine=frequency=1320:duration=0.09:sample_rate=48000"],
  "[0:a]afade=t=out:st=0.015:d=0.075,aformat=channel_layouts=stereo[out]");
render("export-chime.wav", [
  "-f", "lavfi", "-i", "sine=frequency=659.25:duration=0.75:sample_rate=48000",
  "-f", "lavfi", "-i", "sine=frequency=987.77:duration=0.75:sample_rate=48000",
], "[0:a]afade=t=in:st=0:d=0.02,afade=t=out:st=0.18:d=0.57[a0];[1:a]volume=0.55,afade=t=in:st=0.04:d=0.04,afade=t=out:st=0.24:d=0.51[a1];[a0][a1]amix=inputs=2:normalize=1,aformat=channel_layouts=stereo[out]");
