import { useContext } from 'react';
import type { TabsContentProps } from './types';
import { TabsContext } from './Tabs';

export function TabsContent({ value, children, className = '' }: TabsContentProps) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('TabPanel must be used within a Tabs component');
  }

  const { activeTab, sectionId } = context;
  const isActive = activeTab === value;

  return (
    <div
      role="tabpanel"
      id={`panel-${sectionId}-${value}`}
      aria-labelledby={`tab-${sectionId}-${value}`}
      hidden={!isActive}
      className={className}
    >
      {isActive && children}
    </div>
  );
}
