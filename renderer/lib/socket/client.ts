import { io, Socket } from 'socket.io-client';
import { config } from '../config';

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(config.WS_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      autoConnect: true
    });
    socket.on("connect", () => { console.log("✅ CONNECTED", socket.id) });
    socket.on("disconnect", (r) => { console.log("❌ DISCONNECTED", r) });
  }
  
  // console.log("SOCKET ID:", socket?.id, "CONNECTED:", socket?.connected)

  if (!socket) {
    socket = io(config.WS_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      autoConnect: true
    });

    socket.onAnyOutgoing((event, ...args) => {
      console.log("📤 OUTGOING:", event, args);
      // console.log("EMIT USING SOCKET ID:", socket.id);
      console.log("CONNECTED?", socket.connected);
    });
  }
  
  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};