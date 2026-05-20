import { useEffect } from "react";
import { RolesRoute } from "../components/auth";
import { TerminalView } from "../components/features/terminal";
import { registerDefaultCommands } from "../features/terminal";

export default function TerminalPage() {
  useEffect(() => { registerDefaultCommands(); }, []);
  return (
    <RolesRoute>
      <div style={{ width: "100vw", paddingBottom: "2rem" }}><TerminalView /></div>
    </RolesRoute>
  );
}