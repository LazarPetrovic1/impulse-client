import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/chatStore';
import { getSocket, SocketEvents } from '../../../lib/socket';
import { useUnreadStore } from '../store';
import { messageComparator, normalizeIncoming, PriorityQueue } from '../utils';
import { useAlertStore } from '../../alerts';
import { useAuthStore } from '../../auth/store';
import { handleDeleteEvent, handleDeliveredEvent, handleMessageEvent, handleReactionEvent, handleReconnect, handleSeenEvent, handleTypingEvent, handleUpdateEvent } from '../handlers';
import { useRouter } from 'next/router';

export const useChatSocket = (chatIds: string[]) => {
  const router = useRouter();
  const userId = useAuthStore(s => s.user.id);
  const { applyOperation, setTyping, clearTyping } = useChatStore();
  const activeChatIdRef = useRef<string | null>(null);
  useEffect(() => { activeChatIdRef.current = chatIds[0] || null; }, [chatIds]);
  const queueRef = useRef<Record<string, PriorityQueue<any>>>({});
  const flushScheduledRef = useRef<boolean>(false);
  const typingTimeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    const stores = {
      reconcileMessage: useChatStore.getState().reconcileMessage,
      updateMessage: useChatStore.getState().updateMessage,
      addReactionLocal: useChatStore.getState().addReactionLocal,
      updateDelivered: useChatStore.getState().updateDelivered,
      reconcileBulk: useChatStore.getState().reconcileBulk,
      setReactions: useChatStore.getState().setReactions,
      updateSeen: useChatStore.getState().updateSeen,
      applyOperation: useChatStore.getState().applyOperation,
      incrementUnread: useUnreadStore.getState().increment,
      addAlert: useAlertStore.getState().addAlert,
    };
    // JOIN ROOMS
    chatIds.forEach((id) => socket.emit(SocketEvents.CHAT_JOIN, { chatId: Number(id) }));
    const scheduleFlush = () => {
      if (flushScheduledRef.current) return;
      flushScheduledRef.current = true;
      queueMicrotask(() => { flushScheduledRef.current = false; flush(); });
    };

    const buffer = (event: { type: string; payload: any; }) => {
      // console.log("%cBUFFER MSG", "font-size: 1.3rem; color: yellow;", event);
      const msg = event.payload;
      const chatId = msg.chatId ?? msg.chat?.id ?? msg.message?.chatId ?? activeChatIdRef.current;
      if (!queueRef.current[chatId]) queueRef.current[chatId] = new PriorityQueue(messageComparator);
      queueRef.current[chatId].enqueue(event);
      scheduleFlush()
    };

    const flush = () => {
      const queues = queueRef.current;
      Object.entries(queues).forEach(([chatId, queue]) => {
        if (queue.isEmpty()) { delete queues[chatId]; return; }
        const events = queue.drain();
        events.forEach(({ type, payload }) => {
          switch (type) {
            case 'reaction': {
              handleReactionEvent({ payload, stores })
              break;
            }
            case 'reply':
            case 'message': {
              handleMessageEvent({ payload, userId: userId, stores, socket })
              break;
            }
            case 'update': {
              handleUpdateEvent({ payload, stores })
              break;
            }
            case 'delete': {
              handleDeleteEvent({ payload, stores })
              break;
            }
          }
        });
      });
    };

    const onTyping = (payload: any) => {
      const activeChatId = router.query.chatId ? router.query.chatId as string : null;
      if (!activeChatId) return;
      handleTypingEvent({
        chatId: activeChatId,
        userId: payload.userId,
        username: payload.username,
        isTyping: payload.isTyping,
        setTyping,
        clearTyping,
        typingTimeouts: typingTimeoutsRef.current,
      });
    }

    // REGISTER EVENTS
    socket.on(SocketEvents.CHAT_MESSAGE, (e) => buffer({ type: "message", payload: e }));
    socket.on(SocketEvents.MESSAGE_REPLIED, e => buffer({ type: 'reply', payload: e }));
    socket.on(SocketEvents.MESSAGE_UPDATED, e => buffer({ type: 'message', payload: normalizeIncoming(e) }));
    socket.on(SocketEvents.MESSAGE_DELETED, e => buffer({ type: 'delete', payload: normalizeIncoming({ ...(typeof e === "number" ? { id: e } : e), deleted: true }) }));
    socket.on(SocketEvents.MESSAGE_REACTED, e => buffer({ type: 'reaction', payload: e }));
    socket.on(SocketEvents.CHAT_TYPING, onTyping);
    socket.on(SocketEvents.MESSAGE_DELIVERED, (p) => handleDeliveredEvent({ payload: p, stores }))
    socket.on(SocketEvents.MESSAGE_SEEN, (p) => handleSeenEvent({ payload: p, stores }));
    socket.on(SocketEvents.CONNECT, () => handleReconnect({ chatIds, stores }));
    // ⚠️ no backend equivalents — kept for compatibility if emitted elsewhere
    socket.on('message-delivered', (p) => handleDeliveredEvent({ payload: p, stores }));
    socket.on('operation', applyOperation);

    return () => {
      // ⚠️ no backend handler exists
      chatIds.forEach((id) => { socket.emit('leave-chat', id); });
      socket.removeAllListeners();
    };
  }, [chatIds]);
};