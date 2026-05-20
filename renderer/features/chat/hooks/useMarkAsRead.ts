import { useReadStore } from '../store/readStore';
import { useUnreadStore } from '../store/unreadStore';
import { markAsRead } from '../api/markAsRead';

export const useMarkAsRead = () => {
  const setLastRead = useReadStore((s) => s.setLastRead);
  const resetUnread = useUnreadStore((s) => s.reset);
  const mark = async (chatId: string, messageId: string) => {
    setLastRead(chatId, messageId);
    resetUnread(chatId);
    try { await markAsRead(chatId, messageId); }
    catch (err) { console.error('Failed to mark as read', err); }
  };
  return { mark };
};