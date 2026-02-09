import type { ComponentChildren } from 'preact';

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

/**
 * Props for the main Tabs wrapper component
 */
/**
 * Props for the main Tabs wrapper component
 */
export interface TabsProps {
  sectionId: string;
  defaultValue: string;
  children: ComponentChildren;
  className?: string;
}

/**
 * Props for individual Tab button component
 */
export interface TabsTriggerProps {
  value: string;
  children: ComponentChildren;
  disabled?: boolean;
  className?: string;
}

/**
 * Props for TabList container component
 */
export interface TabListProps {
  children: ComponentChildren;
  className?: string;
}

/**
 * Props for individual TabPanel content component
 */
export interface TabsContentProps {
  value: string;
  children: ComponentChildren;
  className?: string;
}

/**
 * Props for TabPanels container component
 */
export interface TabPanelsProps {
  children: ComponentChildren;
  className?: string;
}
