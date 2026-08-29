import { describe, expect, it } from "vitest";

import { redactSubmissionText } from "@/src/submission/redact";

describe("submission export redaction", () => {
  it("redacts every credential and home-path form used by the trace exporters", () => {
    const input = [
      "sk-secret_key-12345678",
      "Bearer token.value-here",
      "vercel_blob_rw_abcdefghijkl",
      "BLOB_READ_WRITE_TOKEN=blob-secret",
      "ANTHROPIC_API_KEY='anthropic-secret'",
      'OPENAI_API_KEY="openai-secret"',
      '"apiKey":"json-secret"',
      "/Users/yadneshsalvi/code/project",
    ].join("\n");
    expect(redactSubmissionText(input)).toMatchInlineSnapshot(`
      "[REDACTED]
      Bearer [REDACTED]
      [REDACTED]
      BLOB_READ_WRITE_TOKEN=[REDACTED]
      ANTHROPIC_API_KEY=[REDACTED]
      OPENAI_API_KEY=[REDACTED]
      \"apiKey\":\"[REDACTED]\"
      ~/code/project"
    `);
  });
});
