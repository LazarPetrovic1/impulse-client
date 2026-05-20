import { create } from "zustand";

export interface TerminalState {
  sessionId?: string;
  connected: boolean;
  setSessionId: (id: string) => void;
  setConnected: (v: boolean) => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
  connected: false,
  setSessionId: (id) => set({ sessionId: id }),
  setConnected: (v) => set({ connected: v }),
}));

export interface HistoryState {
  history: string[];
  index: number;
  push: (cmd: string) => void;
  previous: () => string;
  next: () => string;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  history: [],
  index: -1,
  push: (cmd) => {
    const history = [...get().history, cmd];
    set({ history, index: history.length });
  },

  previous: () => {
    const { history, index } = get();
    if (index <= 0) return "";
    const nextIndex = index - 1;
    set({ index: nextIndex });
    return history[nextIndex];
  },

  next: () => {
    const { history, index } = get();
    if (index >= history.length - 1) {
      set({ index: history.length });
      return "";
    }

    const nextIndex = index + 1;
    set({ index: nextIndex });
    return history[nextIndex];
  },
}));