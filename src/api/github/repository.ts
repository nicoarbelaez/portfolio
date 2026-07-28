import { githubFetch } from '@/api/github/client';
import type { GithubRepoMeta, GithubRepository } from '@/types/github';

/** First ATX H1 (`# Title`), ignoring YAML front matter if present. */
export function extractMarkdownTitle(markdown: string): string | null {
  const withoutFrontmatter = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const match = withoutFrontmatter.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() || null;
}

/**
 * Fetches repo metadata + root README in parallel.
 * Returns name, title, description, website, topics, and README body.
 */
export async function getRepository(owner: string, repo: string): Promise<GithubRepository> {
  const [meta, readme] = await Promise.all([
    githubFetch<GithubRepoMeta>(`/repos/${owner}/${repo}`),
    githubFetch<string>(`/repos/${owner}/${repo}/readme`, { raw: true }).catch(() => null)
  ]);

  return {
    name: meta.name,
    title: (readme && extractMarkdownTitle(readme)) || meta.name,
    description: meta.description,
    website: meta.homepage || null,
    topics: meta.topics ?? [],
    htmlUrl: meta.html_url,
    defaultBranch: meta.default_branch,
    readme
  };
}
