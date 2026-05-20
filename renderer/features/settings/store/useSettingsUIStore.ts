import { create } from "zustand";

interface SettingsUIStore {
  isSidebarHidden: boolean;
  toggleSidebar: () => void;
}

export const useSettingsUIStore = create<SettingsUIStore>((set) => ({
  isSidebarHidden: false,
  toggleSidebar: () => set((state) => ({ isSidebarHidden: !state.isSidebarHidden })),
}));