import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Post } from "../../types";
import "./PostCard.css";

interface PostCardProps {
  post: Post;
  index?: number;
}

export default function PostCard({ post }: PostCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <article
      ref={cardRef}
      className="post-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="post-card__circle"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          opacity: isHovering ? 1 : 0,
        }}
      />
      <div
        className="post-card__border-glow"
        style={
          {
            "--mouse-x": `${mousePos.x}px`,
            "--mouse-y": `${mousePos.y}px`,
            opacity: isHovering ? 1 : 0,
          } as React.CSSProperties
        }
      />
      <Link to={`/post/${post.id}`} className="post-card__link">
        <div className="post-card__content">
          <div className="post-card__meta">
            <time className="post-card__date">{post.date}</time>
            <span className="post-card__read-time">
              {post.readTime} 分钟阅读
            </span>
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
