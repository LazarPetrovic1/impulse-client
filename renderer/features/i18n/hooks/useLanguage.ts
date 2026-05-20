import { useEffect } from 'react';
import { useLanguageStore } from '../store/languageStore';
import { i18n } from '../../../lib/i18n';

export const useLanguage = () => {
  const { language, setLanguage } = useLanguageStore();
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);
  return { language, changeLanguage: setLanguage };
};