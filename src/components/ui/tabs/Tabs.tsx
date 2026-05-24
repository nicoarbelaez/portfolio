import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');

    if (tabParam) {
      const prefix = `${sectionId}-`;
      if (tabParam.startsWith(prefix)) {
        const value = tabParam.slice(prefix.length);
        const isTabDisabled = tabsList.some((tab) => tab.value === value && tab.disabled);
        if (isTabDisabled) {
          setActiveTabState(value);
        }
      }
    }
  }, [sectionId, tabsList]);

  const setActiveTab = (value: string) => {
    setActiveTabState(value);

    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    params.set('tab', `${sectionId}-${value}`);

    url.search = params.toString();
    window.history.pushState({}, '', url.toString());
  };

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
