import { useTranslation } from "react-i18next"
import { useFont } from "../../../features/font";

export const FontSizeSwitcher = () => {
  const { fontSize, setFontSize } = useFont();
  const { t } = useTranslation()
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <label htmlFor="font-size" className="d-inline-block mr-3">{t("fonts.switchfs")}</label>
        <input type="range" name="font-size" id="font-size" min={10} max={32}
          value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}
        />
        <span>{fontSize}px</span>
      </div>
    </div>
  )
}