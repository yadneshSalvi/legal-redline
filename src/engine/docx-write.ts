import JSZip from "jszip";

import { parseText } from "./parse-text";
import type { DocumentModel } from "./types";
import { sanitizeXmlText } from "./xml";

const FIXED_DATE = new Date("2026-01-01T00:00:00.000Z");

function escapeXml(text: string): string {
  return sanitizeXmlText(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function contentTypesXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`;
}

function packageRelsXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`;
}

function documentRelsXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;
}

function stylesXml(): string {
  const heading = (level: number): string =>
    `<w:style w:type="paragraph" w:styleId="Heading${level}"><w:name w:val="Heading ${level}"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:uiPriority w:val="${8 + level}"/><w:qFormat/><w:pPr><w:outlineLvl w:val="${level - 1}"/></w:pPr><w:rPr><w:b/><w:sz w:val="${34 - level * 2}"/></w:rPr></w:style>`;
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:rPr><w:b/><w:sz w:val="40"/></w:rPr></w:style>${heading(1)}${heading(2)}${heading(3)}</w:styles>`;
}

function coreXml(title: string): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${escapeXml(title)}</dc:title><dc:creator>Playbook Redliner</dc:creator><cp:lastModifiedBy>Playbook Redliner</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">2026-01-01T00:00:00Z</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">2026-01-01T00:00:00Z</dcterms:modified></cp:coreProperties>`;
}

function documentXml(doc: DocumentModel): string {
  const paragraphs = doc.paragraphs
    .map((paragraph) => {
      const level = paragraph.isHeading ? Math.min(3, Math.max(1, paragraph.level ?? 1)) : undefined;
      const pPr = level ? `<w:pPr><w:pStyle w:val="Heading${level}"/></w:pPr>` : "";
      return `<w:p>${pPr}<w:r><w:t xml:space="preserve">${escapeXml(paragraph.text)}</w:t></w:r></w:p>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>${paragraphs}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr></w:body></w:document>`;
}

function addFile(zip: JSZip, path: string, content: string): void {
  zip.file(path, content, {
    date: FIXED_DATE,
    createFolders: false,
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });
}

async function writeDocument(doc: DocumentModel, title: string): Promise<Uint8Array> {
  const zip = new JSZip();
  addFile(zip, "[Content_Types].xml", contentTypesXml());
  addFile(zip, "_rels/.rels", packageRelsXml());
  addFile(zip, "word/document.xml", documentXml(doc));
  addFile(zip, "word/styles.xml", stylesXml());
  addFile(zip, "word/_rels/document.xml.rels", documentRelsXml());
  addFile(zip, "docProps/core.xml", coreXml(title));
  return zip.generateAsync({
    type: "uint8array",
    platform: "DOS",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });
}

/** Convert canonical text to a minimal deterministic DOCX with one paragraph per text block. */
export async function textToDocx(
  text: string,
  opts: { title?: string } = {},
): Promise<Uint8Array> {
  const doc = parseText(text, opts.title ?? "document.txt");
  return writeDocument(doc, opts.title ?? doc.title);
}

/** Serialize a DocumentModel as a minimal deterministic DOCX; unsupported run details are flattened. */
export async function documentToDocx(doc: DocumentModel): Promise<Uint8Array> {
  return writeDocument(doc, doc.title);
}
