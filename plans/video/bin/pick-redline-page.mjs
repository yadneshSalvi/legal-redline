#!/usr/bin/env node
import { readFileSync } from "node:fs";

function pixels(path) {
  const data = readFileSync(path);
  let offset = 0;
  const token = () => {
    while (offset < data.length) {
      if (data[offset] === 35) {
        while (offset < data.length && data[offset] !== 10) offset += 1;
      } else if (data[offset] <= 32) offset += 1;
      else break;
    }
    const start = offset;
    while (offset < data.length && data[offset] > 32 && data[offset] !== 35) offset += 1;
    return data.subarray(start, offset).toString("ascii");
  };
  if (token() !== "P6") throw new Error(`${path} is not a binary PPM`);
  const width = Number(token());
  const height = Number(token());
  const max = Number(token());
  while (data[offset] <= 32) offset += 1;
  if (!width || !height || max !== 255) throw new Error(`${path} has an unsupported PPM header`);
  return data.subarray(offset, offset + width * height * 3);
}

function score(path) {
  const rgb = pixels(path);
  let colored = 0;
  for (let index = 0; index < rgb.length; index += 3) {
    const red = rgb[index];
    const green = rgb[index + 1];
    const blue = rgb[index + 2];
    const deletion = red > 95 && red > green * 1.55 && red > blue * 1.35;
    const insertion = blue > 90 && blue > red * 1.45 && blue > green * 1.18;
    if (deletion || insertion) colored += 1;
  }
  return colored;
}

const ranked = process.argv.slice(2).map((path) => ({ path, score: score(path) })).sort((a, b) => b.score - a.score);
if (ranked.length === 0) throw new Error("no PPM pages supplied");
process.stdout.write(`${ranked[0].path}\t${ranked[0].score}\n`);
