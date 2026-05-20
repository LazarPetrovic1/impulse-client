import { PublicRoute } from "../components/auth";
import RegisterPage from '../components/auth/Register'

export default function Register() {
  return (
    <PublicRoute>
      <RegisterPage />
    </PublicRoute>
  )
}