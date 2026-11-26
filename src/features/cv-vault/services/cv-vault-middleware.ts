import { defineMiddleware } from 'astro:middleware';

import { HTTP_STATUS } from '@/constants/http';
import { SEO } from '@/constants/constants';
import { CV_VAULT_ROBOTS_HEADER } from '../constants/cv-vault';
import { isCvVaultPath } from '../utils/is-cv-vault-path';
import { type AccessVerifier, cvAccessVerifier } from './access-jwt';

/**
 * Guards the private CV area: every request must carry a valid Cloudflare Access JWT (skipped in
 * `astro dev`, where there is no Cloudflare in front), and every response is marked non-indexable.
 */
export function createCvVaultMiddleware(verify: AccessVerifier, { enforce }: { enforce: boolean }) {
  return defineMiddleware(async ({ request, url }, next) => {
    if (!isCvVaultPath(url.pathname)) return next();

    if (enforce) {
      const verdict = await verify(request);
      if (!verdict.allowed) {
        return new Response('Forbidden', {
          status: HTTP_STATUS.FORBIDDEN,
          headers: { [CV_VAULT_ROBOTS_HEADER]: SEO.ROBOTS_PRIVATE }
        });
      }
    }

    const response = await next();
    response.headers.set(CV_VAULT_ROBOTS_HEADER, SEO.ROBOTS_PRIVATE);
    return response;
  });
}

export const cvVaultMiddleware = createCvVaultMiddleware(cvAccessVerifier, {
  enforce: !import.meta.env.DEV
});
