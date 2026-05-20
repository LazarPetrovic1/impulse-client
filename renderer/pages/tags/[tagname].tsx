import { AuthRoute } from "../../components/auth";
import { Tag } from "../../components/features/social";

export default function TagsPage() {
  return (
    <AuthRoute>
      <Tag />
    </AuthRoute>
  )
}