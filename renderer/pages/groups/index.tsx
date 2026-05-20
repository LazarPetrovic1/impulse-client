import { AuthRoute } from "../../components/auth";
import { GroupSearch } from "../../components/features/groups";

export default function GroupSearchPage() {
  return (
    <AuthRoute>
      <div style={{ overflowY: "auto", width: "100%" }}><GroupSearch /></div>
    </AuthRoute>
  );
}