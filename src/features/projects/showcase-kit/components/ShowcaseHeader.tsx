import type { ReactNode } from 'react';

interface ShowcaseHeaderProps {
  logo: ReactNode;
  name: string;
  tagline: string;
  headingId: string;
}

/** Logo slot on the left, product name (`h3`) and tagline on the right. */
export function ShowcaseHeader({ logo, name, tagline, headingId }: ShowcaseHeaderProps) {
  return (
    <header className="flex items-center gap-3">
      {logo}
      <div className="min-w-0">
        <h3 id={headingId} className="font-heading text-lg font-semibold tracking-tight sm:text-xl">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm text-pretty">{tagline}</p>
      </div>
    </header>
  );
}
