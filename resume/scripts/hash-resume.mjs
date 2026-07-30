import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

import {
  PUBLIC_RESUME_DIR,
  RESUME_PDF,
  RESUME_VERSION_FILE,
  RESUME_YAML
} from '../constants.mjs';

const rootDir = process.cwd();
const HASH_LENGTH = 8;
/** Legacy path when --pdf-path was incorrectly set to ./resume/resume.pdf */
const LEGACY_NESTED_PDF = path.join('resume', 'resume', 'resume.pdf');

const yamlPath = path.join(rootDir, RESUME_YAML);
const resumePublicDir = path.join(rootDir, PUBLIC_RESUME_DIR);

const pdfCandidates = [
  path.join(rootDir, RESUME_PDF),
  path.join(rootDir, 'resume.pdf'),
  path.join(rootDir, LEGACY_NESTED_PDF)
];

const originalPdfPath = pdfCandidates.find((candidate) => fs.existsSync(candidate));

if (!originalPdfPath) {
  console.error(
    `Missing resume PDF (looked for ${RESUME_PDF} and resume.pdf). ` +
      'Run pnpm generate:resume / pnpm dev:resume first. ' +
      'RenderCV --pdf-path is relative to resume/ — use ./resume.pdf.'
  );
  process.exit(1);
}

if (originalPdfPath === path.join(rootDir, LEGACY_NESTED_PDF)) {
  console.warn(
    `Found PDF at legacy nested path ${LEGACY_NESTED_PDF}. ` +
      'Prefer --pdf-path ./resume.pdf (relative to the YAML file).'
  );
}

fs.mkdirSync(resumePublicDir, { recursive: true });

const fileBuffer = fs.readFileSync(yamlPath);
const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex').slice(0, HASH_LENGTH);
const hashedFileName = `resume.${hash}.pdf`;
const hashedFilePath = path.join(resumePublicDir, hashedFileName);

fs.copyFileSync(originalPdfPath, hashedFilePath);

const oldFiles = fs
  .readdirSync(resumePublicDir)
  .filter((file) => file.startsWith('resume.') && file.endsWith('.pdf') && file !== hashedFileName);

for (const file of oldFiles) {
  fs.unlinkSync(path.join(resumePublicDir, file));
}

fs.writeFileSync(
  path.join(resumePublicDir, RESUME_VERSION_FILE),
  JSON.stringify(
    {
      filename: hashedFileName,
      hash,
      generatedAt: new Date().toISOString()
    },
    null,
    2
  )
);

console.log(`Generated: ${hashedFileName}`);
