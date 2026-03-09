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

// src/formatters/bytes.ts
var formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

// src/formatters/date.ts
var formatDate = (value, options) => {
  const date = new Date(value);
  const locale = getLocale(options);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...options
  }).format(date);
};

// src/formatters/datetime.ts
var formatDateTime = (value, options) => {
  const date = new Date(value);
  const locale = getLocale(options);
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
    ...options
  }).format(date);
};

// src/formatters/duration.ts
var formatDuration = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = seconds % 60;
  const parts = [];
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  if (s || parts.length === 0) parts.push(`${s}s`);
  return parts.join(" ");
};

// src/formatters/relative-time.ts
var formatRelativeTime = (value, unit, locale = "en-US") => {
  const formatter = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto"
  });
  return formatter.format(value, unit);
};
export {
  formatBytes,
  formatCompactCurrency,
  formatCompactNumber,
  formatCompactPercent,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatDuration,
  formatName,
  formatNumber,
  formatPercent,
  formatRelativeTime
};
