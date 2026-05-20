import { AuthRoute } from "../components/auth";
import { HomePage } from "../components/features";

export default function Initial() {
  return (
    <AuthRoute>
      <HomePage />
    </AuthRoute>
  )
}