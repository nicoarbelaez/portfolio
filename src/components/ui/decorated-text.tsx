'use client';

import type { ElementType } from 'react';
import { Highlighter } from '@/components/ui/highlighter';
import { TEXT_DECORATOR_MOTION, getTextDecoratorStyle } from '@/constants/text-decorators';
import type { TextDecoratorSegment } from '@/types/text-decorator';
import { cn } from '@/lib/utils';

interface DecoratedTextProps {
  segments: readonly TextDecoratorSegment[];
  className?: string;
  as?: ElementType;
  /** Skip annotation animation; still applies mark text classes. */
  reduceMotion?: boolean;
  isView?: boolean;
  multiline?: boolean;
}

/**
 * Renders segmented copy with optional Magic UI Highlighter marks.
 * Mark → color/class mapping lives in `TEXT_DECORATOR_STYLES` (scalable).
 */
export function DecoratedText({
  segments,
  className,
  as: Comp = 'p',
  reduceMotion = false,
  isView = true,
  multiline = false
}: DecoratedTextProps) {
  return (
    <Comp className={className}>
      {segments.map((segment, index) => {
        if (!segment.mark) {
          return <span key={index}>{segment.text}</span>;
        }

        const style = getTextDecoratorStyle(segment.mark);

        if (reduceMotion) {
          return (
            <span key={index} className={style.textClassName}>
              {segment.text}
            </span>
          );
        }

        return (
          <span key={index} className="mx-1 inline-block first:ml-0 last:mr-0">
            <Highlighter
              action={segment.mark}
              color={style.color}
              animationDuration={TEXT_DECORATOR_MOTION.ANIMATION_DURATION_MS}
              iterations={TEXT_DECORATOR_MOTION.ITERATIONS}
              strokeWidth={TEXT_DECORATOR_MOTION.STROKE_WIDTH}
              padding={TEXT_DECORATOR_MOTION.PADDING_PX}
              multiline={multiline}
              isView={isView}
            >
              <span className={cn(style.textClassName)}>{segment.text}</span>
            </Highlighter>
          </span>
        );
      })}
    </Comp>
  );
}
