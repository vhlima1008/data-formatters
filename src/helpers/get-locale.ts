const DEFAULT_LOCALE = 'en-US';

type GetLocaleOptions = {
  locale?: string;
};

export const getLocale = (options?: GetLocaleOptions): string => {
  if (options?.locale) return options.locale;

  if (typeof navigator !== 'undefined') {
    if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
      return navigator.languages[0];
    }

    if (navigator.language) {
      return navigator.language;
    }
  }

  return DEFAULT_LOCALE;
};