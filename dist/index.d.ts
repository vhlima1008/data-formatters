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
declare const formatCompactName: (name: string) => string;

declare const formatBytes: (bytes: number, decimals?: number) => string;

declare const formatDate: (value: Date | string | number, options?: Intl.DateTimeFormatOptions & {
    locale?: string;
}) => string;

declare const formatDateTime: (value: Date | string | number, options?: Intl.DateTimeFormatOptions & {
    locale?: string;
}) => string;

declare const formatDuration: (seconds: number) => string;

declare const formatRelativeTime: (value: number, unit: Intl.RelativeTimeFormatUnit, locale?: string) => string;

export { type BaseFormatterOptions, type CurrencyFormatterOptions, type FractionDigitsOptions, formatBytes, formatCompactCurrency, formatCompactName, formatCompactNumber, formatCompactPercent, formatCurrency, formatDate, formatDateTime, formatDuration, formatName, formatNumber, formatPercent, formatRelativeTime };
