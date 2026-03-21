import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BackToTop from './components/ui/BackToTop';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnimationProvider } from './contexts/AnimationContext';
import AppRoutes from './routes';
import './App.css';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <AnimationProvider>
        <div className="app">
          <Header />
          <main className="main">
            <AppRoutes />
          </main>
          <Footer />
          <BackToTop />
        </div>
      </AnimationProvider>
    </ThemeProvider>
  );
}
