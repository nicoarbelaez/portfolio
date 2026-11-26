/**
 * Build ↔ runtime contract for the generated variants. Paths, slug rules and the manifest schema
 * are owned by the generator in `resume/`; this module is the only place the runtime reaches into
 * that folder, so nothing is defined twice.
 */
export {
  VARIANT_SLUG_PATTERN,
  VARIANTS_GENERATED_DIR,
  VARIANTS_MANIFEST_FILE,
  variantPdfFile
} from '../../../../resume/constants.mjs';
export { manifestSchema } from '../../../../resume/scripts/lib/variant-schema.mjs';
