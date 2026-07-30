import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import { parseMarkdown } from '@/features/projects/services/markdown/parse';
import { markdownAstToHast } from '@/features/projects/services/markdown/rehype';
import { highlightHast } from '@/features/projects/services/markdown/highlight';

/**
 * Scalable markdown → safe HTML pipeline:
 * remark-parse + GFM → rehype + sanitize → pretty-code → stringify.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const mdast = await parseMarkdown(markdown);
  const hast = await markdownAstToHast(mdast);
  const highlighted = await highlightHast(hast);

  const file = unified().use(rehypeStringify).stringify(highlighted);
  return String(file);
}
