#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BIN_DIR = dirname(fileURLToPath(import.meta.url));
const VIDEO_DIR = resolve(BIN_DIR, "..");
const REPO_DIR = resolve(VIDEO_DIR, "../..");
const INPUT = resolve(VIDEO_DIR, "narration.json");
const OUTPUT_DIR = resolve(VIDEO_DIR, "narration");
const MANIFEST = resolve(OUTPUT_DIR, "manifest.json");
const DEFAULT_MODEL = "gemini-2.5-flash-preview-tts";
const VOICE = process.env.GEMINI_TTS_VOICE || "Charon";
const SAMPLE_RATE = 24_000;
const STYLE = [
  "Read this product-video narration in a warm, unhurried, confident voice.",
  "Sound like an experienced in-house counsel explaining a precise workflow to peers.",
  "Use natural pauses, restrained emphasis, and no theatrical delivery.",
  "Do not add, omit, or paraphrase words. Read draft placeholders in double braces cleanly as written.",
].join(" ");

function parseEnvValue(line) {
  const raw = line.slice(line.indexOf("=") + 1).trim();
  if (raw.length >= 2 && raw.startsWith('"') && raw.endsWith('"')) {
    return raw.slice(1, -1).replace(/\\n/g, "\n").replace(/\\"/g, '"');
  }
  if (raw.length >= 2 && raw.startsWith("'") && raw.endsWith("'")) return raw.slice(1, -1);
  return raw;
}

function readApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const envPath = resolve(REPO_DIR, ".env");
  const line = readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .find((candidate) => /^\s*(?:export\s+)?GEMINI_API_KEY\s*=/.test(candidate));
  if (!line) throw new Error("GEMINI_API_KEY is missing from the environment and .env");
  const value = parseEnvValue(line);
  if (!value) throw new Error("GEMINI_API_KEY is empty");
  return value;
}

function atomicJson(path, value) {
  const tmp = `${path}.tmp-${process.pid}`;
  writeFileSync(tmp, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(tmp, path);
}

function wavBuffer(pcm, sampleRate = SAMPLE_RATE) {
  const dataSize = pcm.length - (pcm.length % 2);
  const out = Buffer.alloc(44 + dataSize);
  out.write("RIFF", 0);
  out.writeUInt32LE(36 + dataSize, 4);
  out.write("WAVE", 8);
  out.write("fmt ", 12);
  out.writeUInt32LE(16, 16);
  out.writeUInt16LE(1, 20);
  out.writeUInt16LE(1, 22);
  out.writeUInt32LE(sampleRate, 24);
  out.writeUInt32LE(sampleRate * 2, 28);
  out.writeUInt16LE(2, 32);
  out.writeUInt16LE(16, 34);
  out.write("data", 36);
  out.writeUInt32LE(dataSize, 40);
  pcm.copy(out, 44, 0, dataSize);
  return out;
}

function durationOf(path) {
  return Number(execFileSync("ffprobe", [
    "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", path,
  ], { encoding: "utf8" }).trim());
}

async function listTtsModels(apiKey) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`);
  if (!response.ok) throw new Error(`Gemini model probe failed with HTTP ${response.status}`);
  const payload = await response.json();
  return (payload.models ?? [])
    .filter((model) => /tts/i.test(model.name ?? ""))
    .filter((model) => (model.supportedGenerationMethods ?? []).includes("generateContent"))
    .map((model) => model.name)
    .sort((left, right) => right.localeCompare(left, "en", { numeric: true }));
}

async function requestAudio(apiKey, model, text) {
  const modelPath = model.startsWith("models/") ? model : `models/${model}`;
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/${modelPath}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: AbortSignal.timeout(180_000),
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: `${STYLE}\n\nNarration:\n${text}` }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } } },
        },
      }),
    },
  );
  if (!response.ok) {
    const error = new Error(`Gemini TTS failed with HTTP ${response.status}`);
    error.status = response.status;
    error.retryable = response.status === 429 || response.status >= 500;
    throw error;
  }
  const payload = await response.json();
  const inline = payload.candidates?.[0]?.content?.parts?.find((part) => part.inlineData)?.inlineData;
  if (!inline?.data) {
    const finish = payload.candidates?.[0]?.finishReason ?? payload.promptFeedback?.blockReason ?? "unknown";
    const shapes = (payload.candidates?.[0]?.content?.parts ?? []).map((part) => Object.keys(part).sort().join("+")).join(",") || "none";
    const error = new Error(`Gemini TTS response contained no audio (finish=${finish}, parts=${shapes})`);
    error.retryable = true;
    throw error;
  }
  const rate = Number(/rate=(\d+)/i.exec(inline.mimeType ?? "")?.[1] ?? SAMPLE_RATE);
  return { pcm: Buffer.from(inline.data, "base64"), sampleRate: rate, mimeType: inline.mimeType ?? "audio/L16" };
}

async function requestAudioWithRetry(apiKey, model, text) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      return await requestAudio(apiKey, model, text);
    } catch (error) {
      lastError = error;
      if (error.status === 404 || !error.retryable || attempt === 3) throw error;
      process.stdout.write(`TTS response incomplete; retrying (${attempt}/3)…\n`);
      await new Promise((resolveDelay) => setTimeout(resolveDelay, 1000 * attempt));
    }
  }
  throw lastError;
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const beats = JSON.parse(readFileSync(INPUT, "utf8"));
  if (!Array.isArray(beats) || beats.some((beat) => typeof beat.id !== "string" || typeof beat.text !== "string")) {
    throw new Error("narration.json must be an array of { id, text }");
  }
  const ids = new Set(beats.map((beat) => beat.id));
  if (ids.size !== beats.length) throw new Error("narration beat ids must be unique");

  const previous = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : { beats: [] };
  const cached = new Map((previous.beats ?? []).map((beat) => [beat.id, beat]));
  const apiKey = readApiKey();
  let model = process.env.GEMINI_TTS_MODEL || previous.model || DEFAULT_MODEL;
  let probed = false;
  const manifestBeats = [];

  const checkpoint = () => {
    const totalDuration = manifestBeats.reduce((sum, beat) => sum + beat.duration, 0);
    atomicJson(MANIFEST, {
      generatedAt: new Date().toISOString(),
      complete: manifestBeats.length === beats.length,
      model,
      voice: VOICE,
      sampleRate: SAMPLE_RATE,
      totalDuration: Number(totalDuration.toFixed(3)),
      beats: manifestBeats,
    });
  };

  for (const beat of beats) {
    const textHash = createHash("sha256").update(beat.text).digest("hex");
    const file = `${beat.id}.wav`;
    const output = resolve(OUTPUT_DIR, file);
    const old = cached.get(beat.id);
    const recoveredCurrentFile = !old && existsSync(output) && statSync(output).mtimeMs >= statSync(INPUT).mtimeMs;
    const reusable = (old?.textHash === textHash && old?.voice === VOICE && old?.model === model && existsSync(output))
      || recoveredCurrentFile;
    if (!reusable) {
      process.stdout.write(`synthesising ${beat.id}…\n`);
      let audio;
      try {
        audio = await requestAudioWithRetry(apiKey, model, beat.text);
      } catch (error) {
        if (error.status !== 404 || probed) throw error;
        const models = await listTtsModels(apiKey);
        if (models.length === 0) throw new Error("Gemini model probe found no generateContent TTS model");
        model = models[0];
        probed = true;
        process.stdout.write(`default TTS model unavailable; using ${model.replace(/^models\//, "")}\n`);
        audio = await requestAudioWithRetry(apiKey, model, beat.text);
      }
      const tmp = `${output}.tmp-${process.pid}`;
      const encoded = audio.pcm.subarray(0, 4).toString("ascii") === "RIFF"
        ? audio.pcm
        : wavBuffer(audio.pcm, audio.sampleRate);
      writeFileSync(tmp, encoded);
      renameSync(tmp, output);
    } else {
      process.stdout.write(`cached ${beat.id}\n`);
    }
    const duration = durationOf(output);
    manifestBeats.push({
      id: beat.id,
      file,
      textHash,
      duration: Number(duration.toFixed(3)),
      model,
      voice: VOICE,
    });
    checkpoint();
  }

  const totalDuration = manifestBeats.reduce((sum, beat) => sum + beat.duration, 0);
  const manifest = {
    generatedAt: new Date().toISOString(),
    complete: true,
    model,
    voice: VOICE,
    sampleRate: SAMPLE_RATE,
    totalDuration: Number(totalDuration.toFixed(3)),
    beats: manifestBeats,
  };
  atomicJson(MANIFEST, manifest);
  process.stdout.write(`manifest ${MANIFEST}\n`);
  process.stdout.write(`total narration ${totalDuration.toFixed(2)}s\n`);
  if (totalDuration > 270) throw new Error(`narration is ${totalDuration.toFixed(2)}s; maximum is 270s`);
}

await main();
