import { AuthRoute } from "../../../components/auth";
import { IssueDetails } from "../../../components/features/issues";

function Issue() {
  return (
    <AuthRoute>
      <IssueDetails />
    </AuthRoute>
  )
}

export default Issue