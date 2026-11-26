import { spawnSync } from 'node:child_process';

import { RENDERCV_PDF_PATH, RESUME_YAML } from '../constants.mjs';
import { renderCv } from './lib/render.mjs';

const rootDir = process.cwd();

const renderStatus = renderCv({
  rootDir,
  yamlPath: `./${RESUME_YAML}`,
  pdfPath: RENDERCV_PDF_PATH
});

if (renderStatus !== 0) {
  process.exit(renderStatus);
}

const hash = spawnSync(process.execPath, ['./resume/scripts/hash-resume.mjs'], {
  stdio: 'inherit'
});

process.exit(hash.status ?? 1);
