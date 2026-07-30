'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import {
  PROJECT_VT_SESSION_KEY,
  projectImageTransitionName,
  projectTitleTransitionName
} from '@/features/projects/constants/view-transitions';

/**
 * Activates shared-element names only for the clicked project so
 * sibling cards do not animate as unmatched exits.
 */
export function useProjectSharedTransition(slug: string): {
  imageRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
  reduceMotion: boolean;
  activateSharedTransition: () => void;
} {
  const [reduceMotion, setReduceMotion] = useState(false);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    if (sessionStorage.getItem(PROJECT_VT_SESSION_KEY) !== slug) return;

    if (imageRef.current) {
      imageRef.current.style.viewTransitionName = projectImageTransitionName(slug);
    }
    if (titleRef.current) {
      titleRef.current.style.viewTransitionName = projectTitleTransitionName(slug);
    }
    sessionStorage.removeItem(PROJECT_VT_SESSION_KEY);
  }, [slug, reduceMotion]);

  const activateSharedTransition = () => {
    if (reduceMotion) return;
    sessionStorage.setItem(PROJECT_VT_SESSION_KEY, slug);
    if (imageRef.current) {
      imageRef.current.style.viewTransitionName = projectImageTransitionName(slug);
    }
    if (titleRef.current) {
      titleRef.current.style.viewTransitionName = projectTitleTransitionName(slug);
    }
  };

  return { imageRef, titleRef, reduceMotion, activateSharedTransition };
}
