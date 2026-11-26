# Doc blocks

MDX components available in every project MDX file with no imports. Props are validated with Zod (`src/components/doc-blocks/schemas/doc-block-schemas.ts`); invalid props fail the build with the block name and path.

Render with `<Content components={DOC_BLOCK_COMPONENTS} />` (`src/components/doc-blocks/mdx-components.ts`).

## How it works

Each entry in `DOC_BLOCK_COMPONENTS` is an Astro wrapper (`Architecture.astro`, ...) that validates props and renders a React island with `client:visible`. React components cannot hydrate directly from the MDX `components` map, so the wrapper is required. HTML is server-rendered (lists, `figure`) and readable without JS; animation starts after hydration, once the block is on screen.

## Architecture

System map. Layers are columns (stacked on mobile); edges are animated beams, dashed when `async`.

| Prop     | Type                                                     |
| -------- | -------------------------------------------------------- |
| `layers` | `{ id, label, nodes: { id, label, kind, detail? }[] }[]` |
| `edges`  | `{ from, to, label?, async? }[]` (ids must exist)        |

`kind`: `client | channel | service | worker | ai | data | external | infra`.

```mdx
<Architecture
  layers={[
    { id: 'in', label: 'Clients', nodes: [{ id: 'chat', label: 'Chat', kind: 'channel' }] },
    { id: 'core', label: 'Core', nodes: [{ id: 'api', label: 'API', kind: 'service' }] }
  ]}
  edges={[{ from: 'chat', to: 'api', label: 'messages', async: true }]}
/>
```

Do: 2-4 layers, one-word labels, `detail` for tech. Don't: more than ~10 nodes, edges to everything.

## Flow

Numbered interaction sequence, revealed in order.

| Prop    | Type                                                                         |
| ------- | ---------------------------------------------------------------------------- |
| `steps` | `{ actor, action, detail?, kind?: 'user' \| 'system' \| 'ai' \| 'human' }[]` |

```mdx
<Flow
  steps={[
    { actor: 'Customer', action: 'Sends an order', kind: 'user' },
    { actor: 'Agent', action: 'Drafts the order', kind: 'ai', detail: 'Calls catalog tool' }
  ]}
/>
```

Do: 4-7 steps, one verb each. Don't: put paragraphs in `detail`.

## FolderTree

| Prop   | Type                                                                         |
| ------ | ---------------------------------------------------------------------------- |
| `tree` | indented string; `#` starts a description; trailing `/` or children = folder |

```mdx
<FolderTree
  tree={`apps/
  api/ # NestJS API
  web/ # Astro front end`}
/>
```

Do: two-space indent, show the top 2-3 levels. Don't: list every file.

## StackGrid

| Prop    | Type                                                                                                    |
| ------- | ------------------------------------------------------------------------------------------------------- |
| `items` | `{ name, category: frontend\|backend\|data\|ai\|infra\|testing\|tooling, version? }[]` (= `meta.stack`) |

```mdx
<StackGrid items={[{ name: 'Astro', category: 'frontend', version: '7' }]} />
```

Do: exact names and versions. Don't: add technologies without evidence.

## MetricGrid

Number ticker on view. Values like `+490`, `69%`, `$29.974.400` keep prefix, suffix and separators.

| Prop      | Type                           |
| --------- | ------------------------------ |
| `metrics` | `{ value, label, context? }[]` |

```mdx
<MetricGrid metrics={[{ value: '69%', label: 'Replies sent by AI', context: 'Jul-Nov 2026' }]} />
```

Do: real, sourced numbers. Don't: invent or round up.
