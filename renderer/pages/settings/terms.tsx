import { TermsAndConditions } from "../../components/features/settings/TermsAndConditions";
import { withSettingsLayout } from "./_layout";

function ToC() {
  return <TermsAndConditions />
}

export default withSettingsLayout(ToC)