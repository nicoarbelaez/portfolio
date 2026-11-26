import AutoHeight from 'embla-carousel-auto-height';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PROJECT_SWIPE_IGNORE_SELECTOR } from '@/features/projects/constants/tabs';

type EmblaApi = NonNullable<UseEmblaCarouselType[1]>;
type EmblaOptions = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;

/**
 * Embla: horizontal drag (mouse + touch), snap to the nearest pane (past half or a quick flick).
 * Vertical gestures are left to the page (`touch-action: pan-y` on the container).
 */
const EMBLA_OPTIONS: EmblaOptions = {
  axis: 'x',
  align: 'start',
  containScroll: 'trimSnaps',
  watchDrag: (_api, event) => {
    const target = event.target;
    return !(target instanceof Element && target.closest(PROJECT_SWIPE_IGNORE_SELECTOR));
  }
};

interface UseTabsCarouselParams<T extends string> {
  tabs: readonly T[];
  value: T;
  onValueChange: (next: T) => void;
}

/**
 * Drag-to-switch panes bound to a tab value (pattern: Embla carousel + AutoHeight plugin).
 * - Drag/flick/`scrollToTab` -> Embla `select` -> `onValueChange` (single source of truth stays
 *   the caller's `value`, e.g. the URL-synced tab).
 * - External `value` changes (deep link on mount) jump without animation.
 * - `indicatorRef` follows the scroll progress so the tab pill slides with the finger/mouse.
 */
export function useTabsCarousel<T extends string>({
  tabs,
  value,
  onValueChange
}: UseTabsCarouselParams<T>) {
  const [plugins] = useState(() => [AutoHeight()]);
  const [viewportRef, emblaApi] = useEmblaCarousel(EMBLA_OPTIONS, plugins);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const updateIndicator = useCallback(
    (api: EmblaApi) => {
      const progress = Math.min(1, Math.max(0, api.scrollProgress()));
      indicatorRef.current?.style.setProperty(
        'transform',
        `translateX(${progress * (tabs.length - 1) * 100}%)`
      );
    },
    [tabs.length]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const next = tabs[emblaApi.selectedScrollSnap()];
      if (next) onValueChange(next);
    };
    const onPointerDown = () => setDragging(true);
    const onPointerUp = () => setDragging(false);

    updateIndicator(emblaApi);
    emblaApi
      .on('select', onSelect)
      .on('scroll', updateIndicator)
      .on('reInit', updateIndicator)
      .on('pointerDown', onPointerDown)
      .on('pointerUp', onPointerUp);

    return () => {
      emblaApi
        .off('select', onSelect)
        .off('scroll', updateIndicator)
        .off('reInit', updateIndicator)
        .off('pointerDown', onPointerDown)
        .off('pointerUp', onPointerUp);
    };
  }, [emblaApi, tabs, onValueChange, updateIndicator]);

  // Embla only re-inits on width changes. Panes grow in height after mount (lazy imports, fonts,
  // in-view reveals), so re-measure on any pane resize or AutoHeight keeps the first, shorter height.
  useEffect(() => {
    if (!emblaApi || typeof ResizeObserver === 'undefined') return;
    let frame = 0;
    let busy = false;
    let pending = false;
    const remeasure = () => {
      // A reInit while scrolling (drag/settle) rebuilds the engine and makes the swipe stutter: defer it.
      if (busy) {
        pending = true;
        return;
      }
      pending = false;
      emblaApi.reInit();
    };
    const onBusy = () => {
      busy = true;
    };
    const onIdle = () => {
      busy = false;
      if (pending) remeasure();
    };
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(remeasure);
    });
    emblaApi.slideNodes().forEach((node) => observer.observe(node));
    emblaApi.on('scroll', onBusy).on('settle', onIdle);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      emblaApi.off('scroll', onBusy).off('settle', onIdle);
    };
  }, [emblaApi]);

  // External value change (e.g. deep link read after mount): jump, no slide animation.
  const index = tabs.indexOf(value);
  useEffect(() => {
    if (!emblaApi || index < 0 || emblaApi.selectedScrollSnap() === index) return;
    emblaApi.scrollTo(index, true);
  }, [emblaApi, index]);

  const scrollToTab = useCallback(
    (tab: T) => {
      const target = tabs.indexOf(tab);
      if (target < 0) return;
      // Before Embla initializes (first paint) just switch the value.
      if (emblaApi) emblaApi.scrollTo(target);
      else onValueChange(tab);
    },
    [emblaApi, tabs, onValueChange]
  );

  return { viewportRef, indicatorRef, dragging, scrollToTab } as const;
}
