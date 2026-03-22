import { createContext, useContext, ReactNode } from 'react';

type NavigationSource = 'home' | 'categories' | 'tags' | 'about' | null;

interface NavigationContextType {
  source: NavigationSource;
  setSource: (source: NavigationSource) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const getStoredSource = (): NavigationSource => {
    try {
      const stored = sessionStorage.getItem('navigationSource');
      if (stored && ['home', 'categories', 'tags', 'about'].includes(stored)) {
        return stored as NavigationSource;
      }
    } catch {
      return null;
    }
    return null;
  };

  const setStoredSource = (source: NavigationSource) => {
    try {
      if (source) {
        sessionStorage.setItem('navigationSource', source);
      } else {
        sessionStorage.removeItem('navigationSource');
      }
    } catch {
      return;
    }
  };

  const source = getStoredSource();

  const setSource = (newSource: NavigationSource) => {
    setStoredSource(newSource);
  };

  return (
    <NavigationContext.Provider value={{ source, setSource }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
