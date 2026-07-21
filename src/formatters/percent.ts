import { getLocale } from '../helpers/get-locale';
import { isValidNumber } from '../helpers/is-valid-number';
import type { FractionDigitsOptions } from '../types/formatter-options';

const DEFAULT_FALLBACK = '—';

/**
 * Formats a decimal number as a localized percentage string.
 *
 * Use this when the input value is already a ratio, where `1` means 100% and
 * `0.25` means 25%. The locale is resolved from `options.locale`, the browser
 * language, or the default locale.
 *
 * @param value - The ratio to format as a percentage.
 * @param options - Optional locale, fallback, and fraction digit settings.
 * @returns A localized percentage string, or the fallback string when `value` is not finite.
 *
 * @example
 * formatPercent(0.125, { locale: 'en-US' });
 * // "12.5%"
 *
 * @example
 * formatPercent(Number.NaN);
 * // "—"
 */
export const formatPercent = (
  value: number,
  options: FractionDigitsOptions = {},
): string => {
  if (!isValidNumber(value)) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }

  const locale = getLocale(options);

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: options.minimumFractionDigits,
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
  }).format(value);
};

/**
 * Formats a decimal number as a compact localized percentage string.
 *
 * Use this for large percentage values in dense UI areas. The input value is a
 * ratio, so `12.5` is formatted as 1,250%.
 *
 * @param value - The ratio to format as a percentage.
 * @param options - Optional locale, fallback, and fraction digit settings.
 * @returns A compact localized percentage string, or the fallback string when `value` is not finite.
 *
 * @example
 * formatCompactPercent(12.5, { locale: 'en-US' });
 * // "1.3K%"
 */
export const formatCompactPercent = (
  value: number,
  options: FractionDigitsOptions = {},
): string => {
  if (!isValidNumber(value)) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }

  const locale = getLocale(options);
  const fractionDigits = Math.abs(value) < 1000 ? 2 : 1;

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
};
