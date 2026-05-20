import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import de from '../../assets/locales/de/common.json';
import en from '../../assets/locales/en/common.json';
import es from '../../assets/locales/es/common.json';
import fr from '../../assets/locales/fr/common.json';
import hi from '../../assets/locales/hi/common.json';
import id from '../../assets/locales/id/common.json';
import it from '../../assets/locales/it/common.json';
import ja from '../../assets/locales/ja/common.json';
import ko from '../../assets/locales/ko/common.json';
import pl from '../../assets/locales/pl/common.json';
import pt from '../../assets/locales/pt/common.json';
import ru from '../../assets/locales/ru/common.json';
import sr from '../../assets/locales/sr/common.json';
import vi from '../../assets/locales/vi/common.json';
import zh from '../../assets/locales/zh/common.json';

const resources = {
  de: { common: de, },
  en: { common: en, },
  es: { common: es, },
  fr: { common: fr, },
  hi: { common: hi, },
  id: { common: id, },
  it: { common: it, },
  ja: { common: ja, },
  ko: { common: ko, },
  pl: { common: pl, },
  pt: { common: pt, },
  ru: { common: ru, },
  sr: { common: sr, },
  vi: { common: vi, },
  zh: { common: zh, },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;