// // utility functions

export const capitalize = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`
export const escapeMarkdown = (text: string) => text.replace(/([_*~`>])/g, "\\$1");

export function preprocess(text: string) {
  if (!text) return ""
  return text
    .replace(/@\[\s*id:(\d+)\s+display:([^\]]+)\]/g, (_, id, display) => {
      return `[@${display}](/profile/${id})`;
    })

    // hashtags (BOTH formats)
    .replace(/#\[\s*([^\]]+)\s*\]/g, (_, tag) => {
      return `[#${tag}](/tags/${encodeURIComponent(tag)})`;
    })
    .replace(/#([a-zA-Z0-9_-]+)/g, (_, tag) => {
      return `[#${tag}](/tags/${encodeURIComponent(tag)})`;
    });
}