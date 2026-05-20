import { SocialProfile } from "../../components/features/settings/SocialProfile";
import { withSettingsLayout } from "./_layout";

function SocialProfilePage() {
  return <SocialProfile />
}

export default withSettingsLayout(SocialProfilePage)