import PostCard from '../components/post/PostCard';
import { posts } from '../data/posts';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__title">博客</h1>
        <p className="home__subtitle">记录思考，分享成长</p>
      </section>

      <section className="home__content">
        <div className="home__posts">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
