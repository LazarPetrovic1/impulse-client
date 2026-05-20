import { useState } from "react";
import { Modal } from "../../common";
import { useSideMenuStore } from "../../../features/homepage/store";
import { useTranslation } from "react-i18next";

const initState = {
  href: "",
  text: "",
  data: "",
};

export function AddSideMenuItemModal({ show, onClose }) {
  const addItem = useSideMenuStore((s) => s.addItem);
  const [newItem, setNewItem] = useState(() => initState);
  const { t } = useTranslation()
  const onChange = (e) => setNewItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    const parsedData = newItem.data ? JSON.parse(newItem.data) : undefined;
    const item = {
      id: Date.now(),
      href: newItem.href,
      text: newItem.text,
      data: parsedData,
    };
    addItem(item);
    setNewItem(initState);
    onClose();
  };

  return (
    <Modal
      title={t("modals.sideitem")}
      show={show}
      onClose={onClose}
      provideOwnClosure
    >
      <form onSubmit={onSubmit}>
        <div className="form-group text-light">
          <label>{t("sidemenu.route")}:</label>
          <input
            className="w-100"
            type="text"
            name="href"
            placeholder="/example"
            value={newItem.href}
            onChange={onChange}
          />
        </div>

        <div className="form-group text-light">
          <label>{t("sidemenu.text")}:</label>
          <input
            className="w-100"
            type="text"
            name="text"
            placeholder={t("sidemenu.text")}
            value={newItem.text}
            onChange={onChange}
          />
        </div>

        <div className="form-group text-light">
          <label>{t("sidemenu.anim")}:</label>
          <textarea
            className="w-100"
            name="data"
            placeholder={t("sidemenu.anim")}
            value={newItem.data}
            onChange={onChange}
          />
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" type="submit">
            <i className="fas fa-paper-plane" /> {t("sidemenu.submit")}
          </button>
        </div>
      </form>
    </Modal>
  );
}