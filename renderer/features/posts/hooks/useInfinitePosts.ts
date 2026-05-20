import { useInfiniteQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../auth/store';
import { getPaginatedFYP } from '../api/postsApi';

const empty = []
export function useInfinitePosts() {
  const user = useAuthStore(s => s.user);
  const query = useInfiniteQuery({
    queryKey: ["posts", { type: "fyp", userId: user?.id }], // or ['posts', user.id] if user-specific
    queryFn: async ({ pageParam = 1 }) => await getPaginatedFYP(pageParam, user.id),
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page : undefined,
    initialPageParam: 1,
  });
  return { ...query, posts: query.data?.pages.flatMap(p => p.posts) ?? empty };
}