export type LocaleKey = keyof typeof locales;

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

export const defaultLang: LocaleKey = 'en';

export const labels = {
  es: {
    '404.cta': 'Volver al inicio',
    title: 'Portafolio',
    'action.back': 'Regresar',
    'nav.about': 'Sobre mí',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Projectos',
    'nav.resume': 'HV',
    'hero.professional': 'Ingeniero de sistemas - Desarrollo backend',
    'hero.description':
      'Con mas de %years-experience% años optimizando procesos y resolviendo retos complejos para ofrecer soluciones escalables que aceleran el crecimiento.',
    'hero.cta': 'Ver Proyectos',
    'project.code': 'Código',
    'project.demo': 'Demo',
    'footer.text':
      'Este portafolio ha sido desarrollado con %astro% y desplegado en %vercel%. Se inspira en %inspiration1% y %inspiration2%. © %year% Todos los derechos reservados.',
    'experience.current': 'Presente',
    'experience.title': 'Experiencia Laboral',
    'schema.jobTitle': 'Ingeniero de Sistemas - Desarrollo Backend',
    'schema.skills': ['Desarrollo Backend', 'Diseño de Sistemas', 'Desarrollo de APIs']
  },
  en: {
    '404.cta': 'Back to home',
    title: 'Portfolio',
    'action.back': 'Back',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.resume': 'CV',
    'hero.professional': 'Systems Engineer - Backend Development',
    'hero.description':
      'With over %years-experience% years optimizing processes and tackling complex challenges to deliver scalable solutions that accelerate growth.',
    'hero.cta': 'View Projects',
    'project.code': 'Code',
    'project.demo': 'Live',
    'footer.text':
      'This portfolio was developed with %astro% and deployed on %vercel%. It is inspired by %inspiration1% and %inspiration2%. © %year% All rights reserved.',
    'experience.current': 'Present',
    'experience.title': 'Work Experience',
    'schema.jobTitle': 'Systems Engineer - Backend Development',
    'schema.skills': ['Backend Development', 'System Design', 'API Development']
  }
};
