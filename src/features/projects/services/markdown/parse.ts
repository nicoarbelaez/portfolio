import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import type { Root } from 'mdast';

/** Parse markdown into an MDAST tree with GFM (tables, strikethrough, etc.). */
export async function parseMarkdown(markdown: string): Promise<Root> {
  const processor = unified().use(remarkParse).use(remarkGfm);
  const tree = processor.parse(markdown);
  return (await processor.run(tree)) as Root;
}
