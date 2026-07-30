import { ImageResponse } from '@vercel/og';
import type { APIRoute, GetStaticPaths } from 'astro';
import { PERSONAL_INFO } from '@/constants/constants';
import { enrichProjects } from '@/features/projects/services/enrich';
import { locales, type LocaleKey } from '@/i18n/ui';
import { useTranslations } from '@/i18n/utils';
import { getAvatarDataUri, getLogoAsset } from '@/lib/og/assets';
import { ogTemplate, type OgMedia } from '@/lib/og/template';

const SITE_HOST = 'arbelaeznicolas.dev';
const DESCRIPTION_MAX_LENGTH = 140;

function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

interface OgPathProps {
  kicker: string;
  title: string;
  description: string;
  media: OgMedia | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const langs = Object.keys(locales) as LocaleKey[];

  const pathsByLang = await Promise.all(
    langs.map(async (lang) => {
      const t = useTranslations(lang);
      const projects = await enrichProjects(lang);

      const projectPaths = projects.map((project) => ({
        params: { lang, slug: project.slug },
        props: {
          kicker: t(`projects.section.${project.section}`),
          title: project.title,
          description: truncate(project.description ?? '', DESCRIPTION_MAX_LENGTH),
          media: project.image.src ? { kind: 'cover' as const, src: project.image.src } : null
        } satisfies OgPathProps
      }));

      const homePath = {
        params: { lang, slug: 'home' },
        props: {
          kicker: t('schema.jobTitle'),
          title: PERSONAL_INFO.FULL_NAME,
          description: truncate(t('schema.description'), DESCRIPTION_MAX_LENGTH),
          media: { kind: 'avatar' as const, src: getAvatarDataUri() }
        } satisfies OgPathProps
      };

      return [homePath, ...projectPaths];
    })
  );

  return pathsByLang.flat();
};

export const GET: APIRoute = async ({ props }) => {
  const { kicker, title, description, media } = props as OgPathProps;

  return new ImageResponse(
    ogTemplate({
      kicker,
      title,
      description,
      media,
      brandName: PERSONAL_INFO.BRAND_NAME,
      siteHost: SITE_HOST,
      logo: getLogoAsset()
    }),
    { width: 1200, height: 630 }
  );
};
