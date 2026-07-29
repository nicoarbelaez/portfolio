'use client';

import * as React from 'react';
import { Dialog as SheetPrimitive } from 'radix-ui';
import { AnimatePresence, motion, type HTMLMotionProps, type Transition } from 'motion/react';

import { getStrictContext } from '@/lib/get-strict-context';
import { useControlledState } from '@/hooks/use-controlled-state';

type SheetContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const [SheetProvider, useSheet] = getStrictContext<SheetContextType>('SheetContext');

type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>;

function Sheet(props: SheetProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props.open,
    defaultValue: props.defaultOpen,
    onChange: props.onOpenChange
  });

  return (
    <SheetProvider value={{ isOpen, setIsOpen }}>
      <SheetPrimitive.Root data-slot="sheet" {...props} onOpenChange={setIsOpen} />
    </SheetProvider>
  );
}

type SheetTriggerProps = React.ComponentProps<typeof SheetPrimitive.Trigger>;

function SheetTrigger(props: SheetTriggerProps) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

type SheetCloseProps = React.ComponentProps<typeof SheetPrimitive.Close>;

function SheetClose(props: SheetCloseProps) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

type SheetPortalProps = React.ComponentProps<typeof SheetPrimitive.Portal>;

function SheetPortal(props: SheetPortalProps) {
  const { isOpen } = useSheet();

  return (
    <AnimatePresence>
      {isOpen ? <SheetPrimitive.Portal forceMount data-slot="sheet-portal" {...props} /> : null}
    </AnimatePresence>
  );
}

type SheetOverlayProps = Omit<
  React.ComponentProps<typeof SheetPrimitive.Overlay>,
  'asChild' | 'forceMount'
> &
  HTMLMotionProps<'div'> & {
    transition?: Transition;
  };

function SheetOverlay({
  transition = { duration: 0.2, ease: 'easeInOut' },
  className,
  style,
  ...props
}: SheetOverlayProps) {
  return (
    <SheetPrimitive.Overlay forceMount asChild>
      <motion.div
        key="sheet-overlay"
        data-slot="sheet-overlay"
        className={className}
        style={style}
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(4px)' }}
        transition={transition}
        {...props}
      />
    </SheetPrimitive.Overlay>
  );
}

type Side = 'top' | 'bottom' | 'left' | 'right';

type SheetContentProps = Omit<
  React.ComponentProps<typeof SheetPrimitive.Content>,
  'asChild' | 'forceMount'
> &
  HTMLMotionProps<'div'> & {
    side?: Side;
    transition?: Transition;
  };

function SheetContent({
  side = 'right',
  transition = { type: 'spring', stiffness: 150, damping: 22 },
  style,
  className,
  children,
  ...props
}: SheetContentProps) {
  const axis = side === 'left' || side === 'right' ? 'x' : 'y';

  const offscreen: Record<Side, { x?: string; y?: string; opacity: number }> = {
    right: { x: '100%', opacity: 0 },
    left: { x: '-100%', opacity: 0 },
    top: { y: '-100%', opacity: 0 },
    bottom: { y: '100%', opacity: 0 }
  };

  const positionStyle: Record<Side, React.CSSProperties> = {
    right: { insetBlock: 0, right: 0 },
    left: { insetBlock: 0, left: 0 },
    top: { insetInline: 0, top: 0 },
    bottom: { insetInline: 0, bottom: 0 }
  };

  return (
    <SheetPrimitive.Content forceMount asChild>
      <motion.div
        key="sheet-content"
        data-slot="sheet-content"
        data-side={side}
        className={className}
        initial={offscreen[side]}
        animate={{ [axis]: 0, opacity: 1 }}
        exit={offscreen[side]}
        style={{
          position: 'fixed',
          ...positionStyle[side],
          ...style
        }}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    </SheetPrimitive.Content>
  );
}

function SheetHeader(props: React.ComponentProps<'div'>) {
  return <div data-slot="sheet-header" {...props} />;
}

function SheetFooter(props: React.ComponentProps<'div'>) {
  return <div data-slot="sheet-footer" {...props} />;
}

function SheetTitle(props: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title data-slot="sheet-title" {...props} />;
}

function SheetDescription(props: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return <SheetPrimitive.Description data-slot="sheet-description" {...props} />;
}

export {
  useSheet,
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  type SheetProps,
  type SheetPortalProps,
  type SheetOverlayProps,
  type SheetTriggerProps,
  type SheetCloseProps,
  type SheetContentProps
};
