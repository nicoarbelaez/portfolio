// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { LINKS } from './src/constants/link';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://arbelaeznicolas.dev',
  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true
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
    })
  ]
});
