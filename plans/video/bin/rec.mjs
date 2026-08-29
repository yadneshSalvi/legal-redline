/**
 * CDP screencast recorder: captures the agent-browser page at its native paint
 * rate and muxes a constant-rate H.264 clip. Stops on a STOP sentinel file.
 *
 * usage: node bin/rec.mjs <out.mp4> [maxSeconds] [fps]
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync, existsSync, unlinkSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [outArg, maxSecArg = "90", fpsArg = "30", sessionArg = "video"] = process.argv.slice(2);
const out = resolve(outArg);
const maxMs = Number(maxSecArg) * 1000;
const fps = Number(fpsArg);
const workDir = `${out}.frames`;
const stopFile = `${out}.STOP`;
const FFMPEG = "/opt/homebrew/bin/ffmpeg";

const cdpUrl = execFileSync("agent-browser", ["--session", sessionArg, "get", "cdp-url"], { encoding: "utf8" })
  .trim().split("\n").map((l) => l.trim()).find((l) => l.startsWith("ws://"));
if (!cdpUrl) throw new Error("no cdp url");

rmSync(workDir, { recursive: true, force: true });
mkdirSync(workDir, { recursive: true });
if (existsSync(stopFile)) unlinkSync(stopFile);
mkdirSync(dirname(out), { recursive: true });

const ws = new WebSocket(cdpUrl);
let id = 0;
const pending = new Map();
const send = (method, params, sessionId) => new Promise((res, rej) => {
  const msgId = ++id;
  pending.set(msgId, { res, rej });
  ws.send(JSON.stringify({ id: msgId, method, params, ...(sessionId ? { sessionId } : {}) }));
});

const frames = [];
let session;
let stopped = false;
let startT = 0;
let stopT = 0;

ws.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
    return;
  }
  if (msg.method === "Page.screencastFrame" && msg.sessionId === session) {
    const { data, sessionId: frameId, metadata } = msg.params;
    if (!stopped) {
      const index = frames.length;
      const file = `${workDir}/f${String(index).padStart(6, "0")}.jpg`;
      writeFileSync(file, Buffer.from(data, "base64"));
      frames.push({ file, t: metadata.timestamp });
    }
    send("Page.screencastFrameAck", { sessionId: frameId }, session).catch(() => {});
  }
});

ws.addEventListener("open", async () => {
  const { targetInfos } = await send("Target.getTargets");
  const page = targetInfos.find((t) => t.type === "page" && t.url.includes("hearth"))
    ?? targetInfos.find((t) => t.type === "page");
  if (!page) throw new Error("no page target");
  const attached = await send("Target.attachToTarget", { targetId: page.targetId, flatten: true });
  session = attached.sessionId;
  await send("Page.enable", {}, session);
  await send("Page.startScreencast", { format: "jpeg", quality: 88, everyNthFrame: 1 }, session);
  process.stdout.write(`recording ${out}\n`);
  const started = Date.now();
  startT = started / 1000;
  const tick = setInterval(async () => {
    if (!existsSync(stopFile) && Date.now() - started < maxMs) return;
    clearInterval(tick);
    stopped = true;
    stopT = Date.now() / 1000;
    try { await send("Page.stopScreencast", {}, session); } catch {}
    ws.close();
    finish();
  }, 200);
});

function finish() {
  if (frames.length < 1) {
    process.stdout.write(`ERROR: only ${frames.length} frames (page never painted)\n`);
    process.exit(1);
  }
  // The page paints on demand, so idle stretches emit no frames. Hold the first
  // frame back to the record start and the last frame out to the stop, which
  // makes clip duration equal wall-clock duration.
  const lines = [];
  const head = Math.max(0, frames[0].t - startT);
  if (head > 1 / fps) lines.push(`file '${frames[0].file}'`, `duration ${head.toFixed(6)}`);
  for (let i = 0; i < frames.length; i += 1) {
    const next = frames[i + 1];
    const tail = Math.max(1 / fps, stopT - frames[i].t);
    const dur = next ? Math.max(1 / 240, next.t - frames[i].t) : tail;
    lines.push(`file '${frames[i].file}'`, `duration ${dur.toFixed(6)}`);
  }
  lines.push(`file '${frames[frames.length - 1].file}'`);
  const listFile = `${workDir}/list.txt`;
  writeFileSync(listFile, `${lines.join("\n")}\n`);
  const span = Math.max(stopT, frames[frames.length - 1].t) - Math.min(startT, frames[0].t);
  execFileSync(FFMPEG, [
    "-y", "-f", "concat", "-safe", "0", "-i", listFile,
    "-vsync", "cfr", "-r", String(fps),
    "-c:v", "libx264", "-preset", "slow", "-crf", "17",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", out,
  ], { stdio: ["ignore", "ignore", "pipe"] });
  process.stdout.write(`saved ${out} · ${frames.length} frames · ${span.toFixed(2)}s · ${(frames.length / span).toFixed(1)} native fps\n`);
  rmSync(workDir, { recursive: true, force: true });
  if (existsSync(stopFile)) unlinkSync(stopFile);
  process.exit(0);
}
