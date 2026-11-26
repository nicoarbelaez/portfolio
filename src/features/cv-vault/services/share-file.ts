/**
 * Share a file through the Web Share API, falling back to a download. Pure and DOM-free (the
 * platform is injected), so it is unit-testable and has no hidden dependencies.
 *
 * Browsers only allow `navigator.share()` while the click's transient activation is alive, so the
 * `File` must be fetched BEFORE the click (see `fetchPdfFile`) and `shareOrDownload` must reach
 * `share()` synchronously, with no `await` before it.
 */

const PDF_MIME_TYPE = 'application/pdf';
const ABORT_ERROR_NAME = 'AbortError';

/** The subset of `Navigator` used for sharing; absent members mean "not supported". */
export interface ShareCapabilities {
  canShare?: (data: ShareData) => boolean;
  share?: (data: ShareData) => Promise<void>;
}

export interface ShareMessage {
  title: string;
  text: string;
}

export type ShareOutcome = 'shared' | 'cancelled' | 'downloaded';

/** Downloads `fetch(href)` as a PDF `File` named `filename`; rejects on non-2xx with the status. */
export async function fetchPdfFile(
  href: string,
  filename: string,
  { signal, fetchImpl = fetch }: { signal?: AbortSignal; fetchImpl?: typeof fetch } = {}
): Promise<File> {
  const response = await fetchImpl(href, { signal });
  if (!response.ok) {
    throw new Error(`Could not fetch ${href} to share it (status ${response.status}).`);
  }
  const blob = await response.blob();
  return new File([blob], filename, { type: PDF_MIME_TYPE });
}

/** `canShare` may be called without user activation, so it can run as soon as the file is ready. */
export function canShareFile(file: File, platform: ShareCapabilities): boolean {
  return (
    typeof platform.share === 'function' &&
    typeof platform.canShare === 'function' &&
    platform.canShare({ files: [file] })
  );
}

const isAbort = (error: unknown): boolean =>
  error instanceof Error && error.name === ABORT_ERROR_NAME;

/**
 * Opens the native share sheet with the file attached and a short message; if sharing is not
 * possible (unsupported browser, file not ready, refused by the platform) it downloads instead.
 * Dismissing the share sheet is not an error and does not trigger a download.
 *
 * @param file the pre-fetched PDF, or `null` when it could not be fetched
 * @param download called when falling back; receives the file when there is one
 */
export async function shareOrDownload({
  file,
  message,
  platform,
  download
}: {
  file: File | null;
  message: ShareMessage;
  platform: ShareCapabilities;
  download: (file: File | null) => void;
}): Promise<ShareOutcome> {
  if (file && canShareFile(file, platform)) {
    try {
      // Must stay the first awaited call: anything async before it would expire the user activation.
      await platform.share?.({ files: [file], ...message });
      return 'shared';
    } catch (error) {
      if (isAbort(error)) return 'cancelled';
      console.warn(
        JSON.stringify({
          event: 'cv_vault.share_failed',
          detail: error instanceof Error ? error.message : String(error)
        })
      );
    }
  }

  download(file);
  return 'downloaded';
}
