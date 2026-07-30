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
  'nav.projects': 'Proyectos',
  'nav.apps': 'Apps',
  'nav.experience': 'Experiencia',
  'nav.contact': 'Contacto',
  'nav.resume': 'HV',
  'nav.menu': 'Abrir menú',
  'nav.menuClose': 'Cerrar menú',
  'nav.language': 'Idioma',
  'nav.skip': 'Saltar al contenido',
  'footer.rights': 'Todos los derechos reservados.',
  'footer.theme': 'Cambiar tema',
  'hero.greeting': 'Hola, soy Nicolas',
  'hero.avatarAlt':
    'Retrato de Nicolas Arbelaez, ingeniero de sistemas con foco en desarrollo backend',
  'hero.description':
    'Con más de %years-experience% años desarrollando soluciones de IA, agentes inteligentes y automatización para crear sistemas escalables que impulsan el crecimiento.',
  'hero.cta': 'Ver experiencia',
  'hero.resume': 'Ver HV',
  'hero.scroll': 'Desliza hacia arriba',
  'social.nav': 'Redes sociales',
  'footer.text':
    'Este portafolio ha sido desarrollado con %astro% y desplegado en %vercel%. Se inspira en %inspiration1% y %inspiration2%. © %year% Todos los derechos reservados.',
  'experience.current': 'Presente',
  'experience.skills': 'Habilidades',
  'experience.title': 'Experiencia Laboral',
  'projects.section.client': 'Proyectos para clientes',
  'projects.section.apps': 'Apps',
  'projects.section.side': 'Proyectos personales',
  'projects.cta.site': 'Website',
  'projects.cta.repo': 'Source',
  'projects.cta.details': 'Ver detalles',
  'projects.timeline.present': 'Presente',
  'projects.headline': 'Mira mi trabajo reciente',
  'projects.subtext':
    'Proyectos para clientes, apps en producción y experimentos — con demos, código y documentación técnica.',
  'projects.tab.overview': 'Overview',
  'projects.tab.technical': 'Technical',
  'projects.badge.missingTranslation': 'Sin traducción para este idioma',
  'projects.empty.overview': 'Aún no hay overview disponible.',
  'projects.nav': 'Mis proyectos',
  'projects.back': 'Volver a proyectos',
  'schema.jobTitle': 'Ingeniero de Sistemas - Desarrollo Backend',
  'schema.description':
    'Con mas de %years-experience% años optimizando procesos y resolviendo retos complejos para ofrecer soluciones escalables que aceleran el crecimiento.',
  'schema.skills': ['Desarrollo Backend', 'Diseño de Sistemas', 'Desarrollo de APIs']
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
    'nav.projects': 'Projects',
    'nav.apps': 'Apps',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'nav.resume': 'CV',
    'nav.menu': 'Open menu',
    'nav.menuClose': 'Close menu',
    'nav.language': 'Language',
    'nav.skip': 'Skip to content',
    'footer.rights': 'All rights reserved.',
    'footer.theme': 'Toggle theme',
    'hero.greeting': "Hi, I'm Nicolas",
    'hero.avatarAlt':
      'Portrait of Nicolas Arbelaez, systems engineer focused on backend development',
    'hero.description':
      'With over %years-experience% years building AI solutions, intelligent agents, and automation systems that drive scalable growth.',
    'hero.cta': 'View experience',
    'hero.resume': 'View resume',
    'hero.scroll': 'Swipe up',
    'social.nav': 'Social links',
    'footer.text':
      'This portfolio was developed with %astro% and deployed on %vercel%. It is inspired by %inspiration1% and %inspiration2%. © %year% All rights reserved.',
    'experience.current': 'Present',
    'experience.skills': 'Skills',
    'experience.title': 'Work Experience',
    'projects.section.client': 'Client Projects',
    'projects.section.apps': 'Apps',
    'projects.section.side': 'Side Projects',
    'projects.cta.site': 'Website',
    'projects.cta.repo': 'Source',
    'projects.cta.details': 'View details',
    'projects.timeline.present': 'Present',
    'projects.headline': 'Check out my latest work',
    'projects.subtext':
      'Client projects, shipped apps, and experiments — with demos, source, and technical docs.',
    'projects.tab.overview': 'Overview',
    'projects.tab.technical': 'Technical',
    'projects.badge.missingTranslation': 'No translation for this language',
    'projects.empty.overview': 'Overview is not available yet.',
    'projects.nav': 'My Projects',
    'projects.back': 'Back to projects',
    'schema.jobTitle': 'Systems Engineer - Backend Development',
    'schema.description':
      'With over %years-experience% years optimizing processes and tackling complex challenges to deliver scalable solutions that accelerate growth.',
    'schema.skills': ['Backend Development', 'System Design', 'API Development']
  }
} as const satisfies Record<LocaleKey, LocaleLabels>;
