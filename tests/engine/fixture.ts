import {
  AlignmentType,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
import JSZip from "jszip";

const FIXED_DATE = new Date("2026-01-01T00:00:00.000Z");

/** Build a realistic Word-authored fixture, then add one pre-existing tracked insertion/deletion. */
export async function realisticFixture(): Promise<Uint8Array> {
  const document = new Document({
    title: "Fixture Services Agreement",
    numbering: {
      config: [
        {
          reference: "fixture-list",
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: "%1.",
              alignment: AlignmentType.START,
            },
          ],
        },
      ],
    },
    sections: [
      {
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun("1. Services")],
          }),
          new Paragraph({
            children: [
              new TextRun("Vendor shall maintain "),
              new TextRun({ text: "reasonable ", bold: true }),
              new TextRun({ text: "security", italics: true }),
              new TextRun(" measures—and Customer’s controls."),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("See "),
              new ExternalHyperlink({
                link: "https://example.com/policy",
                children: [new TextRun({ text: "Example policy", style: "Hyperlink" })],
              }),
              new TextRun(" for details."),
            ],
          }),
          new Paragraph({
            numbering: { reference: "fixture-list", level: 0 },
            children: [new TextRun("Numbered obligation without a literal label.")],
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Table cell obligation must be removed.")],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });
  const zip = await JSZip.loadAsync(await Packer.toBuffer(document));
  const entry = zip.file("word/document.xml");
  if (!entry) throw new Error("docx fixture has no main document part");
  const xml = await entry.async("string");
  const tracked =
    '<w:p><w:ins w:id="41" w:author="Prior Reviewer" w:date="2025-01-01T00:00:00Z"><w:r><w:t xml:space="preserve">Existing insertion</w:t></w:r></w:ins><w:del w:id="42" w:author="Prior Reviewer" w:date="2025-01-01T00:00:00Z"><w:r><w:delText xml:space="preserve"> hidden deletion</w:delText></w:r></w:del></w:p>';
  zip.file("word/document.xml", xml.replace("<w:sectPr", `${tracked}<w:sectPr`), {
    date: FIXED_DATE,
  });
  return zip.generateAsync({ type: "uint8array", compression: "DEFLATE" });
}

/** Add fields, bookmarks, SDT, hyperlink, text box, alternate content, and prior revisions beside an edit target. */
export async function hostileFixture(): Promise<Uint8Array> {
  const zip = await JSZip.loadAsync(await realisticFixture());
  const entry = zip.file("word/document.xml");
  if (!entry) throw new Error("docx fixture has no main document part");
  const xml = await entry.async("string");
  const hostile =
    '<w:p><w:bookmarkStart w:id="501" w:name="HostileBookmark"/><w:commentRangeStart w:id="700"/><w:r><w:t xml:space="preserve">Prefix </w:t></w:r><w:commentRangeEnd w:id="700"/><w:r><w:commentReference w:id="700"/></w:r><w:bookmarkEnd w:id="501"/><w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> DATE </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:t xml:space="preserve">field result </w:t></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r><w:fldSimple w:instr="AUTHOR"><w:r><w:t xml:space="preserve">simple field </w:t></w:r></w:fldSimple><w:sdt><w:sdtPr><w:id w:val="777"/></w:sdtPr><w:sdtContent><w:r><w:t xml:space="preserve">SDT content </w:t></w:r></w:sdtContent></w:sdt><w:smartTag w:uri="urn:test" w:element="term"><w:r><w:t xml:space="preserve">Smart text </w:t></w:r></w:smartTag><w:proofErr w:type="spellStart"/><w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">Hostile </w:t></w:r><w:r><w:rPr><w:i/></w:rPr><w:t xml:space="preserve">ordinary </w:t></w:r><w:r><w:t xml:space="preserve">target </w:t></w:r><w:proofErr w:type="spellEnd"/><w:ins w:id="601" w:author="Prior Reviewer" w:date="2025-01-01T00:00:00Z"><w:r><w:t xml:space="preserve">Prior inserted </w:t></w:r></w:ins><w:del w:id="602" w:author="Prior Reviewer" w:date="2025-01-01T00:00:00Z"><w:r><w:delText xml:space="preserve">prior hidden deletion</w:delText></w:r></w:del><w:hyperlink w:anchor="_top"><w:r><w:t>Hyperlink</w:t></w:r></w:hyperlink><mc:AlternateContent xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"><mc:Choice Requires="w14"><w:r><w:t xml:space="preserve"> Choice text</w:t></w:r></mc:Choice></mc:AlternateContent><w:r><w:pict><w:txbxContent><w:p><w:r><w:t>Box text</w:t></w:r></w:p></w:txbxContent></w:pict></w:r></w:p>';
  zip.file("word/document.xml", xml.replace("<w:sectPr", `${hostile}<w:sectPr`), {
    date: FIXED_DATE,
  });
  zip.file(
    "word/comments.xml",
    '<?xml version="1.0" encoding="UTF-8"?><w:comments xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:comment w:id="700" w:author="Prior Reviewer" w:date="2025-01-01T00:00:00Z"><w:p><w:r><w:t>Existing comment</w:t></w:r></w:p></w:comment></w:comments>',
    { date: FIXED_DATE },
  );
  const contentTypes = await zip.file("[Content_Types].xml")?.async("string");
  const relationships = await zip.file("word/_rels/document.xml.rels")?.async("string");
  if (!contentTypes || !relationships) throw new Error("fixture relationship parts are missing");
  zip.file(
    "[Content_Types].xml",
    contentTypes.replace(
      "</Types>",
      '<Override PartName="/word/comments.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml"/></Types>',
    ),
    { date: FIXED_DATE },
  );
  zip.file(
    "word/_rels/document.xml.rels",
    relationships.replace(
      "</Relationships>",
      '<Relationship Id="rId999" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments" Target="comments.xml"/></Relationships>',
    ),
    { date: FIXED_DATE },
  );
  return zip.generateAsync({ type: "uint8array", compression: "DEFLATE" });
}

/** Build a two-level decimal list for numbering and heading-heuristic tests. */
export async function multilevelNumberingFixture(): Promise<Uint8Array> {
  const document = new Document({
    numbering: {
      config: [
        {
          reference: "multilevel",
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: "%1.",
              alignment: AlignmentType.START,
            },
            {
              level: 1,
              format: LevelFormat.DECIMAL,
              text: "%1.%2.",
              alignment: AlignmentType.START,
            },
          ],
        },
      ],
    },
    sections: [
      {
        children: [
          new Paragraph({
            numbering: { reference: "multilevel", level: 0 },
            children: [new TextRun("Short Heading")],
          }),
          new Paragraph({
            numbering: { reference: "multilevel", level: 1 },
            children: [
              new TextRun("Vendor's aggregate liability arising before the claim shall be limited."),
            ],
          }),
          new Paragraph({
            numbering: { reference: "multilevel", level: 0 },
            children: [new TextRun("The Vendor shall perform.")],
          }),
        ],
      },
    ],
  });
  return Packer.toBuffer(document);
}
