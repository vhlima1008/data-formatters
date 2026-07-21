/**
 * Formats a name in title case after trimming surrounding whitespace.
 *
 * Use this to normalize user names for display.
 *
 * @param name - The name to format.
 * @returns The trimmed name with the first letter of each word capitalized.
 *
 * @example
 * formatName('  jane DOE  ');
 * // "Jane Doe"
 */
export const formatName = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .replace(/(^|\s)\S/g, (char) => char.toUpperCase());
};

const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Formats a full name as first name plus last name.
 *
 * Use this when middle names should be omitted from display. Single-word names
 * are returned capitalized, and empty input returns an empty string.
 *
 * @param name - The full name to shorten.
 * @returns A compact display name containing the first and last words.
 *
 * @example
 * formatCompactName('ada byron lovelace');
 * // "Ada Lovelace"
 */
export const formatCompactName = (name: string): string => {
  const parts = name
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return "";
  if (parts.length === 1) return capitalize(parts[0] ?? "");

  return `${capitalize(parts[0] ?? "")} ${capitalize(parts[parts.length - 1] ?? "")}`;
};

/**
 * Gets uppercase initials from each word in a text value.
 *
 * Use this for avatars, badges, or compact identity labels.
 *
 * @param text - The text used to generate initials.
 * @returns An array of uppercase first letters, one for each non-empty word.
 *
 * @example
 * getInitials('Ada Byron Lovelace');
 * // ["A", "B", "L"]
 */
export const getInitials = (text: string): string[] => {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase());
};

/**
 * Gets and capitalizes a word at a zero-based position.
 *
 * Use this when only one word from a normalized text value should be displayed.
 * If the position does not exist, an empty string is returned.
 *
 * @param text - The source text to split by whitespace.
 * @param position - The zero-based word position to return.
 * @returns The capitalized word at `position`, or an empty string when missing.
 *
 * @example
 * getWord('open source project', 1);
 * // "Source"
 */
export const getWord = (text: string, position: number): string => {
  const parts = text
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  
  return capitalize(parts[position] ?? "");
}



const normalizeText = (value: string): string =>
  value.trim().replace(/\s+/g, ' ');

const extractYear = (value: string): string => {
  const match = value.match(/\d{4}/);
  return match?.[0] ?? value;
};

const splitName = (fullName: string): { surname: string; givenNames: string[] } => {
  const parts = normalizeText(fullName)
    .split(' ')
    .filter(Boolean);

  if (parts.length === 0) {
    return { surname: '', givenNames: [] };
  }

  const surname = parts[parts.length - 1] ?? '';
  const givenNames = parts.slice(0, -1);

  return { surname, givenNames };
};

const formatApaAuthor = (fullName: string): string => {
  const { surname, givenNames } = splitName(fullName);
  const initials = givenNames.map((name) => `${name.charAt(0).toUpperCase()}.`).join(' ');

  return [capitalize(surname), initials].filter(Boolean).join(', ');
};

const formatAbntAuthor = (fullName: string): string => {
  const { surname, givenNames } = splitName(fullName);
  const formattedGivenNames = givenNames.map(capitalize).join(' ');

  return [surname.toUpperCase(), formattedGivenNames].filter(Boolean).join(', ');
};

const formatApaInTextAuthors = (names: string[]): string => {
  const surnames = names.map((name) => capitalize(splitName(name).surname)).filter(Boolean);

  if (surnames.length === 0) return '';
  if (surnames.length === 1) return surnames[0] ?? '';
  if (surnames.length === 2) return `${surnames[0] ?? ''} & ${surnames[1] ?? ''}`;
  return `${surnames[0] ?? ''} et al.`;
};

const formatAbntInTextAuthors = (names: string[]): string => {
  const surnames = names.map((name) => splitName(name).surname.toUpperCase()).filter(Boolean);

  if (surnames.length === 0) return '';
  if (surnames.length <= 3) return surnames.join('; ');
  return `${surnames[0] ?? ''} et al.`;
};

export interface formatCitationProps {
  names: string[]
  reference: string
  institution: string
  locale: string
  date: string
  rule: 'APA' | 'ABNT'
  type: 'in-text' | 'in-text-alter' | 'reference'
}

/**
 * Formats a citation using APA or ABNT output rules.
 *
 * Use this to build either parenthetical in-text citations, narrative in-text
 * citations, or full reference entries. Author names should be provided as full
 * names; the formatter derives surnames and initials from them.
 *
 * @param props - Citation data and formatting options.
 * @param props.names - Author names in natural order, for example `["Ada Lovelace"]`.
 * @param props.reference - The title or reference text.
 * @param props.institution - The publisher, institution, or source owner.
 * @param props.locale - The publication location used by ABNT reference output.
 * @param props.date - The publication date; the first four-digit year is used.
 * @param props.rule - The citation rule to apply: `"APA"` or `"ABNT"`.
 * @param props.type - The output type: `"in-text"`, `"in-text-alter"`, or `"reference"`.
 * @returns A formatted citation string for the selected rule and output type.
 *
 * @example
 * formatCitation({
 *   names: ['Ada Lovelace'],
 *   reference: 'Notes on the analytical engine',
 *   institution: 'Taylor Scientific',
 *   locale: 'London',
 *   date: '1843',
 *   rule: 'APA',
 *   type: 'in-text',
 * });
 * // "(Lovelace, 1843)"
 *
 * @example
 * formatCitation({
 *   names: ['Ada Lovelace'],
 *   reference: 'Notes on the analytical engine',
 *   institution: 'Taylor Scientific',
 *   locale: 'London',
 *   date: '1843',
 *   rule: 'ABNT',
 *   type: 'reference',
 * });
 * // "LOVELACE, Ada. Notes on the analytical engine. London: Taylor Scientific, 1843."
 */
export const formatCitation = ({
  names,
  reference,
  institution,
  locale,
  date,
  rule,
  type,
}:formatCitationProps) => {
  const year = extractYear(date);
  const cleanReference = normalizeText(reference);
  const cleanInstitution = normalizeText(institution);
  const cleanLocale = normalizeText(locale);

  if (rule === 'APA') {
    const authorsInText = formatApaInTextAuthors(names);
    const authorsInReference = names.map(formatApaAuthor).join(', ');

    if (type === 'in-text') {
      return `(${authorsInText}, ${year})`;
    }

    if (type === 'in-text-alter') {
      return `${authorsInText} (${year})`;
    }

    return `${authorsInReference} (${year}). ${cleanReference}. ${cleanInstitution}.`;
  }

  const authorsInText = formatAbntInTextAuthors(names);
  const authorsInReference = names.map(formatAbntAuthor).join('; ');

  if (type === 'in-text') {
    return `(${authorsInText}, ${year})`;
  }

  if (type === 'in-text-alter') {
    return `${authorsInText} (${year})`;
  }

  return `${authorsInReference}. ${cleanReference}. ${cleanLocale}: ${cleanInstitution}, ${year}.`;
}
