# Showcase kit

Shared building blocks for client and app showcases on the projects landing. Code lives in `src/features/projects/showcase-kit/`. The reference implementation is `src/features/projects/apps/mecateo/`.

A showcase is a bento of **motion-graphic tiles that replicate product UI** (chat, panels, charts, flows) instead of screenshots. Everything uses design-system tokens, so light and dark need no extra code.

## Tile anatomy

```
ShowcaseTile (Magic Card spotlight, tinted by accent)
└─ article
   ├─ TileStage     content area, replicated UI + motion (flex-1)
   └─ TileFooter    icon + h4 title + one-line description
```

- The stage is decorative. Frames (`AppFrame`, `PhoneFrame`) are `aria-hidden`; the footer text is the accessible summary. Write it so it stands alone.
- The hero tile skips the footer and uses `shine` plus CTAs (see `HeroTile`).
- Illustrative figures inside replicas must be obviously sample data (badge such as "Sample data") and never read as results.

## Grid and spans

The grid is 1 column on mobile and 3 on `md+`. Rows have a **minimum** height set by the density preset (`minmax(20rem, auto)` by default) and grow with their content, so a footer is never clipped; do not add `min-h-*` to tiles.

| `span` | md+ columns | Typical use                      |
| ------ | ----------- | -------------------------------- |
| `one`  | 1           | single-idea tile                 |
| `two`  | 2           | hero, tables, wide replicas      |
| `full` | 3           | integrations beam, wide diagrams |

Compose rows that add to 3 (`two + one`, `one + two`, `full`). Mobile stacks everything; tiles get a density-based `min-h`.

## Accent rule

Per-client accents must stay inside the design system. `ShowcaseTile` takes `accent: 'primary' | 'chart-1' … 'chart-5'` (default `primary`). Do not add brand hex or oklch values to a showcase: use an accent token, or a small tonal range of tokens. For accent-colored text or fills inside tiles use token classes (`text-primary`, `bg-primary/10`, `text-chart-2`). Concrete color maps live in `showcase-kit/constants/accents.ts`; `resolveAccent()` turns an accent into `solid`, `deep`, `glow` (CSS) and `beamStart`/`beamStop` (oklch for SVG gradients, where `var()` is unreliable).

## Per-app tuning

Each showcase can take its own character without leaving the design system. Set the options once on `ShowcaseSection`; tiles, stages and footers inherit them through context (`showcase-kit/context/ShowcaseContext.tsx`). Everything is optional, so existing showcases (Mecateo) are unchanged.

| Option    | Values                                      | Effect                                                                                          |
| --------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `accent`  | `primary`, `chart-1` ... `chart-5`          | Default accent of tiles (spotlight, beams, meta tile). A tile `accent` prop still overrides it. |
| `density` | `compact`, `comfortable` (default), `roomy` | Row minimum (`17rem` / `20rem` / `23rem`), gap, stage minimum height and footer padding.        |
| `surface` | `plain` (default), `inset`                  | `inset` adds a subtle `bg-foreground/[0.035]` wash to stages for a denser, panel-like feel.     |

Current assignments: Mecateo is the reference (defaults). Danys Tortas uses `roomy` (conversational, larger phone tile). SWC uses `chart-3`, `compact`, `inset` (data panels). DeFi uses `chart-2`, `compact` (tight, sporty grid). Choose values from tokens only and check contrast in light and dark.

## Kit components

All imports are from the concrete file, no barrels: `@/features/projects/showcase-kit/components/<Name>`.

| Component         | Props                                                                                 | Notes                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `ShowcaseSection` | `headingId`, `name`, `tagline`, `logo`, `accent?`, `density?`, `surface?`, `children` | Mounts `ThemeProvider` once, `section[aria-labelledby]`, header, grid. The page owns the `h2`. |
| `ShowcaseHeader`  | `logo`, `name`, `tagline`, `headingId`                                                | Used by the section; the name is an `h3`.                                                      |
| `ShowcaseTile`    | `children`, `accent?`, `span?`, `shine?`, `className?`                                | Shell. `accent` defaults to the section accent. `shine` is for the hero only.                  |
| `TileStage`       | `children`, `stageRef?`, `className?`                                                 | Content area. Pass the ref from a ticker hook to autoplay in view.                             |
| `TileFooter`      | `icon`, `title`, `description`                                                        | Lucide icon component, `h4` title.                                                             |
| `TileNode`        | `nodeRef`, `label`, `caption?`, `size?: 'md' \| 'lg'`, `emphasized?`                  | Circular endpoint for `AnimatedBeam`. `label` is the accessible name.                          |
| `AppFrame`        | `title`, `children`, `className?`                                                     | Browser chrome for web product UI.                                                             |
| `PhoneFrame`      | `children`, `className?`                                                              | Device frame for chat/app UI; let the tile clip its bottom edge.                               |
| `ChatBubble`      | `from: 'customer' \| 'agent'`, `children`                                             | Rise + fade on mount.                                                                          |
| `ToolChip`        | `children`                                                                            | Monospace chip for tool calls and events.                                                      |

Hooks (`showcase-kit/hooks/useTileTicker.ts`): each returns `{ ref, value, reduced }`; attach `ref` to the `TileStage`.

- `useTileTicker(intervalMs)`: raw tick counter, runs only while in view.
- `useRevealCount(count, intervalMs)`: steps visible, `0..count`; holds the full state a few ticks, then restarts. Reduced motion returns `count`.
- `useCycleIndex(count, intervalMs)`: index in `0..count-1`. Reduced motion returns `0`.

The kit takes plain props and never imports the project type. A client showcase still receives `ProjectShowcaseProps` (`lang`, plus whatever subset it uses) from the registry.

Reuse the existing primitives in `src/components/ui/`: `animated-beam`, `animated-list`, `marquee`, `shine-border`, `dot-pattern`, `smooth-qr`, `magic-card`. If a tile needs a new generic primitive, add it there, not in the kit.

## Add a client showcase

```
src/features/projects/clients/<slug>/
  <Name>Showcase.tsx          # composes ShowcaseSection + tiles, registers in the registry
  constants/
    config.ts                 # slug, URLs, timings, sample data (language-neutral)
    copy.types.ts             # copy type
    copy.es.ts  copy.en.ts    # localized copy
    copy.ts                   # getCopy(lang)
  tiles/
    <Idea>Tile.tsx            # one tile per idea, each file under 250 lines
```

1. Pick tiles from the product's real UI: conversation, dashboard, flow, integrations. Each tile shows one idea.
2. Build each tile as `ShowcaseTile` + `TileStage` + `TileFooter`, using frames and chips to replicate the UI.
3. Compose them in `<Name>Showcase.tsx` inside `ShowcaseSection`, rows adding to 3 columns.
4. Register the component in `src/features/projects/components/showcase-registry.ts`.
5. Keep copy factual: no unproven claims, no promises, no customer PII.

### Shared client helpers

Client showcases share a few helpers in `src/features/projects/clients/shared/` (not part of the kit, they know about `ProjectView`): `ClientMetaTile` (period, description, topics, credited team, CTAs as the first tile), `ClientMark` (token-based logo plate), `SampleBadge` ("Sample data" label), `BeamDiagramTile` (nodes in columns plus `AnimatedBeam` edges; `kind: 'pill'` nodes for long lists), `useRevealOnView` (one-shot in-view reveal for bars, rings and line draws), `useStreamSequence` (question, tool chips, streamed answer) and `format`/`chart` utils. Reference implementations: `clients/danystortas`, `clients/defi`, `clients/swc`.

## Motion rules for tiles

- Autoplay only while the tile is in view (`useInView` inside the hooks; stop when it leaves).
- Respect reduced motion with `useReducedMotion` from `motion/react`. Reduced shows the complete final state, with no looping or movement; opacity and color changes are fine.
- Animate `transform` and `opacity` only. A small `blur` (≤ 4px) is allowed to bridge a crossfade.
- Enter with `EASE_OUT` (`cubic-bezier(0.23, 1, 0.32, 1)`), 240-280ms; never start from `scale(0)` (use 0.92+ with opacity). Exit faster than enter.
- Stagger 30-80ms; sequences advance every 0.7-1.5s and hold their final state before restarting.
- No `transition: all`. Durations, intervals and offsets live in `showcase-kit/constants/showcase-motion.ts` or the showcase's own `config.ts`, never inline.
- Infinite loops (ripples, beams) must be gated by in-view and reduced motion.
- Never enable Astro `security.csp`: motion writes inline styles.
