// hooks/useFriendRequestSocket.ts
import { getSocket } from '../../lib/socket';
import { FriendSocketEvents } from '../../lib/socket';
import { api } from '../../lib/api';

export const useFriendRequestSocket = (userId: number) => {
  const sendFriendRequest = (receiverId: number) => {
    const socket = getSocket();
    if (!socket) return;
    // if (!socket.connected) {
    //   console.warn("❌ Socket not connected, skipping emit");
    //   return;
    // }
    socket.emit(FriendSocketEvents.FRIEND_REQUEST_SEND, { receiverId });
  };

  const getSentRequests = async (receiverId: number) => {
    try {
      const res = await api(`/friend-requests/sent?userId=${userId}&receiverId=${receiverId}`);
      return res.data
    } catch (e) {
      console.error('Friend request backfill failed', e);
    }
  }

  const acceptFriendRequest = (requestId: number) => {
    const socket = getSocket();
    console.log("SOCKET", socket);
    if (!socket) return;
    socket.emit(FriendSocketEvents.FRIEND_REQUEST_ACCEPT, { requestId });
  };

  const rejectFriendRequest = (requestId: number) => {
    const socket = getSocket();
    if (!socket) return;
    socket.emit(FriendSocketEvents.FRIEND_REQUEST_REJECT, { requestId });
  };

  return { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getSentRequests };
};