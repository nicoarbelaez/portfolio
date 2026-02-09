import { useContext } from 'preact/hooks';
import type { TabListProps } from '@tabs/types';
import { TabsContext } from '@tabs/Tabs';
import { cn } from '@/lib/utils';

/**
 * Container component for Tab buttons with keyboard navigation support
 */
export function TabList({ children, className = '' }: TabListProps) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('TabList must be used within a Tabs component');
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (!target.matches('[role="tab"]')) return;

    const tablist = target.closest('[role="tablist"]');
    if (!tablist) return;

    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]:not([disabled])'));
    const currentIndex = tabs.indexOf(target);

    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    const nextTab = tabs[nextIndex] as HTMLElement;
    if (nextTab) {
      nextTab.focus();
      nextTab.click();
    }
  };

  return (
    <div
      role="tablist"
      className={cn(
        'mb-4 inline-flex rounded-lg border border-slate-200/10 p-1.5 shadow-sm backdrop-blur-xl',
        className
      )}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}
