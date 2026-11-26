import type { ReactNode } from 'react';
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport
} from '@/components/ui/message-scroller';
import { cn } from '@/lib/utils';

/**
 * Viewport classes: no scrollbar in any engine (Firefox, IE/Edge legacy, WebKit/Blink), no gutter,
 *
 */
const VIEWPORT_CLASS =
  '[scrollbar-width:none] [-ms-overflow-style:none] [scrollbar-gutter:auto] [&::-webkit-scrollbar]:hidden';

/**
 * Mobile: the replica is a pure animation. Locking user input (`pointer-events-none`) lets touches
 * fall through to the page so it scrolls normally, while the script-driven auto-scroll keeps
 * working (programmatic `scrollTop` still moves an `overflow-hidden` box).
 */
const MOBILE_LOCK_CLASS = 'max-md:pointer-events-none max-md:overflow-hidden';

/** Wider screens keep the inner scroll, but at its edges the wheel must continue to the page. */
const SCROLL_CHAIN_CLASS = 'overscroll-auto';

/** With an overlay: top fade mask plus padding so the first message clears the floating pill. */
const OVERLAY_VIEWPORT_CLASS = '[mask-image:linear-gradient(to_bottom,transparent_0,black_28px)]';
const OVERLAY_CONTENT_CLASS = 'pt-8';

interface ChatViewportProps {
  /** Messages and chips. They stack in a column inside the scroller. */
  children: ReactNode;
  /** Floating control pinned over the top-right corner of the viewport (e.g. a toggle). */
  overlay?: ReactNode;
  className?: string;
}

/**
 * Fixed-height message area for chat replicas. It is absolutely positioned inside a
 * `flex-1` wrapper, so growing content never changes the tile height: it scrolls internally
 * and sticks to the bottom while new messages arrive (until the user scrolls up).
 */
export function ChatViewport({ children, overlay, className }: ChatViewportProps) {
  return (
    <div className="relative min-h-0 flex-1">
      <MessageScrollerProvider autoScroll defaultScrollPosition="end">
        <MessageScroller className="absolute inset-0">
          <MessageScrollerViewport
            className={cn(
              VIEWPORT_CLASS,
              MOBILE_LOCK_CLASS,
              SCROLL_CHAIN_CLASS,
              overlay && OVERLAY_VIEWPORT_CLASS
            )}
          >
            <MessageScrollerContent
              className={cn('gap-2 p-2.5', overlay && OVERLAY_CONTENT_CLASS, className)}
            >
              {children}
            </MessageScrollerContent>
          </MessageScrollerViewport>
        </MessageScroller>
      </MessageScrollerProvider>
      {overlay ? <div className="absolute top-1.5 right-1.5 z-10">{overlay}</div> : null}
    </div>
  );
}
