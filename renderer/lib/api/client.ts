import axios from 'axios';
import { config } from '../config';
import { useAuthStore } from '../../features/auth/store';
import { getSocket } from '../socket';
import { refreshRequest } from '../../features/auth/api';

let isRefreshing = false;
let subscribers: (() => void)[] = [];

function onRefreshed() {
  subscribers.forEach(cb => cb());
  subscribers = [];
}

export const uploader = axios.create({
  baseURL: `${config.API_URL}/api`,
  withCredentials: true,
  headers: { "Content-Type": "multipart/form-data" }
});

uploader.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    const { clearAuth } = useAuthStore.getState();
    if (!err.response) return Promise.reject(err);
    const isAuthRoute = original.url.includes('/auth/login') || original.url.includes('/auth/refresh');
    if (err.response.status !== 401 || original._retry || isAuthRoute) return Promise.reject(err);
    original._retry = true;
    try {
      await refreshRequest();
      const socket = getSocket();
      if (socket) {
        socket.disconnect();
        socket.connect();
      }
      return api(original);
    } catch {
      clearAuth();
      return Promise.reject(err);
    }
  }
);

export const api = axios.create({
  baseURL: `${config.API_URL}/api`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.response.use((res) => res, async (err) => {
  console.log("ERROR FROM INTERCEPTOR", { err });
  
  const original = err.config;
  if (!err.response) return Promise.reject(err);
  const isAuthRoute = original.url.includes('/auth/login') || original.url.includes('/auth/refresh');
  if (err.response.status !== 401 || original._retry || isAuthRoute) return Promise.reject(err);
  original._retry = true;
  if (isRefreshing) return new Promise(resolve => { subscribers.push(() => resolve(api(original))); });
  isRefreshing = true;
  
  try {
    await api.post('/auth/refresh');
    onRefreshed();
    return api(original)
  } catch (e) {
    useAuthStore.getState().clearAuth();
    return Promise.reject(e);
  } finally { isRefreshing = false; }
});

// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const original = err.config;
//     const { clearAuth } = useAuthStore.getState();
//     if (!err.response) return Promise.reject(err);
//     const isAuthRoute = original.url.includes('/auth/login') || original.url.includes('/auth/refresh');
//     if (err.response.status !== 401 || original._retry || isAuthRoute) return Promise.reject(err);
//     original._retry = true;
//     try {
//       await api.post('/auth/refresh');
//       const socket = getSocket();
//       if (socket) {
//         socket.disconnect();
//         socket.connect();
//       }
//       return api(original);
//     } catch {
//       clearAuth();
//       return Promise.reject(err);
//     }
//   }
// );

export const chatsApi = axios.create({
  baseURL: config.CHAT_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

chatsApi.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    const { clearAuth } = useAuthStore.getState();
    if (!err.response) return Promise.reject(err);
    const isAuthRoute = original.url.includes('/auth/login') || original.url.includes('/auth/refresh');
    if (err.response.status !== 401 || original._retry || isAuthRoute) return Promise.reject(err);
    original._retry = true;
    try {
      await refreshRequest();
      return api(original);
    } catch {
      clearAuth();
      return Promise.reject(err);
    }
  }
);