import { spawnSync } from 'node:child_process';

import { RENDERCV_OUTPUT_FOLDER } from '../../constants.mjs';
import { resolvePythonBin, usesShell } from './python.mjs';

const RENDER_ENV = {
  PYTHONIOENCODING: 'utf-8',
  PYTHONUTF8: '1'
};

/**
 * Render one RenderCV YAML to PDF. Single place that knows the RenderCV CLI flags,
 * shared by the public resume and every private variant.
 *
 * @param {object} options
 * @param {string} options.rootDir repository root (cwd for the spawned process)
 * @param {string} options.yamlPath YAML path, relative to `rootDir`
 * @param {string} options.pdfPath RenderCV `--pdf-path` (relative to the YAML's directory, or absolute)
 * @param {string} [options.outputFolder] scratch folder for intermediate output
 * @returns {number} process exit status (0 on success)
 */
export function renderCv({ rootDir, yamlPath, pdfPath, outputFolder = RENDERCV_OUTPUT_FOLDER }) {
  const pythonBin = resolvePythonBin(rootDir);

  const result = spawnSync(
    pythonBin,
    [
      '-m',
      'rendercv',
      'render',
      yamlPath,
      '--dont-generate-markdown',
      '--dont-generate-html',
      '--dont-generate-png',
      '--output-folder',
      outputFolder,
      '--pdf-path',
      pdfPath
    ],
    {
      cwd: rootDir,
      env: { ...process.env, ...RENDER_ENV },
      stdio: 'inherit',
      shell: usesShell(pythonBin)
    }
  );

  return result.status ?? 1;
}
