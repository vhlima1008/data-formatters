import { getLocale } from '../helpers/get-locale';
import { isValidNumber } from '../helpers/is-valid-number';
import type { FractionDigitsOptions } from '../types/formatter-options';

const DEFAULT_FALLBACK = '—';

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