import { APIDocs } from "../../components/features/settings/APIDocs";
import { withSettingsLayout } from "./_layout";

function APIDocsPage() {
  return <APIDocs />
}

export default withSettingsLayout(APIDocsPage)