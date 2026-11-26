'use client';

import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger
} from '@/components/animate-ui/components/animate/tabs';
import { cn } from '@/lib/utils';

type TypesetPreset = 'typeset-article' | 'typeset-docs';

interface ProjectDetailTabsProps {
  /** Rendered overview MDX (Astro slot `overview`). */
  overview?: ReactNode;
  /** Rendered technical MDX (Astro slot `technical`); without it the tabs collapse to the overview. */
  technical?: ReactNode;
  overviewMissingTranslation: boolean;
  technicalMissingTranslation: boolean;
  labels: {
    overview: string;
    technical: string;
    missingTranslation: string;
    emptyOverview: string;
  };
}

function DocPanel({
  children,
  emptyLabel,
  missingTranslation,
  missingLabel,
  preset = 'typeset-article'
}: {
  children?: ReactNode;
  emptyLabel: string;
  missingTranslation: boolean;
  missingLabel: string;
  preset?: TypesetPreset;
}) {
  return (
    <div className="space-y-3">
      {missingTranslation ? (
        <Badge variant="secondary" className="not-typeset mb-4">
          {missingLabel}
        </Badge>
      ) : null}
      {children ? (
        <div className={cn('typeset', preset)}>{children}</div>
      ) : (
        <p className="text-muted-foreground text-sm">{emptyLabel}</p>
      )}
    </div>
  );
}

/**
 * Overview / Technical tabs for the project detail page. The MDX bodies arrive pre-rendered
 * as Astro slots, so no HTML strings cross the island boundary.
 */
export function ProjectDetailTabs({
  overview,
  technical,
  overviewMissingTranslation,
  technicalMissingTranslation,
  labels
}: ProjectDetailTabsProps) {
  const overviewPanel = (
    <DocPanel
      emptyLabel={labels.emptyOverview}
      missingTranslation={overviewMissingTranslation}
      missingLabel={labels.missingTranslation}
    >
      {overview}
    </DocPanel>
  );

  if (!technical) return overviewPanel;

  return (
    <Tabs defaultValue="overview" className="not-typeset w-full">
      <TabsList>
        <TabsTrigger value="overview">{labels.overview}</TabsTrigger>
        <TabsTrigger value="technical">{labels.technical}</TabsTrigger>
      </TabsList>
      <TabsContents className="mt-6">
        <TabsContent value="overview">{overviewPanel}</TabsContent>
        <TabsContent value="technical">
          <DocPanel
            emptyLabel={labels.emptyOverview}
            missingTranslation={technicalMissingTranslation}
            missingLabel={labels.missingTranslation}
            preset="typeset-docs"
          >
            {technical}
          </DocPanel>
        </TabsContent>
      </TabsContents>
    </Tabs>
  );
}
