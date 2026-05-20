export function extractMentionsAndTags(text: string) {
  const mentionRegex = /@\[\s*id:(\d+)\s+display:([^\]]+)\]/g;
  const tagRegex = /#\[\s*([^\]]+)\s*\]|#([a-zA-Z0-9_-]+)/g;

  const users: number[] = [];
  const tags: string[] = [];

  let match;

  // reset regex state explicitly (IMPORTANT in React flows)
  mentionRegex.lastIndex = 0;
  tagRegex.lastIndex = 0;

  while ((match = mentionRegex.exec(text))) {
    users.push(Number(match[1]));
  }

  while ((match = tagRegex.exec(text))) {
    const tag = match[1] || match[2];
    if (tag) tags.push(tag);
  }

  return {
    users: Array.from(new Set(users)),
    tags: Array.from(new Set(tags.map(t => t.trim().toLowerCase()))),
  };
}

export * from './api/mentionsApi'