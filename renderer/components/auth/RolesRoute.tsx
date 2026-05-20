'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../features/auth/store';

type RolesRouteProps = { children: ReactNode; };

export const RolesRoute = ({ children }: RolesRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(() => true);
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const hasRole = user?.userRole === "ADMIN" || user?.userRole === "MOD" || user?.userRole === "SYSTEM";
    if (!hasRole) router.push('/unauthorized');
  }, [isAuthenticated, user, router]);

  if (!mounted || !isAuthenticated || !user) return null;
  return <>{children}</>;
};