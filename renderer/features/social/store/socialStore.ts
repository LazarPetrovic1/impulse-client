import { create } from "zustand";
import { api } from "../../../lib/api";
import { SocialUser } from "..";

interface SocialStore {
  query: string;
  results: SocialUser[];
  loading: boolean;

  setQuery: (q: string) => void;
  searchUsers: () => Promise<void>;
  clear: () => void;
}

export const useSocialStore = create<SocialStore>((set, get) => ({
  query: "",
  results: [],
  loading: false,

  setQuery: (q) => set({ query: q }),

  searchUsers: async () => {
    const { query } = get();
    if (query.length < 2) {
      set({ results: [] });
      return;
    }

    set({ loading: true });

    try {
      const res = await api.get(`/users?q=${query}`);
      set({ results: res.data });
    } catch (e) {
      console.error(e);
    } finally {
      set({ loading: false });
    }
  },

  clear: () => set({ results: [], query: "" })
}));