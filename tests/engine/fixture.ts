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
            children: [new TextRun("Numbered obligation without a literal label")],
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

