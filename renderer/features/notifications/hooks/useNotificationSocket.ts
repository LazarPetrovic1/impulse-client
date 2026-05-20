import { useEffect } from "react";
import { useNotificationStore } from "../store";
import { getSocket, SocketEvents } from "../../../lib/socket";

export const useNotificationSocket = () => {
  const addNotification = useNotificationStore((s) => s.addNotification);
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handler = (notif: any) => { addNotification(notif); };
    socket.on(SocketEvents.NOTIF_CREATED, handler);
    return () => {
      socket.off(SocketEvents.NOTIF_CREATED, handler);
    };
  }, []);
};