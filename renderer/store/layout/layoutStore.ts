import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PanelState = {
  size: number;       // percentage or px
  collapsed: boolean;
};

type LayoutState = {
  split: {
    left: PanelState;
  };

  threeColumn: {
    left: PanelState;
    right: PanelState;
  };

  // actions
  setSplitLeft: (data: Partial<PanelState>) => void;
  setThreeLeft: (data: Partial<PanelState>) => void;
  setThreeRight: (data: Partial<PanelState>) => void;
  reset: () => void;
};

const defaultState = {
  split: {
    left: { size: 120, collapsed: false },
  },
  threeColumn: {
    left: { size: 100, collapsed: false },
    right: { size: 100, collapsed: false },
  },
};

export const useLayoutStore = create(
  persist<LayoutState>((set) => ({
    ...defaultState,
    setSplitLeft: (data) =>
      set((state) => ({
        split: {
          left: { ...state.split.left, ...data },
        },
      })),

    setThreeLeft: (data) =>
      set((state) => ({
        threeColumn: {
          ...state.threeColumn,
          left: { ...state.threeColumn.left, ...data },
        },
      })),

    setThreeRight: (data) =>
      set((state) => ({
        threeColumn: {
          ...state.threeColumn,
          right: { ...state.threeColumn.right, ...data },
        },
      })),

    reset: () => set(defaultState),
  }), { name: 'layout-storage', })
);