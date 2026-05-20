import { api } from "../../../lib/api";

export const getUserById = async (id: number) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const updateUser = async (id: number, data: any) => {
  const res = await api.patch(`/users/${id}`, data);
  return res.data;
};

export const updateHidden = async (id: number, hidden: string[]) => {
  const res = await api.patch(`/users/${id}/hidden`, { hidden });
  return res.data;
};

export const createProfile = async (id: number, data: any) => {
  const res = await api.post(`/profile/${id /* user_id */}`, data);
  return res.data
}

export const updateProfile = async (data: any) => {
  const res = await api.patch(`/profile/${data.id /* user_id */}`, data);
  return res.data
}

export const getProfile = async (id: number) => {
  const res = await api.get(`/profile/user/${id /* user_id */}`);
  return res.data
}