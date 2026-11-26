import { PROJECT_JSON_LD_TYPE } from '@/features/projects/constants/content';
import type { ProjectView } from '@/features/projects/types/project';
import type { LocaleKey } from '@/i18n/ui';

const SCHEMA_CONTEXT = 'https://schema.org';
const PERSON_TYPE = 'Person';

interface ProjectJsonLdInput {
  project: ProjectView;
  lang: LocaleKey;
  /** Absolute canonical URL of the detail page. */
  url: string;
  /** Absolute URL of the cover/OG image. */
  image: string;
  authorName: string;
}

/** schema.org `CreativeWork` for a project detail page (keywords feed ATS/SEO crawlers). */
export function buildProjectJsonLd({ project, lang, url, image, authorName }: ProjectJsonLdInput) {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': PROJECT_JSON_LD_TYPE,
    name: project.title,
    headline: project.tagline,
    description: project.description,
    keywords: project.keywords.join(', '),
    inLanguage: lang,
    url,
    image,
    dateCreated: project.timeline.periods[0]?.start,
    author: { '@type': PERSON_TYPE, name: authorName },
    contributor: project.team.map((member) => ({
      '@type': PERSON_TYPE,
      name: member.name,
      jobTitle: member.role,
      ...(member.url ? { url: member.url } : {})
    }))
  };
}
