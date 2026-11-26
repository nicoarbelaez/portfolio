import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { canShareFile, fetchPdfFile, shareOrDownload } from './share-file.ts';

const message = { title: 'Mi hoja de vida', text: 'Esta es mi hoja de vida.' };
const pdf = () => new File(['%PDF-'], 'cv.pdf', { type: 'application/pdf' });

function recorder() {
  const calls: { shared: ShareData[]; downloads: (File | null)[] } = { shared: [], downloads: [] };
  return {
    calls,
    download: (file: File | null) => calls.downloads.push(file),
    platform: (overrides: { canShare?: boolean; reject?: Error } = {}) => ({
      canShare: () => overrides.canShare ?? true,
      share: async (data: ShareData) => {
        calls.shared.push(data);
        if (overrides.reject) throw overrides.reject;
      }
    })
  };
}

describe('canShareFile', () => {
  it('is false when the platform has no Web Share API at all (e.g. desktop Firefox)', () => {
    assert.equal(canShareFile(pdf(), {}), false);
  });
  it('is false when share exists but canShare does not (text-only implementations)', () => {
    assert.equal(canShareFile(pdf(), { share: async () => {} }), false);
  });
  it('asks the platform about the files only', () => {
    let received: ShareData | undefined;
    canShareFile(pdf(), {
      share: async () => {},
      canShare: (data) => ((received = data), true)
    });
    assert.deepEqual(Object.keys(received ?? {}), ['files']);
  });
});

describe('shareOrDownload', () => {
  it('shares the file with title and text, and does not download', async () => {
    const r = recorder();
    const file = pdf();
    const outcome = await shareOrDownload({
      file,
      message,
      platform: r.platform(),
      download: r.download
    });
    assert.equal(outcome, 'shared');
    assert.deepEqual(r.calls.shared, [{ files: [file], ...message }]);
    assert.equal(r.calls.downloads.length, 0);
  });

  it('reaches share() synchronously, before any microtask (keeps the click activation alive)', () => {
    const r = recorder();
    void shareOrDownload({ file: pdf(), message, platform: r.platform(), download: r.download });
    assert.equal(r.calls.shared.length, 1);
  });

  it('downloads when the platform cannot share files', async () => {
    const r = recorder();
    const file = pdf();
    const outcome = await shareOrDownload({
      file,
      message,
      platform: r.platform({ canShare: false }),
      download: r.download
    });
    assert.equal(outcome, 'downloaded');
    assert.deepEqual(r.calls.downloads, [file]);
    assert.equal(r.calls.shared.length, 0);
  });

  it('downloads (with null) when the file could not be prefetched', async () => {
    const r = recorder();
    assert.equal(
      await shareOrDownload({ file: null, message, platform: r.platform(), download: r.download }),
      'downloaded'
    );
    assert.deepEqual(r.calls.downloads, [null]);
  });

  it('treats dismissing the share sheet as cancelled: no download, no error', async () => {
    const r = recorder();
    const abort = Object.assign(new Error('dismissed'), { name: 'AbortError' });
    const outcome = await shareOrDownload({
      file: pdf(),
      message,
      platform: r.platform({ reject: abort }),
      download: r.download
    });
    assert.equal(outcome, 'cancelled');
    assert.equal(r.calls.downloads.length, 0);
  });

  it('falls back to download when the platform refuses (NotAllowedError)', async () => {
    const r = recorder();
    const file = pdf();
    const refused = Object.assign(new Error('refused'), { name: 'NotAllowedError' });
    const original = console.warn;
    console.warn = () => {};
    try {
      const outcome = await shareOrDownload({
        file,
        message,
        platform: r.platform({ reject: refused }),
        download: r.download
      });
      assert.equal(outcome, 'downloaded');
      assert.deepEqual(r.calls.downloads, [file]);
    } finally {
      console.warn = original;
    }
  });
});

describe('fetchPdfFile', () => {
  it('returns a PDF File with the requested name', async () => {
    const fetchImpl = (async () => new Response('%PDF-1.7')) as typeof fetch;
    const file = await fetchPdfFile('/cv/x.pdf', 'Nicolas-Arbelaez-Resume.pdf', { fetchImpl });
    assert.equal(file.name, 'Nicolas-Arbelaez-Resume.pdf');
    assert.equal(file.type, 'application/pdf');
    assert.equal(await file.text(), '%PDF-1.7');
  });

  it('rejects with the url and status on a non-2xx response', async () => {
    const fetchImpl = (async () => new Response('nope', { status: 403 })) as typeof fetch;
    await assert.rejects(fetchPdfFile('/cv/x.pdf', 'a.pdf', { fetchImpl }), /\/cv\/x\.pdf.*403/);
  });
});
