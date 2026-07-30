import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

import { RENDERCV_PDF_PATH, RESUME_VENV_DIR } from '../constants.mjs';

const OUTPUT_FOLDER = './.tmp/rendercv';
const rootDir = process.cwd();

/**
 * Prefer project `.venv` (Vercel/uv), then system python3/python.
 */
function resolvePythonBin() {
  const venvPython =
    process.platform === 'win32'
      ? path.join(rootDir, RESUME_VENV_DIR, 'Scripts', 'python.exe')
      : path.join(rootDir, RESUME_VENV_DIR, 'bin', 'python');

  const candidates = [venvPython, 'python3', 'python'];

  for (const candidate of candidates) {
    if (candidate.includes(path.sep) && !fs.existsSync(candidate)) {
      continue;
    }
    const probe = spawnSync(candidate, ['--version'], {
      encoding: 'utf8',
      shell: process.platform === 'win32' && !candidate.includes(path.sep)
    });
    if (probe.status === 0) {
      return candidate;
    }
  }

  throw new Error(
    'Python not found. On Vercel, install via `uv venv` + `uv pip install -r requirements.txt`. Locally: pip/uv install RenderCV.'
  );
}

const pythonBin = resolvePythonBin();
const env = {
  ...process.env,
  PYTHONIOENCODING: 'utf-8',
  PYTHONUTF8: '1'
};

const renderArgs = [
  '-m',
  'rendercv',
  'render',
  './resume/cv.yaml',
  '--dont-generate-markdown',
  '--dont-generate-html',
  '--dont-generate-png',
  '--output-folder',
  OUTPUT_FOLDER,
  '--pdf-path',
  RENDERCV_PDF_PATH
];

const render = spawnSync(pythonBin, renderArgs, {
  env,
  stdio: 'inherit',
  shell: process.platform === 'win32' && !path.isAbsolute(pythonBin) && !pythonBin.includes(path.sep)
});

if (render.status !== 0) {
  process.exit(render.status ?? 1);
}

const hash = spawnSync(process.execPath, ['./resume/scripts/hash-resume.mjs'], {
  env,
  stdio: 'inherit'
});

process.exit(hash.status ?? 1);
