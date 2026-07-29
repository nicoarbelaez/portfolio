'use client';

import * as React from 'react';
import { motion, isMotionComponent, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

type AnyProps = Record<string, unknown>;

type DOMMotionProps<T extends HTMLElement = HTMLElement> = Omit<HTMLMotionProps<'div'>, 'ref'> & {
  ref?: React.Ref<T>;
};

type WithAsChild<Base extends object> =
  | (Base & { asChild: true; children: React.ReactElement })
  | (Base & { asChild?: false | undefined });

type SlotProps<T extends HTMLElement = HTMLElement> = {
  children?: React.ReactElement;
} & DOMMotionProps<T>;

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref as React.RefObject<T | null>).current = node;
      }
    });
  };
}

function mergeProps<T extends HTMLElement>(
  childProps: AnyProps,
  slotProps: DOMMotionProps<T>
): AnyProps {
  const merged: AnyProps = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(
      typeof childProps.className === 'string' ? childProps.className : undefined,
      slotProps.className
    );
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...(typeof childProps.style === 'object' && childProps.style !== null
        ? (childProps.style as React.CSSProperties)
        : {}),
      ...slotProps.style
    };
  }

  return merged;
}

function Slot<T extends HTMLElement = HTMLElement>({ children, ref, ...props }: SlotProps<T>) {
  const childType = React.isValidElement(children) ? children.type : null;
  const isAlreadyMotion =
    typeof childType === 'object' && childType !== null && isMotionComponent(childType);

  const Base = React.useMemo(() => {
    if (!childType) return motion.div;
    return isAlreadyMotion
      ? (childType as React.ElementType)
      : motion.create(childType as React.ElementType);
  }, [isAlreadyMotion, childType]);

  if (!React.isValidElement(children)) return null;

  const { ref: childRef, ...childProps } = children.props as AnyProps;
  const mergedProps = mergeProps(childProps, props);

  return <Base {...mergedProps} ref={mergeRefs(childRef as React.Ref<T>, ref)} />;
}

export { Slot, type SlotProps, type WithAsChild, type DOMMotionProps, type AnyProps };
