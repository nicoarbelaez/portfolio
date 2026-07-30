import remarkRehype from 'remark-rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import type { Root as MdastRoot } from 'mdast';
import type { Root as HastRoot } from 'hast';
import { unified } from 'unified';
import { rehypeMarkdownMedia } from '@/features/projects/services/markdown/media';

/** Sanitize schema: code highlighting + markdown media figures. */
const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    'figure',
    'figcaption',
    'video',
    'source',
    'iframe'
  ],
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code ?? []), 'className'],
    pre: [...(defaultSchema.attributes?.pre ?? []), 'className'],
    span: [...(defaultSchema.attributes?.span ?? []), 'className', 'style'],
    figure: ['className'],
    figcaption: [],
    img: [...(defaultSchema.attributes?.img ?? []), 'loading', 'decoding', 'className'],
    video: ['src', 'controls', 'preload', 'poster', 'className'],
    iframe: ['src', 'title', 'loading', 'allow', 'allowFullScreen', 'className', 'style'],
    div: [...(defaultSchema.attributes?.div ?? []), 'className']
  }
} as NonNullable<Parameters<typeof rehypeSanitize>[0]>;

/** Convert MDAST → media-enriched sanitized HAST. */
export async function markdownAstToHast(tree: MdastRoot): Promise<HastRoot> {
  const processor = unified()
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeMarkdownMedia)
    .use(rehypeSanitize, sanitizeSchema);

  const hast = await processor.run(tree);
  return hast as HastRoot;
}
