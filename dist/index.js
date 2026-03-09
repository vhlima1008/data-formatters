// src/helpers/get-locale.ts
var DEFAULT_LOCALE = "en-US";
var getLocale = (options) => {
  if (options?.locale) return options.locale;
  if (typeof navigator !== "undefined") {
    if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
      return navigator.languages[0];
    }
    if (navigator.language) {
      return navigator.language;
    }
  }
  return DEFAULT_LOCALE;
};

// src/helpers/is-valid-number.ts
var isValidNumber = (value) => {
  return Number.isFinite(value);
};

// src/formatters/currency.ts
var DEFAULT_FALLBACK = "\u2014";
var DEFAULT_CURRENCY = "USD";
var formatCurrency = (value, options = {}) => {
  if (!isValidNumber(value)) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }
  const locale = getLocale(options);
  const currency = options.currency ?? DEFAULT_CURRENCY;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};
var formatCompactCurrency = (value, options = {}) => {
  if (!isValidNumber(value)) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }
  const locale = getLocale(options);
  const currency = options.currency ?? DEFAULT_CURRENCY;
  const fractionDigits = Math.abs(value) < 1e3 ? 2 : 1;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value);
};

// src/formatters/number.ts
var DEFAULT_FALLBACK2 = "\u2014";
var formatNumber = (value, options = {}) => {
  if (!isValidNumber(value)) {
    return options.fallback ?? DEFAULT_FALLBACK2;
  }
  const locale = getLocale(options);
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: options.minimumFractionDigits,
    maximumFractionDigits: options.maximumFractionDigits ?? 0
  }).format(value);
};
var formatCompactNumber = (value, options = {}) => {
  if (!isValidNumber(value)) {
    return options.fallback ?? DEFAULT_FALLBACK2;
  }
  const locale = getLocale(options);
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short"
  }).format(value);
};

// src/formatters/percent.ts
var DEFAULT_FALLBACK3 = "\u2014";
var formatPercent = (value, options = {}) => {
  if (!isValidNumber(value)) {
    return options.fallback ?? DEFAULT_FALLBACK3;
  }
  const locale = getLocale(options);
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: options.minimumFractionDigits,
    maximumFractionDigits: options.maximumFractionDigits ?? 2
  }).format(value);
};
var formatCompactPercent = (value, options = {}) => {
  if (!isValidNumber(value)) {
    return options.fallback ?? DEFAULT_FALLBACK3;
  }
  const locale = getLocale(options);
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: options.minimumFractionDigits,
    maximumFractionDigits: options.maximumFractionDigits ?? 1
  }).format(value);
};

// src/formatters/text.ts
var formatName = (name) => {
  return name.trim().toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
};
export {
  formatCompactCurrency,
  formatCompactNumber,
  formatCompactPercent,
  formatCurrency,
  formatName,
  formatNumber,
  formatPercent
};
