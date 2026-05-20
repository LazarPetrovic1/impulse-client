import { api } from "../../../lib/api";

export const getMyPosts = async () => {
  try {
    const res = await api.get("/me/posts");
    return res.data;
  } catch (e: any) {
    console.error("Error @getMyPosts:", e?.response?.data || e.message);
    throw e;
  }
};