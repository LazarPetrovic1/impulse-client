import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type Language = 'en' | 'sr' | 'de' | 'ja' | 'pt' | 'es' | 'fr' | 'hi' | 'id' | 'it' | 'zh' | 'ru' | 'pl' | 'ko' | 'vi';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'app-language',
    }
  )
);