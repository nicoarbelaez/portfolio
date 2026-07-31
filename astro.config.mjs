// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';
import { LINKS } from './src/constants/link';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  site: 'https://arbelaeznicolas.dev',
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
    react()
  ]
});
