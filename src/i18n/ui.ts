export type LocaleKey = keyof typeof locales;

export const locales = {
  en: {
    en: "English",
    es: "Spanish",
  },
  es: {
    en: "Inglés",
    es: "Español",
  },
};

export const defaultLang: LocaleKey = "en";

export const labels = {
  es: {
    title: "Portafolio",
    "action.back": "Regresar",
    "nav.about": "Sobre mí",
    "nav.experience": "Experiencia",
    "nav.projects": "Projectos",
    "hero.description": "Una colección de mis proyectos y trabajos.",
  },
  en: {
    title: "Portfolio",
    "action.back": "Back",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "hero.description": "A collection of my projects and works.",
  },
};
