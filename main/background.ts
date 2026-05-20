import path from 'path';
import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron';
import serve from 'electron-serve';
import { createWindow, retrievePushToken } from './helpers';
import { initPushSocket } from './pushSocket';
import * as dotenv from 'dotenv';
import { getFonts } from 'font-list';
import { installExtension, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { registerTerminalHandlers } from './terminal/handlers';

dotenv.config();
const isProd = process.env.NODE_ENV === 'production';

// ✅ store auth per window
const authTokens = new Map<number, string>();

function setupWindowEvents(win: BrowserWindow) {
  const safeSend = (channel: string, payload: any) => {
    if (win.isDestroyed()) return;
    if (win.webContents.isDestroyed()) return;
    win.webContents.send(channel, payload);
  };

  win.on('maximize', () => { safeSend('window-maximized', true); });
  win.on('unmaximize', () => { safeSend('window-maximized', false); });
}

if (isProd) serve({ directory: 'app' });
else app.setPath('userData', `${app.getPath('userData')} (development)`);

// ---------------- IPC ----------------

ipcMain.handle('get-fonts', async () => await getFonts());

ipcMain.handle('get-push-token', async () => {
  return await retrievePushToken();
});

ipcMain.handle('is-maxed', () => {
  const win = BrowserWindow.getFocusedWindow();
  return win ? win.isMaximized() : false;
});

ipcMain.on('menu-action', (event, action: string) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || win.isDestroyed()) return;
  switch (action) {
    case 'quit': app.quit(); break;
    case 'reload': win?.reload(); break;
    case 'toggle-devtools': win?.webContents.toggleDevTools(); break;
    case 'minimize': win?.minimize(); break;
    case 'maximize': win?.isMaximized() ? win.unmaximize() : win?.maximize(); break;
    case 'close': if (!win?.isDestroyed()) win.destroy(); break;
    default: console.warn('Unknown menu action:', action);
  }
});

// ✅ set auth token PER WINDOW
ipcMain.on('set-auth-token', (event, token: string) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) return;
  authTokens.set(win.webContents.id, token);
  // 🔥 initialize socket for THIS window only
  initPushSocket(win, token);
});

ipcMain.handle("get-app-version", async () => { return app.getVersion(); });
ipcMain.handle("reload-app", () => BrowserWindow.getFocusedWindow()?.reload())
ipcMain.handle("toggle-dev-tools", () => BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools())

// optional: cleanup on window close
function attachCleanup(win: BrowserWindow) {
  const id = win.webContents.id; // ✅ capture early
  win.on('closed', () => { authTokens.delete(id); });
}

// ---------------- APP INIT ----------------

(async () => {
  await app.whenReady();
  const ext = await installExtension(REACT_DEVELOPER_TOOLS)
  console.log(`Extension installed: ${ext.name}, v${ext.version}`);
  Menu.setApplicationMenu(null);
  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
    titleBarStyle: 'hidden',
    // partition: 'persist:main-window',
    partition: `temp:main-${process.pid}-${Date.now()}`,
    instanceId: 'main'
  });

  const sideWindow = createWindow('side', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'hidden',
    // partition: 'persist:side-window',
    partition: `temp:main-${process.pid}-${Date.now()}`,
    instanceId: 'side'
  });

  mainWindow.setIcon(`${__dirname}/icon_logo.png`);
  sideWindow.setIcon(`${__dirname}/icon_logo.png`);
  setupWindowEvents(mainWindow);
  setupWindowEvents(sideWindow);
  registerTerminalHandlers();
  attachCleanup(mainWindow);
  attachCleanup(sideWindow);

  if (isProd) {
    await mainWindow.loadURL('app://./home');
    await sideWindow.loadURL('app://./home');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    await sideWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
    sideWindow.webContents.openDevTools();
  }

  ipcMain.handle('shell:openExternal', (_, url) => { shell.openExternal(url); });
})();

app.on('window-all-closed', () => { app.quit(); });
ipcMain.on('message', async (event, arg) => { event.reply('message', `${arg} World!`); });