import { getLocale } from '../helpers/get-locale';
import { isValidNumber } from '../helpers/is-valid-number';
import type { FractionDigitsOptions } from '../types/formatter-options';

const DEFAULT_FALLBACK = '—';

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