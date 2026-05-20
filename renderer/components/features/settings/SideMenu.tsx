import { useState } from "react";
import { useSideMenuStore } from "../../../features/homepage/store";
import { SideMenuOptionItem } from "./SideMenuOptionItem";
import { AddSideMenuItemModal } from "./AddSideMenuItemModal";
import { useTranslation } from "react-i18next";

export function SideMenuSettings() {
  const { sideMenuData, isMenuShown, toggleMenu, reset, getDeletedItems } = useSideMenuStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deletedItems = getDeletedItems();
  const { t } = useTranslation()
  return (
    <section className="px-3 py-2">
      <h2 className="text-primary text-center display-4">{t("sidemenu.title")}</h2>

      {/* Available */}
      <div>
        <h2 className="success">{t("sidemenu.options")}</h2>
        {sideMenuData.map((item) => <SideMenuOptionItem key={item.id} item={item} type="success" />)}
      </div>

      {/* Deleted */}
      <div>
        <h2 className="danger">{t("sidemenu.deleted")}</h2>

        {deletedItems.length === 0 ? (
          <div className="text-center py-2 my-2 border">{t("sidemenu.noshow")}</div>
        ) : (
          deletedItems.map((item) => (
            <SideMenuOptionItem
              key={item.id}
              item={item}
              type="danger"
            />
          ))
        )}
      </div>

      {/* Actions */}
      <div className="d-flex justify-content-between">
        <button onClick={() => setIsModalOpen(true)}>
          ➕ {t("sidemenu.add")}
        </button>

        <button onClick={toggleMenu}>
          {isMenuShown ? `🗑 ${t("sidemenu.remove")}` : `➕ ${t("sidemenu.add")}`}
        </button>

        <button onClick={reset}>
          ♻️ {t("sidemenu.reset")}
        </button>
      </div>

      <AddSideMenuItemModal show={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}