import { join } from 'node:path';

import { VARIANTS_GENERATED_DIR } from '../constants/cv-manifest-contract';
import { createCvVariantStore } from './cv-variant-store';

/** Store bound to the variants generated at build time (`resume/.generated`). */
export const cvVariantStore = createCvVariantStore(join(process.cwd(), VARIANTS_GENERATED_DIR), {
  cache: !import.meta.env.DEV
});
