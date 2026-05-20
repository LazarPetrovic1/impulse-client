import { AuthRoute } from "../../components/auth";
import { PostPage as Post } from "../../components/features/posts";

export default function PostPage() {
  return (
    <AuthRoute>
      <div style={{ width: "100%", overflowY: "auto" }}>
        <Post />
      </div>
    </AuthRoute>
  )
}