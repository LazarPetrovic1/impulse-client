import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type OutboxMessage = {
  tempId: string;
  chatId: string;
  content: string;
  senderId: string;
  replyToId?: string | number;
};

export type OutboxState = {
  queue: OutboxMessage[];
  enqueue: (msg: OutboxMessage) => void;
  dequeue: (tempId: string) => void;
  clear: () => void;
};

export const useOutboxStore = create<OutboxState>()(
  persist(
    (set) => ({
      queue: [],
      enqueue: (msg) => set((state) => ({ queue: [...state.queue, msg] })),
      dequeue: (tempId) => set((state) => ({ queue: state.queue.filter((m) => m.tempId !== tempId) })),
      clear: () => set({ queue: [] }),
    }),
    { name: 'chat-outbox' }
  )
);
