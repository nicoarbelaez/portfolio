import { Tabs, TabList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { ProjectTag } from '@/types/project-tags';
import type { LocaleKey } from '@/i18n/ui';
import type { ComponentChildren } from 'preact';
import { ProjectCard } from '@/components/ui/ProjectCard';
import type { GitHubRepo } from '@/types/github';
import { getRelativeLocaleUrl } from '@/utils/astro-polyfills';

interface ProjectData {
  slug: string;
  img?: string;
  title: string;
  stack?: string[];
  description: string;
  repo_url?: string;
  demo_url?: string;
  github: GitHubRepo | null;
  show_repo?: boolean;
  date?: Date;
  tags?: string[];
}

interface ProjectsByTag {
  [tag: string]: ProjectData[];
}

interface Props {
  projectsByTag: ProjectsByTag;
  usedTags: ProjectTag[];
  defaultTab: ProjectTag;
  lang: LocaleKey;
  tagLabels: Record<ProjectTag, string>; // Pre-translated labels
  translations: {
    projectCode: string;
    projectDemo: string;
  };
  children?: ComponentChildren;
}

export function ProjectTabs({
  projectsByTag,
  usedTags,
  defaultTab,
  lang,
  tagLabels,
  translations,
}: Props) {
  return (
    <Tabs sectionId="projects" defaultValue={defaultTab}>
      <TabList className='mb-8'>
        {usedTags.map((tag) => (
          <TabsTrigger key={tag} value={tag}>
            {tagLabels[tag]}
          </TabsTrigger>
        ))}
      </TabList>

      {usedTags.map((tag) => (
        <TabsContent key={tag} value={tag}>
          <div class="flex flex-col gap-y-6 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-8">
            {projectsByTag[tag]?.map((project, index) => {
              const {
                slug,
                img,
                title,
                stack,
                description,
                repo_url,
                demo_url,
                github,
                show_repo,
                date
              } = project;
              return (
                <ProjectCard
                  key={slug}
                  lang={lang}
                  href={getRelativeLocaleUrl(lang, `/projects/${slug}`)}
                  slug={slug}
                  img={img}
                  title={title}
                  stack={stack}
                  description={description}
                  repoUrl={repo_url}
                  demoUrl={demo_url}
                  githubData={github}
                  showRepo={show_repo}
                  date={date}
                  showDivider={index !== (projectsByTag[tag]?.length || 0) - 1}
                  translations={translations}
                />
              );
            })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
