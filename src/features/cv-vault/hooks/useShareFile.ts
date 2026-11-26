import { useCallback, useEffect, useState } from 'react';

import { downloadFile, downloadFromUrl } from '@/utils/download-file';
import { fetchPdfFile, shareOrDownload, type ShareMessage } from '../services/share-file';

export type ShareFileStatus = 'preparing' | 'ready' | 'failed';

interface UseShareFileOptions {
  /** Same-origin URL of the PDF. */
  href: string;
  /** Name the recipient sees (and the name used if it ends up downloaded). */
  filename: string;
  message: ShareMessage;
}

/**
 * Prefetches the PDF so the click can call `navigator.share()` right away (browsers reject it if
 * any async work happens after the click). `share` falls back to a download when the platform
 * cannot share files or the prefetch failed.
 */
export function useShareFile({ href, filename, message }: UseShareFileOptions) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<ShareFileStatus>('preparing');

  useEffect(() => {
    const controller = new AbortController();
    setStatus('preparing');

    fetchPdfFile(href, filename, { signal: controller.signal })
      .then((fetched) => {
        setFile(fetched);
        setStatus('ready');
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.warn(
          JSON.stringify({
            event: 'cv_vault.share_prefetch_failed',
            href,
            detail: error instanceof Error ? error.message : String(error)
          })
        );
        setStatus('failed');
      });

    return () => controller.abort();
  }, [href, filename]);

  const share = useCallback(() => {
    void shareOrDownload({
      file,
      message,
      platform: navigator,
      download: (ready) => (ready ? downloadFile(ready) : downloadFromUrl(href, filename))
    });
  }, [file, message, href, filename]);

  return { status, share };
}
