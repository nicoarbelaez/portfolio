'use client';

import { useRef, type RefObject } from 'react';
import { Bot, Cloud, CreditCard, MessageCircle, Route, Share2 } from 'lucide-react';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { DotPattern } from '@/components/ui/dot-pattern';
import {
  BEAM_CURVATURE,
  INTEGRATION_NAMES,
  type IntegrationId
} from '@/features/projects/apps/mecateo/constants/mecateo-config';
import type { MecateoCopy } from '@/features/projects/apps/mecateo/constants/copy.types';
import { MecateoLogo } from '@/features/projects/apps/mecateo/MecateoLogo';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { TileFooter } from '@/features/projects/showcase-kit/components/TileFooter';
import { TileNode } from '@/features/projects/showcase-kit/components/TileNode';
import { TileStage } from '@/features/projects/showcase-kit/components/TileStage';
import { DEFAULT_SHOWCASE_ACCENT } from '@/features/projects/showcase-kit/constants/accents';
import type { ShowcaseIcon } from '@/features/projects/showcase-kit/types/showcase-kit';
import { resolveAccent } from '@/features/projects/showcase-kit/utils/accent';
import { cn } from '@/lib/utils';

const NODE_ICONS: Readonly<Record<IntegrationId, ShowcaseIcon>> = {
  wompi: CreditCard,
  cloudflare: Cloud,
  redirector: Route,
  whatsapp: MessageCircle,
  openrouter: Bot
};

/** Inbound services feed the hub from the left; the agent channel and models hang off the right. */
const LEFT_IDS = ['wompi', 'cloudflare', 'redirector'] as const;
const RIGHT_IDS = ['whatsapp', 'openrouter'] as const;
const LEFT_CURVES = [-BEAM_CURVATURE, 0, BEAM_CURVATURE] as const;
const RIGHT_CURVES = [-BEAM_CURVATURE, BEAM_CURVATURE] as const;

/** Beam diagram of the integrations Mecateo actually uses. */
export function IntegrationsBeamTile({ copy }: { copy: MecateoCopy['integrations'] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = {
    wompi: useRef<HTMLDivElement>(null),
    cloudflare: useRef<HTMLDivElement>(null),
    redirector: useRef<HTMLDivElement>(null),
    whatsapp: useRef<HTMLDivElement>(null),
    openrouter: useRef<HTMLDivElement>(null)
  } satisfies Record<IntegrationId, RefObject<HTMLDivElement | null>>;
  const colors = resolveAccent(DEFAULT_SHOWCASE_ACCENT);

  const renderNode = (id: IntegrationId) => {
    const Icon = NODE_ICONS[id];
    return (
      <TileNode
        key={id}
        nodeRef={nodeRefs[id]}
        label={`${INTEGRATION_NAMES[id]}: ${copy.roles[id]}`}
        caption={INTEGRATION_NAMES[id]}
      >
        <Icon className="size-4" aria-hidden="true" />
      </TileNode>
    );
  };

  return (
    <ShowcaseTile span="full" className="min-h-80">
      <TileStage className="min-h-[14rem] items-center justify-center p-4">
        <div ref={containerRef} className="relative flex h-full w-full items-center justify-center">
          <DotPattern
            width={18}
            height={18}
            cr={1}
            className={cn(
              'text-foreground/25',
              '[mask-image:radial-gradient(320px_circle_at_center,white,transparent)]'
            )}
          />
          <div className="relative flex w-full max-w-xl items-center justify-between px-2">
            <div className="flex flex-col gap-3">{LEFT_IDS.map(renderNode)}</div>
            <TileNode nodeRef={hubRef} label="Mecateo" size="lg" emphasized>
              <MecateoLogo className="size-full rounded-none border-0 dark:border-0" />
            </TileNode>
            <div className="flex flex-col gap-6">{RIGHT_IDS.map(renderNode)}</div>
          </div>
          {LEFT_IDS.map((id, i) => (
            <AnimatedBeam
              key={id}
              containerRef={containerRef}
              fromRef={nodeRefs[id]}
              toRef={hubRef}
              curvature={LEFT_CURVES[i]}
              gradientStartColor={colors.beamStart}
              gradientStopColor={colors.beamStop}
            />
          ))}
          {RIGHT_IDS.map((id, i) => (
            <AnimatedBeam
              key={id}
              containerRef={containerRef}
              fromRef={hubRef}
              toRef={nodeRefs[id]}
              curvature={RIGHT_CURVES[i]}
              gradientStartColor={colors.beamStart}
              gradientStopColor={colors.beamStop}
            />
          ))}
        </div>
      </TileStage>
      <TileFooter icon={Share2} title={copy.title} description={copy.description} />
    </ShowcaseTile>
  );
}
