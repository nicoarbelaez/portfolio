import type { z } from 'zod';

import type { manifestEntrySchema } from '../../../../resume/scripts/lib/variant-schema.mjs';

/** One generated resume variant, exactly as published in the build manifest. */
export type CvVariant = z.infer<typeof manifestEntrySchema>;
