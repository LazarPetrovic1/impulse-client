import { useEffect } from "react";
import Link from "next/link";
import { useIssues } from "../../../features/issues";
import { useTranslation } from "react-i18next";
import { CenteredLayout } from "../../layout";

export const IssueList = () => {
  const { issues, fetchIssues } = useIssues();
  const { t } = useTranslation()
  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <CenteredLayout>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h2>{t('issues.issues')}</h2>
          <Link href="/issues/new" className="btn btn-primary">
            <i className="fas fa-plus pr-2" /> {t('issues.create')}
          </Link>
        </div>
        {issues.map((issue) => (
          <div key={issue.id}>
            <Link href={`/issues/${issue.id}`}>
              <h4>{issue.title}</h4>
            </Link>
            <p>{issue.body}</p>
          </div>
        ))}
      </div>
    </CenteredLayout>
  );
};