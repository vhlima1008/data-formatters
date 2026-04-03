export const formatName = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .replace(/(^|\s)\S/g, (char) => char.toUpperCase());
};

const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

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

export const getInitials = (text: string): string[] => {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase());
};

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
