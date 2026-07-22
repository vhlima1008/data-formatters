import { getLocale } from '../helpers/get-locale';
import { isValidNumber } from '../helpers/is-valid-number';
import type { FractionDigitsOptions } from '../types/formatter-options';

const DEFAULT_FALLBACK = '—';

/**
 * Formats a number using localized digit grouping and fraction settings.
 *
 * Use this for general numeric values. The locale is resolved from
 * `options.locale`, the browser language, or the default locale.
 *
 * @param value - The numeric value to format.
 * @param options - Optional locale, fallback, and fraction digit settings.
 * @returns A localized number string, or the fallback string when `value` is not finite.
 *
 * @example
 * formatNumber(1234.56, { locale: 'en-US', maximumFractionDigits: 1 });
 * // "1,234.6"
 *
 * @example
 * formatNumber(Infinity);
 * // "—"
 */
export const formatNumber = (
  value: number,
  options: FractionDigitsOptions = {},
): string => {
  if (!isValidNumber(value)) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }

  const locale = getLocale(options);

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: options.minimumFractionDigits,
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
  }).format(value);
};

/**
 * Formats a number using localized compact notation.
 *
 * Use this for abbreviated values in dashboards, charts, or space-constrained
 * UI. The locale is resolved from `options.locale`, the browser language, or
 * the default locale.
 *
 * @param value - The numeric value to format.
 * @param options - Optional locale and fallback settings.
 * @returns A compact localized number string, or the fallback string when `value` is not finite.
 *
 * @example
 * formatCompactNumber(1500000, { locale: 'en-US' });
 * // "1.5M"
 */
export const formatCompactNumber = (
  value: number,
  options: Omit<FractionDigitsOptions, 'minimumFractionDigits' | 'maximumFractionDigits'> = {},
): string => {
  if (!isValidNumber(value)) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }

  const locale = getLocale(options);

  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};
