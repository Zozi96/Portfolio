import { useState } from 'react';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'focus', href: '#focus' },
    { key: 'projects', href: '#projects' },
    { key: 'stack', href: '#stack' },
    { key: 'experience', href: '#experience' }
  ];

  const handleLocaleToggle = () => {
    setLocale(locale === 'en' ? 'es' : 'en');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl backdrop-saturate-150 bg-light-card/60 dark:bg-dark-card/60 border-b border-light-border/50 dark:border-dark-border/50 shadow-glass dark:shadow-glass-dark">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-light-accent-primary dark:text-dark-accent-primary">
              {'</>'}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <a
                key={item.key}
                href={item.href}
                className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-colors"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLocaleToggle}
              className="p-2 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors cursor-pointer"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
              <span className="ml-1 text-sm font-medium">{locale.toUpperCase()}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-light-border dark:border-dark-border">
            {navItems.map(item => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-colors"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
