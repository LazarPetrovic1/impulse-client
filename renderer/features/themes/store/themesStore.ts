import { create } from 'zustand';
import { ThemeName } from '../../../styles/theme/type';
import { persist } from 'zustand/middleware';

type ThemeState = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'contrast',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'app-theme',
    }
  )
);