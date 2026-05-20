import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIssues } from "../../../features/issues";
import { Spinner } from "../../common";

export const IssueDetails = () => {
  const router = useRouter();
  const { selectedIssue, fetchIssueById } = useIssues();

  useEffect(() => {
    if (router.query.id) {
      fetchIssueById(parseInt(router.query.id as string));
    }
  }, [router.query.id]);

  if (!selectedIssue) return <Spinner />;

  return (
    <div>
      <h2>{selectedIssue.title}</h2>
      <p>{selectedIssue.body}</p>
    </div>
  );
};