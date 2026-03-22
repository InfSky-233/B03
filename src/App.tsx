import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/ui/BackToTop";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AnimationProvider } from "./contexts/AnimationContext";
import { NavigationProvider } from "./contexts/NavigationContext";
import AppRoutes from "./routes";
import "./App.css";

export default function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <AnimationProvider>
        <NavigationProvider>
          <div className="app">
            <Header />
            <main className={`main ${isHomePage ? "main--home" : ""}`}>
              <AppRoutes />
            </main>
            <Footer />
            <BackToTop />
          </div>
        </NavigationProvider>
      </AnimationProvider>
    </ThemeProvider>
  );
}
