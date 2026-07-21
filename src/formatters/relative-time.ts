/**
 * Formats a relative time value using localized wording.
 *
 * Use this for labels such as "yesterday", "in 2 weeks", or "3 months ago".
 * Negative values represent the past, and positive values represent the future.
 *
 * @param value - The relative amount for the selected unit.
 * @param unit - The time unit, such as `"day"`, `"week"`, `"month"`, or `"year"`.
 * @param locale - The locale used by `Intl.RelativeTimeFormat`. Defaults to `"en-US"`.
 * @returns A localized relative time string.
 *
 * @example
 * formatRelativeTime(-1, 'day');
 * // "yesterday"
 *
 * @example
 * formatRelativeTime(2, 'week', 'en-US');
 * // "in 2 weeks"
 */
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
