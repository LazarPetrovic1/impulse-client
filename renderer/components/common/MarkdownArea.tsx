import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { preprocess } from "../../lib/utils";
import { useRouter } from "next/navigation";

export function MarkdownArea({ value }: { value: string }) {
  const router = useRouter();
  const processed = preprocess(value);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => {
          if (!href) return <span>{children}</span>;
          if (href.startsWith("/profile/")) {
            const id = href.split("/profile/")[1];

            return (
              <span
                className="mention"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/profile/${id}/`);
                }}
              >
                {children}
              </span>
            );
          }

          if (href.startsWith("/tags/")) {
            const tag = href.split("/tags/")[1];

            return (
              <span
                className="hashtag"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/tags/${tag}`);
                }}
              >
                {children}
              </span>
            );
          }

          // 🌐 normal links
          return (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        },
      }}
    >
      {processed}
    </ReactMarkdown>
  );
}