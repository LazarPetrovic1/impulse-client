import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { Theme } from "../../../styles/theme/type";
import { MarkdownArea, Spinner } from "../../common";
import { api } from "../../../lib/api";
import { getReactionEmoji, Post, Reaction, reactToPost, unreactToPost } from "../../../features/posts";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`margin: 0 auto;`;

function CommentsSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<any[]>([]);
  const [content, setContent] = useState("");

  const fetchComments = async () => {
    const res = await api.get(`/posts/${postId}/comments`);
    setComments(() => res.data);
  };

  useEffect(() => { fetchComments(); }, [postId]);

  const submit = async () => {
    await api.post(`/posts/${postId}/comments`, { userId: 1, content });
    setContent(() => "");
    fetchComments();
  };

  return (
    <div className="mt-4 mx-auto" style={{ maxWidth: "80%" }}>
      <h4>Comments</h4>

      {/* CREATE */}
      <div className="mb-3">
        <textarea
          className="form-control"
          value={content}
          onChange={(e) => setContent(() => e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={submit}>
          Comment
        </button>
      </div>

      {/* LIST */}
      {comments.map((c) => (
        <div key={c.id} className="border p-2 mb-2 rounded">
          <strong>{c.user?.username}</strong>
          <p>{c.content}</p>
        </div>
      ))}
    </div>
  );
}

const PostWrapper = styled.article`
  background: ${({ theme }: { theme: Theme }) => theme.colors.background};
  color: ${({ theme }: { theme: Theme }) => theme.colors.textPrimary};
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
`;

const Img = styled.img`
  max-width: 100%;
  border-radius: 8px;
  max-height: 400px;
  object-fit: cover;
`;

const Vid = styled.video`
  max-width: 100%;
  border-radius: 8px;
  max-height: 400px;
`;

const ReactBtn = styled.button<{ $post: Post, $reaction: Reaction }>`
  opacity: ${props => props.$post.viewerReaction === props.$reaction ? 1 : 0.5};
  border: none;
  background: ${({ theme }: { theme: Theme }) => theme.colors.background};
  color: ${({ theme }: { theme: Theme }) => theme.colors.textPrimary};
  cursor: pointer;
`

export function PostPage() {
  const params = useParams();
  const id = params?.id;
  const [post, setPost] = useState<Post>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(() => res.data);
      }
      catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchPost();
  }, [id]);

  const handleReact = async (type: Reaction) => {
    if (!post) return;
    const prev = { ...post };
    let updated = { ...post };
    // 🟡 same reaction → unreact
    if (post.viewerReaction === type) {
      updated.viewerReaction = undefined;
      updated.reactions[type] = Math.max((updated.reactions[type] || 1) - 1, 0);
      updated.totalReactions--;
      setPost(updated);
      try {
        await unreactToPost(post.id);
      } catch (err) {
        console.error(err);
        setPost(prev); // rollback
      }
      return;
    }

    // 🟡 changing reaction
    if (post.viewerReaction) {
      const old = post.viewerReaction;
      updated.reactions[old] = Math.max((updated.reactions[old] || 1) - 1, 0);
    } else { updated.totalReactions++; }
    updated.viewerReaction = type;
    updated.reactions[type] = (updated.reactions[type] || 0) + 1;
    setPost(updated);
    try { await reactToPost(post.id, type); }
    catch (err) {
      console.error(err);
      setPost(prev); // rollback
    }
  };

  if (loading) return <Spinner />;
  if (!post) return <p>{t("premature404.post")}</p>;

  return (
    <Wrapper>
      <PostWrapper className="card">
        <small className="text-secondary">#{post.id}</small>
        <h2>{post?.name}</h2>
        <MarkdownArea value={post?.description} />
        {post?.media?.length > 0 && (
          <div className="mt-3 d-flex flex-column gap-3">
            {post.media.map((file: string, idx: number) => {
              const isImage = /\.(jfif|jpg|jpeg|png|webp|gif)$/i.test(file);
              const isVideo = /\.(mp4|webm|ogg|mov|mkv)$/i.test(file);
              const isAudio = /\.(mp3|wav|ogg|m4a|aac)$/i.test(file);
              return (
                <div key={idx}>
                  {isImage ? <Img src={`http://localhost:4500${file}`} /> :
                  isVideo ? (
                    <Vid controls>
                      <source src={`http://localhost:4500${file}`} />
                    </Vid>
                  ) : isAudio ? (
                    <audio controls style={{ width: "100%" }}>
                      <source src={`http://localhost:4500${file}`} />
                    </audio>
                  ) : (
                    <a href={`http://localhost:4500${file}`} target="_blank">
                      📎 {t("posts.attach")} {idx + 1}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-3 d-flex justify-content-between text-secondary">
          <div className="d-flex gap-2">
            {(['like', 'love', 'laugh', 'impressed', 'dislike', 'hate'] as Reaction[]).map(r => (
              <ReactBtn
                $post={post}
                $reaction={r}
                key={r}
                onClick={() => handleReact(r)}
              >
                {getReactionEmoji(r)} {post.reactions?.[r] || 0}
              </ReactBtn>
            ))}
          </div>

          <span>💬 {post.commentsCount}</span>
        </div>
      </PostWrapper>

      <CommentsSection postId={post.id} />
    </Wrapper>
  );
}