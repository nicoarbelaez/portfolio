import type { LocaleKey } from '@/i18n/ui';

/**
 * Astro to React/Preact polyfills
 * These utilities replicate Astro functionality for client-side React/Preact components
 */

/**
 * Generate a relative locale URL
 * Polyfill for astro:i18n's getRelativeLocaleUrl
 */
export function getRelativeLocaleUrl(lang: LocaleKey, path: string): string {
  return lang === 'en' ? path : `/${lang}${path}`;
}
