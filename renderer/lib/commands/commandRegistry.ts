export type Command = {
  id: string;
  label: string;
  shortcut?: string;
  keywords?: string[];
  group?: string;
  action: () => void;
};

let commands: Command[] = [];

export const commandRegistry = {
  register: (cmd: Command) => {
    const exists = commands.find((c) => c.id === cmd.id);
    if (!exists) commands.push(cmd);
  },

  clear: () => {
    commands = [];
  },

  getAll: () => commands,
};