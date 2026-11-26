/** Project slug (content collection entry and details route). */
export const MECATEO_SLUG = 'mecateo';

/** Public NFC store, the product entry point. */
export const MECATEO_NFC_URL = 'https://mecateo.co/nfc';

/** Host of the Go redirector that resolves printed codes. */
export const MECATEO_REDIRECT_HOST = 'go.mecateo.co';
/** Illustrative code shown in the redirect tile (not a real stand). */
export const MECATEO_SAMPLE_CODE = 'demo';

/** Auto-advance interval of the redirect destination swap. */
export const REDIRECT_CYCLE_MS = 2200;
/** Interval between steps of the agent conversation. */
export const AGENT_STEP_MS = 1300;
/** Interval between rows of the NFC panel. */
export const PANEL_STEP_MS = 700;

/** Destination kinds the redirect tile cycles through (public store copy). */
export const REDIRECT_DESTINATION_KINDS = ['reviews', 'whatsapp', 'menu'] as const;
export type RedirectDestinationKind = (typeof REDIRECT_DESTINATION_KINDS)[number];

/**
 * Illustrative rows of the "Mis NFC" panel replica. The figures mirror the labeled sample
 * data on the public store page; they are not results.
 */
export const PANEL_SAMPLE_ROWS = [
  { id: 'tables', taps: 412, code: 'k3f9', trend: [2, 4, 3, 6, 5, 8, 7, 10] },
  { id: 'bar', taps: 188, code: 'm7q2', trend: [3, 2, 4, 3, 5, 4, 6, 5] },
  { id: 'entrance', taps: 96, code: 'p1x8', trend: [1, 2, 1, 3, 2, 3, 2, 4] }
] as const;

/** Sparkline geometry (viewBox units). */
export const SPARKLINE_WIDTH = 60;
export const SPARKLINE_HEIGHT = 16;

/** Brand names of the truthful integrations shown in the beam tile. */
export const INTEGRATION_NAMES = {
  wompi: 'Wompi',
  cloudflare: 'Cloudflare',
  redirector: 'Go redirector',
  whatsapp: 'WhatsApp · Kommo',
  openrouter: 'OpenRouter'
} as const;
export type IntegrationId = keyof typeof INTEGRATION_NAMES;

export const BEAM_CURVATURE = 36;
