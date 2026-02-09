import { createContext } from 'preact';
import { useState, useEffect, useMemo, useCallback } from 'preact/hooks';
import type { TabItem, TabsContextType, TabsProps } from '@tabs/types';

export const TabsContext = createContext<TabsContextType | null>(null);

export function Tabs({ sectionId, defaultValue, children, className = '' }: TabsProps) {
  const [activeTab, setActiveTabState] = useState<string>(defaultValue);
  const [tabsList, setTabsList] = useState<TabItem[]>([]);

  const registerTab = useCallback((tab: TabItem) => {
    setTabsList((prev) => {
      if (prev.some((t) => t.value === tab.value)) {
        return prev;
      }
      return [...prev, tab];
    });
  }, []);

  // Read tab from URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');

    if (tabParam) {
      // Parse format: "sectionId-value"
      // We look for the first hyphen to split sectionId and value,
      // but value might contain hyphens too.
      // So we check if it starts with sectionId + "-"
      const prefix = `${sectionId}-`;
      if (tabParam.startsWith(prefix)) {
        const value = tabParam.slice(prefix.length);
        const isTabDisabled = tabsList.some((tab) => tab.value === value && tab.disabled);
        if (isTabDisabled) {
          setActiveTabState(value);
        }
      }
    }
  }, [sectionId]);

  // Update URL when active tab changes
  const setActiveTab = (value: string) => {
    setActiveTabState(value);

    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    // Set or update the tab parameter
    params.set('tab', `${sectionId}-${value}`);

    url.search = params.toString();
    window.history.pushState({}, '', url.toString());
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<TabsContextType>(
    () => ({
      activeTab,
      setActiveTab,
      sectionId,
      defaultValue,
      registerTab
    }),
    [activeTab, sectionId, defaultValue, registerTab]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}
