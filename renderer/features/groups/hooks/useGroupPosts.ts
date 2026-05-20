import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGroupPosts } from "../api";
import { createPost } from "../../posts";
import { useAuthStore } from "../../auth/store";

export function useGroupPosts(groupId: number) {
  return useQuery({
    queryKey: ["posts", { type: "group", groupId }],
    queryFn: () => getGroupPosts(groupId),
    enabled: !!groupId,
  });
}

export function useCreateGroupPost(groupId: number) {
  const userId = useAuthStore(s => s.user.id)
  const queryClient = useQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["posts", { type: "group", groupId }] });
    queryClient.invalidateQueries({ queryKey: ["posts", { type: "fyp", userId }] });
    queryClient.invalidateQueries({ queryKey: ["posts", { type: "me" }] });
  }
  return useMutation({
    mutationFn: async (payload: any) => await createPost(payload),
    onSuccess: invalidate,
  });
}