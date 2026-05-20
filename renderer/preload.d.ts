import { ElectronHandler, EnvHandler, IpcHandler, TerminalHandler } from '../main/preload'

declare global {
  interface Window {
    ipc: IpcHandler;
    electron: ElectronHandler;
    env: EnvHandler;
    terminal: TerminalHandler;
  }
}
