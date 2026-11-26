import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { composeVariant } from './compose-variant.mjs';
import { parseVariantDocument } from './variant-schema.mjs';

const base = {
  design: { theme: 'classic' },
  locale: { language: 'spanish' },
  settings: { bold_keywords: [] },
  cv: {
    name: 'Ada',
    headline: 'Base headline',
    email: 'ada@example.com',
    sections: { perfil: ['base'], experiencia: ['e1'], educacion: ['u1'], idiomas: ['es'] }
  }
};

describe('composeVariant', () => {
  it('inherits design, locale, settings and identity untouched', () => {
    const out = composeVariant(base, { cv: { sections: { perfil: ['v'] } } });
    assert.deepEqual(out.design, base.design);
    assert.deepEqual(out.locale, base.locale);
    assert.deepEqual(out.settings, base.settings);
    assert.equal(out.cv.name, 'Ada');
    assert.equal(out.cv.email, 'ada@example.com');
  });

  it('overrides scalar fields and replaces listed sections', () => {
    const out = composeVariant(base, { cv: { headline: 'New', sections: { perfil: ['v'] } } });
    assert.equal(out.cv.headline, 'New');
    assert.deepEqual(out.cv.sections.perfil, ['v']);
  });

  it('puts listed sections first in variant order, then inherits the rest in base order', () => {
    const out = composeVariant(base, { cv: { sections: { experiencia: ['x'], perfil: ['p'] } } });
    assert.deepEqual(Object.keys(out.cv.sections), [
      'experiencia',
      'perfil',
      'educacion',
      'idiomas'
    ]);
    assert.deepEqual(out.cv.sections.educacion, ['u1']);
  });

  it('overrides settings.bold_keywords but keeps the rest of the base settings', () => {
    const withExtra = { ...base, settings: { bold_keywords: ['a'], other: 1 } };
    const out = composeVariant(withExtra, { cv: {}, settings: { bold_keywords: ['b'] } });
    assert.deepEqual(out.settings, { bold_keywords: ['b'], other: 1 });
  });

  it('removes an inherited field or section when the variant sets it to null', () => {
    const out = composeVariant(base, { cv: { headline: null, sections: { idiomas: null } } });
    assert.equal('headline' in out.cv, false);
    assert.equal('idiomas' in out.cv.sections, false);
  });

  it('does not mutate the base document', () => {
    const snapshot = structuredClone(base);
    composeVariant(base, { cv: { headline: 'New', sections: { perfil: ['v'] } } });
    assert.deepEqual(base, snapshot);
  });
});

describe('parseVariantDocument', () => {
  const valid = { meta: { role: 'Backend Engineer', date: '2026-11-26' }, cv: {} };

  it('accepts a minimal variant (only role and date are mandatory)', () => {
    assert.equal(parseVariantDocument('backend-acme', valid).meta.role, 'Backend Engineer');
  });

  it('rejects slugs that are not lowercase kebab-case', () => {
    assert.throws(() => parseVariantDocument('Backend_Acme', valid), /kebab-case/);
  });

  it('rejects unknown keys so design/locale/settings cannot be overridden', () => {
    assert.throws(() => parseVariantDocument('x', { ...valid, design: {} }), /invalid/);
    assert.throws(
      () => parseVariantDocument('x', { ...valid, meta: { ...valid.meta, foo: 1 } }),
      /invalid/
    );
  });

  it('only allows bold_keywords inside settings', () => {
    assert.throws(
      () => parseVariantDocument('x', { ...valid, settings: { bold_keywords: [], theme: 'x' } }),
      /invalid/
    );
    assert.ok(parseVariantDocument('x', { ...valid, settings: { bold_keywords: ['TS'] } }));
  });

  it('rejects malformed dates', () => {
    assert.throws(
      () => parseVariantDocument('x', { ...valid, meta: { role: 'r', date: '26/11/2026' } }),
      /YYYY-MM-DD/
    );
  });
});
