import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label: string;
  className?: string;
}

/**
 * Marker-on-separator section header: Badge pill centered on a horizontal rule.
 */
export function SectionHeader({ label, className }: SectionHeaderProps) {
  return (
    <div className={cn('relative flex items-center justify-center py-2', className)}>
      <Separator className="absolute inset-x-0 top-1/2" />
      <Badge
        variant="default"
        className="bg-foreground text-background hover:bg-foreground relative z-10 rounded-full px-3 py-1 text-xs tracking-wide"
      >
        {label}
      </Badge>
    </div>
  );
}
