/**
 * Build-time Classic CV → A4 PDF.
 * Starts a Vite (SvelteKit) dev server, opens /cv-print, writes static/georgy_pokazeev_cv.pdf.
 *
 * Usage: npm run generate:cv-pdf
 * Needs: npx playwright install chromium  (once)
 */
import { createServer } from "vite";
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outFile = path.join(root, "static", "georgy_pokazeev_cv.pdf");
const port = 4177;
const url = `http://127.0.0.1:${port}/cv-print`;

const server = await createServer({
  configFile: path.join(root, "vite.config.ts"),
  root,
  server: { port, strictPort: true, host: "127.0.0.1" },
});

await server.listen();
console.log(`[generate-cv] serving ${url}`);

try {
  const browser = await chromium.launch();
  // Wide enough that layout matches the designed Classic CV while loading
  const page = await browser.newPage({
    viewport: { width: 900, height: 1280 },
  });

  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  // First run can trigger a Vite dep-optimize reload — wait until content is back
  await page.waitForSelector("article img", { state: "visible", timeout: 60_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    await Promise.all(
      [...document.images].map((img) =>
        img.complete
          ? null
          : new Promise((resolve) => {
              img.onload = img.onerror = () => resolve(null);
            })
      )
    );
  });
  await page.waitForFunction(() => {
    const exp = [...document.querySelectorAll("h2")].find((h) =>
      h.textContent?.includes("EXPERIENCE")
    );
    return Boolean(exp && getComputedStyle(document.body).overflow !== "hidden");
  });
  await new Promise((r) => setTimeout(r, 500));

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  const tmpFile = `${outFile}.tmp`;
  await page.pdf({
    path: tmpFile,
    format: "A4",
    printBackground: true,
    // Match the denser hand-tuned A4 margins
    margin: { top: "8mm", bottom: "8mm", left: "9mm", right: "9mm" },
  });

  await browser.close();

  let written = outFile;
  try {
    fs.renameSync(tmpFile, outFile);
  } catch {
    try {
      fs.copyFileSync(tmpFile, outFile);
      fs.unlinkSync(tmpFile);
    } catch {
      // Viewer has the PDF open (common on Windows) — leave .tmp for you to open
      written = tmpFile;
      console.warn(
        `[generate-cv] could not replace ${path.basename(outFile)} (file locked). Open the .tmp file, or close the viewer and re-run.`
      );
    }
  }

  const kb = (fs.statSync(written).size / 1024).toFixed(1);
  console.log(`[generate-cv] wrote ${written} (${kb} KB)`);
} finally {
  await server.close();
}
