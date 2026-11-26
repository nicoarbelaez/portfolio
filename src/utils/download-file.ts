/** Object URLs are revoked after the browser has had time to start the download. */
const OBJECT_URL_REVOKE_DELAY_MS = 10_000;

/** Triggers a browser download of `url` as `filename` (the file lands in the user's Downloads). */
export function downloadFromUrl(url: string, filename: string): void {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
}

/** Downloads an in-memory file without a second network request. */
export function downloadFile(file: File): void {
  const url = URL.createObjectURL(file);
  downloadFromUrl(url, file.name);
  setTimeout(() => URL.revokeObjectURL(url), OBJECT_URL_REVOKE_DELAY_MS);
}
