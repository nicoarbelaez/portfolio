import type { ReactNode } from 'react';

/**
 * Context type for sharing tab state between Tabs components
 */
export interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
  defaultValue: string;
  sectionId: string;
  itemsTabs?: TabItem[];
  registerTab: (tab: TabItem) => void;
}

export interface TabItem {
  value: string;
  disabled: boolean;
}

export interface TabsProps {
  sectionId: string;
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

export interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export interface TabListProps {
  children: ReactNode;
  className?: string;
}

export interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export interface TabPanelsProps {
  children: ReactNode;
  className?: string;
}
