import rehypePrettyCode from 'rehype-pretty-code';
import type { Root as HastRoot } from 'hast';
import { unified } from 'unified';

/** Apply Shiki highlighting via rehype-pretty-code. */
export async function highlightHast(tree: HastRoot): Promise<HastRoot> {
  const processor = unified().use(rehypePrettyCode, {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    keepBackground: false
  });

  const result = await processor.run(tree);
  return result as HastRoot;
}
