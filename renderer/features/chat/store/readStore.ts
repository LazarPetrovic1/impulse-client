import { create } from 'zustand';

export type ReadState = {
  lastRead: Record<string, string>; // chatId -> messageId
  setLastRead: (chatId: string, messageId: string) => void;
};

export const useReadStore = create<ReadState>((set) => ({
  lastRead: {},
  setLastRead: (chatId, messageId) =>
    set((state) => ({
      lastRead: {
        ...state.lastRead,
        [chatId]: messageId,
      },
    })),
}));