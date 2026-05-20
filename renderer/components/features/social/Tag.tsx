import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPostsByTag } from "../../../features/social";
import { MarkdownArea, Spinner } from "../../common";
import { getUserById } from "../../../features/profile/api";
import { User } from "../../../features/auth/store";
import { useTranslation } from "react-i18next";

export function Tag() {
  const { tagname } = useParams<{ tagname: string }>();
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>(() => []);
  const { t } = useTranslation();
  useEffect(() => {
    if (!tagname) return;
    (async () => {
      setLoading(() => true);
      try { const data = await getPostsByTag(tagname); setPosts(data); }
      finally { setLoading(() => false); }
    })();
  }, [tagname]);

  useEffect(() => {
    let mounted = true;
    const fetchUsers = async () => {
      const map = new Map();
      for (const post of posts) {
        if (post.user) {
          const user = await getUserById(post.user);
          if (mounted) map.set(post.user, user);
        }
      }
      if (mounted) setUsers(Array.from(map.values()));
    };
    fetchUsers();
    // Cleanup
    return () => { mounted = false; };
  }, [posts]);
  
  return (
    <div className="container py-3">
      {/* HEADER */}
      <div className="mb-4">
        <h1 className="fw-bold">#{tagname}</h1>
        <p className="text-muted">
          {t("tags.used")} {posts.length} {t("tags.times")}
        </p>
      </div>

      {/* USERS */}
      <div className="mb-4">
        <h4>{t("tags.usedby")}</h4>

        {users.length === 0 ? (
          <p className="text-muted">{t("tags.nousers")}</p>
        ) : (
          <div className="d-flex flex-wrap gap-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="badge bg-dark p-2"
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/profile/${user.id}/`)}
              >{user.username}</div>
            ))}
          </div>
        )}
      </div>

      {/* POSTS */}
      <div>
        <h4>{t("tags.posts")}</h4>

        {loading ? (
          <Spinner />
        ) : posts.length === 0 ? (
          <p className="text-muted">{t("tags.noposts")}</p>
        ) : (
          <ol>{posts.map((post) => <li key={post.id}><MarkdownArea value={post.description?.slice(0, 120)} /></li>)}</ol>
        )}
      </div>
    </div>
  );
}