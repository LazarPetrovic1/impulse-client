import { io, Socket } from 'socket.io-client';
import { BrowserWindow } from 'electron';
import { config } from '../renderer/lib/config';

const sockets = new Map<number, Socket>();

export const initPushSocket = (win: BrowserWindow, token?: string) => {
  const id = win.webContents.id;
  if (sockets.has(id)) return;
  const socket = io(config.WS_URL as string, { transports: ['websocket'], auth: { token } });
  sockets.set(id, socket);
  socket.on('connect', () => { console.log(`[PushSocket] connected (${id})`) });
  socket.on('notification', (payload) => {
    if (win.isDestroyed() || win.webContents.isDestroyed()) return;
    win.webContents.send('push-notification', payload);
  });

  socket.on('disconnect', () => { console.log(`[PushSocket] disconnected (${id})`); });
  // cleanup when window closes
  win.on('closed', () => {
    sockets.delete(id);
    socket.removeAllListeners();
    socket.disconnect();
  });
};