/** Serves the latest generated PDF (`public/resume` via API). */
export const RESUME_HREF = '/api/resume';

/** Download name shown by browsers for the public resume. */
export const RESUME_FILENAME = 'Nicolas-Arbelaez-Resume.pdf';
/** Public resume may be cached by shared caches but must always be revalidated. */
export const RESUME_CACHE_CONTROL = 'public, no-cache, must-revalidate';
