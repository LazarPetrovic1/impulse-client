import { AuthRoute } from "../../components/auth";
import { IssueList } from "../../components/features/issues";

function Issues() {
  return (
    <AuthRoute>
      <IssueList />
    </AuthRoute>
  )
}

export default Issues