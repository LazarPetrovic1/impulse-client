import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../features/i18n/hooks/useLanguage";

export const LanguageSwitcher = ({ notext } : { notext?: boolean }) => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation()
  return (
    <div className="d-flex justify-content-between align-items-center" style={{ flex: 1 }}>
      {!notext && <label htmlFor="language">{t('locale.switch')}</label>}
      <select name="language" id="language" value={language} onChange={(e) => changeLanguage(e.target.value as any)}>
        <option value="en">English</option>
        <option value="sr">Српски</option>
        <option value="de">Deutsch</option>
        <option value="ja">日本語</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="zh">中文（普通话）</option>
        <option value="ru">Русский</option>
        <option value="hi">हिन्दी</option>
        <option value="id">Bahasa Indonesia</option>
        <option value="it">Italiano</option>
        <option value="ko">한국어</option>
        <option value="pl">Polski</option>
        <option value="pt">Português</option>
        <option value="vi">Tiếng Việt</option>
      </select>
    </div>
  );
};