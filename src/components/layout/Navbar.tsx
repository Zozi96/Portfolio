import { useState } from "react";
import { Menu, X, Moon, Sun, Terminal } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

export function Navbar({ onTerminalOpen }: { onTerminalOpen: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navItems = [
    { key: "home", href: "#home" },
    { key: "focus", href: "#focus" },
    { key: "projects", href: "#projects" },
    { key: "personal", href: "#personal" },
    { key: "stack", href: "#stack" },
    { key: "experience", href: "#experience" },
    { key: "contact", href: "#contact" },
  ];

  const handleLocaleToggle = () => {
    setLocale(locale === "en" ? "es" : "en");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200/40 dark:border-zinc-800/40">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0">
            <img src="/favicon.png" alt="Zozbit" className="h-8 w-auto" />
          </a>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <div className="hidden md:block w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-1" />
            <button
              onClick={onTerminalOpen}
              className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Open terminal"
              title="Open terminal (⌘K)"
            >
              <Terminal className="w-4 h-4" />
            </button>

            <button
              onClick={handleLocaleToggle}
              className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Toggle language"
            >
              <span className="text-xs font-bold tracking-wider">{locale.toUpperCase()}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-zinc-200/50 dark:border-zinc-800/50">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Scroll progress */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 origin-left"
        style={{ scaleX }}
      />
    </nav>
  );
}

export default Navbar;
