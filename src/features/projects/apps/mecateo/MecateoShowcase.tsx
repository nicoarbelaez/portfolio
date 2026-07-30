'use client';

import { MecateoHeader } from '@/features/projects/apps/mecateo/MecateoHeader';
import {
  getMecateoCopy,
  MECATEO_LIVE_URL,
  MECATEO_SLUG
} from '@/features/projects/apps/mecateo/constants';
import { HeroTile } from '@/features/projects/apps/mecateo/tiles/HeroTile';
import { IntegrationsBeamTile } from '@/features/projects/apps/mecateo/tiles/IntegrationsBeamTile';
import { MenuMarqueeTile } from '@/features/projects/apps/mecateo/tiles/MenuMarqueeTile';
import { PosListTile } from '@/features/projects/apps/mecateo/tiles/PosListTile';
import { ThemeProvider } from '@/features/theme/components/ThemeProvider';
import { getLocalizedPath } from '@/i18n/utils';
import type { LocaleKey } from '@/i18n/ui';

interface MecateoShowcaseProps {
  lang: LocaleKey;
}

/**
 * Featured Apps showcase for Mecateo — 4-tile bento (pitch, menu, POS, integrations).
 * SEO: section heading via parent; product name as h3; tile titles as h4.
 */
export function MecateoShowcase({ lang }: MecateoShowcaseProps) {
  const copy = getMecateoCopy(lang);
  const detailsHref = getLocalizedPath(`/projects/${MECATEO_SLUG}`, lang);

  const headingId = 'mecateo-heading';

  return (
    <ThemeProvider>
      <section aria-labelledby={headingId} className="space-y-6">
        <MecateoHeader name={copy.name} tagline={copy.tagline} headingId={headingId} />

        <div className="grid grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3">
          <HeroTile
            title={copy.heroTitle}
            description={copy.heroDescription}
            liveHref={MECATEO_LIVE_URL}
            detailsHref={detailsHref}
            ctaLive={copy.ctaLive}
            ctaDetails={copy.ctaDetails}
            categories={copy.heroCategories}
            menuItems={copy.menuItems}
            previewLabel={copy.heroPreviewLabel}
          />
          <MenuMarqueeTile
            title={copy.menuTitle}
            description={copy.menuDescription}
            qrHint={copy.menuQrHint}
            items={copy.menuItems}
          />
          <PosListTile
            title={copy.posTitle}
            description={copy.posDescription}
            events={copy.posEvents}
          />
          <IntegrationsBeamTile
            title={copy.integrationsTitle}
            description={copy.integrationsDescription}
          />
        </div>
      </section>
    </ThemeProvider>
  );
}
