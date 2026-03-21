import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <p className="footer__copyright">
            © {currentYear} Blog. All rights reserved.
          </p>
          <nav className="footer__nav">
            <Link to="/" className="footer__link">首页</Link>
            <Link to="/about" className="footer__link">关于</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
