import { api } from "../../../lib/api";

export const getGroupChats = async () => {
  try { return (await api.get(`/me/group/chats`)).data; }
  catch (e) { console.warn(`Error encountered @getGroupChats:\n${e.name} ::: ${e.message}`); throw e; }
}