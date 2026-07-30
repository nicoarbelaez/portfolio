'use client';

import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger
} from '@/components/animate-ui/components/animate/tabs';
import { cn } from '@/lib/utils';

interface ProjectDetailTabsProps {
  overviewHtml: string | null;
  technicalHtml: string | null;
  overviewMissingTranslation: boolean;
  technicalMissingTranslation: boolean;
  labels: {
    overview: string;
    technical: string;
    missingTranslation: string;
    emptyOverview: string;
  };
}

function TranslationBadge({ show, label }: { show: boolean; label: string }) {
  if (!show) return null;
  return (
    <Badge variant="secondary" className="not-typeset mb-4">
      {label}
    </Badge>
  );
}

function MarkdownPanel({
  html,
  emptyLabel,
  missingTranslation,
  missingLabel,
  preset = 'typeset-article'
}: {
  html: string | null;
  emptyLabel: string;
  missingTranslation: boolean;
  missingLabel: string;
  preset?: 'typeset-article' | 'typeset-docs';
}) {
  return (
    <div className="space-y-3">
      <TranslationBadge show={missingTranslation} label={missingLabel} />
      {html ? (
        <div className={cn('typeset', preset)} dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p className="text-muted-foreground text-sm">{emptyLabel}</p>
      )}
    </div>
  );
}

export function ProjectDetailTabs({
  overviewHtml,
  technicalHtml,
  overviewMissingTranslation,
  technicalMissingTranslation,
  labels
}: ProjectDetailTabsProps) {
  if (!technicalHtml) {
    return (
      <MarkdownPanel
        html={overviewHtml}
        emptyLabel={labels.emptyOverview}
        missingTranslation={overviewMissingTranslation}
        missingLabel={labels.missingTranslation}
      />
    );
  }

  return (
    <Tabs defaultValue="overview" className="not-typeset w-full">
      <TabsList>
        <TabsTrigger value="overview">{labels.overview}</TabsTrigger>
        <TabsTrigger value="technical">{labels.technical}</TabsTrigger>
      </TabsList>
      <TabsContents className="mt-6">
        <TabsContent value="overview">
          <MarkdownPanel
            html={overviewHtml}
            emptyLabel={labels.emptyOverview}
            missingTranslation={overviewMissingTranslation}
            missingLabel={labels.missingTranslation}
          />
        </TabsContent>
        <TabsContent value="technical">
          <MarkdownPanel
            html={technicalHtml}
            emptyLabel={labels.emptyOverview}
            missingTranslation={technicalMissingTranslation}
            missingLabel={labels.missingTranslation}
            preset="typeset-docs"
          />
        </TabsContent>
      </TabsContents>
    </Tabs>
  );
}
