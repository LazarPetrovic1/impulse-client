import { useIssues, useIssueStore } from "../../../features/issues";
import { useAuthStore } from "../../../features/auth/store";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { CenteredLayout } from "../../layout";
import { ConnectedInput } from "../../common/ConnectedInput";
import { setShortcutsLocked } from "../../../features/system/shortcuts";

export const IssueForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const isEdit = router.pathname.includes("edit");
  const { createIssue, updateIssue, fetchIssueById } = useIssues();
  const user = useAuthStore((s) => s.user);
  const selectedIssue = useIssueStore((s) => s.selectedIssue);
  const [title, setTitle] = useState<string>(() => "");
  const [body, setBody] = useState<string>(() => "");

  useEffect(() => {
    setShortcutsLocked(true);
    return () => { setShortcutsLocked(false); };
  }, []);

  useEffect(() => {
    const load = async () => {
      if (!isEdit || !router.query.id) return;
      const issue = await fetchIssueById(parseInt(router.query.id as string));
      if (issue) {
        setTitle(issue.title || "");
        setBody(issue.body || "");
      }
    };

    load();
  }, [router.query.id]);

  const submit = async () => {
    if (isEdit && selectedIssue) {
      await updateIssue(selectedIssue.id, { title, body });
      router.push(`/issues/${selectedIssue.id}`);
      return;
    }

    await createIssue({ user, author: user?.username, title, body });
    setTitle("");
    setBody("");
    router.push("/issues");
  };

  return (
    <CenteredLayout>
      <h2 className="text-center mb-0">
        {isEdit ? t("issues.edit") : t("issues.create")}
      </h2>
      <div className="text-center m-0">
        <small className="text-danger">{t("issues.shortcuts")}</small>
      </div>
      <div className="form-group">
        <label htmlFor="title">{t('issues.title')}</label>
        <input
          name="title"
          id="title"
          value={title}
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('issues.title')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="title">{t('issues.body')}</label>
        <ConnectedInput
          onChange={setBody}
          value={body}
          placeholder={t('issues.body')}
        />
        {/* <textarea
          name="body"
          id="body"
          className="form-control"
        /> */}
      </div>

      <button className="btn btn-primary btn-block" onClick={submit}>
        <i className="fas fa-paper-plane pr-2" /> {t("issues.submit")}
      </button>
    </CenteredLayout>
  );
};