import { Tabs, TabList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { ComponentChildren } from 'preact';

interface SectionData {
  title: string;
  disabled: boolean;
}

interface Props {
  className?: string;
  panelClassName?: string;
  generalData: SectionData;
  technicalData: SectionData;
  general?: ComponentChildren;
  technical?: ComponentChildren;
}

export function ProjectContentTab({
  className,
  panelClassName,
  generalData,
  technicalData,
  general,
  technical
}: Props) {
  return (
    <Tabs className={className} sectionId="content" defaultValue="general">
      <TabList>
        <TabsTrigger value="general" disabled={generalData.disabled}>
          {generalData.title}
        </TabsTrigger>
        <TabsTrigger value="technical" disabled={technicalData.disabled}>
          {technicalData.title}
        </TabsTrigger>
      </TabList>

      <TabsContent value="general" className={panelClassName}>
        {general}
      </TabsContent>

      <TabsContent value="technical" className={panelClassName}>
        {technical}
      </TabsContent>
    </Tabs>
  );
}
