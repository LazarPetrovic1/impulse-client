import { create } from "zustand";
import { Post } from "../types";

export interface PostsStore {
  posts: Post[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  // setters
  setPosts: (posts: Post[]) => void;
  updatePost: (post: Partial<Post> & { id: number }) => void;
  removePost: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPagination: (page: number, hasMore: boolean) => void;
  reset: () => void;
}

export const usePostsStore = create<PostsStore>((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  setPosts: (posts) => set({ posts }),
  updatePost: (updated) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === updated.id ? { ...p, ...updated } : p
      ),
    })),

  removePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    })),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  setPagination: (page, hasMore) => set({ page, hasMore }),

  reset: () =>
    set({
      posts: [],
      page: 1,
      hasMore: true,
    }),
}));