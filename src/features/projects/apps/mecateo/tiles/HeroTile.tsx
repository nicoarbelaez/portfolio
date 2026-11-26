import { buttonVariants } from '@/components/ui/button';
import { NfcStand } from '@/features/projects/apps/mecateo/tiles/NfcStand';
import type { MecateoCopy } from '@/features/projects/apps/mecateo/constants/copy.types';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { cn } from '@/lib/utils';

interface HeroTileProps {
  copy: MecateoCopy['hero'];
  liveHref: string;
  detailsHref: string;
}

/** Pitch tile: NFC + agents positioning, stand illustration, always-visible CTAs. */
export function HeroTile({ copy, liveHref, detailsHref }: HeroTileProps) {
  return (
    <ShowcaseTile span="two" shine className="min-h-96">
      <div className="flex flex-1 flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 self-stretch">
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="font-heading text-lg leading-snug font-semibold tracking-tight text-balance sm:text-xl sm:leading-tight md:text-2xl">
              {copy.title}
            </h4>
            <p className="text-muted-foreground max-w-prose text-sm leading-relaxed text-pretty">
              {copy.description}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <a
              href={liveHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: 'default' }), 'min-h-11 w-full sm:w-auto')}
            >
              {copy.ctaLive}
            </a>
            <a
              href={detailsHref}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'default' }),
                'min-h-11 w-full sm:w-auto'
              )}
            >
              {copy.ctaDetails}
            </a>
          </div>
        </div>
        <NfcStand labels={copy.standLabels} tapLabel={copy.tapLabel} qrBackup={copy.qrBackup} />
      </div>
    </ShowcaseTile>
  );
}
