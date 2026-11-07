/**
 * Fail the build if the committed Classic CV PDF is missing.
 * Regenerate locally with: npm run generate:cv-pdf
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pdf = path.join(root, "static", "georgy_pokazeev_cv.pdf");

if (!fs.existsSync(pdf) || fs.statSync(pdf).size < 1024) {
  console.error(
    `[check-cv-pdf] Missing or empty ${path.relative(root, pdf)}.\n` +
      `Run "npm run generate:cv-pdf" and commit the file.`
  );
  process.exit(1);
}

console.log(
  `[check-cv-pdf] ok — ${path.relative(root, pdf)} (${(fs.statSync(pdf).size / 1024).toFixed(1)} KB)`
);
