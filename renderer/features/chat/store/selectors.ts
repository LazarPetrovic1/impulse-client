import { useChatStore } from './chatStore';

export const useChatMessages = (chatId: string) => useChatStore((s) => s.messages[chatId] || []);
export const useMessageById = (chatId: string, id?: string) =>
  useChatStore((s) =>
    id ? s.messages[chatId]?.find((m) => m.id === id) : undefined
  );