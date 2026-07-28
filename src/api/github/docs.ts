import { APIError } from '@/api/handler';
import { githubFetch } from '@/api/github/client';
import type { LocaleKey } from '@/i18n/ui';

/** Doc kinds mirrored under `docs/<kind>/` in each project repo. */
export type RepoDocKind = 'readme' | 'technical' | (string & {});

/**
 * Path convention (Spanish = default / no locale suffix):
 *
 * - Root: `README.md` (always Spanish source of truth for overview)
 * - Localized overview: `docs/readme/README.en.md`
 * - Technical ES: `docs/technical/technical.md`
 * - Technical EN: `docs/technical/technical.en.md`
 */
export function resolveRepoDocPath(kind: RepoDocKind, lang: LocaleKey): string {
  if (kind === 'readme') {
    return lang === 'es' ? 'README.md' : `docs/readme/README.${lang}.md`;
  }

  const base = `docs/${kind}/${kind}`;
  return lang === 'es' ? `${base}.md` : `${base}.${lang}.md`;
}

/**
 * Raw markdown for a doc kind + locale.
 * Falls back to Spanish path when the localized file is missing (404).
 */
export async function getRepoDoc(
  owner: string,
  repo: string,
  kind: RepoDocKind,
  lang: LocaleKey
): Promise<{ path: string; content: string; lang: LocaleKey }> {
  const preferred = resolveRepoDocPath(kind, lang);
  const fallback = resolveRepoDocPath(kind, 'es');

  try {
    const content = await githubFetch<string>(`/repos/${owner}/${repo}/contents/${preferred}`, {
      raw: true
    });
    return { path: preferred, content, lang };
  } catch (error) {
    if (lang === 'es' || !(error instanceof APIError) || error.status !== 404) {
      throw error;
    }

    const content = await githubFetch<string>(`/repos/${owner}/${repo}/contents/${fallback}`, {
      raw: true
    });
    return { path: fallback, content, lang: 'es' };
  }
}
