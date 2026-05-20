import { apiGet, apiPost, apiPut } from "./api";
import { entities, EntityName } from "./entities";
import { parseFlexibleObject, writeJson } from "./format";
import { useHistoryStore } from "./store";
import type { CommandContext, CommandHandler } from "./types";

export const internalCommands: Record<string, (ctx: CommandContext) => Promise<void> | void> = {
  clear: ({ term }) => term.reset(),
  cls: ({ term }) => term.reset(),
  history: ({ term, historyStore }) => {
    const entries = useHistoryStore.getState().history;
    entries.forEach((cmd, i) => term.writeln(`${i + 1}  ${cmd}`));
  }
};

export type CommandDefinition = {
  description: string;
  execute: CommandHandler;
};

export const commandRegistry = new Map<string, CommandDefinition>();
export function registerCommand(name: string, definition: CommandDefinition) { commandRegistry.set(name, definition); }
export function getCommand(name: string) { return commandRegistry.get(name); }
export function getCommands() { return commandRegistry.entries(); }

export function registerDefaultCommands() {
  registerCommand("help", {
    description: "List all available commands",
    execute: ({ term }) => {
      term.writeln("");
      term.writeln("Available commands:");
      term.writeln("");
      const commands = Array.from(getCommands()).sort(([a], [b]) => a.localeCompare(b));
      for (const [name, def] of commands)
        term.writeln(`${name.padEnd(15)} ${def.description}`);
      term.writeln("");
    },
  });

  registerCommand("get", {
    description: "Fetch entities from backend",
    execute: async ({ term, args }) => {
      const [entity, id] = args;
      if (!entity) { term.writeln("Usage: get <entity> [id]"); return; }
      if (!entities.includes(entity as any)) { term.writeln(`Unknown entity: ${entity}`); return; }
      term.writeln("");
      const data = await apiGet(entity as EntityName, id);
      writeJson(term, data);
      term.writeln("");
    },
  });

  registerCommand("post", {
    description: "Create entity resource",
    execute: async ({ term, args }) => {
      const [entity, ...payloadParts] = args;
      if (!entity) {
        term.writeln("Usage: post <entity> <json>");
        return;
      }

      if (!entities.includes(entity as any)) {
        term.writeln(`Unknown entity: ${entity}`);
        return;
      }

      const payloadText = payloadParts.join(" ");
      if (!payloadText) {
        term.writeln("Missing JSON payload");
        return;
      }

      const payload = parseFlexibleObject(payloadText);
      console.log({ entity, payloadText, payload });
      const data = await apiPost(entity as EntityName, { body: payload });
      term.writeln("");
      writeJson(term, data);
      term.writeln("");
    },
  });

  registerCommand("put", {
    description: "Update entity resource",
    execute: async ({ term, args }) => {
      const [entity, id, ...payloadParts] = args;
      if (!entity || !id) {
        term.writeln("Usage: put <entity> <id> <json>");
        return;
      }

      if (!entities.includes(entity as any)) {
        term.writeln(`Unknown entity: ${entity}`);
        return;
      }

      const payloadText = payloadParts.join(" ");
      if (!payloadText) {
        term.writeln("Missing JSON payload");
        return;
      }

      const payload = parseFlexibleObject(payloadText);
      const data = await apiPut(entity as EntityName, id, payload);
      term.writeln("");
      writeJson(term, data);
      term.writeln("");
    },
  });

  registerCommand("entities", {
    description: "List available backend entities",
    execute: ({ term }) => {
      term.writeln("");
      entities.forEach((entity) => term.writeln(entity));
      term.writeln("");
    },
  });

  registerCommand("users", {
    description: "Alias for get user",
    execute: async (ctx) => getCommand("get")?.execute({ ...ctx, args: ["user", ...ctx.args] }),
  });

  registerCommand("clear", {
    description: "Clear terminal contents",
    execute: ({ term }) => { term.reset(); },
  });

  registerCommand("cls", {
    description: "Alias for clear",
    execute: ({ term }) => { term.reset(); },
  });

  registerCommand("history", {
    description: "Show command history",
    execute: ({ term }) => {
      const entries = useHistoryStore.getState().history;
      entries.forEach((cmd, i) => { term.writeln(`${i + 1}  ${cmd}`); });
    },
  });

  registerCommand("app_version", {
    description: "Show current app version",
    execute: async ({ term }) => {
      const version = await window.electron.getAppVersion();
      term.writeln(version);
    },
  });

  registerCommand("reload", {
    description: "Reload application window",
    execute: async () => { await window.electron.reload(); },
  });

  registerCommand("tools", {
    description: "Toggle developer tools",
    execute: async () => { await window.electron.toggleDevTools(); },
  });
}