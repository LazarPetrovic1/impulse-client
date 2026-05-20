import { useEffect } from "react";
import { usePostsStore } from "../store/postsStore";
import { createPost as create, getPaginatedPosts as getPaginated, getPaginatedFYP } from "../api/postsApi";
import { useAuthStore } from "../../auth/store";
import { useQueryClient } from "@tanstack/react-query";

export function usePosts() {
  const {
    posts,
    page,
    hasMore,
    loading,
    setPosts,
    setLoading,
    setPagination,
  } = usePostsStore();
  const user = useAuthStore(s => s.user);
  const queryClient = useQueryClient();

  const fetchFYP = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await getPaginatedFYP(page, user.id);
      if (page === 1) setPosts(res.posts);
      else setPosts([...posts, ...res.posts]);
      setPagination(res.page, res.hasMore);
    } finally {
      setLoading(false);
    }
  }

  const createPost = async (payload) => {
    const res = await create(payload);
    queryClient.setQueryData(["posts", { type: "fyp", userId: user.id }], (oldData: any) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page, index) => {
          if (index === 0) return { ...page, posts: [res, ...page.posts] };
          return page;
        }),
      };
    });
    return res;
  };

  useEffect(() => {
    if (posts.length === 0) fetchFYP();
  }, []);

  return {
    posts,
    loading,
    hasMore,
    createPost,
    fetchFYP
  };
}