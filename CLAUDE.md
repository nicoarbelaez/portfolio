# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

Gestor de paquetes: **pnpm** (existe `pnpm-lock.yaml`).

- `pnpm dev` — servidor de desarrollo en `localhost:4321`.
- `pnpm build` — build de producción a `./dist/`.
- `pnpm preview` — sirve el build local.
- `pnpm format` — Prettier sobre `**/*.{js,jsx,ts,tsx,json,astro}` (plugins: `prettier-plugin-astro`, `prettier-plugin-tailwindcss`).
- `pnpm astro check` — type-check de Astro/TS (no hay script propio; usa `pnpm astro ...` para cualquier subcomando del CLI).
- No hay suite de tests configurada.

PDF del CV: se genera con **rendercv** (Python, `requirements.txt`). Se ejecuta vía GitHub Actions (`.github/workflows/generate-resume.yml`) cuando cambia `rendercv.yaml` y commitea `public/resume.pdf`. Local:
`python -m rendercv render rendercv.yaml --pdf-path ./public/resume.pdf`

Variables de entorno (`.env.example`): `GITHUB_TOKEN` requerido para `src/api/github/repository.ts`.

## Arquitectura

Sitio estático en **Astro 6** con islas **React 19** (`@astrojs/react` v5), estilos **Tailwind v4** vía plugin Vite (`@tailwindcss/vite`, sin `tailwind.config`; tema/animaciones definidos con `@theme` en `src/styles/global.css`). Deploy a **Vercel**; cabeceras CSP/seguridad en `vercel.json`.

### i18n

Configurado en `astro.config.mjs`:

- Locales: `en` (default, sin prefijo) y `es` (bajo `/es/`).
- `prefixDefaultLocale: false` + `redirectToDefaultLocale: true`.
- Helpers en `src/i18n/`: `getCurrentLang(Astro.currentLocale)` y `useTranslations(lang)` devuelven `t(key)` que lee de `labels[lang]` en `src/i18n/ui.ts`.
- Las claves se tipan a partir de `baseEs` (es es la fuente de verdad de las claves; en debe replicarlas).
- Strings soportan placeholders `%nombre%` resueltos por `src/utils/placeholders.ts`.

### Content Collections (`src/content.config.ts`)

Tres colecciones usando el **glob loader** (Astro 6 ya no soporta `type: 'content' | 'data'`). División por idioma por **carpeta dentro de la colección**.

- `projects` (markdown en `src/content/projects/{en,es}/<slug>.md`): `title`, `description`, `meta` (referencia a `projects-meta`).
- `projects-meta` (JSON en `src/content/projects-meta/<slug>.json`): metadata compartida entre idiomas — `stack`, `repo_url`, `demo_url`, `screenshot`, `priority`, `show_repo`, `tags` (de `PROJECT_TAGS`), `date` (string `YYYY-MM-DD` transformado a `Date`).
- `experience` (markdown en `src/content/experience/{en,es}/<file>.md`).

**Importante**: todos los loaders usan un `generateId` custom que sólo strip-ea la extensión (`entry.replace(/\.[^./\\]+$/, '')`). Sin esto, el `generateId` por defecto del glob loader slugifica los nombres y rompe ids con puntos (p. ej. `socket.io-chat` → `socketio-chat`), desincronizando las referencias `meta` con los archivos de `projects-meta`.

`src/utils/projects.ts` orquesta el filtrado por prefijo de id (`en/`, `es/`), limpia el slug (a partir de `project.id`, ya que Astro 6 removió la propiedad `slug`) y hace `getEntry('projects-meta', ...)` para fusionar metadata. Usa `getProjectsByLanguage(lang)` siempre que necesites el listado mezclado.

Importante: `src/pages/projects/[id].astro` genera rutas estáticas **sólo desde `en`** (`getProjectsByLanguage('en')`) — las páginas de proyecto no existen bajo `/es/projects/`; la versión `es` del markdown se renderiza dentro de la misma página cuando el usuario está navegando en español (el router toma `Astro.currentLocale`). Si añades soporte real para `/es/projects/<id>`, hay que extender `getStaticPaths`.

### Patrón general/técnico en proyectos

Cada `projects/<lang>/<slug>.md` puede dividir su contenido en dos pestañas insertando un encabezado literal `## separator` en el cuerpo. `PageProject.astro` parte el HTML renderizado por `<h2 id="separator">separator</h2>` y lo entrega al componente `ProjectContentTab` (slots `general` y `technical`). Si una mitad queda vacía, su pestaña se marca `disabled` automáticamente.

### Tags de proyectos

`src/types/project-tags.ts` define el orden canónico (`production | projects | practices`) y añade `other`/`all` como pseudo-tags. Las claves de traducción de pestañas se derivan con `getTabTranslationKey(tag)` → `tabs.<tag>` (las claves correspondientes deben existir en `src/i18n/ui.ts`).

### Aliases de imports (`tsconfig.json`)

- `@/*` → `src/*`
- `@tabs/*` → `src/components/ui/tabs/*`
- `@icons/*` → `src/icons/*`

JSX configurado con `jsxImportSource: "react"`. Extiende `astro/tsconfigs/strict`. En componentes `.tsx` usa `className` (React); en `.astro`, Astro auto-traduce `class` → `className` al renderizar islas React, así que `class` sigue siendo válido dentro de archivos `.astro`.

### API GitHub

`src/api/handler.ts` expone `apiHandler<T>` (fetch + `APIError`). `src/api/github/repository.ts` consume `https://api.github.com/repos/{owner}/{repo}` con `Bearer ${GITHUB_TOKEN}`. La CSP en `vercel.json` ya autoriza `api.github.com`, `avatars.githubusercontent.com` y `trainerelitez-defi-api.vercel.app` — si añades dominios externos hay que actualizar la cabecera ahí.

### Otros

- `src/layouts/Layout.astro` — meta tags Open Graph/Twitter, JSON-LD Person, `link rel="alternate" hreflang` para ambos locales, y `<ClientRouter />` (Astro view transitions activadas globalmente).
- Redirects en `astro.config.mjs`: `/linkedin`, `/github`, `/platzi` apuntan a `LINKS` (`src/constants/link.ts`).
