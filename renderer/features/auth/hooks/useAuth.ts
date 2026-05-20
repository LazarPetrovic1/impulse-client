import { useRouter } from 'next/navigation';
import { loginRequest, logoutRequest, refreshRequest } from '../api';
import { useAuthStore } from '../store';
import { api } from '../../../lib/api';

export const useAuth = () => {
  const { setAuth, clearAuth, setReady } = useAuthStore();
  const router = useRouter();
  
  const login = async (credentials: any) => {
    try {
      await restoreSession();
      const { user } = await loginRequest(credentials);
      if (user) {
        setAuth(user);
        setReady(true)
      }
    } catch (e) {
      clearAuth();
      router.push('/login');
      throw e;
    }
  };

  const logout = async (id: number) => {
    await logoutRequest(id);
    clearAuth();
  };

  const refresh = async () => {
    try {
      await refreshRequest();
    } catch (error) { clearAuth(); }
  }

  const restoreSession = async () => {
    try {
      const res = await api.get('/me');
      setAuth(res.data);
      setReady(true)
    } catch (e) {
      clearAuth();
      setReady(true);
    }
  };

  return { login, logout, refresh, restoreSession };
};