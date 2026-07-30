/**
 * Optimize local raster assets → writes to `.tmp/asset-opt` then replaces sources.
 * Usage: node ./scripts/optimize-assets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const cwd = process.cwd();
const outRoot = path.join(cwd, '.tmp', 'asset-opt');

function loadSharp() {
  try {
    return require('sharp');
  } catch {
    return require(path.join(cwd, 'node_modules', '.pnpm', 'node_modules', 'sharp'));
  }
}

const sharp = loadSharp();
const report = [];
/** @type {{ src: string, dest: string }[]} */
const replacements = [];

function rel(filePath) {
  return path.relative(cwd, filePath);
}

function stagingPath(srcPath) {
  return path.join(outRoot, path.relative(cwd, srcPath));
}

async function walk(dir, exts) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, exts)));
    else if (exts.some((ext) => entry.name.toLowerCase().endsWith(ext))) out.push(full);
  }
  return out;
}

function queueReplace(srcPath, stagedPath, before, after, action) {
  fs.mkdirSync(path.dirname(stagedPath), { recursive: true });
  replacements.push({ src: stagedPath, dest: srcPath });
  report.push({ file: rel(srcPath), before, after, action });
}

async function recompressWebp(inputPath, { maxWidth, quality = 76 } = {}) {
  const before = fs.statSync(inputPath).size;
  let pipeline = sharp(inputPath).rotate();
  const meta = await sharp(inputPath).metadata();
  if (maxWidth && meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }
  const buffer = await pipeline.webp({ quality, effort: 6, smartSubsample: true }).toBuffer();
  if (buffer.byteLength >= before * 0.98) {
    report.push({ file: rel(inputPath), before, after: before, action: 'webp-skip' });
    return;
  }
  const staged = stagingPath(inputPath);
  fs.mkdirSync(path.dirname(staged), { recursive: true });
  fs.writeFileSync(staged, buffer);
  queueReplace(inputPath, staged, before, buffer.byteLength, 'webp');
}

async function pngToWebp(inputPath, outPath, { maxWidth = 192, quality = 85 } = {}) {
  const before = fs.statSync(inputPath).size;
  let pipeline = sharp(inputPath).rotate();
  const meta = await sharp(inputPath).metadata();
  if (maxWidth && meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }
  const buffer = await pipeline.webp({ quality, effort: 6, alphaQuality: 90 }).toBuffer();
  const staged = stagingPath(outPath);
  fs.mkdirSync(path.dirname(staged), { recursive: true });
  fs.writeFileSync(staged, buffer);
  queueReplace(outPath, staged, before, buffer.byteLength, 'png→webp');
  // drop png after successful replace
  replacements.push({ src: '', dest: inputPath, deleteOnly: true });
}

async function gifToWebp(inputPath, outPath, { maxWidth = 960, quality = 68 } = {}) {
  const before = fs.statSync(inputPath).size;
  let pipeline = sharp(inputPath, { animated: true });
  const meta = await sharp(inputPath, { animated: true }).metadata();
  if (maxWidth && meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }
  const buffer = await pipeline.webp({ quality, effort: 6 }).toBuffer();
  const staged = stagingPath(outPath);
  fs.mkdirSync(path.dirname(staged), { recursive: true });
  fs.writeFileSync(staged, buffer);
  queueReplace(outPath, staged, before, buffer.byteLength, 'gif→webp');
  if (buffer.byteLength < before) {
    replacements.push({ src: '', dest: inputPath, deleteOnly: true });
  }
}

async function recompressAvif(inputPath, { quality = 55 } = {}) {
  const before = fs.statSync(inputPath).size;
  if (before < 40_000) {
    report.push({ file: rel(inputPath), before, after: before, action: 'avif-keep' });
    return;
  }
  const buffer = await sharp(inputPath).avif({ quality, effort: 6 }).toBuffer();
  if (buffer.byteLength >= before * 0.95) {
    report.push({ file: rel(inputPath), before, after: before, action: 'avif-skip' });
    return;
  }
  const staged = stagingPath(inputPath);
  fs.mkdirSync(path.dirname(staged), { recursive: true });
  fs.writeFileSync(staged, buffer);
  queueReplace(inputPath, staged, before, buffer.byteLength, 'avif');
}

async function applyReplacements() {
  const manifest = path.join(outRoot, 'replacements.json');
  fs.writeFileSync(manifest, JSON.stringify(replacements, null, 2));
  console.log(`Staged ${replacements.length} replacements → ${rel(manifest)}`);
}

async function main() {
  fs.rmSync(outRoot, { recursive: true, force: true });
  fs.mkdirSync(outRoot, { recursive: true });

  const daviviendaPng = path.join(cwd, 'src/assets/brands/davivienda.png');
  const daviviendaWebp = path.join(cwd, 'src/assets/brands/davivienda.webp');
  if (fs.existsSync(daviviendaPng)) {
    await pngToWebp(daviviendaPng, daviviendaWebp, { maxWidth: 192, quality: 85 });
  } else if (fs.existsSync(daviviendaWebp)) {
    await recompressWebp(daviviendaWebp, { maxWidth: 192, quality: 85 });
  }

  for (const file of await walk(path.join(cwd, 'src/assets/apps/mecateo/menu'), ['.webp'])) {
    const base = path.basename(file);
    const maxWidth = base === 'banner.webp' ? 1200 : base === 'terremoto-logo.webp' ? 256 : 640;
    const quality = base === 'banner.webp' ? 72 : 75;
    await recompressWebp(file, { maxWidth, quality });
  }

  for (const file of await walk(path.join(cwd, 'public/img'), ['.webp'])) {
    await recompressWebp(file, { maxWidth: 1280, quality: 76 });
  }

  const og = path.join(cwd, 'public/og-default.webp');
  if (fs.existsSync(og)) await recompressWebp(og, { maxWidth: 1200, quality: 78 });

  const gif = path.join(cwd, 'public/video/projects/readia/form_ai.gif');
  if (fs.existsSync(gif)) {
    await gifToWebp(gif, path.join(cwd, 'public/video/projects/readia/form_ai.webp'), {
      maxWidth: 960,
      quality: 68
    });
  }

  for (const file of await walk(path.join(cwd, 'public/img'), ['.avif'])) {
    await recompressAvif(file);
  }

  await applyReplacements();

  console.table(
    report.map((row) => ({
      file: row.file,
      beforeKB: +(row.before / 1024).toFixed(1),
      afterKB: +(row.after / 1024).toFixed(1),
      saved: `${Math.max(0, Math.round((1 - row.after / row.before) * 100))}%`,
      action: row.action
    }))
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
