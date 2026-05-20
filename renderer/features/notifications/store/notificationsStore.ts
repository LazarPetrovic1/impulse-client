import { create } from 'zustand';
import { Notification } from '../types';

const sortNotifications = (notifs: Notification[]) =>
  [...notifs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
const dedupe = (notifs: Notification[]) => Array.from( new Map(notifs.map((n) => [n.id, n])).values());

type NotificationState = {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notif: Notification) => void;
  addBulk: (notifs: Notification[]) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clear: () => void;
  setUnreadCount: (count: number) => void;
  hydrated: boolean;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  hydrated: false,
  addNotification: (notif) =>
    set((state) => {
      const merged = dedupe([notif, ...state.notifications]);
      return {
        notifications: sortNotifications(merged),
        unreadCount: notif.read ? state.unreadCount : state.unreadCount + 1,
      };
    }),

  addBulk: (notifs) =>
    set((state) => {
      const merged = dedupe([...notifs, ...state.notifications]);
      const unread = merged.filter((n) => !n.read).length;
      return {
        notifications: sortNotifications(merged),
        unreadCount: unread,
        hydrated: true
      };
    }),

  markAsRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) => n.id === id ? { ...n, read: true } : n);
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  removeNotification: (id) =>
    set((state) => {
      const filtered = state.notifications.filter((n) => n.id !== id);
      return {
        notifications: filtered,
        unreadCount: filtered.filter((n) => !n.read).length,
      };
    }),

  clear: () => set({ notifications: [], unreadCount: 0 }),
  setUnreadCount: (count) => set({ unreadCount: count }),
}));