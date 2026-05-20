import { AuthRoute } from "../../components/auth"
import { Profile } from "../../components/features"

export default function UsersProfile() {
  return (
    <AuthRoute>
      <Profile />
    </AuthRoute>
  )
}