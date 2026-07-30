'use client';

import { ChevronRightIcon } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger
} from '@/components/animate-ui/components/base/accordion';
import { experienceAvatarClassName } from '@/features/experience/constants/avatar-style';
import type { ExperienceAvatarStyle } from '@/features/experience/constants/avatar-style';
import { EXPERIENCE_LOGO_SRC } from '@/features/experience/constants/logo-src';
import type { ExperienceLogoKey } from '@/features/experience/constants/logos';
import { cn } from '@/lib/utils';

/** Avatar diameter — keep timeline spine centered on this. */
const LOGO_SIZE_CLASS = 'size-14';
const LOGO_SPINE_LEFT_CLASS = 'left-7';
const LOGO_PX = 56;

export interface ExperienceTimelineItem {
  id: string;
  company: string;
  role: string;
  description: string;
  dateLabel: string;
  dateTimeStart: string;
  dateTimeEnd?: string;
  skills: string[];
  logoKey: ExperienceLogoKey;
  avatarStyle: ExperienceAvatarStyle;
}

interface ExperienceTimelineProps {
  items: ExperienceTimelineItem[];
  /** Accessible label for skill chips list. */
  skillsLabel: string;
}

/**
 * Timeline + accordion: company logo on a vertical spine;
 * hover reveals a chevron beside the company name; click expands the description.
 */
export function ExperienceTimeline({ items, skillsLabel }: ExperienceTimelineProps) {
  if (items.length === 0) return null;

  return (
    <Accordion className="w-full">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const logoSrc = EXPERIENCE_LOGO_SRC[item.logoKey];

        return (
          <AccordionItem key={item.id} value={item.id} className="relative border-0">
            {!isLast ? (
              <span
                aria-hidden="true"
                className={cn('bg-border absolute top-14 bottom-0 w-px', LOGO_SPINE_LEFT_CLASS)}
              />
            ) : null}

            <div className="relative flex items-start gap-4 pb-10 last:pb-0 sm:gap-5">
              <div className={experienceAvatarClassName(item.avatarStyle, LOGO_SIZE_CLASS)}>
                <img
                  src={logoSrc}
                  alt=""
                  width={LOGO_PX}
                  height={LOGO_PX}
                  className={cn(
                    'object-contain',
                    item.avatarStyle === 'none' ? 'size-full' : 'size-[85%]'
                  )}
                  decoding="async"
                />
              </div>

              <div className="min-w-0 flex-1">
                <AccordionTrigger
                  showArrow={false}
                  className={cn(
                    'group focus-visible:ring-offset-background hover:no-underline',
                    'items-start py-1.5 font-normal'
                  )}
                >
                  <div className="flex w-full flex-col gap-1.5 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <div className="min-w-0 space-y-1">
                      <span className="flex items-center gap-1.5">
                        <span className="font-heading text-foreground text-lg font-semibold tracking-tight">
                          {item.company}
                        </span>
                        <ChevronRightIcon
                          aria-hidden="true"
                          className={cn(
                            'text-muted-foreground size-4 shrink-0 transition-all duration-200',
                            'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
                            'group-data-[panel-open]:rotate-90 group-data-[panel-open]:opacity-100'
                          )}
                        />
                      </span>
                      <span className="text-muted-foreground block text-sm leading-snug md:text-[0.9375rem]">
                        {item.role}
                      </span>
                    </div>
                    <time
                      className="text-muted-foreground shrink-0 text-sm sm:text-right"
                      dateTime={item.dateTimeEnd ?? item.dateTimeStart}
                    >
                      {item.dateLabel}
                    </time>
                  </div>
                </AccordionTrigger>

                <AccordionPanel className="space-y-3 pt-3 pb-1">
                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty md:text-[0.9375rem]">
                    {item.description}
                  </p>
                  {item.skills.length > 0 ? (
                    <ul
                      className="flex flex-wrap gap-2"
                      aria-label={`${skillsLabel}: ${item.company}`}
                    >
                      {item.skills.map((skill) => (
                        <li
                          key={skill}
                          className="bg-muted text-muted-foreground rounded-md px-2.5 py-1 text-xs"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </AccordionPanel>
              </div>
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
