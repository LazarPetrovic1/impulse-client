import { useQuery } from "@tanstack/react-query";
import { getMyPosts } from "../api/getMyPosts";
import { useAuthStore } from "../../auth/store";

export function useMyPosts() {
  const user = useAuthStore(s => s.user)
  return useQuery({ queryKey: ["posts", { type: "me" }], queryFn: getMyPosts, enabled: !!user });
}