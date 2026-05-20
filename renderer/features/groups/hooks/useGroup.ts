import { useQuery } from "@tanstack/react-query";
import { getGroup } from "../api";

export function useGroup(groupId: number) {
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getGroup(groupId),
    enabled: !!groupId,
  });
}