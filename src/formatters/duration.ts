/**
 * Formats a duration in seconds as a short human-readable string.
 *
 * Use this for elapsed time, media duration, countdowns, or timers. Hours,
 * minutes, and seconds are included only when needed.
 *
 * @param seconds - The duration to format, expressed in seconds.
 * @returns A compact duration string such as `"45s"`, `"2m 5s"`, or `"1h 3m 10s"`.
 *
 * @example
 * formatDuration(3665);
 * // "1h 1m 5s"
 *
 * @example
 * formatDuration(0);
 * // "0s"
 */
export const formatDuration = (seconds: number): string => {

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const parts = [];

  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  if (s || parts.length === 0) parts.push(`${s}s`);

  return parts.join(" ");
};
