import { useEffect, useState } from 'react';
import { getNotifications } from '../api';
import { useNotificationStore } from '../store';
import { useAuthStore } from '../../auth/store';

export const useNotifications = (enabled: boolean) => {
  const addBulk = useNotificationStore((s) => s.addBulk);
  const [cursor, setCursor] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(true);
  const { isAuthenticated, isReady } = useAuthStore()

  const loadMore = async () => {
    if (!hasMore) return;
    const res = await getNotifications(cursor);
    addBulk(res.notifications);
    setCursor(res.nextCursor);
    if (!res.nextCursor) setHasMore(false);
  };

  useEffect(() => {
    if (!isAuthenticated || !isReady) return;
    loadMore();
  }, [isReady, isAuthenticated]);

  return { loadMore, hasMore };
};