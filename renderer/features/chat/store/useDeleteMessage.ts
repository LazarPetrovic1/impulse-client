import { chatsApi } from "../../../lib/api";
import { getSocket, SocketEvents } from "../../../lib/socket";
import { useChatStore } from "./chatStore";

export const useDeleteMessage = () => {
  const updateMessage = useChatStore((s) => s.updateMessage);
  const socket = getSocket()
  const deleteMessage = async (messageId: number, chatId: string) => {
    // ✅ optimistic update
    updateMessage({ id: messageId, chatId, deleted: true });
    try {
      // await chatsApi.delete(`/chats/messages/${messageId}`);
      socket.emit(SocketEvents.MESSAGE_DELETE, { id: messageId, chatId, deleted: true });
    } catch (err) {
      console.error("Delete failed", err.message);
      // optional rollback logic
    }
  };

  return { deleteMessage };
};