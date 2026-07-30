import { OG_LOGO_DISPLAY_HEIGHT, type OgImageAsset } from '@/lib/og/assets';

/**
 * Satori-compatible OG image template (@vercel/og).
 * Flexbox-only subset of CSS — no Tailwind, no CSS vars, no oklch: satori can't parse those.
 * Colors below are hex approximations of the site's dark-theme tokens (see src/styles/global.css).
 */

/** Display size for the home-page avatar and project cover panels. */
export const OG_AVATAR_DISPLAY_SIZE = 280;
const OG_COVER_DISPLAY_WIDTH = 420;
const OG_COVER_DISPLAY_HEIGHT = 330;

const OG_COLORS = {
  background: '#0b0f14',
  card: '#11161d',
  border: '#232b35',
  foreground: '#f4f6f5',
  muted: '#94a3b8',
  primary: '#a3e635'
} as const;

export interface OgMedia {
  kind: 'avatar' | 'cover';
  src: string;
}

export interface OgTemplateProps {
  kicker: string;
  title: string;
  description: string;
  brandName: string;
  siteHost: string;
  logo: OgImageAsset;
  /** Home shows the profile photo; project pages show the repo cover. Omit for a text-only card. */
  media?: OgMedia | null;
}

export function ogTemplate({
  kicker,
  title,
  description,
  brandName,
  siteHost,
  logo,
  media
}: OgTemplateProps) {
  const logoWidth = Math.round((logo.width / logo.height) * OG_LOGO_DISPLAY_HEIGHT);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        padding: '72px',
        backgroundColor: OG_COLORS.background,
        backgroundImage: `radial-gradient(circle at 82% 18%, ${OG_COLORS.card} 0%, ${OG_COLORS.background} 60%)`,
        fontFamily: 'sans-serif'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img
          src={logo.dataUri}
          width={logoWidth}
          height={OG_LOGO_DISPLAY_HEIGHT}
          style={{ display: 'flex' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '24px', fontWeight: 700, color: OG_COLORS.foreground }}>
            {brandName}
          </span>
          <span style={{ fontSize: '18px', color: OG_COLORS.muted }}>{siteHost}</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          gap: '56px',
          marginTop: '32px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            flex: media ? '1 1 0%' : 'none',
            maxWidth: media ? '620px' : '980px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              padding: '8px 20px',
              borderRadius: '9999px',
              border: `1px solid ${OG_COLORS.border}`,
              color: OG_COLORS.primary,
              fontSize: '20px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '60px',
              fontWeight: 700,
              lineHeight: 1.1,
              color: OG_COLORS.foreground
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                display: 'flex',
                fontSize: '24px',
                lineHeight: 1.5,
                color: OG_COLORS.muted
              }}
            >
              {description}
            </div>
          ) : null}
        </div>

        {media?.kind === 'avatar' ? (
          <img
            src={media.src}
            width={OG_AVATAR_DISPLAY_SIZE}
            height={OG_AVATAR_DISPLAY_SIZE}
            style={{
              display: 'flex',
              borderRadius: '9999px',
              objectFit: 'cover',
              border: `4px solid ${OG_COLORS.border}`
            }}
          />
        ) : null}

        {media?.kind === 'cover' ? (
          <img
            src={media.src}
            width={OG_COVER_DISPLAY_WIDTH}
            height={OG_COVER_DISPLAY_HEIGHT}
            style={{
              display: 'flex',
              borderRadius: '24px',
              objectFit: 'cover',
              border: `1px solid ${OG_COLORS.border}`
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
