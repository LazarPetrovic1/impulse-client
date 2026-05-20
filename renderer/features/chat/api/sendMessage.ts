import { getSocket, SocketEvents } from '../../../lib/socket';
import { Message } from '../types';
// import { encryptMessage, getChatKey } from '../../../lib/crypto';
type PayloadType = {
  chatId: string;
  content: string;
  tempId?: string;
  senderId: string;
}
export const sendMessage = async (payload: PayloadType) => {
  // const key = await getChatKey(payload.chatId);
  // const { cipher, iv } = await encryptMessage(key, payload.content);
  // const res = await chatsApi.post(`/chats/${payload.chatId}/messages`, payload);
  // return res.data as Message;
  const socket = getSocket();
  socket.emit(SocketEvents.MESSAGE_SEND, payload);
};