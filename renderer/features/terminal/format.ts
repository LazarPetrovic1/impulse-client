import type { Terminal } from "xterm";

export function writeJson(term: Terminal, data: unknown) {
  const pretty = JSON.stringify(data, null, 2);
  const lines = pretty.split("\n");
  for (const line of lines) term.writeln(line);
}

export function parseFlexibleObject(input: string) {
  const trimmed = input.trim();
  // already valid JSON
  try { return JSON.parse(trimmed); }
  catch {}
  // normalize simple JS-like syntax
  const normalized = trimmed
    // quote object keys
    .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
    // single quotes -> double quotes
    .replace(/'/g, '"');
  try { return JSON.parse(normalized); }
  catch { throw new Error("Invalid object/array syntax"); }
}