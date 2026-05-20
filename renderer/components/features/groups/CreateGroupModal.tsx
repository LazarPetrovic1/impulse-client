import { useEffect, useState } from "react";
import { useAuthStore } from "../../../features/auth/store";
import { uploader } from "../../../lib/api";
import { Modal } from "../../common";
import { UserPicker } from "./UserPicker";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";

type Props = {
  show: boolean;
  onClose: () => void;
  onSuccess?: (val: AxiosResponse<any, any, {}>) => void;
};

export function CreateGroupModal({ show, onClose, onSuccess }: Props) {
  const { user } = useAuthStore();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [requiresAdmin, setRequiresAdmin] = useState(() => false);
  const [people, setPeople] = useState<number[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(() => false);
  const { t } = useTranslation();
  // 📸 handle image
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(() => file);
    setPreview(() => URL.createObjectURL(file));
  };

  // 🚀 submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      setLoading(() => true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("about", about);
      formData.append("requiresAdmin", String(requiresAdmin));
      formData.append("admin", JSON.stringify({ id: user.id }));
      // arrays must be stringified
      formData.append("people", JSON.stringify(people));
      if (image) formData.append("image", image);
      const res = await uploader.post("/group", formData);
      if (typeof onSuccess === 'function') onSuccess(res);
      onClose();
      // reset
      setName(() => "");
      setAbout(() => "");
      setPeople([]);
      setImage(() => null);
      setPreview(() => null);
    } catch (err) { console.error("Create group failed", err); }
    finally { setLoading(() => false); }
  };

  useEffect(() => { return () => { if (preview) URL.revokeObjectURL(preview); }; }, [preview]);

  return (
    <Modal
      title={t("modals.creategroup")}
      show={show}
      onClose={onClose}
      provideOwnClosure
      style={{ maxWidth: 500 }}
    >
      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <div className="form-group text-light">
          <label htmlFor="name">{t("groups.name")}</label>
          <input
            name="name" id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* ABOUT */}
        <div className="form-group text-light">
          <label htmlFor="about">{t("groups.about")}</label>
          <textarea
            id="about"
            name="about"
            className="form-control"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        {/* IMAGE */}
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImage}
          />
        </div>

        {preview && (
          <div className="mb-2">
            <img
              src={preview}
              alt="preview"
              style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
            />
          </div>
        )}

        {/* MEMBERS */}
        <div className="form-group">
          <label className="text-light">{t("groups.addppl")}</label>
          <UserPicker onChange={setPeople} />
        </div>

        {/* SETTINGS */}
        <div className="form-check text-light mb-3">
          <input
            id="requiresAdmin"
            name="requiresAdmin"
            type="checkbox"
            className="form-check-input"
            checked={requiresAdmin}
            onChange={(e) => setRequiresAdmin(e.target.checked)}
          />
          <label style={{ userSelect: "none" }} htmlFor="requiresAdmin" className="form-check-label">
            {t("groups.reqadmin")}
          </label>
        </div>

        {/* ACTIONS */}
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!name || loading}
          >
            {loading ? t("groups.making") : t("groups.make")}
          </button>
        </div>
      </form>
    </Modal>
  );
}