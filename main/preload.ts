import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

const ipcHandler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value)
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
}

const electronHandler = {
  toggleDevTools: async () => ipcRenderer.invoke("toggle-dev-tools"),
  reload: async () => ipcRenderer.invoke("reload-app"),
  getAppVersion: async () => {
    const val: Promise<string> = await ipcRenderer.invoke('get-app-version');
    return `The version of the application is ${val}`;
  },
  getPushToken: async (): Promise<string | null> => {
    // Ask main process for push token
    return ipcRenderer.invoke('get-push-token');
  },
  onPushNotification: (callback: (data: any) => void) => {
    ipcRenderer.on('push-notification', (_, data) => callback(data));
  },
  offPushNotification: (callback: (...args: any[]) => void) => {
    ipcRenderer.removeListener('push-notification', callback);
  },
  setAuthToken: (token: string) => ipcRenderer.send('set-auth-token', token),
  sendMenuAction: (action: string) => ipcRenderer.send('menu-action', action),
  getIsMaximized: async (): Promise<boolean> => ipcRenderer.invoke('is-maxed'), // from your previous handle
  // listen for changes
  onMaximizeChange: (callback: (isMaximized: boolean) => void) => {
    ipcRenderer.on('window-maximized', (_, isMaximized: boolean) => callback(isMaximized));
  },
  offMaximizeChange: (callback: (...args: any[]) => void) => {
    ipcRenderer.removeListener('window-maximized', callback);
  },
  getFontList: () => ipcRenderer.invoke("get-fonts"),
  openExternal: (url: string) => ipcRenderer.invoke('shell:openExternal', url)
}

const envHandler = {
  api: process.env.NEXT_PUBLIC_MAIN_API_URL,
  chats: process.env.NEXT_PUBLIC_CHATS_API_URL,
  sockets: process.env.NEXT_PUBLIC_WS_URL
}

const terminalHandler = {
  createSession: () => ipcRenderer.invoke("terminal:create"),
  write: (sessionId: string, data: string) =>
    ipcRenderer.send("terminal:write", { sessionId, data }),
  resize: (sessionId: string, cols: number, rows: number) =>
    ipcRenderer.send("terminal:resize", { sessionId, cols, rows }),
  onData: (callback: (payload: any) => void) => {
    const listener = (_: any, payload: any) => callback(payload);
    ipcRenderer.on("terminal:data", listener);
    return () => {
      ipcRenderer.removeListener("terminal:data", listener);
    };
  },
  kill: (sessionId: string) => ipcRenderer.invoke("terminal:kill", sessionId),
}

contextBridge.exposeInMainWorld('ipc', ipcHandler)
contextBridge.exposeInMainWorld('env', envHandler)
contextBridge.exposeInMainWorld('electron', electronHandler)
contextBridge.exposeInMainWorld('terminal', terminalHandler)

export type IpcHandler = typeof ipcHandler;
export type EnvHandler = typeof envHandler;
export type ElectronHandler = typeof electronHandler;
export type TerminalHandler = typeof terminalHandler;
