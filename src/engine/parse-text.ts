import { createHash } from "node:crypto";

import { buildDocumentModel } from "./model";
import { splitParagraphs } from "./text";
import type { DocumentModel } from "./types";

/** Parse canonical plain text into stable paragraph, section, and definition models. */
export function parseText(text: string, filename: string): DocumentModel {
  const bytes = new TextEncoder().encode(text).byteLength;
  return buildDocumentModel(
    splitParagraphs(text).map((paragraph) => ({ text: paragraph })),
    {
      kind: "txt",
      filename,
      sha256: createHash("sha256").update(text, "utf8").digest("hex"),
      bytes,
    },
  );
}

