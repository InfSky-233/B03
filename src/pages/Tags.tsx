import { useMemo, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { tags, getPostsByTag, posts } from "../data/posts";
import PostCard from "../components/post/PostCard";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import SearchBar from "../components/ui/SearchBar";
import "./Tags.css";

export default function Tags() {
  const { name } = useParams<{ name?: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(
    () => (name ? getPostsByTag(name) : []),
    [name],
  );

  const searchedPosts = useMemo(() => {
    if (!searchQuery.trim()) return filteredPosts;
    const query = searchQuery.toLowerCase().trim();
    return posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(query);
      const excerptMatch = post.excerpt.toLowerCase().includes(query);
      const contentMatch = post.content?.toLowerCase().includes(query);
      const tagsMatch = post.tags.some((tag) =>
        tag.toLowerCase().includes(query),
      );
      const categoryMatch = post.category.toLowerCase().includes(query);
      return (
        titleMatch || excerptMatch || contentMatch || tagsMatch || categoryMatch
      );
    });
  }, [filteredPosts, searchQuery]);

  const { displayedPosts, loading, hasMore, loadMoreRef } =
    useInfiniteScroll(searchedPosts);

  const tagCounts = tags.reduce(
    (acc, tag) => {
      acc[tag.name] = posts.filter((p) => p.tags.includes(tag.name)).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  if (name) {
    return (
      <div className="tags">
        <div className="tags__container">
          <header className="tags__header tags__header--right">
            <h1 className="tags__title">#{name}</h1>
            <p className="tags__count">
              {searchQuery
                ? `全局搜索: ${searchedPosts.length} 篇文章`
                : `${filteredPosts.length} 篇文章`}
            </p>
          </header>

          <SearchBar
            placeholder="全局搜索文章标题、内容、标签..."
            onSearch={handleSearch}
          />

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

          {searchedPosts.length === 0 && searchQuery && (
            <div className="tags__empty">
              <p>未找到匹配 "{searchQuery}" 的文章</p>
            </div>
          )}

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

        <SearchBar
          placeholder="全局搜索文章标题、内容、标签..."
          onSearch={handleSearch}
        />

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

        {searchedPosts.length === 0 && searchQuery && (
          <div className="tags__empty">
            <p>未找到匹配 "{searchQuery}" 的文章</p>
          </div>
        )}

        {!searchQuery && (
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
        )}

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
