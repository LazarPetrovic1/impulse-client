import { create } from 'zustand';

type UserRole = 'USER' | 'ADMIN' | 'MOD' | 'SYSTEM';
export type SexType = "m" | "f" | "n/a"
export type User = {
  id: number;
  roles?: UserRole[];
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  sex: SexType;
  bio: string;
  refreshToken?: string;
  profile?: any;
  userRole: UserRole;
  fullName?: string;
  fullUser?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isReady: boolean,
  setAuth: (data: User) => void;
  clearAuth: () => void;
  setReady: (v: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isReady: false,
  setAuth: (user) => set({ user, isAuthenticated: true }),
  clearAuth: () => set({ user: null, isAuthenticated: false }),
  setReady: (v) => set({ isReady: v }),
}));