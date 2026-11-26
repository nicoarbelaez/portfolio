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

## How documentation connects

Landing showcase (visual hook) -> detail overview (what and results) -> technical page (how it is built) -> repository docs (setup and architecture, public repos only).
