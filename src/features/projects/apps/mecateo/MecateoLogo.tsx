import { ProjectMark } from '@/features/projects/clients/shared/components/ClientMark';

interface MecateoLogoProps {
  className?: string;
}

/** Decorative Mecateo brand mark (current NFC + agents brand), see `PROJECT_MARKS`. */
export function MecateoLogo({ className }: MecateoLogoProps) {
  return <ProjectMark slug="mecateo" className={className} />;
}
