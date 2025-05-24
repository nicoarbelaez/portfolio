import { getYearsSince } from '@/utils/date';

type PlaceholderFunction = (key: string) => string;

export const PLACEHOLDERS: Record<string, PlaceholderFunction> = {
  '%years-experience%': () => getYearsSince('2023-01-01').toString(),
  '%year%': () => new Date().getFullYear().toString()
};

export const replacePlaceholders = (text: string): string => {
  return Object.entries(PLACEHOLDERS).reduce((result, [placeholder, replacer]) => {
    return result.replace(placeholder, replacer(placeholder));
  }, text);
};
