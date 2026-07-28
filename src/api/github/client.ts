import { GH_TOKEN } from 'astro:env/server';
import { APIError } from '@/api/handler';

const GITHUB_API_BASE = 'https://api.github.com';

type GithubFetchInit = Omit<RequestInit, 'headers'> & {
  headers?: HeadersInit;
  /** When true, return response text instead of JSON (e.g. raw README). */
  raw?: boolean;
};

/**
 * Thin GitHub REST client. Pass only the resource path (with leading `/`).
 *
 * @example
 * await githubFetch<Repo>('/repos/owner/repo')
 * await githubFetch('/repos/owner/repo/readme', { raw: true })
 */
export async function githubFetch<T = unknown>(
  resource: `/${string}`,
  init: GithubFetchInit = {}
): Promise<T> {
  const { raw = false, headers: initHeaders, ...rest } = init;

  const headers = new Headers(initHeaders);
  headers.set('Authorization', `Bearer ${GH_TOKEN}`);
  headers.set('X-GitHub-Api-Version', '2022-11-28');

  if (raw) {
    headers.set('Accept', 'application/vnd.github.raw+json');
  } else if (!headers.has('Accept')) {
    headers.set('Accept', 'application/vnd.github+json');
  }

  const response = await fetch(`${GITHUB_API_BASE}${resource}`, {
    ...rest,
    headers
  });

  if (!response.ok) {
    throw new APIError(
      response.status,
      `GitHub API ${response.status} ${response.statusText} (${resource})`
    );
  }

  if (raw) {
    return (await response.text()) as T;
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
