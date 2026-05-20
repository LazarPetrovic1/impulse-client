import { useInfinitePosts } from "../../../features/posts";
import styled from "styled-components";
import { Theme } from "../../../styles/theme/type";
import { MarkdownArea, Spinner } from "../../common";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const PostWrapper = styled.article`
  background: ${({ theme } : { theme: Theme }) => theme.colors.background};
  color: ${({ theme } : { theme: Theme }) => theme.colors.textPrimary};
  position: relative;
  transition: background 0.15s ease;
  &:hover { background: ${({ theme } : { theme: Theme }) => theme.colors.hover}
`

const Img = styled.img`
  max-width: 100%;
  border-radius: 8px;
  max-height: 300px;
  object-fit: cover;
`

const Vid = styled.video`
  max-width: 100%;
  border-radius: 8px;
  max-height: 300px;
`

export const Post = ({ post }) => {
  const router = useRouter();
  const goToPost = () => router.push(`/posts/${post.id}`);

  return (
    <PostWrapper
      className="card"
      onClick={goToPost}
      style={{ cursor: "pointer" }}
    >
      <small
        className="position-absolute text-secondary"
        style={{ top: 0, right: 0, userSelect: "none" }}
      >#{post.id}</small>
      <div className="card-body">
        <h5 className="card-title">{post?.name}</h5>
        <MarkdownArea value={post?.description} />
        {post?.media?.length > 0 && (
          <div className="mt-3 d-flex flex-wrap gap-2">
            {post.media.map((file, idx) => {
              const isImage = /\.(jfif|jpg|jpeg|png|webp|gif)$/i.test(file);
              const isVideo = /\.(mp4|webm|ogg|mov|mkv)$/i.test(file);
              const isAudio = /\.(mp3|wav|ogg|m4a|aac)$/i.test(file);

              return (
                <div key={idx} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "100%" }}>
                  {isImage ? (
                    <Img src={`http://localhost:4500${file}`} alt={`post-media-${idx}`} />
                  ) : isVideo ? (
                    <Vid controls>
                      <source src={`http://localhost:4500${file}`} />
                      Your browser does not support the video tag.
                    </Vid>
                  ) : isAudio ? (
                    <audio controls style={{ width: "100%" }}>
                      <source src={`http://localhost:4500${file}`} />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <a href={`http://localhost:4500${file}`} target="_blank" rel="noreferrer">
                      📎 Attachment {idx + 1}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PostWrapper>
  );
};

export function PostList() {
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinitePosts();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) fetchNextPage() },
      { threshold: 0.9 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage]);
  return (
    <>
      {posts.map((post) => post && <Post key={post.id} post={post} />)}
      <div ref={loadMoreRef} style={{ height: 1 }} />
      {isFetchingNextPage && <Spinner />}
    </>
  );
}