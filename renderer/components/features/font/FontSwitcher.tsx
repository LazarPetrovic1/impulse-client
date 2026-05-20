import { useTranslation } from "react-i18next";
import { useFont } from "../../../features/font";

export const FontSwitcher = () => {
  const { fonts, font, setFont, fontsLoaded } = useFont();
  const { t } = useTranslation()
  if (!fontsLoaded) return <div>Loading fonts...</div>;

  return (
    <div className="d-flex justify-content-between align-items-center" style={{ flex: 1, gap: 1 }}>
      <div>
        <label htmlFor="font" className="d-inline-block mr-3">{t("fonts.switchf")}</label>
        <select name="font" id="font" value={font} onChange={(e) => setFont(e.target.value)}>
          <option value="System">{t("fonts.sysdef")}</option>
          {fonts.map((f) => <option style={{ fontFamily: f }} key={f} value={f}>{f}</option>)}
        </select>
      </div>
    </div>
  );
};