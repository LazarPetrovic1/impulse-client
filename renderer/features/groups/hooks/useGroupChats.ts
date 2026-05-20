import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../auth/store";
import { getGroupChats } from "../api";

export function useGroupChats() {
  const userId = useAuthStore(s => s.user?.id)
  return useQuery({
    queryKey: ["group-chats", userId],
    queryFn: getGroupChats,
    enabled: !!userId,
    select: (data) => data ?? [],
  });
}