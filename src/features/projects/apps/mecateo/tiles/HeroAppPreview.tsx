import bannerImg from '@/assets/apps/mecateo/menu/banner.webp';
import logoImg from '@/assets/apps/mecateo/menu/terremoto-logo.webp';
import type { MecateoMenuItem } from '@/features/projects/apps/mecateo/constants';
import { MECATEO_MENU_URL } from '@/features/projects/apps/mecateo/constants';
import { cn } from '@/lib/utils';

interface HeroAppPreviewProps {
  categories: readonly string[];
  items: readonly MecateoMenuItem[];
  label: string;
}

/** Mini live-menu preview inspired by Fast Food Terremoto digital menu. */
export function HeroAppPreview({ categories, items, label }: HeroAppPreviewProps) {
  const previewItems = items.slice(0, 3);

  return (
    <a
      href={MECATEO_MENU_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative mx-auto block w-full max-w-[13rem] shrink-0 sm:max-w-[11.5rem]',
        'focus-visible:ring-ring rounded-2xl focus-visible:ring-2 focus-visible:outline-none'
      )}
      aria-label={label}
    >
      <div
        className={cn(
          'bg-background border-border/40 overflow-hidden rounded-2xl border shadow-lg',
          'transition-transform duration-200 group-hover:-translate-y-0.5'
        )}
      >
        <div className="relative aspect-[2/1] overflow-hidden">
          <img
            src={bannerImg.src}
            alt=""
            width={bannerImg.width}
            height={bannerImg.height}
            className="size-full object-cover"
            decoding="async"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <img
            src={logoImg.src}
            alt=""
            width={36}
            height={36}
            className="absolute bottom-1.5 left-1.5 size-8 rounded-full ring-1 ring-white/40"
            decoding="async"
            aria-hidden="true"
          />
        </div>

        <div className="flex gap-1 overflow-hidden px-2 py-1.5">
          {categories.slice(0, 4).map((category) => (
            <span
              key={category}
              className="bg-muted text-muted-foreground shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-medium"
            >
              {category}
            </span>
          ))}
        </div>

        <ul className="space-y-1.5 px-2 pb-2">
          {previewItems.map((item) => (
            <li key={item.name} className="flex items-center gap-1.5">
              <img
                src={item.imageSrc}
                alt=""
                width={28}
                height={28}
                className="size-7 shrink-0 rounded-md object-cover"
                decoding="async"
                aria-hidden="true"
              />
              <span className="truncate text-[10px] leading-tight font-medium">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}
