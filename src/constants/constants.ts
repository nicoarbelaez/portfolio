/** Shared identity — not feature-specific (nav/i18n/etc.). */
export enum PERSONAL_INFO {
  FULL_NAME = 'Nicolas Arbelaez',
  BRAND_NAME = 'Nicolas',
  AVATAR_URL = 'https://github.com/nicoarbelaez.png'
}

export const SEO = {
  DEFAULT_OG_IMAGE: '/og-default.webp',
  /** Robots directives for pages that must never be indexed or cached by crawlers. */
  ROBOTS_PRIVATE: 'noindex, nofollow, noarchive'
} as const;
