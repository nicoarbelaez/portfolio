'use client';

import { getMecateoCopy } from '@/features/projects/apps/mecateo/constants/copy';
import {
  MECATEO_NFC_URL,
  MECATEO_SLUG
} from '@/features/projects/apps/mecateo/constants/mecateo-config';
import { MecateoLogo } from '@/features/projects/apps/mecateo/MecateoLogo';
import { AgentChatTile } from '@/features/projects/apps/mecateo/tiles/AgentChatTile';
import { HeroTile } from '@/features/projects/apps/mecateo/tiles/HeroTile';
import { IntegrationsBeamTile } from '@/features/projects/apps/mecateo/tiles/IntegrationsBeamTile';
import { PanelTile } from '@/features/projects/apps/mecateo/tiles/PanelTile';
import { RedirectTile } from '@/features/projects/apps/mecateo/tiles/RedirectTile';
import { ShowcaseSection } from '@/features/projects/showcase-kit/components/ShowcaseSection';
import { getLocalizedPath } from '@/i18n/utils';
import type { LocaleKey } from '@/i18n/ui';

const HEADING_ID = 'mecateo-heading';

interface MecateoShowcaseProps {
  lang: LocaleKey;
}

/**
 * Mecateo showcase on the shared kit: NFC stands with dynamic redirects and the
 * "Mis NFC" panel, plus the AI agent engine and the integrations behind them.
 */
export function MecateoShowcase({ lang }: MecateoShowcaseProps) {
  const copy = getMecateoCopy(lang);
  const detailsHref = getLocalizedPath(`/projects/${MECATEO_SLUG}`, lang);

  return (
    <ShowcaseSection
      headingId={HEADING_ID}
      name={copy.name}
      tagline={copy.tagline}
      logo={<MecateoLogo />}
    >
      <HeroTile copy={copy.hero} liveHref={MECATEO_NFC_URL} detailsHref={detailsHref} />
      <RedirectTile copy={copy.redirect} />
      <AgentChatTile copy={copy.agent} />
      <PanelTile copy={copy.panel} />
      <IntegrationsBeamTile copy={copy.integrations} />
    </ShowcaseSection>
  );
}
