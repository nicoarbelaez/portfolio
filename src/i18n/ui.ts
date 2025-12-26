type TranslationValue = string | readonly string[];

export const locales = {
  en: {
    en: 'English',
    es: 'Spanish'
  },
  es: {
    en: 'Inglés',
    es: 'Español'
  }
};

export type LocaleKey = keyof typeof locales;

export const defaultLang: LocaleKey = 'en';

const baseEs = {
  '404.cta': 'Volver al inicio',
  title: 'Portafolio',
  'action.share': 'Compartir',
  'action.back': 'Regresar',
  'action.copied': '¡Copiado!',
  'nav.about': 'Sobre mí',
  'nav.experience': 'Experiencia',
  'nav.projects': 'Projectos',
  'nav.resume': 'HV',
  'hero.professional': 'Ingeniero de sistemas - Desarrollo backend',
  'hero.description':
    'Con mas de %years-experience% años optimizando procesos y resolviendo retos complejos para ofrecer soluciones escalables que aceleran el crecimiento.',
  'hero.cta': 'Ver Proyectos',
  'hero.scroll': 'Desliza hacia arriba',
  'project.code': 'Código',
  'project.demo': 'Demo',
  'footer.text':
    'Este portafolio ha sido desarrollado con %astro% y desplegado en %vercel%. Se inspira en %inspiration1% y %inspiration2%. © %year% Todos los derechos reservados.',
  'experience.current': 'Presente',
  'experience.title': 'Experiencia Laboral',
  'schema.jobTitle': 'Ingeniero de Sistemas - Desarrollo Backend',
  'schema.description':
    'Con mas de %years-experience% años optimizando procesos y resolviendo retos complejos para ofrecer soluciones escalables que aceleran el crecimiento.',
  'schema.skills': ['Desarrollo Backend', 'Diseño de Sistemas', 'Desarrollo de APIs'],
  'tabs.general': 'General',
  'tabs.technical': 'Técnico'
} as const;

export type LabelKey = keyof typeof baseEs;

type LocaleLabels = Record<LabelKey, TranslationValue>;

export const labels = {
  es: baseEs,
  en: {
    '404.cta': 'Back to home',
    title: 'Portfolio',
    'action.share': 'Share',
    'action.back': 'Back',
    'action.copied': 'Copied!',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.resume': 'CV',
    'hero.professional': 'Systems Engineer - Backend Development',
    'hero.description':
      'With over %years-experience% years optimizing processes and tackling complex challenges to deliver scalable solutions that accelerate growth.',
    'hero.cta': 'View Projects',
    'hero.scroll': 'Swipe up',
    'project.code': 'Code',
    'project.demo': 'Live',
    'footer.text':
      'This portfolio was developed with %astro% and deployed on %vercel%. It is inspired by %inspiration1% and %inspiration2%. © %year% All rights reserved.',
    'experience.current': 'Present',
    'experience.title': 'Work Experience',
    'schema.jobTitle': 'Systems Engineer - Backend Development',
    'schema.description':
      'With over %years-experience% years optimizing processes and tackling complex challenges to deliver scalable solutions that accelerate growth.',
    'schema.skills': ['Backend Development', 'System Design', 'API Development'],
    'tabs.general': 'General',
    'tabs.technical': 'Technical'
  }
} as const satisfies Record<LocaleKey, LocaleLabels>;
