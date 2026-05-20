import { useEffect } from "react";
import { useTerminal, useTerminalStore } from "../../../features/terminal";
import { useTheme } from "styled-components";

export function TerminalView() {
  const { sessionId, setSessionId } = useTerminalStore();
  const { terminalRef } = useTerminal(sessionId);
  const theme = useTheme();
  useEffect(() => { init(); }, []);
  async function init() {
    const sessionId = await window.terminal.createSession();
    setSessionId(sessionId);
  }

  return (
    <div
      ref={terminalRef}
      style={{ width: "100%", height: "100%", background: theme.colors.background }}
    />
  );
}