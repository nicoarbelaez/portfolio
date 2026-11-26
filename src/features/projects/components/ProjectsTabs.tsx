'use client';

import { useMemo } from 'react';
import {
  Tabs as TabsPrimitive,
  TabsList as TabsListPrimitive,
  TabsTrigger as TabsTriggerPrimitive
} from '@/components/animate-ui/primitives/animate/tabs';
import type { ProjectCardLabels } from '@/features/projects/components/ProjectCard';
import { ProjectShowcaseBlock } from '@/features/projects/components/ProjectShowcaseBlock';
import { PROJECT_TABS_STICKY_TOP_CLASS } from '@/features/projects/constants/sections';
import {
  PROJECT_TAB_PANE_GAP_CLASS,
  PROJECT_TAB_QUERY_PARAM,
  PROJECT_TABS,
  type ProjectTabId
} from '@/features/projects/constants/tabs';
import { useTabsCarousel } from '@/features/projects/hooks/use-tabs-carousel';
import { useUrlTab } from '@/features/projects/hooks/use-url-tab';
import type { EnrichedProject } from '@/features/projects/types/project';
import type { LocaleKey } from '@/i18n/ui';
import { cn } from '@/lib/utils';

interface ProjectsTabsProps {
  lang: LocaleKey;
  groups: Record<ProjectTabId, EnrichedProject[]>;
  labels: Record<ProjectTabId, string> & { card: ProjectCardLabels };
}

const tabId = (tab: ProjectTabId) => `projects-tab-${tab}`;
const panelId = (tab: ProjectTabId) => `projects-panel-${tab}`;

/** Horizontal inset of the pill inside the tab list (matches `p-[3px]`). */
const LIST_PADDING_PX = 3;

/**
 * Client projects (custom showcases) vs personal projects (cards).
 * - Click a tab, or drag/swipe the content left/right (Embla), to switch; the pill follows the drag.
 * - Deep-linkable via `?tab=client|side` (see `constants/tabs.ts`).
 */
export function ProjectsTabs({ lang, groups, labels }: ProjectsTabsProps) {
  const clientCount = groups.client.length;
  const sideCount = groups.side.length;
  // `groups` is rebuilt by the parent each render; only the counts define availability.
  const availableTabs = useMemo(() => {
    const counts: Record<ProjectTabId, number> = { client: clientCount, side: sideCount };
    return PROJECT_TABS.filter((tab) => counts[tab] > 0);
  }, [clientCount, sideCount]);
  const defaultTab = availableTabs[0] ?? PROJECT_TABS[0];
  const [activeTab, selectTab] = useUrlTab(PROJECT_TAB_QUERY_PARAM, PROJECT_TABS, defaultTab);

  // A deep link to an empty/archived tab falls back to the first available one.
  const value = availableTabs.includes(activeTab) ? activeTab : defaultTab;
  const { viewportRef, indicatorRef, dragging, scrollToTab } = useTabsCarousel({
    tabs: availableTabs,
    value,
    onValueChange: selectTab
  });

  if (availableTabs.length === 0) return null;

  const renderBlock = (tab: ProjectTabId) => (
    <ProjectShowcaseBlock
      lang={lang}
      projects={groups[tab]}
      cardLabels={labels.card}
      accent={tab === 'client'}
    />
  );

  if (availableTabs.length === 1) return renderBlock(defaultTab);

  return (
    <TabsPrimitive
      value={value}
      onValueChange={(next) => {
        const tab = availableTabs.find((candidate) => candidate === next);
        if (tab) scrollToTab(tab);
      }}
      className="flex w-full flex-col gap-8"
    >
      <div
        className={cn(
          'z-40 flex justify-center py-2',
          'max-md:bg-background/80 max-md:sticky max-md:backdrop-blur-md',
          'max-md:supports-[backdrop-filter]:bg-background/70',
          'md:static md:bg-transparent md:py-0',
          PROJECT_TABS_STICKY_TOP_CLASS
        )}
      >
        <TabsListPrimitive
          className="bg-muted text-muted-foreground relative grid h-9 w-fit items-center rounded-lg p-[3px]"
          style={{ gridTemplateColumns: `repeat(${availableTabs.length}, 1fr)` }}
        >
          <div
            ref={indicatorRef}
            aria-hidden="true"
            className="bg-background dark:border-input dark:bg-input/30 absolute inset-y-[3px] rounded-md border border-transparent shadow-sm will-change-transform"
            style={{
              left: LIST_PADDING_PX,
              width: `calc((100% - ${LIST_PADDING_PX * 2}px) / ${availableTabs.length})`
            }}
          />
          {availableTabs.map((tab) => (
            <TabsTriggerPrimitive
              key={tab}
              value={tab}
              id={tabId(tab)}
              aria-selected={tab === value}
              aria-controls={panelId(tab)}
              className="data-[state=active]:text-foreground focus-visible:ring-ring/50 relative z-10 inline-flex h-full items-center justify-center rounded-md px-3 text-sm font-medium whitespace-nowrap transition-colors duration-300 focus-visible:ring-[3px] focus-visible:outline-none"
            >
              {labels[tab]}
            </TabsTriggerPrimitive>
          ))}
        </TabsListPrimitive>
      </div>

      <div
        ref={viewportRef}
        data-dragging={dragging}
        className="cursor-grab overflow-hidden data-[dragging=true]:cursor-grabbing data-[dragging=true]:select-none"
      >
        <div
          className={cn(
            'flex touch-pan-y items-start transition-[height] duration-300 ease-out',
            PROJECT_TAB_PANE_GAP_CLASS
          )}
        >
          {availableTabs.map((tab) => (
            <div
              key={tab}
              role="tabpanel"
              id={panelId(tab)}
              aria-labelledby={tabId(tab)}
              aria-hidden={tab !== value}
              inert={tab !== value}
              className="min-w-0 flex-[0_0_100%]"
            >
              {renderBlock(tab)}
            </div>
          ))}
        </div>
      </div>
    </TabsPrimitive>
  );
}
