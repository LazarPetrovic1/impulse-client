import { CenteredLayout } from "./layout";
import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation();

  return (
    <div style={{ overflowY: "auto", width: "100%" }} className="pt-2 mb-5">
      <CenteredLayout>
        <h1 className="text-center text-primary">Impulse</h1>
        <p className="lead">{t("about.1")}</p>
        <p>{t("about.2")}</p>
        <p>{t("about.3")}</p>
        <p>{t("about.4")}</p>

        <h3 className="my-4 text-center">{t("about.otherprojects")}</h3>

        {/* Cards */}
        <div className="d-flex flex-wrap justify-content-between">
          <button
            className="btn btn-secondary"
            onClick={() => window.electron.openExternal("https://github.com/LazarPetrovic1/financier")}>
            Financier
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => window.electron.openExternal("https://github.com/LazarPetrovic1/zeitmeister")}>
            Zeitmeister
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => window.electron.openExternal("https://github.com/LazarPetrovic1/music-player")}>
            Ongaku
          </button>
        </div>

        <h3 className="my-4 text-center">{t("about.followme")}</h3>
        <button className="btn btn-primary btn-block" onClick={() => window.electron.openExternal("https://github.com/LazarPetrovic1")}>
          <i className="fas fa-user-plus pr-1"/ > GitHub
        </button>
      </CenteredLayout>
    </div>
  );
}