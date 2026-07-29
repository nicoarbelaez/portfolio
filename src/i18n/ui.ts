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
  'nav.projects': 'Proyectos',
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
    'Con más de %years-experience% años desarrollo soluciones de inteligencia artificial, agentes autónomos, automatización de procesos y plataformas empresariales escalables que impulsan la eficiencia, las operaciones y el crecimiento.',
  'hero.cta': 'Ver experiencia',
  'hero.scroll': 'Desliza hacia arriba',
  'footer.text':
    'Este portafolio ha sido desarrollado con %astro% y desplegado en %vercel%. Se inspira en %inspiration1% y %inspiration2%. © %year% Todos los derechos reservados.',
  'experience.current': 'Presente',
  'experience.title': 'Experiencia Laboral',
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
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
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
      'With over %years-experience% years building AI solutions, autonomous agents, process automation systems, and scalable enterprise platforms that drive operational efficiency and business growth.',
    'hero.cta': 'View experience',
    'hero.scroll': 'Swipe up',
    'footer.text':
      'This portfolio was developed with %astro% and deployed on %vercel%. It is inspired by %inspiration1% and %inspiration2%. © %year% All rights reserved.',
    'experience.current': 'Present',
    'experience.title': 'Work Experience',
    'schema.jobTitle': 'Systems Engineer - Backend Development',
    'schema.description':
      'With over %years-experience% years optimizing processes and tackling complex challenges to deliver scalable solutions that accelerate growth.',
    'schema.skills': ['Backend Development', 'System Design', 'API Development']
  }
} as const satisfies Record<LocaleKey, LocaleLabels>;
