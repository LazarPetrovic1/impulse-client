import { useRef, useMemo } from 'react';
import { getSocket, SocketEvents } from '../../../lib/socket';
import { throttle } from 'lodash';

export const useTyping = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sendTyping = useMemo(() =>
    throttle(() => {
      const socket = getSocket();
      if (!socket) return;

      socket.emit(SocketEvents.CHAT_TYPING, true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        socket.emit(SocketEvents.CHAT_TYPING, false);
      }, 1000);
    }, 1000)
  , []);

  return { sendTyping };
};