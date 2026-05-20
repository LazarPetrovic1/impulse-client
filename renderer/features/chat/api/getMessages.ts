import { chatsApi } from "../../../lib/api";

// CURSOR ENCODE => `${timestamp.toISOString()}_${id}`

export type PaginatedMessages = { messages: any[]; nextCursor?: string; };
export const getMessages = async (chatId: string, cursor?: string) => {
  if (!chatId) return;
  const res = await chatsApi.get(`/chats/${chatId}/messages`, { params: { cursor } });
  return res.data as PaginatedMessages;
};