import { AuthRoute } from "../../components/auth"
import { SocialSearch } from "../../components/features/social"

function Social() {
  return (
    <AuthRoute>
      <SocialSearch />
    </AuthRoute>
  )
}

export default Social