import { SocketEvents } from "../../../lib/socket";
import { play } from "../../alerts";

export const handleMessageEvent = ({ payload, userId, stores, socket }: any) => {
  const { reconcileMessage, incrementUnread, addAlert } = stores;
  reconcileMessage(payload);
  if (payload?.senderId !== userId) {
    incrementUnread(payload.chatId);
    if (payload.reactions && payload.reactions.length < 1) {
      addAlert({
        id: crypto.randomUUID(),
        message: `New message: ${
          payload.content.length > 40
            ? `${payload.content.slice(0, 40)}...`
            : payload.content
        }`,
        type: "info",
      });
      play(`/sound-effects/alerts/alert-spawn.mp3`);
      socket.emit(SocketEvents.MESSAGE_DELIVERED, { messageId: payload.id, chatId: payload.chatId, userId: payload.senderId });
    }
  }
}