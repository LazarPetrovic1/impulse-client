import { useTranslation } from "react-i18next";
import { useSocialStore } from "../../../features/social";
import { useEffect } from "react";
import { SocialResultItem } from "./SocialResultItem";
import { CenteredLayout } from "../../layout";

export function SocialSearch() {
  const { query, setQuery, searchUsers, results } = useSocialStore();
  const { t } = useTranslation();

  useEffect(() => {
    const delay = setTimeout(() => {
      searchUsers();
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <CenteredLayout>
      <div className="form-group position-relative">
        <input
          type="search"
          className="form-control"
          placeholder={t("social.search")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {results.length > 0 && (
        <div>
          {results.map(user => (
            <SocialResultItem key={user.id} user={user} />
          ))}
        </div>
      )}
    </CenteredLayout>
  );
}