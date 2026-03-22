import "./About.css";

const techStack = [
  { name: "React", icon: "R" },
  { name: "Vue", icon: "V" },
  { name: "TypeScript", icon: "TS" },
  { name: "JavaScript", icon: "JS" },
  { name: "CSS3", icon: "CSS" },
  { name: "Sass", icon: "S" },
  { name: "Tailwind", icon: "TW" },
  { name: "Vite", icon: "Vt" },
  { name: "Webpack", icon: "W" },
  { name: "Node.js", icon: "N" },
  { name: "Git", icon: "G" },
  { name: "GitHub", icon: "GH" },
];

export default function About() {
  return (
    <div className="about">
      <div className="about__container">
        <header className="about__header">
          <h1 className="about__title">关于我</h1>
        </header>

        <section className="about__content">
          <div className="about__intro">
            <p className="about__intro-text">你好，欢迎来到我的博客。</p>
            <p className="about__intro-text">
              我是一名热爱技术的前端开发者，专注于构建优雅、高性能的Web应用。
              在这里，我会分享技术心得、设计思考以及生活中的点滴感悟。
            </p>
          </div>

          <div className="about__section">
            <h2 className="about__section-title">技术栈</h2>
            <div className="about__tech">
              {techStack.map((tech, index) => (
                <div key={index} className="about__tech-item">
                  <span className="about__tech-icon">{tech.icon}</span>
                  <span className="about__tech-name">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about__section">
            <h2 className="about__section-title">联系方式</h2>
            <div className="about__contact">
              <a
                href="mailto:hello@example.com"
                className="about__contact-link"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                hello@example.com
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="about__contact-link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
