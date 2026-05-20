import { api } from "../../../lib/api";

export const leaveGroup = async (groupId: number) => {
  try {
    console.log("GROUPID", groupId);
    return await api.delete(`/group/${groupId}/leave`);
  } catch (e) {
    console.warn(`Error encountered @leaveGroup:\n${e.name} ::: ${e.message}`); throw e;
  }
}