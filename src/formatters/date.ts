import { getLocale } from "../helpers/get-locale";

export const formatDate = (
  value: Date | string | number,
  options?: Intl.DateTimeFormatOptions & { locale?: string }
): string => {

  const date = new Date(value);

  const locale = getLocale(options);

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...options
  }).format(date);
};