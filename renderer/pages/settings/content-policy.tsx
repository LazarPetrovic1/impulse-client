import { ContentPolicy } from "../../components/features/settings/ContentPolicy";
import { withSettingsLayout } from "./_layout";

function ContentPolicyPage() {
  return <ContentPolicy />
}

export default withSettingsLayout(ContentPolicyPage)