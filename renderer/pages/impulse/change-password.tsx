import { useTranslation } from "react-i18next";
import { AuthRoute } from "../../components/auth";

function ChangePassword() {
  const { t } = useTranslation()
  return (
    <AuthRoute>
      <h1>{t("changepass.title")}</h1>
    </AuthRoute>
  )
}

export default ChangePassword;