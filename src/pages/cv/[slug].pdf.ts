import type { APIRoute } from 'astro';

import { HTTP_STATUS } from '@/constants/http';
import { VARIANT_SLUG_PATTERN } from '@/features/cv-vault/constants/cv-manifest-contract';
import {
  CV_VAULT_CACHE_CONTROL,
  CV_VAULT_DOWNLOAD_PREFIX
} from '@/features/cv-vault/constants/cv-vault';
import { cvVariantStore } from '@/features/cv-vault/services/default-cv-variant-store';
import { pdfResponse } from '@/utils/pdf-response';

export const prerender = false;

export const GET: APIRoute = ({ params, request }) => {
  const slug = params.slug ?? '';
  // Only slugs present in the build manifest resolve; the raw param never reaches the filesystem.
  const variant = VARIANT_SLUG_PATTERN.test(slug) ? cvVariantStore.find(slug) : undefined;

  if (!variant) {
    return new Response('Not found', { status: HTTP_STATUS.NOT_FOUND });
  }

  return pdfResponse({
    request,
    hash: variant.hash,
    filename: `${CV_VAULT_DOWNLOAD_PREFIX}-${variant.slug}.pdf`,
    lastModified: new Date(variant.generatedAt),
    cacheControl: CV_VAULT_CACHE_CONTROL,
    readBody: () => cvVariantStore.readPdf(variant)
  });
};
