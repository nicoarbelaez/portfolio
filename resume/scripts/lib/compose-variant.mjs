/**
 * Compose a renderable RenderCV document from the canonical base and a variant's `cv` overrides.
 *
 * Rules (single source of truth, so nothing in the base is ever copied into a variant):
 * - Scalar/list fields of `cv` in the variant replace the base's; the rest is inherited.
 * - `null` removes an inherited field or section.
 * - `cv.sections`: sections listed by the variant come first, in the variant's order and with the
 *   variant's content; sections it does not list are inherited after them, in base order.
 * - `settings` takes the variant's overrides (only `bold_keywords`); `design` and `locale` are always
 *   the base's.
 *
 * @param {{ cv: Record<string, unknown> } & Record<string, unknown>} base parsed `resume/cv.yaml`
 * @param {{ cv: Record<string, unknown>, settings?: Record<string, unknown> }} variant
 * @returns {Record<string, unknown>} document ready to be stringified for RenderCV
 */
export function composeVariant(base, { cv: variantCv, settings: variantSettings }) {
  const { sections: baseSections = {}, ...baseFields } = base.cv;
  const { sections: variantSections = {}, ...variantFields } = variantCv;

  return {
    ...base,
    settings: { ...base.settings, ...variantSettings },
    cv: {
      ...dropNulls({ ...baseFields, ...variantFields }),
      sections: dropNulls(orderSections(baseSections, variantSections))
    }
  };
}

function orderSections(baseSections, variantSections) {
  const inherited = Object.fromEntries(
    Object.entries(baseSections).filter(([name]) => !(name in variantSections))
  );
  return { ...variantSections, ...inherited };
}

function dropNulls(record) {
  return Object.fromEntries(Object.entries(record).filter(([, value]) => value !== null));
}
