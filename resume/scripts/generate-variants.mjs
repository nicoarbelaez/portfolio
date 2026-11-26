import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

import {
  COMPOSED_YAML_FILE,
  CONTENT_HASH_LENGTH,
  RESUME_YAML,
  VARIANT_FILE_EXTENSION,
  VARIANTS_DIR,
  VARIANTS_GENERATED_DIR,
  VARIANTS_MANIFEST_FILE,
  VARIANTS_SCRATCH_DIR,
  variantPdfFile
} from '../constants.mjs';
import { composeVariant } from './lib/compose-variant.mjs';
import { renderCv } from './lib/render.mjs';
import { manifestSchema, parseVariantDocument } from './lib/variant-schema.mjs';

const YAML_STRINGIFY_OPTIONS = { lineWidth: 0 };

const rootDir = process.cwd();
const variantsDir = path.join(rootDir, VARIANTS_DIR);
const generatedDir = path.join(rootDir, VARIANTS_GENERATED_DIR);
const scratchDir = path.join(rootDir, VARIANTS_SCRATCH_DIR);

function readYaml(filePath) {
  return YAML.parse(fs.readFileSync(filePath, 'utf8'));
}

function listVariantSlugs() {
  if (!fs.existsSync(variantsDir)) return [];
  return fs
    .readdirSync(variantsDir)
    .filter((file) => file.endsWith(VARIANT_FILE_EXTENSION))
    .map((file) => path.basename(file, VARIANT_FILE_EXTENSION))
    .sort();
}

/** @returns {object} manifest entry for one rendered variant */
function generateVariant(slug, base) {
  const { meta, ...overrides } = parseVariantDocument(
    slug,
    readYaml(path.join(variantsDir, `${slug}${VARIANT_FILE_EXTENSION}`))
  );

  const composedYaml = YAML.stringify(composeVariant(base, overrides), YAML_STRINGIFY_OPTIONS);
  const slugScratchDir = path.join(scratchDir, slug);
  fs.mkdirSync(slugScratchDir, { recursive: true });
  const composedPath = path.join(slugScratchDir, COMPOSED_YAML_FILE);
  fs.writeFileSync(composedPath, composedYaml);

  const pdfPath = path.join(generatedDir, variantPdfFile(slug));
  const status = renderCv({
    rootDir,
    yamlPath: path.relative(rootDir, composedPath),
    pdfPath,
    outputFolder: slugScratchDir
  });
  if (status !== 0) {
    throw new Error(`RenderCV failed for variant "${slug}" (exit ${status}).`);
  }

  return {
    slug,
    ...meta,
    hash: crypto
      .createHash('sha256')
      .update(composedYaml)
      .digest('hex')
      .slice(0, CONTENT_HASH_LENGTH),
    bytes: fs.statSync(pdfPath).size,
    generatedAt: new Date().toISOString()
  };
}

const slugs = listVariantSlugs();
fs.rmSync(generatedDir, { recursive: true, force: true });
fs.mkdirSync(generatedDir, { recursive: true });

const base = readYaml(path.join(rootDir, RESUME_YAML));
const entries = slugs.map((slug) => generateVariant(slug, base));
entries.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

fs.writeFileSync(
  path.join(generatedDir, VARIANTS_MANIFEST_FILE),
  `${JSON.stringify(manifestSchema.parse(entries), null, 2)}\n`
);
console.log(`Generated ${entries.length} resume variant(s) in ${VARIANTS_GENERATED_DIR}.`);
