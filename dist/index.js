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
  const fractionDigits = Math.abs(value) < 1e3 ? 2 : 1;
  return new Intl.NumberFormat(locale, {
    style: "percent",
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value);
};

// src/formatters/text.ts
var formatName = (name) => {
  return name.trim().toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
};
var capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);
var formatCompactName = (name) => {
  const parts = name.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return capitalize(parts[0] ?? "");
  return `${capitalize(parts[0] ?? "")} ${capitalize(parts[parts.length - 1] ?? "")}`;
};
var getInitials = (text) => {
  return text.trim().split(/\s+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase());
};
var getWord = (text, position) => {
  const parts = text.trim().split(/\s+/).filter(Boolean);
  return capitalize(parts[position] ?? "");
};
var normalizeText = (value) => value.trim().replace(/\s+/g, " ");
var extractYear = (value) => {
  const match = value.match(/\d{4}/);
  return match?.[0] ?? value;
};
var splitName = (fullName) => {
  const parts = normalizeText(fullName).split(" ").filter(Boolean);
  if (parts.length === 0) {
    return { surname: "", givenNames: [] };
  }
  const surname = parts[parts.length - 1] ?? "";
  const givenNames = parts.slice(0, -1);
  return { surname, givenNames };
};
var formatApaAuthor = (fullName) => {
  const { surname, givenNames } = splitName(fullName);
  const initials = givenNames.map((name) => `${name.charAt(0).toUpperCase()}.`).join(" ");
  return [capitalize(surname), initials].filter(Boolean).join(", ");
};
var formatAbntAuthor = (fullName) => {
  const { surname, givenNames } = splitName(fullName);
  const formattedGivenNames = givenNames.map(capitalize).join(" ");
  return [surname.toUpperCase(), formattedGivenNames].filter(Boolean).join(", ");
};
var formatApaInTextAuthors = (names) => {
  const surnames = names.map((name) => capitalize(splitName(name).surname)).filter(Boolean);
  if (surnames.length === 0) return "";
  if (surnames.length === 1) return surnames[0] ?? "";
  if (surnames.length === 2) return `${surnames[0] ?? ""} & ${surnames[1] ?? ""}`;
  return `${surnames[0] ?? ""} et al.`;
};
var formatAbntInTextAuthors = (names) => {
  const surnames = names.map((name) => splitName(name).surname.toUpperCase()).filter(Boolean);
  if (surnames.length === 0) return "";
  if (surnames.length <= 3) return surnames.join("; ");
  return `${surnames[0] ?? ""} et al.`;
};
var formatCitation = ({
  names,
  reference,
  institution,
  locale,
  date,
  rule,
  type
}) => {
  const year = extractYear(date);
  const cleanReference = normalizeText(reference);
  const cleanInstitution = normalizeText(institution);
  const cleanLocale = normalizeText(locale);
  if (rule === "APA") {
    const authorsInText2 = formatApaInTextAuthors(names);
    const authorsInReference2 = names.map(formatApaAuthor).join(", ");
    if (type === "in-text") {
      return `(${authorsInText2}, ${year})`;
    }
    if (type === "in-text-alter") {
      return `${authorsInText2} (${year})`;
    }
    return `${authorsInReference2} (${year}). ${cleanReference}. ${cleanInstitution}.`;
  }
  const authorsInText = formatAbntInTextAuthors(names);
  const authorsInReference = names.map(formatAbntAuthor).join("; ");
  if (type === "in-text") {
    return `(${authorsInText}, ${year})`;
  }
  if (type === "in-text-alter") {
    return `${authorsInText} (${year})`;
  }
  return `${authorsInReference}. ${cleanReference}. ${cleanLocale}: ${cleanInstitution}, ${year}.`;
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
  formatCitation,
  formatCompactCurrency,
  formatCompactName,
  formatCompactNumber,
  formatCompactPercent,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatDuration,
  formatName,
  formatNumber,
  formatPercent,
  formatRelativeTime,
  getInitials,
  getWord
};
