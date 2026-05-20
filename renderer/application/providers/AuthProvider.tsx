'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../features/auth/hooks';
import { useAuthStore } from '../../features/auth/store';
import { api } from '../../lib/api';

export const AuthProvider = ({ children }: any) => {
  const { refresh, restoreSession } = useAuth();
  const [mounted, setMounted] = useState<boolean>(() => false);
  const clearAuth = useAuthStore(s => s.clearAuth)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const init = async () => {
      try {
        await api.post('/auth/refresh');
        await restoreSession(); // calls /me
      } catch {
        try {
          await refresh();      // 🔥 attempt refresh if /me fails
          await restoreSession();
        }
        catch { clearAuth(); }
      } finally { setMounted(() => true); }
    };

    init();
    return () => { if (interval) clearInterval(interval); };
  }, []);

  if (!mounted) return null; // 🔥 prevents mismatch
  return children;
};