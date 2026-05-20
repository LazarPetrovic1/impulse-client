import { useEffect } from "react";
import { useNotificationStore } from "../store";
import { getNotifications } from "../api";
import { useAuthStore } from "../../auth/store";

export const useInitNotifications = () => {
  const addBulk = useNotificationStore((s) => s.addBulk);
  const { isAuthenticated, isReady } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !isReady) return;
    const load = async () => {
      const res = await getNotifications();
      addBulk(res);
    };

    load();
  }, [isAuthenticated, isReady]);
};