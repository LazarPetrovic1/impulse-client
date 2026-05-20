import { useRouter } from "next/router";
import { useAuth } from "../../features/auth/hooks";
import { commandRegistry, registerDefaultCommands } from "../../lib/commands";
import { CommandPalette } from "../../components/common";
import { useCallback, useEffect } from "react";
import { useAuthStore } from "../../features/auth/store";

export const CommandPaletteProvider = ({ children }) => {
  const router = useRouter();
  const { logout } = useAuth();
  const user = useAuthStore(s => s.user);
  const logoutFn = useCallback(() => user && user.id ? logout(user.id) : null, [user]);
  useEffect(() => {
    commandRegistry.clear();
    registerDefaultCommands(router, logoutFn);
  }, [router, logoutFn]);
  registerDefaultCommands(router, logoutFn);

  return (
    <>
      {children}
      <CommandPalette />
    </>
  );
};