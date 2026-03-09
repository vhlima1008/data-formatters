export const formatRelativeTime = (
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  locale = "en-US"
) => {

  const formatter = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto"
  });

  return formatter.format(value, unit);
};