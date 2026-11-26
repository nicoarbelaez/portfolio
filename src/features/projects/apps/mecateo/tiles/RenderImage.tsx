'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface RenderImageProps {
  image: { src: string; width: number; height: number };
  alt: string;
  /** Rounding shared by the photo and its skeleton (e.g. `rounded-xl`). */
  radiusClass: string;
  /** Called once, after the image has loaded and decoded. */
  onReady: () => void;
}

/**
 * Product photo inside a reserved box: `aspect-ratio` plus explicit `width`/`height`
 * (from the Astro `ImageMetadata`) keep the layout fixed, a `Skeleton` fills the box
 * until the bitmap is decoded, then the photo fades in (opacity only, no size change).
 * Above the fold, so it loads eagerly with high fetch priority.
 */
export function RenderImage({ image, alt, radiusClass, onReady }: RenderImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const settled = useRef(false);
  const [loaded, setLoaded] = useState(false);

  const settle = useCallback(() => {
    if (settled.current) return;
    settled.current = true;
    setLoaded(true);
    onReady();
  }, [onReady]);

  const decodeThenSettle = useCallback(() => {
    const el = imgRef.current;
    if (!el) return;
    el.decode().then(settle, settle);
  }, [settle]);

  /** The image may finish loading before hydration, so `onLoad` would never fire. */
  useEffect(() => {
    const el = imgRef.current;
    if (el?.complete && el.naturalWidth > 0) decodeThenSettle();
  }, [decodeThenSettle]);

  return (
    <div style={{ aspectRatio: `${image.width} / ${image.height}` }} className="relative w-full">
      <Skeleton
        aria-hidden="true"
        className={cn(
          'absolute inset-0 transition-opacity duration-300',
          radiusClass,
          loaded && 'animate-none opacity-0'
        )}
      />
      <img
        ref={imgRef}
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        aria-hidden={alt === '' ? true : undefined}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onLoad={decodeThenSettle}
        className={cn(
          'border-border/60 absolute inset-0 block size-full border object-cover shadow-xl transition-opacity duration-300',
          radiusClass,
          loaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
}
