import {
  PROJECT_COVER_CANDIDATES,
  PROJECT_COVER_DARK_CANDIDATES
} from '@/features/projects/constants/sections';

/**
 * Resolves which cover path *would* be used for a github-asset strategy.
 * MVP stub: does not hit the network; returns the first candidate or override.
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
 * Future: HEAD/GET contents for each candidate until one exists.
 * Returns null in MVP so UI stays on placeholders.
 */
export async function fetchRepoCoverAsset(_input: {
  owner: string;
  repo: string;
  path?: string;
}): Promise<{ path: string; downloadUrl: string } | null> {
  return null;
}
