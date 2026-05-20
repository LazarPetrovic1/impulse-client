import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api";

export function useGroupMembers(groupId: number) {
  return useQuery({
    queryKey: ["group-members", groupId],
    queryFn: () => getMembers(groupId),
    enabled: !!groupId,
  });
}