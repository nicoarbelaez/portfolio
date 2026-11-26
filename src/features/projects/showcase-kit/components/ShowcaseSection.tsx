import type { ReactNode } from 'react';
import { ShowcaseHeader } from '@/features/projects/showcase-kit/components/ShowcaseHeader';
import { SHOWCASE_GRID_CLASS } from '@/features/projects/showcase-kit/constants/showcase-layout';
import { ThemeProvider } from '@/features/theme/components/ThemeProvider';

interface ShowcaseSectionProps {
  /** Unique id for the `h3`; the section is labelled by it. */
  headingId: string;
  name: string;
  tagline: string;
  /** Decorative brand mark rendered left of the name. */
  logo: ReactNode;
  /** Tiles (`ShowcaseTile`), laid out on the 3-column bento grid. */
  children: ReactNode;
}

/**
 * Root of a client showcase: mounts the theme provider once, labels the section and lays
 * tiles on the bento grid. The page provides the parent `h2`; the product name is the `h3`.
 */
export function ShowcaseSection({
  headingId,
  name,
  tagline,
  logo,
  children
}: ShowcaseSectionProps) {
  return (
    <ThemeProvider>
      <section aria-labelledby={headingId} className="space-y-6">
        <ShowcaseHeader logo={logo} name={name} tagline={tagline} headingId={headingId} />
        <div className={SHOWCASE_GRID_CLASS}>{children}</div>
      </section>
    </ThemeProvider>
  );
}
