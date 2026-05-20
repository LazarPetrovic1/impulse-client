import { Reaction } from "../types";

export const groupReactions = (reactions?: Reaction[]) => {
  if (!reactions) return {};
  return reactions.reduce((acc, r) => {
    if (!acc[r.emoji]) acc[r.emoji] = [];
    acc[r.emoji].push(r.userId);
    return acc;
  }, {} as Record<string, number[]>);
};