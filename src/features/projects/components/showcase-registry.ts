import { MecateoShowcase } from '@/features/projects/apps/mecateo/MecateoShowcase';
import { DanysTortasShowcase } from '@/features/projects/clients/danystortas/DanysTortasShowcase';
import { DefiShowcase } from '@/features/projects/clients/defi/DefiShowcase';
import { SwcShowcase } from '@/features/projects/clients/swc/SwcShowcase';
import type { ProjectShowcaseComponent } from '@/features/projects/types/showcase';

/**
 * Custom landing showcase per project slug (apps and client projects).
 * Slugs without an entry fall back to the standard `ProjectCard`.
 * See `src/features/projects/README.md` for how to add or archive one.
 */
export const PROJECT_SHOWCASES: Readonly<Record<string, ProjectShowcaseComponent>> = {
  mecateo: MecateoShowcase,
  danystortas: DanysTortasShowcase,
  defi: DefiShowcase,
  swc: SwcShowcase
};
