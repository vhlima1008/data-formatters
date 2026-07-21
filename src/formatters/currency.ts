import { getLocale } from '../helpers/get-locale';
import { isValidNumber } from '../helpers/is-valid-number';
import type { CurrencyFormatterOptions } from '../types/formatter-options';

const DEFAULT_FALLBACK = '—';
const DEFAULT_CURRENCY = 'USD';

/**
 * Formats a number as a localized currency value.
 *
 * Use this when you need a fixed two-decimal monetary string. The locale is
 * resolved from `options.locale`, the browser language, or the default locale.
 *
 * @param value - The numeric amount to format.
 * @param options - Optional locale, fallback, and currency code settings.
 * @returns A localized currency string, or the fallback string when `value` is not finite.
 *
 * @example
 * formatCurrency(1234.5, { locale: 'en-US', currency: 'USD' });
 * // "$1,234.50"
 *
 * @example
 * formatCurrency(Number.NaN, { fallback: 'N/A' });
 * // "N/A"
 */
export const formatCurrency = (
  value: number,
  options: CurrencyFormatterOptions = {},
): string => {
  if (!isValidNumber(value)) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }

  const locale = getLocale(options);
  const currency = options.currency ?? DEFAULT_CURRENCY;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Formats a number as a compact localized currency value.
 *
 * Use this for monetary values in dense UI areas such as charts, tables, and
 * metric cards where large values should be shortened.
 *
 * @param value - The numeric amount to format.
 * @param options - Optional locale, fallback, and currency code settings.
 * @returns A compact localized currency string, or the fallback string when `value` is not finite.
 *
 * @example
 * formatCompactCurrency(1250000, { locale: 'en-US', currency: 'USD' });
 * // "$1.3M"
 */
export const formatCompactCurrency = (
  value: number,
  options: CurrencyFormatterOptions = {},
): string => {
  if (!isValidNumber(value)) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }

  const locale = getLocale(options);
  const currency = options.currency ?? DEFAULT_CURRENCY;
  const fractionDigits = Math.abs(value) < 1000 ? 2 : 1;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
};
