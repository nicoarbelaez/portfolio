import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { sectionHref } from './section-href.ts';

describe('sectionHref', () => {
  it('anchors to the default-locale home (no prefix)', () => {
    assert.equal(sectionHref('/', '#about'), '/#about');
  });

  it('anchors to the prefixed home of another locale', () => {
    assert.equal(sectionHref('/es', '#contact'), '/es#contact');
  });
});
