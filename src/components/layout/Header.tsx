import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useNavigation } from '../../contexts/NavigationContext';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { source } = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsScrolled(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: '首页', source: 'home', matchPaths: ['/'] },
    { path: '/categories', label: '分类', source: 'categories', matchPaths: ['/categories', '/category'] },
    { path: '/tags', label: '标签', source: 'tags', matchPaths: ['/tags', '/tag'] },
    { path: '/about', label: '关于', source: 'about', matchPaths: ['/about'] }
  ];

  const isActive = (matchPaths: string[], linkSource: string) => {
    const currentPath = location.pathname;
    
    if (currentPath.startsWith('/post/')) {
      return source === linkSource;
    }
    
    return matchPaths.some(path => {
      if (path === '/') {
        return currentPath === '/';
      }
      return currentPath === path || currentPath.startsWith(path + '/');
    });
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <span className="header__logo-text">Blog</span>
        </Link>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`header__link ${isActive(link.matchPaths, link.source) ? 'header__link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <ThemeToggle />
          <button
            className={`header__menu-btn ${isMenuOpen ? 'header__menu-btn--open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
