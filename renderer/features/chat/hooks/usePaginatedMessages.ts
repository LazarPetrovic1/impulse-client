import { useInfiniteQuery } from '@tanstack/react-query';
import { getMessages, PaginatedMessages } from '../api/getMessages';
import { useChatStore } from '../store/chatStore';
import { useEffect } from 'react';
import { loadMessages } from '../../../lib/storage';

export const usePaginatedMessages = (chatId: string) => {
  const reconcileBulk = useChatStore((s) => s.reconcileBulk);
  const query = useInfiniteQuery({
    queryKey: ['messages', chatId],
    queryFn: ({ pageParam }: { pageParam: string }) => getMessages(chatId, pageParam || undefined),
    getNextPageParam: (lastPage: PaginatedMessages) => lastPage?.nextCursor,
    initialPageParam: "" as string, // Add this line
  });
  useEffect(() => {
    const loadOffline = async () => {
      const cached = await loadMessages(chatId);
      reconcileBulk(chatId, cached);
    };
    loadOffline();
  }, [chatId]);
  return query;
};