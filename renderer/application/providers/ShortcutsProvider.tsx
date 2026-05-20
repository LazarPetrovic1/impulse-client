import { useRouter } from "next/navigation";
import { setShortcutsLocked, useGlobalShortcuts } from "../../features/system/shortcuts";
import { useAuth } from "../../features/auth/hooks";
import { useAuthStore } from "../../features/auth/store";
import { useEffect } from "react";

export const ShortcutsProvider = ({ children }) => {
  const router = useRouter();
  const { logout } = useAuth()
  const { user } = useAuthStore()
  const logoutFn = () => logout(user.id);
  useGlobalShortcuts(router, logoutFn);
  useEffect(() => {
    const onModalOpen = () => setShortcutsLocked(true);
    const onModalClose = () => setShortcutsLocked(false);

    window.addEventListener("modal:open", onModalOpen);
    window.addEventListener("modal:close", onModalClose);

    return () => {
      window.removeEventListener("modal:open", onModalOpen);
      window.removeEventListener("modal:close", onModalClose);
    };
  }, []);
  return children;
};