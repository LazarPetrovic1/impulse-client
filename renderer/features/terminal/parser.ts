import { commandRegistry } from "./commands";
import { nativeAliases } from "./native";

export interface ParsedCommand {
  raw: string;
  command: string;
  args: string[];
  type: "internal" | "native";
}

// export function parseCommand(input: string): ParsedCommand {
//   const trimmed = input.trim();
//   if (!trimmed) return { raw: input, command: "", args: [], type: "internal" };
//   // native shell command
//   if (trimmed.startsWith("!")) {
//     const native = trimmed.slice(1).trim();
//     const [command, ...args] = native.split(/\s+/);
//     return { raw: native, command, args, type: "native" };
//   }

//   const [command, ...args] = trimmed.split(/\s+/);

//   // api commands
//   const apiCommands = ["users", "projects", "tickets"];

//   return {
//     raw: trimmed,
//     command,
//     args,
//     type: apiCommands.includes(command) ? "api" : "internal"
//   };
// }

export function parseCommand(
  input: string
): ParsedCommand {
  const trimmed = input.trim();
  if (!trimmed) return { raw: input, command: "", args: [], type: "internal" };
  // explicit shell command
  if (trimmed.startsWith("!")) {
    const native = trimmed.slice(1).trim();
    const [command, ...args] = native.split(/\s+/);
    return { raw: native, command, args, type: "native" };
  }
  const [command, ...args] = trimmed.split(/\s+/);
  // internal command exists
  if (commandRegistry.has(command)) return { raw: trimmed, command, args, type: "internal" };

  // known native alias
  if (nativeAliases[command]) {
    return {
      raw: `${nativeAliases[command]} ${args.join(" ")}`.trim(),
      command,
      args,
      type: "native",
    };
  }

  // fallback → native
  return { raw: trimmed, command, args, type: "native" };
}