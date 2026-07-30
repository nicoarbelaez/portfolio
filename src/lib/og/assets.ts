import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * OG images run through satori (no Vite/Astro asset pipeline), so brand assets are
 * read as raw bytes from disk and inlined as data URIs. Build-time only — cached
 * per process since `getStaticPaths` calls these once per (lang, slug) pair.
 */

/** Swap the file to change the OG brand mark — dimensions are auto-detected, no code change needed. */
const LOGO_SOURCE_PATH = join(process.cwd(), 'src', 'assets', 'brand', 'logo.png');
const AVATAR_SOURCE_PATH = join(process.cwd(), 'src', 'assets', 'profile', 'avatar.jpg');

/** Logo is rendered at this pixel height in the OG header; width follows its own aspect ratio. */
export const OG_LOGO_DISPLAY_HEIGHT = 44;

export interface OgImageAsset {
  dataUri: string;
  width: number;
  height: number;
}

function readPngDimensions(buffer: Buffer): { width: number; height: number } {
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

let logoAssetCache: OgImageAsset | null = null;

/** Site logo — swap `src/assets/brand/logo.png` to rebrand; aspect ratio is read from the file itself. */
export function getLogoAsset(): OgImageAsset {
  if (logoAssetCache) return logoAssetCache;

  const buffer = readFileSync(LOGO_SOURCE_PATH);
  const { width, height } = readPngDimensions(buffer);

  logoAssetCache = { dataUri: `data:image/png;base64,${buffer.toString('base64')}`, width, height };
  return logoAssetCache;
}

let avatarDataUri: string | null = null;

/**
 * Profile photo for the home OG card. Source is already a tight 256x256 crop, so it's
 * embedded as-is (no native image lib — sharp's prebuilt binaries are unreliable across
 * dev/CI/serverless platforms); satori resamples it to the display box at render time.
 */
export function getAvatarDataUri(): string {
  if (avatarDataUri) return avatarDataUri;

  const buffer = readFileSync(AVATAR_SOURCE_PATH);
  avatarDataUri = `data:image/jpeg;base64,${buffer.toString('base64')}`;
  return avatarDataUri;
}
