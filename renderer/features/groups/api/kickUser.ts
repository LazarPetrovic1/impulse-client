import { api } from "../../../lib/api";

export const kickUser = async (groupId: number, userId: number) => {
  try {
    const res = await api.delete(`/group/${groupId}/members/${userId}`)
    console.log("REZ", res);
    return res.data
  } catch (e) {
    console.warn(`Error encountered @kickUser:\n${e.name} ::: ${e.message}`); throw e;
  }
}