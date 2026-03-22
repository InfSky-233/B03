import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { tags, getPostsByTag, posts } from "../data/posts";
import PostCard from "../components/post/PostCard";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import "./Tags.css";

export default function Tags() {
  const { name } = useParams<{ name?: string }>();
  const filteredPosts = useMemo(
    () => (name ? getPostsByTag(name) : []),
    [name]
  );
  const { displayedPosts, loading, hasMore, loadMoreRef } =
    useInfiniteScroll(filteredPosts);

  const tagCounts = tags.reduce(
    (acc, tag) => {
      acc[tag.name] = posts.filter((p) => p.tags.includes(tag.name)).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  if (name) {
    return (
      <div className="tags">
        <div className="tags__container">
          <header className="tags__header">
            <Link to="/tags" className="tags__back-link">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              全部标签
            </Link>
            <h1 className="tags__title">#{name}</h1>
            <p className="tags__count">{filteredPosts.length} 篇文章</p>
          </header>

          <div className="tags__posts">
            {displayedPosts.map((post, index) => (
              <div
                key={post.id}
                className="post-card-wrapper"
                style={{
                  animationDelay: `${Math.min(index % 10, 5) * 0.08}s`,
                }}
              >
                <PostCard post={post} index={index} />
              </div>
            ))}
          </div>

          <div ref={loadMoreRef} className="tags__load-more">
            {loading && (
              <div className="tags__loading">
                <div className="tags__loading-spinner" />
                <span>加载中...</span>
              </div>
            )}
            {!hasMore && !loading && displayedPosts.length > 0 && (
              <div className="tags__no-more">— 已加载全部文章 —</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tags">
      <div className="tags__container">
        <header className="tags__header">
          <h1 className="tags__title">标签</h1>
          <p className="tags__subtitle">按标签浏览文章</p>
        </header>

        <div className="tags__cloud">
          {tags.map((tag, index) => (
            <Link
              key={tag.id}
              to={`/tag/${tag.name}`}
              className="tags__item"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <span className="tags__item-name">#{tag.name}</span>
              <span className="tags__item-count">{tagCounts[tag.name]}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
