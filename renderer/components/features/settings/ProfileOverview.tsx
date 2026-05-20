import { useEffect, useState } from "react";
import { useAuthStore } from "../../../features/auth/store";
import { useProfileStore } from "../../../features/profile/store/useProfileStore";
import { useTranslation } from "react-i18next";

export function ProfileOverview() {
  const { user: authUser } = useAuthStore();
  const { user, hidden, fetchUser, updateField, toggleHidden, setHidden } = useProfileStore();
  const [edit, setEdit] = useState<Record<string, boolean>>({});
  const { t } = useTranslation()
  useEffect(() => { if (authUser?.id) fetchUser(authUser.id); }, [authUser?.id]);
  if (!user) return null;

  const handleEditToggle = async (field: string, value: any) => {
    if (edit[field]) await updateField(user.id, field, value);
    setEdit((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div>
      <h2 className="text-primary text-center display-4">{t("profileoverview.title")}</h2>

      {/* FIRST NAME */}
      <div className="d-flex justify-content-between align-items-center gap-2 my-2">
        {edit.firstName ? (
          <>
            <label htmlFor="firstname" className="d-inline-block pr-2">{t("profileoverview.fname")}: </label>
            <input
              style={{ flex: 1, lineHeight: "2rem" }}
              name="firstname"
              id="firstname"
              value={user.firstName}
              onChange={(e) => updateField(user.id, "firstName", e.target.value)}
            />
          </>
        ) : (
          <span style={{ flex: 1 }}>{t("profileoverview.fname")}: {user.firstName}</span>
        )}

        <button className="btn btn-secondary" onClick={() => handleEditToggle("firstName", user.firstName)}>{t("profileoverview.edit")}</button>
      </div>

      {/* LAST NAME */}
      <div className="d-flex justify-content-between align-items-center gap-2 my-2">
        {edit.lastName ? (
          <>
            <label htmlFor="lastname" className="d-inline-block pr-2">{t("profileoverview.lname")}: </label>
            <input
              style={{ flex: 1, lineHeight: "2rem" }}
              name="lastname"
              id="lastname"
              value={user.lastName}
              onChange={(e) => updateField(user.id, "lastName", e.target.value)}
            />
          </>
        ) : (
          <span style={{ flex: 1 }}>{t("profileoverview.lname")}: {user.lastName}</span>
        )}

        <button className="btn btn-secondary" onClick={() => handleEditToggle("lastName", user.lastName)}>{t("profileoverview.edit")}</button>
      </div>

      {/* EMAIL */}
      <div className="d-flex justify-content-between align-items-center gap-2 my-2">
        {edit.email ? (
          <>
            <label htmlFor="email" className="d-inline-block pr-2">{t("profileoverview.email")}: </label>
            <input
              style={{ flex: 1, lineHeight: "2rem" }}
              name="email"
              id="email"
              value={user.firstName}
              onChange={(e) => updateField(user.id, "email", e.target.value)}
            />
          </>
        ) : (
          <span style={{ flex: 1 }}>{t("profileoverview.email")}: {user.email}</span>
        )}
        <button className="btn btn-secondary mr-2" onClick={() => toggleHidden("email")}>{hidden.includes("email") ? "🙈" : "👁"}</button>
        <button className="btn btn-secondary" onClick={() => handleEditToggle("email", user.email)}>{t("profileoverview.edit")}</button>
      </div>

      {/* BIO */}
      <div className="d-flex justify-content-between align-items-center gap-2 my-2">
        {edit.bio ? (
          <>
            <label htmlFor="bio" className="d-inline-block pr-2">{t("profileoverview.bio")}: </label>
            <textarea style={{ flex: 1 }} value={user.bio} onChange={(e) => updateField(user.id, "bio", e.target.value)} />
          </>
        ) : (
          <span style={{ flex: 1 }}>{t("profileoverview.bio")}: {user.bio}</span>
        )}

        <button className="btn btn-secondary mr-2" onClick={() => toggleHidden("bio")}>{hidden.includes("bio") ? "🙈" : "👁"}</button>
        <button className="btn btn-secondary" onClick={() => handleEditToggle("bio", user.bio)}>{t("profileoverview.edit")}</button>
      </div>

      {/* SAVE HIDDEN */}
      <button className="btn btn-primary btn-block" onClick={() => setHidden(hidden)}>
        <i className="fas fa-paper-plane pr-2" /> {t("profileoverview.save")}
      </button>
    </div>
  );
}