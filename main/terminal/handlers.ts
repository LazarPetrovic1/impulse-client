import { ipcMain, BrowserWindow, WebContents } from "electron";
import { createTerminalSession, getSession, killSession } from "./sessionManager";
import { validateCommand } from "./permissions";

interface SessionOwner { webContents: WebContents; }
const owners = new Map<string, SessionOwner>();
let registered = false;
export function registerTerminalHandlers() {
  /* PREVENT DOUBLE REGISTRATION */
  if (registered) return;
  registered = true;

  /* CREATE SESSION */

  ipcMain.handle("terminal:create", async (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) throw new Error("Window not found");
    const { sessionId, ptyProcess } = createTerminalSession();

    /* STORE OWNER */
    owners.set(sessionId, { webContents: event.sender });

      /* STREAM OUTPUT */
    ptyProcess.onData((data) => {
      const owner = owners.get(sessionId);
      if (!owner) return;
      if (owner.webContents.isDestroyed()) {
        killSession(sessionId);
        owners.delete(sessionId);
        return;
      }
      owner.webContents.send("terminal:data", { sessionId, data });
    });

    /* AUTO CLEANUP */
    win.on("closed", () => {
      killSession(sessionId);
      owners.delete(sessionId);
    });
    return sessionId;
  });

  /* WRITE TO PTY */

  ipcMain.on("terminal:write", (_, payload) => {
    const { sessionId, data } = payload;
    validateCommand(data);
    const session = getSession(sessionId);
    if (!session) return;
    session.write(data);
  });

  /* RESIZE PTY */
  ipcMain.on("terminal:resize", (_, payload) => {
    const { sessionId, cols, rows } = payload;
    const session = getSession(sessionId);
    if (!session) return;
    session.resize(cols, rows);
  });

  /* KILL SESSION */
  ipcMain.handle("terminal:kill", async (_, sessionId) => {
    owners.delete(sessionId);
    killSession(sessionId);
  });
}

// export function registerTerminalHandlers(win: BrowserWindow) {
//   ipcMain.handle("terminal:create", async () => createTerminalSession(win));
//   ipcMain.on("terminal:write", (_, payload) => {
//     const { sessionId, data } = payload;
//     validateCommand(data);
//     const session = getSession(sessionId);
//     if (!session) return;
//     session.write(data);
//   });

//   ipcMain.on("terminal:resize", (_, payload) => {
//     const { sessionId, cols, rows } = payload;
//     const session = getSession(sessionId);
//     if (!session) return;
//     session.resize(cols, rows);
//   });

//   ipcMain.handle("terminal:kill", async (_, sessionId) => killSession(sessionId));
// }