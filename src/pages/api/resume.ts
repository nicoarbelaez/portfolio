import type { APIRoute } from 'astro';

import { readFileSync, existsSync } from 'node:fs';

import { join } from 'node:path';

export const prerender = false;

interface ResumeVersion {
  filename: string;
  hash: string;
  generatedAt: string;
}

export const GET: APIRoute = async ({ request }) => {
  const resumeDir = join(process.cwd(), 'public', 'resume');

  const versionFile = join(resumeDir, 'version.json');

  if (!existsSync(versionFile)) {
    return new Response('Resume version metadata not found.', {
      status: 404
    });
  }

  const version = JSON.parse(readFileSync(versionFile, 'utf8')) as ResumeVersion;

  const pdfPath = join(resumeDir, version.filename);

  if (!existsSync(pdfPath)) {
    return new Response('Resume PDF not found.', {
      status: 404
    });
  }

  const etag = `"${version.hash}"`;

  const ifNoneMatch = request.headers.get('If-None-Match');

  if (ifNoneMatch === etag) {
    return new Response(null, {
      status: 304,
      headers: {
        ETag: etag,
        'Cache-Control': 'public, no-cache, must-revalidate'
      }
    });
  }

  const pdfBuffer = readFileSync(pdfPath);

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',

      'Content-Disposition': 'inline; filename="Nicolas-Arbelaez-Resume.pdf"',

      'Cache-Control': 'public, no-cache, must-revalidate',

      ETag: etag,

      'Last-Modified': new Date(version.generatedAt).toUTCString()
    }
  });
};
