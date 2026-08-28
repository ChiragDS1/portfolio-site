/**
 * Generates minimal valid placeholder PDFs in /public/resume/ so the
 * "Download Resume" links never 404 during development.
 *
 * Runs automatically on `npm install` (postinstall). It will NOT overwrite a
 * file that already exists — drop your real PDFs in and they're safe.
 *
 * Run manually:  node scripts/make-placeholder-pdfs.mjs
 */
import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "resume");
mkdirSync(outDir, { recursive: true });

const files = {
  "Chirag_Shinde_DataEngineer.pdf": "Chirag Deepak Shinde — Data Engineer (placeholder resume)",
  "Chirag_Shinde_DataAnalyst.pdf": "Chirag Deepak Shinde — Data Analyst (placeholder resume)",
  "Chirag_Shinde_DataScientist.pdf": "Chirag Deepak Shinde — Data Scientist (placeholder resume)",
};

/** Build a single-page PDF with a correct cross-reference table. */
function buildPdf(text) {
  const escaped = text.replace(/([()\\])/g, "\\$1");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  const stream = `BT /F1 18 Tf 72 700 Td (${escaped}) Tj 0 -28 TD /F1 11 Tf (Replace this file with your real resume PDF.) Tj ET`;
  objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);

  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((body, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return Buffer.from(pdf, "latin1");
}

let created = 0;
for (const [name, title] of Object.entries(files)) {
  const path = join(outDir, name);
  if (existsSync(path)) continue;
  writeFileSync(path, buildPdf(title));
  created += 1;
}

console.log(
  created > 0
    ? `[resume] created ${created} placeholder PDF(s) in public/resume/`
    : "[resume] placeholder PDFs already present — nothing to do",
);
