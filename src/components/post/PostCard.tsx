import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Post } from "../../types";
import { useNavigation } from "../../contexts/NavigationContext";
import "./PostCard.css";

interface PostCardProps {
  post: Post;
  index?: number;
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const [ripple, setRipple] = useState<{ x: number; y: number; show: boolean }>(
    {
      x: 0,
      y: 0,
      show: false,
    },
  );
  const cardRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const { setSource } = useNavigation();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true,
    });
  };

  const handleMouseLeave = () => {
    setRipple((prev) => ({ ...prev, show: false }));
  };

  const handleClick = () => {
    const path = location.pathname;
    if (path === "/") {
      setSource("home");
    } else if (path.startsWith("/categories") || path.startsWith("/category")) {
      setSource("categories");
    } else if (path.startsWith("/tags") || path.startsWith("/tag")) {
      setSource("tags");
    } else if (path === "/about") {
      setSource("about");
    } else {
      setSource(null);
    }
  };

  return (
    <article
      ref={cardRef}
      className="post-card stagger-item"
      style={{ animationDelay: `${index * 80}ms` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {ripple.show && (
        <>
          <span className="post-card__border-base" />
          <span
            className="post-card__border-glow"
            style={
              {
                "--mouse-x": `${ripple.x}px`,
                "--mouse-y": `${ripple.y}px`,
              } as React.CSSProperties
            }
          />
        </>
      )}
      {ripple.show && (
        <span
          className="post-card__ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 200,
            height: 200,
          }}
        />
      )}
      <Link
        to={`/post/${post.id}`}
        className="post-card__link"
        onClick={handleClick}
      >
        <div className="post-card__content">
          <div className="post-card__meta">
            <time>{post.date}</time>
            <span className="post-card__dot" />
            <span>{post.readTime} 分钟阅读</span>
          </div>
          <h2 className="post-card__title">{post.title}</h2>
          <p className="post-card__excerpt">{post.excerpt}</p>
          <div className="post-card__tags">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="post-card__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
