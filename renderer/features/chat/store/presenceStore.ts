import { create } from 'zustand';

export type PresenceState = {
  onlineUsers: Record<string, boolean>;
  setOnline: (userId: string, online: boolean) => void;
};

export const usePresenceStore = create<PresenceState>((set) => ({
  onlineUsers: {},
  setOnline: (userId, online) => set((state) => ({ onlineUsers: { ...state.onlineUsers, [userId]: online } })),
}));