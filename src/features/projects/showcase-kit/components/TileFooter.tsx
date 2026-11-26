import { TILE_FOOTER_CLASS } from '@/features/projects/showcase-kit/constants/showcase-layout';
import type { ShowcaseIcon } from '@/features/projects/showcase-kit/types/showcase-kit';

interface TileFooterProps {
  icon: ShowcaseIcon;
  /** Rendered as an `h4`. */
  title: string;
  description: string;
}

/** Title and one-line description under a tile stage. The text is the accessible summary of the visual. */
export function TileFooter({ icon: Icon, title, description }: TileFooterProps) {
  return (
    <div className={TILE_FOOTER_CLASS}>
      <div className="flex items-center gap-2">
        <Icon className="text-foreground size-5 shrink-0" aria-hidden="true" />
        <h4 className="font-heading text-base font-semibold">{title}</h4>
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
    </div>
  );
}
