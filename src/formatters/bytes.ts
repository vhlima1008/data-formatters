/**
 * Formats a byte count into a readable binary unit string.
 *
 * Use this when you need to display file sizes or payload sizes with units such
 * as B, KB, MB, GB, or TB.
 *
 * @param bytes - The number of bytes to format.
 * @param decimals - The number of decimal places to keep. Negative values are treated as 0.
 * @returns A formatted size string, for example `"0 B"`, `"1 KB"`, or `"1.25 MB"`.
 *
 * @example
 * formatBytes(1536);
 * // "1.5 KB"
 *
 * @example
 * formatBytes(1048576, 0);
 * // "1 MB"
 */
export const formatBytes = (bytes: number, decimals = 2) => {

  if (bytes === 0) return "0 B";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;

  const sizes = ["B", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
