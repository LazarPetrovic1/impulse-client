export async function readClipboard() { return await navigator.clipboard.readText(); }

export function normalizePaste(text: string) {
  return text
    .replace(/\r\n/g, " ")
    .replace(/\n/g, " ")
    .replace(/\r/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}