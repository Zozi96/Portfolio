import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { vibrate } from '../utils/haptics';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored && (stored === 'light' || stored === 'dark')) {
    return stored;
  }
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Update theme-color meta tag to match the current theme background.
    // Targets the <meta name="theme-color"> without a media attribute,
    // which acts as the dynamic/JS-controlled override.
    const themeColorMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]:not([media])'
    );
    if (themeColorMeta) {
      themeColorMeta.content = theme === 'dark' ? '#09090b' : '#fafafa';
    }

    // Only persist when the user has explicitly set a preference; do not
    // overwrite on every render so that the OS-change listener can detect
    // the absence of a manual override.
    if (localStorage.getItem('theme') !== null) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only follow OS changes when the user has not manually overridden the theme.
      if (localStorage.getItem('theme') === null) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (newTheme: Theme) => {
        localStorage.setItem('theme', newTheme);
        setThemeState(newTheme);
      },
      toggleTheme: () => {
        const next: Theme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', next);
        vibrate(10);

        if (!('startViewTransition' in document)) {
          setThemeState(next);
          return;
        }

        document.startViewTransition(() => {
          setThemeState(next);
        });
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
