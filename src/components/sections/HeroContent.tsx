'use client';

import { useEffect, useState } from 'react';
import { DecoratedText } from '@/components/ui/decorated-text';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { HERO_ANIMATION, HERO_AVATAR } from '@/constants/hero';
import { PERSONAL_INFO } from '@/constants/constants';
import type { ProfessionalSegment } from '@/i18n/hero-professional';
import { cn } from '@/lib/utils';

interface HeroContentProps {
  greeting: string;
  professionalDesktop: readonly ProfessionalSegment[];
  professionalMobile: readonly ProfessionalSegment[];
  description: string;
  avatarAlt: string;
}

const professionalClassName =
  'font-heading text-sm font-bold tracking-tight text-balance sm:text-base md:text-lg';

export function HeroContent({
  greeting,
  professionalDesktop,
  professionalMobile,
  description,
  avatarAlt
}: HeroContentProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex items-center gap-4 md:items-start md:gap-10">
        <div
          className={cn(
            'ring-muted relative shrink-0 overflow-hidden rounded-full border shadow-lg ring-4',
            'size-24 md:order-2 md:size-32'
          )}
        >
          <img
            src={PERSONAL_INFO.AVATAR_URL}
            alt={avatarAlt}
            width={HERO_AVATAR.SIZE_PX}
            height={HERO_AVATAR.SIZE_PX}
            className="absolute inset-0 size-full object-cover object-[center_20%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 md:order-1 md:gap-3">
          {reduceMotion ? (
            <h1
              id="hero-heading"
              className="font-heading text-2xl font-semibold tracking-tighter text-balance sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {greeting}
            </h1>
          ) : (
            <TypingAnimation
              as="h1"
              id="hero-heading"
              aria-label={greeting}
              startOnView={false}
              typeSpeed={HERO_ANIMATION.TYPE_SPEED_MS}
              showCursor
              blinkCursor
              cursorStyle="line"
              className="font-heading text-2xl leading-tight font-semibold tracking-tighter text-balance sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {greeting}
            </TypingAnimation>
          )}

          <DecoratedText
            segments={professionalMobile}
            className={cn(professionalClassName, 'md:hidden')}
            reduceMotion={reduceMotion}
          />

          <p className="text-muted-foreground hidden max-w-xl text-base leading-relaxed md:block md:text-lg lg:text-xl">
            {description}
          </p>
        </div>
      </div>

      <p className="text-muted-foreground text-base leading-relaxed md:hidden">{description}</p>

      <DecoratedText
        segments={professionalDesktop}
        className={cn(professionalClassName, 'hidden md:block')}
        reduceMotion={reduceMotion}
      />
    </div>
  );
}
