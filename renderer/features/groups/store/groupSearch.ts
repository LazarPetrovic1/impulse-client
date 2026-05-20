import { create } from "zustand";
import { api } from "../../../lib/api";

export interface GroupSearchResult {
  id: number;
  name: string;
  groupImage?: string;
  about: string;
  requiresApproval: boolean;
  membersCount: number;
  membershipStatus: "active" | "pending" | "invited" | "blocked" | null;
  role: "creator" | "admin" | "member" | null;
  createdBy: { id: number; username: string; };
}

interface GroupSearchStore {
  query: string;
  results: GroupSearchResult[];
  loading: boolean;
  setQuery: (q: string) => void;
  searchGroups: () => Promise<void>;
  clear: () => void;
}

export const useGroupSearchStore = create<GroupSearchStore>((set, get) => ({
  query: "",
  results: [],
  loading: false,
  setQuery: (q) => set({ query: q }),
  searchGroups: async () => {
    const { query } = get();
    if (query.length < 2) { set({ results: [] }); return; }
    set({ loading: true });
    try { const res = await api.get(`/group/search?q=${query}`); set({ results: res.data }); }
    catch (e) { console.error("Error searching groups:", e); }
    finally { set({ loading: false }); }
  },
  clear: () => set({ results: [], query: "" }),
}));