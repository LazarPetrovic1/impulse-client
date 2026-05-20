import Fuse from "fuse.js";
import { commandRegistry } from "./commandRegistry";

export const searchCommands = (query: string) => {
  const all = commandRegistry.getAll();

  if (!query) return all;

  const fuse = new Fuse(all, {
    keys: ["label", "keywords", "group"],
    threshold: 0.35, // VSCode-like sensitivity
    ignoreLocation: true,
  });

  return fuse.search(query).map((r) => r.item);
};