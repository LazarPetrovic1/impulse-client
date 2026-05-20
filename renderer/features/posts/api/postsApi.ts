import { api } from "../../../lib/api";
import { uploader } from "../../../lib/api";
import { Reaction } from "../types";

export const getAllPosts = async () => {
  const { data } = await api.get("/posts");
  return data;
};

export const getPaginatedPosts = async (cursor = 1, limit = 20, userId?: number) => {
  const { data } = await api.get("/posts", {
    params: { cursor, limit, userId },
  });
  // console.log("RETURN FROM PAGINATED", { cursor, limit, userId, data });
  return data;
}

export const getPaginatedFYP = async (page = 1, userId?: number) => {
  const res = await api.get("/posts/fyp", { params: { page } });
  // console.log("RETURN FROM PAGINATED", { page, res });
  return res.data;
}

export const createPost = async (payload: any) => {
  const { data } = await uploader.post("/posts", payload);
  return data;
}

export const updatePost = async (id: number, payload: any) => {
  const { data } = await api.patch(`/posts/${id}`, payload);
  return data;
}

export const deletePost = async (id: number) => {
  const { data } = await api.delete(`/posts/${id}`);
  return data;
};

export const reactToPost = async (id: number, reaction: Reaction) => await api.patch(`/posts/${id}/react`, { type: reaction });
export const unreactToPost = async (id: number) => await api.patch(`/posts/${id}/unreact`);