import { useParams, Link } from 'react-router-dom';
import { categories, getPostsByCategory, posts } from '../data/posts';
import PostCard from '../components/post/PostCard';
import './Categories.css';

export default function Categories() {
  const { name } = useParams<{ name?: string }>();
  const filteredPosts = name ? getPostsByCategory(name) : [];
  
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat.name] = posts.filter(p => p.category === cat.name).length;
    return acc;
  }, {} as Record<string, number>);

  if (name) {
    return (
      <div className="categories">
        <div className="categories__container">
          <header className="categories__header">
            <Link to="/categories" className="categories__back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              全部分类
            </Link>
            <h1 className="categories__title">{name}</h1>
            <p className="categories__count">{filteredPosts.length} 篇文章</p>
          </header>

          <div className="categories__posts">
            {filteredPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
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

        <div className="categories__grid">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.name}`}
              className="categories__item"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="categories__item-name">{category.name}</span>
              <span className="categories__item-count">{categoryCounts[category.name]} 篇</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
