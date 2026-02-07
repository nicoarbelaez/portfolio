import { useContext } from 'preact/hooks';
import type { TabsTriggerProps } from '@tabs/types';
import { TabsContext } from '@tabs/Tabs';

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
  const baseStyles = 'inline-block border-b-2 p-4 transition-colors duration-200';

  // Conditional styles
  const activeStyles = isActive
    ? 'border-teal-300 text-teal-300'
    : 'border-transparent hover:border-gray-300 hover:text-gray-300';

  const disabledStyles = disabled
    ? 'cursor-not-allowed text-gray-400 opacity-50'
    : 'cursor-pointer';

  const combinedClassName = `${baseStyles} ${activeStyles} ${disabledStyles} ${className}`.trim();

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
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
