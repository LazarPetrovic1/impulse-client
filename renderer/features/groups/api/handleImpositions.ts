import { api } from "../../../lib/api";

export const joinGroup = async (groupId: number) => {
  try { return (await api.patch(`/group/${groupId}/join`)).data; }
  catch (e) { console.warn(`Error encountered @joinGroup:\n${e.name} ::: ${e.message}`); throw e; }
}