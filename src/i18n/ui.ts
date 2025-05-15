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
    "nav.resume": "HV",
    "hero.professional": "Ingeniero de sistemas - Desarrollo backend",
    "hero.description":
      "Con mas de 2 años optimizando procesos y resolviendo retos complejos para ofrecer soluciones escalables que aceleran el crecimiento.",
  },
  en: {
    title: "Portfolio",
    "action.back": "Back",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.resume": "CV",
    "hero.professional": "Systems Engineer - Backend Development",
    "hero.description":
      "With over 2 years optimizing processes and tackling complex challenges to deliver scalable solutions that accelerate growth.",
  },
};
