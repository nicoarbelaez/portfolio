import { useContext } from 'preact/hooks';
import type { TabsTriggerProps } from '@tabs/types';
import { TabsContext } from '@tabs/Tabs';
import { cn } from '@/lib/utils';

/**
 * Individual tab button component
 */
export function TabsTrigger({
  value,
  children,
  disabled = false,
  className = ''
}: TabsTriggerProps) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component');
  }

  const { activeTab, setActiveTab, sectionId } = context;
  const isActive = activeTab === value;

  const handleClick = (e: Event) => {
    e.preventDefault();
    if (!disabled) {
      setActiveTab(value);
    }
  };

  // Base styles
  const baseStyles = '';

  // Conditional styles
  const activeStyles = isActive
    ? 'border-slate-200/30 bg-slate-200/5 text-teal-300'
    : 'border-transparent hover:text-slate-200 cursor-pointer';

  return (
    <button
      type="button"
      role="tab"
      id={`tab-${sectionId}-${value}`}
      aria-selected={isActive}
      aria-controls={`panel-${sectionId}-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        baseStyles,
        className,
        'relative inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-slate-300/90 transition-all duration-200 disabled:pointer-events-none disabled:opacity-50',
        activeStyles,
      )}
    >
      {children}
    </button>
  );
}
