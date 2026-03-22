import PostCard from "../components/post/PostCard";
import { posts } from "../data/posts";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import "./Home.css";

export default function Home() {
  const { displayedPosts, loading, hasMore, loadMoreRef } =
    useInfiniteScroll(posts);

  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__title">博客</h1>
        <p className="home__subtitle">记录思考，分享成长</p>
      </section>

      <section className="home__content">
        <div className="home__posts">
          {displayedPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <div ref={loadMoreRef} className="home__load-more">
          {loading && (
            <div className="home__loading">
              <div className="home__loading-spinner" />
              <span>加载中...</span>
            </div>
          )}
          {!hasMore && !loading && displayedPosts.length > 0 && (
            <div className="home__no-more">— 已加载全部文章 —</div>
          )}
        </div>
      </section>
    </div>
  );
}
