import { useEffect } from 'react';
import { registerDevice } from '../api';
import { useNotificationStore } from '../store';

export const usePushNotifications = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) return;
    const setup = async () => {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;
      const token = await window.electron?.getPushToken?.();
      if (token) await registerDevice(token);
    };
    setup();

    const addNotification = useNotificationStore.getState().addNotification;

    // ✅ handler for incoming push events from Electron
    const handlePush = (payload: any) => {
      // 1. Show OS-level notification
      const notif = new Notification(payload.title || 'Notification', { body: payload.body });

      // 2. Sync into app state
      addNotification({
        id: payload.id,
        type: payload.type || 'system',
        content: payload.body,
        createdAt: payload.createdAt || new Date().toISOString(),
        read: false,
        ...payload,
      });

      // 3. Optional: handle click (navigation later)
      notif.onclick = () => {
        window.focus();
        // future: navigate to chat / post
      };
    };

    // ✅ subscribe to Electron bridge
    window.electron?.onPushNotification?.(handlePush);

    return () => {
      // ✅ cleanup
      window.electron?.offPushNotification?.(handlePush);
    };
  }, []);
};