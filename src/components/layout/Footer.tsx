import "./Footer.css";

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
            <a href="https://www.shidianguji.com/" target="_blank" rel="noopener noreferrer" className="footer__link">
              格物以致知。
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
