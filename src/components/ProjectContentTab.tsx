import { Tabs, TabList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';
import { ImageModal } from '@/components/ui/ImageModal';

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
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const handleContentClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      const img = target as HTMLImageElement;
      setSelectedImage({ src: img.src, alt: img.alt });
    }
  };

  return (
    <>
      <Tabs className={className} sectionId="content" defaultValue="general">
        <TabList>
          <TabsTrigger value="general" disabled={generalData.disabled}>
            {generalData.title}
          </TabsTrigger>
          <TabsTrigger value="technical" disabled={technicalData.disabled}>
            {technicalData.title}
          </TabsTrigger>
        </TabList>

        <div onClick={handleContentClick}>
          <TabsContent value="general" className={panelClassName}>
            {general}
          </TabsContent>

          <TabsContent value="technical" className={panelClassName}>
            {technical}
          </TabsContent>
        </div>
      </Tabs>

      {selectedImage && (
        <ImageModal
          isOpen={true}
          onClose={() => setSelectedImage(null)}
          src={selectedImage.src}
          alt={selectedImage.alt}
        />
      )}
    </>
  );
}
