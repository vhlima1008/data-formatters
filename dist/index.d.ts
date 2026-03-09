type BaseFormatterOptions = {
    locale?: string;
    fallback?: string;
};
type CurrencyFormatterOptions = BaseFormatterOptions & {
    currency?: string;
};
type FractionDigitsOptions = BaseFormatterOptions & {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
};

declare const formatCurrency: (value: number, options?: CurrencyFormatterOptions) => string;
declare const formatCompactCurrency: (value: number, options?: CurrencyFormatterOptions) => string;

declare const formatNumber: (value: number, options?: FractionDigitsOptions) => string;
declare const formatCompactNumber: (value: number, options?: Omit<FractionDigitsOptions, "minimumFractionDigits" | "maximumFractionDigits">) => string;

declare const formatPercent: (value: number, options?: FractionDigitsOptions) => string;
declare const formatCompactPercent: (value: number, options?: FractionDigitsOptions) => string;

declare const formatName: (name: string) => string;

export { type BaseFormatterOptions, type CurrencyFormatterOptions, type FractionDigitsOptions, formatCompactCurrency, formatCompactNumber, formatCompactPercent, formatCurrency, formatName, formatNumber, formatPercent };
