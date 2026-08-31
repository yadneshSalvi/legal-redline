#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const BIN_DIR = dirname(fileURLToPath(import.meta.url));
const VIDEO_DIR = resolve(BIN_DIR, "..");
const OUTPUT_DIR = resolve(VIDEO_DIR, "cards");
const HTML_DIR = resolve(OUTPUT_DIR, "html");
const DATA = JSON.parse(readFileSync(resolve(VIDEO_DIR, "card-data.json"), "utf8"));
const SESSION = "playbook-redliner-cards";

mkdirSync(HTML_DIR, { recursive: true });

const escape = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

function shell(name, ...args) {
  return execFileSync("agent-browser", ["--session", SESSION, name, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function frame(body, variant = "default") {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=1920,height=1080">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap" rel="stylesheet">
<style>
:root{--paper:#FBFAF7;--sheet:#FFFFFF;--ink:#1B1B1F;--muted:#5C5B66;--faint:#8A8994;--hairline:#E6E3DC;--strong:#D5D1C7;--navy:#1E2A47;--navy-soft:#E9EDF6;--deletion:#B3261E;--deletion-soft:#FBE9E7;--insertion:#1E5AA8;--insertion-soft:#E7F0FB;--comment:#B98A1F;--comment-soft:#FFF4D6;--verified:#2A7F6F;--verified-soft:#E4F3EF;--medium:#4A5B8C;--low:#6B6B75}
*{box-sizing:border-box}html,body{margin:0;width:1920px;height:1080px;overflow:hidden;background:var(--paper);color:var(--ink)}
body{font-family:Inter,system-ui,sans-serif}.frame{position:relative;width:1920px;height:1080px;padding:92px 116px;display:flex;flex-direction:column;border-top:10px solid var(--navy)}
.grain{position:absolute;inset:0;pointer-events:none;opacity:.032;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E")}
.eyebrow{font-size:17px;letter-spacing:.12em;font-weight:600;color:var(--muted)}h1{font:600 76px/1.04 "Source Serif 4",serif;letter-spacing:-.02em;margin:28px 0 0;max-width:1460px}.subtitle{font:500 31px/1.45 "Source Serif 4",serif;color:var(--muted);max-width:1180px;margin-top:28px}
.rule{height:1px;background:var(--hairline);width:100%;margin:38px 0}.footer{margin-top:auto;display:flex;align-items:center;gap:18px;font-size:18px;color:var(--muted)}.footer strong{font-family:"Source Serif 4",serif;font-size:22px;color:var(--navy)}.dot{width:5px;height:5px;border-radius:999px;background:var(--comment)}.url{margin-left:auto;font-family:ui-monospace,SFMono-Regular,monospace;font-size:16px;color:var(--ink)}
.panel{background:var(--sheet);border:1px solid var(--hairline);border-radius:10px;padding:34px 40px}.kicker{font-size:18px;letter-spacing:.1em;font-weight:600;color:var(--navy)}.stat{font:600 88px/1 "Source Serif 4",serif;color:var(--navy);letter-spacing:-.03em}.body{font:500 30px/1.48 "Source Serif 4",serif;color:var(--muted)}
.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:44px}.metric{min-height:190px}.metric dt{font-size:17px;line-height:1.45;color:var(--muted)}.metric dd{margin:34px 0 0;font:500 36px/1 ui-monospace,SFMono-Regular,monospace;color:var(--navy)}
.table{margin-top:42px;border:1px solid var(--hairline);border-radius:10px;overflow:hidden;background:var(--sheet)}.row{display:grid;grid-template-columns:1.65fr .8fr .8fr;align-items:center;min-height:105px;border-bottom:1px solid var(--hairline);padding:0 38px}.row:last-child{border-bottom:0}.row.head{min-height:60px;background:var(--navy-soft);font-size:16px;letter-spacing:.08em;color:var(--muted);text-transform:uppercase}.row .num{font:500 27px/1 ui-monospace,SFMono-Regular,monospace}.row .final{color:var(--verified)}
.comparison-lines{display:grid;gap:16px;margin-top:44px}.comparison-line{display:flex;align-items:center;min-height:108px;padding:0 38px;border:1px solid var(--hairline);border-radius:10px;background:var(--sheet);font:500 25px/1.35 ui-monospace,SFMono-Regular,monospace;color:var(--navy)}
.ladder{display:flex;align-items:center;gap:10px;margin-top:48px}.step{flex:1;min-width:0;border:1px solid var(--hairline);background:var(--sheet);border-radius:6px;padding:20px 12px;text-align:center;font:500 17px/1.2 ui-monospace,SFMono-Regular,monospace}.step:last-child{border-color:var(--navy);background:var(--navy);color:var(--sheet)}.arrow{color:var(--faint);font-size:24px}.notes{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:28px}.note{border-left:3px solid var(--verified);background:var(--verified-soft);padding:18px 22px;font-size:19px;line-height:1.45}.note.removed{border-left-color:var(--deletion);background:var(--deletion-soft);color:var(--muted)}.evidence{margin-top:18px;padding:14px 20px;border:1px solid var(--hairline);border-radius:6px;font:500 18px/1.35 ui-monospace,SFMono-Regular,monospace;color:var(--navy);background:var(--sheet)}
.hot{justify-content:center;text-align:center;align-items:center}.hot h1{max-width:1560px;font-size:66px}.hot .subtitle{max-width:1040px}.hot .eyebrow{color:var(--deletion)}.close{justify-content:center}.close h1{font-size:90px;max-width:1320px}.close .url-big{font:500 29px/1.2 ui-monospace,SFMono-Regular,monospace;color:var(--insertion);margin-top:46px}
.opening{justify-content:center}.opening h1{font-size:104px;max-width:1500px}.opening .subtitle{font-size:48px;color:var(--navy);margin-top:34px}.positions{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:48px}.position{height:150px;display:flex;align-items:center;justify-content:center;font:600 29px/1.2 "Source Serif 4",serif;color:var(--navy)}.pain-points{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:22px}.pain{display:flex;align-items:center;gap:16px;font:500 25px/1.35 "Source Serif 4",serif;color:var(--ink)}.pain::before{content:"";width:9px;height:9px;border-radius:50%;background:var(--deletion)}.hidden{visibility:hidden}.metric.active{border:3px solid var(--comment);box-shadow:0 0 0 6px var(--comment-soft)}.footnote{font:500 17px/1.3 ui-monospace,SFMono-Regular,monospace;color:var(--muted);margin:18px 0 0;text-align:right}
.hard-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:22px;margin-top:38px}.hard-quote{font:500 29px/1.48 "Source Serif 4",serif;color:var(--ink);margin:24px 0 0}.hard-stack{display:grid;gap:18px}.hard-stack .hard-quote{font-size:25px}.hard-verdict{margin-top:22px;padding:20px 28px;border-left:5px solid var(--deletion);background:var(--deletion-soft);font:600 24px/1.4 ui-monospace,SFMono-Regular,monospace;color:var(--navy)}
</style></head><body><main class="frame ${variant}"><div class="grain"></div>${body}
<footer class="footer"><strong>${escape(DATA.brand)}</strong><span class="dot"></span><span>${escape(DATA.eyebrow)}</span><span class="url">${escape(DATA.url)}</span></footer></main></body></html>`;
}

const footerless = (body, variant) => frame(body, variant);

const opening = (line1, line2) => frame(`<p class="eyebrow">${escape(DATA.eyebrow)}</p><h1 class="${line1 ? "" : "hidden"}">${escape(DATA.opening.title)}</h1><p class="subtitle ${line2 ? "" : "hidden"}">${escape(DATA.opening.subtitle)}</p>`, "opening");
const problem = (visiblePositions, visiblePainPoints) => frame(`<p class="eyebrow">THE PLAYBOOK</p><h1>${escape(DATA.problem.title)}</h1><div class="positions">${DATA.problem.positions.map((position, index) => `<div class="panel position ${index < visiblePositions ? "" : "hidden"}">${escape(position)}</div>`).join("")}</div><div class="pain-points">${DATA.problem.painPoints.map((pain, index) => `<div class="panel pain ${index < visiblePainPoints ? "" : "hidden"}">${escape(pain)}</div>`).join("")}</div>`);
const baseline = (active) => frame(`<p class="eyebrow">SIMPLE BASELINE</p><h1>${escape(DATA.baseline.title)}</h1><p class="subtitle">${escape(DATA.baseline.subtitle)}</p><dl class="metrics">${DATA.baseline.metrics.map((metric, index) => `<div class="panel metric ${index === active ? "active" : ""}"><dt>${escape(metric.label)}</dt><dd>${escape(metric.value)}</dd></div>`).join("")}</dl>`);

const cards = {
  "opening-blank": opening(false, false),
  "opening-title": opening(true, false),
  opening: opening(true, true),
  "cold-open": footerless(`<p class="eyebrow">${escape(DATA.eyebrow)}</p><h1>${escape(DATA.coldOpen.title)}</h1><p class="subtitle">${escape(DATA.coldOpen.subtitle)}</p><div class="rule"></div><div style="display:flex;gap:18px"><span style="color:var(--deletion);font:500 29px/1.4 'Source Serif 4',serif;text-decoration:line-through;text-decoration-thickness:2px">vendor wording</span><span style="color:var(--insertion);font:500 29px/1.4 'Source Serif 4',serif;text-decoration:underline;text-underline-offset:5px">playbook position</span></div>`),
  "problem-0": problem(0, 0),
  "problem-preferred": problem(1, 0),
  "problem-fallback": problem(2, 0),
  "problem-walkaway": problem(3, 0),
  "problem-definitions": problem(3, 1),
  problem: problem(3, 2),
  baseline: baseline(-1),
  "baseline-complete": baseline(0),
  "baseline-f1": baseline(1),
  "baseline-tracked": baseline(2),
  "baseline-word": baseline(3),
  "hard-case": frame(`<p class="eyebrow">SYNTHETIC HARD CASE · LOL-CAP</p><h1 style="font-size:64px">${escape(DATA.hardCase.title)}</h1><div class="hard-grid"><section class="panel"><p class="kicker">${escape(DATA.hardCase.capLabel)}</p><p class="hard-quote">${escape(DATA.hardCase.cap)}</p></section><div class="hard-stack"><section class="panel"><p class="kicker">${escape(DATA.hardCase.feesLabel)}</p><p class="hard-quote">${escape(DATA.hardCase.fees)}</p></section><section class="panel"><p class="kicker">${escape(DATA.hardCase.implementationLabel)}</p><p class="hard-quote">${escape(DATA.hardCase.implementation)}</p></section></div></div><div class="hard-verdict">${escape(DATA.hardCase.verdict)}</div>`),
  comparison: frame(`<p class="eyebrow">BASELINE → SHIPPED PIPELINE</p><h1>${escape(DATA.comparison.title)}</h1><div class="comparison-lines">${DATA.comparison.rows.map((row) => `<div class="comparison-line">${escape(row)}</div>`).join("")}</div><p class="footnote">${escape(DATA.comparison.footnote)}</p>`),
  "round2-why": frame(`<p class="eyebrow">WHY ROUND 2</p><h1>${escape(DATA.round2Why.title)}</h1><div style="display:grid;grid-template-columns:.72fr 1.4fr;gap:22px;margin-top:44px"><div class="panel" style="display:flex;flex-direction:column;justify-content:center"><p class="stat" style="font-size:62px;margin:0">${escape(DATA.round2Why.detection)}</p><p style="font-size:18px;line-height:1.45;color:var(--muted);margin:22px 0 0">${escape(DATA.round2Why.detectionLabel)}</p></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">${DATA.round2Why.pillars.map((pillar) => `<div class="panel" style="padding:28px 26px"><p class="kicker" style="font-size:15px">${escape(pillar.label)}</p><p style="font:500 23px/1.48 'Source Serif 4',serif;color:var(--ink);margin:36px 0 0">${escape(pillar.body)}</p></div>`).join("")}</div></div>`),
  changelog: frame(`<p class="eyebrow">MEASURED IMPROVEMENT</p><h1>${escape(DATA.changelog.title)}</h1><div class="ladder">${DATA.changelog.steps.map((step, index) => `${index ? '<span class="arrow">→</span>' : ''}<div class="step">${escape(step)}</div>`).join("")}</div><div class="notes"><div class="note">${escape(DATA.changelog.biggest)}</div><div class="note removed">${escape(DATA.changelog.removed)}</div></div><div class="evidence">${escape(DATA.changelog.summary)}</div>`),
  "hot-take": frame(`<p class="eyebrow">${escape(DATA.hotTake.label)}</p><h1>${escape(DATA.hotTake.title)}</h1><p class="subtitle">${escape(DATA.hotTake.subtitle)}</p>`, "hot"),
  closing: frame(`<p class="eyebrow">${escape(DATA.eyebrow)}</p><h1>${escape(DATA.closing.title)}</h1><p class="subtitle">${escape(DATA.closing.subtitle)}</p><p class="url-big">${escape(DATA.url)}</p>`, "close"),
};

const requested = process.argv.slice(2);
const selected = requested.length === 0 ? Object.keys(cards) : requested;
for (const id of selected) {
  if (!(id in cards)) throw new Error(`unknown card id: ${id}`);
}

function atomicText(path, text) {
  const tmp = `${path}.tmp-${process.pid}`;
  writeFileSync(tmp, text);
  renameSync(tmp, path);
}

try {
  for (const id of selected) {
    const html = cards[id];
    const htmlPath = resolve(HTML_DIR, `${id}.html`);
    const pngPath = resolve(OUTPUT_DIR, `${id}.png`);
    const tmpPng = `${pngPath}.tmp-${process.pid}.png`;
    atomicText(htmlPath, html);
    shell("open", pathToFileURL(htmlPath).href);
    shell("set", "viewport", "1920", "1080");
    try { shell("wait", "--fn", "document.fonts.status === 'loaded'"); } catch { shell("wait", "1200"); }
    shell("screenshot", tmpPng);
    renameSync(tmpPng, pngPath);
    process.stdout.write(`rendered ${id}.png\n`);
  }
} finally {
  try { shell("close"); } catch {}
}
