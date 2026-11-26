// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';
import { existsSync, readdirSync } from 'node:fs';
import { LINKS } from './src/constants/link';
import { VARIANTS_GENERATED_DIR } from './resume/constants.mjs';
import { isCvVaultPath } from './src/features/cv-vault/utils/is-cv-vault-path';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

/** Generated private CVs are read at runtime by the `/cv` functions, so they must ship with them. */
const cvGeneratedFiles = existsSync(VARIANTS_GENERATED_DIR)
  ? readdirSync(VARIANTS_GENERATED_DIR).map((file) => `./${VARIANTS_GENERATED_DIR}/${file}`)
  : [];

const fontsource = fontProviders.fontsource();
/** @param {string} name @param {string} cssVariable @param {string} fallback @param {string} weights */
const variableFont = (name, cssVariable, fallback, weights) => ({
  provider: fontsource,
  name,
  cssVariable,
  weights: /** @type {[string]} */ ([weights]),
  styles: /** @type {['normal']} */ (['normal']),
  subsets: /** @type {['latin']} */ (['latin']),
  fallbacks: [fallback]
});
const FONTS = [
  variableFont('IBM Plex Sans', '--astro-font-sans', 'sans-serif', '100 700'),
  variableFont('Space Grotesk', '--astro-font-heading', 'sans-serif', '300 700'),
  variableFont('Onest', '--astro-font-body', 'sans-serif', '400 800'),
  variableFont('Geist', '--astro-font-mono', 'monospace', '100 900')
];

// https://astro.build/config
export default defineConfig({
  adapter: vercel({ includeFiles: cvGeneratedFiles }),
  site: 'https://arbelaeznicolas.dev',
  // Hover/focus prefetch makes ClientRouter navigations (projects <-> home) near-instant.
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  // Self-hosted, latin-only variable fonts with generated metric-adjusted fallbacks (no FOUT shift).
  fonts: FONTS,
  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  redirects: {
    '/linkedin': LINKS.LINKEDIN,
    '/github': LINKS.GITHUB,
    '/platzi': LINKS.PLATZI
  },

  integrations: [
    sitemap({
      filter: (page) => !isCvVaultPath(new URL(page).pathname),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es'
        }
      }
    }),
    react(),
    mdx()
  ]
});
