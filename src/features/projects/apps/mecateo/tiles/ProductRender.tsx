'use client';

import { useCallback, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue
} from 'motion/react';
import {
  PARALLAX_PX,
  PHONE_TAP_DURATION_S,
  PHONE_TAP_TRAVEL_PX,
  RENDER_ALT,
  RENDER_IMAGE_COUNT,
  RENDER_IMAGES,
  RIPPLE_DELAYS_S,
  RIPPLE_DURATION_S,
  RIPPLE_END_SCALE,
  RIPPLE_START_OPACITY,
  TILT_IDLE_X_DEG,
  TILT_IDLE_Y_DEG,
  TILT_MAX_DEG,
  TILT_PERSPECTIVE_PX,
  TILT_SPRING
} from '@/features/projects/apps/mecateo/constants/mecateo-renders';
import { RenderImage } from '@/features/projects/apps/mecateo/tiles/RenderImage';
import {
  EASE_OUT,
  IN_VIEW_MARGIN
} from '@/features/projects/showcase-kit/constants/showcase-motion';
import type { LocaleKey } from '@/i18n/ui';

const POINTER_FINE = 'mouse';

interface ParallaxLayerProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  depthPx: number;
  className: string;
  children: ReactNode;
}

/** Layer that shifts opposite to the pointer, proportionally to its depth. */
function ParallaxLayer({ x, y, depthPx, className, children }: ParallaxLayerProps) {
  const tx = useTransform(x, [-1, 1], [-depthPx, depthPx]);
  const ty = useTransform(y, [-1, 1], [-depthPx, depthPx]);
  return (
    <motion.div style={{ x: tx, y: ty }} className={className}>
      {children}
    </motion.div>
  );
}

interface ProductRenderProps {
  lang: LocaleKey;
}

/**
 * Product render of the Mecateo stands: a tilted scene (3D tilt toward the mouse, depth
 * parallax) with the stands photo, the flat review card and a phone silhouette tapping it.
 * The box has a fixed size and each photo reserves its aspect ratio, so nothing shifts
 * while loading. Tilt, ripples and the phone bob start once every photo has decoded, only
 * while in view; reduced motion keeps a static composition. Decorative except the photo alt.
 */
export function ProductRender({ lang }: ProductRenderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: IN_VIEW_MARGIN });
  const reduced = useReducedMotion();
  const [readyCount, setReadyCount] = useState(0);
  const onImageReady = useCallback(() => setReadyCount((count) => count + 1), []);
  const imagesReady = readyCount >= RENDER_IMAGE_COUNT;
  const animate = imagesReady && inView && !reduced;
  const interactive = imagesReady && !reduced;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, TILT_SPRING);
  const y = useSpring(py, TILT_SPRING);
  const rotateY = useTransform(
    x,
    [-1, 1],
    [TILT_IDLE_Y_DEG - TILT_MAX_DEG, TILT_IDLE_Y_DEG + TILT_MAX_DEG]
  );
  const rotateX = useTransform(
    y,
    [-1, 1],
    [TILT_IDLE_X_DEG + TILT_MAX_DEG, TILT_IDLE_X_DEG - TILT_MAX_DEG]
  );

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive || event.pointerType !== POINTER_FINE) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    py.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const { pack, card } = RENDER_IMAGES;

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ perspective: TILT_PERSPECTIVE_PX }}
      className="relative mx-auto h-72 w-60 shrink-0"
    >
      <motion.div
        style={{
          rotateX: interactive ? rotateX : TILT_IDLE_X_DEG,
          rotateY: interactive ? rotateY : TILT_IDLE_Y_DEG
        }}
        className="relative size-full transform-3d"
      >
        <ParallaxLayer
          x={x}
          y={y}
          depthPx={PARALLAX_PX.pack}
          className="absolute top-0 right-0 w-44"
        >
          <RenderImage
            image={pack}
            alt={RENDER_ALT[lang]}
            radiusClass="rounded-xl"
            onReady={onImageReady}
          />
        </ParallaxLayer>

        <ParallaxLayer
          x={x}
          y={y}
          depthPx={PARALLAX_PX.card}
          className="absolute bottom-3 left-0 w-28"
        >
          <RenderImage image={card} alt="" radiusClass="rounded-lg" onReady={onImageReady} />
          <div className="absolute top-[13%] left-[45%] size-0">
            {RIPPLE_DELAYS_S.map((delay) => (
              <motion.span
                key={delay}
                aria-hidden="true"
                className="border-primary absolute -top-4 -left-4 size-8 rounded-full border-2"
                initial={{ opacity: 0, scale: 1 }}
                animate={
                  animate
                    ? { opacity: [RIPPLE_START_OPACITY, 0], scale: [1, RIPPLE_END_SCALE] }
                    : { opacity: 0, scale: 1 }
                }
                transition={{
                  duration: RIPPLE_DURATION_S,
                  delay,
                  ease: EASE_OUT,
                  repeat: Infinity
                }}
              />
            ))}
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          x={x}
          y={y}
          depthPx={PARALLAX_PX.phone}
          className="absolute bottom-28 left-28 w-11"
        >
          <motion.div
            aria-hidden="true"
            animate={animate ? { y: [0, PHONE_TAP_TRAVEL_PX, 0] } : { y: 0 }}
            transition={{ duration: PHONE_TAP_DURATION_S, ease: EASE_OUT, repeat: Infinity }}
            className="bg-foreground/90 border-background/40 aspect-[9/17] w-full rotate-12 rounded-xl border p-[3px] shadow-xl"
          >
            <div className="bg-background/85 relative size-full rounded-lg">
              <span className="bg-foreground/70 absolute top-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full" />
            </div>
          </motion.div>
        </ParallaxLayer>
      </motion.div>
    </div>
  );
}
