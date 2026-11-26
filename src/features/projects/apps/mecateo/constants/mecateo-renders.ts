import cardReview from '@/assets/apps/mecateo/renders/nfc-card-review.webp';
import standsPack from '@/assets/apps/mecateo/renders/nfc-stands-pack.webp';
import type { LocaleKey } from '@/i18n/ui';

/** Processed product photos (webp). Astro gives each one `src`, `width` and `height`. */
export const RENDER_IMAGES = { pack: standsPack, card: cardReview } as const;

/** Number of images that must decode before the scene starts animating. */
export const RENDER_IMAGE_COUNT = Object.keys(RENDER_IMAGES).length;

/** Alt text for the meaningful photo; the flat review card is decorative. */
export const RENDER_ALT: Record<LocaleKey, string> = {
  es: 'Tres soportes de mesa Mecateo con NFC y QR: reseñas de Google en negro y en blanco, e Instagram',
  en: 'Three Mecateo table stands with NFC and QR: Google reviews in black and white, and Instagram'
};

/** Max tilt (degrees) of the whole scene toward the pointer. */
export const TILT_MAX_DEG = 9;
/** Idle tilt (degrees) when no pointer is over the scene. */
export const TILT_IDLE_Y_DEG = -6;
export const TILT_IDLE_X_DEG = 3;
export const TILT_PERSPECTIVE_PX = 900;
export const TILT_SPRING = { stiffness: 180, damping: 22, mass: 0.6 } as const;

/** Parallax travel (px) at full pointer deflection, per layer depth. */
export const PARALLAX_PX = { pack: 6, card: 16, phone: 24 } as const;

/** Tap ripples radiating from the point where the phone meets the card. */
export const RIPPLE_DELAYS_S = [0, 0.9, 1.8] as const;
export const RIPPLE_DURATION_S = 2.7;
export const RIPPLE_END_SCALE = 2.4;
export const RIPPLE_START_OPACITY = 0.5;

/** Phone silhouette "tap" bob (px) and loop length. */
export const PHONE_TAP_DURATION_S = 2.7;
export const PHONE_TAP_TRAVEL_PX = 7;
