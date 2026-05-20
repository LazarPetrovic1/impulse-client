import { AuthRoute } from "../../../components/auth";
import { IssueForm } from "../../../components/features/issues";

function EditIssue() {
  return (
    <AuthRoute>
      <IssueForm />
    </AuthRoute>
  )
}

export default EditIssue