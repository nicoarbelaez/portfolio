import { getCollection } from 'astro:content';

const cleanSlug = (slug: string, lang: string): string => {
  return slug.replace(`${lang}/`, '');
};

export const getProjectsByLanguage = async (lang: string) => {
  const projects = await getCollection('projects', ({ id }) => {
    return id.startsWith(`${lang}/`);
  });
  return projects.map((project) => ({
    ...project,
    slug: cleanSlug(project.slug, lang)
  }));
};
