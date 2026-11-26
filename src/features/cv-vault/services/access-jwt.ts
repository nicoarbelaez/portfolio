import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from 'jose';

import { CV_ACCESS } from '../constants/cv-vault';

export type AccessVerdict =
  | { allowed: true; email: string | undefined }
  | { allowed: false; reason: 'missing_token' | 'invalid_token' };

export interface AccessVerifierConfig {
  issuer: string;
  audience: string;
  /** Header Cloudflare Access injects with the signed identity JWT. */
  jwtHeader: string;
  /** Key resolver (remote JWKS in production, a local key set in tests). */
  keys: JWTVerifyGetKey;
}

export type AccessVerifier = (request: Request) => Promise<AccessVerdict>;

/**
 * Validates the Cloudflare Access JWT (signature, issuer, audience, expiry). Access only protects
 * traffic that goes through Cloudflare, so the origin must verify the token itself: otherwise the
 * `*.vercel.app` hostname would bypass the policy.
 */
export function createAccessVerifier(config: AccessVerifierConfig): AccessVerifier {
  return async (request) => {
    const token = request.headers.get(config.jwtHeader);
    if (!token) return { allowed: false, reason: 'missing_token' };

    try {
      const { payload } = await jwtVerify(token, config.keys, {
        issuer: config.issuer,
        audience: config.audience
      });
      return {
        allowed: true,
        email: typeof payload.email === 'string' ? payload.email : undefined
      };
    } catch (error) {
      console.warn(
        JSON.stringify({
          event: 'cv_vault.access_denied',
          reason: 'invalid_token',
          detail: error instanceof Error ? error.message : String(error)
        })
      );
      return { allowed: false, reason: 'invalid_token' };
    }
  };
}

const issuer = `https://${CV_ACCESS.TEAM_DOMAIN}`;

/** Verifier bound to the "CV Privado" Access application. */
export const cvAccessVerifier = createAccessVerifier({
  issuer,
  audience: CV_ACCESS.AUDIENCE,
  jwtHeader: CV_ACCESS.JWT_HEADER,
  keys: createRemoteJWKSet(new URL(CV_ACCESS.CERTS_PATH, issuer))
});
