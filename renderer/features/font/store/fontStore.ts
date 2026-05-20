// stores/fontStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MIN = 10;
const MAX = 32;

type FontState = {
  fonts: string[];
  font: string;
  fontSize: number;

  hydrated: boolean;
  fontsLoaded: boolean;

  init: () => Promise<void>;
  setFont: (font: string) => void;
  setFontSize: (size: number) => void;
};

export const useFontStore = create<FontState>()(
  persist(
    (set, get) => ({
      fonts: [],
      font: 'System',
      fontSize: 16,

      hydrated: false,
      fontsLoaded: false,

      init: async () => {
        if (get().fontsLoaded) return;

        try {
          const fonts = await window.electron?.getFontList?.();

          set({
            fonts: fonts || [],
            fontsLoaded: true,
          });
        } catch (e) {
          console.error('Failed to load fonts', e);
          set({ fontsLoaded: true });
        }
      },

      setFont: (font) => set({ font }),

      setFontSize: (size) =>
        set({
          fontSize: Math.min(MAX, Math.max(MIN, size)),
        }),
    }),
    {
      name: 'font-settings',
      onRehydrateStorage: () => (state) => {
        state && (state.hydrated = true);
      },
    }
  )
);