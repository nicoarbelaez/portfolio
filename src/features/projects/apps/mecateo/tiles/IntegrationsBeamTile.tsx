'use client';

import { useRef, type RefObject } from 'react';
import { Bot, QrCode, Share2, Smartphone } from 'lucide-react';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { DotPattern } from '@/components/ui/dot-pattern';
import { BreBLogo } from '@/features/projects/apps/mecateo/BreBLogo';
import { MecateoMagicTile } from '@/features/projects/apps/mecateo/MecateoMagicTile';
import { cn } from '@/lib/utils';

interface IntegrationsBeamTileProps {
  title: string;
  description: string;
}

function Node({
  nodeRef,
  className,
  children,
  label
}: {
  nodeRef: RefObject<HTMLDivElement | null>;
  className?: string;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div
      ref={nodeRef}
      className={cn(
        'bg-background z-10 flex size-11 items-center justify-center overflow-hidden rounded-full',
        // Light: stronger opposite-tone edge so logo nodes read on light surfaces.
        'border-foreground/20 dark:border-border/50 border shadow-sm',
        className
      )}
      aria-label={label}
    >
      {children}
    </div>
  );
}

/** Ecosystem tile: QR / WhatsApp / AI / Bre-B + Dot Pattern background. */
export function IntegrationsBeamTile({ title, description }: IntegrationsBeamTileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const waRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const payRef = useRef<HTMLDivElement>(null);

  return (
    <MecateoMagicTile className="col-span-1 min-h-80 md:col-span-2 md:min-h-0">
      <div
        ref={containerRef}
        className="relative z-40 flex min-h-[12rem] flex-1 items-center justify-center overflow-hidden p-6"
      >
        <DotPattern
          width={18}
          height={18}
          cr={1}
          className={cn(
            'text-foreground/25',
            '[mask-image:radial-gradient(280px_circle_at_center,white,transparent)]'
          )}
        />

        <div className="relative flex w-full max-w-md items-center justify-between px-2">
          <div className="flex flex-col gap-6">
            <Node nodeRef={qrRef} label="QR menu">
              <QrCode className="size-4" aria-hidden="true" />
            </Node>
            <Node nodeRef={waRef} label="WhatsApp">
              <Smartphone className="size-4" aria-hidden="true" />
            </Node>
          </div>

          <Node nodeRef={hubRef} label="Mecateo" className="border-primary/40 size-14">
            <Share2 className="text-primary size-5" aria-hidden="true" />
          </Node>

          <div className="flex flex-col gap-6">
            <Node nodeRef={aiRef} label="AI agent">
              <Bot className="size-4" aria-hidden="true" />
            </Node>
            <Node
              nodeRef={payRef}
              label="Bre-B payments"
              className="h-9 w-[4.25rem] rounded-lg px-1.5"
            >
              <BreBLogo className="w-full" label="" />
            </Node>
          </div>
        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={qrRef}
          toRef={hubRef}
          curvature={-40}
          gradientStartColor="#84cc16"
          gradientStopColor="#58f779"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={waRef}
          toRef={hubRef}
          curvature={40}
          gradientStartColor="#84cc16"
          gradientStopColor="#58f779"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={hubRef}
          toRef={aiRef}
          curvature={-40}
          reverse
          gradientStartColor="#84cc16"
          gradientStopColor="#58f779"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={hubRef}
          toRef={payRef}
          curvature={40}
          reverse
          gradientStartColor="#22d3ee"
          gradientStopColor="#84cc16"
        />
      </div>

      <div className="border-border/60 bg-card/90 relative z-40 space-y-1 border-t p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Share2 className="text-foreground size-5 shrink-0" aria-hidden="true" />
          <h4 className="font-heading text-base font-semibold">{title}</h4>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
      </div>
    </MecateoMagicTile>
  );
}
