// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';
import { LINKS } from './src/constants/link';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// Production always uses the custom domain; previews fall back to the
// Vercel-assigned deployment URL so absolute OG/canonical URLs resolve
// instead of pointing at a path that only exists on production.
const site =
  process.env.VERCEL_ENV === 'production'
    ? 'https://arbelaeznicolas.dev'
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://arbelaeznicolas.dev';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  site,
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

  integrations: [sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: {
        en: 'en',
        es: 'es'
      }
    }
  }), react()]
});