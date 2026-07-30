import { spawnSync } from 'node:child_process';

import { RENDERCV_PDF_PATH } from '../constants.mjs';

const OUTPUT_FOLDER = './.tmp/rendercv';

/**
 * Resolve a working Python binary (Vercel/Linux prefers python3).
 */
function resolvePythonBin() {
  for (const candidate of ['python3', 'python']) {
    const probe = spawnSync(candidate, ['--version'], {
      encoding: 'utf8',
      shell: process.platform === 'win32'
    });
    if (probe.status === 0) {
      return candidate;
    }
  }
  throw new Error('Python not found. Install Python 3.12+ and RenderCV (requirements.txt).');
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
  shell: process.platform === 'win32'
});

if (render.status !== 0) {
  process.exit(render.status ?? 1);
}

const hash = spawnSync(process.execPath, ['./resume/scripts/hash-resume.mjs'], {
  env,
  stdio: 'inherit'
});

process.exit(hash.status ?? 1);
