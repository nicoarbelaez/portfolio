import { z } from 'zod';

import { CONTENT_HASH_LENGTH, VARIANT_SLUG_PATTERN } from '../../constants.mjs';

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** Descriptive metadata of a variant. Only `role` and `date` are mandatory. */
export const variantMetaSchema = z.strictObject({
  role: z.string().min(1),
  date: z.string().regex(ISO_DATE_PATTERN, 'expected YYYY-MM-DD'),
  company: z.string().min(1).optional(),
  context: z.string().min(1).optional(),
  offerUrl: z.url().optional()
});

/** Per-offer ATS knob: the only `settings` field a variant may override. */
export const variantSettingsSchema = z.strictObject({
  bold_keywords: z.array(z.string().min(1))
});

/**
 * A variant file: `meta` (not rendered) + `cv`/`settings.bold_keywords` overrides on top of
 * `resume/cv.yaml`. `design` and `locale` always come from the base and cannot be overridden.
 */
export const variantDocumentSchema = z.strictObject({
  meta: variantMetaSchema,
  cv: z.record(z.string(), z.unknown()),
  settings: variantSettingsSchema.optional()
});

/**
 * One generated variant as published in `manifest.json`. Written by `generate-variants.mjs` and read
 * by the private `/cv` area, so both sides share this single definition.
 */
export const manifestEntrySchema = variantMetaSchema.extend({
  slug: z.string().regex(VARIANT_SLUG_PATTERN),
  hash: z.string().length(CONTENT_HASH_LENGTH),
  bytes: z.number().int().positive(),
  generatedAt: z.iso.datetime()
});

export const manifestSchema = z.array(manifestEntrySchema);

/**
 * @param {string} slug
 * @param {unknown} document parsed YAML
 * @returns {z.infer<typeof variantDocumentSchema>}
 * @throws {Error} with the offending slug and every schema issue
 */
export function parseVariantDocument(slug, document) {
  if (!VARIANT_SLUG_PATTERN.test(slug)) {
    throw new Error(`Variant "${slug}": file name must be lowercase kebab-case (a-z, 0-9, "-").`);
  }

  const parsed = variantDocumentSchema.safeParse(document);
  if (!parsed.success) {
    throw new Error(`Variant "${slug}" is invalid:\n${z.prettifyError(parsed.error)}`);
  }
  return parsed.data;
}
