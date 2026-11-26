import { useCallback, useEffect, useState } from 'react';

/**
 * Tab state synced with a query param (deep link).
 * `allowed` must be a stable reference (module constant).
 * - SSR/first render uses `fallback` (no hydration mismatch); on mount the URL value wins if it
 *   is one of `allowed`.
 * - Changing the tab rewrites the param with `history.replaceState` (no new history entry,
 *   hash and other params preserved).
 */
export function useUrlTab<T extends string>(
  param: string,
  allowed: readonly T[],
  fallback: T
): readonly [T, (next: string) => void] {
  const [tab, setTab] = useState<T>(fallback);

  useEffect(() => {
    const fromUrl = new URL(window.location.href).searchParams.get(param);
    const match = allowed.find((candidate) => candidate === fromUrl);
    if (match) setTab(match);
  }, [param, allowed]);

  const select = useCallback(
    (next: string) => {
      const match = allowed.find((candidate) => candidate === next);
      if (!match) return;
      setTab(match);

      const url = new URL(window.location.href);
      url.searchParams.set(param, match);
      window.history.replaceState(window.history.state, '', url);
    },
    [allowed, param]
  );

  return [tab, select] as const;
}
