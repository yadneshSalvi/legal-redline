#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BIN_DIR = dirname(fileURLToPath(import.meta.url));
const VIDEO_DIR = resolve(BIN_DIR, "..");
const RENDER_DIR = resolve(VIDEO_DIR, "renders");
const LOG_DIR = resolve(VIDEO_DIR, "logs");
const WORK_DIR = resolve(RENDER_DIR, `.assemble-${process.pid}`);
const OUTPUT = resolve(RENDER_DIR, "playbook-redliner-candidate.mp4");
const TIMELINE_PATH = resolve(VIDEO_DIR, "timeline.json");
const MANIFEST_PATH = resolve(VIDEO_DIR, "narration", "manifest.json");
const MUSIC = resolve(VIDEO_DIR, "audio", "Perspectives.mp3");
const TIME_CARD = resolve(VIDEO_DIR, "cards", "time-taken.png");
const FPS = 30;
const FADE = 0.25;

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...options });
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "unknown error").trim().split("\n").slice(-16).join("\n");
    throw new Error(`${command} failed:\n${detail}`);
  }
  return `${result.stdout ?? ""}${result.stderr ?? ""}`;
}

function probeDuration(path) {
  return Number(execFileSync("ffprobe", [
    "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", path,
  ], { encoding: "utf8" }).trim());
}

function isImage(path) {
  return [".png", ".jpg", ".jpeg", ".webp"].includes(extname(path).toLowerCase());
}

function inputArgs(path, mediaStart = 0) {
  if (isImage(path)) return ["-loop", "1", "-framerate", String(FPS), "-i", path];
  return [...(mediaStart > 0 ? ["-ss", Number(mediaStart).toFixed(3)] : []), "-i", path];
}

function normaliseFilter(duration, width = 1920, height = 1080) {
  return [
    `scale=${width}:${height}:force_original_aspect_ratio=decrease:flags=lanczos`,
    `pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=#FBFAF7`,
    `fps=${FPS}`,
    `tpad=stop_mode=clone:stop_duration=${duration.toFixed(3)}`,
    `trim=duration=${duration.toFixed(3)}`,
    "setpts=PTS-STARTPTS",
    "format=yuv420p",
  ].join(",");
}

function renderSingle(item, duration, output) {
  const source = resolve(VIDEO_DIR, item.src);
  if (!existsSync(source)) throw new Error(`missing visual for ${item.id}: ${source}`);
  const width = item.highRes ? 3840 : 1920;
  const height = item.highRes ? 2160 : 1080;
  run("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y",
    ...inputArgs(source, Number(item.mediaStart ?? 0)),
    "-vf", normaliseFilter(duration, width, height), "-t", duration.toFixed(3), "-an",
    "-c:v", "libx264", "-preset", "fast", "-crf", "17", "-pix_fmt", "yuv420p", output,
  ]);
}

function renderStates(item, duration, output) {
  const states = [{ at: 0, src: item.src }, ...item.states];
  const args = ["-hide_banner", "-loglevel", "error", "-y"];
  const filters = [];
  states.forEach((state, index) => {
    const source = resolve(VIDEO_DIR, state.src);
    if (!existsSync(source)) throw new Error(`missing state for ${item.id}: ${source}`);
    args.push(...inputArgs(source));
    filters.push(`[${index}:v]${normaliseFilter(duration)}[s${index}]`);
  });
  let current = "s0";
  for (let index = 1; index < states.length; index += 1) {
    const next = `state${index}`;
    filters.push(`[${current}][s${index}]xfade=transition=fade:duration=0.2:offset=${Number(states[index].at).toFixed(3)}[${next}]`);
    current = next;
  }
  args.push(
    "-filter_complex", filters.join(";"), "-map", `[${current}]`, "-t", duration.toFixed(3), "-an",
    "-c:v", "libx264", "-preset", "fast", "-crf", "17", "-pix_fmt", "yuv420p", output,
  );
  run("ffmpeg", args);
}

function renderCuts(item, duration, output) {
  const cuts = item.cuts;
  const args = ["-hide_banner", "-loglevel", "error", "-y"];
  const filters = [];
  cuts.forEach((cut, index) => {
    const source = resolve(VIDEO_DIR, cut.src);
    if (!existsSync(source)) throw new Error(`missing cut for ${item.id}: ${source}`);
    const cutDuration = (index + 1 < cuts.length ? Number(cuts[index + 1].at) : duration) - Number(cut.at);
    if (!(cutDuration > 0)) throw new Error(`${item.id} has an invalid cut at ${cut.at}`);
    args.push(...inputArgs(source, Number(cut.mediaStart ?? 0)));
    filters.push(`[${index}:v]${normaliseFilter(cutDuration)}[c${index}]`);
  });
  filters.push(`${cuts.map((_, index) => `[c${index}]`).join("")}concat=n=${cuts.length}:v=1:a=0[cut]`);
  args.push(
    "-filter_complex", filters.join(";"), "-map", "[cut]", "-t", duration.toFixed(3), "-an",
    "-c:v", "libx264", "-preset", "fast", "-crf", "17", "-pix_fmt", "yuv420p", output,
  );
  run("ffmpeg", args);
}

function poseExpression(moves, property, initial) {
  function recurse(index, current) {
    if (index >= moves.length) return Number(current).toFixed(6);
    const move = moves[index];
    const at = Number(move.at);
    const end = at + Number(move.duration);
    const target = Number(move[property]);
    const progress = `((t-${at.toFixed(6)})/${Number(move.duration).toFixed(6)})`;
    const eased = `((${progress})*(${progress})*(3-2*(${progress})))`;
    const interpolated = `(${Number(current).toFixed(6)}+(${target.toFixed(6)}-${Number(current).toFixed(6)})*${eased})`;
    return `if(lt(t,${at.toFixed(6)}),${Number(current).toFixed(6)},if(lt(t,${end.toFixed(6)}),${interpolated},${recurse(index + 1, target)}))`;
  }
  return recurse(0, initial);
}

function cameraGraph(item, duration, outputLabel) {
  const moves = item.cameraMoves ?? [];
  if (moves.length === 0) return `[0:v]scale=1920:1080:flags=lanczos,format=yuv420p[${outputLabel}]`;
  const scale = poseExpression(moves, "scale", 1);
  const x = poseExpression(moves, "x", 0.5);
  const y = poseExpression(moves, "y", 0.5);
  return [
    `color=c=#FBFAF7:s=3840x2160:r=${FPS}:d=${duration.toFixed(3)}[canvas]`,
    `[0:v]scale=w='3840*(${scale})':h='2160*(${scale})':eval=frame:flags=lanczos[zoomed]`,
    `[canvas][zoomed]overlay=x='W/2-(${x})*w':y='H/2-(${y})*h':eval=frame:shortest=1[framed]`,
    `[framed]scale=1920:1080:flags=lanczos,format=yuv420p[${outputLabel}]`,
  ].join(";");
}

function renderTreatment(item, duration, raw, output) {
  const at = Number(item.timeCardAt);
  if (Number.isFinite(at)) {
    if (!existsSync(TIME_CARD)) throw new Error(`missing time card: ${TIME_CARD}`);
    run("ffmpeg", [
      "-hide_banner", "-loglevel", "error", "-y", "-i", raw,
      "-loop", "1", "-framerate", String(FPS), "-i", TIME_CARD,
      "-filter_complex", `${cameraGraph(item, duration, "base")};[1:v]format=rgba,fade=t=in:st=${at.toFixed(3)}:d=0.2:alpha=1,setpts=PTS-STARTPTS[card];[base][card]overlay=x=W-w-60:y=H-h-60:enable='gte(t,${at.toFixed(3)})',fps=${FPS},trim=duration=${duration.toFixed(3)},setpts=PTS-STARTPTS[treated]`,
      "-map", "[treated]", "-t", duration.toFixed(3), "-an",
      "-c:v", "libx264", "-preset", "fast", "-crf", "17", "-pix_fmt", "yuv420p", output,
    ]);
    return;
  }
  run("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y", "-i", raw,
    "-filter_complex", `${cameraGraph(item, duration, "camera")};[camera]fps=${FPS},trim=duration=${duration.toFixed(3)},setpts=PTS-STARTPTS[treated]`,
    "-map", "[treated]", "-t", duration.toFixed(3), "-an",
    "-c:v", "libx264", "-preset", "fast", "-crf", "17", "-pix_fmt", "yuv420p", output,
  ]);
}

function renderSegment(item, index, duration) {
  const raw = resolve(WORK_DIR, `raw-${String(index).padStart(2, "0")}.mp4`);
  const output = resolve(WORK_DIR, `segment-${String(index).padStart(2, "0")}.mp4`);
  if (item.states) renderStates(item, duration, raw);
  else if (item.cuts) renderCuts(item, duration, raw);
  else renderSingle(item, duration, raw);
  renderTreatment(item, duration, raw, output);
  rmSync(raw, { force: true });
  return output;
}

function concatWithFades(segments, durations, output) {
  const args = ["-hide_banner", "-loglevel", "error", "-filter_complex_threads", "2", "-y"];
  for (const segment of segments) args.push("-i", segment);
  const filters = segments.map((_, index) => `[${index}:v]settb=AVTB,setpts=PTS-STARTPTS[v${index}]`);
  let current = "v0";
  let elapsed = durations[0];
  for (let index = 1; index < segments.length; index += 1) {
    const next = `xf${index}`;
    filters.push(`[${current}][v${index}]xfade=transition=fade:duration=${FADE}:offset=${(elapsed - FADE).toFixed(3)}[${next}]`);
    current = next;
    elapsed += durations[index] - FADE;
  }
  args.push(
    "-filter_complex", filters.join(";"), "-map", `[${current}]`, "-an",
    "-c:v", "libx264", "-preset", "fast", "-crf", "17", "-pix_fmt", "yuv420p",
    "-r", String(FPS), "-movflags", "+faststart", output,
  );
  run("ffmpeg", args);
  return elapsed;
}

function itemDuration(item, narration) {
  if (Number(item.duration) > 0) return Number(item.duration);
  if (!item.narration) return Number(item.hold);
  const beat = narration.get(item.narration);
  const rate = Number(item.narrationRate ?? 1);
  return beat.duration / rate + 0.4 + Number(item.extraTail ?? 0);
}

function renderNarration(items, starts, narration, total, output) {
  const args = ["-hide_banner", "-loglevel", "error", "-y", "-f", "lavfi", "-t", total.toFixed(3), "-i", "anullsrc=r=48000:cl=stereo"];
  const voices = [];
  items.forEach((item, index) => {
    if (!item.narration) return;
    const beat = narration.get(item.narration);
    args.push("-i", resolve(VIDEO_DIR, "narration", beat.file));
    voices.push({ input: voices.length + 1, beat, delay: Math.round(starts[index] * 1000), rate: Number(item.narrationRate ?? 1) });
  });
  const filters = ["[0:a]volume=0[quiet]"];
  const labels = ["quiet"];
  voices.forEach((voice, index) => {
    const label = `voice${index}`;
    const renderedDuration = voice.beat.duration / voice.rate;
    const speed = voice.rate === 1 ? "" : `atempo=${voice.rate.toFixed(6)},`;
    filters.push(`[${voice.input}:a]aformat=sample_rates=48000:channel_layouts=stereo,${speed}loudnorm=I=-16:TP=-1.5:LRA=7,afade=t=in:st=0:d=0.12,afade=t=out:st=${Math.max(0, renderedDuration - 0.18).toFixed(3)}:d=0.18,adelay=${voice.delay}:all=1[${label}]`);
    labels.push(label);
  });
  filters.push(`${labels.map((label) => `[${label}]`).join("")}amix=inputs=${labels.length}:normalize=0:dropout_transition=0,atrim=duration=${total.toFixed(3)},asetpts=N/SR/TB[out]`);
  args.push("-filter_complex", filters.join(";"), "-map", "[out]", "-c:a", "pcm_s24le", output);
  run("ffmpeg", args);
}

function renderMusic(narrationPath, total, output) {
  const fadeOut = Math.max(0, total - 7);
  run("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y", "-i", MUSIC, "-i", narrationPath,
    "-filter_complex",
    `[0:a]atrim=duration=${total.toFixed(3)},asetpts=PTS-STARTPTS,aformat=sample_rates=48000:channel_layouts=stereo,loudnorm=I=-28:TP=-8:LRA=7,afade=t=in:st=0:d=3,afade=t=out:st=${fadeOut.toFixed(3)}:d=7[music];[music][1:a]sidechaincompress=threshold=0.035:ratio=4:attack=40:release=350[ducked]`,
    "-map", "[ducked]", "-c:a", "pcm_s24le", output,
  ]);
}

function sfxEvents(items, starts) {
  const events = [];
  items.forEach((item, index) => {
    let priorScale = 1;
    for (const move of item.cameraMoves ?? []) {
      if (Number(move.scale) > priorScale + 0.01) events.push({ kind: "whoosh", at: starts[index] + Number(move.at) });
      priorScale = Number(move.scale);
    }
    if (item.id === "keyboard-review") {
      for (const at of item.tickAt ?? [5.04, 6.48, 7.84]) {
        events.push({ kind: "tick", at: starts[index] + Number(at) });
      }
    }
    if (Number(item.chimeAt) >= 0) events.push({ kind: "chime", at: starts[index] + Number(item.chimeAt) });
  });
  return events.sort((a, b) => a.at - b.at);
}

function renderSfx(events, total, output) {
  const files = {
    whoosh: resolve(VIDEO_DIR, "audio", "sfx", "soft-whoosh.wav"),
    tick: resolve(VIDEO_DIR, "audio", "sfx", "decision-tick.wav"),
    chime: resolve(VIDEO_DIR, "audio", "sfx", "export-chime.wav"),
  };
  const args = ["-hide_banner", "-loglevel", "error", "-y", "-f", "lavfi", "-t", total.toFixed(3), "-i", "anullsrc=r=48000:cl=stereo"];
  const filters = ["[0:a]volume=0[quiet]"];
  const labels = ["quiet"];
  events.forEach((event, index) => {
    const path = files[event.kind];
    if (!existsSync(path)) throw new Error(`missing SFX: ${path}`);
    args.push("-i", path);
    const label = `sfx${index}`;
    filters.push(`[${index + 1}:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=-24dB,adelay=${Math.round(event.at * 1000)}:all=1[${label}]`);
    labels.push(label);
  });
  filters.push(`${labels.map((label) => `[${label}]`).join("")}amix=inputs=${labels.length}:normalize=0:dropout_transition=0,atrim=duration=${total.toFixed(3)}[out]`);
  args.push("-filter_complex", filters.join(";"), "-map", "[out]", "-c:a", "pcm_s24le", output);
  run("ffmpeg", args);
}

function mux(visual, narration, music, sfx, total, output) {
  run("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y", "-i", visual, "-i", narration, "-i", music, "-i", sfx,
    "-filter_complex", `[1:a][2:a][3:a]amix=inputs=3:normalize=0:dropout_transition=0,alimiter=limit=0.93,atrim=duration=${total.toFixed(3)}[mix]`,
    "-map", "0:v:0", "-map", "[mix]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2",
    "-movflags", "+faststart", "-shortest", output,
  ]);
}

function integratedLufs(path) {
  const output = run("ffmpeg", ["-hide_banner", "-nostats", "-i", path, "-filter_complex", "ebur128=framelog=verbose", "-f", "null", "-"]);
  const matches = [...output.matchAll(/\bI:\s*(-?\d+(?:\.\d+)?) LUFS/g)];
  return matches.length ? Number(matches.at(-1)[1]) : null;
}

function atomicJson(path, value) {
  const tmp = `${path}.tmp-${process.pid}`;
  writeFileSync(tmp, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(tmp, path);
}

function main() {
  const items = JSON.parse(readFileSync(TIMELINE_PATH, "utf8"));
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  const narration = new Map(manifest.beats.map((beat) => [beat.id, beat]));
  if (!existsSync(MUSIC)) throw new Error(`missing music: ${MUSIC}`);
  items.forEach((item) => {
    if (!item.id || !item.src) throw new Error(`invalid timeline item: ${JSON.stringify(item)}`);
    if (item.narration && !narration.has(item.narration)) throw new Error(`missing narration: ${item.narration}`);
    const rate = Number(item.narrationRate ?? 1);
    if (item.narration && (!(rate >= 1) || rate > 1.05)) throw new Error(`${item.id} narration rate ${rate} exceeds 1.05×`);
    const moves = item.cameraMoves ?? [];
    moves.forEach((move, index) => {
      if (!(Number(move.duration) > 0)) throw new Error(`${item.id} has an invalid camera move`);
      if (index && Number(move.at) - Number(moves[index - 1].at) < 3) throw new Error(`${item.id} camera moves are less than 3 seconds apart`);
    });
  });

  mkdirSync(RENDER_DIR, { recursive: true });
  mkdirSync(LOG_DIR, { recursive: true });
  mkdirSync(WORK_DIR, { recursive: true });
  const durations = items.map((item) => itemDuration(item, narration));
  const starts = [];
  let cursor = 0;
  durations.forEach((duration, index) => {
    starts.push(cursor);
    cursor += duration - (index + 1 < durations.length ? FADE : 0);
  });
  if (cursor > 300) throw new Error(`planned duration ${cursor.toFixed(3)} exceeds 300 seconds`);

  try {
    const segments = items.map((item, index) => {
      process.stdout.write(`rendering ${item.id} (${durations[index].toFixed(3)}s)\n`);
      return renderSegment(item, index, durations[index]);
    });
    const visual = resolve(WORK_DIR, "visual.mp4");
    const total = concatWithFades(segments, durations, visual);
    const narrationStem = resolve(WORK_DIR, "narration.wav");
    const musicStem = resolve(WORK_DIR, "music-ducked.wav");
    const sfxStem = resolve(WORK_DIR, "sfx.wav");
    renderNarration(items, starts, narration, total, narrationStem);
    renderMusic(narrationStem, total, musicStem);
    const events = sfxEvents(items, starts);
    renderSfx(events, total, sfxStem);
    const tmpOutput = resolve(RENDER_DIR, `playbook-redliner-candidate.tmp-${process.pid}.mp4`);
    mux(visual, narrationStem, musicStem, sfxStem, total, tmpOutput);
    const actualDuration = probeDuration(tmpOutput);
    if (actualDuration > 300) throw new Error(`candidate duration ${actualDuration.toFixed(3)} exceeds 300 seconds`);
    renameSync(tmpOutput, OUTPUT);

    const report = {
      generatedAt: new Date().toISOString(),
      output: "renders/playbook-redliner-candidate.mp4",
      duration: actualDuration,
      fps: FPS,
      transition: FADE,
      loudness: {
        narrationLufs: integratedLufs(narrationStem),
        duckedMusicLufs: integratedLufs(musicStem),
        sfxLufs: integratedLufs(sfxStem),
        finalMixLufs: integratedLufs(OUTPUT),
      },
      sfxEvents: events,
      beats: items.map((item, index) => ({
        id: item.id,
        narration: item.narration ?? null,
        narrationRate: item.narration ? Number(item.narrationRate ?? 1) : null,
        start: starts[index],
        duration: durations[index],
        end: starts[index] + durations[index],
        source: item.src,
        cameraMoves: (item.cameraMoves ?? []).map((move) => ({ ...move, globalAt: starts[index] + Number(move.at) })),
      })),
    };
    atomicJson(resolve(LOG_DIR, "assembly.json"), report);
    process.stdout.write(`rendered candidate ${OUTPUT}\n`);
    process.stdout.write(`total duration ${actualDuration.toFixed(3)}s\n`);
  } finally {
    rmSync(WORK_DIR, { recursive: true, force: true });
  }
}

main();
