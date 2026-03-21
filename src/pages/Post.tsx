import { useParams, Link } from 'react-router-dom';
import { getPostById, posts } from '../data/posts';
import ProgressBar from '../components/ui/ProgressBar';
import './Post.css';

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const post = getPostById(id || '');
  
  const relatedPosts = posts
    .filter(p => p.id !== id && p.category === post?.category)
    .slice(0, 2);

  if (!post) {
    return (
      <div className="post post--not-found">
        <div className="post__container">
          <h1>文章未找到</h1>
          <Link to="/" className="post__back-link">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <article className="post">
      <ProgressBar />
      
      <header className="post__header">
        <div className="post__container post__container--narrow">
          <div className="post__meta">
            <time className="post__date">{post.date}</time>
            <span className="post__read-time">{post.readTime} 分钟阅读</span>
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
        <div className="post__container post__container--narrow">
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
                  <h3 className="post__related-item-title">{relatedPost.title}</h3>
                  <span className="post__related-item-date">{relatedPost.date}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="post__footer">
        <div className="post__container post__container--narrow">
          <Link to="/" className="post__back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            返回首页
          </Link>
        </div>
      </footer>
    </article>
  );
}

function formatContent(content: string): string {
  return content
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[huplo])/gm, '<p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<[huplo])/g, '$1')
    .replace(/(<\/[huplo][^>]*>)<\/p>/g, '$1');
}
