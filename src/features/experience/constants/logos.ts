/** Stable keys for company logos in `src/assets/brands`. */
export const EXPERIENCE_LOGO_KEYS = ['davivienda'] as const;

export type ExperienceLogoKey = (typeof EXPERIENCE_LOGO_KEYS)[number];

export const EXPERIENCE_LOGO_KEY_SET = new Set<string>(EXPERIENCE_LOGO_KEYS);
