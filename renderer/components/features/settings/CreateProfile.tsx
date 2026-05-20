import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useProfile } from "../../../features/profile";
import { CenteredLayout } from "../../layout";
import { capitalize } from "../../../lib/utils";
import { createProfile } from "../../../features/profile/api";
import { useRouter } from "next/navigation";

type Social = {
  youtube?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
};

export const CreateProfile = () => {
  const { t } = useTranslation();
  const { profile, loading, user, updateField } = useProfile();
  const router = useRouter()
  const [showSocial, setShowSocial] = useState(() => false);

  const [form, setForm] = useState({
    employment: "",
    website: "",
    social: {} as Social,

    isEmployed: true,
    hasWebsite: true,
  });

  // ✅ hydrate form from profile
  useEffect(() => {
    if (!profile) return;

    setForm((prev) => ({
      ...prev,
      employment: profile.employment ?? "",
      website: profile.website ?? "",
      social: profile.social ?? {},
      isEmployed: !!profile.employment,
      hasWebsite: !!profile.website,
    }));
  }, [profile]);

  // generic handlers
  const update = (field: string, value: any) => setForm((f) => ({ ...f, [field]: value }));
  const updateSocial = (name: string, value: string) => setForm((f) => ({ ...f, social: { ...f.social, [name]: value } }));

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      employment: form.isEmployed ? form.employment : null,
      website: form.hasWebsite ? form.website : null,
      social: form.social,
    };
    if (profile) await updateField(user.id, "profile", payload);
    else await createProfile(user.id, payload);
    return router.push('/settings/social')
  };

  if (loading) return <div>Loading...</div>;

  return (
    <CenteredLayout>
      <form onSubmit={submit} style={{ pointerEvents: "all" }}>
        <div className="container mb-4">
          <div className="d-flex justify-content-between my-3">
            <h2>{t("profile.addInfo")}</h2>
            <Link href="/settings" className="btn btn-secondary" style={{ lineHeight: 2 }}>
              <i className="fas fa-arrow-left pr-2" /> {t("profile.back")}
            </Link>
          </div>

          {/* EMPLOYMENT */}
          <div className="form-group">
            <label>{t("profile.employment")}</label>

            {form.isEmployed && (
              <input
                value={form.employment}
                onChange={(e) => update("employment", e.target.value)}
                className="form-control"
                placeholder={t("profile.employment")}
              />
            )}
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={!form.isEmployed}
                  onChange={() =>
                    update("isEmployed", !form.isEmployed)
                  }
                />
                <span className="pl-2">{t("profile.noJob")}</span>
              </label>
            </div>
          </div>

          {/* WEBSITE */}
          <div className="form-group">
            <label>{t("profile.website")}</label>

            {form.hasWebsite && (
              <input
                placeholder={t("profile.website")}
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                className="form-control"
              />
            )}
            <div>
              <label>
                <input
                  type="checkbox"
                  name=""
                  checked={!form.hasWebsite}
                  onChange={() =>
                    update("hasWebsite", !form.hasWebsite)
                  }
                />
                <span className="pl-2">{t("profile.noWebsite")}</span>
              </label>
            </div>
          </div>

          {/* SOCIAL TOGGLE */}
          <button
            type="button"
            className="btn btn-secondary my-3"
            onClick={() => setShowSocial((s) => !s)}
          >
           <i className={`fas fa-search-${showSocial ? "minus" : "plus"} pr-2`} />
           {showSocial ? t("profile.hideSocial") : t("profile.toggleSocial")}
          </button>

          {/* SOCIAL FIELDS */}
          {showSocial && (
            <div className="my-3">
              {["youtube", "facebook", "twitter", "linkedin", "instagram"].map(
                (key) => (
                  <div className="col-auto" key={key}>
                    <label className="sr-only" htmlFor={key}>{key}</label>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend" title={capitalize(key)}>
                        <div className="input-group-text">
                          <i className={`fab fa-${key}`} />
                        </div>
                      </div>
                      <input
                        placeholder={capitalize(key)} key={key}
                        value={form.social[key] || ""}
                        onChange={(e) => updateSocial(key, e.target.value)}
                        className="form-control py-2"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            <i className="fas fa-paper-plane pr-2" /> {t("profile.submit")}
          </button>
        </div>
      </form>
    </CenteredLayout>
  );
};