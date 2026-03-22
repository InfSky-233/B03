import { useParams, Link, useNavigate } from "react-router-dom";
import { marked, Renderer } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { getPostById, posts } from "../data/posts";
import ProgressBar from "../components/ui/ProgressBar";
import "./Post.css";

const renderer = new Renderer();

renderer.code = function ({
  text,
  lang,
}: {
  text: string;
  lang?: string;
}): string {
  let highlighted: string;
  if (lang && hljs.getLanguage(lang)) {
    try {
      highlighted = hljs.highlight(text, { language: lang }).value;
    } catch {
      highlighted = text;
    }
  } else {
    highlighted = hljs.highlightAuto(text).value;
  }
  return `<pre><code class="hljs language-${lang || ""}">${highlighted}</code></pre>`;
};

marked.setOptions({
  renderer,
  breaks: true,
  gfm: true,
});

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = getPostById(id || "");

  const relatedPosts = posts
    .filter((p) => p.id !== id && p.category === post?.category)
    .slice(0, 2);

  if (!post) {
    return (
      <div className="post post--not-found">
        <div className="post__container">
          <h1>文章未找到</h1>
          <p>抱歉，您访问的文章不存在。</p>
          <Link to="/" className="post__back-link">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="post">
      <ProgressBar />

      <div className="post__container">
        <button
          onClick={() => navigate(-1)}
          className="post__back-link"
          style={{ marginBottom: "2.5rem" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          返回
        </button>
      </div>

      <header className="post__header">
        <div className="post__container">
          <div className="post__meta">
            <time>{post.date}</time>
            <span className="post__meta-dot" />
            <span>{post.readTime} 分钟阅读</span>
          </div>
          <h1 className="post__title">{post.title}</h1>
          <div className="post__tags">
            {post.tags.map((tag) => (
              <Link key={tag} to={`/tag/${tag}`} className="post__tag">
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <div className="post__content">
        <div className="post__container">
          <div
            className="post__body"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <section className="post__related">
          <div className="post__container">
            <h2 className="post__related-title">相关文章</h2>
            <div className="post__related-list">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/post/${relatedPost.id}`}
                  className="post__related-item"
                >
                  <h3 className="post__related-item-title">
                    {relatedPost.title}
                  </h3>
                  <span className="post__related-item-date">
                    {relatedPost.date}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="post__footer">
        <div className="post__container">
          <Link to="/" className="post__back-link">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            所有文章
          </Link>
        </div>
      </footer>
    </article>
  );
}

function formatContent(content: string): string {
  return marked.parse(content) as string;
}
