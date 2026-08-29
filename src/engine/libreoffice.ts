import { execFile } from "node:child_process";
import { constants } from "node:fs";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";

import { auditDocx, type DocxAudit } from "./docx-audit";

/** Concatenated tracked text of one revision kind, whitespace-normalised. */
function revisionText(audit: DocxAudit, kind: "ins" | "del"): string {
  return audit.revisions
    .filter((revision) => revision.kind === kind)
    .map((revision) => revision.content)
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

const execFileAsync = promisify(execFile);

async function executables(): Promise<string[]> {
  const candidates: string[] = [];
  const macPath = "/Applications/LibreOffice.app/Contents/MacOS/soffice";
  try {
    await access(macPath, constants.X_OK);
    candidates.push(macPath);
  } catch {
    // Continue to the PATH probe.
  }
  try {
    await execFileAsync("soffice", ["--version"], { timeout: 5_000 });
    candidates.push("soffice");
  } catch {
    // Absence is reported by the caller without throwing.
  }
  return candidates;
}

/** Convert through an isolated LibreOffice profile and verify revisions survive a DOCX resave. */
export async function validateWithLibreOffice(bytes: Uint8Array): Promise<{
  attempted: boolean;
  ok: boolean;
  message?: string;
}> {
  const candidates = await executables();
  if (candidates.length === 0) {
    return { attempted: false, ok: false, message: "LibreOffice soffice was not found" };
  }
  const directory = await mkdtemp(join(tmpdir(), "playbook-redliner-"));
  const input = join(directory, "redlined.docx");
  try {
    await writeFile(input, bytes);
    const before = await auditDocx(bytes);
    const failures: string[] = [];
    for (const [index, soffice] of candidates.entries()) {
      const profile = join(directory, `profile-${index}`);
      const output = join(directory, `output-${index}`);
      const roundtrip = join(directory, `roundtrip-${index}`);
      const common = [`-env:UserInstallation=${pathToFileURL(profile).href}`, "--headless"];
      try {
        await Promise.all([mkdir(output), mkdir(roundtrip)]);
        await execFileAsync(soffice, [...common, "--convert-to", "pdf", "--outdir", output, input], {
          timeout: 60_000,
        });
        await access(join(output, `${basename(input, ".docx")}.pdf`), constants.R_OK);
        await execFileAsync(
          soffice,
          [...common, "--convert-to", "docx:MS Word 2007 XML", "--outdir", roundtrip, input],
          { timeout: 60_000 },
        );
        const roundtripPath = join(roundtrip, basename(input));
        await access(roundtripPath, constants.R_OK);
        const after = await readFile(roundtripPath).then((value) => auditDocx(value));
        // LibreOffice may merge adjacent revision wrappers on resave, so compare the tracked text
        // itself (insertions and deletions concatenated in document order) rather than wrapper counts.
        const preserved =
          revisionText(before, "ins") === revisionText(after, "ins") &&
          revisionText(before, "del") === revisionText(after, "del") &&
          before.comments === after.comments;
        return {
          attempted: true,
          ok: preserved,
          message: preserved
            ? `PDF conversion and DOCX round-trip preserved ${after.insertions} insertions, ${after.deletions} deletions, and ${after.comments} comments` +
              (after.insertions !== before.insertions || after.deletions !== before.deletions
                ? ` (wrappers merged from ${before.insertions}/${before.deletions}; tracked text identical)`
                : "")
            : `LibreOffice DOCX round-trip changed tracked content (revisions ${before.insertions}/${before.deletions}/${before.comments} → ${after.insertions}/${after.deletions}/${after.comments})`,
        };
      } catch (error) {
        failures.push(`${soffice}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    return { attempted: true, ok: false, message: failures.join("; ") };
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}
