import { api } from "../../../lib/api"

export const inviteUsers = async (groupId: number, userIds: number[]) => {
  try {
    return (await api.post(`/group/${groupId}/invite`, { body: userIds })).data;
  } catch (e) {
    console.warn(`Error encountered @inviteUsers:\n${e.name} ::: ${e.message}`); throw e;
  }
}