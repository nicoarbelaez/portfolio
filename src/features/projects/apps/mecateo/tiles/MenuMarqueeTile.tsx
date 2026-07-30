'use client';

import { SmoothQr } from '@/components/ui/smooth-qr';
import { Marquee } from '@/components/ui/marquee';
import { MecateoMagicTile } from '@/features/projects/apps/mecateo/MecateoMagicTile';
import type { MecateoMenuItem } from '@/features/projects/apps/mecateo/constants';
import { MECATEO_MENU_URL } from '@/features/projects/apps/mecateo/constants';

interface MenuMarqueeTileProps {
  title: string;
  description: string;
  qrHint: string;
  items: readonly MecateoMenuItem[];
}

function MenuCard({ name, note, imageSrc, imageAlt }: MecateoMenuItem) {
  return (
    <figure className="bg-background/90 border-border/40 w-36 shrink-0 overflow-hidden rounded-lg border backdrop-blur-sm">
      <img
        src={imageSrc}
        alt={imageAlt}
        width={144}
        height={96}
        className="aspect-[3/2] w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <figcaption className="space-y-0.5 p-2.5">
        <span className="block truncate text-sm font-medium">{name}</span>
        <span className="text-muted-foreground block text-xs">{note}</span>
      </figcaption>
    </figure>
  );
}

/** Digital menu tile — product marquee + smooth QR to the live Terremoto menu. */
export function MenuMarqueeTile({ title, description, qrHint, items }: MenuMarqueeTileProps) {
  return (
    <MecateoMagicTile className="col-span-1 min-h-80 md:min-h-0">
      <div className="relative z-40 flex min-h-0 flex-1 flex-col overflow-hidden pt-3">
        <div className="absolute top-3 right-3 z-20">
          <a
            href={MECATEO_MENU_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:ring-ring block rounded-xl focus-visible:ring-2 focus-visible:outline-none"
            aria-label={qrHint}
          >
            <SmoothQr value={MECATEO_MENU_URL} size={72} label={qrHint} />
          </a>
        </div>

        <Marquee
          pauseOnHover
          className="flex-1 [mask-image:linear-gradient(to_top,transparent_8%,black_55%)] [--duration:32s]"
        >
          {items.map((item) => (
            <MenuCard key={item.name} {...item} />
          ))}
        </Marquee>
      </div>

      <div className="border-border/60 bg-card/90 relative z-40 space-y-1 border-t p-4 backdrop-blur-sm">
        <h4 className="font-heading text-base font-semibold">{title}</h4>
        <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
      </div>
    </MecateoMagicTile>
  );
}
