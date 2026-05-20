import { create } from "zustand";

type RecentState = {
  recent: string[];
  add: (id: string) => void;
  clear: () => void;
};

export const useRecentCommands = create<RecentState>((set) => ({
  recent: [],

  add: (id) =>
    set((state) => ({
      recent: [id, ...state.recent.filter((x) => x !== id)].slice(0, 10),
    })),

  clear: () => set({ recent: [] }),
}));