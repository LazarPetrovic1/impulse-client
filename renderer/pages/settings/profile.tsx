import { ProfileOverview } from "../../components/features/settings/ProfileOverview"
import { withSettingsLayout } from "./_layout"

function ProfileOverviewPage() {
  return (
    <ProfileOverview />
  )
}

export default withSettingsLayout(ProfileOverviewPage)