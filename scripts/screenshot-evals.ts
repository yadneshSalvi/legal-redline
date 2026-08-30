/**
 * 1440×900 evidence for `/evals` (STYLE.md §7). Drives a real browser against a running dev server
 * so the captures are of the shipped page, not of a fixture render:
 *
 *   pnpm dev -p 3101
 *   pnpm shots:evals            # → docs/screenshots/evals-round2-*.png
 *
 * `EVALS_BASE_URL` overrides the origin. The fixture capture stubs `GET /api/evals` with the empty
 * payload the route answers when no report has been generated, so nothing on disk is touched.
 */
import { mkdir, rename } from "node:fs/promises";
import path from "node:path";

import { chromium, type Page } from "@playwright/test";

const BASE = process.env.EVALS_BASE_URL ?? "http://localhost:3101";
const OUT = path.resolve(process.cwd(), "docs/screenshots");
const VIEWPORT = { width: 1440, height: 900 };

interface Shot {
  name: string;
  tier?: "short" | "long" | "all";
  fixture?: boolean;
  /** Heading to scroll to the top of the viewport before capturing; omitted means the fold. */
  section?: string;
  /** Tab to the tier switch first, so the 2 px navy focus ring is in the capture. */
  focusTier?: boolean;
}

const shots: Shot[] = [
  { name: "evals-round2-short", tier: "short" },
  { name: "evals-round2-long", tier: "long" },
  { name: "evals-round2-all", tier: "all" },
  { name: "evals-round2-why", tier: "short", section: "Why round 2" },
  { name: "evals-round2-matrix", tier: "all", section: "Per contract" },
  { name: "evals-round2-focus", tier: "short", focusTier: true },
  { name: "evals-round2-fixture", fixture: true },
  { name: "evals-round2-fixture-elements", fixture: true, section: "Why round 2" },
];

async function scrollTo(page: Page, heading: string): Promise<void> {
  await page.getByRole("heading", { name: heading, exact: true }).evaluate((node) => {
    const top = node.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "instant" });
  });
  await page.waitForTimeout(200);
}

/** Keyboard focus only — a click leaves no `:focus-visible` ring to photograph. */
async function focusTierSwitch(page: Page): Promise<void> {
  for (let index = 0; index < 40; index += 1) {
    await page.keyboard.press("Tab");
    const onRadio = await page.evaluate(() => document.activeElement?.getAttribute("role") === "radio");
    if (onRadio) break;
  }
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(400);
}

async function capture(page: Page, shot: Shot): Promise<void> {
  const url = new URL("/evals", BASE);
  if (shot.tier) url.searchParams.set("tier", shot.tier);
  await page.goto(url.toString(), { waitUntil: "networkidle" });
  await page.getByRole("radiogroup", { name: "Contract tier" }).waitFor({ state: "visible" });
  if (shot.focusTier) await focusTierSwitch(page);
  if (shot.section) await scrollTo(page, shot.section);
  const temporary = path.join(OUT, `.${shot.name}.tmp.png`);
  await page.screenshot({ path: temporary });
  await rename(temporary, path.join(OUT, `${shot.name}.png`));
  console.log(`${shot.name}.png`);
}

async function main(): Promise<void> {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  try {
    for (const shot of shots) {
      const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
      const page = await context.newPage();
      if (shot.fixture) {
        await page.route("**/api/evals", (route) =>
          route.fulfill({ status: 200, contentType: "application/json", body: "[]" }),
        );
      }
      await capture(page, shot);
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
