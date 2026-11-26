import { HTTP_STATUS } from '@/constants/http';

const PDF_CONTENT_TYPE = 'application/pdf';

export interface PdfResponseOptions {
  request: Request;
  /** Content hash; wrapped in quotes to form a strong ETag. */
  hash: string;
  /** Name shown by the browser (served `inline`). */
  filename: string;
  lastModified: Date;
  cacheControl: string;
  /** Called only when the client does not already hold the current version. */
  readBody: () => Uint8Array<ArrayBuffer>;
  /** Extra headers merged last (e.g. `X-Robots-Tag`). */
  headers?: Record<string, string>;
}

/**
 * Conditional PDF response shared by every PDF endpoint: honours `If-None-Match` with a 304
 * (skipping the file read) and otherwise streams the PDF inline with ETag/Last-Modified.
 */
export function pdfResponse({
  request,
  hash,
  filename,
  lastModified,
  cacheControl,
  readBody,
  headers = {}
}: PdfResponseOptions): Response {
  const etag = `"${hash}"`;
  const validators = { ETag: etag, 'Cache-Control': cacheControl, ...headers };

  if (request.headers.get('If-None-Match') === etag) {
    return new Response(null, { status: HTTP_STATUS.NOT_MODIFIED, headers: validators });
  }

  return new Response(readBody(), {
    status: HTTP_STATUS.OK,
    headers: {
      ...validators,
      'Content-Type': PDF_CONTENT_TYPE,
      'Content-Disposition': `inline; filename="${filename}"`,
      'Last-Modified': lastModified.toUTCString()
    }
  });
}
