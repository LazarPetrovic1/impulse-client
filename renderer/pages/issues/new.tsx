import { AuthRoute } from "../../components/auth";
import { IssueForm } from "../../components/features/issues";

function NewIssue() {
  return (
    <AuthRoute>
      <IssueForm />
    </AuthRoute>
  )
}

export default NewIssue