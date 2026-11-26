import type { ShowcaseIcon } from '@/features/projects/showcase-kit/types/showcase-kit';

/** Token-based brand mark for client showcases: an icon on a soft primary plate. */
export function ClientMark({ icon: Icon }: { icon: ShowcaseIcon }) {
  return (
    <span
      aria-hidden="true"
      className="bg-primary/10 text-primary border-primary/30 inline-flex size-10 shrink-0 items-center justify-center rounded-lg border"
    >
      <Icon className="size-5" aria-hidden={true} />
    </span>
  );
}
