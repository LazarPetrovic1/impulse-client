import { api } from "../../../lib/api";

export const markAsRead = async (chatId: string, messageId: string) =>
  await api.post(`/chats/${chatId}/read`, { messageId });