// hooks/useGroupMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptInvite, inviteUsers, kickUser, leaveGroup, promoteUser, rejectInvite } from "../api";
import { joinGroup } from "../api/handleImpositions";

export function useGroupMutations(groupId: number) {
  const queryClient = useQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    queryClient.invalidateQueries({ queryKey: ["group-members", groupId] });
    queryClient.invalidateQueries({ queryKey: ["posts", { type: "me" }] });
  };

  const invite = useMutation({
    mutationFn: (userIds: number[]) => inviteUsers(groupId, userIds),
    onSuccess: invalidate,
  });
  
  const accept = useMutation({
    mutationFn: (userId: number) => acceptInvite(groupId, userId),
    onSuccess: invalidate,
  });

  const reject = useMutation({
    mutationFn: (userId: number) => rejectInvite(groupId, userId),
    onSuccess: invalidate,
  });
  
  const promote = useMutation({
    mutationFn: (body: { targetUserId: number }) => promoteUser(groupId, body.targetUserId),
    onSuccess: invalidate,
  });

  const leave = useMutation({
    mutationFn: async () => await leaveGroup(groupId),
    onSuccess: invalidate,
  });

  const kick = useMutation({
    mutationFn: (userId: number) => kickUser(groupId, userId),
    onSuccess: invalidate,
  });

  const join = useMutation({
    mutationFn: () => joinGroup(groupId),
    onSuccess: invalidate,
  })

  return { invite, leave, kick, promote, accept, reject, join };
}