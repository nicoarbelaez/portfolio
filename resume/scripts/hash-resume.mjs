import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const rootDir = process.cwd();

const yamlPath = path.join(rootDir, 'resume', 'cv.yaml');
const resumeDir = path.join(rootDir, 'public', 'resume');
const pdfCandidates = [
  path.join(rootDir, 'resume', 'resume.pdf'),
  path.join(rootDir, 'resume.pdf')
];
const originalPdfPath = pdfCandidates.find((candidate) => fs.existsSync(candidate));

if (!originalPdfPath) {
  console.error(
    `Missing resume PDF (looked for resume/resume.pdf and resume.pdf). Run pnpm generate:resume / pnpm dev:resume first.`
  );
  process.exit(1);
}

fs.mkdirSync(resumeDir, { recursive: true });

const fileBuffer = fs.readFileSync(yamlPath);
const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex').slice(0, 8);
const hashedFileName = `resume.${hash}.pdf`;
const hashedFilePath = path.join(resumeDir, hashedFileName);

fs.copyFileSync(originalPdfPath, hashedFilePath);

const oldFiles = fs
  .readdirSync(resumeDir)
  .filter((file) => file.startsWith('resume.') && file.endsWith('.pdf') && file !== hashedFileName);

for (const file of oldFiles) {
  fs.unlinkSync(path.join(resumeDir, file));
}

fs.writeFileSync(
  path.join(resumeDir, 'version.json'),
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
