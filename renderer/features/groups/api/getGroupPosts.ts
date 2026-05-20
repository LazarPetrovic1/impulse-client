import { api } from "../../../lib/api";

export const getGroupPosts = async (id: number) => {
  try {
    const res = await api.get(`/posts/group/${id}`)
    return res.data;
  }
  catch (e) { console.warn(`Error encountered @getUsersPosts:\n${e.name} ::: ${e.message}`); throw e; }
}