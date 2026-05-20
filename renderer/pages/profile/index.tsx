import { AuthRoute } from "../../components/auth";
import { Profile } from "../../components/features"

export default function ProfilePage() {
  return (
    <AuthRoute>
      <div style={{ overflowY: "auto", width: "100%" }}>
        <Profile />
      </div>
    </AuthRoute>
  )
}