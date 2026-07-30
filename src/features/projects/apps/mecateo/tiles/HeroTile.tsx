import { buttonVariants } from '@/components/ui/button';
import { ShineBorder } from '@/components/ui/shine-border';
import type { MecateoMenuItem } from '@/features/projects/apps/mecateo/constants';
import { MECATEO_TILE_CLASS } from '@/features/projects/apps/mecateo/tile-surface';
import { HeroAppPreview } from '@/features/projects/apps/mecateo/tiles/HeroAppPreview';
import { cn } from '@/lib/utils';

interface HeroTileProps {
  title: string;
  description: string;
  liveHref: string;
  detailsHref: string;
  ctaLive: string;
  ctaDetails: string;
  categories: readonly string[];
  menuItems: readonly MecateoMenuItem[];
  previewLabel: string;
}

/** Featured pitch tile — Shine Border, live app preview, always-visible CTAs. */
export function HeroTile({
  title,
  description,
  liveHref,
  detailsHref,
  ctaLive,
  ctaDetails,
  categories,
  menuItems,
  previewLabel
}: HeroTileProps) {
  return (
    <article
      className={cn(
        MECATEO_TILE_CLASS,
        'col-span-1 justify-between p-5 sm:p-6 md:col-span-2 md:h-full'
      )}
    >
      <ShineBorder
        borderWidth={1}
        duration={12}
        shineColor={['oklch(0.84 0.23 130)', 'oklch(0.77 0.22 132)', 'oklch(0.84 0.23 130)']}
        className="rounded-[inherit]"
      />
      <div className="relative z-10 flex flex-1 flex-col gap-5 sm:flex-row sm:items-stretch sm:gap-6">
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="font-heading text-lg leading-snug font-semibold tracking-tight text-balance sm:text-xl sm:leading-tight md:text-2xl">
              {title}
            </h4>
            <p className="text-muted-foreground max-w-prose text-sm leading-relaxed text-pretty">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <a
              href={liveHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: 'default' }), 'min-h-11 w-full sm:w-auto')}
            >
              {ctaLive}
            </a>
            <a
              href={detailsHref}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'default' }),
                'min-h-11 w-full sm:w-auto'
              )}
            >
              {ctaDetails}
            </a>
          </div>
        </div>

        <HeroAppPreview categories={categories} items={menuItems} label={previewLabel} />
      </div>
    </article>
  );
}
