import { api } from "../../../lib/api";

export const loginRequest = async (credentials: { login: string; password: string; }) => {
  try {
    const res = await api.post('/auth/login', credentials);
    return res.data as { user: any; };
  } catch (error) { throw error; }
};

export const registerRequest = async (data: any) => {
  try {
    const res = await api.post('/auth/register', data);
    return res.data as {
      user: any;
    };
  } catch (error) { throw error; }
};

export const refreshRequest = async () => {
  try { return await api.post('/auth/refresh'); }
  catch (error) { throw error }
};

export const logoutRequest = async (id: number) => await api.post('/auth/logout', { userId: id });
