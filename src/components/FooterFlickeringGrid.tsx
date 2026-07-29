import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { FOOTER_FLICKERING_GRID } from '@/constants/footer';

const MASK_FADE_TOP = 'linear-gradient(to bottom, transparent, black)' as const;

/**
 * Flickering grid behind the footer that vanishes toward the top edge.
 */
export function FooterFlickeringGrid() {
  const { HEIGHT_PX, SQUARE_SIZE, GRID_GAP, MAX_OPACITY, FLICKER_CHANCE, COLOR } =
    FOOTER_FLICKERING_GRID;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden"
      style={{ height: HEIGHT_PX }}
    >
      <div
        className="size-full"
        style={{
          maskImage: MASK_FADE_TOP,
          WebkitMaskImage: MASK_FADE_TOP
        }}
      >
        <FlickeringGrid
          className="size-full"
          squareSize={SQUARE_SIZE}
          gridGap={GRID_GAP}
          color={COLOR}
          maxOpacity={MAX_OPACITY}
          flickerChance={FLICKER_CHANCE}
          height={HEIGHT_PX}
        />
      </div>
    </div>
  );
}
