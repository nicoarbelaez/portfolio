# Design system

Motion-graphics documentation system for the portfolio. Live page: `/design-system` and `/es/design-system`.

## Index

- [doc-blocks.md](./doc-blocks.md): MDX documentation blocks (`Architecture`, `Flow`, `FolderTree`, `StackGrid`, `MetricGrid`).
- [showcase-kit.md](./showcase-kit.md): tiles used by landing showcases.

## Tokens

All visuals use the CSS variables in `src/styles/global.css`; never hard-code colors.

| Group  | Tokens                                                                                       |
| ------ | -------------------------------------------------------------------------------------------- |
| Color  | `background`, `foreground`, `card`, `primary` (lime accent), `muted`, `border`, `chart-1..5` |
| Type   | `font-heading` Space Grotesk, `font-sans` IBM Plex Sans, body Onest, `font-mono` Geist       |
| Radius | `rounded-xl` for tiles and blocks, `rounded-lg` for chips                                    |
| Tile   | `bg-card border border-border/50 rounded-xl`                                                 |

Node and step kinds map to an icon and a tonal token pair in `src/components/doc-blocks/constants/node-kinds.ts`.

## Motion principles

1. **Purpose.** Animate to explain flow, hierarchy or state. Skip it for things seen constantly.
2. **Constants.** Durations and easing live in `src/components/doc-blocks/constants/doc-block-motion.ts`: ease-out `cubic-bezier(0.23, 1, 0.32, 1)`, 400 ms entrance, 60 ms stagger, 8 px travel, start scale 0.97 (never 0).
3. **In-view autoplay.** Blocks play once when visible (`useIsInView`, `once`), never on page load off-screen.
4. **Reduced motion.** `useReducedMotion` from `motion/react`: final state, no movement, no beam loop.
5. **Dark and light.** Tokens only. No per-theme branches.
6. **Performance.** Animate `transform` and `opacity`. Islands hydrate with `client:visible`. Never enable Astro `security.csp` (breaks motion inline styles).

## Recipe: add a new project

1. Create `src/content/projects/<slug>/meta.yaml` (section, order, periods, visibility, links, team, stack, cover).
2. Write `overview.es.mdx` and `overview.en.mdx`: problem, what was built, results, a `<Flow>` and a high-level `<Architecture>`.
3. Write `technical.es.mdx` and `technical.en.mdx`: architecture detail, `<FolderTree>`, `<StackGrid>`, decisions. Blocks need no imports.
4. Optional: add a landing showcase built on the showcase kit and register it in `showcase-registry.ts`.
5. Run `pnpm astro check` and `pnpm lint`.

## Project covers

Every active project has `cover.webp` (light), `cover.dark.webp` (dark) and `cover.og.jpg` (OG input) in
`src/content/projects/<slug>/`, declared in `meta.yaml` as `cover` and `coverDark`. Canvas: 1200x630, WebP
at most 90 KB. The cover is a composition, not an illustration: dotted background, project mark, title,
tagline, up to 5 stack chips (one per category) and ONE product fragment built from existing pieces (an
`ArchitectureView`, the kit's `ChatBubble`/`ToolChip`, or a public-page screenshot inside `AppFrame`). No
client data, no dates. Accent per project: `COVER_ACCENTS` in `src/features/projects/constants/covers.ts`.

Regenerate:

1. Start `pnpm dev` (port 4322 by default). The renderer exists only in dev:
   `/dev/cover/<slug>` (light) and `/dev/cover/<slug>?theme=dark`. It renders `CoverTemplate.astro`; fragments
   live in `src/pages/dev/cover/_fragments.ts` and `_ChatFragment.tsx`; real screenshots in `src/assets/covers/`.
2. Screenshot the `[data-cover-canvas]` element at viewport 1200x630 with `playwright-cli` (reduced motion on,
   so beams and bubbles are in their final state, wait ~2.5 s for hydration):
   `playwright-cli run-code --filename=shoot.js` where the script does `page.setViewportSize`,
   `page.emulateMedia({ reducedMotion: 'reduce' })`, `goto`, then `page.locator('[data-cover-canvas]').screenshot(...)`.
3. Convert with `sharp` (any throwaway script): PNG to WebP quality 82 for `cover.webp` and `cover.dark.webp`
   (lower the quality if a file passes `COVER_MAX_BYTES`), and the dark PNG to JPEG quality 86 as `cover.og.jpg`.
4. New project: add its fragment (data entry in `_fragments.ts` or a new component), its accent and mark, then
   set `cover: ./cover.webp` and `coverDark: ./cover.dark.webp` in `meta.yaml`.

Consumers: `ProjectCard.tsx` and `ProjectCover.astro` render both variants (`dark:hidden` / `hidden dark:block`,
width and height set, no layout shift); the OG route `src/pages/og/[lang]/[slug].png.ts` embeds `cover.og.jpg`
full-bleed because satori cannot decode WebP. The page head already emits `og:image` and `twitter:image`
from the OG route. Real screenshots must come from public pages only (no signed-in content).

## How documentation connects

Landing showcase (visual hook) -> detail overview (what and results) -> technical page (how it is built) -> repository docs (setup and architecture, public repos only).
