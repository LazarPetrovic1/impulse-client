import { api } from "../../../lib/api";

export const promoteUser = async (groupId: number, targetUserId: number) => {
  try {
    return (await api.post(`/group/${groupId}/promote`, { targetUserId })).data;
  } catch (e) {
    console.warn(`Error encountered @promoteUser:\n${e.name} ::: ${e.message}`); throw e;
  }
}