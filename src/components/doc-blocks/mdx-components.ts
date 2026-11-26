import Architecture from './Architecture.astro';
import Flow from './Flow.astro';
import FolderTree from './FolderTree.astro';
import MetricGrid from './MetricGrid.astro';
import StackGrid from './StackGrid.astro';

/**
 * Design-system blocks exposed to project MDX docs without per-file imports.
 * Pass to `<Content components={DOC_BLOCK_COMPONENTS} />`.
 *
 * Each entry is an Astro wrapper that validates props with Zod and renders a React island
 * with `client:visible` (React components cannot hydrate directly from the MDX `components`
 * map). Catalog and props: docs/design-system/doc-blocks.md.
 */
export const DOC_BLOCK_COMPONENTS = {
  Architecture,
  Flow,
  FolderTree,
  StackGrid,
  MetricGrid
};
