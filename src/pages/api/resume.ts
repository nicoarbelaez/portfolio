import type { APIRoute } from 'astro';

import { readFileSync, existsSync } from 'node:fs';

import { join } from 'node:path';

import { HTTP_STATUS } from '@/constants/http';
import { RESUME_CACHE_CONTROL, RESUME_FILENAME } from '@/constants/resume';
import { pdfResponse } from '@/utils/pdf-response';

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
    return new Response(
      'Resume version metadata not found. Run `pnpm generate:resume` or `node ./resume/scripts/hash-resume.mjs` after rendering the PDF.',
      { status: HTTP_STATUS.NOT_FOUND }
    );
  }

  const version = JSON.parse(readFileSync(versionFile, 'utf8')) as ResumeVersion;

  const pdfPath = join(resumeDir, version.filename);

  if (!existsSync(pdfPath)) {
    return new Response('Resume PDF not found.', {
      status: HTTP_STATUS.NOT_FOUND
    });
  }

  return pdfResponse({
    request,
    hash: version.hash,
    filename: RESUME_FILENAME,
    lastModified: new Date(version.generatedAt),
    cacheControl: RESUME_CACHE_CONTROL,
    readBody: () => readFileSync(pdfPath)
  });
};
