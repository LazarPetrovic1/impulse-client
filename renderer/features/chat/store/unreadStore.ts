import { create } from 'zustand';

export type UnreadState = {
  counts: Record<string, number>; // chatId -> count
  increment: (chatId: string) => void;
  reset: (chatId: string) => void;
  setCount: (chatId: string, count: number) => void;
};

export const useUnreadStore = create<UnreadState>((set) => ({
  counts: {},
  increment: (chatId) => set((state) => ({ counts: { ...state.counts, [chatId]: (state.counts[chatId] || 0) + 1 } })),
  reset: (chatId) => set((state) => ({ counts: { ...state.counts, [chatId]: 0 } })),
  setCount: (chatId, count) => set((state) => ({ counts: { ...state.counts, [chatId]: count } })),
}));