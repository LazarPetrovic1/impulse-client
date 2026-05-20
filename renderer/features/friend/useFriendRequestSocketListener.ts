import { useEffect } from "react";
import { FriendSocketEvents, getSocket } from "../../lib/socket";
import { handleIncoming, handleAccepted, handleReconnect, handleRejected } from "./handlers";
import { useFriendRequestStore } from "./friendRequestStore";
import { useAlertStore } from "../alerts";
import { useNotificationStore } from "../notifications/store";

export const useFriendRequestSocketListener = (userId: number) => {
  useEffect(() => {
    if (!userId) return;
    const socket = getSocket();
    if (!socket) return;

    const stores = {
      addIncoming: useFriendRequestStore.getState().addIncoming,
      markOutgoing: useFriendRequestStore.getState().markOutgoing,
      accept: useFriendRequestStore.getState().accept,
      reject: useFriendRequestStore.getState().reject,
      hydrate: useFriendRequestStore.getState().hydrate,
      addAlert: useAlertStore.getState().addAlert,
      addNotification: useNotificationStore.getState().addNotification,
    };

    const onIncoming = (notif: any) => handleIncoming({ notif, userId, stores });
    const onAccepted = (payload: any) => handleAccepted({ payload, userId, stores });
    const onRejected = (payload: any) => handleRejected({ payload, userId, stores });
    const onReconnect = () => handleReconnect({ userId, stores });
    socket.on(FriendSocketEvents.FRIEND_REQUEST_CREATED, onIncoming);
    socket.on(FriendSocketEvents.FRIEND_REQUEST_ACCEPTED, onAccepted);
    socket.on(FriendSocketEvents.FRIEND_REQUEST_REJECTED, onRejected);
    socket.on("connect", onReconnect);

    return () => {
      socket.off(FriendSocketEvents.FRIEND_REQUEST_CREATED, onIncoming);
      socket.off(FriendSocketEvents.FRIEND_REQUEST_ACCEPTED, onAccepted);
      socket.off(FriendSocketEvents.FRIEND_REQUEST_REJECTED, onRejected);
      socket.off("connect", onReconnect);
    };
  }, [userId]);
};