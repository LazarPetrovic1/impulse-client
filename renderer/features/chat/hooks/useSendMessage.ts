import { getSocket, SocketEvents } from '../../../lib/socket';
import { useAuthStore } from '../../auth/store';
import { replyToMessage, sendMessage } from '../api';
import { useOutboxStore } from '../store';
import { useChatStore } from '../store/chatStore';

export const useSendMessage = () => {
  const addMessage = useChatStore((s) => s.addMessage);
  const enqueue = useOutboxStore((s) => s.enqueue);
  const user = useAuthStore((s) => s.user);
  const handleSend = async (chatId: string, content: string, replyToId: number) => {
    const socket = getSocket();
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage = {
      tempId,
      chatId,
      content,
      status: "sending" as const,
      senderName: user.firstName,
      sender: user.id,
      isOwn: true,
      seen: false,
      createdAt: new Date().toISOString(), // 🔥 important for sorting
    };
    
    console.log("%c[OUTGOING - OPTIMISTIC ADD]", "color: orange; font-size: 1.3rem;", optimisticMessage);

    // ✅ 1. optimistic update
    addMessage(optimisticMessage);
    if (!socket) throw new Error("Socket not connected");
    if (!replyToId) {
      try {
        // ✅ 2. emit to server
        await sendMessage({
          chatId,
          content,
          tempId,
          senderId: user.id.toString(),
        });
        
        console.log("%c[OUTGOING - SENT TO SERVER]", "color: purple; font-size: 1.3rem;", { chatId, tempId, content });
        // ❌ DO NOT reconcile here
        // socket response will handle it
      } catch (err) {
        console.log("%c[OUTGOING - FAILED → QUEUED]", "color: red; font-size: 1.3rem;", { tempId });
        // ✅ 3. fallback to outbox
        enqueue({ tempId, chatId, content, senderId: user.id.toString() });
      }
    } else {
      try {
        await replyToMessage({ chatId, content, tempId, senderId: user.id.toString(), replyToId });
        console.log("%c[OUTGOING - SENT TO SERVER]", "color: purple; font-size: 1.3rem;", { chatId, tempId, content });
      } catch (err) {
        console.log("%c[OUTGOING - FAILED → QUEUED]", "color: red; font-size: 1.3rem;", { tempId });
        // ✅ 3. fallback to outbox
        enqueue({ tempId, chatId, content, senderId: user.id.toString(), replyToId });
      }
    }
  };

  return { handleSend };
};