import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

import { RESUME_VENV_DIR } from '../../constants.mjs';

/**
 * Prefer project `.venv` (Vercel/uv), then system python3/python.
 * @param {string} rootDir repository root
 * @returns {string} executable usable with `spawnSync`
 */
export function resolvePythonBin(rootDir) {
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
      shell: usesShell(candidate)
    });
    if (probe.status === 0) {
      return candidate;
    }
  }

  throw new Error(
    'Python not found. On Vercel, install via `uv venv` + `uv pip install -r requirements.txt`. Locally: pip/uv install RenderCV.'
  );
}

/** Bare command names on Windows must go through the shell to resolve `.exe`/`.cmd`. */
export function usesShell(pythonBin) {
  return (
    process.platform === 'win32' && !path.isAbsolute(pythonBin) && !pythonBin.includes(path.sep)
  );
}
