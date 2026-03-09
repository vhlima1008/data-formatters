export type BaseFormatterOptions = {
  locale?: string;
  fallback?: string;
};

export type CurrencyFormatterOptions = BaseFormatterOptions & {
  currency?: string;
};

export type FractionDigitsOptions = BaseFormatterOptions & {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};