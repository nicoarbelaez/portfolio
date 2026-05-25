import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const rootDir = process.cwd();

const yamlPath = path.join(rootDir, 'resume', 'cv.yaml');

const resumeDir = path.join(rootDir, 'public', 'resume');

const originalPdfPath = path.join(rootDir, 'resume', 'resume.pdf');

// Crear carpeta destino
fs.mkdirSync(resumeDir, {
  recursive: true
});

// Hash basado en el YAML
const fileBuffer = fs.readFileSync(yamlPath);

const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex').slice(0, 8);

const hashedFileName = `resume.${hash}.pdf`;

const hashedFilePath = path.join(resumeDir, hashedFileName);

// Copiar PDF base al PDF versionado
fs.copyFileSync(originalPdfPath, hashedFilePath);

// Limpiar hashes viejos
const oldFiles = fs
  .readdirSync(resumeDir)
  .filter((file) => file.startsWith('resume.') && file.endsWith('.pdf') && file !== hashedFileName);

for (const file of oldFiles) {
  fs.unlinkSync(path.join(resumeDir, file));
}

// Metadata
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
