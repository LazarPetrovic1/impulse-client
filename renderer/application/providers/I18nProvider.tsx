// application/providers/I18nProvider.tsx
import { useEffect } from 'react';
import { useLanguageStore } from '../../features/i18n/store/languageStore';
import { i18n } from '../../lib/i18n';

export const I18nProvider = ({ children }) => {
  const language = useLanguageStore((s) => s.language);
  useEffect(() => {
    if (i18n.language !== language) i18n.changeLanguage(language);
    document.documentElement.lang = language;
  }, [language]);
  return children;
};