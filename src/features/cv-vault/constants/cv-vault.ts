export const CV_VAULT_ROUTE = '/cv';
/** Download name prefix; the variant slug is appended. */
export const CV_VAULT_DOWNLOAD_PREFIX = 'Nicolas-Arbelaez-CV';
/** Per-variant PDFs are private: never stored by shared caches (Cloudflare, CDN). */
export const CV_VAULT_CACHE_CONTROL = 'private, no-cache, must-revalidate';
export const CV_VAULT_ROBOTS_HEADER = 'X-Robots-Tag';
export const CV_VAULT_DATE_LOCALE = 'es-CO';

/**
 * Cloudflare Access application "CV Privado" (path `arbelaeznicolas.dev/cv*`). Neither value is a
 * secret: both are visible in every Access login redirect. They only bind the JWT to this app.
 */
export const CV_ACCESS = {
  TEAM_DOMAIN: 'arbelaeznicolas.cloudflareaccess.com',
  AUDIENCE: 'b4c1f1ba118d7bdd4f20c9a9e712a194998f0859399ef691a1606eceebb6449a',
  JWT_HEADER: 'cf-access-jwt-assertion',
  CERTS_PATH: '/cdn-cgi/access/certs'
} as const;

export const CV_VAULT_COPY = {
  PAGE_TITLE: 'Hojas de vida',
  PAGE_DESCRIPTION: 'Variantes privadas de la hoja de vida por cargo y contexto.',
  MAIN_TITLE: 'Hoja de vida principal',
  MAIN_DESCRIPTION: 'La versión pública del sitio.',
  EMPTY: 'Aún no hay otras hojas de vida.',
  OPEN_PDF: 'Abrir PDF',
  ROLE_AT: 'en',
  OFFER: 'Ver oferta',
  SHARE: 'Compartir',
  /** Shown by the share sheet (e.g. as the email subject). */
  SHARE_TITLE: 'Mi hoja de vida',
  SHARE_TEXT: 'Esta es mi hoja de vida.'
} as const;
