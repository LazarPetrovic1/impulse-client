import { useTranslation } from "react-i18next"

export function Shortcuts() {
  const { t } = useTranslation();
  return (
    <div>
      <section className="px-3 py-2">
        <h2 className="text-primary text-center display-4">{t("shortcuts.title")}</h2>
        <hr />
        <article className="my-2">
          <h3 className="text-secondary text-bold">{t("shortcuts.ctrl")}</h3>
          <ul className="list-group">
            <li className="list-group-item list-group-item-primary" style={{ color: '#444' }}><code style={{ color: '#222' }}>CTRL + 1</code> - {t("shortcuts.goto")} '/'</li>
            <li className="list-group-item list-group-item-primary" style={{ color: '#444' }}><code style={{ color: '#222' }}>CTRL + 2</code> - {t("shortcuts.goto")} '/dashboard'</li>
            <li className="list-group-item list-group-item-primary" style={{ color: '#444' }}><code style={{ color: '#222' }}>CTRL + 3</code> - {t("shortcuts.goto")} '/settings'</li>
            <li className="list-group-item list-group-item-primary" style={{ color: '#444' }}><code style={{ color: '#222' }}>CTRL + 4</code> - {t("shortcuts.goto")} '/forum'</li>
            <li className="list-group-item list-group-item-primary" style={{ color: '#444' }}><code style={{ color: '#222' }}>CTRL + 5</code> - {t("shortcuts.goto")} '/social'</li>
            <li className="list-group-item list-group-item-primary" style={{ color: '#444' }}><code style={{ color: '#222' }}>CTRL + 6</code> - {t("shortcuts.goto")} '/chat'</li>
            <li className="list-group-item list-group-item-primary" style={{ color: '#444' }}><code style={{ color: '#222' }}>CTRL + 7</code> - {t("shortcuts.goto")} '/videos-all'</li>
            <li className="list-group-item list-group-item-primary" style={{ color: '#444' }}><code style={{ color: '#222' }}>CTRL + R</code> - {t("shortcuts.reload")}</li>
            <li className="list-group-item list-group-item-primary" style={{ color: '#444' }}><code style={{ color: '#222' }}>CTRL + P</code> - {t("shortcuts.cmd")}</li>
          </ul>
        </article>
        <article className="my-2">
          <h3 className="text-secondary text-bold">{t("shortcuts.shift")}</h3>
          <ul className="list-group">
            <li className="list-group-item list-group-item-secondary" style={{ color: '#444' }}><code style={{ color: "#222" }}>SHIFT + X</code> - {t("shortcuts.logout")}</li>
            {/* <li className="list-group-item list-group-item-secondary" style={{ color: '#444' }}><code style={{ color: "#222" }}>SHIFT + G</code> - Create group</li>
            <li className="list-group-item list-group-item-secondary" style={{ color: '#444' }}><code style={{ color: "#222" }}>SHIFT + S</code> - Say something here</li>
            <li className="list-group-item list-group-item-secondary" style={{ color: '#444' }}><code style={{ color: "#222" }}>SHIFT + D</code> - Impulse Admin</li> */}
          </ul>
        </article>
      </section>
    </div>
  )  
}