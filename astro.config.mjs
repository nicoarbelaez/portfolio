// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';
import { LINKS } from './src/constants/link';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

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
  adapter: vercel(),
  site: 'https://arbelaeznicolas.dev',
  // Hover/focus prefetch makes ClientRouter navigations (projects <-> home) near-instant.
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  // Self-hosted, latin-only variable fonts with generated metric-adjusted fallbacks (no FOUT shift).
  fonts: FONTS,
  env: {
    schema: {
      GH_TOKEN: envField.string({ context: 'server', access: 'secret' })
    },
    validateSecrets: true
  },
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
