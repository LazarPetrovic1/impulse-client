import { Shortcuts } from "../../components/features/settings/Shortcuts";
import { withSettingsLayout } from "./_layout";

function ShortcutPage() {
  return <Shortcuts />
}

export default withSettingsLayout(ShortcutPage)