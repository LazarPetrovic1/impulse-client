import { SideMenuSettings } from "../../components/features/settings/SideMenu";
import { withSettingsLayout } from "./_layout";

function SidemenuPage() {
  return <SideMenuSettings />
}

export default withSettingsLayout(SidemenuPage)