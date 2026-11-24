/**
 * Vocabulary normalization and text direction helpers.
 * Used across import, deduplication, and mixed-script rendering layers.
 */

export function normalizeExpression(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, ' ');
}

export function formatDurationSeconds(totalSeconds: number | null): string {
  if (totalSeconds === null || totalSeconds < 0 || Number.isNaN(totalSeconds)) {
    return '00:00';
  }
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);
  const pad = (n: number) => n.toString().padStart(2, '0');
  if (hrs > 0) {
    return `${hrs}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

export function containsPersianCharacters(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}
