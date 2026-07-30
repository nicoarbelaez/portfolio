/** Canonical resume artifact paths (repo root–relative). */
export const RESUME_DIR = 'resume';
export const RESUME_YAML = `${RESUME_DIR}/cv.yaml`;
/** RenderCV `--pdf-path` is relative to the YAML directory (`resume/`). */
export const RENDERCV_PDF_PATH = './resume.pdf';
/** Absolute-from-root path where the PDF must land for hashing / API. */
export const RESUME_PDF = `${RESUME_DIR}/resume.pdf`;
export const PUBLIC_RESUME_DIR = 'public/resume';
export const RESUME_VERSION_FILE = 'version.json';
