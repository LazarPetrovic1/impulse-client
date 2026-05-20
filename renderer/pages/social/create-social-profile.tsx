import { AuthRoute } from "../../components/auth"
import { CreateProfile } from "../../components/features/settings/CreateProfile"

function CreateSocialProfile() {
  return (
    <AuthRoute>
      <div className="overflow-auto" style={{ width: "100%" }}>
        <CreateProfile />
      </div>
    </AuthRoute>
  )
}

export default CreateSocialProfile