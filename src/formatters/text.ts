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
  if (parts.length === 1) return capitalize(parts[0]??'');

  return `${capitalize(parts[0]??'')} ${capitalize(parts[parts.length - 1]??'')}`;
};