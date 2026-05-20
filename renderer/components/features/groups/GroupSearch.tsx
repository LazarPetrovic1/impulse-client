import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGroupSearchStore } from "../../../features/groups";
import { CenteredLayout } from "../../layout";
import { GroupResultItem } from "./GroupSearchResultItem";

export function GroupSearch() {
  const { query, setQuery, searchGroups, results, loading } = useGroupSearchStore();
  const { t } = useTranslation();
  useEffect(() => {
    const delay = setTimeout(() => { searchGroups(); }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <CenteredLayout>
      <div className="form-group position-relative">
        <input
          type="search"
          className="form-control"
          placeholder={t("groups.search")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p>{t("groups.groupseek")}</p>}
      {!loading && results.length === 0 && query.length >= 2 && <p>{t("groups.ngf")}</p>}
      {results.length > 0 && (
        <div>{results.map(group => <GroupResultItem key={group.id} group={group} />)}</div>
      )}
    </CenteredLayout>
  );
}