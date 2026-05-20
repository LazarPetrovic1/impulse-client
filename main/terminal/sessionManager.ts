// import pty from "node-pty";
// import { BrowserWindow } from "electron";
// import crypto from "crypto";
// const sessions = new Map();

// export function createTerminalSession(win: BrowserWindow) {
//   const shell = process.platform === "win32" ? "powershell.exe" : "bash";
//   const ptyProcess = pty.spawn(shell, [], {
//     name: "xterm-color", cols: 80, rows: 24, cwd: process.cwd(), env: process.env,
//   });

//   const id = crypto.randomUUID();
//   sessions.set(id, ptyProcess);
//   ptyProcess.onData((data) => {
//     win.webContents.send("terminal:data", { sessionId: id, data });
//   });

//   return { id };
// }

import * as pty from "node-pty";

const sessions = new Map<string, pty.IPty>();

export function createTerminalSession() {
  const shell = process.platform === "win32" ? "powershell.exe" : "bash";
  const ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.cwd(),
    env: process.env,
  });

  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, ptyProcess);
  return { sessionId, ptyProcess };
}

export function getSession(sessionId: string) { return sessions.get(sessionId); }

export function killSession(sessionId: string) {
  const session = sessions.get(sessionId);
  if (!session) return;
  session.kill();
  sessions.delete(sessionId);
}