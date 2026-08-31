#!/usr/bin/env node
import { readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BIN_DIR = dirname(fileURLToPath(import.meta.url));
const VIDEO_DIR = resolve(BIN_DIR, "..");
const REPO_DIR = resolve(VIDEO_DIR, "../..");
const NARRATION_PATH = resolve(VIDEO_DIR, "narration.json");
const OUTPUT_PATH = resolve(VIDEO_DIR, "word-timings.json");
const ENDPOINT = "https://api.deepgram.com/v1/listen?model=nova-2&smart_format=false&punctuate=false";

function parseEnvValue(line) {
  const raw = line.slice(line.indexOf("=") + 1).trim();
  if (raw.length >= 2 && raw.startsWith('"') && raw.endsWith('"')) {
    return raw.slice(1, -1).replace(/\\n/g, "\n").replace(/\\"/g, '"');
  }
  if (raw.length >= 2 && raw.startsWith("'") && raw.endsWith("'")) return raw.slice(1, -1);
  return raw;
}

function readApiKey() {
  if (process.env.DEEPGRAM_API_KEY) return process.env.DEEPGRAM_API_KEY;
  const envPath = resolve(REPO_DIR, ".env");
  const line = readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .find((candidate) => /^\s*(?:export\s+)?DEEPGRAM_API_KEY\s*=/.test(candidate));
  if (!line) throw new Error("DEEPGRAM_API_KEY is missing from the environment and .env");
  const value = parseEnvValue(line);
  if (!value) throw new Error("DEEPGRAM_API_KEY is empty");
  return value;
}

function atomicJson(path, value) {
  const tmp = `${path}.tmp-${process.pid}`;
  writeFileSync(tmp, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(tmp, path);
}

async function transcribe(apiKey, beat) {
  const audio = readFileSync(resolve(VIDEO_DIR, "narration", `${beat.id}.wav`));
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Token ${apiKey}`,
          "Content-Type": "audio/wav",
        },
        body: audio,
        signal: AbortSignal.timeout(180_000),
      });
      if (!response.ok) {
        const error = new Error(`Deepgram failed for ${beat.id} with HTTP ${response.status}`);
        error.retryable = response.status === 429 || response.status >= 500;
        throw error;
      }
      const payload = await response.json();
      const words = payload.results?.channels?.[0]?.alternatives?.[0]?.words;
      if (!Array.isArray(words) || words.length === 0) {
        const error = new Error(`Deepgram returned no words for ${beat.id}`);
        error.retryable = true;
        throw error;
      }
      return words.map(({ word, start, end }) => ({
        word: String(word),
        start: Number(start),
        end: Number(end),
      }));
    } catch (error) {
      lastError = error;
      if (!error.retryable || attempt === 3) throw error;
      process.stdout.write(`retrying ${beat.id} (${attempt}/3)\n`);
      await new Promise((resolveDelay) => setTimeout(resolveDelay, attempt * 1000));
    }
  }
  throw lastError;
}

async function main() {
  const beats = JSON.parse(readFileSync(NARRATION_PATH, "utf8"));
  if (!Array.isArray(beats) || beats.some((beat) => typeof beat.id !== "string" || typeof beat.text !== "string")) {
    throw new Error("narration.json must be an array of { id, text }");
  }
  const requested = new Set(process.argv.slice(2));
  const unknown = [...requested].filter((id) => !beats.some((beat) => beat.id === id));
  if (unknown.length > 0) throw new Error(`unknown narration beat${unknown.length === 1 ? "" : "s"}: ${unknown.join(", ")}`);
  const selected = requested.size === 0 ? beats : beats.filter((beat) => requested.has(beat.id));
  const apiKey = readApiKey();
  const previous = requested.size > 0
    ? JSON.parse(readFileSync(OUTPUT_PATH, "utf8"))
    : {};
  const timings = { ...previous };
  for (const beat of selected) {
    process.stdout.write(`aligning ${beat.id}\n`);
    timings[beat.id] = await transcribe(apiKey, beat);
    atomicJson(OUTPUT_PATH, timings);
  }
  process.stdout.write(`wrote ${OUTPUT_PATH}\n`);
}

await main();
