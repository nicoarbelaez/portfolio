import { MecateoLogo } from '@/features/projects/apps/mecateo/MecateoLogo';

interface MecateoHeaderProps {
  name: string;
  tagline: string;
  headingId: string;
}

/** Logo left + name/tagline right (product header above the bento). */
export function MecateoHeader({ name, tagline, headingId }: MecateoHeaderProps) {
  return (
    <header className="flex items-center gap-3">
      <MecateoLogo />
      <div className="min-w-0">
        <h3 id={headingId} className="font-heading text-lg font-semibold tracking-tight sm:text-xl">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm text-pretty">{tagline}</p>
      </div>
    </header>
  );
}
