#!/usr/bin/env node
import { deflateRawSync, inflateRawSync } from "node:zlib";
import { readFileSync, renameSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const [inputArg, outputArg] = process.argv.slice(2);
if (!inputArg || !outputArg) throw new Error("usage: node docx-revision-view.mjs input.docx output.docx");

const input = resolve(inputArg);
const output = resolve(outputArg);

const crcTable = new Uint32Array(256);
for (let index = 0; index < 256; index += 1) {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  crcTable[index] = value >>> 0;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function findEocd(buffer) {
  const floor = Math.max(0, buffer.length - 65_557);
  for (let offset = buffer.length - 22; offset >= floor; offset -= 1) {
    if (buffer.readUInt32LE(offset) === 0x06054b50) return offset;
  }
  throw new Error("DOCX ZIP end-of-central-directory record not found");
}

function readZip(buffer) {
  const eocd = findEocd(buffer);
  const count = buffer.readUInt16LE(eocd + 10);
  let cursor = buffer.readUInt32LE(eocd + 16);
  const entries = [];
  for (let index = 0; index < count; index += 1) {
    if (buffer.readUInt32LE(cursor) !== 0x02014b50) throw new Error("invalid DOCX central directory");
    const method = buffer.readUInt16LE(cursor + 10);
    const time = buffer.readUInt16LE(cursor + 12);
    const date = buffer.readUInt16LE(cursor + 14);
    const compressedSize = buffer.readUInt32LE(cursor + 20);
    const nameLength = buffer.readUInt16LE(cursor + 28);
    const extraLength = buffer.readUInt16LE(cursor + 30);
    const commentLength = buffer.readUInt16LE(cursor + 32);
    const localOffset = buffer.readUInt32LE(cursor + 42);
    const name = buffer.subarray(cursor + 46, cursor + 46 + nameLength).toString("utf8");
    if (buffer.readUInt32LE(localOffset) !== 0x04034b50) throw new Error(`invalid local ZIP entry for ${name}`);
    const localNameLength = buffer.readUInt16LE(localOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localOffset + 28);
    const dataOffset = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = buffer.subarray(dataOffset, dataOffset + compressedSize);
    const data = method === 0 ? Buffer.from(compressed) : method === 8 ? inflateRawSync(compressed) : null;
    if (!data) throw new Error(`unsupported ZIP compression method ${method} for ${name}`);
    entries.push({ name, data, time, date });
    cursor += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

function replaceEntry(entries, name, transform) {
  const entry = entries.find((candidate) => candidate.name === name);
  if (!entry) throw new Error(`DOCX is missing ${name}`);
  entry.data = Buffer.from(transform(entry.data.toString("utf8")), "utf8");
}

function writeZip(entries) {
  const locals = [];
  const centrals = [];
  let localOffset = 0;
  for (const entry of entries) {
    const name = Buffer.from(entry.name, "utf8");
    const compressed = deflateRawSync(entry.data, { level: 9 });
    const crc = crc32(entry.data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(8, 8);
    local.writeUInt16LE(entry.time ?? 0, 10);
    local.writeUInt16LE(entry.date ?? 0x5c21, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(entry.data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, name, compressed);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(entry.time ?? 0, 12);
    central.writeUInt16LE(entry.date ?? 0x5c21, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(compressed.length, 20);
    central.writeUInt32LE(entry.data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(localOffset, 42);
    centrals.push(central, name);
    localOffset += local.length + name.length + compressed.length;
  }

  const centralBuffer = Buffer.concat(centrals);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(centralBuffer.length, 12);
  eocd.writeUInt32LE(localOffset, 16);
  eocd.writeUInt16LE(0, 20);
  return Buffer.concat([...locals, centralBuffer, eocd]);
}

function styleRuns(fragment, color, decoration) {
  return fragment.replace(/<w:r(\s[^>]*)?>([\s\S]*?)<\/w:r>/g, (run, attributes = "", body) => {
    const visual = `<w:color w:val="${color}"/>${decoration}`;
    const styled = body.includes("<w:rPr>")
      ? body.replace("</w:rPr>", `${visual}</w:rPr>`)
      : `<w:rPr>${visual}</w:rPr>${body}`;
    return `<w:r${attributes}>${styled}</w:r>`;
  });
}

/**
 * LibreOffice's headless PDF exporter renders DOCX revisions in final view even when w:revisionView
 * requests markup. For this temporary rendering copy only, unwrap both revision containers and
 * express their semantics as ordinary Word run formatting. The source package is never modified.
 */
function visibleRevisions(xml) {
  const deletions = xml.replace(/<w:del\b(?![^>]*\/>)[^>]*>([\s\S]*?)<\/w:del>/g, (_match, content) => {
    const text = content.replace(/<w:delText(\s[^>]*)?>/g, "<w:t$1>").replaceAll("</w:delText>", "</w:t>");
    return styleRuns(text, "B3261E", "<w:strike/>");
  });
  return deletions.replace(/<w:ins\b(?![^>]*\/>)[^>]*>([\s\S]*?)<\/w:ins>/g, (_match, content) =>
    styleRuns(content, "1E5AA8", '<w:u w:val="single"/>'),
  );
}

const entries = readZip(readFileSync(input));
replaceEntry(entries, "word/document.xml", visibleRevisions);

const tmp = `${output}.tmp-${process.pid}`;
writeFileSync(tmp, writeZip(entries));
renameSync(tmp, output);
