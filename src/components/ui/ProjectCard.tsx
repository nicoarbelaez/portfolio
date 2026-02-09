import { ArrowRight } from '@/icons/ArrowRight';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';
import { Repository } from '@/icons/Repository';
import { Link } from '@/icons/Link';
import { OverlayBackground } from '@/components/ui/OverlayBackground';
import { LinkHighlight } from '@/components/ui/LinkHighlight';
import { GradientDivider } from '@/components/ui/GradientDivider';
import type { GitHubRepo } from '@/types/github';
import { format } from '@formkit/tempo';
import type { LocaleKey } from '@/i18n/ui';

interface ProjectCardProps {
  lang: LocaleKey;
  href: string;
  slug: string;
  img?: string;
  title: string;
  stack?: string[];
  description: string;
  repoUrl?: string;
  demoUrl?: string;
  githubData?: GitHubRepo | null;
  date?: Date;
  showRepo?: boolean;
  showDivider?: boolean;
  translations: {
    projectCode: string;
    projectDemo: string;
  };
}

export function ProjectCard({
  lang,
  slug,
  img,
  title,
  stack: technologies,
  description,
  href,
  repoUrl,
  demoUrl,
  githubData,
  date,
  showRepo,
  showDivider = true,
  translations
}: ProjectCardProps) {
  const stack = technologies?.sort();
  const isFork = githubData?.fork ?? false;

  const dateCreated = date ? date : githubData ? new Date(githubData.created_at) : new Date();
  let dateCreateRepo = format(dateCreated, 'MMM YYYY', lang);

  return (
    <article
      class="group relative flex scroll-mt-18 flex-col gap-y-4 md:justify-between md:gap-x-3"
      id={slug}
    >
      <OverlayBackground />
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="order-1 flex flex-col md:justify-between">
          <div class="flex flex-col gap-y-1">
            <h3 class="font-medium transition-colors duration-200 group-hover:text-teal-300">
              <a href={href}>
                <LinkHighlight />
                {title}
                <ArrowRight class="size-4 transition group-hover:translate-x-1" />
              </a>
            </h3>

            <p class="-z-10 text-sm">{description}</p>
          </div>
        </div>

        <div class="order-2 w-fit md:-z-10">
          <a href={href} class="relative w-fit">
            <ImagePlaceholder
              transitionName={`img-${slug}`}
              src={img || ''}
              alt={`Screenshot of ${title}`}
              class="aspect-[16/9] h-32 rounded-md border-2 border-slate-200/10 object-cover group-hover:border-slate-200/30 hover:border-slate-200/30 md:h-auto md:w-46 md:max-w-56"
            />
            <span class="animate-slide-in-right absolute -right-4 -bottom-2 me-2 w-fit rounded-sm bg-slate-950/90 px-2.5 py-0.5 text-xs font-medium text-slate-500 ring-1 ring-slate-500 ring-inset">
              {dateCreateRepo.toUpperCase()}
            </span>
            {isFork && (
              <span class="animate-slide-in-right absolute -right-4 bottom-3.5 me-2 w-fit rounded-sm bg-slate-950/90 px-2.5 py-0.5 text-xs font-medium text-green-400 ring-1 ring-green-400 ring-inset">
                Fork
              </span>
            )}
          </a>
        </div>
      </div>

      <div class="flex flex-col gap-y-4">
        {stack && (
          <div class="-z-10 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        )}
        <div class="flex flex-wrap gap-3">
          {repoUrl && showRepo && (
            <LinkButton href={repoUrl} icon={Repository} text={translations.projectCode} />
          )}
          {demoUrl && <LinkButton href={demoUrl} icon={Link} text={translations.projectDemo} />}
        </div>
      </div>
      {showDivider && <GradientDivider class="mt-2 block md:hidden" noGradient={true} />}
    </article>
  );
}
