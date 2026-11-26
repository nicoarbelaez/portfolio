import {
  DEFAULT_PROJECT_MARK,
  PROJECT_MARKS,
  PROJECT_MARK_SIZES,
  type ProjectMarkSize
} from '@/features/projects/constants/project-marks';
import type { ProjectMarkDefinition } from '@/features/projects/types/project-mark';
import type { ShowcaseIcon } from '@/features/projects/showcase-kit/types/showcase-kit';
import { cn } from '@/lib/utils';

interface ProjectMarkProps {
  /** Project slug as registered in `PROJECT_MARKS`. */
  slug: string;
  size?: ProjectMarkSize;
  className?: string;
}

interface MarkTileProps {
  mark: ProjectMarkDefinition;
  size: ProjectMarkSize;
  className?: string;
}

function MarkTile({ mark, size, className }: MarkTileProps) {
  const { box, glyph, px } = PROJECT_MARK_SIZES[size];

  if (mark.kind === 'icon') {
    const Icon = mark.icon;
    return (
      <span
        aria-hidden="true"
        className={cn(
          'bg-primary/10 text-primary border-primary/30 inline-flex shrink-0 items-center justify-center border',
          box,
          className
        )}
      >
        <Icon className={glyph} aria-hidden={true} />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        'border-foreground/15 inline-flex shrink-0 items-center justify-center overflow-hidden border',
        mark.plate === 'white' ? 'bg-white p-1' : 'bg-transparent',
        box,
        className
      )}
    >
      <img
        src={mark.image.src}
        alt=""
        width={px}
        height={px}
        loading="lazy"
        decoding="async"
        className="size-full object-contain"
      />
    </span>
  );
}

/**
 * Identity mark of a project (brand artwork or Lucide icon) on a tile with consistent radius and
 * border. Decorative: the project title always sits next to it.
 */
export function ProjectMark({ slug, size = 'md', className }: ProjectMarkProps) {
  return (
    <MarkTile
      mark={PROJECT_MARKS[slug] ?? DEFAULT_PROJECT_MARK}
      size={size}
      className={className}
    />
  );
}

/**
 * Legacy client-showcase mark built from an explicit icon. Prefer `ProjectMark` with the slug so
 * the registry stays the single source of truth.
 */
export function ClientMark({ icon }: { icon: ShowcaseIcon }) {
  return <MarkTile mark={{ kind: 'icon', icon }} size="md" />;
}
