const SECRET_ASSIGNMENT = /((?:BLOB_READ_WRITE_TOKEN|ANTHROPIC_API_KEY|OPENAI_API_KEY)\s*=\s*)(?:"[^"\r\n]*"|'[^'\r\n]*'|[^\s\r\n]+)/giu;

/** Redaction shared by the submission exporters. Apply before every filesystem write. */
export function redactSubmissionText(text: string): string {
  return text
    .replace(/sk-[A-Za-z0-9_-]{8,}/gu, "[REDACTED]")
    .replace(/Bearer\s+[^\s"'`]+/giu, "Bearer [REDACTED]")
    .replace(/vercel_blob_rw_[A-Za-z0-9_-]+/giu, "[REDACTED]")
    .replace(SECRET_ASSIGNMENT, "$1[REDACTED]")
    .replace(/("(?:apiKey|api_key|authorization|token|secret)"\s*:\s*)"[^"]+"/giu, "$1\"[REDACTED]\"")
    .replaceAll("/Users/yadneshsalvi", "~");
}
