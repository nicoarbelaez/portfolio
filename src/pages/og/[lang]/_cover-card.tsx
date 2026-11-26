import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  COVER_HEIGHT,
  COVER_OG_FILE_NAME,
  COVER_WIDTH
} from '@/features/projects/constants/covers';
import { PROJECTS_CONTENT_BASE } from '@/features/projects/constants/content';

const jpegCache = new Map<string, string | null>();

/**
 * Data URI of the project's OG cover (`cover.og.jpg`, the dark cover rasterized to JPEG because
 * satori cannot decode WebP), or `null` when the project has none. Cached per process.
 */
export function getProjectOgCover(slug: string): string | null {
  if (jpegCache.has(slug)) return jpegCache.get(slug) ?? null;

  let dataUri: string | null = null;
  try {
    const bytes = readFileSync(
      join(process.cwd(), PROJECTS_CONTENT_BASE, slug, COVER_OG_FILE_NAME)
    );
    dataUri = `data:image/jpeg;base64,${bytes.toString('base64')}`;
  } catch {
    // No OG cover for this project: the route falls back to the text card.
  }
  jpegCache.set(slug, dataUri);
  return dataUri;
}

/**
 * Full-bleed OG card: the cover already carries mark, title, tagline and stack at 1200x630, so
 * nothing is overlaid and the text stays as legible as in the cover itself.
 */
export function coverCard(src: string) {
  return (
    <div style={{ display: 'flex', width: `${COVER_WIDTH}px`, height: `${COVER_HEIGHT}px` }}>
      <img src={src} width={COVER_WIDTH} height={COVER_HEIGHT} style={{ display: 'flex' }} />
    </div>
  );
}
