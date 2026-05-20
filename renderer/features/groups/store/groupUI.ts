// store/groupUI.store.ts

import { create } from "zustand";

export type GroupUIState = {
  showMembers: boolean,
  showInvite: boolean,
  showDelete: boolean,
  openMembers: () => void;
  closeMembers: () => void;
  openInvite: () => void;
  closeInvite: () => void;
  openDelete: () => void;
  closeDelete: () => void;
};

export const useGroupUI = create<GroupUIState>((set) => ({
  showMembers: false,
  showInvite: false,
  showDelete: false,
  openMembers: () => set({ showMembers: true }),
  closeMembers: () => set({ showMembers: false }),
  openInvite: () => set({ showInvite: true }),
  closeInvite: () => set({ showInvite: false }),
  openDelete: () => set({ showDelete: true }),
  closeDelete: () => set({ showDelete: false }),
}));