import { getSocket, SocketEvents } from '../../../lib/socket';

type PayloadType = {
  chatId: string | number;
  content: string | number;
  tempId?: string | number;
  senderId: string | number;
  replyToId: string | number; // used in place of msg id as well
}
export const replyToMessage = async (payload: PayloadType) => {
  const socket = getSocket();
  socket.emit(SocketEvents.MESSAGE_REPLY, payload);
};