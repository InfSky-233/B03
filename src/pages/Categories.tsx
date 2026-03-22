import { useMemo, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { categories, getPostsByCategory, posts } from "../data/posts";
import PostCard from "../components/post/PostCard";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import SearchBar from "../components/ui/SearchBar";
import "./Categories.css";

export default function Categories() {
  const { name } = useParams<{ name?: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(
    () => (name ? getPostsByCategory(name) : []),
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

  const categoryCounts = categories.reduce(
    (acc, cat) => {
      acc[cat.name] = posts.filter((p) => p.category === cat.name).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  if (name) {
    return (
      <div className="categories">
        <div className="categories__container">
          <header className="categories__header categories__header--right">
            <h1 className="categories__title">{name}</h1>
            <p className="categories__count">
              {searchQuery
                ? `全局搜索: ${searchedPosts.length} 篇文章`
                : `${filteredPosts.length} 篇文章`}
            </p>
          </header>

          <SearchBar
            placeholder="全局搜索文章标题、内容、标签..."
            onSearch={handleSearch}
          />

          <div className="categories__posts">
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
            <div className="categories__empty">
              <p>未找到匹配 "{searchQuery}" 的文章</p>
            </div>
          )}

          <div ref={loadMoreRef} className="categories__load-more">
            {loading && (
              <div className="categories__loading">
                <div className="categories__loading-spinner" />
                <span>加载中...</span>
              </div>
            )}
            {!hasMore && !loading && displayedPosts.length > 0 && (
              <div className="categories__no-more">— 已加载全部文章 —</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="categories">
      <div className="categories__container">
        <header className="categories__header">
          <h1 className="categories__title">分类</h1>
          <p className="categories__subtitle">按分类浏览文章</p>
        </header>

        <SearchBar
          placeholder="全局搜索文章标题、内容、标签..."
          onSearch={handleSearch}
        />

        <div className="categories__posts">
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
          <div className="categories__empty">
            <p>未找到匹配 "{searchQuery}" 的文章</p>
          </div>
        )}

        {!searchQuery && (
          <div className="categories__grid">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/category/${category.name}`}
                className="categories__item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="categories__item-name">{category.name}</span>
                <span className="categories__item-count">
                  {categoryCounts[category.name]} 篇
                </span>
              </Link>
            ))}
          </div>
        )}

        <div ref={loadMoreRef} className="categories__load-more">
          {loading && (
            <div className="categories__loading">
              <div className="categories__loading-spinner" />
              <span>加载中...</span>
            </div>
          )}
          {!hasMore && !loading && displayedPosts.length > 0 && (
            <div className="categories__no-more">— 已加载全部文章 —</div>
          )}
        </div>
      </div>
    </div>
  );
}
