import { getLocale } from '../helpers/get-locale';
import { isValidNumber } from '../helpers/is-valid-number';
import type { CurrencyFormatterOptions } from '../types/formatter-options';

const DEFAULT_FALLBACK = '—';
const DEFAULT_CURRENCY = 'USD';

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