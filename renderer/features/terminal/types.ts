import type { Terminal } from "xterm";
import type { HistoryState } from "./store";

export type CommandContext = {
  term: Terminal;
  args: string[];
  sessionId?: string;
  historyStore: HistoryState;
};

export type CommandHandler = (
  ctx: CommandContext
) => Promise<void> | void;