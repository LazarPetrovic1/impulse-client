import { api } from "../../../lib/api";

export const getGroup = async (id: number) => {
  try { return (await api.get(`/group/${id}`)).data; }
  catch (e) { console.warn(`Error encountered @getGroup:\n${e.name} ::: ${e.message}`); throw e; }
}

export const getUsersGroups = async () => {
  try { return (await api.get(`/group/mine`)).data; }
  catch (e) { console.warn(`Error encountered @getUsersGroups:\n${e.name} ::: ${e.message}`); throw e; }
}