import { create } from "zustand";
import { AlertType } from "../../../types";
import { persist } from "zustand/middleware";

export interface SideMenuItemType {
  id: number;
  href: string;
  text: string;
  data?: any;
  w?: number;
  h?: number;
}

interface SideMenuStore {
  sideMenuData: SideMenuItemType[];
  initialData: SideMenuItemType[];
  alerts: AlertType[];
  isMenuShown: boolean;
  // actions
  setInitialData: (data: SideMenuItemType[]) => void;
  addItem: (item: SideMenuItemType) => void;
  removeItem: (id: number) => void;
  reset: () => void;
  toggleMenu: () => void;
  resetItems: (items: SideMenuItemType[]) => void;
  // selectors (helpers)
  getAvailableIds: () => number[];
  getDeletedItems: () => SideMenuItemType[];
}

export const useSideMenuStore = create<SideMenuStore>()(
  persist((set, get) => ({
    sideMenuData: [],
    initialData: [],
    alerts: [],
    isMenuShown: true,
    setInitialData: (data) =>
      set((state) => ({
        initialData: state.initialData.length ? state.initialData : data,
        sideMenuData: state.sideMenuData.length ? state.sideMenuData : data,
      })),
    addItem: (item) =>
      set((state) => {
        const exists = state.sideMenuData.some((i) => i.id === item.id);
        if (exists) return state;
        return { sideMenuData: [...state.sideMenuData, item] };
      }),
    removeItem: (id) => set((state) => ({ sideMenuData: state.sideMenuData.filter((item) => item.id !== id) })),
    reset: () => set((state) => ({ sideMenuData: [...state.initialData] })),
    toggleMenu: () => set((state) => ({ isMenuShown: !state.isMenuShown })),
    // helpers
    getAvailableIds: () => get().sideMenuData.map((i) => i.id),
    getDeletedItems: () => {
      const { initialData, sideMenuData } = get();
      const currentIds = sideMenuData.map((i) => i.id);
      return initialData.filter((item) => !currentIds.includes(item.id));
    },
    resetItems: () => set((state) => ({ sideMenuData: [...state.initialData] }))
  }), {
    name: 'sidemenu-storage',
    partialize: (state) => ({
      sideMenuData: state.sideMenuData,
      isMenuShown: state.isMenuShown,
      alerts: state.alerts,
    }),
  })
);