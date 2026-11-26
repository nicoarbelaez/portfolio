/** Canonical resume artifact paths (repo root–relative). */
export const RESUME_DIR = 'resume';
export const RESUME_YAML = `${RESUME_DIR}/cv.yaml`;
/** RenderCV `--pdf-path` is relative to the YAML directory (`resume/`). */
export const RENDERCV_PDF_PATH = './resume.pdf';
/** Scratch folder RenderCV writes its intermediate output to. */
export const RENDERCV_OUTPUT_FOLDER = './.tmp/rendercv';
/** Absolute-from-root path where the PDF must land for hashing / API. */
export const RESUME_PDF = `${RESUME_DIR}/resume.pdf`;
export const PUBLIC_RESUME_DIR = 'public/resume';
export const RESUME_VERSION_FILE = 'version.json';
/** Project venv used on Vercel (uv) so RenderCV is not installed into system Python. */
export const RESUME_VENV_DIR = '.venv';

/** Private resume variants (one YAML per role/context). Never served from `public/`. */
export const VARIANTS_DIR = `${RESUME_DIR}/variants`;
export const VARIANT_FILE_EXTENSION = '.yaml';
/** Variant file names double as URL segments: lowercase kebab-case only. */
export const VARIANT_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/** Generated PDFs + manifest read at runtime by the private `/cv` area (gitignored). */
export const VARIANTS_GENERATED_DIR = `${RESUME_DIR}/.generated`;
export const VARIANTS_MANIFEST_FILE = 'manifest.json';
export const VARIANT_PDF_EXTENSION = '.pdf';
/** Composed (base + variant) YAML handed to RenderCV; scratch only. */
export const VARIANTS_SCRATCH_DIR = '.tmp/variants';
export const COMPOSED_YAML_FILE = 'cv.yaml';
/** Characters of the SHA-256 digest kept as content hash (ETag / cache key). */
export const CONTENT_HASH_LENGTH = 8;

/** PDF file name of a variant inside `VARIANTS_GENERATED_DIR`; the slug is the single identity. */
export const variantPdfFile = (slug) => `${slug}${VARIANT_PDF_EXTENSION}`;
