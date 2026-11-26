# Feature: projects

Project case studies for the landing (`#projects`, `#apps`) and the detail pages
(`/projects/<slug>`, `/es/projects/<slug>`). Content is local MDX; GitHub is no longer read at build time.

## Content model

```
src/content/projects/<slug>/
  meta.yaml              section, order, archived, periods, visibility, links, team, stack, cover, coverDark
  cover.webp             light cover 1200x630 (generated, see Covers)
  cover.dark.webp        dark cover
  cover.og.jpg           dark cover as JPEG, read only by the OG route
  overview.<es|en>.mdx   frontmatter (title, tagline, description, role, topics, keywords, metrics?) + body
  technical.<es|en>.mdx  frontmatter (title, description) + body
```

Schemas live in `schemas/content.ts` and are registered in `src/content.config.ts` (`projects`, `projectDocs`).
A missing `en` file falls back to `es` and shows the `missingTranslation` badge.

Reading API (`services/projects.ts`): `getActiveProjects(lang)`, `getActiveProjectSlugs()`,
`getProjectBySlug(slug, lang)`, `getProjectDoc(slug, kind, lang)`. Everything the UI consumes is a `ProjectView`.

## Add a project

1. Create `src/content/projects/<slug>/` with `meta.yaml` and the four MDX files.
2. Write the bodies with the documentation blocks (no imports): `<Architecture>`, `<Flow>`,
   `<FolderTree>`, `<StackGrid>`, `<MetricGrid>`. Reference: `docs/design-system/doc-blocks.md`.
3. Optional landing showcase: see below. Without one the project renders as a `ProjectCard`.
4. Put approved metrics in the MDX body (`<MetricGrid>`) **or** in `metrics` frontmatter, not both:
   frontmatter metrics render in the detail header panel.

## Archive a project

Set `archived: true` in its `meta.yaml`. It disappears from the landing, its detail page and OG image are not
generated, and the content stays. Remove the flag to bring it back. Currently archived: `invictus`.

## Landing

`#apps` renders first; `#projects` (intro, then tabs [client | side]) follows. Order comes from `order` inside each section.
Showcases take full width; consecutive projects without one share a card grid. If only one tab has projects the
tab bar is hidden. Dragging between tabs uses Embla (`hooks/use-tabs-carousel.ts`) and the active tab is
synchronized with `?tab=client|side` (`hooks/use-url-tab.ts`).

## Showcases

A showcase is a React component registered in `components/showcase-registry.ts` by slug. Props:
`ProjectShowcaseProps = { project: ProjectView, lang, labels }`.

- Shared kit: `showcase-kit/` (section, tile with accent, footer, node, device frames, reveal hooks).
  Docs: `docs/design-system/showcase-kit.md`.
- Client helpers that know about `ProjectView`: `clients/shared/`.
- Per client: `clients/<slug>/{<Name>Showcase.tsx, constants/copy.*.ts, tiles/*.tsx}`.
- Apps: `apps/<slug>/` (Mecateo).

Registered today: `mecateo`, `danystortas`, `defi`, `swc`.

## Covers

Each project has a cover used by `ProjectCard`, the detail header (`ProjectCover.astro`) and the OG image
(`/og/<lang>/<slug>.png`, full-bleed `cover.og.jpg`). Covers are rendered by the dev-only page
`src/pages/dev/cover/[slug].astro` (`/dev/cover/<slug>?theme=dark`) from `components/CoverTemplate.astro`,
screenshotted at 1200x630 and converted to WebP (max 90 KB). Constants: `constants/covers.ts`.
Regeneration steps: `docs/design-system/README.md#project-covers`.

## Design system

Tokens, motion rules, block catalog and the live samples page (`/design-system`, `/es/design-system`) are
documented in `docs/design-system/`.

## Rules worth remembering

- Do not enable Astro `security.csp`: the motion components apply inline styles at runtime.
- No file over 250 lines, no `any`, no barrels; UI replicas must not present illustrative numbers as results (only approved real metrics, no "sample data" badges).
- Approved real metrics and confidentiality decisions are recorded in `odd/tasks/projects-case-studies.md` (S9).
