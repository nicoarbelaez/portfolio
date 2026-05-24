import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <div className="flex items-center">
      <span className="relative inline-flex overflow-hidden rounded-full p-[1px]">
        <div className="inline-flex w-full items-center justify-center rounded-full bg-teal-300/10 px-3 py-1 text-xs whitespace-nowrap text-teal-300">
          {children}
        </div>
      </span>
    </div>
  );
}
