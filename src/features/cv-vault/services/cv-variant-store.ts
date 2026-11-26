import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  manifestSchema,
  VARIANTS_MANIFEST_FILE,
  variantPdfFile
} from '../constants/cv-manifest-contract';
import type { CvVariant } from '../types/cv-variant';

export interface CvVariantStore {
  /** Variants ordered as published by the build (newest first). */
  list(): readonly CvVariant[];
  find(slug: string): CvVariant | undefined;
  readPdf(variant: CvVariant): Uint8Array<ArrayBuffer>;
}

/**
 * Read-only access to the generated variants in `directory` (`manifest.json` + `<slug>.pdf`).
 * The manifest is immutable per deployment, so it is parsed once (`cache: false` re-reads it on every
 * call, for dev servers where variants are regenerated while running). A missing manifest means
 * "no variants yet"; a malformed one throws with the file path so the build problem is diagnosable.
 */
export function createCvVariantStore(
  directory: string,
  { cache = true }: { cache?: boolean } = {}
): CvVariantStore {
  const manifestPath = join(directory, VARIANTS_MANIFEST_FILE);
  let cached: readonly CvVariant[] | undefined;

  const read = (): readonly CvVariant[] => {
    if (!existsSync(manifestPath)) return [];

    const parsed = manifestSchema.safeParse(JSON.parse(readFileSync(manifestPath, 'utf8')));
    if (!parsed.success) {
      throw new Error(`Invalid CV variants manifest at ${manifestPath}: ${parsed.error.message}`);
    }
    return parsed.data;
  };

  const load = (): readonly CvVariant[] => (cache ? (cached ??= read()) : read());

  return {
    list: load,
    find: (slug) => load().find((variant) => variant.slug === slug),
    readPdf: (variant) => readFileSync(join(directory, variantPdfFile(variant.slug)))
  };
}
