import { api } from "../../../lib/api";

export const getMembers = async (id: number) => {
  try {
    return (await api.get(`/group/${id}/members`)).data;
  } catch (e) {
    console.warn(`Error encountered @getMembers:\n${e.name} ::: ${e.message}`); throw e;
  }
}