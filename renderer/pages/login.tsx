import { PublicRoute } from "../components/auth/PublicRoute";
import LoginPage from "../components/auth/Login";

export default function Login() {
  return (
    <PublicRoute>
      <LoginPage />
    </PublicRoute>
  )
}