import { APIError } from '@/api/handler';
import { githubFetch } from '@/api/github/client';
import {
  PROJECT_COVER_CANDIDATES,
  PROJECT_COVER_DARK_CANDIDATES
} from '@/features/projects/constants/sections';

type GithubContentFile = {
  download_url: string | null;
};

/**
 * Resolves which cover path *would* be used for a github-asset strategy.
 * Does not hit the network; returns the first candidate or override.
 *
 * @see PROJECT_COVER_CANDIDATES for search order
 */
export function resolveRepoCoverPath(explicitPath?: string): string {
  if (explicitPath?.trim()) {
    return explicitPath.trim();
  }

  return PROJECT_COVER_CANDIDATES[0];
}

/** Dark-theme companion candidate list (for future fetch wiring). */
export function getRepoCoverDarkCandidates(): readonly string[] {
  return PROJECT_COVER_DARK_CANDIDATES;
}

/**
 * Probes cover candidates via the GitHub Contents API (default branch) in order,
 * returning the first one that exists. 404s are expected misses, not failures.
 */
export async function fetchRepoCoverAsset(input: {
  owner: string;
  repo: string;
  path?: string;
}): Promise<{ path: string; downloadUrl: string } | null> {
  const candidates = input.path?.trim() ? [input.path.trim()] : PROJECT_COVER_CANDIDATES;

  for (const candidate of candidates) {
    try {
      const file = await githubFetch<GithubContentFile>(
        `/repos/${input.owner}/${input.repo}/contents/${candidate}`
      );
      if (file.download_url) {
        return { path: candidate, downloadUrl: file.download_url };
      }
    } catch (error) {
      if (error instanceof APIError && error.status === 404) continue;
      throw error;
    }
  }

  return null;
}
