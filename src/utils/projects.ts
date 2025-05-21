import { getCollection, getEntry } from 'astro:content';

const cleanSlug = (slug: string, lang: string): string => slug.replace(`${lang}/`, '');

export const getRepoUrl = (repoUrl: string | undefined, slug: string) => {
  if (repoUrl === '') return undefined;
  return repoUrl || `https://github.com/nicoarbelaez/${slug}`;
};

export const getImagePath = (screenshot: string | undefined, slug: string): string => {
  return screenshot ? screenshot : `/img/projects/${slug}.webp`;
};

export const fetchProjectsByLanguage = async (lang: string) => {
  const projects = await getCollection('projects', ({ id }) => id.startsWith(`${lang}/`));

  return projects.map((project) => ({
    ...project,
    slug: cleanSlug(project.slug, lang)
  }));
};

export const attachMetaToProjects = async (
  projects: Awaited<ReturnType<typeof fetchProjectsByLanguage>>
) => {
  return Promise.all(
    projects.map(async (project) => {
      const metaId = project.data.meta.id;
      const metaCollection = project.data.meta.collection;
      const metaEntry = await getEntry(metaCollection, metaId);

      if (!metaEntry) {
        throw new Error(`Metadata not found for project "${project.id}"`);
      }

      return {
        ...project,
        data: {
          ...project.data,
          ...metaEntry.data
        }
      };
    })
  );
};

export const getProjectsByLanguage = async (lang: string) => {
  const projects = await fetchProjectsByLanguage(lang);
  const projectsWithMeta = await attachMetaToProjects(projects);
  return projectsWithMeta;
};

export type Projects = Awaited<ReturnType<typeof getProjectsByLanguage>>;
export type Project = Projects[number];
