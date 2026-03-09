import { getLocale } from "../helpers/get-locale";

export const formatDateTime = (
  value: Date | string | number,
  options?: Intl.DateTimeFormatOptions & { locale?: string }
) => {

  const date = new Date(value);

  const locale = getLocale(options);

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
    ...options
  }).format(date);
};