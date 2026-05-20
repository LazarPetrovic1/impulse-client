import { api } from "../../../lib/api";

export const acceptInvite = async (groupId: number, userId: number) => {
  try { return (await api.post(`/group/${groupId}/accept`, { userId })).data; }
  catch (e) { console.warn(`Error encountered @acceptInvite:\n${e.name} ::: ${e.message}`); throw e; }
}

export const rejectInvite = async (groupId: number, userId: number) => {
  try { return (await api.post(`/group/${groupId}/reject`, { userId })).data; }
  catch (e) {console.warn(`Error encountered @rejectInvite:\n${e.name} ::: ${e.message}`); throw e; }
}