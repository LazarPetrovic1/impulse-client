import { AuthRoute } from "../../components/auth";
import { SettingsLayout } from "../../components/features";

export const withSettingsLayout = (Page: any) => {
  return function WrappedPage(props: any) {
    return (
      <AuthRoute>
        <SettingsLayout>
          <Page {...props} />
        </SettingsLayout>
      </AuthRoute>
    );
  };
};